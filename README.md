# MerchGoa

Next.js site for [merchgoa.com](https://merchgoa.com) — Goa merchandise and corporate gifting.

Not WordPress. Catalogue + enquiry. Quotes before production.

## Stack

- Next.js 15 (App Router) on `127.0.0.1:3010`
- Nginx + Let’s Encrypt on this VPS
- PM2 as `www-data` (`PM2_HOME=/var/www/.pm2`)

## Local

```bash
npm install
npm run dev
```

Production: `npm run build && npm start` (binds loopback only).

Enquiries are appended to `data/enquiries.jsonl` (not in git).

## Enquiry alerts

Every enquiry is saved to `data/enquiries.jsonl` and, if configured, sent to you instantly.
Set these in the PM2 environment (e.g. `ecosystem.config.js` or `.env.local`, never in git):

| Channel | Variables |
|---|---|
| Telegram (free, to your phone) | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
| Email via [Resend](https://resend.com) | `RESEND_API_KEY`, `ALERT_EMAIL_TO` (comma-separated), optional `ALERT_EMAIL_FROM` |

Telegram setup: message `@BotFather` → `/newbot` → copy the token. Send your bot any message, then open
`https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id`. For a group with your partner, add the bot to the group.

Resend: verify the `merchgoa.com` domain first, or emails from `alerts@merchgoa.com` will be rejected.

## Before launch

All business details, prices and delivery times live in `src/lib/site.ts`. Run:

```bash
npm run check:launch
```

It fails until every `TODO` is filled, WhatsApp is set, and an alert channel is configured.
The policy pages (`/shipping`, `/refunds`, `/terms`, `/privacy`) read from the same config. Have a CA/lawyer
review them, and check the cancellation window and timelines match what Qikink actually delivers.
