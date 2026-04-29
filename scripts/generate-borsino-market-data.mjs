import fs from 'node:fs';

const sourcePath = 'valutazione_borsino.html';
const targetPath = 'src/lib/valuation/borsino-market-data.ts';
const html = fs.readFileSync(sourcePath, 'utf8');
const rows = [...html.matchAll(/<tr>[\s\S]*?<\/tr>/g)].map(([row]) => row);
const dataRows = rows.filter((row) =>
	/quotazioni-immobiliari\/piemonte\/torino-provincia\//.test(row)
);

const decodeHtml = (value) =>
	value
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');

const stripTags = (value) =>
	decodeHtml(value.replace(/<[^>]*>/g, ' '))
		.replace(/\s+/g, ' ')
		.trim();

const parseEuroNumber = (value) => Number(value.replace(/\./g, '').replace(',', '.'));
const slugFromHref = (href) => href.replace(/\/$/, '').split('/').at(-1);
const keyFromSlug = (slug) => slug.replace(/-/g, '_');

const parsedEntries = dataRows.map((row) => {
	const href = row.match(/href="([^"]+)"/)?.[1];
	const anchor = row.match(/<a[\s\S]*?<\/a>/)?.[0] ?? '';
	const label = stripTags(anchor)
		.replace(/\s*Capoluogo\s*$/, '')
		.trim();
	const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((match) => stripTags(match[1]));
	const numbers = cells
		.slice(1)
		.map((cell) => cell.replace(/^€\s*/, '').trim())
		.map(parseEuroNumber);
	const slug = slugFromHref(href);

	return {
		key: keyFromSlug(slug),
		slug,
		label,
		municipality: label,
		province: 'Torino',
		region: 'Piemonte',
		rentPricePerSqmBase: numbers[0],
		salePricePerSqmBase: numbers[1],
		sourceUrl: href
	};
});

const excludedEntries = parsedEntries.filter((entry) => entry.salePricePerSqmBase <= 0);
const entries = parsedEntries.filter((entry) => entry.salePricePerSqmBase > 0);
const duplicateKeys = entries
	.map((entry) => entry.key)
	.filter((key, index, keys) => keys.indexOf(key) !== index);

if (duplicateKeys.length) {
	throw new Error(`Duplicate Borsino keys: ${duplicateKeys.join(', ')}`);
}

if (
	entries.some(
		(entry) =>
			!entry.label ||
			!Number.isFinite(entry.rentPricePerSqmBase) ||
			!Number.isFinite(entry.salePricePerSqmBase)
	)
) {
	throw new Error('Some Borsino entries are missing parsed fields.');
}

const content = `export const borsinoMarketMetadata = {\n\tsourceName: 'Borsino Immobiliare',\n\tsourceUrl: 'https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/',\n\tcapturedAt: '2026-04-29',\n\tprovince: 'Torino',\n\tregion: 'Piemonte',\n\tbasis: 'Valore M² Vendita from the Torino province summary table is used as the central/base sale price per square meter.',\n\texcludedZeroSaleKeys: ${JSON.stringify(excludedEntries.map((entry) => entry.key))}\n} as const;\n\nexport type BorsinoMarketArea = {\n\tkey: string;\n\tslug: string;\n\tlabel: string;\n\tmunicipality: string;\n\tprovince: 'Torino';\n\tregion: 'Piemonte';\n\trentPricePerSqmBase: number;\n\tsalePricePerSqmBase: number;\n\tsourceUrl: string;\n};\n\nexport const borsinoMarketAreas = ${JSON.stringify(entries, null, '\t')} as const satisfies readonly BorsinoMarketArea[];\n\nexport const borsinoMarketAreasByKey = Object.fromEntries(\n\tborsinoMarketAreas.map((area) => [area.key, area])\n) as Record<string, BorsinoMarketArea>;\n`;

fs.writeFileSync(targetPath, content);
console.log(
	`Generated ${entries.length} active Borsino market areas from ${dataRows.length} source rows.`
);

if (excludedEntries.length > 0) {
	console.log(`Excluded zero-sale rows: ${excludedEntries.map((entry) => entry.key).join(', ')}`);
}
