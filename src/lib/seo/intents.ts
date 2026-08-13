import type { PropertyContract, PropertySeoIntent, SeoIntent } from './types';

export const SEO_INTENTS = [
	'case-in-vendita',
	'case-in-affitto',
	'valutazione-casa'
] as const satisfies readonly SeoIntent[];

export const AGENCY_NAME = 'REI Casa';

export type SeoIntentDefinition = {
	intent: SeoIntent;
	hubTitle: string;
	hubDescription: string;
	hubEyebrow: string;
	locationHeading: (locationName: string) => string;
	locationTitle: (locationName: string) => string;
	locationDescription: (locationName: string) => string;
	locationIntro: (locationName: string) => string;
	contract: PropertyContract | null;
	inventoryLabel: string;
};

export const seoIntentDefinitions: Record<SeoIntent, SeoIntentDefinition> = {
	'case-in-vendita': {
		intent: 'case-in-vendita',
		hubTitle: 'Case in vendita nel Canavese',
		hubDescription:
			'Scopri gli immobili in vendita nei comuni del Canavese seguiti da REI Casa, con annunci aggiornati e riferimenti di mercato locali.',
		hubEyebrow: 'Comprare nel territorio',
		locationHeading: (name) => `Case in vendita a ${name}`,
		locationTitle: (name) => `Case in vendita a ${name} | ${AGENCY_NAME}`,
		locationDescription: (name) =>
			`Scopri le case in vendita a ${name}: annunci REI Casa aggiornati, filtri di ricerca e riferimenti medi di mercato al metro quadro.`,
		locationIntro: (name) =>
			`Consulta gli immobili attualmente disponibili a ${name}, confronta caratteristiche e prezzi e restringi la ricerca in base alle tue esigenze.`,
		contract: 'for_sale',
		inventoryLabel: 'immobili in vendita'
	},
	'case-in-affitto': {
		intent: 'case-in-affitto',
		hubTitle: 'Case in affitto nel Canavese',
		hubDescription:
			'Esplora gli immobili in affitto nei comuni del Canavese selezionati da REI Casa, con ricerca pratica e dati locali sui canoni richiesti.',
		hubEyebrow: 'Abitare nel territorio',
		locationHeading: (name) => `Case in affitto a ${name}`,
		locationTitle: (name) => `Case in affitto a ${name} | ${AGENCY_NAME}`,
		locationDescription: (name) =>
			`Trova case in affitto a ${name}: annunci REI Casa aggiornati, filtri utili e riferimenti medi locali per le locazioni.`,
		locationIntro: (name) =>
			`Consulta le disponibilità in affitto a ${name} e usa i filtri per individuare gli immobili coerenti con spazi, caratteristiche e budget.`,
		contract: 'for_rent',
		inventoryLabel: 'immobili in affitto'
	},
	'valutazione-casa': {
		intent: 'valutazione-casa',
		hubTitle: 'Valutazione casa nel Canavese',
		hubDescription:
			'Ottieni una prima stima orientativa del tuo immobile nei comuni del Canavese coperti dai dati di mercato REI Casa.',
		hubEyebrow: 'Conoscere il valore',
		locationHeading: (name) => `Quanto vale la tua casa a ${name}?`,
		locationTitle: (name) => `Quanto vale la tua casa a ${name}? | ${AGENCY_NAME}`,
		locationDescription: (name) =>
			`Calcola una stima orientativa della tua casa a ${name} con il valutatore REI e consulta i prezzi medi richiesti al metro quadro.`,
		locationIntro: (name) =>
			`Parti dai dati dell’immobile e dal riferimento di mercato del comune di ${name}. La stima automatica considera poi metratura, stato e caratteristiche specifiche.`,
		contract: null,
		inventoryLabel: ''
	}
};

export function isSeoIntent(value: string): value is SeoIntent {
	return SEO_INTENTS.includes(value as SeoIntent);
}

export function isPropertySeoIntent(intent: SeoIntent): intent is PropertySeoIntent {
	return intent !== 'valutazione-casa';
}

export function getSeoIntentDefinition(intent: SeoIntent): SeoIntentDefinition {
	return seoIntentDefinitions[intent];
}
