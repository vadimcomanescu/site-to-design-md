# DESIGN.md Format Spec (skill-local digest)

Authoritative source: <https://github.com/google-labs-code/design.md> · full spec: [`docs/spec.md`](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) · live spec: <https://stitch.withgoogle.com/docs/design-md/specification>

A `DESIGN.md` is YAML frontmatter (machine-readable design tokens) followed by canonical markdown sections (human-readable rationale). Tokens are normative; prose explains how to apply them.

## YAML Frontmatter (between `---` delimiters)

Top-level fields:

- `version` (optional): current value `"alpha"`
- `name` (string): brand/site name
- `description` (optional, string): 1-sentence positioning blurb in the brand's own voice
- `colors`: `map<string, Color>`
- `typography`: `map<string, Typography>`
- `rounded`: `map<string, Dimension>` (e.g. `{ sm: 4px, md: 8px, full: 9999px }`)
- `spacing`: `map<string, Dimension | number>` (e.g. `{ sm: 8px, md: 16px, lg: 32px, xl: 64px }`)
- `components`: `map<string, map<string, string|reference>>`

### Token types

| Type | Format | Example |
|:-----|:-------|:--------|
| Color | `#` + sRGB hex | `"#1A1C1E"` |
| Dimension | number + unit (`px`, `em`, `rem`) | `48px`, `-0.02em`, `1.5rem` |
| Token Reference | `{path.to.token}` | `{colors.primary}`, `{typography.body-md}` |
| Typography | object with the props below | (see below) |

`Typography` object fields:

- `fontFamily` (string)
- `fontSize` (Dimension)
- `fontWeight` (number; bare `400` or quoted `"400"` are equivalent)
- `lineHeight` (Dimension or unitless number; unitless is preferred per CSS practice)
- `letterSpacing` (Dimension)
- `fontFeature` (string; sets `font-feature-settings`)
- `fontVariation` (string; sets `font-variation-settings`)

### `colors`

`primary` is the only color the spec strictly recommends. Common semantic slots:

- `primary`, `secondary`, `tertiary`, `neutral`
- `surface`, `on-surface`, `background`, `on-background`
- `error` (and any `success`/`warning` you can confirm)
- Container/foreground pairs (e.g. `primary-container`, `on-primary`) where the page provides them.

Values are exact hex codes sampled from the screenshot. If an `on-*` foreground isn't visible on the page, omit the key rather than inventing.

> **Lint warning to avoid:** any color token defined but never referenced by a component is flagged as orphaned. Either wire the token into a component (e.g. `card.textColor: "{colors.on-surface}"`) or omit it.

### `typography`

Common naming convention: `display-*`, `headline-*` / `h1`/`h2`/`h3`, `body-*`, `label-*`, `caption`. The spec accepts any key.

Include only styles you can verify visually. Font families must be exact (or noted as "approximate" in the prose if you had to guess).

### `components`

Each component entry maps a name to a group of sub-token properties.

**Valid component property tokens** (anything else triggers a lint warning):

- `backgroundColor` — `Color`
- `textColor` — `Color`
- `typography` — `Typography` (often a `{typography.*}` reference)
- `rounded` — `Dimension`
- `padding` — `Dimension` (multi-value strings like `12px 16px` are accepted)
- `size`, `height`, `width` — `Dimension`

Variants (hover, active, pressed, disabled, secondary, etc.) are **separate entries with a related key name** — never nested. Use token references for shared values: `"{colors.primary}"`, `"{rounded.sm}"`, `"{typography.body-md}"`.

Example:

```yaml
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-container}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 14px
    height: 40px
```

Cover the components evident on the page: buttons (primary + at least one variant), card/tile, input, link, nav-item, badge/tag, footer, etc.

## Markdown Body (after frontmatter)

Use `##` headings in this **canonical order** (omit any section you genuinely cannot infer; do not reorder). Section name aliases are accepted by the linter where shown:

1. `## Overview` (alias: `## Brand & Style`) — 2–3 sentences on design philosophy / brand voice / what makes the visual language distinctive.
2. `## Colors` — semantic role for each palette (what `primary` is used for, when `secondary` appears, etc.).
3. `## Typography` — type hierarchy and when to use each style.
4. `## Layout` (alias: `## Layout & Spacing`) — spacing rhythm, grid/container behavior, density.
5. `## Elevation & Depth` (alias: `## Elevation`) — shadow / border / surface treatment. If unequivocally flat, say so.
6. `## Shapes` — radius scale rationale, iconography shape, signature geometric motifs.
7. `## Components` — short paragraph per component group describing visual personality.
8. `## Do's and Don'ts` — 3–5 concrete, opinionated rules per side.

A leading `#` H1 title is allowed but not parsed as a section. Duplicate `##` headings are a fatal error.

## Linter rules

The official CLI linter (`npx @google/design.md lint <file>`) runs these checks:

| Rule | Severity | What it catches |
|:-----|:---------|:----------------|
| `broken-ref` | error | Token references that don't resolve to a defined token |
| `missing-primary` | warning | `colors` defined but no `primary` |
| `contrast-ratio` | warning | Component `backgroundColor`/`textColor` pair below WCAG AA (4.5:1) |
| `orphaned-tokens` | warning | Color tokens defined but never referenced by any component |
| `missing-typography` | warning | Colors defined but no typography tokens |
| `section-order` | warning | Sections out of canonical order |
| `missing-sections` | info | Optional sections (`spacing`, `rounded`) absent when other tokens exist |
| `token-summary` | info | Per-section token counts |

Aim for **zero warnings, zero errors** before declaring the file done.

## Generation rules (skill-specific)

- **Read color hex codes by sampling pixels from the screenshot or computed styles.** Scraped page text contains no CSS.
- **Font families: identify visually from the screenshot's letter shapes.** Common heuristics — geometric sans (Söhne, Inter, Helvetica), grotesque, serif, monospace. If unsure, name the closest common substitute and note "approximate" in the prose.
- **Token references MUST point to keys you actually defined.** Don't reference `{colors.warning}` if you didn't define `warning`.
- **Avoid orphaned tokens.** Wire every color into at least one component, or omit it. The page-level background/foreground can be wired through a `page` component.
- **Keep prose tight and opinionated** — like a creative brief, not documentation.
- **Output ONLY the DESIGN.md content.** No preamble, no commentary, no markdown code fences around the whole document.
