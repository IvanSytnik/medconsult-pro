# MedConsult Turkey

Website and back office for a medical-tourism coordination service.

## Business

- We do not treat patients. We coordinate: select a partner clinic in Turkey, prepare a treatment plan with a price, organise hotel and transfers, help with flights, accompany the patient on site and stay in touch after they return.
- Patients come from Germany and the EU. Partner clinics are in Turkey.
- Services: dentistry, plastic surgery, hair transplantation, aesthetic medicine.
- Site languages: German (default), Russian, Ukrainian, English. Every user-facing string exists in all four.

## Current state (production)

- `frontend/`: React 18 + Vite + Tailwind + react-i18next. Copy lives in `frontend/src/i18n/locales/{de,ru,uk,en}.json`. Deployed on Vercel (medconsult-pro.vercel.app) from `main`.
- `backend/`: Express API with `POST /api/submit` (contact form to Telegram and e-mail) and `GET /api/health`.
- Production stays on this stack until the new app reaches parity.

## Hosting, domain and e-mail

- The new app (`web/`) runs on the Vercel project `medconsult-web` at https://medconsult.sytnik-studio.com (studio domain, used for the demo until the client has its own domain). `NEXT_PUBLIC_SITE_URL` drives `metadataBase`, canonical, hreflang, sitemap and robots.
- DNS for `sytnik-studio.com` is on Cloudflare: `CNAME medconsult -> cname.vercel-dns.com`, proxy off (DNS only, grey cloud), otherwise Vercel cannot issue the certificate.
- Outgoing mail: Resend (`resend` SDK) with the whole `sytnik-studio.com` domain verified (DKIM, SPF/MX on `send.`, DMARC `p=none`). Env: `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`. Without `RESEND_API_KEY` the form skips e-mail and still notifies Telegram.
- Incoming mail: Cloudflare Email Routing forwards addresses on `sytnik-studio.com` to Gmail.
- Media: Vercel Blob store with **public** access (the Payload 3.91 adapter cannot write to private stores). Connected to `medconsult-web`, provides `BLOB_READ_WRITE_TOKEN`.
- Indexing is off until cutover (`robots.txt` disallow, `noindex` meta and `X-Robots-Tag`). Set `NEXT_PUBLIC_ALLOW_INDEXING=true` only on the final domain.

## Target architecture

One Next.js app in `web/` (App Router, TypeScript, Tailwind) with Payload CMS 3 embedded, Postgres, and object storage for media.

- **CMS:** the owner edits all copy, photos, videos, prices, clinics, team and legal pages in four locales (Payload field-level localisation). No copy in JSON or JSX once migrated.
- **Pages from blocks:** each page is an ordered list of blocks (hero, services, pricing table, team, video slider, process, FAQ, contact form, ...). The owner can reorder, hide and edit them. No free-form drag-and-drop layout.
- **Theme settings:** a Payload global for colours, font, logo, border radius and per-block style variants, mapped to CSS variables / Tailwind tokens.
- **Lead CRM:** a `leads` collection fed by the contact form. Pipeline status: new → consultation → treatment plan → trip booked → in treatment → aftercare → closed / lost. Fields: assigned coordinator, clinic, service, dates, notes, source, language. Telegram notification on new lead is kept.
- **Roles:** owner (everything), coordinator (leads and read-only content).
- **Routing:** locale in the URL (`/`, `/ru`, `/uk`, `/en`), German without prefix.

## Phases

