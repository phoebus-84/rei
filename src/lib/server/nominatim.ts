import { env } from '$env/dynamic/private';
import type { LocationSuggestion } from '$lib/location';

const DEFAULT_NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const DEFAULT_USER_AGENT =
	'paons_immobiliare/0.0.1 (real estate location search; configure NOMINATIM_USER_AGENT)';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const MIN_REQUEST_INTERVAL_MS = 1100;
const MAX_QUERY_LENGTH = 160;
const PIEMONTE_VIEWBOX = '6.6,46.5,9.25,44.0';
const PIEMONTE_STATE_NAMES = new Set(['piemonte', 'piedmont', 'piémont']);

type NominatimAddress = {
	house_number?: string;
	road?: string;
	pedestrian?: string;
	residential?: string;
	city?: string;
	town?: string;
	village?: string;
	municipality?: string;
	county?: string;
	state?: string;
	postcode?: string;
	country?: string;
	country_code?: string;
};

type NominatimResult = {
	display_name?: string;
	lat?: string;
	lon?: string;
	osm_id?: number;
	osm_type?: string;
	type?: string;
	category?: string;
	address?: NominatimAddress;
};

const cache = new Map<string, { expiresAt: number; suggestions: LocationSuggestion[] }>();
let lastUpstreamRequestAt = 0;

function getBaseUrl() {
	return (env.NOMINATIM_BASE_URL || DEFAULT_NOMINATIM_BASE_URL).replace(/\/$/, '');
}

function getUserAgent() {
	return env.NOMINATIM_USER_AGENT || DEFAULT_USER_AGENT;
}

function normalizeQuery(query: string) {
	return query.trim().replace(/\s+/g, ' ').slice(0, MAX_QUERY_LENGTH);
}

function toPiemonteQuery(query: string) {
	return /\b(piemonte|piedmont|piémont)\b/i.test(query) ? query : `${query}, Piemonte, Italia`;
}

function getCacheKey(query: string, limit: number) {
	return `${getBaseUrl()}|${query.toLocaleLowerCase('it-IT')}|${limit}`;
}

function getStreetAddress(address: NominatimAddress) {
	const road = address.road || address.pedestrian || address.residential || '';
	return [address.house_number, road].filter(Boolean).join(' ').trim();
}

function getCity(address: NominatimAddress) {
	return (
		address.city || address.town || address.village || address.municipality || address.county || ''
	);
}

function toSuggestion(result: NominatimResult): LocationSuggestion | null {
	const latitude = Number(result.lat);
	const longitude = Number(result.lon);

	if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !result.display_name) {
		return null;
	}

	const address = result.address || {};

	return {
		label: result.display_name,
		latitude,
		longitude,
		osmId: typeof result.osm_id === 'number' ? result.osm_id : null,
		osmType: result.osm_type || '',
		type: result.type || '',
		category: result.category || '',
		address,
		streetAddress: getStreetAddress(address),
		city: getCity(address)
	};
}

function isPiemonteSuggestion(suggestion: LocationSuggestion) {
	const state = suggestion.address.state?.trim().toLocaleLowerCase('it-IT');

	return Boolean(state && PIEMONTE_STATE_NAMES.has(state));
}

async function waitForRateLimit() {
	const elapsed = Date.now() - lastUpstreamRequestAt;
	const remaining = MIN_REQUEST_INTERVAL_MS - elapsed;

	if (remaining > 0) {
		await new Promise((resolve) => setTimeout(resolve, remaining));
	}

	lastUpstreamRequestAt = Date.now();
}

export async function searchLocations(query: string, limit = 5, fetchImpl: typeof fetch = fetch) {
	const normalizedQuery = normalizeQuery(query);
	const normalizedLimit = Math.min(Math.max(limit, 1), 8);

	if (normalizedQuery.length < 3) {
		return [];
	}

	const cacheKey = getCacheKey(normalizedQuery, normalizedLimit);
	const cached = cache.get(cacheKey);

	if (cached && cached.expiresAt > Date.now()) {
		return cached.suggestions;
	}

	await waitForRateLimit();

	const searchUrl = new URL('/search', getBaseUrl());
	searchUrl.searchParams.set('q', toPiemonteQuery(normalizedQuery));
	searchUrl.searchParams.set('format', 'jsonv2');
	searchUrl.searchParams.set('addressdetails', '1');
	searchUrl.searchParams.set('countrycodes', 'it');
	searchUrl.searchParams.set('accept-language', 'it');
	searchUrl.searchParams.set('layer', 'address');
	searchUrl.searchParams.set('limit', String(normalizedLimit));
	searchUrl.searchParams.set('dedupe', '1');
	searchUrl.searchParams.set('viewbox', PIEMONTE_VIEWBOX);
	searchUrl.searchParams.set('bounded', '1');

	if (env.NOMINATIM_EMAIL) {
		searchUrl.searchParams.set('email', env.NOMINATIM_EMAIL);
	}

	const response = await fetchImpl(searchUrl, {
		headers: {
			Accept: 'application/json',
			'Accept-Language': 'it',
			'User-Agent': getUserAgent()
		}
	});

	if (!response.ok) {
		throw new Error(`Nominatim lookup failed with ${response.status}`);
	}

	const payload = (await response.json()) as NominatimResult[];
	const suggestions = Array.isArray(payload)
		? payload
				.map(toSuggestion)
				.filter((suggestion): suggestion is LocationSuggestion => Boolean(suggestion))
				.filter(isPiemonteSuggestion)
		: [];

	cache.set(cacheKey, {
		expiresAt: Date.now() + CACHE_TTL_MS,
		suggestions
	});

	return suggestions;
}
