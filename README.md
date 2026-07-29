# 🎵 Song Picker

A YouTube-powered song picker with a reel, previews, and random selection — built as a static site with one optional serverless function for a shared API key.

## Features

- **Import from YouTube** — paste a playlist URL or ID and pull in every song, including pagination for long playlists.
  - Private/deleted videos are automatically skipped.
  - Duplicate songs are detected and skipped, with an "already added" flag shown before merging.
  - No personal API key required by default (see Deploy on Vercel below); a "use my own key" option is also available.
- **Reel browser** with search/filter and full keyboard navigation (arrows, Enter, Space, Esc).
- **Pick a Song For Me** — random selection with no-repeat shuffling.
- **Previews** — inline auto-preview on the centered card, plus a full-size preview modal. Auto-advances to the next song when a preview ends (toggleable).
- **Neon visual theme** with a reactive background pulse (toggleable), scaled down automatically on mobile for performance.
- **Queue** — build a separate play queue from the library, in-memory.
- **Library management** — remove individual songs or clear the whole library, saved to `localStorage`.
- **Installable app (PWA)** — add to home screen, works offline as a shell.

---

## Project structure

```
song-picker/
├── index.html
├── manifest.json
├── service-worker.js
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   └── apple-touch-icon.png
└── api/
    └── playlist.js
```

---

## Install: quick local run

1. Download the project files, keeping the folder structure above.
2. Open `index.html` in a browser.
3. To import playlists, click **"Use my own key instead"** and paste a [YouTube Data API v3 key](https://console.cloud.google.com/apis/credentials). It's saved in your browser after the first use.

---

## Deploy on Vercel (shared API key for all visitors)

1. Push this project to a GitHub repo, keeping the structure above.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo → Deploy. No build config needed.
3. In the Vercel project: **Settings → Environment Variables** → add:
   - Name: `YOUTUBE_API_KEY`
   - Value: your YouTube Data API v3 key
   - Scope: Production (and Preview, if used)
4. Redeploy.

Visitors can now import playlists without entering their own key.

**One-click deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/goenyan/song-picker)

**Recommended:** in Google Cloud Console, restrict your API key to only the YouTube Data API v3 under "API restrictions."

---

## Known limitations

- The queue resets on page refresh.
- The reactive background pulse is simulated per-song, not real-time audio analysis.
- Auto-advance needs the page served over a real origin (http/https) — it won't trigger if `index.html` is opened directly via `file://`, though playback itself still works.
- The YouTube Data API has daily quota limits; high-traffic deployments may want caching/rate-limiting added to `api/playlist.js`.
