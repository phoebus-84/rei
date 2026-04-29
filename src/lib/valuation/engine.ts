import { z } from 'zod';

import { getBasePrice } from './baseline-prices';
import {
	getWholeHouseLevelsMultiplier,
	valuationRangeConfig,
	wholeHouseValuationConfig
} from './config';
import { resolveValuationMarketArea, type ResolvedValuationMarketArea } from './market-resolver';

export const valuationConditions = [
	'da_ristrutturare',
	'buono',
	'ristrutturato',
	'nuova_costruzione'
] as const;

export const valuationFloors = [
	'piano_terra',
	'primo_piano',
	'secondo_con_ascensore',
	'secondo_senza_ascensore',
	'terzo_piu_con_ascensore',
	'terzo_piu_senza_ascensore',
	'attico'
] as const;

export const valuationExtras = [
	'box_auto_singolo',
	'box_auto_doppio',
	'posto_auto_scoperto',
	'giardino_privato',
	'terrazzo_abitabile'
] as const;

export const valuationPropertyKinds = ['appartamento', 'casa_intera'] as const;

export const conditionMultipliers = {
	da_ristrutturare: 0.8,
	buono: 1,
	ristrutturato: 1.1,
	nuova_costruzione: 1.25
} as const;

export const floorMultipliers = {
	piano_terra: 0.9,
	primo_piano: 1,
	secondo_con_ascensore: 1.05,
	secondo_senza_ascensore: 0.95,
	terzo_piu_con_ascensore: 1.05,
	terzo_piu_senza_ascensore: 0.85,
	attico: 1.2
} as const;

export const flatAdditionValues = {
	box_auto_singolo: 15000,
	box_auto_doppio: 25000,
	posto_auto_scoperto: 5000
} as const;

export const percentageAdditionValues = {
	giardino_privato: 0.1,
	terrazzo_abitabile: 0.05
} as const;

const extrasSchema = z
	.object({
		box_auto_singolo: z.boolean().optional().default(false),
		box_auto_doppio: z.boolean().optional().default(false),
		posto_auto_scoperto: z.boolean().optional().default(false),
		giardino_privato: z.boolean().optional().default(false),
		terrazzo_abitabile: z.boolean().optional().default(false)
	})
	.default({
		box_auto_singolo: false,
		box_auto_doppio: false,
		posto_auto_scoperto: false,
		giardino_privato: false,
		terrazzo_abitabile: false
	});

const valuationLocationSchema = z.object({
	label: z.string().trim().min(1),
	latitude: z.number().min(-90).max(90),
	longitude: z.number().min(-180).max(180),
	osmId: z.number().nullable().default(null),
	osmType: z.string().trim().optional().default(''),
	type: z.string().trim().optional().default(''),
	category: z.string().trim().optional().default(''),
	address: z.record(z.string(), z.string().optional()).default({}),
	streetAddress: z.string().trim().optional().default(''),
	city: z.string().trim().optional().default('')
});

export const valuationInputSchema = z.object({
	areaKey: z.string().min(1).optional(),
	selectedLocation: valuationLocationSchema.optional(),
	propertyKind: z.enum(valuationPropertyKinds).default('appartamento'),
	levelsCount: z.number().int().min(1).max(6).default(1),
	squareMeters: z.number().positive(),
	rooms: z.number().int().min(1).max(50),
	condition: z.enum(valuationConditions),
	floor: z.enum(valuationFloors),
	extras: extrasSchema
});

export type ValuationInput = z.input<typeof valuationInputSchema>;
export type ValuationCondition = (typeof valuationConditions)[number];
export type ValuationFloor = (typeof valuationFloors)[number];
export type ValuationExtra = (typeof valuationExtras)[number];
export type ValuationPropertyKind = (typeof valuationPropertyKinds)[number];

export type ValuationBreakdown = {
	areaKey: string;
	resolvedAreaKey: string;
	areaLabel: string;
	pricePerSqm: number;
	pricePerSqmMin: number;
	pricePerSqmMax: number;
	selectedLocation: ValuationInput['selectedLocation'] | null;
	resolvedMarketArea: ResolvedValuationMarketArea | null;
	propertyKind: ValuationPropertyKind;
	levelsCount: number;
	propertyKindMultiplier: number;
	levelsMultiplier: number;
	baseValue: number;
	conditionMultiplier: number;
	floorMultiplier: number;
	adjustedValue: number;
	appliedPercentageAdditions: Array<{
		key: keyof typeof percentageAdditionValues;
		value: number;
	}>;
	multiplierAdditions: number;
	valueWithSpaces: number;
	appliedFlatAdditions: Array<{
		key: keyof typeof flatAdditionValues;
		value: number;
	}>;
	flatAdditionTotal: number;
	finalValue: number;
	rawMin: number;
	rawMax: number;
	roundedMin: number;
	roundedMax: number;
};

