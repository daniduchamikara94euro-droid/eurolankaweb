# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
```

There are no test or lint scripts configured.

## Architecture

**Next.js 14 App Router** site for a furniture accessories e-commerce brand. No backend database — all product data lives in React Context + `localStorage`.

### Directory Structure

- `app/(site)/` — Main website pages (home, products, about, contact) using a route group
- `app/admin/` — PIN-protected admin dashboard (`admin2024`)
- `app/api/upload/` — Image upload API route (Vercel Blob or base64 fallback)
- `components/` — Reusable UI components
- `context/ProductsContext.js` — Central state: products array + featured IDs

### Data Flow

`ProductsContext` is the single source of truth. It seeds 12 default products, syncs to `localStorage` (`elw_products`, `elw_featured`), and is consumed by all pages. There is no external API for product data.

**Product model shape:**
```js
{
  id, name, category, emoji, price, img, description,
  variants: [{ name, type: 'color'|'size'|'type', options: [...] }]
}
```
Categories: `Handles`, `Hinges`, `Slides`, `Fittings`, `Legs`, `Locks`

### Image Storage

Images upload to **Vercel Blob** via `POST /api/upload`. Requires env var `BLOB_READ_WRITE_TOKEN`. Without it, the API returns base64 data URLs (local dev fallback). `next.config.mjs` whitelists `*.public.blob.vercel-storage.com` for `next/image`.

### Styling

Tailwind CSS with custom `brand` color tokens defined in `tailwind.config.js`:
- `brand-bg: #050d1a` — dark background
- `brand-primary: #0ea5e9` — sky blue accent
- `brand-deep: #1e40af` — deep blue

Glass-morphism utility classes (`.glass`, `.glass-card`, `.neon-card`, `.glow-btn`) are defined in `app/globals.css`.

### Key Components

- `HeroVisual` — Uses `@splinetool/react-spline` for 3D scene; must be dynamically imported (`ssr: false`)
- `ProductModal` — Variant selector with dynamic image switching per variant option
- `ScrollReveal` — Intersection Observer wrapper for scroll-in animations
- `CustomCursor` — Global custom cursor; client-only

### Admin Panel

Route `/admin` — PIN `admin2024` stored in `sessionStorage`. Supports full product CRUD, variant builder, image upload/crop, and featured product management (max 4).
