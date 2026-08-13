import { pb } from '$lib/pocketbase';
import { buildNearbyLinks } from '$lib/seo/domain';
import type { SeoIntent, SeoLocation, SeoPage, SeoPageWithLocation } from '$lib/seo/types';
import type { RecordModel } from 'pocketbase';

export async function getSeoPage(
	intent: SeoIntent,
	locationSlug: string
): Promise<SeoPageWithLocation | null> {
	try {
		const record = await pb
			.collection('seo_pages')
			.getFirstListItem(
				`intent = ${filterValue(intent)} && enabled = true && location.slug = ${filterValue(locationSlug)}`,
				{ expand: 'location' }
			);
		const locationRecord = record.expand?.location;
		if (!locationRecord) return null;

		return {
			...mapSeoPage(record),
			location: mapSeoLocation(locationRecord)
		};
	} catch (error) {
		if (isNotFound(error)) return null;
		throw error;
	}
}

export async function getEnabledSeoPages(intent?: SeoIntent): Promise<SeoPageWithLocation[]> {
	const intentFilter = intent ? ` && intent = ${filterValue(intent)}` : '';

	try {
		const records = await pb.collection('seo_pages').getFullList({
			filter: `enabled = true && location.slug != ""${intentFilter}`,
			sort: 'location.name,intent',
			expand: 'location'
		});

		return records.flatMap((record) => {
			const locationRecord = record.expand?.location;
			if (!locationRecord) return [];

			return [{ ...mapSeoPage(record), location: mapSeoLocation(locationRecord) }];
		});
	} catch (error) {
		if (isNotFound(error)) return [];
		throw error;
	}
}

export async function getNearbySeoPages(page: SeoPageWithLocation) {
	if (page.location.nearbyLocationIds.length === 0) return [];

	const locationFilter = page.location.nearbyLocationIds
		.map((id) => `location = ${filterValue(id)}`)
		.join(' || ');
	const records = await pb.collection('seo_pages').getFullList({
		filter: `enabled = true && intent = ${filterValue(page.intent)} && (${locationFilter})`,
		expand: 'location'
	});
	const order = new Map(page.location.nearbyLocationIds.map((id, index) => [id, index]));

	return records
		.sort(
			(left, right) =>
				(order.get(stringValue(left.location)) ?? Number.MAX_SAFE_INTEGER) -
				(order.get(stringValue(right.location)) ?? Number.MAX_SAFE_INTEGER)
		)
		.flatMap((record) => {
		const location = record.expand?.location;
			return location ? [{ ...mapSeoPage(record), location: mapSeoLocation(location) }] : [];
		});
}

export async function getNearbySeoLinks(page: SeoPageWithLocation) {
	const nearbyPages = await getNearbySeoPages(page);
	return buildNearbyLinks(
		page.location,
		page.intent,
		nearbyPages.map((nearbyPage) => nearbyPage.location)
	);
}

export function mapSeoLocation(record: RecordModel): SeoLocation {
	return {
		id: record.id,
		slug: stringValue(record.slug),
		name: stringValue(record.name),
		province: stringValue(record.province),
		region: stringValue(record.region),
		latitude: numberValue(record.latitude),
		longitude: numberValue(record.longitude),
		nearbyLocationIds: stringArray(record.nearby_locations)
	};
}

export function mapSeoPage(record: RecordModel): SeoPage {
	return {
		id: record.id,
		locationId: stringValue(record.location),
		intent: record.intent as SeoIntent,
		enabled: Boolean(record.enabled),
		indexable: Boolean(record.indexable),
		title: optionalString(record.title),
		metaDescription: optionalString(record.meta_description),
		h1: optionalString(record.h1),
		intro: optionalString(record.intro),
		content: optionalString(record.content),
		updatedAt: optionalString(record.updated)
	};
}

function filterValue(value: string) {
	return JSON.stringify(value);
}

function stringValue(value: unknown) {
	return typeof value === 'string' ? value : '';
}

function optionalString(value: unknown) {
	const result = stringValue(value).trim();
	return result || null;
}

function stringArray(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value.filter((item): item is string => typeof item === 'string' && item.length > 0);
}

function numberValue(value: unknown): number | null {
	const number = typeof value === 'number' ? value : Number(value);
	return Number.isFinite(number) ? number : null;
}

function isNotFound(error: unknown) {
	return (
		typeof error === 'object' &&
		error !== null &&
		'status' in error &&
		(error as { status?: number }).status === 404
	);
}
