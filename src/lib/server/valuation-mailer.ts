import nodemailer from 'nodemailer';

import { env } from '$env/dynamic/private';

import {
	renderAgentNotificationEmail,
	renderProspectValuationEmail,
	type ValuationEmailPayload
} from '$lib/valuation/email-content';

type MailDeliveryResult = {
	prospectSent: boolean;
	agentSent: boolean;
	skipped: boolean;
};

let cachedTransporter: nodemailer.Transporter | null | undefined;

function asBoolean(value: string | undefined) {
	return value === 'true' || value === '1';
}

function getTransporter() {
	if (cachedTransporter !== undefined) {
		return cachedTransporter;
	}

	if (!env.SMTP_HOST || !env.SMTP_PORT || !env.SMTP_FROM) {
		cachedTransporter = null;
		return cachedTransporter;
	}

	cachedTransporter = nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: Number(env.SMTP_PORT),
		secure: asBoolean(env.SMTP_SECURE),
		auth:
			env.SMTP_USER && env.SMTP_PASSWORD
				? {
						user: env.SMTP_USER,
						pass: env.SMTP_PASSWORD
					}
				: undefined
	});

	return cachedTransporter;
}

export async function sendValuationEmails(
	payload: ValuationEmailPayload
): Promise<MailDeliveryResult> {
	const transporter = getTransporter();

	if (!transporter || !env.SMTP_FROM) {
		console.warn('Valuation emails skipped: SMTP configuration is incomplete.');
		return {
			prospectSent: false,
			agentSent: false,
			skipped: true
		};
	}

	const branding = {
		brandName: 'REI Casa',
		brandEmail: 'info@reicasa.it',
		brandPhone: '+39 0125 282335',
		siteUrl: env.SITE_URL || 'https://reicasa.it',
		bookingUrl: env.VALUATION_BOOKING_URL || 'tel:+390125282335',
		logoUrl: `${env.SITE_URL || 'https://reicasa.it'}/email/rei-logo.png`
	};

	const prospectEmail = renderProspectValuationEmail(payload, branding);
	const agentEmail = renderAgentNotificationEmail(payload, branding);
	const agentRecipient = env.AGENT_NOTIFICATION_EMAIL;
	const agentPromise = agentRecipient
		? transporter.sendMail({
				from: env.SMTP_FROM,
				to: agentRecipient,
				replyTo: payload.email,
				subject: agentEmail.subject,
				html: agentEmail.html,
				text: agentEmail.text
			})
		: Promise.resolve(null);

	const [prospectResult, agentResult] = await Promise.allSettled([
		transporter.sendMail({
			from: env.SMTP_FROM,
			to: payload.email,
			replyTo: branding.brandEmail,
			subject: prospectEmail.subject,
			html: prospectEmail.html,
			text: prospectEmail.text
		}),
		agentPromise
	]);

	if (prospectResult.status === 'rejected') {
		console.error('Errore invio email prospect valuation:', prospectResult.reason);
	}

	if (agentResult.status === 'rejected') {
		console.error('Errore invio email agent valuation:', agentResult.reason);
	}

	return {
		prospectSent: prospectResult.status === 'fulfilled',
		agentSent: Boolean(agentRecipient) && agentResult.status === 'fulfilled',
		skipped: false
	};
}
