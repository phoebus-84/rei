export const baselinePriceMetadata = {
	lastUpdated: '2026-04-24',
	sourceNote:
		'2026 Canavese asking-price seed derived from OMI, Immobiliare.it / Idealista market trends, and Borsino Immobiliare coefficients.'
} as const;

export const fallbackAreaKey = 'altri_comuni_piccoli' as const;

export const baselinePrices = {
	ivrea_centro: {
		label: 'Ivrea centro',
		pricePerSqm: 1250
	},
	ivrea_periferia: {
		label: 'Ivrea periferia',
		pricePerSqm: 1050
	},
	rivarolo_canavese: {
		label: 'Rivarolo Canavese',
		pricePerSqm: 1000
	},
	cuorgne: {
		label: 'Cuorgne',
		pricePerSqm: 800
	},
	castellamonte: {
		label: 'Castellamonte',
		pricePerSqm: 750
	},
	caluso: {
		label: 'Caluso',
		pricePerSqm: 850
	},
	banchette: {
		label: 'Banchette',
		pricePerSqm: 900
	},
	altri_comuni_piccoli: {
		label: 'Altri comuni piccoli',
		pricePerSqm: 700
	}
} as const;

export type BaselineAreaKey = keyof typeof baselinePrices;

export type BaselineArea = {
	key: BaselineAreaKey;
	label: string;
	pricePerSqm: number;
	lastUpdated: string;
	sourceNote: string;
};

export function isBaselineAreaKey(value: string): value is BaselineAreaKey {
	return value in baselinePrices;
}

export function getBasePrice(areaKey: string): BaselineArea {
	const safeKey = isBaselineAreaKey(areaKey) ? areaKey : fallbackAreaKey;
	const area = baselinePrices[safeKey];

	return {
		key: safeKey,
		label: area.label,
		pricePerSqm: area.pricePerSqm,
		lastUpdated: baselinePriceMetadata.lastUpdated,
		sourceNote: baselinePriceMetadata.sourceNote
	};
}

export const baselineAreas = (
	Object.entries(baselinePrices) as Array<
		[BaselineAreaKey, (typeof baselinePrices)[BaselineAreaKey]]
	>
).map(([key, area]) => ({
	key,
	label: area.label,
	pricePerSqm: area.pricePerSqm,
	lastUpdated: baselinePriceMetadata.lastUpdated,
	sourceNote: baselinePriceMetadata.sourceNote
}));
