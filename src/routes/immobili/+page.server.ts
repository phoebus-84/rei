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
	const minRooms = url.searchParams.get('minRooms');
	const heating = url.searchParams.get('heating');
	const condition = url.searchParams.get('condition');
	const elevator = url.searchParams.get('elevator');
	const garage = url.searchParams.get('garage');
	const parking = url.searchParams.get('parking');
	const cellar = url.searchParams.get('cellar');

	const validHeating = ['autonomo', 'centralizzato', 'a_pavimento', 'assente'];
	const validCondition = ['nuovo', 'ristrutturato', 'abitabile', 'da_ristrutturare'];

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

	// Rooms
	if (minRooms) {
		filter += ` && rooms >= ${minRooms}`;
	}

	// Heating
	if (heating && validHeating.includes(heating)) {
		filter += ` && heating_type = "${heating}"`;
	}

	// Condition
	if (condition && validCondition.includes(condition)) {
		filter += ` && condition = "${condition}"`;
	}

	// Boolean amenities
	if (elevator) {
		filter += ' && has_elevator = true';
	}
	if (garage) {
		filter += ' && has_garage = true';
	}
	if (parking) {
		filter += ' && has_parking = true';
	}
	if (cellar) {
		filter += ' && has_cellar = true';
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
		console.error('Errore nel caricamento immobili:', error);
		return {
			properties: [],
			totalItems: 0,
			totalPages: 0,
			currentPage: page,
			pageSize,
			error: 'Errore nel caricamento degli immobili'
		};
	}
};
