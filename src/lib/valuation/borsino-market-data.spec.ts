import { describe, expect, it } from 'vitest';

import { borsinoMarketAreas, borsinoMarketMetadata } from './borsino-market-data';

describe('Borsino market data', () => {
	it('contains unique positive Torino province market rows', () => {
		const keys = new Set<string>();

		expect(borsinoMarketAreas.length).toBe(312);
		expect(borsinoMarketMetadata.capturedAt).toBe('2026-04-29');
		expect(borsinoMarketMetadata.excludedZeroSaleKeys).toEqual([
			'lugnacco',
			'pecco',
			'trausella',
			'vico_canavese'
		]);

		for (const area of borsinoMarketAreas) {
			expect(keys.has(area.key)).toBe(false);
			keys.add(area.key);
			expect(area.label).toBeTruthy();
			expect(area.region).toBe('Piemonte');
			expect(area.province).toBe('Torino');
			expect(area.rentPricePerSqmBase).toBeGreaterThanOrEqual(0);
			expect(area.salePricePerSqmBase).toBeGreaterThan(0);
			expect(area.sourceUrl).toContain('/torino-provincia/');
		}
	});

	it('includes the key Canavese municipalities from the supplied table', () => {
		expect(borsinoMarketAreas).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ key: 'ivrea', label: 'Ivrea', salePricePerSqmBase: 725 }),
				expect.objectContaining({ key: 'banchette', label: 'Banchette' }),
				expect.objectContaining({ key: 'caluso', label: 'Caluso' }),
				expect.objectContaining({ key: 'castellamonte', label: 'Castellamonte' }),
				expect.objectContaining({ key: 'cuorgne', label: 'Cuorgne' }),
				expect.objectContaining({ key: 'rivarolo_canavese', label: 'Rivarolo Canavese' })
			])
		);
	});
});
