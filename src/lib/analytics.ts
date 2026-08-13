export type AnalyticsEventName =
	| 'seo_property_opened'
	| 'seo_search_interaction'
	| 'seo_valuation_started'
	| 'seo_valuation_completed'
	| 'seo_contact_clicked'
	| 'seo_nearby_location_clicked';

export function trackEvent(
	name: AnalyticsEventName,
	properties: Record<string, string | number> = {}
) {
	if (typeof window === 'undefined') return;

	window.dispatchEvent(
		new CustomEvent('rei:analytics', {
			detail: { name, properties }
		})
	);
}
