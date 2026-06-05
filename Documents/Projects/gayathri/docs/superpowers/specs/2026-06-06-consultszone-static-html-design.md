# Consultszone Static HTML Site

**Date:** 2026-06-06
**Project:** Recreate consultszone.com as a self-contained static HTML file

## Overview

Convert the Elementor-based WordPress site (consultszone.com) into a single, standalone HTML file with inline CSS and minimal vanilla JS. No build tools, no WordPress dependency, no server-side rendering.

## Pages

Single-page site. All content lives in one HTML file with smooth anchor navigation.

## Design Tokens

| Token | Value |
|-------|-------|
| Primary color | `#303F95` |
| Secondary | `#69727D` |
| Accent | `#303F95` |
| Background | `#FFFFFF` |
| Text primary | `#000000` |
| Link color | `#0015A3` |
| Heading font | `Montserrat` (Google Fonts) |
| Body font | `Roboto` (Google Fonts) |
| Button radius | `50px` (primary), `4px` (secondary) |
| Team section bg | Dark navy (`#1a2332`) |

## Sections (in order)

1. **Hero Slider** — 2 slides with overlaying quote text, auto-rotates every 5s, arrow navigation, dot indicators. Lightweight vanilla JS (~5KB). Images from Unsplash.
2. **About** — Two-column layout: left side image (`man-giving-bar-graph-presentation`), right side "About Consultszone" heading, description paragraph, "What We Believe" subheading and paragraph.
3. **Industries We Serve** — Heading + 8 cards in 4×2 grid (desktop) / 2×4 (tablet) / 1-column (mobile). Cards: Manufacturing, Logistics & Supply Chain, Retail & Distribution, Trading & Import/Export, Service Organizations, FMCG & Consumer Goods, Construction & Engineering, SMEs & Growing Businesses. Each with icon image, title, short description.
4. **Our Capabilities** — 3 feature columns with Font Awesome icons (chart-line, people-carry, link). Each has title and description.
5. **Meet Our Team** — Dark navy background section. 4 team member cards in a row: Gayathri Karunanayaka (Director/CEO), Amilthan Suntharalingam (Director), Gayani De Alwis (Advisory Board Member), Amra Zareer (Advisory Board Member). Each has circular photo, name, title, bio, LinkedIn icon link.
6. **Our Services** — 6 service cards in 2 rows of 3. Each card: header image, service title, bullet list of offerings.
   - Internal Audit & Assurance
   - Business Process Audit
   - Advisory Services
   - Project Management
   - ERP/SAP/WMS/TMS Functional Consultancy
   - Digital Transformation
7. **CTA + Contact Form** — "Do you want to start striving? Connect with us" heading. Contact form with: First Name, Last Name, Email, Subject, Message fields + Submit button. JavaScript shows "Thank You" message on submit.
8. **WhatsApp Widget** — Fixed-position floating button (bottom-right, green background), opens WhatsApp link on click.
9. **Back to Top Button** — Circular button with progress ring, appears on scroll.

## Technical Decisions

| Aspect | Decision |
|--------|----------|
| Framework | None — vanilla HTML/CSS/JS |
| CSS | All inline in `<style>` tag |
| JS | Inline `<script>` — carousel, form handler, scroll-to-top, WhatsApp toggle |
| Icons | Font Awesome 6 Free (CDN) |
| Fonts | Google Fonts (Montserrat + Roboto via `@import`) |
| Slider | Custom vanilla JS (no library) |
| Form | Frontend-only — shows success message, no backend |
| Responsive | CSS media queries for tablet (768px) and mobile (480px) |
| File | Single `index.html` file |

## Component Details

### Hero Slider
- Full-viewport-height slides
- Semi-transparent dark overlay for text readability
- Quote centered on each slide
- Auto-rotate interval: 5000ms
- Left/right arrow buttons + dot indicators
- Pause on hover

### Team Cards
- Circular images (150×150)
- White text on dark background
- LinkedIn icon button per member
- Hover effect: slight lift + shadow

### Service Cards
- Image at top (responsive)
- Title as `h2`
- Bullet list of service items
- Clean card with border/shadow

### Contact Form
- Styled inputs with border-radius `4px`
- Submit button: primary color, rounded (`50px`)
- Inline validation (HTML5 `required`)
- On submit: prevent default → show success message → reset form

### WhatsApp Widget
- Fixed position, bottom-right
- Green background (`#2DB742`)
- Click opens `https://api.whatsapp.com/send?phone=94772355491`
- Chat box with agent avatar shown on click

## Image Sources

- Hero slides: Unsplash (matching the original vibe — modern office/tech)
- Industry icons: Emoji/unicons or Font Awesome (replacing the original PNGs that may not load)
- Team photos: Original WordPress media URLs (if accessible)
- Service card images: From original site or placeholders

## Error States

- If external images fail to load: `alt` text visible, CSS `object-fit` prevents layout shift
- If Font Awesome CDN fails: icons will not show but layout remains intact (use `::before` fallback only if critical)
- If Google Fonts fail: fallback to system font stack
- Form submission failure: in-browser only, no network dependency

## Responsive Breakpoints

- **Desktop**: ≥1024px — full layout
- **Tablet**: 768px–1023px — 2-column grids for cards, stacked hero
- **Mobile**: ≤480px — single column, smaller fonts, stacked layout
