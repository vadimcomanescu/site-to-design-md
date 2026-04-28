# site-to-design-md

An agent skill that generates a `DESIGN.md` from any live website URL. Output conforms to [Google's open DESIGN.md spec](https://github.com/google-labs-code/design.md): YAML frontmatter (machine-readable design tokens) followed by canonical markdown sections.

Inspired by [hyperdesign](https://github.com/vadimcomanescu/hyperdesign), but packaged as a portable agent skill — no Next.js app, no API server, no separate Anthropic call. The agent itself captures the screenshot, sees it via vision, and writes the DESIGN.md in one shot. Works with Claude Code (via [`agent-browser`](https://github.com/agent-browser/agent-browser)) and Codex (via its native browser tool).

## Install

This is a self-contained skill. Symlink it into your skills directory.

### Claude Code

```bash
ln -s ~/Code/site-to-design-md ~/.claude/skills/site-to-design-md
```

### Codex

```bash
ln -s ~/Code/site-to-design-md ~/.codex/skills/site-to-design-md
```

### Canonical multi-agent layout

If you follow the `~/.agents/skills/` canonical layout:

```bash
ln -s ~/Code/site-to-design-md ~/.agents/skills/site-to-design-md
ln -s ~/.agents/skills/site-to-design-md ~/.claude/skills/site-to-design-md
ln -s ~/.agents/skills/site-to-design-md ~/.codex/skills/site-to-design-md
```

## Prerequisites

- **Claude path**: [`agent-browser`](https://github.com/agent-browser/agent-browser) installed (`npm i -g agent-browser` then `agent-browser install`).
- **Codex path**: a working native browser/web tool in your Codex install.

## Usage

In any agent session:

> Generate a DESIGN.md from <https://stripe.com>

The agent will:

1. Capture a 1920×1080 viewport screenshot of the page.
2. Read the screenshot via vision.
3. Sample colors from pixels and identify type families visually.
4. Write a `DESIGN.md` to `sites/<brand-slug>/DESIGN.md` in the working directory (e.g. `sites/stripe/DESIGN.md`).

See [SKILL.md](SKILL.md) for the workflow and [references/design-md-spec.md](references/design-md-spec.md) for the format spec. A worked example output is in [references/example-design.md](references/example-design.md).

## Viewer

A zero-dependency local viewer ships with the repo. It indexes every `sites/*/DESIGN.md` automatically and renders the YAML frontmatter as live color swatches, type specimens (in the actual font/size/weight), spacing and radius scales, and styled component previews — followed by the prose body.

```bash
npm start            # starts http://localhost:4173 and opens it in your browser
```

The server (`serve.mjs`) uses only Node built-ins, no `npm install` step. Requires Node ≥ 18.

You can also open `viewer.html` directly via `file://` and drag a `DESIGN.md` onto the drop zone — no server needed, but no sidebar list either.

## License

MIT
