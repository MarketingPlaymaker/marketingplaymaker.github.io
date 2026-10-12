# Playmaker landing page

Live at https://marketingplaymaker.com.br

Next.js 14 (App Router), Tailwind CSS v4, Motion (Framer Motion), three.js.

## Run locally

Requires Node.js 18.17+ (LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Netlify builds every push to `main` (settings in `netlify.toml`). Commit and
push from GitHub Desktop; the site updates in a few minutes.

## Booking form

Requests are emailed through EmailJS (service, template and public key in
`lib/booking.ts`). The template receives `user_name`, `user_email`,
`organization`, `service`, `preferred_date` and `message`.

## Structure

```
app/
  layout.tsx        fonts (next/font), SEO metadata, Motion provider
  globals.css       Playmaker design tokens (@theme) and the glass utility
  page.tsx          section composition
  robots.ts, sitemap.ts, icon.png
components/
  sections/         page sections (navbar, problems, services, method, about, booking, FAQ, footer)
  ui/               shadcn-style components
    horizon-hero-section.tsx   21st.dev Horizon hero, adapted
    horizon-scene.tsx          three.js stadium-to-court scene (lazy-loaded)
    resizable-navbar.tsx       21st.dev resizable navbar, adapted
lib/                helpers, nav links, booking config
public/             brand images, og-image.jpg
```
