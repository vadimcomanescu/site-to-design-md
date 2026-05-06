# ADR-0002: Zero-dependency viewer (`serve.mjs`)

**Date**: 2026-04-29
**Status**: Accepted

## Context

The repo ships a local viewer that renders generated `DESIGN.md` files as live swatches, type specimens, and component previews. Adding Express, Vite, or a framework would let the viewer ship faster but would require `npm install` before `npm start` works, pull in a dependency tree to audit, and turn this skill from a single-file artifact into a Node project.

A skill that can be installed by `git clone` + symlink and run with no install step is materially easier to trust and to keep portable across machines.

## Decision

`serve.mjs` uses only Node ≥ 18 built-ins (`node:http`, `node:fs/promises`, `node:path`, `node:url`). `package.json` declares no `dependencies` and no `devDependencies`. External tooling (`agent-browser`, `@google/design.md`) is invoked via `npx` at runtime, never installed into the repo.

## Consequences

- `npm start` works on a fresh clone with no install step.
- No supply-chain surface area for the viewer itself.
- `serve.mjs` MUST stay small enough to be readable in one sitting; if it grows past a few hundred lines or genuinely needs middleware, revisit this decision rather than smuggling deps in.
- Frontend (`viewer.html`) likewise stays single-file: vanilla JS + inline CSS, no build step.
