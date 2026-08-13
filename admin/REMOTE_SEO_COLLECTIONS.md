# Remote PocketBase: local SEO collections

These collections must be created manually on the remote PocketBase instance. No migration is included or executed by this repository change.

## `seo_locations`

Public listing/view rules may be open (`true`) because this is public page configuration. Restrict create/update/delete to the existing admin policy.

**PocketBase field options:** keep the relation field itself non-unique. Nearby values may repeat across records; uniqueness belongs only to the canonical `slug` index.

| Field              | Type     | Required | Notes                                                           |
| ------------------ | -------- | -------: | --------------------------------------------------------------- |
| `slug`             | text     |      yes | ASCII canonical URL slug; add a unique index                    |
| `name`             | text     |      yes | Correct visible Italian name, including accents                 |
| `province`         | text     |       no | Example: `Torino`                                               |
| `region`           | text     |       no | Example: `Piemonte`                                             |
| `latitude`         | number   |       no | Used to prefill the valuation location                          |
| `longitude`        | number   |       no | Used to prefill the valuation location                          |
| `nearby_locations` | relation |       no | Multiple self-relation to `seo_locations`; no cascade deletion  |

Recommended index:

```sql
CREATE UNIQUE INDEX idx_seo_locations_slug ON seo_locations (slug)
```

## `seo_pages`

Public listing/view rules should expose enabled records, while authenticated admins must also be able to list and view disabled drafts. For example, adapt the admin predicate to the actual auth model:

```text
enabled = true || @request.auth.type = "admin"
```

Restrict create/update/delete to the existing admin policy. A rule containing only `enabled = true` prevents the custom admin UI from loading drafts even after authentication.

| Field              | Type        | Required | Notes                                                           |
| ------------------ | ----------- | -------: | --------------------------------------------------------------- |
| `location`         | relation    |      yes | Single relation to `seo_locations`, cascade delete recommended  |
| `intent`           | select      |      yes | One of `case-in-vendita`, `case-in-affitto`, `valutazione-casa` |
| `enabled`          | bool        |      yes | Controls route existence and hub/internal links                 |
| `indexable`        | bool        |      yes | Controls robots and sitemap independently of inventory          |
| `title`            | text        |       no | Metadata override                                               |
| `meta_description` | text        |       no | Metadata override                                               |
| `h1`               | text        |       no | Visible heading override                                        |
| `intro`            | editor/text |       no | Visible introductory copy override                              |
| `content`          | editor/text |       no | Optional long editorial section; trusted admin HTML             |

Recommended index:

```sql
CREATE UNIQUE INDEX idx_seo_pages_location_intent ON seo_pages (location, intent)
```

**Important:** both `location` and `intent` must have their field-level `Unique` option disabled. Only the compound index above should be unique. Making either field unique limits the collection to one page per municipality or one page per intent and prevents the intended three combinations per location.

PocketBase's built-in `updated` field is used for sitemap `lastmod`; no synthetic timestamp is generated.

## Initial curated records

The rollout can start with these canonical locations and explicit relationships:

| Slug                | Name              | Nearby locations                                     |
| ------------------- | ----------------- | ---------------------------------------------------- |
| `ivrea`             | Ivrea             | `banchette`, `burolo`, `bollengo`, `pavone-canavese` |
| `banchette`         | Banchette         | `ivrea`, `pavone-canavese`                           |
| `burolo`            | Burolo            | `ivrea`, `bollengo`                                  |
| `bollengo`          | Bollengo          | `ivrea`, `burolo`                                    |
| `pavone-canavese`   | Pavone Canavese   | `ivrea`, `banchette`                                 |
| `chivasso`          | Chivasso          | `caluso`                                             |
| `caluso`            | Caluso            | `chivasso`, `strambino`                              |
| `strambino`         | Strambino         | `ivrea`, `caluso`                                    |
| `cuorgne`           | Cuorgnè           | `rivarolo-canavese`                                  |
| `rivarolo-canavese` | Rivarolo Canavese | `cuorgne`                                            |

Suggested initial `seo_pages` are deliberately curated rather than exhaustive:

- Ivrea: all three intents
- Bollengo: sale and valuation
- Burolo: sale
- Chivasso: rent
- Cuorgnè: valuation

Set `indexable` per record. A zero-inventory municipality can remain indexable by leaving this flag enabled; inventory does not silently override the editorial decision.

Coordinates should be entered from the agency's verified geographic source. Do not invent them: valuation prefilling is simply omitted when either coordinate is absent, while market data still resolves by canonical municipality name.

The nearby relation is intentionally directional: selecting Burolo as nearby from Ivrea does not automatically make Ivrea nearby from Burolo. Configure both directions when that is the intended editorial relationship. A relation is preferred to JSON slugs because PocketBase validates referenced records, the admin can provide a multiple selector, and renaming a slug cannot leave stale nearby values.
