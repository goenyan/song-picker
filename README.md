# 🎵 Song Picker

A YouTube-powered song picker with a reel, previews, and random selection — built as a static site with one optional serverless function for a shared API key.

## Features

- **Import from YouTube** — paste a playlist URL or ID and pull in every song, including pagination for long playlists.
  - Private/deleted videos are automatically skipped.
  - Duplicate songs are detected and skipped, with an "already added" flag shown before merging.
  - No personal API key required by default (see Deploy on Vercel below); a "use my own key" option is also available.
- **Discover Playlists** — search for public YouTube playlists by genre, artist, and/or language instead of needing a playlist link already in hand.
  - **Vibe presets** — one-tap buttons (Late Night Lo-fi, Party Pop, J-Pop Energy, etc.) that fill in a search and run it instantly.
  - **More Like My Library** — builds a search from the artists already in your library, with a best-effort language guess based on your titles' script.
  - **Surprise Me** — finds a matching playlist and imports it automatically, no browsing required.
- **Reel browser** with search/filter and full keyboard navigation (arrows, Enter, Space, Esc).
- **Pick a Song For Me** — random selection with no-repeat shuffling. Spin time stays consistent no matter how big your library gets.
- **Previews** — inline auto-preview on the centered card, plus a full-size preview modal. Auto-advances to the next song when a preview ends (toggleable).
- **Now Playing mini-bar** — a persistent bottom bar showing the current song with prev/next, mute, and expand-to-modal controls, so you're never far from playback controls no matter where you've scrolled.
- **Shareable queue link** — turns your current queue into a URL you can send to someone else; opening it loads the same queue on their end. No account or backend involved.
- **Neon visual theme** with a reactive background pulse (toggleable), scaled down automatically on mobile for performance.
- **Queue** — build a separate play queue from the library, in-memory.
- **Library management** — remove individual songs or the whole library, saved to `localStorage`. The importer also supports adding just one song at a time instead of the whole fetched list.
- **Installable app (PWA)** — add to home screen, works offline as a shell.

---

## Project structure

```
song-picker/
├── index.html
├── manifest.json
├── service-worker.js
├── start-local-server.command
├── start-local-server.bat
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   └── apple-touch-icon.png
└── api/
    ├── playlist.js
    └── search-playlists.js
```

---

## Install: quick local run

1. Download the project files, keeping the folder structure above.
2. Run `start-local-server.bat` (Run `start-local-server.command` if you're using `MAC`). If you run `index.html` directly, the Youtube Embeded Player won't able to play due to 153 error.
3. To import playlists, click **"Use my own key instead"** and paste a [YouTube Data API v3 key](https://console.cloud.google.com/apis/credentials). It's saved in your browser after the first use.

---

## Deploy on Vercel (shared API key for all visitors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/goenyan/song-picker)
1. In the Vercel project: **Settings → Environment Variables** → add:
   - Name: `YOUTUBE_API_KEY`
   - Value: your YouTube Data API v3 key
   - Scope: Production (and Preview, if used)
2. Redeploy.

Visitors can now import playlists — and use Discover Playlists — without entering their own key. Both features share the same `YOUTUBE_API_KEY`, so there's nothing extra to configure.

**Recommended:** in Google Cloud Console, restrict your API key to only the YouTube Data API v3 under "API restrictions."

---

## Known limitations

- The queue resets on page refresh (unless loaded from a shared link, which repopulates it).
- Shareable queue links encode the whole queue into the URL itself — fine for normal-sized queues, but a very large one could produce an unwieldy long link.
- Discover Playlists' language/genre matching is search-based (YouTube has no true genre filter), so results are a best-effort match, not guaranteed.
- The reactive background pulse is simulated per-song, not real-time audio analysis.
- Auto-advance needs the page served over a real origin (http/https) — it won't trigger if `index.html` is opened directly via `file://`, though playback itself still works.
- The YouTube Data API has daily quota limits; high-traffic deployments may want caching/rate-limiting added to `api/playlist.js`.
