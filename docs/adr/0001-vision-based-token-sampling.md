# ADR-0001: Sample design tokens from pixels via vision, not from CSS

**Date**: 2026-04-29
**Status**: Accepted

## Context

Most "design system extractor" tools scrape DOM and computed CSS to read colors and typography. That approach inherits the page's authoring artifacts (CSS variables that overshadow brand colors, inlined SVG fills, image-baked text, A/B-test overrides, third-party widget themes) and fails on heavily client-rendered or auth-walled pages where the relevant styles never make it to a flat stylesheet.

This skill targets *visible* brand identity, the colors and type a human would describe after looking at the homepage for ten seconds.

## Decision

Capture a 1920×1080 viewport screenshot, then read it with the agent's vision capability and sample colors and typography directly from pixels. Optional CSS scraping is allowed only as supplementary copy/voice context; it MUST NOT override what the pixels say.

## Consequences

- Output reflects what users actually see, not what authors wrote.
- Works uniformly across SSR, SPA, image-heavy, and auth-gated marketing pages.
- Hex codes are inherently approximate (anti-aliased edges, JPEG artifacts) — codified by `references/design-md-spec.md` and acceptable for a brief, not a pixel-perfect token export.
- Requires a vision-capable agent; non-vision LLM callers cannot use this skill end-to-end.
