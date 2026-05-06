# AGENTS.md

| Item | Value |
|------|-------|
| Stack | Node.js ≥ 18, ESM, **zero dependencies** |
| Purpose | Agent skill that extracts a Google-spec `DESIGN.md` from a live URL |
| Skill canon | [`SKILL.md`](SKILL.md) — workflow, capture, validation, cleanup |
| Output spec | [`references/design-md-spec.md`](references/design-md-spec.md) |
| Dev | `npm start` → local viewer at <http://localhost:4173> |
| Lint | `npx --yes @google/design.md lint sites/<slug>/DESIGN.md` |
| Test | none (no test suite; validation is the lint pass) |

This file is a map. The deep workflow lives in [`SKILL.md`](SKILL.md). Read that first when running the skill.

**Authority**: `AGENTS.md` is canonical. `CLAUDE.md` is a symlink to it. If `SKILL.md` and `AGENTS.md` ever conflict, `AGENTS.md` wins for repo conventions; `SKILL.md` wins for the skill's runtime workflow.

## Commands

```bash
npm start                                                   # local viewer at :4173
npx --yes @google/design.md lint sites/<slug>/DESIGN.md     # validate output (target 0/0)
npx --yes @google/design.md spec                            # print upstream DESIGN.md spec
npx --yes @google/design.md export --format tailwind sites/<slug>/DESIGN.md > tailwind.theme.json
npx --yes @google/design.md export --format dtcg     sites/<slug>/DESIGN.md > tokens.json
agent-browser --session site-to-design-md screenshot ./design-viewport.png   # capture path A
```

There is no install step (zero deps). There is no build step. There is no test runner.

## Project structure

```
SKILL.md            # Skill canon: when running the skill, follow this verbatim
README.md           # Human-facing install + usage
serve.mjs           # Zero-dep viewer server (Node built-ins only)
viewer.html         # Single-file frontend (vanilla JS + inline CSS)
references/         # DESIGN.md spec + worked example
sites/<slug>/       # Generated DESIGN.md outputs (one dir per brand)
docs/adr/           # Architecture decision records
docs/conventions.md # Project-specific conventions
```

To list current outputs: `ls sites/`. Do not hardcode the brand list.

## Code style

ESM with `node:` prefix; built-ins only. Pattern from `serve.mjs`:

```js
import http from "node:http";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
```

- ESM only (`import`, no `require`).
- `node:` prefix for built-ins.
- No new dependencies in `package.json` without first updating [ADR-0002](docs/adr/0002-zero-dependency-viewer.md).

## Testing

There is no test suite and no test runner. The DESIGN.md linter pass *is* the validation:

```bash
npx --yes @google/design.md lint sites/<slug>/DESIGN.md     # 0 errors, 0 warnings
```

If a future test suite is added (e.g. for `serve.mjs`), use `node --test` (built-in) to preserve the zero-dependency invariant.

## Git workflow

- Branch: `feature/`, `fix/`, `chore/` prefixes.
- Commit: imperative mood, ≤ 72 chars first line, multi-line body when context helps.
- Single `main` branch. No PR template; commit directly or open a PR per the user's preference.

## Forbidden patterns

| WRONG | CORRECT | Why |
|-------|---------|-----|
| Invent hex codes from memory or copy from a brand guide | Sample from screenshot pixels via vision | [ADR-0001](docs/adr/0001-vision-based-token-sampling.md) |
| `agent-browser <cmd>` without `--session` | `agent-browser --session site-to-design-md <cmd>` | Default session is shared; you'll hijack another caller |
| Add an npm dependency for `serve.mjs` | Use Node built-ins; if truly needed, update [ADR-0002](docs/adr/0002-zero-dependency-viewer.md) first | Zero-dep is a deliberate choice |
| Reference a token like `{colors.warning}` you didn't define | Define the token, or change the reference | Linter `broken-ref` error |
| Write `design.md` (lowercase) or place outside `sites/<slug>/` | Always `sites/<slug>/DESIGN.md` | Convention + viewer expects this layout |
| Commit `design-viewport.png` / `design-fullpage.png` | Delete after writing DESIGN.md (gitignored) | Skill cleanup step |
| Output preamble or commentary around the DESIGN.md | Output ONLY the DESIGN.md content | Spec violation; breaks the linter and the viewer |
| Diverge from the upstream DESIGN.md spec | Conform; fix the spec upstream if genuinely insufficient | [ADR-0003](docs/adr/0003-conform-to-google-design-md-spec.md) |

## Boundaries

- Never add a dependency to `package.json` without updating ADR-0002.
- Never modify files under `references/` to make a sample pass — fix the sample, not the spec.
- Never commit screenshot artifacts (`design-*.png`, `*.tmp.png`).
- Never run `agent-browser` without `--session site-to-design-md`.

## Verification

After generating or editing a `sites/<slug>/DESIGN.md`:

1. `npx --yes @google/design.md lint sites/<slug>/DESIGN.md` — target **0 errors, 0 warnings**.
2. `npm start` and visually confirm swatches/typography render as expected at <http://localhost:4173/?file=<slug>>.
3. Confirm temporary screenshots are deleted.

## References

| File | Purpose |
|------|---------|
| [`SKILL.md`](SKILL.md) | Skill canon: full workflow, screenshot capture (paths A & B), validation, cleanup, bot-detection workaround |
| [`README.md`](README.md) | Install (symlink), prerequisites, usage examples |
| [`references/design-md-spec.md`](references/design-md-spec.md) | Full DESIGN.md format spec (authoring reference) |
| [`references/example-design.md`](references/example-design.md) | Worked example DESIGN.md output |
| [`docs/conventions.md`](docs/conventions.md) | Naming, ESM rules, session scoping, patterns to avoid |
| [`docs/adr/0001-vision-based-token-sampling.md`](docs/adr/0001-vision-based-token-sampling.md) | Why pixels, not CSS |
| [`docs/adr/0002-zero-dependency-viewer.md`](docs/adr/0002-zero-dependency-viewer.md) | Why `serve.mjs` ships with zero deps |
| [`docs/adr/0003-conform-to-google-design-md-spec.md`](docs/adr/0003-conform-to-google-design-md-spec.md) | Why we use Google's open spec |
