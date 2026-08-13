import { error } from '@sveltejs/kit';
import { getSeoIntentDefinition, isSeoIntent } from '$lib/seo/intents';
import { getEnabledSeoPages } from '$lib/server/seo-pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	if (!isSeoIntent(params.intent)) throw error(404, 'Pagina non trovata');

	const definition = getSeoIntentDefinition(params.intent);
	const pages = await getEnabledSeoPages(params.intent);

	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600'
	});

	return {
		intent: params.intent,
		definition,
		locations: pages.map((page) => page.location),
		metadata: {
			title: `${definition.hubTitle} | REI Casa`,
			description: definition.hubDescription,
			canonical: `${url.origin}/${params.intent}`
		}
	};
};
