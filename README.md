# Super Ellipse — Internal Portal

Real-time studio portal backed by your Google Sheet, editable by typing plain-English
commands into the command bar.

## Sheet tabs expected
`Projects`, `Tasks`, `Invoices`, `Team`, `Timeline` — see earlier setup notes for exact columns.
`Projects.category` now supports a fourth value: `on_hold`, for stalled/unresponsive clients.

## Deploying
1. Push this folder to GitHub (upload the full folder contents, don't cherry-pick files).
2. Import into Vercel, add env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY,
   GOOGLE_SHEET_ID, ANTHROPIC_API_KEY, PORTAL_PASSWORD, SESSION_SECRET.
3. Deploy.
