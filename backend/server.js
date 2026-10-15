/**
 * MedConsult Turkey - contact form API.
 * Forwards form submissions to Telegram and e-mail.
 */

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || false,
  methods: ['POST', 'GET'],
}));
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

const CONFIG = {
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: process.env.EMAIL_TO || 'info@medconsult-turkey.com',
  },
};

let transporter = null;
if (CONFIG.email.user && CONFIG.email.pass) {
  transporter = nodemailer.createTransport({
    host: CONFIG.email.host,
    port: CONFIG.email.port,
    secure: CONFIG.email.port === 465,
    auth: {
      user: CONFIG.email.user,
      pass: CONFIG.email.pass,
    },
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const LIMITS = { name: 100, email: 254, phone: 40, short: 50, message: 3000 };

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function sendTelegram(message) {
  if (!CONFIG.telegram.botToken || !CONFIG.telegram.chatId) {
    console.log('Telegram not configured');
    return false;
  }

  const url = `https://api.telegram.org/bot${CONFIG.telegram.botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CONFIG.telegram.chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);
    return true;
  } catch (error) {
    console.error('Telegram error:', error.message);
    return false;
  }
}

async function sendEmail(data) {
  if (!transporter) {
    console.log('Email not configured');
    return false;
  }

  const firstName = escapeHtml(data.firstName);
  const lastName = escapeHtml(data.lastName);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone);
  const message = escapeHtml(data.message);
  const source = escapeHtml(data.source);
  const language = escapeHtml(data.language);
  const timestamp = escapeHtml(data.timestamp);
  const service = data.service;

  const serviceNames = {
    dental: 'Stomatologie / Стоматология',
    plastic: 'Plastische Chirurgie / Пластическая хирургия',
    hair: 'Haartransplantation / Пересадка волос',
    aesthetic: 'Ästhetische Medizin / Эстетическая медицина',
    implants: 'Implantate / Импланты',
    crowns: 'Kronen / Коронки',
    veneers: 'Veneers / Виниры',
    'all-on': 'All-on-4/6',
    other: 'Andere / Другое',
  };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0f766e 0%, #0d5d56 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Neue Anfrage / Новая заявка</h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">MedConsult Turkey</p>
      </div>
      
      <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${firstName} ${lastName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Telefon:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${phone ? `<a href="tel:${phone}">${phone}</a>` : '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Service:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${escapeHtml(serviceNames[service] || service || '—')}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Quelle:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${source || 'main'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Sprache:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${language || 'de'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-weight: bold;">Zeit:</td>
            <td style="padding: 12px 0;">${timestamp}</td>
          </tr>
        </table>
        
        ${message ? `
        <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <strong>Nachricht / Сообщение:</strong>
          <p style="margin: 10px 0 0; white-space: pre-wrap;">${message}</p>
        </div>
        ` : ''}
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"MedConsult Turkey" <${CONFIG.email.user}>`,
      to: CONFIG.email.to,
      replyTo: data.email,
      subject: `Neue Anfrage: ${data.firstName} ${data.lastName || ''} — ${serviceNames[service] || 'Beratung'}`.replace(/[\r\n]+/g, ' '),
      html: htmlContent,
    });
    return true;
  } catch (error) {
    console.error('Email error:', error.message);
    return false;
  }
}

app.post('/api/submit', async (req, res) => {
  const body = req.body || {};

  const data = {
    firstName: clean(body.firstName, LIMITS.name),
    lastName: clean(body.lastName, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    phone: clean(body.phone, LIMITS.phone),
    service: clean(body.service, LIMITS.short),
    message: clean(body.message, LIMITS.message),
    source: clean(body.source, LIMITS.short),
    language: clean(body.language, 10),
    timestamp: clean(body.timestamp, 40),
  };

  if (!data.firstName || !data.email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  const serviceNames = {
    dental: 'Stomatologie',
    plastic: 'Plastische Chirurgie',
    hair: 'Haartransplantation',
    aesthetic: 'Ästhetische Medizin',
    implants: 'Implantate',
    crowns: 'Kronen',
    veneers: 'Veneers',
    'all-on': 'All-on-4/6',
  };

  const telegramMsg = `
<b>Neue Anfrage / Новая заявка</b>

<b>Name:</b> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}
<b>Email:</b> ${escapeHtml(data.email)}
<b>Telefon:</b> ${escapeHtml(data.phone) || '—'}
<b>Service:</b> ${escapeHtml(serviceNames[data.service] || data.service) || '—'}
<b>Quelle:</b> ${escapeHtml(data.source) || 'main'}
<b>Sprache:</b> ${escapeHtml(data.language) || 'de'}
<b>Zeit:</b> ${escapeHtml(data.timestamp)}

${data.message ? `<b>Nachricht:</b>\n${escapeHtml(data.message)}` : ''}
  `.trim();

  const [tgResult, emailResult] = await Promise.all([
    sendTelegram(telegramMsg),
    sendEmail(data),
  ]);

  console.log(`Submission handled | telegram: ${tgResult ? 'ok' : 'failed'} | email: ${emailResult ? 'ok' : 'failed'}`);

  if (tgResult || emailResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({
      success: false,
      error: 'Failed to send notifications',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    telegram: !!CONFIG.telegram.botToken,
    email: !!transporter,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`MedConsult API listening on port ${PORT}`);
  console.log(`Telegram: ${CONFIG.telegram.botToken ? 'configured' : 'not configured'}`);
  console.log(`Email: ${transporter ? 'configured' : 'not configured'}`);
});

module.exports = app;