1. **Next.js port** — rebuild the current site in `web/` 1:1 (same look, same copy from the JSON files, same routes plus locale prefix). Contact form becomes a Next.js route handler. Branch `feat/next-app`. Status: done apart from the merge. All seven pages in four locales, locale routing, `/api/submit` and `/api/health`, metadata with hreflang, sitemap and robots are done; build and lint pass and full-page screenshots matched `frontend/` at 375 and 1440 px in DE and RU. Next.js 16.4 stays: `@payloadcms/next` 3.91 supports `>=16.3.3 <17`. Deployed to the separate Vercel project `medconsult-web` (Root Directory `web`, production branch `feat/next-app`): https://medconsult-web.vercel.app. Live at https://medconsult.sytnik-studio.com (2026-10-18): Let's Encrypt certificate valid, HTTP redirects to HTTPS; Resend env vars and `NEXT_PUBLIC_SITE_URL` set, a real form submission reached Telegram and e-mail, `/api/health` reports both; canonical, og:url and hreflang (de/ru/uk/en/x-default) on all 28 pages and every sitemap.xml entry use the subdomain, no references to vercel.app or localhost; indexing stays off (robots.txt `Disallow: /`, `noindex` meta and `X-Robots-Tag` on every page). Remaining: merge.
2. **Payload, data and block pages** — add Payload, Postgres, media storage; every page is built from blocks (one block type per existing section, each with a hidden flag, order set in the admin); collections, globals and blocks are seeded from the JSON locales and the data hardcoded in JSX; the frontend reads everything from Payload. Branch `feat/payload`, merged into `feat/next-app` on 2026-10-18. Status: done. Payload 3.91 at `/admin` (collections: pages, services, treatments, clinics, team-members, videos, media, users; globals: site-settings, legal; 20 block types). Pages are SSG and revalidated by afterChange hooks. Seed is idempotent (`npm run seed`, `SEED_FORCE=1` resets to the original content); the Vercel build runs migrations and seeds an empty database; the first admin sign-up becomes owner. Verified locally on Postgres 16: build and lint pass, seed twice on an empty database without duplicates, all 28 screenshots (7 pages × 375/1440 × DE/RU) identical to phase 1 apart from photos (remote Unsplash images could not be downloaded in the test environment and show placeholders), text/photo/block-order edits appear on the site after saving. Preview deployment verified on Vercel (Neon + public Blob store): pages, admin and media work; the build re-uploads seeded media whose files are missing.
3. **Theme and block styles** — theme global (colours, font, logo, radius) and per-block style variants. Branch `feat/theme`, merged into `feat/next-app` on 2026-10-19. Status: done. Theme global (Settings > Theme): primary/secondary as ten shades or generated from one base colour (becomes shade 600), font (Inter or Manrope, Montserrat, Open Sans, Roboto via next/font, system), logo image plus two-part text, corner radius; applied as CSS variables that Tailwind's colours, `font-sans` and `rounded-*` read, defaults equal the old values. Every block has `style.background` (none, white, light grey, light brand gradient, dark, brand colour; default is the block's old look, old values migrated) and `style.spacing` (normal, compact); dark backgrounds flip the neutral scale so light blocks stay readable. Horizontal scroll at 375 px fixed on all pages. Also: `/favicon.ico` for site and admin, Payload e-mails through Resend, explicit `sslmode=verify-full`. Verified locally on Postgres 16: build and lint pass, migration up/down/up keeps the backgrounds, seed twice on an empty database without duplicates; all 28 pages at 1440 px in DE/RU/UK/EN identical to `feat/next-app`; at 375 px no page is wider than the screen, and apart from the 11 pages that scrolled only DE plastic (stat label hyphenated) and UK dental (trust bar words hyphenated) changed; colour, font, radius, logo text and block style edits in the admin appear on the site after saving. Production (2026-10-19): migration applied to the production database during the Vercel build, the build log no longer shows the e-mail adapter and sslmode warnings; DE screenshots at 1440 px identical to before the merge, at 375 px only the three pages that scrolled (dental, hair, aesthetic) and plastic (stat label hyphenated) changed and none is wider than the screen; `/favicon.ico` served; theme global readable at `/api/globals/theme` with the default values, `/admin/globals/theme` leads to the login.
4. **Lead CRM** — leads collection, pipeline views, roles, Telegram hook. Status: not started.
5. **Cutover** — point Vercel to `web/`, retire `frontend/` and `backend/`. Status: not started.

Update the status line of a phase when it changes.

## Working with the CMS (`web/`)

- Copy, prices, photos, team, videos and section order live in Payload, not in JSX or JSON. `web/messages/*.json` only holds interface strings the CMS does not manage (form labels, language names).
- After changing collections, globals or blocks: `npm run generate:types`, `npm run migrate:create`, commit the migration. Deployed databases change only through migrations.
- New section type: add a block in `src/payload/blocks.ts`, a renderer in `src/components/blocks/`, and a case in `RenderBlocks.tsx`.
- The seed (`src/seed/`) is the reference copy of the original site; keep it working when the schema changes.

## Conventions

- Code, comments, commit messages and docs in English. Chat with the user in Russian.
- Commit as Ivan Sytnik <ivan.sytnik02@gmail.com>. No `Co-Authored-By`, `Claude-Session` or any mention of Claude/AI in commits, PRs or code.
- No emoji in UI or copy; icons are lucide-react SVGs.
- No marketing filler ("best", "world-class", "premium", "journey", "transform"). Copy states what is done, what is included and what it costs.
- Do not change prices, figures, clinic facts or the Impressum/Privacy texts unless asked.
- Work on feature branches; never push unfinished work to `main` (it deploys production).
- Before every commit: build passes, all four locales have identical keys, no emoji.

## Open questions for the client

- A real launch needs the client's own domain (the Impressum lists info@medconsult-turkey.com); move DNS, Resend and Email Routing to it at cutover.

- Hair transplant clinics: Istanbul (hair page) or Antalya (contacts)?
- What exactly the hair package price covers, given method prices depend on graft count.
- Backend deploy needs `FRONTEND_URL` set for CORS; check `VITE_API_URL` on Vercel.
- Real photos needed. These spots show neutral placeholders from `web/public/placeholder/` because the original dentanatura.com and Unsplash URLs returned 404 (2026-10-16); `frontend/` still points at the dead URLs:
  - Dental hero: portrait of Dr. Mevlüt (large, right column).
  - Dental clinic section: Dr. Mevlüt avatar next to his bio.
  - Dental clinic section: clinic team photo (wide).
  - Dental clinic section: three small clinic photos under the team photo.
  - Hair hero: main photo.
  - Hair methods: FUE card photo.
- Other photos (plastic, hair, aesthetic, home "about") are Unsplash stock images; the seed downloads them into the media library. Replace them with own photos in the admin.
