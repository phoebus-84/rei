import { pb } from '$lib/pocketbase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	try {
		const record = await pb.collection('properties').getFirstListItem(`slug = "${slug}"`, {
			expand: 'agent'
		});

		return {
			property: record,
			agent: record.expand?.agent || null
		};
	} catch (err) {
		console.error('Errore nel caricamento immobile:', err);
		throw error(404, 'Immobile non trovato');
	}
};