export type ValuationResult = {
	min: number;
	max: number;
	currency: 'EUR';
	final: number;
	breakdown: ValuationBreakdown;
};

function roundToNearestThousand(value: number) {
	return Math.round(value / 1000) * 1000;
}

function sum(values: number[]) {
	return values.reduce((total, value) => total + value, 0);
}

export function calculateValuation(input: ValuationInput): ValuationResult {
	const parsed = valuationInputSchema.parse(input);
	const resolvedMarketArea = resolveValuationMarketArea(parsed.selectedLocation);
	const fallbackArea = getBasePrice(parsed.areaKey || resolvedMarketArea?.key || '');
	const areaKey = parsed.areaKey || resolvedMarketArea?.key || fallbackArea.key;
	const areaLabel = resolvedMarketArea?.label || fallbackArea.label;
	const pricePerSqm = resolvedMarketArea?.pricePerSqmBase || fallbackArea.pricePerSqm;
	const pricePerSqmMin = pricePerSqm * valuationRangeConfig.lowerBoundFactor;
	const pricePerSqmMax = pricePerSqm * valuationRangeConfig.upperBoundFactor;
	const baseValue = parsed.squareMeters * pricePerSqm;
	const conditionMultiplier = conditionMultipliers[parsed.condition];
	const floorMultiplier =
		parsed.propertyKind === 'casa_intera' ? 1 : floorMultipliers[parsed.floor];
	const propertyKindMultiplier =
		parsed.propertyKind === 'casa_intera' ? wholeHouseValuationConfig.propertyKindMultiplier : 1;
	const levelsMultiplier =
		parsed.propertyKind === 'casa_intera' ? getWholeHouseLevelsMultiplier(parsed.levelsCount) : 1;
	const adjustedValue =
		baseValue * conditionMultiplier * floorMultiplier * propertyKindMultiplier * levelsMultiplier;

	const appliedPercentageAdditions = Object.entries(percentageAdditionValues)
		.filter(([key]) => parsed.extras[key as keyof typeof percentageAdditionValues])
		.map(([key, value]) => ({
			key: key as keyof typeof percentageAdditionValues,
			value
		}));

	const multiplierAdditions = 1 + sum(appliedPercentageAdditions.map(({ value }) => value));
	const valueWithSpaces = adjustedValue * multiplierAdditions;

	const appliedFlatAdditions = Object.entries(flatAdditionValues)
		.filter(([key]) => parsed.extras[key as keyof typeof flatAdditionValues])
		.map(([key, value]) => ({
			key: key as keyof typeof flatAdditionValues,
			value
		}));

	const flatAdditionTotal = sum(appliedFlatAdditions.map(({ value }) => value));
	const finalValue = valueWithSpaces + flatAdditionTotal;
	const rawMin = finalValue * valuationRangeConfig.lowerBoundFactor;
	const rawMax = finalValue * valuationRangeConfig.upperBoundFactor;
	const roundedMin = roundToNearestThousand(rawMin);
	const roundedMax = roundToNearestThousand(rawMax);

	return {
		min: roundedMin,
		max: roundedMax,
		currency: 'EUR',
		final: finalValue,
		breakdown: {
			areaKey,
			resolvedAreaKey: resolvedMarketArea?.key || fallbackArea.key,
			areaLabel,
			pricePerSqm,
			pricePerSqmMin,
			pricePerSqmMax,
			selectedLocation: parsed.selectedLocation || null,
			resolvedMarketArea,
			propertyKind: parsed.propertyKind,
			levelsCount: parsed.levelsCount,
			propertyKindMultiplier,
			levelsMultiplier,
			baseValue,
			conditionMultiplier,
			floorMultiplier,
			adjustedValue,
			appliedPercentageAdditions,
			multiplierAdditions,
			valueWithSpaces,
			appliedFlatAdditions,
			flatAdditionTotal,
			finalValue,
			rawMin,
			rawMax,
			roundedMin,
			roundedMax
		}
	};
}
