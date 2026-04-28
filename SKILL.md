---
name: site-to-design-md
description: Generate a DESIGN.md from a live website URL, following Google's open DESIGN.md spec. The agent captures a viewport screenshot, samples colors and typography directly from the pixels, emits YAML frontmatter (tokens) plus canonical markdown sections, and validates the output with the official `@google/design.md` linter. Triggers on "extract design system from <url>", "generate DESIGN.md from <site>", "site to design md", "design audit of <url>", or any request to derive a design-system document from a live web page.
allowed-tools: Bash(agent-browser:*), Bash(npx agent-browser:*), Bash(npx @google/design.md:*), Read, Write, Edit
---

# site-to-design-md

Derive a `DESIGN.md` from any live URL. Output conforms to [Google's open DESIGN.md spec](https://github.com/google-labs-code/design.md): YAML frontmatter (machine-readable tokens) followed by canonical markdown sections.

The full format spec is in [references/design-md-spec.md](references/design-md-spec.md). Read it before writing the DESIGN.md. A worked example is in [references/example-design.md](references/example-design.md).

## Workflow

1. **Capture** a viewport screenshot of the URL at 1920×1080. Optionally capture a full-page screenshot too.
2. **(Optional) Scrape** the page text and computed styles to inform brand voice, copy, and exact typography metrics. Skip if not available — colors/typography MUST come from the pixels regardless.
3. **Read** the screenshot via your vision capability. This is the primary source of truth for tokens.
4. **Generate** DESIGN.md following [references/design-md-spec.md](references/design-md-spec.md).
5. **Write** to `sites/<brand-slug>/DESIGN.md` in the working directory.
6. **Validate** with the official linter (see [Validation](#validation)). Aim for zero warnings, zero errors.
7. **Iterate** if the linter flags anything: fix orphaned tokens, broken refs, contrast issues, or section-order problems, then re-lint.

## Capturing screenshots

### Path A — `agent-browser` (recommended for Claude Code, also works in Codex)

```bash
agent-browser set viewport 1920 1080
agent-browser open <url>
agent-browser wait --load networkidle
agent-browser screenshot ./design-viewport.png
agent-browser screenshot --full ./design-fullpage.png
agent-browser close
```

If `agent-browser` is not installed, install with `npm i -g agent-browser` (or `brew install agent-browser` / `cargo install agent-browser`), then `agent-browser install` to fetch Chrome.

### Path B — Codex native browser tool

If you are running as Codex and have a built-in browser/web tool, use it instead:

1. Navigate to the URL.
2. Set the viewport to 1920×1080 (or the closest desktop preset).
3. Wait for the page to settle (network idle / load complete).
4. Capture the visible viewport as a PNG.
5. Capture the full scrollable page as a second PNG (if supported).

The exact commands depend on the Codex version. Whatever the tool, the goal is identical: a desktop-resolution PNG saved locally that you can read with vision.

## Generating DESIGN.md

After capturing, **Read the screenshot** to bring the pixels into your context. Then follow the full spec at [references/design-md-spec.md](references/design-md-spec.md). Key rules (do not skip):

- **Hex codes come from pixel sampling.** Page text/markdown contains no CSS — never invent or copy colors from a different source.
- **Font families come from visual identification.** If unsure, name the closest common substitute and append "approximate" in the prose.
- **Token references in `components` MUST point to keys you actually defined.** Don't reference `{colors.warning}` if you didn't define `warning`.
- **Output ONLY the DESIGN.md content.** No preamble, no commentary, no surrounding code fences.
- Keep prose tight and opinionated, like a creative brief.

## Output

Write the result to `sites/<brand-slug>/DESIGN.md` in the current working directory unless the user specified otherwise.

- `<brand-slug>` is the brand name lowercased, with non-alphanumeric characters collapsed to single hyphens and leading/trailing hyphens stripped (e.g. `Ramp` → `ramp`, `Linear App` → `linear-app`, `Stripe.com` → `stripe`).
- Create the directory if it does not exist.
- If `sites/<brand-slug>/DESIGN.md` already exists, overwrite it (the user is asking for a fresh extraction).

After writing, confirm the path and surface 1–2 notable tokens (e.g. the primary color hex and the heading typeface) so the user can sanity-check at a glance.

## Validation

After writing, run the official linter from `@google/design.md`:

```bash
npx --yes @google/design.md lint sites/<brand-slug>/DESIGN.md
```

The linter reports JSON with `findings[]` (severity: `error` | `warning` | `info`) and a `summary`. Common findings and how to resolve them:

- **`broken-ref`** (error): a `{path.to.token}` reference does not resolve. Either define the missing token or change the reference to a defined one.
- **`orphaned-tokens`** (warning): a color token is defined but never referenced by any component. Wire it into a component (e.g. `card.textColor: "{colors.on-surface}"`) or omit it. The page-level `background`/`on-background` can be wired through a `page` component.
- **`contrast-ratio`** (warning): a component's `backgroundColor`/`textColor` pair is below WCAG AA (4.5:1). Adjust the pairing rather than the brand color.
- **`missing-primary`** (warning): no `primary` color token. The spec strictly recommends defining `primary`.
- **`section-order`** (warning): `##` headings are out of canonical order. Reorder to match the spec.

The goal is **0 errors, 0 warnings** before declaring the file done. The `info`-level token-count summary is fine.

Other useful CLI commands:

```bash
npx --yes @google/design.md spec                                       # print the upstream spec
npx --yes @google/design.md export --format tailwind sites/<slug>/DESIGN.md > tailwind.theme.json
npx --yes @google/design.md export --format dtcg     sites/<slug>/DESIGN.md > tokens.json
npx --yes @google/design.md diff sites/<slug>/DESIGN.md sites/<slug>/DESIGN-v2.md
```

## Viewing the result

The repo ships a single-file viewer.

- **Gallery mode**: run `npm start` (or `node serve.mjs`) at the repo root. A local server scans `sites/` and exposes a sidebar list; the browser opens automatically at <http://localhost:4173/>.
- **Standalone mode**: open `viewer.html` directly via `file://` and drop a `DESIGN.md` onto the drop zone — no server needed, but no sidebar list either.

The viewer renders YAML frontmatter as live color swatches, type specimens (in the actual font/size/weight), spacing and radius scales, and styled component previews, then renders the markdown body underneath.

## Cleanup

Delete the temporary screenshot files (`design-viewport.png`, `design-fullpage.png`) once the DESIGN.md is written, unless the user asked to keep them.

## Bot detection

Some sites (e.g. `ramp.com`) serve a text-only "machine version" to default headless user-agents. If the captured screenshot looks like plain text rather than the visual page, set a realistic desktop User-Agent header before reopening:

```bash
agent-browser set headers '{"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"}'
agent-browser open <url>
```
