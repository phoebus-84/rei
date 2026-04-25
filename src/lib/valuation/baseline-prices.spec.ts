import { describe, expect, it } from 'vitest';

import {
	baselineAreas,
	baselinePrices,
	fallbackAreaKey,
	getBasePrice,
	isBaselineAreaKey
} from './baseline-prices';

describe('baseline valuation prices', () => {
	it('covers all configured area keys', () => {
		expect(baselineAreas).toHaveLength(Object.keys(baselinePrices).length);

		for (const area of baselineAreas) {
			expect(isBaselineAreaKey(area.key)).toBe(true);
			expect(area.pricePerSqm).toBeGreaterThan(0);
			expect(area.lastUpdated).toBe('2026-04-24');
		}
	});

	it('returns the configured base price for a known area', () => {
		expect(getBasePrice('ivrea_centro')).toMatchObject({
			key: 'ivrea_centro',
			label: 'Ivrea centro',
			pricePerSqm: 1250
		});
	});

	it('falls back to the small municipalities bucket for unknown keys', () => {
		expect(getBasePrice('unknown-area')).toMatchObject({
			key: fallbackAreaKey,
			label: 'Altri comuni piccoli',
			pricePerSqm: 700
		});
	});
});
