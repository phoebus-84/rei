# Borsino valuation data

The valuation engine uses `valutazione_borsino.html` as the captured source for the Borsino Immobiliare Torino province table.

## Source limits

- Source page: `https://borsinoimmobiliare.it/quotazioni-immobiliari/piemonte/torino-provincia/`
- Capture date: `2026-04-29`
- Direct automated fetch was blocked by Cloudflare/HTTP 403 during investigation, so the source table is captured manually into `valutazione_borsino.html`.
- The province summary table exposes municipality, rent value, and sale value. It does not expose Borsino min/max ranges.
- `Valore M² Vendita` is treated as the central/base sale price per square meter.
- Min/max valuation bounds are derived from `valuationRangeConfig.lowerBoundFactor` and `valuationRangeConfig.upperBoundFactor` in `src/lib/valuation/config.ts`.

## Refresh process

1. Replace `valutazione_borsino.html` with a fresh copy of the Borsino Torino province municipality table.
2. Run `node scripts/generate-borsino-market-data.mjs`.
3. Run `bun test src/lib/valuation/*.spec.ts`.
4. Review changes in `src/lib/valuation/borsino-market-data.ts`, especially `capturedAt`, key municipalities, and `excludedZeroSaleKeys`.

The generator excludes rows where the sale price is zero because a zero base price would produce invalid valuation output. In the 2026-04-29 capture those rows are `lugnacco`, `pecco`, `trausella`, and `vico_canavese`.

## Rollout notes

- New valuation submissions require a selected Piemonte location from the autocomplete.
- The resolver currently supports Borsino data for the Torino province. Piemonte locations outside this dataset are rejected by the valuation flow instead of falling back to an unrelated municipality.
- Lead `property_data` stores the selected location, resolved Borsino market area, property kind, and level count for agent review.
