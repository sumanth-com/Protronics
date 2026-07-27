# Form → Google Sheets (Next.js API proxy)

Browser submits to **`/api/forms`**. The server validates, rate-limits, sanitizes, and forwards to a **Google Apps Script Web App**. The webhook URL stays **server-only**.

## Architecture

```
UI → validate → transform → submitPipeline → POST /api/forms
  → server validate + rate limit + sanitize
  → Apps Script doPost → LockService → append row → { success, message }
```

## Folder structure

```
app/api/forms/route.ts          # same-origin proxy
lib/forms/
  forwardToAppsScript.ts        # server → Apps Script
  serverValidate.ts             # required fields / phone / email
  rateLimit.ts
  googleSheetsClient.ts         # browser → /api/forms
  submitPipeline.ts
  ...
scripts/Code.gs                 # paste into Apps Script
```

## Environment

| Variable | Where | Purpose |
|----------|--------|---------|
| `FORM_ENDPOINT_URL` | Server / Vercel | Apps Script `/exec` URL (**required**) |
| `FORM_WEBHOOK_SECRET` | Server + Apps Script property | Optional shared secret |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Server | Legacy alias for endpoint |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Deprecated | Still accepted server-side for migration — do not expose new webhooks this way |

`public/forms-endpoint.json` is rewritten at build with `url: null` (never ships the webhook).

## Standard payload

```json
{
  "form_type": "contact",
  "sheet_tab": "Contact",
  "source_page": "/contact",
  "submitted_at": "2026-05-30T12:00:00.000Z",
  "data": { "fullName": "...", "phone": "..." },
  "metadata": { "page_url": "https://...", "path": "/contact", "referrer": "" }
}
```

| form_type | Sheet tab |
|-----------|-----------|
| `contact` | Contact |
| `product-lead` | Leads |
| `trade-in` | TradeIn |

## Deployment checklist

1. Create a Google Spreadsheet.
2. **Extensions → Apps Script** → paste **`scripts/Code.gs`**.
3. Run **`setupSheets()`** once.
4. Set **NOTIFICATION_EMAIL** (and optionally **FORM_WEBHOOK_SECRET**) in Script properties; run **`setupEmailNotifications()`**.
5. **Deploy → New deployment → Web app** — Execute as **Me**, Access **Anyone**.
6. Set **`FORM_ENDPOINT_URL`** (and matching **`FORM_WEBHOOK_SECRET`**) in `.env` / Vercel.
7. Redeploy any previously public `/exec` URLs that were committed historically.
8. Submit a test form; confirm the matching tab gets a row.

## Protections

- Server validation + sanitization (HTML / formula injection)
- In-memory rate limit on `/api/forms`
- Honeypot on Contact, Trade-In, and lead/callback modals
- Idempotency key (client UUID; Apps Script cache ~10 min)
- Append-only sheet writes (headers rewritten only when mismatched)

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| `ready: false` from `GET /api/forms` | Set `FORM_ENDPOINT_URL` on the server and restart |
| 429 Too many submissions | Wait ~10 minutes or lower traffic |
| Unauthorized from Apps Script | Match `FORM_WEBHOOK_SECRET` on both sides |
| Build warning about endpoint | Set `FORM_ENDPOINT_URL`, or `FORMS_SKIP_ASSERT=1` locally |
