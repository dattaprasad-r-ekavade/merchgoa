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

Products, settings, enquiries and uploaded photos live in `data/` (not in git). Back it up.

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

## Admin (`/admin`)

Manage products (prices, photos, SEO, hide/reorder), contact and business details, delivery promises, the
announcement bar, and the enquiry pipeline (new → contacted → quoted → won/lost, notes, CSV export).
The dashboard shows a launch checklist.

Admin is off until both env vars are set, then restart:

```bash
ADMIN_PASSWORD='a long passphrase'
ADMIN_SECRET="$(openssl rand -hex 32)"   # signs sessions; change it to sign everyone out
```

Login is throttled (5 failures per IP per 15 min), sessions last 12 hours, and `/admin` is `noindex`.

**Run a single process** (PM2 fork mode, not cluster): writes to `data/` are serialised in-process.

### Data

| File | Contents |
|---|---|
| `data/products.json` | Products. Created on first save; until then the seed list in `src/lib/site.ts` is used. |
| `data/settings.json` | Phone, WhatsApp, address, GSTIN, delivery times, announcement, Search Console code. |
| `data/enquiries.json` | Enquiries with status and notes. An old `enquiries.jsonl` is imported automatically. |
| `data/uploads/` | Product photos uploaded in admin (re-encoded to WebP, EXIF stripped). |

Back up `data/` daily, e.g. cron: `tar czf ~/backups/merchgoa-$(date +%F).tgz -C /var/www/merchgoa.com data`.

## SEO

- Per-page titles, descriptions and canonicals; product SEO title/description editable in admin.
- JSON-LD: Organization/Store + WebSite (all pages), Product + Offer + BreadcrumbList (products),
  ItemList (shop), FAQPage (business gifting).
- `sitemap.xml` (with images, hidden products excluded), `robots.txt` (blocks `/admin`, `/api`), web manifest, icons.
- After launch: add the site in Google Search Console, paste the verification tag in admin Settings,
  and submit `https://merchgoa.com/sitemap.xml`. Create a Google Business Profile for local search.

Have a CA/lawyer review the policy pages, and check that the cancellation window and delivery times match what
Qikink actually delivers.
