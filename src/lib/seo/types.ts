import type { RecordModel } from 'pocketbase';

export type SeoIntent = 'case-in-vendita' | 'case-in-affitto' | 'valutazione-casa';
export type PropertySeoIntent = Exclude<SeoIntent, 'valutazione-casa'>;
export type PropertyContract = 'for_sale' | 'for_rent';

export type SeoLocation = {
	id: string;
	slug: string;
	name: string;
	province: string;
	region: string;
	latitude: number | null;
	longitude: number | null;
	nearbyLocationIds: string[];
};

export type SeoPage = {
	id: string;
	locationId: string;
	intent: SeoIntent;
	enabled: boolean;
	indexable: boolean;
	title: string | null;
	metaDescription: string | null;
	h1: string | null;
	intro: string | null;
	content: string | null;
	updatedAt: string | null;
};

export type SeoPageWithLocation = SeoPage & {
	location: SeoLocation;
};

export type SeoLink = {
	slug: string;
	name: string;
	href: string;
};

export type SeoMetadata = {
	title: string;
	description: string;
	canonical: string;
	robots: 'index,follow' | 'noindex,follow';
};

export type SeoMarketData = {
	municipality: string;
	salePricePerSqm: number | null;
	rentPricePerSqm: number | null;
	exampleSaleValue100Sqm: number | null;
	referenceDate: string;
	referenceLabel: string;
	sourceLabel: string;
	sourceUrl: string;
};

export type SeoInventory = {
	properties: RecordModel[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	fallbackProperties: RecordModel[];
};
