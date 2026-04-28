# DESIGN.md Format Spec

Reference: <https://github.com/google-labs-code/design.md>

A `DESIGN.md` is YAML frontmatter (machine-readable design tokens) followed by canonical markdown sections (human-readable rationale).

## YAML Frontmatter (between `---` delimiters)

Required and recommended top-level fields:

- `version: "alpha"`
- `name`: brand/site name visible on the page
- `description`: 1-sentence positioning blurb in the brand's own voice
- `colors`: token map (see below)
- `typography`: token map (see below)
- `rounded`: scale of `<Dimension>`, e.g. `{ sm: 4px, md: 8px, lg: 16px }`
- `spacing`: scale of `<Dimension | number>`, e.g. `{ sm: 8px, md: 16px, lg: 32px, xl: 64px }`
- `components`: component token map (see below)

### `colors`

Use semantic slots, not just primary/secondary. Suggested keys (include only those identifiable from the screenshot):

- `primary`, `on-primary`, `primary-container`
- `secondary`, `on-secondary`, `secondary-container`
- `tertiary`, `on-tertiary`, `tertiary-container`
- `neutral`, `surface`, `background`, `on-surface`, `on-background`
- `outline` (border color)
- `error`, `success`, `warning` (where present)

Values are exact hex codes sampled from the screenshot. If a true `on-*` (foreground for that surface) isn't visible on the page, omit the key rather than inventing.

### `typography`

Each entry is a nested YAML map of properties:

```yaml
typography:
  h1:    { fontFamily, fontSize (rem), fontWeight, lineHeight, letterSpacing }
  h2:    { fontFamily, fontSize, fontWeight, lineHeight }
  body-md: { fontFamily, fontSize, fontWeight, lineHeight }
  body-sm: { fontFamily, fontSize, fontWeight, lineHeight }
  label-caps: { fontFamily, fontSize, fontWeight, letterSpacing }
```

Include only styles you can verify visually. Font families must be exact (or noted as "approximate" in the prose if you had to guess).

### `components`

Component tokens use these sub-properties: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`.

Variants (hover, active, pressed, disabled, secondary, etc.) are **separate entries with a related key name** — not nested. Use token references where possible: `"{colors.tertiary}"`, `"{rounded.sm}"`, `"{typography.body-md}"`.

Example shape:

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
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 14px
    height: 40px
```

Cover the components evident on the page: buttons (primary + at least one variant), card/tile, input, link, nav-item, badge/tag, etc.

## Markdown Body (after frontmatter)

Use `##` headings in this **canonical order** (omit any section you genuinely cannot infer; do not reorder):

1. `## Overview` — 2–3 sentences on the design philosophy / brand voice / what makes the visual language distinctive.
2. `## Colors` — explain each semantic role (what is `primary` used for, when does the secondary appear, etc.).
3. `## Typography` — describe the type hierarchy and when to use each style.
4. `## Layout` — spacing rhythm (8-pt? 4-pt?), grid/container behavior, density philosophy.
5. `## Elevation & Depth` — shadow / border / surface treatment (flat? layered? glass?). If the page is unequivocally flat with no shadows, say so.
6. `## Shapes` — radius scale rationale (which radius for which surface), iconography shape, any signature geometric motifs (logos, patterns).
7. `## Components` — short paragraph per component group describing visual personality (CTA prominence, card density, etc.).
8. `## Do's and Don'ts` — 3–5 bullet rules each. "Do use yellow only for primary CTAs", "Don't combine more than two type weights in a heading", etc. Concrete, opinionated.

## Rules

- **Read color hex codes by sampling pixels from the screenshot.** Scraped page text contains no CSS.
- **Font families: identify visually from the screenshot's letter shapes.** Common heuristics — geometric sans (Söhne, Inter, Helvetica), grotesque, serif, monospace. If you cannot identify with reasonable confidence, name the closest common substitute and note "approximate" in the body.
- **Token references in `components` MUST point to keys you actually defined.** Don't reference `{colors.warning}` if you didn't define `warning`.
- Keep prose concise and opinionated, like a creative brief. No filler.
- **Output ONLY the DESIGN.md content.** No preamble, no closing remarks, no markdown code fences around the whole document.
