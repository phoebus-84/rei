import { pb } from '$lib/pocketbase';
import type { PropertyContract, SeoInventory, SeoLocation } from '$lib/seo/types';

const DEFAULT_PAGE_SIZE = 12;

export async function getPropertiesForSeoLocation(options: {
	location: SeoLocation;
	contract: PropertyContract;
	nearbyLocations: SeoLocation[];
	page?: number;
	pageSize?: number;
	sort?: string;
}): Promise<SeoInventory> {
	const pageSize = options.pageSize ?? DEFAULT_PAGE_SIZE;
	const page = Math.max(1, options.page ?? 1);
	const filter = propertyFilter(options.location.name, options.contract);
	const sort = normalizeSort(options.sort);

	try {
		const result = await pb.collection('properties').getList(page, pageSize, {
			filter,
			sort,
			expand: 'agent'
		});
		const fallbackProperties =
			result.totalItems === 0
				? await getNearbyProperties(options.nearbyLocations, options.contract)
				: [];

		return {
			properties: result.items,
			totalItems: result.totalItems,
			totalPages: result.totalPages,
			currentPage: page,
			pageSize,
			fallbackProperties
		};
	} catch (error) {
		console.error('Errore nel caricamento degli immobili SEO:', error);
		return {
			properties: [],
			totalItems: 0,
			totalPages: 0,
			currentPage: page,
			pageSize,
			fallbackProperties: []
		};
	}
}

export function propertyFilter(municipality: string, contract: PropertyContract) {
	return `status = ${filterValue(contract)} && city = ${filterValue(municipality)}`;
}

async function getNearbyProperties(locations: SeoLocation[], contract: PropertyContract) {
	if (locations.length === 0) return [];

	const municipalities = locations
		.map((location) => `city = ${filterValue(location.name)}`)
		.join(' || ');

	try {
		return await pb
			.collection('properties')
			.getList(1, 6, {
				filter: `status = ${filterValue(contract)} && (${municipalities})`,
				sort: '-featured,-created',
				expand: 'agent'
			})
			.then((result) => result.items);
	} catch (error) {
		console.error('Errore nel caricamento degli immobili nei comuni vicini:', error);
		return [];
	}
}

function normalizeSort(sort: string | undefined) {
	switch (sort) {
		case 'price':
			return 'price';
		case '-price':
			return '-price';
		case '-created':
			return '-created';
		default:
			return '-featured,-created';
	}
}

function filterValue(value: string) {
	return JSON.stringify(value);
}
