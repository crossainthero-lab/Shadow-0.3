package com.shadow.wallet;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.webkit.JavascriptInterface;

public class ShadowBridge {
    private final Context context;

    public ShadowBridge(Context context) {
        this.context = context;
    }

    @JavascriptInterface
    public void copyText(String value) {
        ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
        if (clipboard == null) {
            return;
        }
        ClipData clip = ClipData.newPlainText("Shadow", value);
        clipboard.setPrimaryClip(clip);
    }
}
