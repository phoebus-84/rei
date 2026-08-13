import { SEO_INTENTS } from '$lib/seo/intents';
import { buildLocalSeoSitemapEntries } from '$lib/seo/sitemap';
import { getEnabledSeoPages } from '$lib/server/seo-pages';
import type { RequestHandler } from './$types';

const staticPaths = ['/', '/immobili', '/valutazione'];

export const GET: RequestHandler = async ({ url, setHeaders }) => {
	const pages = await getEnabledSeoPages();
	const entries = [
		...staticPaths.map((path) => ({ loc: `${url.origin}${path}`, lastmod: null })),
		...SEO_INTENTS.map((intent) => ({ loc: `${url.origin}/${intent}`, lastmod: null })),
		...buildLocalSeoSitemapEntries(url.origin, pages)
	];

	setHeaders({
		'content-type': 'application/xml; charset=utf-8',
		'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
	});

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
			.map(
				(entry) =>
					`  <url><loc>${escapeXml(entry.loc)}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}</url>`
			)
			.join('\n')}\n</urlset>`
	);
};

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}
