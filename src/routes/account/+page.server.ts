import { redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	// Check if user is authenticated
	if (!pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const user = pb.authStore.model;

	try {
		// Fetch saved properties
		let savedProperties = [];
		if (user?.saved_properties && user.saved_properties.length > 0) {
			const result = await pb.collection('properties').getList(1, 50, {
				filter: `id in ('${user.saved_properties.join("','")}')`
			});
			savedProperties = result.items;
		}

		return {
			user,
			savedProperties
		};
	} catch (error) {
		console.error('Failed to fetch saved properties:', error);
		return {
			user,
			savedProperties: [],
			error: 'Failed to load saved properties'
		};
	}
};
