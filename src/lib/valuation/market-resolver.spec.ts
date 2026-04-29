import { describe, expect, it } from 'vitest';

import { valuationRangeConfig } from './config';
import {
	normalizeItalianPlaceName,
	resolveValuationMarketArea,
	type ValuationLocation
} from './market-resolver';

const ivreaLocation: ValuationLocation = {
	label: 'Via Torino, Ivrea, Torino, Piemonte, Italia',
	latitude: 45.467,
	longitude: 7.876,
	osmId: 123,
	osmType: 'way',
	type: 'residential',
	category: 'highway',
	address: {
		road: 'Via Torino',
		city: 'Ivrea',
		county: 'Torino',
		state: 'Piemonte'
	},
	streetAddress: 'Via Torino',
	city: 'Ivrea'
};

describe('resolveValuationMarketArea', () => {
	it('normalizes accents and apostrophes for Italian municipality names', () => {
		expect(normalizeItalianPlaceName('Albiano d’Ivrea')).toBe('albiano d ivrea');
		expect(normalizeItalianPlaceName('Cuorgnè')).toBe('cuorgne');
	});

	it('resolves an exact municipality match and derives min/max from tuning factors', () => {
		const resolved = resolveValuationMarketArea(ivreaLocation);

		expect(resolved).toMatchObject({
			key: 'ivrea',
			label: 'Ivrea',
			pricePerSqmBase: 725,
			confidence: 'exact'
		});
		expect(resolved?.pricePerSqmMin).toBe(725 * valuationRangeConfig.lowerBoundFactor);
		expect(resolved?.pricePerSqmMax).toBe(725 * valuationRangeConfig.upperBoundFactor);
	});

	it('resolves from the location label when structured city is missing', () => {
		const resolved = resolveValuationMarketArea({
			...ivreaLocation,
			city: '',
			address: { state: 'Piemonte' }
		});

		expect(resolved).toMatchObject({
			key: 'ivrea',
			confidence: 'label_match'
		});
	});

	it('rejects non-Piemonte locations', () => {
		expect(
			resolveValuationMarketArea({
				...ivreaLocation,
				address: { city: 'Milano', state: 'Lombardia' },
				city: 'Milano'
			})
		).toBeNull();
	});

	it('returns null for Piemonte locations outside the Torino province dataset', () => {
		expect(
			resolveValuationMarketArea({
				...ivreaLocation,
				label: 'Alba, Cuneo, Piemonte, Italia',
				address: { city: 'Alba', county: 'Cuneo', state: 'Piemonte' },
				city: 'Alba'
			})
		).toBeNull();
	});
});
