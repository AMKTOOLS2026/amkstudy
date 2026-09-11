# Getting AMKSTUDY onto your home screen — phone only, no PC

You don't need Android Studio for this. A real Android Studio build (the
Capacitor project I made earlier) genuinely does need a computer — there's
no way around that one. But there's a route that gets you almost everything
that matters — a proper full-screen app icon, works-offline, and more
reliable notifications — using only your phone's browser.

The short version: put these 6 files on a free static host, then
"Install app" from Chrome. Two ways to host, pick one.

---

## Option A — Netlify Drop (fastest, no account needed)

1. On your phone, open **Chrome** and go to: `app.netlify.com/drop`
2. You'll see a big drop area. Tap it — it opens your file picker.
3. Select **all 6 files** in this folder at once (`index.html`,
   `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`,
   `icon-512-maskable.png`). If your file picker won't multi-select, zip
   them first with any "Compress/Zip" option in your Files app and upload
   the zip instead — Netlify Drop accepts both.
4. Netlify uploads and gives you a live link like
   `https://random-name-123.netlify.app`. That's your app's address now.
5. Open that link in Chrome.

## Option B — GitHub Pages (free account, permanent link you control)

1. Go to `github.com` in Chrome, sign up / log in.
2. Tap **+** → **New repository**. Name it `amkstudy`, make it Public, create it.
3. Inside the repo, tap **Add file → Upload files**, and upload all 6 files
   from this folder.
4. Go to the repo's **Settings → Pages**. Under "Build and deployment",
   set Source to **Deploy from a branch**, branch `main`, folder `/root`. Save.
5. Wait ~1 minute, then your app is live at:
   `https://YOUR-USERNAME.github.io/amkstudy/index.html`

---

## Install it as a real app icon

1. Open your hosted link in **Chrome**.
2. Tap the **⋮** menu → **Add to Home screen** (or **Install app** if Chrome
   offers it directly).
3. Confirm. You now have an AMKSTUDY icon on your home screen that opens
   full-screen, no browser bar — this is a real installed web app (WebAPK),
   not just a bookmark.
4. Open it once from the home screen and allow the notification permission
   prompt when it appears, so revision alerts can actually fire.

That's it — same dashboard, timer, and 1-4-7 queue as before, now installed
properly with offline caching (the `sw.js` file) instead of running from a
raw file.

---

## If you later want an actual installable .apk file (still phone-only)

Once your app is hosted (Option A or B above), you can turn it into a real
`.apk` entirely from your phone browser, no Android Studio:

1. Go to `pwabuilder.com` in Chrome.
2. Paste your hosted URL (from Option A or B) and tap **Start**.
3. PWABuilder scores your app and shows a **Package for stores** button →
   choose **Android**.
4. It builds the `.apk` on their servers and gives you a download link —
   download it, open it from your Files/Downloads app, and Android will
   prompt to install (you'll need to allow "install unknown apps" for
   Chrome/Files the first time — Android asks automatically).

This is the closest you'll get to the Android Studio result without a PC.
Background alarm reliability will still depend on Samsung's battery
optimizer — after installing, go to **Settings → Apps → AMKSTUDY → Battery**
and set it to "Unrestricted" so Day 1/4/7 reminders aren't killed in the
background.

---

## Updating the app later

Whenever I (or you) change the app, re-upload the changed files to whichever
host you picked (Netlify: drag a new drop; GitHub: upload files again to the
same repo) — the same link stays live and Chrome updates the installed app
automatically within a day, or immediately if you close and reopen it twice.
