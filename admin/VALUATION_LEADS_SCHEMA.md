# Valuation Leads Schema

Reference for the new PocketBase backend collection created by [1767051000_created_valuation_leads.js](./pb_migrations/1767051000_created_valuation_leads.js).

## Collection

- Collection name: `valuation_leads`
- Collection id: `pbc_valuation_001`
- Type: `base`

## Access Rules

- `createRule`: `null`
- `listRule`: `@request.auth.id != '' && @request.auth.type = 'admin'`
- `viewRule`: `@request.auth.id != '' && @request.auth.type = 'admin'`
- `updateRule`: `@request.auth.id != '' && @request.auth.type = 'admin'`
- `deleteRule`: `@request.auth.id != '' && @request.auth.type = 'admin'`

Notes:

- Public clients cannot create records directly through PocketBase rules.
- Intended write path is the SvelteKit backend endpoint using privileged server-side PocketBase credentials.
- Read/update/delete access is admin-only.

## Fields

| Field               | Type       | Required | Notes                                                           |
| ------------------- | ---------- | -------- | --------------------------------------------------------------- |
| `id`                | `text`     | yes      | PocketBase primary key, auto-generated, 15 chars                |
| `created`           | `autodate` | yes      | set on create                                                   |
| `updated`           | `autodate` | yes      | set on create and update                                        |
| `property_data`     | `json`     | yes      | full valuation input payload                                    |
| `price_min`         | `number`   | yes      | rounded minimum valuation shown to user                         |
| `price_max`         | `number`   | yes      | rounded maximum valuation shown to user                         |
| `price_final`       | `number`   | yes      | internal pre-range valuation after modifiers and flat additions |
| `currency`          | `text`     | yes      | 3-letter ISO code, expected `EUR`                               |
| `full_name`         | `text`     | yes      | seller lead name                                                |
| `email`             | `email`    | yes      | seller lead email                                               |
| `phone`             | `text`     | yes      | seller lead phone                                               |
| `consent_given`     | `bool`     | yes      | privacy consent flag                                            |
| `consent_timestamp` | `date`     | yes      | consent capture timestamp                                       |
| `privacy_version`   | `text`     | yes      | privacy policy version accepted by the lead                     |
| `locale`            | `text`     | yes      | launch value expected to be `it`                                |
| `utm`               | `json`     | no       | campaign attribution metadata                                   |
| `status`            | `select`   | yes      | `new`, `contacted`, `closed`                                    |
| `notes`             | `text`     | no       | admin notes                                                     |
| `source_url`        | `text`     | no       | page URL where the lead was generated                           |
| `ip_hash`           | `text`     | no       | hashed client IP for abuse tracking                             |

## Nested JSON Shapes

### `property_data`

This field stores the valuation input collected by the wizard and consumed by [engine.ts](../src/lib/valuation/engine.ts).

Expected shape:

```json
{
	"areaKey": "ivrea_centro",
	"squareMeters": 100,
	"rooms": 4,
	"condition": "ristrutturato",
	"floor": "terzo_piu_con_ascensore",
	"extras": {
		"box_auto_singolo": true,
		"box_auto_doppio": false,
		"posto_auto_scoperto": false,
		"giardino_privato": false,
		"terrazzo_abitabile": false
	}
}
```

#### Allowed `condition` values

- `da_ristrutturare`
- `buono`
- `ristrutturato`
- `nuova_costruzione`

#### Allowed `floor` values

- `piano_terra`
- `primo_piano`
- `secondo_con_ascensore`
- `secondo_senza_ascensore`
- `terzo_piu_con_ascensore`
- `terzo_piu_senza_ascensore`
- `attico`

#### Supported `extras` keys

- `box_auto_singolo`
- `box_auto_doppio`
- `posto_auto_scoperto`
- `giardino_privato`
- `terrazzo_abitabile`

### `utm`

Suggested shape:

```json
{
	"source": "google",
	"medium": "cpc",
	"campaign": "valutazione-casa",
	"term": "valutazione casa ivrea",
	"content": "hero-cta"
}
```

## Indexes

- `idx_valuation_leads_created` on `created`
- `idx_valuation_leads_status` on `status`
- `idx_valuation_leads_email` on `email`

## Operational Notes

- `price_min` and `price_max` are the rounded public range values returned by the engine.
- `price_final` is stored for internal debugging, reporting, and recalculation audits.
- `ip_hash` should contain a one-way hash, never a raw IP address.
- `locale` is currently Italian-only at launch.
- Any future schema change should update both the migration layer and this file.
