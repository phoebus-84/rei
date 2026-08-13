import { pb } from '$lib/pocketbase';
import { calculateDistanceKm, parseCoordinate } from '$lib/location';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600'
	});

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
	const nearbyLat = parseCoordinate(url.searchParams.get('nearbyLat'), -90, 90);
	const nearbyLon = parseCoordinate(url.searchParams.get('nearbyLon'), -180, 180);
	const requestedRadiusKm = Number(url.searchParams.get('radiusKm') || '10');
	const radiusKm = Number.isFinite(requestedRadiusKm)
		? Math.min(Math.max(requestedRadiusKm, 1), 100)
		: 10;
	const hasNearbyFilter = nearbyLat !== null && nearbyLon !== null;

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
		if (hasNearbyFilter) {
			const allMatchingProperties = await pb.collection('properties').getFullList({
				filter,
				sort: '-featured,-created',
				expand: 'agent'
			});
			type PropertyRecord = (typeof allMatchingProperties)[number];

			const nearbyProperties: Array<PropertyRecord & { distance_km: number }> = [];

			for (const property of allMatchingProperties) {
				const latitude =
					typeof property.latitude === 'number' ? property.latitude : Number(property.latitude);
				const longitude =
					typeof property.longitude === 'number' ? property.longitude : Number(property.longitude);

				if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
					continue;
				}

				const distanceKm = calculateDistanceKm(nearbyLat, nearbyLon, latitude, longitude);

				if (distanceKm > radiusKm) {
					continue;
				}

				nearbyProperties.push({
					...property,
					distance_km: distanceKm
				});
			}

			nearbyProperties.sort((a, b) => a.distance_km - b.distance_km);

			const totalItems = nearbyProperties.length;
			const totalPages = Math.ceil(totalItems / pageSize);
			const start = (page - 1) * pageSize;

			return {
				properties: nearbyProperties.slice(start, start + pageSize),
				totalItems,
				totalPages,
				currentPage: page,
				pageSize,
				nearby: {
					latitude: nearbyLat,
					longitude: nearbyLon,
					radiusKm
				}
			};
		}

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
