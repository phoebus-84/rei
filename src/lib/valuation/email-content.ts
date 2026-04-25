import { getBasePrice } from './baseline-prices';
import type { ValuationCondition, ValuationExtra, ValuationFloor, ValuationResult } from './engine';

export type ValuationEmailPayload = {
	fullName: string;
	email: string;
	phone: string;
	locale: string;
	privacyVersion: string;
	consentTimestamp: string;
	sourceUrl: string;
	utm?: Record<string, string>;
	property: {
		areaKey: string;
		squareMeters: number;
		rooms: number;
		condition: ValuationCondition;
		floor: ValuationFloor;
		extras: Partial<Record<ValuationExtra, boolean>>;
	};
	valuation: Pick<ValuationResult, 'min' | 'max' | 'currency' | 'final'>;
};

export type ValuationEmailBranding = {
	brandName: string;
	brandEmail: string;
	brandPhone: string;
	siteUrl: string;
	bookingUrl: string;
	logoUrl?: string;
};

export type ValuationEmailContent = {
	subject: string;
	html: string;
	text: string;
};

const conditionLabels: Record<ValuationCondition, { it: string; en: string }> = {
	da_ristrutturare: { it: 'Da ristrutturare', en: 'Needs renovation' },
	buono: { it: 'Buono stato', en: 'Good condition' },
	ristrutturato: { it: 'Ristrutturato', en: 'Renovated' },
	nuova_costruzione: { it: 'Nuova costruzione', en: 'New build' }
};

const floorLabels: Record<ValuationFloor, { it: string; en: string }> = {
	piano_terra: { it: 'Piano terra', en: 'Ground floor' },
	primo_piano: { it: 'Primo piano', en: 'First floor' },
	secondo_con_ascensore: { it: 'Secondo con ascensore', en: 'Second floor with elevator' },
	secondo_senza_ascensore: { it: 'Secondo senza ascensore', en: 'Second floor without elevator' },
	terzo_piu_con_ascensore: { it: 'Terzo o piu con ascensore', en: 'Third+ floor with elevator' },
	terzo_piu_senza_ascensore: {
		it: 'Terzo o piu senza ascensore',
		en: 'Third+ floor without elevator'
	},
	attico: { it: 'Attico', en: 'Penthouse' }
};

const extraLabels: Record<ValuationExtra, { it: string; en: string }> = {
	box_auto_singolo: { it: 'Box auto singolo', en: 'Single garage' },
	box_auto_doppio: { it: 'Box auto doppio', en: 'Double garage' },
	posto_auto_scoperto: { it: 'Posto auto scoperto', en: 'Outdoor parking space' },
	giardino_privato: { it: 'Giardino privato', en: 'Private garden' },
	terrazzo_abitabile: { it: 'Terrazzo abitabile', en: 'Large terrace' }
};

function isItalian(locale: string) {
	return locale.toLowerCase().startsWith('it');
}

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function formatCurrency(value: number, currency: string, locale: string) {
	return new Intl.NumberFormat(isItalian(locale) ? 'it-IT' : 'en-GB', {
		style: 'currency',
		currency,
		maximumFractionDigits: 0
	}).format(value);
}

function formatTimestamp(value: string, locale: string) {
	const date = new Date(value);

	return new Intl.DateTimeFormat(isItalian(locale) ? 'it-IT' : 'en-GB', {
		dateStyle: 'medium',
		timeStyle: 'short'
	}).format(date);
}

function formatExtras(extras: ValuationEmailPayload['property']['extras'], locale: string) {
	const labels = Object.entries(extras)
		.filter(([, enabled]) => Boolean(enabled))
		.map(([key]) => extraLabels[key as ValuationExtra][isItalian(locale) ? 'it' : 'en']);

	return labels.length > 0
		? labels
		: [isItalian(locale) ? 'Nessuna pertinenza selezionata' : 'No extras selected'];
}

function renderSummaryRows(payload: ValuationEmailPayload) {
	const locale = payload.locale;
	const area = getBasePrice(payload.property.areaKey);
	const extraValues = formatExtras(payload.property.extras, locale);

	return [
		{
			label: isItalian(locale) ? 'Zona' : 'Area',
			value: area.label
		},
		{
			label: isItalian(locale) ? 'Superficie' : 'Surface',
			value: `${payload.property.squareMeters} m²`
		},
		{
			label: isItalian(locale) ? 'Vani' : 'Rooms',
			value: String(payload.property.rooms)
		},
		{
			label: isItalian(locale) ? 'Stato' : 'Condition',
			value: conditionLabels[payload.property.condition][isItalian(locale) ? 'it' : 'en']
		},
		{
			label: isItalian(locale) ? 'Piano' : 'Floor',
			value: floorLabels[payload.property.floor][isItalian(locale) ? 'it' : 'en']
		},
		{
			label: isItalian(locale) ? 'Pertinenze' : 'Extras',
			value: extraValues.join(', ')
		}
	];
}

