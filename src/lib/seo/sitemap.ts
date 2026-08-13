import type { SeoPageWithLocation } from './types';

export type SitemapEntry = { loc: string; lastmod: string | null };

export function buildLocalSeoSitemapEntries(
	origin: string,
	pages: SeoPageWithLocation[]
): SitemapEntry[] {
	return pages
		.filter((page) => page.enabled && page.indexable)
		.map((page) => ({
			loc: `${origin.replace(/\/$/, '')}/${page.intent}/${page.location.slug}`,
			lastmod: toDateOnly(page.updatedAt)
		}));
}

function toDateOnly(value: string | null) {
	if (!value) return null;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}
