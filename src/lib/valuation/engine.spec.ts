import { describe, expect, it } from 'vitest';

import {
	calculateValuation,
	conditionMultipliers,
	floorMultipliers,
	flatAdditionValues
} from './engine';

const baseInput = {
	areaKey: 'rivarolo_canavese',
	squareMeters: 100,
	rooms: 3,
	condition: 'buono' as const,
	floor: 'primo_piano' as const,
	extras: {}
};

describe('calculateValuation', () => {
	it('matches the Ivrea Centro reference case', () => {
		const result = calculateValuation({
			areaKey: 'ivrea_centro',
			squareMeters: 100,
			rooms: 4,
			condition: 'ristrutturato',
			floor: 'terzo_piu_con_ascensore',
			extras: {
				box_auto_singolo: true
			}
		});

		expect(result.final).toBeCloseTo(159375, 5);
		expect(result.breakdown.rawMin).toBeCloseTo(143437.5, 5);
		expect(result.breakdown.rawMax).toBeCloseTo(175312.5, 5);
		expect(result.min).toBe(143000);
		expect(result.max).toBe(175000);
	});

	it.each(Object.entries(conditionMultipliers))(
		'applies the %s condition multiplier',
		(condition, multiplier) => {
			const result = calculateValuation({
				...baseInput,
				condition: condition as keyof typeof conditionMultipliers
			});

			expect(result.final).toBeCloseTo(100000 * multiplier, 5);
		}
	);

	it.each(Object.entries(floorMultipliers))(
		'applies the %s floor multiplier',
		(floor, multiplier) => {
			const result = calculateValuation({
				...baseInput,
				floor: floor as keyof typeof floorMultipliers
			});

			expect(result.final).toBeCloseTo(100000 * multiplier, 5);
		}
	);

	it.each(Object.entries(flatAdditionValues))('adds the flat extra %s', (extraKey, extraValue) => {
		const result = calculateValuation({
			...baseInput,
			extras: {
				[extraKey]: true
			}
		});

		expect(result.final).toBe(100000 + extraValue);
	});

	it('adds garden and terrace percentage modifiers before flat additions', () => {
		const result = calculateValuation({
			...baseInput,
			extras: {
				giardino_privato: true,
				terrazzo_abitabile: true,
				posto_auto_scoperto: true
			}
		});

		expect(result.breakdown.multiplierAdditions).toBeCloseTo(1.15, 5);
		expect(result.final).toBeCloseTo(120000, 5);
	});

	it('falls back to the small municipalities bucket for unknown areas', () => {
		const result = calculateValuation({
			...baseInput,
			areaKey: 'non_mapped_area'
		});

		expect(result.breakdown.resolvedAreaKey).toBe('altri_comuni_piccoli');
		expect(result.final).toBe(70000);
	});

	it('uses the resolved Borsino municipality base for geolocated valuations', () => {
		const result = calculateValuation({
			...baseInput,
			selectedLocation: {
				label: 'Via Torino, Ivrea, Torino, Piemonte, Italia',
				latitude: 45.467,
				longitude: 7.876,
				osmId: 123,
				osmType: 'way',
				type: 'residential',
				category: 'highway',
				address: {
					city: 'Ivrea',
					state: 'Piemonte'
				},
				streetAddress: 'Via Torino',
				city: 'Ivrea'
			}
		});

		expect(result.breakdown.resolvedAreaKey).toBe('ivrea');
		expect(result.breakdown.pricePerSqm).toBe(725);
		expect(result.final).toBe(72500);
		expect(result.min).toBe(65000);
		expect(result.max).toBe(80000);
	});

	it('does not apply apartment floor penalties to casa intera valuations', () => {
		const result = calculateValuation({
			...baseInput,
			propertyKind: 'casa_intera',
			levelsCount: 2,
			floor: 'terzo_piu_senza_ascensore'
		});

		expect(result.breakdown.floorMultiplier).toBe(1);
		expect(result.breakdown.propertyKindMultiplier).toBeGreaterThan(1);
		expect(result.final).toBe(103000);
	});
});
