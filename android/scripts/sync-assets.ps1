# Keep the Android WebView assets aligned with the extension UI.

$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $root 'app\src\main\assets'
$vendor = Join-Path $assets 'vendor'

New-Item -ItemType Directory -Force -Path $assets, $vendor | Out-Null

Copy-Item (Join-Path $root '..\popup.html') (Join-Path $assets 'popup.html') -Force
Copy-Item (Join-Path $root '..\popup.css') (Join-Path $assets 'popup.css') -Force
Copy-Item (Join-Path $root '..\popup.js') (Join-Path $assets 'popup.js') -Force
Copy-Item (Join-Path $root '..\vendor\qrcode.min.js') (Join-Path $vendor 'qrcode.min.js') -Force

Write-Host 'Android assets synced.'
