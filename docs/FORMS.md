# Form → Google Sheets (static / no backend)

Browser submits directly to a **Google Apps Script Web App**. No Node, Supabase, or `/api/*` routes.

## Architecture

```
UI → validate → transform (standard JSON) → submitPipeline → POST (urlencoded payload)
  → Apps Script doPost → LockService → append row → { success, message }
```

## Folder structure

```
lib/forms/
  constants/formTypes.ts      # FORM_TYPES
  constants/sheetTabs.ts      # form_type → tab name
  registry.ts                 # FORM_REGISTRY
  googleSheetsClient.ts       # endpoint resolve + POST
  submitPipeline.ts           # honeypot → validate → transform → sanitize → POST
  createFormSubmitter.ts
  validators/<form>Validator.ts
  transformers/<form>Transformer.ts
  submitters/<form>Submitter.ts
hooks/useFormSubmission.ts
scripts/google-apps-script-backend.js
scripts/write-forms-endpoint.mjs
scripts/assert-forms-env.mjs
public/forms-endpoint.json     # generated at build
```

## Standard payload

```json
{
  "form_type": "contact",
  "sheet_tab": "Contact",
  "source_page": "/contact",
  "submitted_at": "2026-05-30T12:00:00.000Z",
  "data": { "fullName": "...", "phone": "..." },
  "metadata": {
    "page_url": "https://...",
    "path": "/contact",
    "referrer": ""
  }
}
```

POST body: `application/x-www-form-urlencoded` with field `payload` = JSON string (CORS-friendly).

## Deployment checklist

1. Create a Google Spreadsheet (e.g. “Protronics Leads”).
2. **Extensions → Apps Script** → paste **`scripts/Code.gs`** (full file).
3. Run **`setupSheets()`** once from the editor (authorize Google access).
4. Run **`setupEmailNotifications()`** once (sets alert inbox; edit email in that function first if needed).
5. Optional: run **`testEmailNotification()`** to confirm mail works.
6. **Deploy → New deployment → Web app** — Execute as **Me**, Access **Anyone**.
7. Copy the **`/exec`** URL.
8. Set in project `.env` (see `.env.example`):
   ```env
   NEXT_PUBLIC_FORM_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   NEXT_PUBLIC_FORM_ENDPOINT_URL=https://script.google.com/macros/s/XXXX/exec
   ```
9. `npm run build` — writes `public/forms-endpoint.json`. Missing URL warns but deploy continues; set `FORMS_REQUIRE_ENDPOINT=1` in CI to hard-fail without a URL.
10. Submit a test form; confirm a row in the correct tab **and** an email alert.
11. In browser console: `window.__FORM_HEALTH__` → `{ ready: true, url: "...", source: "env"|"json" }`.

## Email notifications

Email is sent by **Apps Script** (`MailApp`) after each successful sheet row — not by Next.js.

| Script property | Example | Purpose |
|-----------------|---------|---------|
| `NOTIFICATION_EMAIL` | `Protronicspro4@gmail.com` | Recipient(s); comma-separated for multiple |
| `NOTIFY_ENABLED` | `true` | Set `false` to pause alerts |
| `NOTIFY_FROM_NAME` | `Protronics Forms` | From display name |

Run `setupEmailNotifications()` to write these, or set them under **Project Settings → Script properties**.

## Add a new form (5 steps)

1. Add `form_type` in `constants/formTypes.ts` and tab in `constants/sheetTabs.ts`.
2. Add `validators/`, `transformers/`, `submitters/` modules.
3. Register in `registry.ts`.
4. Add tab + columns in Apps Script `SHEET_HEADERS`; run `setupSheets()` if needed.
5. Wire UI with `useFormSubmission({ submitter: submitYourForm })`.

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| Build fails “endpoint required” | Set `NEXT_PUBLIC_FORM_ENDPOINT_URL` on Vercel, or unset `FORMS_REQUIRE_ENDPOINT` if you opted into strict CI |
| `__FORM_HEALTH__.ready === false` | Missing env or invalid `/forms-endpoint.json`; URL must match `https://script.google.com/macros/s/.../exec` |
| CORS error | Use urlencoded `payload` (already in `googleSheetsClient.ts`); redeploy Apps Script as **Anyone** |
| Row in wrong tab | `sheet_tab` / `SHEET_TABS` mismatch between frontend and Apps Script |
| Silent success, no row | Honeypot filled (bot); or check Apps Script **Executions** log |
| Old Leads headers | Run `setupSheets()` on a new tab or align `SHEET_HEADERS` with existing row 1 |

## Local dev without Sheets

Set `FORMS_SKIP_ASSERT=1` and leave endpoint empty — submissions will fail at POST with a clear “endpoint not configured” message unless you set a real `/exec` URL.
