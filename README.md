# MedConsult Turkey

Multilingual website for a medical-tourism consultancy: dental care, plastic surgery, hair transplantation and aesthetic medicine in Turkey.

Live: https://medconsult-pro.vercel.app

## Stack

- Frontend: React 18, Vite, Tailwind CSS, react-i18next, lucide-react
- Backend: Node.js, Express, Nodemailer (contact form to Telegram and e-mail)
- Hosting: Vercel (frontend), any Node host for the API

Supported languages: German (default), Russian, Ukrainian, English.

## Project structure

```
frontend/
  src/
    components/   layout, forms, ui
    pages/        Home, Dental, Plastic, Hair, Aesthetic, Impressum, Privacy
    i18n/         locale files (de, ru, uk, en)
    styles/       global CSS
backend/
  server.js       POST /api/submit, GET /api/health
```

## Local development

Frontend:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs at http://localhost:5173.

Backend:

```bash
cd backend
npm install
cp .env.example .env   # fill in the values
npm run dev
```

Runs at http://localhost:3000.

## Configuration

Frontend (`frontend/.env`):

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API, e.g. `https://api.example.com/api` |

Backend (`backend/.env`):

| Variable | Description |
| --- | --- |
| `PORT` | Port to listen on (default 3000) |
| `FRONTEND_URL` | Allowed CORS origin, the URL of the deployed frontend |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Optional Telegram notifications |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO` | Optional SMTP notifications |

At least one of Telegram or e-mail must be configured, otherwise form submissions return an error.

## Deployment

Frontend on Vercel: import the repository, set the root directory to `frontend`, framework preset Vite, and add `VITE_API_URL`.

Backend: deploy the `backend` directory to a Node host (Railway, Render, a VPS with PM2, etc.). Build command `npm install`, start command `npm start`. Set the environment variables listed above, then update `VITE_API_URL` on the frontend and redeploy.

## Telegram setup

1. Create a bot with @BotFather and copy the token.
2. Add the bot to a group and obtain the group chat id (it starts with `-100`).
3. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.

## E-mail setup (Gmail)

1. Enable 2-Step Verification on the Google account.
2. Create an App Password (Security > App passwords).
3. Set `EMAIL_USER` to the address, `EMAIL_PASS` to the app password, and `EMAIL_TO` to the receiving address.
