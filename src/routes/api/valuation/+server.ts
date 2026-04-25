import { createHash } from 'node:crypto';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { createPocketBaseAdmin } from '$lib/server/pocketbase-admin';
import { sendValuationEmails } from '$lib/server/valuation-mailer';
import { calculateValuation } from '$lib/valuation/engine';
import { valuationLeadSubmissionSchema, valuationPrivacyVersion } from '$lib/valuation/submission';

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_COMPLETION_MS = 3000;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function getRateLimitState(ipAddress: string) {
	const now = Date.now();
	const current = rateLimitBuckets.get(ipAddress);

	if (!current || current.resetAt <= now) {
		const next = {
			count: 1,
			resetAt: now + RATE_LIMIT_WINDOW_MS
		};

		rateLimitBuckets.set(ipAddress, next);
		return next;
	}

	current.count += 1;
	rateLimitBuckets.set(ipAddress, current);
	return current;
}

function cleanupExpiredRateLimits() {
	const now = Date.now();

	for (const [ipAddress, state] of rateLimitBuckets.entries()) {
		if (state.resetAt <= now) {
			rateLimitBuckets.delete(ipAddress);
		}
	}
}

function hashIpAddress(ipAddress: string) {
	const salt = process.env.IP_HASH_SALT || 'rei-valuation-leads';

	return createHash('sha256').update(`${salt}:${ipAddress}`).digest('hex');
}

export const POST: RequestHandler = async ({ getClientAddress, request, url }) => {
	cleanupExpiredRateLimits();

	const ipAddress = getClientAddress();
	const rateLimit = getRateLimitState(ipAddress);

	if (rateLimit.count > RATE_LIMIT_MAX_REQUESTS) {
		return json(
			{
				error: 'Troppi tentativi. Riprova tra qualche minuto.'
			},
			{
				status: 429,
				headers: {
					'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000))
				}
			}
		);
	}

	let payload: unknown;

	try {
		payload = await request.json();
	} catch {
		return json({ error: 'Payload JSON non valido.' }, { status: 400 });
	}

	const parsed = valuationLeadSubmissionSchema.safeParse(payload);

	if (!parsed.success) {
		return json(
			{
				error: 'Dati non validi.',
				issues: parsed.error.flatten()
			},
			{ status: 400 }
		);
	}

	const submission = parsed.data;

	if (submission.honeypot) {
		return json({ error: 'Richiesta non valida.' }, { status: 400 });
	}

	if (Date.now() - submission.startedAt < MIN_FORM_COMPLETION_MS) {
		return json({ error: 'Invio troppo rapido. Riprova.' }, { status: 400 });
	}

	const valuation = calculateValuation({
		areaKey: submission.areaKey,
		squareMeters: submission.squareMeters,
		rooms: submission.rooms,
		condition: submission.condition,
		floor: submission.floor,
		extras: submission.extras
	});

	try {
		const pb = await createPocketBaseAdmin();
		const consentTimestamp = new Date().toISOString();
		const sourceUrl = submission.sourceUrl || url.origin + url.pathname;

		await pb.collection('valuation_leads').create({
			property_data: {
				areaKey: submission.areaKey,
				squareMeters: submission.squareMeters,
				rooms: submission.rooms,
				condition: submission.condition,
				floor: submission.floor,
				extras: submission.extras
			},
			price_min: valuation.min,
			price_max: valuation.max,
			price_final: valuation.final,
			currency: valuation.currency,
			full_name: submission.fullName,
			email: submission.email,
			phone: submission.phone,
			consent_given: submission.privacyAccepted,
			consent_timestamp: consentTimestamp,
			privacy_version: submission.privacyVersion || valuationPrivacyVersion,
			locale: submission.locale,
			utm: submission.utm,
			status: 'new',
			source_url: sourceUrl,
			ip_hash: hashIpAddress(ipAddress)
		});

		await sendValuationEmails({
			fullName: submission.fullName,
			email: submission.email,
			phone: submission.phone,
			locale: submission.locale,
			privacyVersion: submission.privacyVersion || valuationPrivacyVersion,
			consentTimestamp,
			sourceUrl,
			utm: submission.utm,
			property: {
				areaKey: submission.areaKey,
				squareMeters: submission.squareMeters,
				rooms: submission.rooms,
				condition: submission.condition,
				floor: submission.floor,
				extras: submission.extras
			},
			valuation
		});

		return json({
			min: valuation.min,
			max: valuation.max,
			currency: valuation.currency
		});
	} catch (error) {
		console.error('Errore nel salvataggio della valutazione:', error);

		return json(
			{
				error: 'Errore interno durante il salvataggio della valutazione.'
			},
			{ status: 500 }
		);
	}
};
