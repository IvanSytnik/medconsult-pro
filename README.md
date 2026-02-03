# MedConsult Turkey

Медицинский туризм в Турции — стоматология, пластическая хирургия, пересадка волос.

## Структура проекта

```
medconsult-pro/
├── frontend/          # React приложение (Vite)
│   ├── src/
│   │   ├── components/   # UI компоненты
│   │   ├── pages/        # Страницы
│   │   ├── i18n/         # Переводы (DE, RU, UK, EN)
│   │   └── styles/       # CSS стили
│   ├── package.json
│   └── vercel.json
│
├── backend/           # Node.js API
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Языки

- DE — Немецкий (основной)
- RU — Русский
- УКР — Украинский
- EN — Английский

---

## Быстрый старт (локально)

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

Открыть: http://localhost:5173

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Заполнить .env
npm run dev
```

API: http://localhost:3000

---

## Деплой Frontend на Vercel

### Способ 1: Через CLI (рекомендуется)

```bash
# Установка Vercel CLI
npm install -g vercel

# Деплой
cd frontend
vercel

# Следуйте инструкциям:
# - Link to existing project? → No
# - Project name → medconsult-turkey
# - Directory → ./
# - Override settings? → No
```

### Способ 2: Через GitHub

1. Создайте репозиторий на GitHub
2. Загрузите папку `frontend`
3. Зайдите на [vercel.com](https://vercel.com)
4. New Project → Import Git Repository
5. Выберите ваш репозиторий
6. Framework Preset: **Vite**
7. Root Directory: `frontend` (если загрузили весь проект)
8. Deploy

### Настройка Environment Variables (Vercel)

В Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.com/api
```

---

## Деплой Backend

### Вариант 1: Railway (простой)

1. Зайдите на [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Выберите папку `backend`
4. Добавьте Environment Variables:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_TO`
   - `FRONTEND_URL` (ваш Vercel URL)

### Вариант 2: Render

1. Зайдите на [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Добавьте Environment Variables

### Вариант 3: VPS (Ubuntu)

```bash
# На сервере
git clone <your-repo>
cd medconsult-pro/backend
npm install
cp .env.example .env
nano .env  # Заполнить данные

# Запуск через PM2
npm install -g pm2
pm2 start server.js --name medconsult-api
pm2 save
pm2 startup
```

---

## Настройка Telegram бота

1. Откройте Telegram, найдите **@BotFather**
2. Отправьте `/newbot`
3. Введите имя: `MedConsult Turkey`
4. Введите username: `medconsult_turkey_bot`
5. Скопируйте токен

### Получение Chat ID

1. Создайте группу в Telegram
2. Добавьте бота в группу
3. Добавьте @userinfobot в группу
4. Скопируйте ID группы (начинается с `-100...`)
5. Удалите @userinfobot

---

## Настройка Email (Gmail)

1. Включите 2FA: [Google Account](https://myaccount.google.com) → Security → 2-Step Verification
2. Создайте App Password: Security → App passwords
3. Выберите "Mail" → "Other" → "MedConsult"
4. Скопируйте 16-значный пароль

---

## Команда

| Имя | Роль | Языки | Телефон |
|-----|------|-------|---------|
| Олег | Главный координатор | RU | +49 123 456 7890 |
| Александр | Координатор | RU, DE, УКР | +49 1575 1129620 |
| Галина | Координатор | RU, DE | +49 123 456 7892 |

---

## После деплоя

1. Обновите `VITE_API_URL` в Vercel на URL вашего backend
2. Redeploy frontend в Vercel
3. Проверьте форму отправки
4. Замените placeholder номера телефонов на реальные

---

© 2024 MedConsult Turkey
