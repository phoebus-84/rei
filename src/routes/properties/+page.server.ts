import { pb } from '$lib/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const pageSize = 12;

	// Build filter string from query params
	let filter = 'status != "empty"'; // Always exclude empty records

	const keyword = url.searchParams.get('keyword');
	const status = url.searchParams.get('status') || 'for_sale';
	const minPrice = url.searchParams.get('minPrice');
	const maxPrice = url.searchParams.get('maxPrice');
	const type = url.searchParams.get('type');
	const bedrooms = url.searchParams.get('bedrooms');
	const minBedrooms = url.searchParams.get('minBedrooms');

	// Status filter
	if (status) {
		filter += ` && status = "${status}"`;
	}

	// Keyword search (city or address)
	if (keyword) {
		filter += ` && (city ~ "${keyword}" || address ~ "${keyword}")`;
	}

	// Price range
	if (minPrice) {
		filter += ` && price >= ${minPrice}`;
	}
	if (maxPrice) {
		filter += ` && price <= ${maxPrice}`;
	}

	// Property type
	if (type) {
		filter += ` && property_type = "${type}"`;
	}

	// Bedrooms
	if (minBedrooms) {
		filter += ` && bedrooms >= ${minBedrooms}`;
	} else if (bedrooms) {
		filter += ` && bedrooms = ${bedrooms}`;
	}

	try {
		const result = await pb.collection('properties').getList(page, pageSize, {
			filter,
			sort: '-featured,-created',
			expand: 'agent'
		});

		return {
			properties: result.items,
			totalItems: result.totalItems,
			totalPages: result.totalPages,
			currentPage: page,
			pageSize
		};
	} catch (error) {
		console.error('Failed to fetch properties:', error);
		return {
			properties: [],
			totalItems: 0,
			totalPages: 0,
			currentPage: page,
			pageSize,
			error: 'Failed to load properties'
		};
	}
};
