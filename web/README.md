# MedConsult Turkey – web

Next.js (App Router, TypeScript, Tailwind CSS) version of the site, phase 1 of the migration plan (Next.js port; CMS follows in phase 2). It renders the same pages as `frontend/` and replaces the Express contact API in `backend/`.

## Development

```bash
cp .env.example .env.local   # fill in Telegram / e-mail if you want real notifications
npm install
npm run dev                  # http://localhost:3000
npm run build
npm run lint
```

## Structure

- `messages/{de,ru,uk,en}.json` – copy for all pages (next-intl). Keys must match across all four files.
- `src/app/[locale]/` – pages: `/`, `/dental`, `/plastic`, `/hair`, `/aesthetic`, `/impressum`, `/privacy`.
- `src/app/api/submit` – contact form handler (validation, Telegram, e-mail, in-memory rate limit). `src/app/api/health` reports which integrations are configured.
- `src/proxy.ts` – locale routing. German is served without a prefix, the other languages under `/ru`, `/uk`, `/en`.
- `src/app/sitemap.ts`, `src/app/robots.ts` – SEO files; every page sets canonical and hreflang links.

## Environment

See `.env.example`. All variables are server-side except `NEXT_PUBLIC_SITE_URL`.

## Deploy

Vercel project with Root Directory `web`.
