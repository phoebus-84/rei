import { error } from '@sveltejs/kit';
import {
	buildLocationCopy,
	buildNearbyLinks,
	buildSeoMetadata,
	getSeoMarketData
} from '$lib/seo/domain';
import { getSeoIntentDefinition, isPropertySeoIntent, isSeoIntent } from '$lib/seo/intents';
import { getNearbySeoPages, getSeoPage } from '$lib/server/seo-pages';
import { getPropertiesForSeoLocation } from '$lib/server/property-search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	if (!isSeoIntent(params.intent)) throw error(404, 'Pagina non trovata');
	if (params.location !== params.location.toLowerCase()) {
		throw error(404, 'Usa lo slug canonico del comune');
	}

	const seoPage = await getSeoPage(params.intent, params.location);
	if (!seoPage || !seoPage.enabled) throw error(404, 'Pagina locale non trovata');

	const definition = getSeoIntentDefinition(seoPage.intent);
	const nearbyPages = await getNearbySeoPages(seoPage);
	const nearbyLocations = nearbyPages.map((page) => page.location);
	const nearbyLinks = buildNearbyLinks(seoPage.location, seoPage.intent, nearbyLocations);
	const pageNumber = parsePositiveInteger(url.searchParams.get('page'));
	const market = getSeoMarketData(seoPage.location.name);
	const metadata = buildSeoMetadata(
		seoPage,
		seoPage.location,
		url.origin,
		url.searchParams.size > 0
	);
	const copy = buildLocationCopy(seoPage, seoPage.location);

	setHeaders({
		'cache-control': isPropertySeoIntent(seoPage.intent)
			? 'public, max-age=0, s-maxage=300, stale-while-revalidate=600'
			: 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600'
	});

	if (isPropertySeoIntent(seoPage.intent) && definition.contract) {
		const inventory = await getPropertiesForSeoLocation({
			location: seoPage.location,
			contract: definition.contract,
			nearbyLocations,
			page: pageNumber,
			sort: url.searchParams.get('sort') || undefined
		});

		return {
			kind: 'inventory' as const,
			seoPage,
			definition,
			metadata,
			copy,
			market,
			nearbyLinks,
			inventory
		};
	}

	return {
		kind: 'valuation' as const,
		seoPage,
		definition,
		metadata,
		copy,
		market,
		nearbyLinks,
		initialLocation: toValuationLocation(seoPage.location)
	};
};

function parsePositiveInteger(value: string | null) {
	const number = Number(value || '1');
	return Number.isInteger(number) && number > 0 ? number : 1;
}

function toValuationLocation(location: {
	name: string;
	province: string;
	region: string;
	latitude: number | null;
	longitude: number | null;
}) {
	if (location.latitude === null || location.longitude === null) return null;

	return {
		label: `${location.name}, ${location.province}, ${location.region}, Italia`,
		latitude: location.latitude,
		longitude: location.longitude,
		osmId: null,
		osmType: '',
		type: 'administrative',
		category: 'boundary',
		address: {
			municipality: location.name,
			state: location.region,
			province: location.province,
			country: 'Italia'
		},
		streetAddress: '',
		city: location.name
	};
}
