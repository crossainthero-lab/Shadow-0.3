# Shadow Android

This Android app wraps the existing Shadow wallet UI in a fullscreen WebView so the extension and mobile app can share the same frontend.

## What is included
- Android app project in `android/`
- Shared wallet frontend copied into `android/app/src/main/assets/`
- Clipboard bridge for the local-file WebView environment
- Internet permission so live CoinGecko pricing still works

## Keep assets in sync
Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\android\scripts\sync-assets.ps1
```

This copies:
- `popup.html`
- `popup.css`
- `popup.js`
- `vendor/qrcode.min.js`

into the Android assets folder.

## Build the APK
Open the `android/` folder in Android Studio and use:
- `Build` -> `Build Bundle(s) / APK(s)` -> `Build APK(s)`

The app entry point loads:
- `file:///android_asset/popup.html`

## Notes
- The desktop extension stays unchanged.
- Android uses `localStorage` automatically because `chrome.storage` is not available there.
- Price sync from the local asset page is enabled by allowing universal access from file URLs in the WebView settings.
