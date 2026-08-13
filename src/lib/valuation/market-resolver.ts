import type { LocationSuggestion } from '$lib/location';

import {
	borsinoMarketAreas,
	borsinoMarketMetadata,
	type BorsinoMarketArea
} from './borsino-market-data';
import { valuationRangeConfig } from './config';

export type ValuationLocation = Pick<
	LocationSuggestion,
	| 'label'
	| 'latitude'
	| 'longitude'
	| 'osmId'
	| 'osmType'
	| 'type'
	| 'category'
	| 'address'
	| 'streetAddress'
	| 'city'
>;

export type ResolvedValuationMarketArea = {
	key: string;
	label: string;
	municipality: string;
	province: string;
	region: string;
	pricePerSqmBase: number;
	pricePerSqmMin: number;
	pricePerSqmMax: number;
	rentPricePerSqmBase: number;
	confidence: 'exact' | 'label_match';
	matchReason: string;
	sourceName: string;
	sourceUrl: string;
	capturedAt: string;
};

const municipalityByNormalizedName = new Map(
	borsinoMarketAreas.map((area) => [normalizeItalianPlaceName(area.municipality), area])
);

const areasBySpecificity = [...borsinoMarketAreas].sort(
	(left, right) => right.municipality.length - left.municipality.length
);

export function normalizeItalianPlaceName(value: string) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[’']/g, ' ')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
		.replace(/\s+/g, ' ');
}

export function resolveValuationMarketAreaByMunicipality(
	municipality: string
): ResolvedValuationMarketArea | null {
	const area = municipalityByNormalizedName.get(normalizeItalianPlaceName(municipality));

	return area ? toResolvedMarketArea(area, 'exact', 'Comune richiesto') : null;
}

export function resolveValuationMarketArea(
	location: ValuationLocation | null | undefined
): ResolvedValuationMarketArea | null {
	if (!location || !isPiemonteLocation(location)) return null;

	const candidates = getLocationNameCandidates(location);

	for (const candidate of candidates) {
		const area = municipalityByNormalizedName.get(candidate);

		if (area) {
			return toResolvedMarketArea(area, 'exact', 'Comune corrispondente nei dati Borsino');
		}
	}

	for (const segment of getLocationLabelPlaceSegments(location.label)) {
		const area = municipalityByNormalizedName.get(segment);

		if (area) {
			return toResolvedMarketArea(
				area,
				'label_match',
				'Comune riconosciuto nel testo della posizione'
			);
		}
	}

	const normalizedLabel = normalizeItalianPlaceName(getLocationLabelSearchText(location.label));
	const areaFromLabel = areasBySpecificity.find((area) =>
		normalizedLabel.includes(normalizeItalianPlaceName(area.municipality))
	);

	if (areaFromLabel) {
		return toResolvedMarketArea(
			areaFromLabel,
			'label_match',
			'Comune riconosciuto nel testo della posizione'
		);
	}

	return null;
}

function isPiemonteLocation(location: ValuationLocation) {
	const state = location.address?.state || location.address?.region;

	if (!state) return true;

	return normalizeItalianPlaceName(state) === 'piemonte';
}

function getLocationNameCandidates(location: ValuationLocation) {
	const address = location.address || {};
	const values = [
		location.city,
		address.city,
		address.town,
		address.village,
		address.municipality,
		address.hamlet,
		address.locality
	]
		.filter((value): value is string => Boolean(value))
		.map(normalizeItalianPlaceName)
		.filter(Boolean);

	return [...new Set(values)];
}

function getLocationLabelPlaceSegments(label: string) {
	return label.split(',').slice(1).map(normalizeItalianPlaceName).filter(Boolean);
}

function getLocationLabelSearchText(label: string) {
	const segments = label.split(',').slice(1).join(',');

	return segments || label;
}

function toResolvedMarketArea(
	area: BorsinoMarketArea,
	confidence: ResolvedValuationMarketArea['confidence'],
	matchReason: string
): ResolvedValuationMarketArea {
	return {
		key: area.key,
		label: area.label,
		municipality: area.municipality,
		province: area.province,
		region: area.region,
		pricePerSqmBase: area.salePricePerSqmBase,
		pricePerSqmMin: area.salePricePerSqmBase * valuationRangeConfig.lowerBoundFactor,
		pricePerSqmMax: area.salePricePerSqmBase * valuationRangeConfig.upperBoundFactor,
		rentPricePerSqmBase: area.rentPricePerSqmBase,
		confidence,
		matchReason,
		sourceName: borsinoMarketMetadata.sourceName,
		sourceUrl: area.sourceUrl,
		capturedAt: borsinoMarketMetadata.capturedAt
	};
}
