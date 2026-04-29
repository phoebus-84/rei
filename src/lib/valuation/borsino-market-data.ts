export const borsinoMarketMetadata = {
	sourceName: 'Borsino Immobiliare',
	sourceUrl: 'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/',
	capturedAt: '2026-04-29',
	province: 'Torino',
	region: 'Piemonte',
	basis:
		'Valore M² Vendita from the Torino province summary table is used as the central/base sale price per square meter.',
	excludedZeroSaleKeys: ['lugnacco', 'pecco', 'trausella', 'vico_canavese']
} as const;

export type BorsinoMarketArea = {
	key: string;
	slug: string;
	label: string;
	municipality: string;
	province: 'Torino';
	region: 'Piemonte';
	rentPricePerSqmBase: number;
	salePricePerSqmBase: number;
	sourceUrl: string;
};

export const borsinoMarketAreas = [
	{
		key: 'torino',
		slug: 'torino',
		label: 'Torino',
		municipality: 'Torino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 6.78,
		salePricePerSqmBase: 1829,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/torino/'
	},
	{
		key: 'aglie',
		slug: 'aglie',
		label: 'Aglie',
		municipality: 'Aglie',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.79,
		salePricePerSqmBase: 650,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/aglie/'
	},
	{
		key: 'airasca',
		slug: 'airasca',
		label: 'Airasca',
		municipality: 'Airasca',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.04,
		salePricePerSqmBase: 1101,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/airasca/'
	},
	{
		key: 'ala_di_stura',
		slug: 'ala-di-stura',
		label: 'Ala Di Stura',
		municipality: 'Ala Di Stura',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.25,
		salePricePerSqmBase: 533,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ala-di-stura/'
	},
	{
		key: 'albiano_d_ivrea',
		slug: 'albiano-d-ivrea',
		label: 'Albiano D Ivrea',
		municipality: 'Albiano D Ivrea',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.07,
		salePricePerSqmBase: 505,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/albiano-d-ivrea/'
	},
	{
		key: 'almese',
		slug: 'almese',
		label: 'Almese',
		municipality: 'Almese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 6.31,
		salePricePerSqmBase: 1458,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/almese/'
	},
	{
		key: 'alpette',
		slug: 'alpette',
		label: 'Alpette',
		municipality: 'Alpette',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.05,
		salePricePerSqmBase: 492,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/alpette/'
	},
	{
		key: 'alpignano',
		slug: 'alpignano',
		label: 'Alpignano',
		municipality: 'Alpignano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.83,
		salePricePerSqmBase: 1071,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/alpignano/'
	},
	{
		key: 'andezeno',
		slug: 'andezeno',
		label: 'Andezeno',
		municipality: 'Andezeno',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.15,
		salePricePerSqmBase: 1033,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/andezeno/'
	},
	{
		key: 'andrate',
		slug: 'andrate',
		label: 'Andrate',
		municipality: 'Andrate',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.82,
		salePricePerSqmBase: 440,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/andrate/'
	},
	{
		key: 'angrogna',
		slug: 'angrogna',
		label: 'Angrogna',
		municipality: 'Angrogna',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.34,
		salePricePerSqmBase: 561,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/angrogna/'
	},
	{
		key: 'arignano',
		slug: 'arignano',
		label: 'Arignano',
		municipality: 'Arignano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.97,
		salePricePerSqmBase: 979,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/arignano/'
	},
	{
		key: 'avigliana',
		slug: 'avigliana',
		label: 'Avigliana',
		municipality: 'Avigliana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.36,
		salePricePerSqmBase: 1015,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/avigliana/'
	},
	{
		key: 'azeglio',
		slug: 'azeglio',
		label: 'Azeglio',
		municipality: 'Azeglio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.08,
		salePricePerSqmBase: 512,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/azeglio/'
	},
	{
		key: 'bairo',
		slug: 'bairo',
		label: 'Bairo',
		municipality: 'Bairo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.92,
		salePricePerSqmBase: 714,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bairo/'
	},
	{
		key: 'balangero',
		slug: 'balangero',
		label: 'Balangero',
		municipality: 'Balangero',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.77,
		salePricePerSqmBase: 639,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/balangero/'
	},
	{
		key: 'baldissero_canavese',
		slug: 'baldissero-canavese',
		label: 'Baldissero Canavese',
		municipality: 'Baldissero Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.78,
		salePricePerSqmBase: 421,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/baldissero-canavese/'
	},
	{
		key: 'baldissero_torinese',
		slug: 'baldissero-torinese',
		label: 'Baldissero Torinese',
		municipality: 'Baldissero Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.03,
		salePricePerSqmBase: 941,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/baldissero-torinese/'
	},
	{
		key: 'balme',
		slug: 'balme',
		label: 'Balme',
		municipality: 'Balme',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.46,
		salePricePerSqmBase: 599,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/balme/'
	},
	{
		key: 'banchette',
		slug: 'banchette',
		label: 'Banchette',
		municipality: 'Banchette',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.15,
		salePricePerSqmBase: 525,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/banchette/'
	},
	{
		key: 'barbania',
		slug: 'barbania',
		label: 'Barbania',
		municipality: 'Barbania',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.61,
		salePricePerSqmBase: 653,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/barbania/'
	},
	{
		key: 'bardonecchia',
		slug: 'bardonecchia',
		label: 'Bardonecchia',
		municipality: 'Bardonecchia',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 10.55,
		salePricePerSqmBase: 2307,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bardonecchia/'
	},
	{
		key: 'barone_canavese',
		slug: 'barone-canavese',
		label: 'Barone Canavese',
		municipality: 'Barone Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.84,
		salePricePerSqmBase: 665,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/barone-canavese/'
	},
	{
		key: 'beinasco',
		slug: 'beinasco',
		label: 'Beinasco',
		municipality: 'Beinasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.07,
		salePricePerSqmBase: 984,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/beinasco/'
	},
	{
		key: 'bibiana',
		slug: 'bibiana',
		label: 'Bibiana',
		municipality: 'Bibiana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.87,
		salePricePerSqmBase: 653,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bibiana/'
	},
	{
		key: 'bobbio_pellice',
		slug: 'bobbio-pellice',
		label: 'Bobbio Pellice',
		municipality: 'Bobbio Pellice',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.33,
		salePricePerSqmBase: 556,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bobbio-pellice/'
	},
	{
		key: 'bollengo',
		slug: 'bollengo',
		label: 'Bollengo',
		municipality: 'Bollengo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.97,
		salePricePerSqmBase: 465,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bollengo/'
	},
	{
		key: 'borgaro_torinese',
		slug: 'borgaro-torinese',
		label: 'Borgaro Torinese',
		municipality: 'Borgaro Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.89,
		salePricePerSqmBase: 1015,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/borgaro-torinese/'
	},
	{
		key: 'borgiallo',
		slug: 'borgiallo',
		label: 'Borgiallo',
		municipality: 'Borgiallo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.36,
		salePricePerSqmBase: 566,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/borgiallo/'
	},
	{
		key: 'borgofranco_d_ivrea',
		slug: 'borgofranco-d-ivrea',
		label: 'Borgofranco D Ivrea',
		municipality: 'Borgofranco D Ivrea',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.82,
		salePricePerSqmBase: 447,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/borgofranco-d-ivrea/'
	},
	{
		key: 'borgomasino',
		slug: 'borgomasino',
		label: 'Borgomasino',
		municipality: 'Borgomasino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.87,
		salePricePerSqmBase: 461,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/borgomasino/'
	},
	{
		key: 'borgone_susa',
		slug: 'borgone-susa',
		label: 'Borgone Susa',
		municipality: 'Borgone Susa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.21,
		salePricePerSqmBase: 788,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/borgone-susa/'
	},
	{
		key: 'bosconero',
		slug: 'bosconero',
		label: 'Bosconero',
		municipality: 'Bosconero',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.04,
		salePricePerSqmBase: 738,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bosconero/'
	},
	{
		key: 'brandizzo',
		slug: 'brandizzo',
		label: 'Brandizzo',
		municipality: 'Brandizzo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.08,
		salePricePerSqmBase: 1013,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/brandizzo/'
	},
	{
		key: 'bricherasio',
		slug: 'bricherasio',
		label: 'Bricherasio',
		municipality: 'Bricherasio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.15,
		salePricePerSqmBase: 719,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bricherasio/'
	},
	{
		key: 'brosso',
		slug: 'brosso',
		label: 'Brosso',
		municipality: 'Brosso',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.77,
		salePricePerSqmBase: 433,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/brosso/'
	},
	{
		key: 'brozolo',
		slug: 'brozolo',
		label: 'Brozolo',
		municipality: 'Brozolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.36,
		salePricePerSqmBase: 792,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/brozolo/'
	},
	{
		key: 'bruino',
		slug: 'bruino',
		label: 'Bruino',
		municipality: 'Bruino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.93,
		salePricePerSqmBase: 1074,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bruino/'
	},
	{
		key: 'brusasco',
		slug: 'brusasco',
		label: 'Brusasco',
		municipality: 'Brusasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.56,
		salePricePerSqmBase: 861,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/brusasco/'
	},
	{
		key: 'bruzolo',
		slug: 'bruzolo',
		label: 'Bruzolo',
		municipality: 'Bruzolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.78,
		salePricePerSqmBase: 700,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bruzolo/'
	},
	{
		key: 'buriasco',
		slug: 'buriasco',
		label: 'Buriasco',
		municipality: 'Buriasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.21,
		salePricePerSqmBase: 766,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/buriasco/'
	},
	{
		key: 'burolo',
		slug: 'burolo',
		label: 'Burolo',
		municipality: 'Burolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.34,
		salePricePerSqmBase: 524,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/burolo/'
	},
	{
		key: 'busano',
		slug: 'busano',
		label: 'Busano',
		municipality: 'Busano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.25,
		salePricePerSqmBase: 769,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/busano/'
	},
	{
		key: 'bussoleno',
		slug: 'bussoleno',
		label: 'Bussoleno',
		municipality: 'Bussoleno',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.77,
		salePricePerSqmBase: 666,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/bussoleno/'
	},
	{
		key: 'buttigliera_alta',
		slug: 'buttigliera-alta',
		label: 'Buttigliera Alta',
		municipality: 'Buttigliera Alta',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.51,
		salePricePerSqmBase: 975,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/buttigliera-alta/'
	},
	{
		key: 'cafasse',
		slug: 'cafasse',
		label: 'Cafasse',
		municipality: 'Cafasse',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.23,
		salePricePerSqmBase: 738,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cafasse/'
	},
	{
		key: 'caluso',
		slug: 'caluso',
		label: 'Caluso',
		municipality: 'Caluso',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.99,
		salePricePerSqmBase: 695,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/caluso/'
	},
	{
		key: 'cambiano',
		slug: 'cambiano',
		label: 'Cambiano',
		municipality: 'Cambiano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.95,
		salePricePerSqmBase: 861,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cambiano/'
	},
	{
		key: 'campiglione_fenile',
		slug: 'campiglione-fenile',
		label: 'Campiglione Fenile',
		municipality: 'Campiglione Fenile',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.79,
		salePricePerSqmBase: 624,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/campiglione-fenile/'
	},
	{
		key: 'candia_canavese',
		slug: 'candia-canavese',
		label: 'Candia Canavese',
		municipality: 'Candia Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.95,
		salePricePerSqmBase: 707,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/candia-canavese/'
	},
	{
		key: 'candiolo',
		slug: 'candiolo',
		label: 'Candiolo',
		municipality: 'Candiolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.09,
		salePricePerSqmBase: 1201,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/candiolo/'
	},
	{
		key: 'canischio',
		slug: 'canischio',
		label: 'Canischio',
		municipality: 'Canischio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.49,
		salePricePerSqmBase: 578,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/canischio/'
	},
	{
		key: 'cantalupa',
		slug: 'cantalupa',
		label: 'Cantalupa',
		municipality: 'Cantalupa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.33,
		salePricePerSqmBase: 774,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cantalupa/'
	},
	{
		key: 'cantoira',
		slug: 'cantoira',
		label: 'Cantoira',
		municipality: 'Cantoira',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.48,
		salePricePerSqmBase: 581,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cantoira/'
	},
	{
		key: 'caprie',
		slug: 'caprie',
		label: 'Caprie',
		municipality: 'Caprie',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.41,
		salePricePerSqmBase: 811,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/caprie/'
	},
	{
		key: 'caravino',
		slug: 'caravino',
		label: 'Caravino',
		municipality: 'Caravino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.73,
		salePricePerSqmBase: 424,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/caravino/'
	},
	{
		key: 'carema',
		slug: 'carema',
		label: 'Carema',
		municipality: 'Carema',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.71,
		salePricePerSqmBase: 422,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/carema/'
	},
	{
		key: 'carignano',
		slug: 'carignano',
		label: 'Carignano',
		municipality: 'Carignano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.71,
		salePricePerSqmBase: 1067,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/carignano/'
	},
	{
		key: 'carmagnola',
		slug: 'carmagnola',
		label: 'Carmagnola',
		municipality: 'Carmagnola',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.32,
		salePricePerSqmBase: 1006,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/carmagnola/'
	},
	{
		key: 'casalborgone',
		slug: 'casalborgone',
		label: 'Casalborgone',
		municipality: 'Casalborgone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.32,
		salePricePerSqmBase: 789,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/casalborgone/'
	},
	{
		key: 'cascinette_d_ivrea',
		slug: 'cascinette-d-ivrea',
		label: 'Cascinette D Ivrea',
		municipality: 'Cascinette D Ivrea',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.23,
		salePricePerSqmBase: 561,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cascinette-d-ivrea/'
	},
	{
		key: 'caselette',
		slug: 'caselette',
		label: 'Caselette',
		municipality: 'Caselette',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.09,
		salePricePerSqmBase: 994,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/caselette/'
	},
	{
		key: 'caselle_torinese',
		slug: 'caselle-torinese',
		label: 'Caselle Torinese',
		municipality: 'Caselle Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.39,
		salePricePerSqmBase: 994,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/caselle-torinese/'
	},
	{
		key: 'castagneto_po',
		slug: 'castagneto-po',
		label: 'Castagneto Po',
		municipality: 'Castagneto Po',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.56,
		salePricePerSqmBase: 861,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/castagneto-po/'
	},
	{
		key: 'castagnole_piemonte',
		slug: 'castagnole-piemonte',
		label: 'Castagnole Piemonte',
		municipality: 'Castagnole Piemonte',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.88,
		salePricePerSqmBase: 662,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/castagnole-piemonte/'
	},
	{
		key: 'castellamonte',
		slug: 'castellamonte',
		label: 'Castellamonte',
		municipality: 'Castellamonte',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.6,
		salePricePerSqmBase: 766,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/castellamonte/'
	},
	{
		key: 'castelnuovo_nigra',
		slug: 'castelnuovo-nigra',
		label: 'Castelnuovo Nigra',
		municipality: 'Castelnuovo Nigra',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.54,
		salePricePerSqmBase: 387,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/castelnuovo-nigra/'
	},
	{
		key: 'castiglione_torinese',
		slug: 'castiglione-torinese',
		label: 'Castiglione Torinese',
		municipality: 'Castiglione Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.66,
		salePricePerSqmBase: 875,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/castiglione-torinese/'
	},
	{
		key: 'castroregio',
		slug: 'castroregio',
		label: 'Castroregio',
		municipality: 'Castroregio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.59,
		salePricePerSqmBase: 628,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/castroregio/'
	},
	{
		key: 'cavagnolo',
		slug: 'cavagnolo',
		label: 'Cavagnolo',
		municipality: 'Cavagnolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.61,
		salePricePerSqmBase: 851,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cavagnolo/'
	},
	{
		key: 'cavour',
		slug: 'cavour',
		label: 'Cavour',
		municipality: 'Cavour',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.05,
		salePricePerSqmBase: 717,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cavour/'
	},
	{
		key: 'cercenasco',
		slug: 'cercenasco',
		label: 'Cercenasco',
		municipality: 'Cercenasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.27,
		salePricePerSqmBase: 731,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cercenasco/'
	},
	{
		key: 'ceres',
		slug: 'ceres',
		label: 'Ceres',
		municipality: 'Ceres',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.46,
		salePricePerSqmBase: 606,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ceres/'
	},
	{
		key: 'ceresole_reale',
		slug: 'ceresole-reale',
		label: 'Ceresole Reale',
		municipality: 'Ceresole Reale',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.89,
		salePricePerSqmBase: 899,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ceresole-reale/'
	},
	{
		key: 'cesana_torinese',
		slug: 'cesana-torinese',
		label: 'Cesana Torinese',
		municipality: 'Cesana Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 8.61,
		salePricePerSqmBase: 1952,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cesana-torinese/'
	},
	{
		key: 'chialamberto',
		slug: 'chialamberto',
		label: 'Chialamberto',
		municipality: 'Chialamberto',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.51,
		salePricePerSqmBase: 602,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/chialamberto/'
	},
	{
		key: 'chianocco',
		slug: 'chianocco',
		label: 'Chianocco',
		municipality: 'Chianocco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.38,
		salePricePerSqmBase: 811,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/chianocco/'
	},
	{
		key: 'chiaverano',
		slug: 'chiaverano',
		label: 'Chiaverano',
		municipality: 'Chiaverano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.94,
		salePricePerSqmBase: 461,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/chiaverano/'
	},
	{
		key: 'chieri',
		slug: 'chieri',
		label: 'Chieri',
		municipality: 'Chieri',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.78,
		salePricePerSqmBase: 1183,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/chieri/'
	},
	{
		key: 'chiesanuova',
		slug: 'chiesanuova',
		label: 'Chiesanuova',
		municipality: 'Chiesanuova',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.12,
		salePricePerSqmBase: 505,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/chiesanuova/'
	},
	{
		key: 'chiomonte',
		slug: 'chiomonte',
		label: 'Chiomonte',
		municipality: 'Chiomonte',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.92,
		salePricePerSqmBase: 686,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/chiomonte/'
	},
	{
		key: 'chiusa_di_san_michele',
		slug: 'chiusa-di-san-michele',
		label: 'Chiusa Di San Michele',
		municipality: 'Chiusa Di San Michele',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.38,
		salePricePerSqmBase: 811,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/chiusa-di-san-michele/'
	},
	{
		key: 'chivasso',
		slug: 'chivasso',
		label: 'Chivasso',
		municipality: 'Chivasso',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.52,
		salePricePerSqmBase: 1185,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/chivasso/'
	},
	{
		key: 'ciconio',
		slug: 'ciconio',
		label: 'Ciconio',
		municipality: 'Ciconio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.02,
		salePricePerSqmBase: 738,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ciconio/'
	},
	{
		key: 'cintano',
		slug: 'cintano',
		label: 'Cintano',
		municipality: 'Cintano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2,
		salePricePerSqmBase: 484,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cintano/'
	},
	{
		key: 'cinzano',
		slug: 'cinzano',
		label: 'Cinzano',
		municipality: 'Cinzano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.91,
		salePricePerSqmBase: 688,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cinzano/'
	},
	{
		key: 'cirie',
		slug: 'cirie',
		label: 'Cirie',
		municipality: 'Cirie',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.41,
		salePricePerSqmBase: 1087,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cirie/'
	},
	{
		key: 'claviere',
		slug: 'claviere',
		label: 'Claviere',
		municipality: 'Claviere',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 11.79,
		salePricePerSqmBase: 2915,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/claviere/'
	},
	{
		key: 'coassolo_torinese',
		slug: 'coassolo-torinese',
		label: 'Coassolo Torinese',
		municipality: 'Coassolo Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.54,
		salePricePerSqmBase: 612,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/coassolo-torinese/'
	},
	{
		key: 'coazze',
		slug: 'coazze',
		label: 'Coazze',
		municipality: 'Coazze',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.23,
		salePricePerSqmBase: 746,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/coazze/'
	},
	{
		key: 'collegno',
		slug: 'collegno',
		label: 'Collegno',
		municipality: 'Collegno',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.83,
		salePricePerSqmBase: 1424,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/collegno/'
	},
	{
		key: 'colleretto_castelnuovo',
		slug: 'colleretto-castelnuovo',
		label: 'Colleretto Castelnuovo',
		municipality: 'Colleretto Castelnuovo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.58,
		salePricePerSqmBase: 398,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/colleretto-castelnuovo/'
	},
	{
		key: 'colleretto_giacosa',
		slug: 'colleretto-giacosa',
		label: 'Colleretto Giacosa',
		municipality: 'Colleretto Giacosa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.71,
		salePricePerSqmBase: 422,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/colleretto-giacosa/'
	},
	{
		key: 'condove',
		slug: 'condove',
		label: 'Condove',
		municipality: 'Condove',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.41,
		salePricePerSqmBase: 811,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/condove/'
	},
	{
		key: 'corio',
		slug: 'corio',
		label: 'Corio',
		municipality: 'Corio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.9,
		salePricePerSqmBase: 735,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/corio/'
	},
	{
		key: 'cossano_canavese',
		slug: 'cossano-canavese',
		label: 'Cossano Canavese',
		municipality: 'Cossano Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.73,
		salePricePerSqmBase: 424,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cossano-canavese/'
	},
	{
		key: 'cuceglio',
		slug: 'cuceglio',
		label: 'Cuceglio',
		municipality: 'Cuceglio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.82,
		salePricePerSqmBase: 707,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cuceglio/'
	},
	{
		key: 'cumiana',
		slug: 'cumiana',
		label: 'Cumiana',
		municipality: 'Cumiana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.57,
		salePricePerSqmBase: 1142,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cumiana/'
	},
	{
		key: 'cuorgne',
		slug: 'cuorgne',
		label: 'Cuorgne',
		municipality: 'Cuorgne',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.06,
		salePricePerSqmBase: 717,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/cuorgne/'
	},
	{
		key: 'druento',
		slug: 'druento',
		label: 'Druento',
		municipality: 'Druento',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.75,
		salePricePerSqmBase: 1119,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/druento/'
	},
	{
		key: 'exilles',
		slug: 'exilles',
		label: 'Exilles',
		municipality: 'Exilles',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.35,
		salePricePerSqmBase: 549,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/exilles/'
	},
	{
		key: 'favria',
		slug: 'favria',
		label: 'Favria',
		municipality: 'Favria',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.38,
		salePricePerSqmBase: 739,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/favria/'
	},
	{
		key: 'feletto',
		slug: 'feletto',
		label: 'Feletto',
		municipality: 'Feletto',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.38,
		salePricePerSqmBase: 776,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/feletto/'
	},
	{
		key: 'fenestrelle',
		slug: 'fenestrelle',
		label: 'Fenestrelle',
		municipality: 'Fenestrelle',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.71,
		salePricePerSqmBase: 639,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/fenestrelle/'
	},
	{
		key: 'fiano',
		slug: 'fiano',
		label: 'Fiano',
		municipality: 'Fiano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.56,
		salePricePerSqmBase: 1118,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/fiano/'
	},
	{
		key: 'fiorano_canavese',
		slug: 'fiorano-canavese',
		label: 'Fiorano Canavese',
		municipality: 'Fiorano Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.95,
		salePricePerSqmBase: 469,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/fiorano-canavese/'
	},
	{
		key: 'foglizzo',
		slug: 'foglizzo',
		label: 'Foglizzo',
		municipality: 'Foglizzo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.07,
		salePricePerSqmBase: 748,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/foglizzo/'
	},
	{
		key: 'forno_canavese',
		slug: 'forno-canavese',
		label: 'Forno Canavese',
		municipality: 'Forno Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.69,
		salePricePerSqmBase: 666,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/forno-canavese/'
	},
	{
		key: 'frassinetto',
		slug: 'frassinetto',
		label: 'Frassinetto',
		municipality: 'Frassinetto',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.25,
		salePricePerSqmBase: 548,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/frassinetto/'
	},
	{
		key: 'front',
		slug: 'front',
		label: 'Front',
		municipality: 'Front',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.36,
		salePricePerSqmBase: 810,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/front/'
	},
	{
		key: 'frossasco',
		slug: 'frossasco',
		label: 'Frossasco',
		municipality: 'Frossasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.89,
		salePricePerSqmBase: 963,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/frossasco/'
	},
	{
		key: 'garzigliana',
		slug: 'garzigliana',
		label: 'Garzigliana',
		municipality: 'Garzigliana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.84,
		salePricePerSqmBase: 654,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/garzigliana/'
	},
	{
		key: 'gassino_torinese',
		slug: 'gassino-torinese',
		label: 'Gassino Torinese',
		municipality: 'Gassino Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.12,
		salePricePerSqmBase: 993,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/gassino-torinese/'
	},
	{
		key: 'germagnano',
		slug: 'germagnano',
		label: 'Germagnano',
		municipality: 'Germagnano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.67,
		salePricePerSqmBase: 662,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/germagnano/'
	},
	{
		key: 'giaglione',
		slug: 'giaglione',
		label: 'Giaglione',
		municipality: 'Giaglione',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.49,
		salePricePerSqmBase: 586,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/giaglione/'
	},
	{
		key: 'giaveno',
		slug: 'giaveno',
		label: 'Giaveno',
		municipality: 'Giaveno',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.94,
		salePricePerSqmBase: 939,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/giaveno/'
	},
	{
		key: 'givoletto',
		slug: 'givoletto',
		label: 'Givoletto',
		municipality: 'Givoletto',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.86,
		salePricePerSqmBase: 974,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/givoletto/'
	},
	{
		key: 'gravere',
		slug: 'gravere',
		label: 'Gravere',
		municipality: 'Gravere',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.49,
		salePricePerSqmBase: 586,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/gravere/'
	},
	{
		key: 'groscavallo',
		slug: 'groscavallo',
		label: 'Groscavallo',
		municipality: 'Groscavallo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.28,
		salePricePerSqmBase: 536,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/groscavallo/'
	},
	{
		key: 'grosso',
		slug: 'grosso',
		label: 'Grosso',
		municipality: 'Grosso',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.65,
		salePricePerSqmBase: 640,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/grosso/'
	},
	{
		key: 'grugliasco',
		slug: 'grugliasco',
		label: 'Grugliasco',
		municipality: 'Grugliasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.64,
		salePricePerSqmBase: 1145,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/grugliasco/'
	},
	{
		key: 'ingria',
		slug: 'ingria',
		label: 'Ingria',
		municipality: 'Ingria',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.8,
		salePricePerSqmBase: 432,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ingria/'
	},
	{
		key: 'inverso_pinasca',
		slug: 'inverso-pinasca',
		label: 'Inverso Pinasca',
		municipality: 'Inverso Pinasca',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.89,
		salePricePerSqmBase: 678,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/inverso-pinasca/'
	},
	{
		key: 'isolabella',
		slug: 'isolabella',
		label: 'Isolabella',
		municipality: 'Isolabella',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.56,
		salePricePerSqmBase: 856,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/isolabella/'
	},
	{
		key: 'issiglio',
		slug: 'issiglio',
		label: 'Issiglio',
		municipality: 'Issiglio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.79,
		salePricePerSqmBase: 433,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/issiglio/'
	},
	{
		key: 'ivrea',
		slug: 'ivrea',
		label: 'Ivrea',
		municipality: 'Ivrea',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.69,
		salePricePerSqmBase: 725,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ivrea/'
	},
	{
		key: 'la_cassa',
		slug: 'la-cassa',
		label: 'La Cassa',
		municipality: 'La Cassa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.69,
		salePricePerSqmBase: 877,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/la-cassa/'
	},
	{
		key: 'la_loggia',
		slug: 'la-loggia',
		label: 'La Loggia',
		municipality: 'La Loggia',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.26,
		salePricePerSqmBase: 1230,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/la-loggia/'
	},
	{
		key: 'lanzo_torinese',
		slug: 'lanzo-torinese',
		label: 'Lanzo Torinese',
		municipality: 'Lanzo Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.94,
		salePricePerSqmBase: 984,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/lanzo-torinese/'
	},
	{
		key: 'lauriano',
		slug: 'lauriano',
		label: 'Lauriano',
		municipality: 'Lauriano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.56,
		salePricePerSqmBase: 861,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/lauriano/'
	},
	{
		key: 'leini',
		slug: 'leini',
		label: 'Leini',
		municipality: 'Leini',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.35,
		salePricePerSqmBase: 1163,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/leini/'
	},
	{
		key: 'lemie',
		slug: 'lemie',
		label: 'Lemie',
		municipality: 'Lemie',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.11,
		salePricePerSqmBase: 523,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/lemie/'
	},
	{
		key: 'lessolo',
		slug: 'lessolo',
		label: 'Lessolo',
		municipality: 'Lessolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.91,
		salePricePerSqmBase: 436,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/lessolo/'
	},
	{
		key: 'levone',
		slug: 'levone',
		label: 'Levone',
		municipality: 'Levone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.89,
		salePricePerSqmBase: 687,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/levone/'
	},
	{
		key: 'locana',
		slug: 'locana',
		label: 'Locana',
		municipality: 'Locana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.94,
		salePricePerSqmBase: 711,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/locana/'
	},
	{
		key: 'lombardore',
		slug: 'lombardore',
		label: 'Lombardore',
		municipality: 'Lombardore',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.15,
		salePricePerSqmBase: 961,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/lombardore/'
	},
	{
		key: 'lombriasco',
		slug: 'lombriasco',
		label: 'Lombriasco',
		municipality: 'Lombriasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.96,
		salePricePerSqmBase: 714,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/lombriasco/'
	},
	{
		key: 'loranze',
		slug: 'loranze',
		label: 'Loranze',
		municipality: 'Loranze',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.02,
		salePricePerSqmBase: 458,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/loranze/'
	},
	{
		key: 'luserna_san_giovanni',
		slug: 'luserna-san-giovanni',
		label: 'Luserna San Giovanni',
		municipality: 'Luserna San Giovanni',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.58,
		salePricePerSqmBase: 608,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/luserna-san-giovanni/'
	},
	{
		key: 'lusernetta',
		slug: 'lusernetta',
		label: 'Lusernetta',
		municipality: 'Lusernetta',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.26,
		salePricePerSqmBase: 538,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/lusernetta/'
	},
	{
		key: 'lusiglie',
		slug: 'lusiglie',
		label: 'Lusiglie',
		municipality: 'Lusiglie',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.38,
		salePricePerSqmBase: 776,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/lusiglie/'
	},
	{
		key: 'macello',
		slug: 'macello',
		label: 'Macello',
		municipality: 'Macello',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.79,
		salePricePerSqmBase: 624,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/macello/'
	},
	{
		key: 'maglione',
		slug: 'maglione',
		label: 'Maglione',
		municipality: 'Maglione',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.87,
		salePricePerSqmBase: 458,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/maglione/'
	},
	{
		key: 'mappano',
		slug: 'mappano',
		label: 'Mappano',
		municipality: 'Mappano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.55,
		salePricePerSqmBase: 914,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/mappano/'
	},
	{
		key: 'marentino',
		slug: 'marentino',
		label: 'Marentino',
		municipality: 'Marentino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.36,
		salePricePerSqmBase: 792,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/marentino/'
	},
	{
		key: 'massello',
		slug: 'massello',
		label: 'Massello',
		municipality: 'Massello',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.82,
		salePricePerSqmBase: 452,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/massello/'
	},
	{
		key: 'mathi',
		slug: 'mathi',
		label: 'Mathi',
		municipality: 'Mathi',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.59,
		salePricePerSqmBase: 643,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/mathi/'
	},
	{
		key: 'mattie',
		slug: 'mattie',
		label: 'Mattie',
		municipality: 'Mattie',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.66,
		salePricePerSqmBase: 634,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/mattie/'
	},
	{
		key: 'mazze',
		slug: 'mazze',
		label: 'Mazze',
		municipality: 'Mazze',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.93,
		salePricePerSqmBase: 644,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/mazze/'
	},
	{
		key: 'meana_di_susa',
		slug: 'meana-di-susa',
		label: 'Meana Di Susa',
		municipality: 'Meana Di Susa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.74,
		salePricePerSqmBase: 642,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/meana-di-susa/'
	},
	{
		key: 'mercenasco',
		slug: 'mercenasco',
		label: 'Mercenasco',
		municipality: 'Mercenasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.07,
		salePricePerSqmBase: 745,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/mercenasco/'
	},
	{
		key: 'mezzenile',
		slug: 'mezzenile',
		label: 'Mezzenile',
		municipality: 'Mezzenile',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.56,
		salePricePerSqmBase: 606,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/mezzenile/'
	},
	{
		key: 'mombello_di_torino',
		slug: 'mombello-di-torino',
		label: 'Mombello Di Torino',
		municipality: 'Mombello Di Torino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.23,
		salePricePerSqmBase: 792,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/mombello-di-torino/'
	},
	{
		key: 'mompantero',
		slug: 'mompantero',
		label: 'Mompantero',
		municipality: 'Mompantero',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.54,
		salePricePerSqmBase: 597,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/mompantero/'
	},
	{
		key: 'monastero_di_lanzo',
		slug: 'monastero-di-lanzo',
		label: 'Monastero Di Lanzo',
		municipality: 'Monastero Di Lanzo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.33,
		salePricePerSqmBase: 538,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/monastero-di-lanzo/'
	},
	{
		key: 'moncalieri',
		slug: 'moncalieri',
		label: 'Moncalieri',
		municipality: 'Moncalieri',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.5,
		salePricePerSqmBase: 1364,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/moncalieri/'
	},
	{
		key: 'moncenisio',
		slug: 'moncenisio',
		label: 'Moncenisio',
		municipality: 'Moncenisio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.87,
		salePricePerSqmBase: 456,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/moncenisio/'
	},
	{
		key: 'montaldo_torinese',
		slug: 'montaldo-torinese',
		label: 'Montaldo Torinese',
		municipality: 'Montaldo Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.3,
		salePricePerSqmBase: 792,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/montaldo-torinese/'
	},
	{
		key: 'montalenghe',
		slug: 'montalenghe',
		label: 'Montalenghe',
		municipality: 'Montalenghe',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.82,
		salePricePerSqmBase: 707,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/montalenghe/'
	},
	{
		key: 'montalto_dora',
		slug: 'montalto-dora',
		label: 'Montalto Dora',
		municipality: 'Montalto Dora',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.75,
		salePricePerSqmBase: 414,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/montalto-dora/'
	},
	{
		key: 'montanaro',
		slug: 'montanaro',
		label: 'Montanaro',
		municipality: 'Montanaro',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.24,
		salePricePerSqmBase: 740,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/montanaro/'
	},
	{
		key: 'monteu_da_po',
		slug: 'monteu-da-po',
		label: 'Monteu Da Po',
		municipality: 'Monteu Da Po',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.32,
		salePricePerSqmBase: 789,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/monteu-da-po/'
	},
	{
		key: 'moriondo_torinese',
		slug: 'moriondo-torinese',
		label: 'Moriondo Torinese',
		municipality: 'Moriondo Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.23,
		salePricePerSqmBase: 792,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/moriondo-torinese/'
	},
	{
		key: 'nichelino',
		slug: 'nichelino',
		label: 'Nichelino',
		municipality: 'Nichelino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.5,
		salePricePerSqmBase: 1127,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/nichelino/'
	},
	{
		key: 'noasca',
		slug: 'noasca',
		label: 'Noasca',
		municipality: 'Noasca',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.29,
		salePricePerSqmBase: 556,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/noasca/'
	},
	{
		key: 'nole',
		slug: 'nole',
		label: 'Nole',
		municipality: 'Nole',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.44,
		salePricePerSqmBase: 1109,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/nole/'
	},
	{
		key: 'nomaglio',
		slug: 'nomaglio',
		label: 'Nomaglio',
		municipality: 'Nomaglio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.59,
		salePricePerSqmBase: 390,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/nomaglio/'
	},
	{
		key: 'none',
		slug: 'none',
		label: 'None',
		municipality: 'None',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.11,
		salePricePerSqmBase: 992,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/none/'
	},
	{
		key: 'novalesa',
		slug: 'novalesa',
		label: 'Novalesa',
		municipality: 'Novalesa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.11,
		salePricePerSqmBase: 487,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/novalesa/'
	},
	{
		key: 'oglianico',
		slug: 'oglianico',
		label: 'Oglianico',
		municipality: 'Oglianico',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.58,
		salePricePerSqmBase: 784,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/oglianico/'
	},
	{
		key: 'orbassano',
		slug: 'orbassano',
		label: 'Orbassano',
		municipality: 'Orbassano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.89,
		salePricePerSqmBase: 1168,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/orbassano/'
	},
	{
		key: 'orio_canavese',
		slug: 'orio-canavese',
		label: 'Orio Canavese',
		municipality: 'Orio Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.02,
		salePricePerSqmBase: 738,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/orio-canavese/'
	},
	{
		key: 'osasco',
		slug: 'osasco',
		label: 'Osasco',
		municipality: 'Osasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.03,
		salePricePerSqmBase: 714,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/osasco/'
	},
	{
		key: 'osasio',
		slug: 'osasio',
		label: 'Osasio',
		municipality: 'Osasio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.79,
		salePricePerSqmBase: 624,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/osasio/'
	},
	{
		key: 'oulx',
		slug: 'oulx',
		label: 'Oulx',
		municipality: 'Oulx',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 7.16,
		salePricePerSqmBase: 1520,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/oulx/'
	},
	{
		key: 'ozegna',
		slug: 'ozegna',
		label: 'Ozegna',
		municipality: 'Ozegna',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.38,
		salePricePerSqmBase: 776,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ozegna/'
	},
	{
		key: 'palazzo_canavese',
		slug: 'palazzo-canavese',
		label: 'Palazzo Canavese',
		municipality: 'Palazzo Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.84,
		salePricePerSqmBase: 452,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/palazzo-canavese/'
	},
	{
		key: 'pancalieri',
		slug: 'pancalieri',
		label: 'Pancalieri',
		municipality: 'Pancalieri',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.06,
		salePricePerSqmBase: 714,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pancalieri/'
	},
	{
		key: 'parella',
		slug: 'parella',
		label: 'Parella',
		municipality: 'Parella',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.11,
		salePricePerSqmBase: 525,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/parella/'
	},
	{
		key: 'pavarolo',
		slug: 'pavarolo',
		label: 'Pavarolo',
		municipality: 'Pavarolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.36,
		salePricePerSqmBase: 792,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pavarolo/'
	},
	{
		key: 'pavone_canavese',
		slug: 'pavone-canavese',
		label: 'Pavone Canavese',
		municipality: 'Pavone Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.71,
		salePricePerSqmBase: 401,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pavone-canavese/'
	},
	{
		key: 'pecetto_torinese',
		slug: 'pecetto-torinese',
		label: 'Pecetto Torinese',
		municipality: 'Pecetto Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.42,
		salePricePerSqmBase: 1117,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pecetto-torinese/'
	},
	{
		key: 'perosa_argentina',
		slug: 'perosa-argentina',
		label: 'Perosa Argentina',
		municipality: 'Perosa Argentina',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.09,
		salePricePerSqmBase: 735,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/perosa-argentina/'
	},
	{
		key: 'perosa_canavese',
		slug: 'perosa-canavese',
		label: 'Perosa Canavese',
		municipality: 'Perosa Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.64,
		salePricePerSqmBase: 428,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/perosa-canavese/'
	},
	{
		key: 'perrero',
		slug: 'perrero',
		label: 'Perrero',
		municipality: 'Perrero',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.64,
		salePricePerSqmBase: 629,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/perrero/'
	},
	{
		key: 'pertusio',
		slug: 'pertusio',
		label: 'Pertusio',
		municipality: 'Pertusio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.07,
		salePricePerSqmBase: 712,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pertusio/'
	},
	{
		key: 'pessinetto',
		slug: 'pessinetto',
		label: 'Pessinetto',
		municipality: 'Pessinetto',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.54,
		salePricePerSqmBase: 612,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pessinetto/'
	},
	{
		key: 'pianezza',
		slug: 'pianezza',
		label: 'Pianezza',
		municipality: 'Pianezza',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.63,
		salePricePerSqmBase: 1015,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pianezza/'
	},
	{
		key: 'pinasca',
		slug: 'pinasca',
		label: 'Pinasca',
		municipality: 'Pinasca',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.07,
		salePricePerSqmBase: 684,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pinasca/'
	},
	{
		key: 'pinerolo',
		slug: 'pinerolo',
		label: 'Pinerolo',
		municipality: 'Pinerolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.15,
		salePricePerSqmBase: 1006,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pinerolo/'
	},
	{
		key: 'pino_torinese',
		slug: 'pino-torinese',
		label: 'Pino Torinese',
		municipality: 'Pino Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.23,
		salePricePerSqmBase: 1260,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pino-torinese/'
	},
	{
		key: 'piobesi_torinese',
		slug: 'piobesi-torinese',
		label: 'Piobesi Torinese',
		municipality: 'Piobesi Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.81,
		salePricePerSqmBase: 859,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/piobesi-torinese/'
	},
	{
		key: 'piossasco',
		slug: 'piossasco',
		label: 'Piossasco',
		municipality: 'Piossasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.62,
		salePricePerSqmBase: 1121,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/piossasco/'
	},
	{
		key: 'piscina',
		slug: 'piscina',
		label: 'Piscina',
		municipality: 'Piscina',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.79,
		salePricePerSqmBase: 866,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/piscina/'
	},
	{
		key: 'piverone',
		slug: 'piverone',
		label: 'Piverone',
		municipality: 'Piverone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.65,
		salePricePerSqmBase: 402,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/piverone/'
	},
	{
		key: 'poirino',
		slug: 'poirino',
		label: 'Poirino',
		municipality: 'Poirino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.15,
		salePricePerSqmBase: 1031,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/poirino/'
	},
	{
		key: 'pomaretto',
		slug: 'pomaretto',
		label: 'Pomaretto',
		municipality: 'Pomaretto',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.07,
		salePricePerSqmBase: 720,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pomaretto/'
	},
	{
		key: 'pont_canavese',
		slug: 'pont-canavese',
		label: 'Pont Canavese',
		municipality: 'Pont Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.41,
		salePricePerSqmBase: 574,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pont-canavese/'
	},
	{
		key: 'porte',
		slug: 'porte',
		label: 'Porte',
		municipality: 'Porte',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.89,
		salePricePerSqmBase: 678,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/porte/'
	},
	{
		key: 'pragelato',
		slug: 'pragelato',
		label: 'Pragelato',
		municipality: 'Pragelato',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.91,
		salePricePerSqmBase: 1466,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pragelato/'
	},
	{
		key: 'prali',
		slug: 'prali',
		label: 'Prali',
		municipality: 'Prali',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.37,
		salePricePerSqmBase: 1229,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/prali/'
	},
	{
		key: 'pralormo',
		slug: 'pralormo',
		label: 'Pralormo',
		municipality: 'Pralormo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.78,
		salePricePerSqmBase: 857,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pralormo/'
	},
	{
		key: 'pramollo',
		slug: 'pramollo',
		label: 'Pramollo',
		municipality: 'Pramollo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.2,
		salePricePerSqmBase: 536,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pramollo/'
	},
	{
		key: 'prarostino',
		slug: 'prarostino',
		label: 'Prarostino',
		municipality: 'Prarostino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.59,
		salePricePerSqmBase: 597,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/prarostino/'
	},
	{
		key: 'prascorsano',
		slug: 'prascorsano',
		label: 'Prascorsano',
		municipality: 'Prascorsano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.87,
		salePricePerSqmBase: 666,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/prascorsano/'
	},
	{
		key: 'pratiglione',
		slug: 'pratiglione',
		label: 'Pratiglione',
		municipality: 'Pratiglione',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.87,
		salePricePerSqmBase: 685,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/pratiglione/'
	},
	{
		key: 'quagliuzzo',
		slug: 'quagliuzzo',
		label: 'Quagliuzzo',
		municipality: 'Quagliuzzo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.79,
		salePricePerSqmBase: 442,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/quagliuzzo/'
	},
	{
		key: 'quassolo',
		slug: 'quassolo',
		label: 'Quassolo',
		municipality: 'Quassolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.58,
		salePricePerSqmBase: 378,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/quassolo/'
	},
	{
		key: 'quincinetto',
		slug: 'quincinetto',
		label: 'Quincinetto',
		municipality: 'Quincinetto',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.87,
		salePricePerSqmBase: 452,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/quincinetto/'
	},
	{
		key: 'reano',
		slug: 'reano',
		label: 'Reano',
		municipality: 'Reano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.78,
		salePricePerSqmBase: 880,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/reano/'
	},
	{
		key: 'ribordone',
		slug: 'ribordone',
		label: 'Ribordone',
		municipality: 'Ribordone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.2,
		salePricePerSqmBase: 536,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ribordone/'
	},
	{
		key: 'riva_presso_chieri',
		slug: 'riva-presso-chieri',
		label: 'Riva Presso Chieri',
		municipality: 'Riva Presso Chieri',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.74,
		salePricePerSqmBase: 851,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/riva-presso-chieri/'
	},
	{
		key: 'rivalba',
		slug: 'rivalba',
		label: 'Rivalba',
		municipality: 'Rivalba',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.22,
		salePricePerSqmBase: 738,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rivalba/'
	},
	{
		key: 'rivalta_di_torino',
		slug: 'rivalta-di-torino',
		label: 'Rivalta Di Torino',
		municipality: 'Rivalta Di Torino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.07,
		salePricePerSqmBase: 1097,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rivalta-di-torino/'
	},
	{
		key: 'rivara',
		slug: 'rivara',
		label: 'Rivara',
		municipality: 'Rivara',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.73,
		salePricePerSqmBase: 669,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rivara/'
	},
	{
		key: 'rivarolo_canavese',
		slug: 'rivarolo-canavese',
		label: 'Rivarolo Canavese',
		municipality: 'Rivarolo Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.62,
		salePricePerSqmBase: 843,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rivarolo-canavese/'
	},
	{
		key: 'rivarossa',
		slug: 'rivarossa',
		label: 'Rivarossa',
		municipality: 'Rivarossa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.15,
		salePricePerSqmBase: 940,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rivarossa/'
	},
	{
		key: 'rivoli',
		slug: 'rivoli',
		label: 'Rivoli',
		municipality: 'Rivoli',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.51,
		salePricePerSqmBase: 1368,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rivoli/'
	},
	{
		key: 'robassomero',
		slug: 'robassomero',
		label: 'Robassomero',
		municipality: 'Robassomero',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.31,
		salePricePerSqmBase: 699,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/robassomero/'
	},
	{
		key: 'rocca_canavese',
		slug: 'rocca-canavese',
		label: 'Rocca Canavese',
		municipality: 'Rocca Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.54,
		salePricePerSqmBase: 843,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rocca-canavese/'
	},
	{
		key: 'roletto',
		slug: 'roletto',
		label: 'Roletto',
		municipality: 'Roletto',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.5,
		salePricePerSqmBase: 766,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/roletto/'
	},
	{
		key: 'romano_canavese',
		slug: 'romano-canavese',
		label: 'Romano Canavese',
		municipality: 'Romano Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.83,
		salePricePerSqmBase: 660,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/romano-canavese/'
	},
	{
		key: 'ronco_canavese',
		slug: 'ronco-canavese',
		label: 'Ronco Canavese',
		municipality: 'Ronco Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.2,
		salePricePerSqmBase: 536,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/ronco-canavese/'
	},
	{
		key: 'rondissone',
		slug: 'rondissone',
		label: 'Rondissone',
		municipality: 'Rondissone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.51,
		salePricePerSqmBase: 861,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rondissone/'
	},
	{
		key: 'rora',
		slug: 'rora',
		label: 'Rora',
		municipality: 'Rora',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.05,
		salePricePerSqmBase: 487,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rora/'
	},
	{
		key: 'rosta',
		slug: 'rosta',
		label: 'Rosta',
		municipality: 'Rosta',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.89,
		salePricePerSqmBase: 1183,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rosta/'
	},
	{
		key: 'roure',
		slug: 'roure',
		label: 'Roure',
		municipality: 'Roure',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.66,
		salePricePerSqmBase: 629,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/roure/'
	},
	{
		key: 'rubiana',
		slug: 'rubiana',
		label: 'Rubiana',
		municipality: 'Rubiana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.25,
		salePricePerSqmBase: 773,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rubiana/'
	},
	{
		key: 'rueglio',
		slug: 'rueglio',
		label: 'Rueglio',
		municipality: 'Rueglio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.6,
		salePricePerSqmBase: 400,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/rueglio/'
	},
	{
		key: 'salassa',
		slug: 'salassa',
		label: 'Salassa',
		municipality: 'Salassa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.08,
		salePricePerSqmBase: 766,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/salassa/'
	},
	{
		key: 'salbertrand',
		slug: 'salbertrand',
		label: 'Salbertrand',
		municipality: 'Salbertrand',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.48,
		salePricePerSqmBase: 822,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/salbertrand/'
	},
	{
		key: 'salerano_canavese',
		slug: 'salerano-canavese',
		label: 'Salerano Canavese',
		municipality: 'Salerano Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.85,
		salePricePerSqmBase: 480,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/salerano-canavese/'
	},
	{
		key: 'salza_di_pinerolo',
		slug: 'salza-di-pinerolo',
		label: 'Salza Di Pinerolo',
		municipality: 'Salza Di Pinerolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.96,
		salePricePerSqmBase: 487,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/salza-di-pinerolo/'
	},
	{
		key: 'samone_to',
		slug: 'samone-to',
		label: 'Samone To',
		municipality: 'Samone To',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.89,
		salePricePerSqmBase: 492,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/samone-to/'
	},
	{
		key: 'san_benigno_canavese',
		slug: 'san-benigno-canavese',
		label: 'San Benigno Canavese',
		municipality: 'San Benigno Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.77,
		salePricePerSqmBase: 905,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-benigno-canavese/'
	},
	{
		key: 'san_carlo_canavese',
		slug: 'san-carlo-canavese',
		label: 'San Carlo Canavese',
		municipality: 'San Carlo Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.7,
		salePricePerSqmBase: 829,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-carlo-canavese/'
	},
	{
		key: 'san_colombano_belmonte',
		slug: 'san-colombano-belmonte',
		label: 'San Colombano Belmonte',
		municipality: 'San Colombano Belmonte',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.82,
		salePricePerSqmBase: 689,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-colombano-belmonte/'
	},
	{
		key: 'san_didero',
		slug: 'san-didero',
		label: 'San Didero',
		municipality: 'San Didero',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.17,
		salePricePerSqmBase: 774,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-didero/'
	},
	{
		key: 'san_francesco_al_campo',
		slug: 'san-francesco-al-campo',
		label: 'San Francesco Al Campo',
		municipality: 'San Francesco Al Campo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.42,
		salePricePerSqmBase: 932,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-francesco-al-campo/'
	},
	{
		key: 'san_germano_chisone',
		slug: 'san-germano-chisone',
		label: 'San Germano Chisone',
		municipality: 'San Germano Chisone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.72,
		salePricePerSqmBase: 653,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-germano-chisone/'
	},
	{
		key: 'san_gillio',
		slug: 'san-gillio',
		label: 'San Gillio',
		municipality: 'San Gillio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.16,
		salePricePerSqmBase: 916,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-gillio/'
	},
	{
		key: 'san_giorgio_canavese',
		slug: 'san-giorgio-canavese',
		label: 'San Giorgio Canavese',
		municipality: 'San Giorgio Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.1,
		salePricePerSqmBase: 766,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-giorgio-canavese/'
	},
	{
		key: 'san_giorio_di_susa',
		slug: 'san-giorio-di-susa',
		label: 'San Giorio Di Susa',
		municipality: 'San Giorio Di Susa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.89,
		salePricePerSqmBase: 651,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-giorio-di-susa/'
	},
	{
		key: 'san_giusto_canavese',
		slug: 'san-giusto-canavese',
		label: 'San Giusto Canavese',
		municipality: 'San Giusto Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.87,
		salePricePerSqmBase: 690,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-giusto-canavese/'
	},
	{
		key: 'san_martino_canavese',
		slug: 'san-martino-canavese',
		label: 'San Martino Canavese',
		municipality: 'San Martino Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.74,
		salePricePerSqmBase: 458,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-martino-canavese/'
	},
	{
		key: 'san_maurizio_canavese',
		slug: 'san-maurizio-canavese',
		label: 'San Maurizio Canavese',
		municipality: 'San Maurizio Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.06,
		salePricePerSqmBase: 967,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-maurizio-canavese/'
	},
	{
		key: 'san_mauro_torinese',
		slug: 'san-mauro-torinese',
		label: 'San Mauro Torinese',
		municipality: 'San Mauro Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.76,
		salePricePerSqmBase: 1221,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-mauro-torinese/'
	},
	{
		key: 'san_pietro_val_lemina',
		slug: 'san-pietro-val-lemina',
		label: 'San Pietro Val Lemina',
		municipality: 'San Pietro Val Lemina',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.41,
		salePricePerSqmBase: 787,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-pietro-val-lemina/'
	},
	{
		key: 'san_ponso',
		slug: 'san-ponso',
		label: 'San Ponso',
		municipality: 'San Ponso',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.49,
		salePricePerSqmBase: 585,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-ponso/'
	},
	{
		key: 'san_raffaele_cimena',
		slug: 'san-raffaele-cimena',
		label: 'San Raffaele Cimena',
		municipality: 'San Raffaele Cimena',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.44,
		salePricePerSqmBase: 829,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-raffaele-cimena/'
	},
	{
		key: 'san_sebastiano_da_po',
		slug: 'san-sebastiano-da-po',
		label: 'San Sebastiano Da Po',
		municipality: 'San Sebastiano Da Po',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.83,
		salePricePerSqmBase: 924,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-sebastiano-da-po/'
	},
	{
		key: 'san_secondo_di_pinerolo',
		slug: 'san-secondo-di-pinerolo',
		label: 'San Secondo Di Pinerolo',
		municipality: 'San Secondo Di Pinerolo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.53,
		salePricePerSqmBase: 789,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/san-secondo-di-pinerolo/'
	},
	{
		key: 'sangano',
		slug: 'sangano',
		label: 'Sangano',
		municipality: 'Sangano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.25,
		salePricePerSqmBase: 1045,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/sangano/'
	},
	{
		key: 'sant_ambrogio_di_torino',
		slug: 'sant-ambrogio-di-torino',
		label: 'Sant Ambrogio Di Torino',
		municipality: 'Sant Ambrogio Di Torino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.54,
		salePricePerSqmBase: 847,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/sant-ambrogio-di-torino/'
	},
	{
		key: 'sant_antonino_di_susa',
		slug: 'sant-antonino-di-susa',
		label: 'Sant Antonino Di Susa',
		municipality: 'Sant Antonino Di Susa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.1,
		salePricePerSqmBase: 748,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/sant-antonino-di-susa/'
	},
	{
		key: 'santena',
		slug: 'santena',
		label: 'Santena',
		municipality: 'Santena',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5,
		salePricePerSqmBase: 1174,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/santena/'
	},
	{
		key: 'sauze_d_oulx',
		slug: 'sauze-d-oulx',
		label: 'Sauze D Oulx',
		municipality: 'Sauze D Oulx',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 8.5,
		salePricePerSqmBase: 2076,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/sauze-d-oulx/'
	},
	{
		key: 'sauze_di_cesana',
		slug: 'sauze-di-cesana',
		label: 'Sauze Di Cesana',
		municipality: 'Sauze Di Cesana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 6.92,
		salePricePerSqmBase: 1504,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/sauze-di-cesana/'
	},
	{
		key: 'scalenghe',
		slug: 'scalenghe',
		label: 'Scalenghe',
		municipality: 'Scalenghe',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.88,
		salePricePerSqmBase: 654,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/scalenghe/'
	},
	{
		key: 'scarmagno',
		slug: 'scarmagno',
		label: 'Scarmagno',
		municipality: 'Scarmagno',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.1,
		salePricePerSqmBase: 495,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/scarmagno/'
	},
	{
		key: 'sciolze',
		slug: 'sciolze',
		label: 'Sciolze',
		municipality: 'Sciolze',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.28,
		salePricePerSqmBase: 743,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/sciolze/'
	},
	{
		key: 'sestriere',
		slug: 'sestriere',
		label: 'Sestriere',
		municipality: 'Sestriere',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 9.46,
		salePricePerSqmBase: 2080,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/sestriere/'
	},
	{
		key: 'settimo_rottaro',
		slug: 'settimo-rottaro',
		label: 'Settimo Rottaro',
		municipality: 'Settimo Rottaro',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.56,
		salePricePerSqmBase: 409,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/settimo-rottaro/'
	},
	{
		key: 'settimo_torinese',
		slug: 'settimo-torinese',
		label: 'Settimo Torinese',
		municipality: 'Settimo Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.45,
		salePricePerSqmBase: 1108,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/settimo-torinese/'
	},
	{
		key: 'settimo_vittone',
		slug: 'settimo-vittone',
		label: 'Settimo Vittone',
		municipality: 'Settimo Vittone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.82,
		salePricePerSqmBase: 452,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/settimo-vittone/'
	},
	{
		key: 'sparone',
		slug: 'sparone',
		label: 'Sparone',
		municipality: 'Sparone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.49,
		salePricePerSqmBase: 596,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/sparone/'
	},
	{
		key: 'strambinello',
		slug: 'strambinello',
		label: 'Strambinello',
		municipality: 'Strambinello',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.82,
		salePricePerSqmBase: 452,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/strambinello/'
	},
	{
		key: 'strambino',
		slug: 'strambino',
		label: 'Strambino',
		municipality: 'Strambino',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.68,
		salePricePerSqmBase: 686,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/strambino/'
	},
	{
		key: 'susa',
		slug: 'susa',
		label: 'Susa',
		municipality: 'Susa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.16,
		salePricePerSqmBase: 771,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/susa/'
	},
	{
		key: 'tavagnasco',
		slug: 'tavagnasco',
		label: 'Tavagnasco',
		municipality: 'Tavagnasco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.74,
		salePricePerSqmBase: 452,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/tavagnasco/'
	},
	{
		key: 'torrazza_piemonte',
		slug: 'torrazza-piemonte',
		label: 'Torrazza Piemonte',
		municipality: 'Torrazza Piemonte',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.28,
		salePricePerSqmBase: 751,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/torrazza-piemonte/'
	},
	{
		key: 'torre_canavese',
		slug: 'torre-canavese',
		label: 'Torre Canavese',
		municipality: 'Torre Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.74,
		salePricePerSqmBase: 449,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/torre-canavese/'
	},
	{
		key: 'torre_pellice',
		slug: 'torre-pellice',
		label: 'Torre Pellice',
		municipality: 'Torre Pellice',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.02,
		salePricePerSqmBase: 678,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/torre-pellice/'
	},
	{
		key: 'trana',
		slug: 'trana',
		label: 'Trana',
		municipality: 'Trana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.7,
		salePricePerSqmBase: 1067,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/trana/'
	},
	{
		key: 'traversella',
		slug: 'traversella',
		label: 'Traversella',
		municipality: 'Traversella',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.69,
		salePricePerSqmBase: 441,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/traversella/'
	},
	{
		key: 'traves',
		slug: 'traves',
		label: 'Traves',
		municipality: 'Traves',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.48,
		salePricePerSqmBase: 625,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/traves/'
	},
	{
		key: 'trofarello',
		slug: 'trofarello',
		label: 'Trofarello',
		municipality: 'Trofarello',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.94,
		salePricePerSqmBase: 1334,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/trofarello/'
	},
	{
		key: 'usseaux',
		slug: 'usseaux',
		label: 'Usseaux',
		municipality: 'Usseaux',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.1,
		salePricePerSqmBase: 728,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/usseaux/'
	},
	{
		key: 'usseglio',
		slug: 'usseglio',
		label: 'Usseglio',
		municipality: 'Usseglio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.27,
		salePricePerSqmBase: 567,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/usseglio/'
	},
	{
		key: 'vaie',
		slug: 'vaie',
		label: 'Vaie',
		municipality: 'Vaie',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.34,
		salePricePerSqmBase: 789,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vaie/'
	},
	{
		key: 'val_della_torre',
		slug: 'val-della-torre',
		label: 'Val Della Torre',
		municipality: 'Val Della Torre',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.74,
		salePricePerSqmBase: 892,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/val-della-torre/'
	},
	{
		key: 'val_di_chy',
		slug: 'val-di-chy',
		label: 'Val Di Chy',
		municipality: 'Val Di Chy',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.88,
		salePricePerSqmBase: 440,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/val-di-chy/'
	},
	{
		key: 'valchiusa',
		slug: 'valchiusa',
		label: 'Valchiusa',
		municipality: 'Valchiusa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.58,
		salePricePerSqmBase: 377,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/valchiusa/'
	},
	{
		key: 'valgioie',
		slug: 'valgioie',
		label: 'Valgioie',
		municipality: 'Valgioie',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.12,
		salePricePerSqmBase: 741,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/valgioie/'
	},
	{
		key: 'vallo_torinese',
		slug: 'vallo-torinese',
		label: 'Vallo Torinese',
		municipality: 'Vallo Torinese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3,
		salePricePerSqmBase: 720,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vallo-torinese/'
	},
	{
		key: 'valperga',
		slug: 'valperga',
		label: 'Valperga',
		municipality: 'Valperga',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3,
		salePricePerSqmBase: 756,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/valperga/'
	},
	{
		key: 'valprato_soana',
		slug: 'valprato-soana',
		label: 'Valprato Soana',
		municipality: 'Valprato Soana',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.74,
		salePricePerSqmBase: 423,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/valprato-soana/'
	},
	{
		key: 'varisella',
		slug: 'varisella',
		label: 'Varisella',
		municipality: 'Varisella',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.07,
		salePricePerSqmBase: 720,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/varisella/'
	},
	{
		key: 'vauda_canavese',
		slug: 'vauda-canavese',
		label: 'Vauda Canavese',
		municipality: 'Vauda Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.07,
		salePricePerSqmBase: 756,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vauda-canavese/'
	},
	{
		key: 'venaria',
		slug: 'venaria',
		label: 'Venaria',
		municipality: 'Venaria',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.27,
		salePricePerSqmBase: 1052,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/venaria/'
	},
	{
		key: 'venaus',
		slug: 'venaus',
		label: 'Venaus',
		municipality: 'Venaus',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.66,
		salePricePerSqmBase: 642,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/venaus/'
	},
	{
		key: 'verolengo',
		slug: 'verolengo',
		label: 'Verolengo',
		municipality: 'Verolengo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.48,
		salePricePerSqmBase: 820,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/verolengo/'
	},
	{
		key: 'verrua_savoia',
		slug: 'verrua-savoia',
		label: 'Verrua Savoia',
		municipality: 'Verrua Savoia',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.92,
		salePricePerSqmBase: 676,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/verrua-savoia/'
	},
	{
		key: 'vestigne',
		slug: 'vestigne',
		label: 'Vestigne',
		municipality: 'Vestigne',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.69,
		salePricePerSqmBase: 686,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vestigne/'
	},
	{
		key: 'vialfre',
		slug: 'vialfre',
		label: 'Vialfre',
		municipality: 'Vialfre',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.54,
		salePricePerSqmBase: 383,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vialfre/'
	},
	{
		key: 'vidracco',
		slug: 'vidracco',
		label: 'Vidracco',
		municipality: 'Vidracco',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.77,
		salePricePerSqmBase: 452,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vidracco/'
	},
	{
		key: 'vigone',
		slug: 'vigone',
		label: 'Vigone',
		municipality: 'Vigone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.97,
		salePricePerSqmBase: 663,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vigone/'
	},
	{
		key: 'villafranca_piemonte',
		slug: 'villafranca-piemonte',
		label: 'Villafranca Piemonte',
		municipality: 'Villafranca Piemonte',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.1,
		salePricePerSqmBase: 743,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villafranca-piemonte/'
	},
	{
		key: 'villanova_canavese',
		slug: 'villanova-canavese',
		label: 'Villanova Canavese',
		municipality: 'Villanova Canavese',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.15,
		salePricePerSqmBase: 712,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villanova-canavese/'
	},
	{
		key: 'villar_dora',
		slug: 'villar-dora',
		label: 'Villar Dora',
		municipality: 'Villar Dora',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.27,
		salePricePerSqmBase: 822,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villar-dora/'
	},
	{
		key: 'villar_focchiardo',
		slug: 'villar-focchiardo',
		label: 'Villar Focchiardo',
		municipality: 'Villar Focchiardo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.81,
		salePricePerSqmBase: 706,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villar-focchiardo/'
	},
	{
		key: 'villar_pellice',
		slug: 'villar-pellice',
		label: 'Villar Pellice',
		municipality: 'Villar Pellice',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.77,
		salePricePerSqmBase: 620,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villar-pellice/'
	},
	{
		key: 'villar_perosa',
		slug: 'villar-perosa',
		label: 'Villar Perosa',
		municipality: 'Villar Perosa',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.15,
		salePricePerSqmBase: 891,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villar-perosa/'
	},
	{
		key: 'villarbasse',
		slug: 'villarbasse',
		label: 'Villarbasse',
		municipality: 'Villarbasse',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.61,
		salePricePerSqmBase: 1008,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villarbasse/'
	},
	{
		key: 'villareggia',
		slug: 'villareggia',
		label: 'Villareggia',
		municipality: 'Villareggia',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.89,
		salePricePerSqmBase: 690,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villareggia/'
	},
	{
		key: 'villastellone',
		slug: 'villastellone',
		label: 'Villastellone',
		municipality: 'Villastellone',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.88,
		salePricePerSqmBase: 1079,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/villastellone/'
	},
	{
		key: 'vinovo',
		slug: 'vinovo',
		label: 'Vinovo',
		municipality: 'Vinovo',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 5.2,
		salePricePerSqmBase: 1243,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vinovo/'
	},
	{
		key: 'virle_piemonte',
		slug: 'virle-piemonte',
		label: 'Virle Piemonte',
		municipality: 'Virle Piemonte',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 3.11,
		salePricePerSqmBase: 704,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/virle-piemonte/'
	},
	{
		key: 'vische',
		slug: 'vische',
		label: 'Vische',
		municipality: 'Vische',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 2.87,
		salePricePerSqmBase: 690,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vische/'
	},
	{
		key: 'vistrorio',
		slug: 'vistrorio',
		label: 'Vistrorio',
		municipality: 'Vistrorio',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 1.92,
		salePricePerSqmBase: 480,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/vistrorio/'
	},
	{
		key: 'volpiano',
		slug: 'volpiano',
		label: 'Volpiano',
		municipality: 'Volpiano',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.53,
		salePricePerSqmBase: 1186,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/volpiano/'
	},
	{
		key: 'volvera',
		slug: 'volvera',
		label: 'Volvera',
		municipality: 'Volvera',
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: 4.38,
		salePricePerSqmBase: 1095,
		sourceUrl:
			'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/volvera/'
	}
] as const satisfies readonly BorsinoMarketArea[];

export const borsinoMarketAreasByKey = Object.fromEntries(
	borsinoMarketAreas.map((area) => [area.key, area])
) as Record<string, BorsinoMarketArea>;
