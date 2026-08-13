import { describe, expect, it } from 'vitest';
import { buildLocalSeoSitemapEntries } from './sitemap';
import type { SeoPageWithLocation } from './types';

const basePage: SeoPageWithLocation = {
	id: 'page',
	locationId: 'location',
	intent: 'case-in-vendita',
	enabled: true,
	indexable: true,
	title: null,
	metaDescription: null,
	h1: null,
	intro: null,
	content: null,
	updatedAt: '2026-04-29T10:00:00.000Z',
	location: {
		id: 'location',
		slug: 'ivrea',
		name: 'Ivrea',
		province: 'Torino',
		region: 'Piemonte',
		latitude: null,
		longitude: null,
		nearbyLocationSlugs: []
	}
};

describe('local SEO sitemap', () => {
	it('includes only enabled and indexable canonical pages with real updated dates', () => {
		const entries = buildLocalSeoSitemapEntries('https://reicasa.it/', [
			basePage,
			{ ...basePage, id: 'disabled', enabled: false },
			{ ...basePage, id: 'noindex', indexable: false }
		]);

		expect(entries).toEqual([
			{
				loc: 'https://reicasa.it/case-in-vendita/ivrea',
				lastmod: '2026-04-29'
			}
		]);
	});
});
