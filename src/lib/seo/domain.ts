import { getSeoIntentDefinition } from './intents';
import type { SeoIntent, SeoLink, SeoLocation, SeoMarketData, SeoMetadata, SeoPage } from './types';
import { resolveValuationMarketAreaByMunicipality } from '$lib/valuation/market-resolver';

export function buildSeoMetadata(
	seoPage: SeoPage,
	location: SeoLocation,
	origin: string,
	hasSearchParams = false
): SeoMetadata {
	const definition = getSeoIntentDefinition(seoPage.intent);
	const canonical = `${origin.replace(/\/$/, '')}/${seoPage.intent}/${location.slug}`;

	return {
		title: seoPage.title || definition.locationTitle(location.name),
		description: seoPage.metaDescription || definition.locationDescription(location.name),
		canonical,
		robots: seoPage.indexable && !hasSearchParams ? 'index,follow' : 'noindex,follow'
	};
}

export function buildLocationCopy(seoPage: SeoPage, location: SeoLocation) {
	const definition = getSeoIntentDefinition(seoPage.intent);

	return {
		h1: seoPage.h1 || definition.locationHeading(location.name),
		intro: seoPage.intro || definition.locationIntro(location.name),
		content: seoPage.content
	};
}

export function buildNearbyLinks(
	location: SeoLocation,
	intent: SeoIntent,
	enabledLocations: SeoLocation[]
): SeoLink[] {
	const enabledById = new Map(enabledLocations.map((item) => [item.id, item]));

	return location.nearbyLocationIds.flatMap((id) => {
		const nearby = enabledById.get(id);
		if (!nearby) return [];

		return [
			{
				slug: nearby.slug,
				name: nearby.name,
				href: `/${intent}/${nearby.slug}`
			}
		];
	});
}

export function getSeoMarketData(municipality: string): SeoMarketData | null {
	const area = resolveValuationMarketAreaByMunicipality(municipality);
	if (!area) return null;

	const salePricePerSqm = positiveNumberOrNull(area.pricePerSqmBase);
	const rentPricePerSqm = positiveNumberOrNull(area.rentPricePerSqmBase);

	if (salePricePerSqm === null && rentPricePerSqm === null) return null;

	return {
		municipality,
		salePricePerSqm,
		rentPricePerSqm,
		exampleSaleValue100Sqm: salePricePerSqm === null ? null : Math.round(salePricePerSqm * 100),
		referenceDate: area.capturedAt,
		referenceLabel: formatReferenceDate(area.capturedAt),
		sourceLabel: area.sourceName,
		sourceUrl: area.sourceUrl
	};
}

export function formatMarketCurrency(value: number, maximumFractionDigits = 0) {
	return new Intl.NumberFormat('it-IT', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits
	}).format(value);
}

function positiveNumberOrNull(value: number | null | undefined) {
	return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
}

function formatReferenceDate(value: string) {
	const [year, month, day] = value.split('-').map(Number);
	if (!year || !month || !day) return value;

	return new Intl.DateTimeFormat('it-IT', {
		month: 'long',
		year: 'numeric'
	}).format(new Date(Date.UTC(year, month - 1, day)));
}
