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
