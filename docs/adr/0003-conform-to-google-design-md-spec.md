# ADR-0003: Conform to Google's `@google/design.md` spec

**Date**: 2026-04-29
**Status**: Accepted

## Context

A custom design-token format would be easy to invent and tune to this skill's exact output. But that format would be useless to anyone outside this repo and would force every downstream consumer (Tailwind theme generation, DTCG token export, diffing across versions) to be reinvented locally.

Google publishes an open `DESIGN.md` spec with a published linter and exporters at `@google/design.md`.

## Decision

Output strictly conforms to the upstream spec at <https://github.com/google-labs-code/design.md>. The local copy at `references/design-md-spec.md` is the authoring reference; the upstream `npx --yes @google/design.md lint` is the source of truth for validity. Goal is zero errors and zero warnings before declaring an output complete.

## Consequences

- Free interop: any consumer of the spec can read our output (Tailwind, DTCG tokens, diff tool — all out of the box via `@google/design.md export`).
- We inherit the spec's evolution; when it changes, `references/design-md-spec.md` MUST be re-synced and existing samples re-validated.
- Some local opinions (e.g. brand-slug naming for `sites/<slug>/`) are out of scope for the spec and live in this repo's conventions instead.
- Cannot fork the format to fit edge cases. If the spec is genuinely insufficient, fix it upstream rather than diverge.