function renderSummaryTable(rows: Array<{ label: string; value: string }>) {
	return rows
		.map(
			({ label, value }) => `
				<tr>
					<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#6b6258;font-size:14px;vertical-align:top;">${escapeHtml(label)}</td>
					<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#201a14;font-size:14px;font-weight:600;text-align:right;vertical-align:top;">${escapeHtml(value)}</td>
				</tr>`
		)
		.join('');
}

function renderUtmRows(utm: Record<string, string> | undefined) {
	if (!utm || Object.keys(utm).length === 0) {
		return '<tr><td colspan="2" style="padding:10px 0;color:#6b6258;font-size:14px;">Nessun parametro UTM</td></tr>';
	}

	return Object.entries(utm)
		.map(
			([key, value]) => `
				<tr>
					<td style="padding:8px 0;border-bottom:1px solid #e7e0d8;color:#6b6258;font-size:13px;vertical-align:top;">${escapeHtml(key)}</td>
					<td style="padding:8px 0;border-bottom:1px solid #e7e0d8;color:#201a14;font-size:13px;font-weight:600;text-align:right;vertical-align:top;">${escapeHtml(value)}</td>
				</tr>`
		)
		.join('');
}

export function renderProspectValuationEmail(
	payload: ValuationEmailPayload,
	branding: ValuationEmailBranding
): ValuationEmailContent {
	const italian = isItalian(payload.locale);
	const area = getBasePrice(payload.property.areaKey);
	const range = `${formatCurrency(payload.valuation.min, payload.valuation.currency, payload.locale)} - ${formatCurrency(payload.valuation.max, payload.valuation.currency, payload.locale)}`;
	const subject = italian
		? `La tua stima orientativa REI per ${area.label}`
		: `Your REI preliminary valuation for ${area.label}`;
	const rows = renderSummaryRows(payload);
	const greeting = italian ? `Ciao ${payload.fullName},` : `Hello ${payload.fullName},`;
	const intro = italian
		? 'grazie per aver richiesto una valutazione preliminare del tuo immobile. Qui sotto trovi la fascia orientativa stimata dal modello REI.'
		: 'thank you for requesting a preliminary property valuation. Below you can find the indicative range estimated by the REI model.';
	const disclaimer = italian
		? "Questa fascia non sostituisce una perizia o un sopralluogo. Serve a capire il posizionamento iniziale dell'immobile sul mercato."
		: 'This range does not replace an appraisal or on-site visit. It is intended to define an initial market positioning.';
	const cta = italian ? 'Prenota un sopralluogo gratuito' : 'Book a free in-person appraisal';
	const summaryTitle = italian ? 'Riepilogo immobile' : 'Property summary';
	const noteTitle = italian ? 'Nota importante' : 'Important note';
	const contactLabel = italian ? 'Contatti REI' : 'REI contacts';

	const html = `
		<!doctype html>
		<html lang="${italian ? 'it' : 'en'}">
			<body style="margin:0;padding:0;background:#f7f2ea;font-family:Georgia, 'Times New Roman', serif;color:#201a14;">
				<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f2ea;padding:32px 0;">
					<tr>
						<td align="center">
							<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fffdf8;border:1px solid #eadfd2;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(50,34,20,0.08);">
								<tr>
									<td style="padding:32px 32px 24px;background:linear-gradient(135deg,#f7efe5 0%,#edf6f4 100%);border-bottom:1px solid #eadfd2;">
										${branding.logoUrl ? `<img src="${escapeHtml(branding.logoUrl)}" alt="${escapeHtml(branding.brandName)}" style="height:44px;width:auto;display:block;margin-bottom:18px;" />` : ''}
										<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#2d7a74;font-weight:700;">REI valuation</p>
										<h1 style="margin:0;font-size:34px;line-height:1.05;font-weight:700;color:#201a14;">${escapeHtml(range)}</h1>
										<p style="margin:16px 0 0;font-size:16px;line-height:1.7;color:#4e463e;">${escapeHtml(greeting)} ${escapeHtml(intro)}</p>
									</td>
								</tr>
								<tr>
									<td style="padding:28px 32px;">
										<p style="margin:0 0 14px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#2d7a74;font-weight:700;">${escapeHtml(summaryTitle)}</p>
										<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${renderSummaryTable(rows)}</table>
										<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;background:#fcf5ec;border:1px solid #f0dcc5;border-radius:20px;">
											<tr>
												<td style="padding:24px;">
													<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#b55c35;font-weight:700;">${escapeHtml(noteTitle)}</p>
													<p style="margin:0;font-size:15px;line-height:1.7;color:#4e463e;">${escapeHtml(disclaimer)}</p>
												</td>
											</tr>
										</table>
										<div style="margin-top:28px;">
											<a href="${escapeHtml(branding.bookingUrl)}" style="display:inline-block;padding:15px 24px;background:#2d7a74;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:700;letter-spacing:0.04em;">${escapeHtml(cta)}</a>
										</div>
									</td>
								</tr>
								<tr>
									<td style="padding:0 32px 32px;">
										<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#6b6258;font-weight:700;">${escapeHtml(contactLabel)}</p>
										<p style="margin:0;font-size:14px;line-height:1.7;color:#4e463e;">${escapeHtml(branding.brandName)} · ${escapeHtml(branding.brandPhone)} · ${escapeHtml(branding.brandEmail)}</p>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</body>
		</html>`;

	const text = [
		subject,
		'',
		greeting,
		intro,
		'',
		`${italian ? 'Fascia orientativa' : 'Indicative range'}: ${range}`,
		'',
		...rows.map(({ label, value }) => `${label}: ${value}`),
		'',
		disclaimer,
		'',
		`${cta}: ${branding.bookingUrl}`,
		`${branding.brandName}: ${branding.brandPhone} · ${branding.brandEmail}`
	].join('\n');

	return { subject, html, text };
}

