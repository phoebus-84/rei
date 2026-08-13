import { describe, expect, it } from 'vitest';
import { normalizeSeoSlug, seoLocationPayload, seoPagePayload } from './seo';

describe('SEO admin payloads', () => {
	it('creates stable ASCII municipality slugs', () => {
		expect(normalizeSeoSlug('Cuorgnè')).toBe('cuorgne');
		expect(normalizeSeoSlug('Pavone Canavese')).toBe('pavone-canavese');
	});

	it('maps multiple nearby relations without duplicate IDs', () => {
		expect(
			seoLocationPayload({
				slug: 'Ivrea',
				name: ' Ivrea ',
				province: 'Torino',
				region: 'Piemonte',
				latitude: '',
				longitude: '',
				nearbyLocationIds: ['burolo-id', 'burolo-id', 'bollengo-id']
			})
		).toMatchObject({
			slug: 'ivrea',
			name: 'Ivrea',
			latitude: null,
			longitude: null,
			nearby_locations: ['burolo-id', 'bollengo-id']
		});
	});

	it('preserves independent enabled and indexable controls', () => {
		expect(
			seoPagePayload({
				locationId: 'ivrea-id',
				intent: 'case-in-vendita',
				enabled: true,
				indexable: false,
				title: '',
				metaDescription: '',
				h1: '',
				intro: '',
				content: ''
			})
		).toMatchObject({ enabled: true, indexable: false });
	});
});
