# Conventions

Project-specific conventions for `site-to-design-md`. For Node.js standards see the [Node.js docs](https://nodejs.org/docs/latest-v18.x/api/). For the DESIGN.md format itself, see [`references/design-md-spec.md`](../references/design-md-spec.md).

## File organization

```
SKILL.md            # Skill canon: workflow, capture, validation, cleanup
README.md           # Human-facing install + usage
serve.mjs           # Zero-dependency local viewer (Node built-ins only)
viewer.html         # Single-file frontend (vanilla JS + inline CSS)
references/         # DESIGN.md spec + worked example
sites/<slug>/       # Generated DESIGN.md outputs (one dir per brand)
docs/               # ADRs and project conventions
```

## Naming

- **Brand slugs** (`sites/<slug>/`): brand name lowercased, non-alphanumeric collapsed to single hyphens, leading/trailing hyphens stripped. `Ramp` → `ramp`, `Linear App` → `linear-app`, `Stripe.com` → `stripe`.
- **Output file**: always `DESIGN.md` (uppercase). Never `design.md` or `Design.md`.
- **Screenshots**: `design-viewport.png`, `design-fullpage.png` at the working-directory root. Both are listed in `.gitignore` and MUST be deleted after the DESIGN.md is written (see [SKILL.md#Cleanup](../SKILL.md#cleanup)).

## Module style

- ESM only (`"type": "module"` in `package.json`). No CommonJS, no `require()`.
- Imports use the `node:` prefix for built-ins (`import http from "node:http"`).
- Node ≥ 18.

## Dependencies

Zero dependencies in `package.json` is a feature, not an accident — see [ADR-0002](adr/0002-zero-dependency-viewer.md). External CLIs (`agent-browser`, `@google/design.md`) are invoked via `npx --yes` at runtime, never added to `dependencies`.

If a real need to pull in a dep arises, MUST first justify it against ADR-0002 and update that ADR.

## `agent-browser` session scoping

Every `agent-browser` invocation MUST pass `--session site-to-design-md`. The default session is shared across the system; running unscoped will hijack a session another caller is mid-task on. See [SKILL.md#capturing-screenshots](../SKILL.md#capturing-screenshots).

## Validation

The only validator is the upstream linter:

```bash
npx --yes @google/design.md lint sites/<brand-slug>/DESIGN.md
```

Target: 0 errors, 0 warnings. The `info`-level token-count summary is fine. See [SKILL.md#validation](../SKILL.md#validation) for the common-findings table.

## Patterns to avoid

| Avoid | Use instead | Why |
|-------|-------------|-----|
| Inventing hex codes from memory | Sample from the screenshot pixels via vision | [ADR-0001](adr/0001-vision-based-token-sampling.md) |
| Adding npm dependencies for the viewer | Node built-ins only | [ADR-0002](adr/0002-zero-dependency-viewer.md) |
| Inventing token keys not in the spec | Use the spec's vocabulary; lint catches drift | [ADR-0003](adr/0003-conform-to-google-design-md-spec.md) |
| Running `agent-browser` without `--session` | Always `--session site-to-design-md` | Prevents hijacking other agents' browser sessions |
| Committing `design-*.png` screenshots | Delete after writing DESIGN.md; they're gitignored | Skill cleanup step |
