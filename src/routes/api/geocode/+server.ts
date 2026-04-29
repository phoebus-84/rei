import { searchLocations } from '$lib/server/nominatim';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const query = url.searchParams.get('q') || '';
	const limit = Number(url.searchParams.get('limit') || '5');

	try {
		const suggestions = await searchLocations(query, Number.isFinite(limit) ? limit : 5, fetch);

		return json({ suggestions });
	} catch (error) {
		console.error('Errore lookup Nominatim:', error);

		return json({ suggestions: [], error: 'Lookup posizione non disponibile' }, { status: 502 });
	}
};