export function renderAgentNotificationEmail(
	payload: ValuationEmailPayload,
	branding: ValuationEmailBranding
): ValuationEmailContent {
	const area = getBasePrice(payload.property.areaKey);
	const range = `${formatCurrency(payload.valuation.min, payload.valuation.currency, 'it')} - ${formatCurrency(payload.valuation.max, payload.valuation.currency, 'it')}`;
	const subject = `Nuova lead valutazione · ${area.label} · ${range}`;
	const rows = renderSummaryRows({ ...payload, locale: 'it' });

	const html = `
		<!doctype html>
		<html lang="it">
			<body style="margin:0;padding:0;background:#f5f1ea;font-family:Arial, Helvetica, sans-serif;color:#201a14;">
				<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f1ea;padding:32px 0;">
					<tr>
						<td align="center">
							<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fffdf8;border:1px solid #eadfd2;border-radius:22px;overflow:hidden;">
								<tr>
									<td style="padding:28px 32px;background:#163432;color:#ffffff;">
										<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#cde4e1;font-weight:700;">Nuova lead</p>
										<h1 style="margin:0;font-size:28px;line-height:1.1;font-weight:700;">${escapeHtml(payload.fullName)} · ${escapeHtml(area.label)}</h1>
										<p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:#dcebe9;">Range stimato: <strong>${escapeHtml(range)}</strong></p>
									</td>
								</tr>
								<tr>
									<td style="padding:28px 32px;">
										<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
											<tr>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#6b6258;font-size:14px;">Nome</td>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#201a14;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(payload.fullName)}</td>
											</tr>
											<tr>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#6b6258;font-size:14px;">Email</td>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#201a14;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(payload.email)}</td>
											</tr>
											<tr>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#6b6258;font-size:14px;">Telefono</td>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#201a14;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(payload.phone)}</td>
											</tr>
											<tr>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#6b6258;font-size:14px;">Consenso registrato</td>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#201a14;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(formatTimestamp(payload.consentTimestamp, 'it'))}</td>
											</tr>
											<tr>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#6b6258;font-size:14px;">Privacy version</td>
												<td style="padding:10px 0;border-bottom:1px solid #e7e0d8;color:#201a14;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(payload.privacyVersion)}</td>
											</tr>
											<tr>
												<td style="padding:10px 0;color:#6b6258;font-size:14px;vertical-align:top;">Origine</td>
												<td style="padding:10px 0;color:#201a14;font-size:14px;font-weight:700;text-align:right;vertical-align:top;">${escapeHtml(payload.sourceUrl)}</td>
											</tr>
										</table>

										<p style="margin:0 0 14px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#2d7a74;font-weight:700;">Dettagli immobile</p>
										<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">${renderSummaryTable(rows)}</table>

										<p style="margin:0 0 14px;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#2d7a74;font-weight:700;">UTM</p>
										<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${renderUtmRows(payload.utm)}</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</body>
		</html>`;

	const text = [
		subject,
		'',
		`Nome: ${payload.fullName}`,
		`Email: ${payload.email}`,
		`Telefono: ${payload.phone}`,
		`Range stimato: ${range}`,
		`Consenso registrato: ${formatTimestamp(payload.consentTimestamp, 'it')}`,
		`Privacy version: ${payload.privacyVersion}`,
		`Origine: ${payload.sourceUrl}`,
		'',
		...rows.map(({ label, value }) => `${label}: ${value}`),
		'',
		'UTM:',
		...(payload.utm
			? Object.entries(payload.utm).map(([key, value]) => `${key}: ${value}`)
			: ['Nessun parametro UTM'])
	].join('\n');

	return { subject, html, text };
}
