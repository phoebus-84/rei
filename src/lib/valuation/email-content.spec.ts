import { describe, expect, it } from 'vitest';

import {
	renderAgentNotificationEmail,
	renderProspectValuationEmail,
	type ValuationEmailPayload
} from './email-content';

const branding = {
	brandName: 'REI Casa',
	brandEmail: 'info@reicasa.it',
	brandPhone: '+39 0125 282335',
	siteUrl: 'https://reicasa.it',
	bookingUrl: 'tel:+390125282335',
	logoUrl: 'https://reicasa.it/email/rei-logo.png'
};

const payload: ValuationEmailPayload = {
	fullName: 'Mario Rossi',
	email: 'mario@example.com',
	phone: '+39 333 1234567',
	locale: 'it',
	privacyVersion: '2026-04-25',
	consentTimestamp: '2026-04-25T10:00:00.000Z',
	sourceUrl: 'https://reicasa.it/valutazione?utm_source=test',
	utm: {
		utm_source: 'test',
		utm_medium: 'email'
	},
	property: {
		areaKey: 'ivrea_centro',
		squareMeters: 100,
		rooms: 4,
		condition: 'ristrutturato',
		floor: 'terzo_piu_con_ascensore',
		extras: {
			box_auto_singolo: true,
			terrazzo_abitabile: true
		}
	},
	valuation: {
		min: 143000,
		max: 175000,
		currency: 'EUR',
		final: 159375
	}
};

describe('valuation email content', () => {
	it('renders the prospect email with range, CTA, and summary', () => {
		const email = renderProspectValuationEmail(payload, branding);

		expect(email.subject).toContain('Ivrea centro');
		expect(email.html).toContain('€');
		expect(email.html).toContain('Prenota un sopralluogo gratuito');
		expect(email.html).toContain('Riepilogo immobile');
		expect(email.text).toContain('Box auto singolo');
	});

	it('renders the agent notification with contact info and utm data', () => {
		const email = renderAgentNotificationEmail(payload, branding);

		expect(email.subject).toContain('Nuova lead valutazione');
		expect(email.html).toContain('mario@example.com');
		expect(email.html).toContain('utm_source');
		expect(email.text).toContain('Telefono: +39 333 1234567');
	});
});
