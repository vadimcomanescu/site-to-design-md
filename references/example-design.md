---
version: "alpha"
name: Stripe
description: A unified financial platform that lets internet businesses accept payments, run marketplaces, and manage revenue.
colors:
  primary: "#635BFF"
  on-primary: "#FFFFFF"
  primary-container: "#0A2540"
  secondary: "#00D4FF"
  surface: "#FFFFFF"
  background: "#F6F9FC"
  on-surface: "#0A2540"
  on-background: "#425466"
  outline: "#E3E8EE"
typography:
  h1: { fontFamily: "Sohne, Helvetica, sans-serif", fontSize: 4rem, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.02em" }
  h2: { fontFamily: "Sohne, Helvetica, sans-serif", fontSize: 2.5rem, fontWeight: 600, lineHeight: 1.1 }
  body-md: { fontFamily: "Sohne, Helvetica, sans-serif", fontSize: 1rem, fontWeight: 400, lineHeight: 1.5 }
  body-sm: { fontFamily: "Sohne, Helvetica, sans-serif", fontSize: 0.875rem, fontWeight: 400, lineHeight: 1.5 }
  label-caps: { fontFamily: "Sohne Mono, monospace", fontSize: 0.75rem, fontWeight: 500, letterSpacing: "0.08em" }
rounded:
  sm: 4px
  md: 8px
  lg: 16px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  button-primary-hover:
    backgroundColor: "#7A73FF"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 32px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 10px 14px
    height: 40px
  nav-item:
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
---

## Overview

Stripe's visual language is technical, calm, and confident — a developer-tools aesthetic dressed up for a finance audience. The dominant gestures are gradient hero sections, animated geometric motifs, generous whitespace, and a custom geometric sans (Sohne) that reads precise without feeling cold.

## Colors

`primary` (#635BFF, "Stripe blurple") is reserved for primary CTAs, link emphasis, and gradient anchors — never used as a large background fill. `primary-container` (#0A2540) is the dark navy used for footer and high-contrast hero sections. `background` (#F6F9FC) is the off-white that frames most marketing surfaces. `secondary` (#00D4FF) appears almost exclusively inside gradient illustrations, never as a flat fill.

## Typography

Sohne is the entire system. Headings use 600 weight with tight letter-spacing for a confident editorial feel; body text drops to 400 with comfortable 1.5 line-height. The `label-caps` style (Sohne Mono, tracked out) is used sparingly for section eyebrows and code-adjacent labels to reinforce the technical posture.

## Layout

8-point spacing rhythm. Marketing sections use generous vertical breathing room (96–128px between content blocks). Container max-width sits around 1200px with comfortable side gutters. Density is low — Stripe gives each idea its own panel of whitespace.

## Elevation & Depth

Surfaces are flat with hairline (#E3E8EE) borders rather than drop shadows. Depth comes from layered gradients in the background, not from raised cards. Where shadows exist (e.g. the dashboard product shots), they are soft and diffuse.

## Shapes

Radius scale is conservative: 4px for inputs and buttons (the workhorse), 8px for medium surfaces, 16px for hero cards and product mockups. The signature visual motif is the animated gradient mesh — diagonal sweeps of blurple, teal, and magenta — which appears in hero backgrounds and section dividers.

## Components

Buttons are compact and direct: small radius, tight padding, weight in the type rather than the chrome. Cards rely on the hairline outline plus background tint to define themselves; they almost never use shadow. Nav items are quiet text links — the navigation reads like a table of contents, not a toolbar.

## Do's and Don'ts

**Do**

- Use blurple only for primary CTAs and link emphasis.
- Pair Sohne body copy with Sohne Mono labels to signal technical credibility.
- Lean on whitespace for hierarchy before reaching for color.
- Use gradients as background atmosphere, not as button fills.

**Don't**

- Don't use blurple as a large background fill — it's a spotlight color, not a stage.
- Don't add drop shadows to cards. Use the hairline outline instead.
- Don't mix more than two weights of Sohne in a single heading group.
- Don't introduce a second typeface for "personality" — restraint is the personality.
