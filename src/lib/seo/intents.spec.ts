import { describe, expect, it } from 'vitest';
import { getSeoIntentDefinition, isSeoIntent } from './intents';
import { propertyFilter } from '$lib/server/property-search';

describe('SEO intents', () => {
	it('accepts only supported route intents', () => {
		expect(isSeoIntent('case-in-vendita')).toBe(true);
		expect(isSeoIntent('case-in-affitto')).toBe(true);
		expect(isSeoIntent('valutazione-casa')).toBe(true);
		expect(isSeoIntent('appartamenti-in-vendita')).toBe(false);
	});

	it('maps sale and rental pages to the existing property statuses', () => {
		expect(getSeoIntentDefinition('case-in-vendita').contract).toBe('for_sale');
		expect(getSeoIntentDefinition('case-in-affitto').contract).toBe('for_rent');
		expect(propertyFilter('Ivrea', 'for_sale')).toContain('status = "for_sale"');
		expect(propertyFilter('Ivrea', 'for_rent')).toContain('status = "for_rent"');
		expect(propertyFilter('Ivrea', 'for_sale')).toContain('city = "Ivrea"');
	});
});
