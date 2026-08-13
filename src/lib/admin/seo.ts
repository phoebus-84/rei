import type { RecordModel } from 'pocketbase';
import { SEO_INTENTS, getSeoIntentDefinition } from '$lib/seo/intents';
import type { SeoIntent } from '$lib/seo/types';

export const seoIntentOptions = SEO_INTENTS.map((intent) => ({
	value: intent,
	label: getSeoIntentDefinition(intent).hubTitle.replace(' nel Canavese', '')
}));

export const seoIntentLabels = Object.fromEntries(
	seoIntentOptions.map((option) => [option.value, option.label])
) as Record<SeoIntent, string>;

export function normalizeSeoSlug(value: string) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[’']/g, '-')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');
}

export function seoLocationPayload(input: {
	slug: string;
	name: string;
	province: string;
	region: string;
	latitude: string | number;
	longitude: string | number;
	nearbyLocationIds: string[];
}) {
	return {
		slug: normalizeSeoSlug(input.slug),
		name: input.name.trim(),
		province: input.province.trim(),
		region: input.region.trim(),
		latitude: optionalNumber(input.latitude),
		longitude: optionalNumber(input.longitude),
		nearby_locations: [...new Set(input.nearbyLocationIds.filter(Boolean))]
	};
}

export function seoPagePayload(input: {
	locationId: string;
	intent: SeoIntent;
	enabled: boolean;
	indexable: boolean;
	title: string;
	metaDescription: string;
	h1: string;
	intro: string;
	content: string;
}) {
	return {
		location: input.locationId,
		intent: input.intent,
		enabled: input.enabled,
		indexable: input.indexable,
		title: input.title.trim(),
		meta_description: input.metaDescription.trim(),
		h1: input.h1.trim(),
		intro: input.intro.trim(),
		content: input.content.trim()
	};
}

export function getExpandedLocation(record: RecordModel): RecordModel | null {
	const expanded = record.expand?.location;
	return Array.isArray(expanded) ? expanded[0] ?? null : expanded ?? null;
}

function optionalNumber(value: string | number) {
	if (value === '') return null;
	const number = Number(value);
	return Number.isFinite(number) ? number : null;
}
