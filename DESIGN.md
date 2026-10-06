# Design System — A-dam Style Reference for Ayrton Store

<!-- impeccable:design-schema 1 -->

## Design Direction

morning surf over a curated product shelf — a light, airy canvas where honest basics and ocean-toned photography do the talking.

**Theme:** light

A-dam speaks through a quiet, honest visual language: a morning sky of off-white and warm gray frames products like specimens on a clean shelf. The dark navy (`#000e1f`) anchors every text surface with calm authority, while a single saturated blue (`#0000c5`) appears only in the announcement bar — a deliberate exclamation against an otherwise hushed palette. Outfit (substitute for GT Walsheim Pro) at weight 900 and 70px with a 1.00 line-height gives display headlines presence without shouting, the tight leading turning huge type into graphic blocks. Pill-shaped buttons (30px radius) and flat product cards create a friendly, approachable surface where imagery carries the emotional weight.

## Color Tokens

- `--color-midcurrent-navy`: `#000e1f` (Primary text, filled buttons, rating widget, icon strokes)
- `--color-deep-cobalt`: `#0000c5` (Announcement bar surface and occasional accent punctuation)
- `--color-twilight-slate`: `#1a2635` (Secondary borders and emphasis dividers)
- `--color-graphite`: `#000000` (Icon fills, nav text, and footer ink)
- `--color-paper-white`: `#ffffff` (Card surfaces, product tile backgrounds, nav bar canvas)
- `--color-morning-mist`: `#f4f4f4` (Page canvas and elevated card background — the warm off-white)
- `--color-cloud-veil`: `#e6e7e9` (Dominant hairline border for cards, icons, links, and image frames)
- `--color-soft-stone`: `#dcdddf` (List dividers, secondary borders, and badge outlines)
- `--color-slate-gray`: `#666e79` (Muted helper text, secondary copy, and link text in resting state)
- `--color-sunbeam`: `#fff48d` (Star-rating fills exclusively)

## Typography

- **Primary Typeface:** `Outfit`, sans-serif (substitute for GT Walsheim Pro, geometric warmth, broad weight range 400, 500, 700, 900)
- **Display:** 70px / 1.00 line-height, weight 900 (tight leading, graphic block)
- **Heading LG:** 44px / 1.10 line-height, weight 700
- **Heading:** 30px / 1.10 line-height, weight 700
- **Heading SM:** 26px / 1.20 line-height, weight 700
- **Subheading:** 20px / 1.20 line-height, weight 600
- **Body:** 16px / 1.40 line-height, weight 400
- **Caption / Meta:** 11-13px / 1.40 line-height, weight 500

## Spacing & Shapes

- **Density:** Compact
- **Page max-width:** 1200px
- **Section gap:** 48px - 80px
- **Card padding:** 16px
- **Element gap:** 10px

### Border Radius Rules
- `buttons`: 30px (full pill)
- `inputs`: 30px (pill)
- `tags & chips`: 30px (pill)
- `links (pill action)`: 30px
- `productCards`: 0px (flat tiles, no radius)
- `productTiles`: 0px

## Elevation & Shadows

The system is **intentionally shadowless**. Depth is communicated through surface contrast (Paper White `#ffffff` on Morning Mist `#f4f4f4` canvas) and hairlines (`#e6e7e9`), never through drop shadows.

## Do's and Don'ts

### Do
- Use display headlines at weight 900 with tight leading (1.00)
- Set border-radius to 30px on all buttons, inputs, tags, and pill links
- Keep product cards flat: 0px radius, no shadow, clean white tile on `#f4f4f4` canvas
- Use Midcurrent Navy (`#000e1f`) for primary text and filled buttons
- Reserve Deep Cobalt (`#0000c5`) for the announcement bar and micro-accents
- Use hairline Cloud Veil (`#e6e7e9`) borders where structure is required
- Use Sunbeam (`#fff48d`) exclusively for star-rating fills

### Don't
- Don't add drop shadows to product cards, category cards, or buttons
- Don't use Deep Cobalt for body text or large fills
- Don't introduce rectangular button radii — 30px pill is the signature shape
- Don't fill the page with color — 95% neutral palette

