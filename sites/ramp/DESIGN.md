---
version: "alpha"
name: Ramp
description: AI-native finance operations platform for cards, expenses, bill payments, and banking — built to run a back office in the blink of AI.
colors:
  primary: "#E4F222"
  on-primary: "#0C0A08"
  secondary: "#2A2A2A"
  on-secondary: "#FFFFFF"
  surface: "#F4F2F0"
  surface-alt: "#F7FAFC"
  background: "#FFFFFF"
  on-surface: "#0C0A08"
  on-background: "#0C0A08"
  muted: "#4A5568"
  outline: "#2B2E35"
  inverse-surface: "#000000"
  on-inverse-surface: "#FFFFFF"
  badge-tint: "#E1E7EE"
typography:
  h1: { fontFamily: "Lausanne, Inter, Helvetica, sans-serif", fontSize: 3rem, fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.01em" }
  h2: { fontFamily: "Lausanne, Inter, Helvetica, sans-serif", fontSize: 2.5rem, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.005em" }
  h3: { fontFamily: "Lausanne, Inter, Helvetica, sans-serif", fontSize: 1.5rem, fontWeight: 400, lineHeight: 1.17 }
  body-md: { fontFamily: "Lausanne, Inter, Helvetica, sans-serif", fontSize: 1rem, fontWeight: 400, lineHeight: 1.5 }
  body-sm: { fontFamily: "Inter, sans-serif", fontSize: 0.875rem, fontWeight: 400, lineHeight: 1.4 }
  label-caps: { fontFamily: "Lausanne, Inter, sans-serif", fontSize: 0.625rem, fontWeight: 400, letterSpacing: "0.05em" }
  nav: { fontFamily: "Lausanne, Inter, sans-serif", fontSize: 0.875rem, fontWeight: 400 }
rounded:
  sm: 6px
  md: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  xxl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  button-primary-hover:
    backgroundColor: "#D5E31A"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-background}"
    typography: "{typography.nav}"
    rounded: "{rounded.sm}"
    padding: 8px 12px
  nav-item:
    textColor: "{colors.on-background}"
    typography: "{typography.nav}"
    padding: 8px 12px
  input:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: 0px 0px
    height: 40px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: 24px
  card-cool:
    backgroundColor: "{colors.surface-alt}"
    rounded: "{rounded.md}"
    padding: 24px
  card-dark:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    rounded: "{rounded.md}"
    padding: 24px
  badge:
    backgroundColor: "{colors.badge-tint}"
    textColor: "{colors.on-background}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  eyebrow:
    textColor: "{colors.on-background}"
    typography: "{typography.label-caps}"
  footer:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.on-inverse-surface}"
    padding: 64px 32px
---

## Overview

Ramp's visual language is bright, calm, and almost editorial — a fintech that wants to feel like a magazine spread, not a banking dashboard. The signature gestures are an electric lime-yellow CTA against a pure white canvas, a single custom typeface (Lausanne) carrying every weight of hierarchy, and isometric product mockups that float on dotted-grid backgrounds. Restraint is the personality: one accent color, one typeface, one radius scale.

## Colors

`primary` (#E4F222) is Ramp's lime-yellow and is reserved exclusively for primary CTAs and the brand mark — never as a fill behind type, never as decoration. `background` (#FFFFFF) and `surface` (#F4F2F0, a warm off-white) frame nearly every marketing block; the cool-tinted `surface-alt` (#F7FAFC) appears inside product screenshots and dashboard mockups. `secondary` (#2A2A2A) is the near-black used for the iconic black Ramp card and dark product tiles. `on-background` (#0C0A08) is a warm near-black that does the work of headings, body, and nav alike. `muted` (#4A5568) is the slate gray used only for secondary paragraph copy. `inverse-surface` (#000000) is the pure-black footer. The palette is deliberately starved of mid-tones — the page reads as black, white, and one shock of yellow.

## Typography

Lausanne is the entire system, top to bottom — a contemporary geometric grotesque (approximate; confirmed via the page's `font-family: lausanne`). Every heading sits at weight 400 with tight, near-1.0 line-heights and a hair of negative tracking, which gives the type a confident, oversized-but-quiet feel. Body copy in Lausanne stays at 400/1.5; secondary paragraph blocks drop to Inter at 14px in the muted slate. The eyebrow style (`label-caps`) is 10px Lausanne, tracked out, uppercase, used for section labels like "AGENTS AT WORK TODAY" — it's the only place tracking opens up.

## Layout

8-point spacing rhythm with generous vertical breathing room between sections (64–96px). The hero is a centered single-column composition; downstream sections shift to a 2- and 3-column grid of cards. Container max-width sits comfortably below the 1920 viewport — the page is happy to leave wide outer margins rather than fill them. Density is low: each section gets a clear stage, with the dotted background grid providing rhythm where color does not.

## Elevation & Depth

Surfaces are flat. There are no drop shadows on cards or buttons — depth is communicated through subtle background tint shifts (`surface` vs `surface-alt` vs `card-dark`) and hairline 1px outlines (#2B2E35) on certain framed elements. The hero illustration uses layered isometric product screens to imply depth without ever leaving the flat aesthetic. The overall feel is paper-flat, not glassy or skeuomorphic.

## Shapes

The radius scale is intentionally narrow: 6px for buttons and inputs (the workhorse), 12px for cards, product mockups, and dashboard tiles, and full (pill) for badges and tags. The signature geometric motif is the dotted-grid background — a faint regular dot pattern that reinforces the precision-engineering tone — and the iconic matte-black Ramp card which appears as a recurring anchor object across product mockups.

## Components

Buttons are compact and direct: the yellow `button-primary` does the heavy lifting with a tight 12×16 padding, 6px radius, and weight in the lime, not in the type. Cards are quiet — just a tinted background plus 12px radius, no border, no shadow — and rely on grid placement for hierarchy. Nav reads like a table of contents: 14px Lausanne, no underlines, no chrome. The black product card and dark dashboard tiles provide the only deep contrast moments on the page; they exist to make the yellow CTA pop harder by association.

## Do's and Don'ts

**Do**

- Use `primary` yellow only for the single primary action in any view. One CTA per stage.
- Lean on white space and the dotted grid for rhythm before reaching for color.
- Keep all type in Lausanne at weight 400; let size and tracking carry hierarchy.
- Frame product screenshots inside 12px-radius cards on the off-white `surface`.
- Use the `label-caps` eyebrow to label sections — it's the only place tracking opens up.

**Don't**

- Don't use the lime-yellow as a background fill or large surface — it is a spotlight, not a stage.
- Don't add drop shadows to cards or buttons. Flat is the brand.
- Don't introduce a second typeface for "personality" — the restraint is the personality.
- Don't mix more than two surface tones in a single section (white + one tint, not three).
- Don't pair the muted slate (#4A5568) with the primary yellow — keep yellow paired only with the warm near-black.
