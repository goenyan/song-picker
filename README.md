# 🎵 Song Picker

This project is a **single-file web app** that combines the Song Picker and the YouTube Playlist Extractor inside one `index.html`. It lets you import songs from a YouTube playlist, merge them into your local song library, browse them in a 3D horizontal reel, preview them with YouTube, queue them, remove them, and clear the full playlist.

## 1. Main features

### Import from YouTube Playlist
- A built-in importer section lets you paste a YouTube playlist URL or raw playlist ID plus a YouTube Data API v3 key.
- It fetches every playlist item through the `playlistItems` endpoint, including pagination through `nextPageToken`, so long playlists work correctly.
- Results show title, video ID, thumbnail preview, and thumbnail URL, with copy/export actions.
- A **Merge into Song Picker** action converts the fetched results into the `SONGS` structure and injects them directly into the local library in the same page.

### Song picker reel
- Songs render as cards inside a horizontally scrollable track.
- CSS perspective plus JavaScript-based `rotateY`, `translateZ`, `scale`, blur, and opacity calculations create a fake 3D reel effect without using canvas or WebGL.
- Native CSS `scroll-snap` keeps cards centered cleanly when scrolling or dragging.

### Random song selection
- The **Pick a Song For Me** button animates across the track and gradually slows down before landing on a random card.
- The easing comes from progressively increasing delay values instead of an animation library, which makes it a good study example in lightweight timing logic.

### YouTube preview modal with fallback
- Each card has a preview button that opens the official YouTube IFrame Player API in a modal.
- If the video cannot be embedded or the player never initializes, the modal falls back to a cover image plus a direct YouTube link.
- The player is destroyed on close so playback stops immediately.

### Queue system
- The **Submit to Queue** button adds the currently centered song to a queue list.
- Queue items show order, thumbnail, title, and artist, and can be removed one by one.
- The queue is currently in-memory only, so it resets on refresh.

### Remove a song from the library
- Each song card has a remove button that deletes that specific song from the main `SONGS` library.
- After removal, the reel is re-rendered and the updated library is saved.

### Clear the playlist
- A **Clear Playlist** button wipes the full song library after a confirmation modal.
- An empty-state message appears when no songs remain.

### Persistence
- The main `SONGS` library is saved to `localStorage` so imports, removals, and clears survive page reloads.
- This persistence applies to the song library, not the queue.

---

## 2. Technologies used

| Area | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, custom properties, 3D transforms, flexbox, keyframe animations |
| Interactivity | Vanilla JavaScript, DOM APIs, Pointer Events, `localStorage` |
| Video preview | YouTube IFrame Player API |
| Playlist import | YouTube Data API v3 |
| Fonts | Google Fonts (Space Grotesk, Inter) |

---

## 3. How to run it

1. Download `index.html`.
2. Open it in a browser.
3. Use the built-in playlist importer if you want to fetch songs from YouTube.
4. For importing, create a free YouTube Data API v3 key in Google Cloud Console and paste it into the importer.
5. No server or build tools are required, though an internet connection is needed for YouTube features.
