import { z } from 'zod';

import { valuationInputSchema } from './engine';

export const valuationPrivacyVersion = '2026-04-25';

const phonePattern = /^[+]?[(]?[0-9]{2,4}[)]?([\s.-]?[0-9]{2,6}){2,5}$/;

export const valuationLeadSubmissionSchema = valuationInputSchema
	.extend({
		fullName: z.string().trim().min(2).max(120),
		email: z.string().trim().email(),
		phone: z
			.string()
			.trim()
			.min(6)
			.max(30)
			.refine((value) => phonePattern.test(value), 'Telefono non valido'),
		privacyAccepted: z.literal(true),
		privacyVersion: z.string().trim().min(1).default(valuationPrivacyVersion),
		locale: z.string().trim().min(2).max(5).default('it'),
		sourceUrl: z.string().trim().url().optional(),
		utm: z.record(z.string(), z.string()).optional(),
		startedAt: z.number().int().positive(),
		honeypot: z.string().max(0).default('')
	})
	.refine((value) => Boolean(value.selectedLocation), {
		path: ['selectedLocation'],
		message: 'Seleziona una posizione precisa dai suggerimenti.'
	});

export type ValuationLeadSubmission = z.infer<typeof valuationLeadSubmissionSchema>;
