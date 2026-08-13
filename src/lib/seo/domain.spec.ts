import { describe, expect, it } from 'vitest';
import { buildNearbyLinks, buildSeoMetadata, getSeoMarketData } from './domain';
import type { SeoLocation, SeoPage } from './types';

const ivrea: SeoLocation = {
	id: 'ivrea-id',
	slug: 'ivrea',
	name: 'Ivrea',
	province: 'Torino',
	region: 'Piemonte',
	latitude: 45.467,
	longitude: 7.876,
	nearbyLocationSlugs: ['cuorgne', 'burolo']
};

const cuorgne: SeoLocation = {
	...ivrea,
	id: 'cuorgne-id',
	slug: 'cuorgne',
	name: 'Cuorgnè',
	nearbyLocationSlugs: ['ivrea']
};

const page: SeoPage = {
	id: 'page-id',
	locationId: ivrea.id,
	intent: 'case-in-vendita',
	enabled: true,
	indexable: true,
	title: null,
	metaDescription: null,
	h1: null,
	intro: null,
	content: null,
	updatedAt: '2026-04-29 10:00:00.000Z'
};

describe('local SEO domain', () => {
	it('generates canonical template metadata for a supported page', () => {
		expect(buildSeoMetadata(page, ivrea, 'https://reicasa.it')).toEqual({
			title: 'Case in vendita a Ivrea | REI Casa',
			description:
				'Scopri le case in vendita a Ivrea: annunci REI Casa aggiornati, filtri di ricerca e riferimenti medi di mercato al metro quadro.',
			canonical: 'https://reicasa.it/case-in-vendita/ivrea',
			robots: 'index,follow'
		});
	});

	it('preserves accented canonical municipality names', () => {
		const metadata = buildSeoMetadata(
			{ ...page, intent: 'valutazione-casa', locationId: cuorgne.id },
			cuorgne,
			'https://reicasa.it'
		);

		expect(metadata.title).toContain('Cuorgnè');
		expect(metadata.canonical).toBe('https://reicasa.it/valutazione-casa/cuorgne');
	});

	it('makes query states and configured noindex pages noindex', () => {
		expect(buildSeoMetadata(page, ivrea, 'https://reicasa.it', true).robots).toBe('noindex,follow');
		expect(
			buildSeoMetadata({ ...page, indexable: false }, ivrea, 'https://reicasa.it').robots
		).toBe('noindex,follow');
	});

	it('only links to explicitly nearby and enabled locations', () => {
		expect(buildNearbyLinks(ivrea, 'case-in-vendita', [cuorgne])).toEqual([
			{
				slug: 'cuorgne',
				name: 'Cuorgnè',
				href: '/case-in-vendita/cuorgne'
			}
		]);
	});

	it('reuses Borsino market data and returns null for missing municipalities', () => {
		const market = getSeoMarketData('Ivrea');
		expect(market?.salePricePerSqm).toBeGreaterThan(0);
		expect(market?.rentPricePerSqm).toBeGreaterThan(0);
		expect(market?.sourceLabel).toBe('Borsino Immobiliare');
		expect(getSeoMarketData('Comune inesistente')).toBeNull();
	});
});
