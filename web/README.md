# Shadow Web App

This folder is a standalone mobile web version of Shadow that can be hosted separately from the Chrome extension.

## Files
- `index.html`
- `styles.css`
- `app.js`
- `vendor/qrcode.min.js`
- `manifest.webmanifest`

## How to use on Android
Option 1: host it on any static host and open it in Chrome.
Option 2: serve it locally from a simple web server.

## Quick local server
From the repo root:

```powershell
npx serve web
```

Then open the URL on your phone or desktop browser.

## Add to Home Screen
Once hosted, open it in Chrome on Android and use `Add to Home screen`.

## Important
This is separate from the desktop extension. The extension files remain in the repo root.
