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

1. Create a Google Spreadsheet.
2. **Extensions → Apps Script** → paste `scripts/google-apps-script-backend.js`.
3. Run **`setupSheets()`** once from the editor.
4. **Deploy → Web app** — Execute as **Me**, Access **Anyone**.
5. Copy the **`/exec`** URL.
6. Set `VITE_FORM_ENDPOINT_URL` in project root `.env` (and on Vercel/Netlify).
7. `npm run build` — writes `public/forms-endpoint.json`. Missing URL warns but deploy continues; set `FORMS_REQUIRE_ENDPOINT=1` in CI to hard-fail without a URL.
8. Submit a test form; confirm a row in the correct tab.
9. In browser console: `window.__FORM_HEALTH__` → `{ ready: true, url: "...", source: "env"|"json" }`.

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
