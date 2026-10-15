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

## Target architecture

One Next.js app in `web/` (App Router, TypeScript, Tailwind) with Payload CMS 3 embedded, Postgres, and object storage for media.

- **CMS:** the owner edits all copy, photos, videos, prices, clinics, team and legal pages in four locales (Payload field-level localisation). No copy in JSON or JSX once migrated.
- **Pages from blocks:** each page is an ordered list of blocks (hero, services, pricing table, team, video slider, process, FAQ, contact form, ...). The owner can reorder, hide and edit them. No free-form drag-and-drop layout.
- **Theme settings:** a Payload global for colours, font, logo, border radius and per-block style variants, mapped to CSS variables / Tailwind tokens.
- **Lead CRM:** a `leads` collection fed by the contact form. Pipeline status: new → consultation → treatment plan → trip booked → in treatment → aftercare → closed / lost. Fields: assigned coordinator, clinic, service, dates, notes, source, language. Telegram notification on new lead is kept.
- **Roles:** owner (everything), coordinator (leads and read-only content).
- **Routing:** locale in the URL (`/`, `/ru`, `/uk`, `/en`), German without prefix.

## Phases

1. **Next.js port** — rebuild the current site in `web/` 1:1 (same look, same copy from the JSON files, same routes plus locale prefix). Contact form becomes a Next.js route handler. Branch `feat/next-app`. Status: in review. All seven pages in four locales, locale routing, `/api/submit` and `/api/health`, metadata with hreflang, sitemap and robots are done; build and lint pass and full-page screenshots match `frontend/` at 375 and 1440 px in DE and RU. Remaining: a Vercel project with Root Directory `web` for previews, Telegram/e-mail env vars there, an end-to-end form test with real credentials, then merge.
2. **Payload + content migration** — add Payload, Postgres, media storage; seed all collections/globals from the JSON locales; pages read from Payload. Status: not started.
3. **Blocks and theme** — page builder blocks and theme global. Status: not started.
4. **Lead CRM** — leads collection, pipeline views, roles, Telegram hook. Status: not started.
5. **Cutover** — point Vercel to `web/`, retire `frontend/` and `backend/`. Status: not started.

Update the status line of a phase when it changes.

## Conventions

- Code, comments, commit messages and docs in English. Chat with the user in Russian.
- Commit as Ivan Sytnik <ivan.sytnik02@gmail.com>. No `Co-Authored-By`, `Claude-Session` or any mention of Claude/AI in commits, PRs or code.
- No emoji in UI or copy; icons are lucide-react SVGs.
- No marketing filler ("best", "world-class", "premium", "journey", "transform"). Copy states what is done, what is included and what it costs.
- Do not change prices, figures, clinic facts or the Impressum/Privacy texts unless asked.
- Work on feature branches; never push unfinished work to `main` (it deploys production).
- Before every commit: build passes, all four locales have identical keys, no emoji.

## Open questions for the client

- Hair transplant clinics: Istanbul (hair page) or Antalya (contacts)?
- What exactly the hair package price covers, given method prices depend on graft count.
- Backend deploy needs `FRONTEND_URL` set for CORS; check `VITE_API_URL` on Vercel.
- Dental page hotlinks clinic photos from dentanatura.com; replace with own media. As of 2026-10-16 all six of those URLs return 404, as does the Unsplash photo used for the hair hero and the FUE card.
