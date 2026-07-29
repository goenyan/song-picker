// Song Picker — shared YouTube playlist proxy (Vercel Serverless Function)
//
// Keeps your YouTube Data API v3 key entirely server-side via a Vercel
// Environment Variable — it's never sent to or visible from the browser.
//
// ── SETUP ──────────────────────────────────────────────────────────────
// 1. Put this file at:  api/playlist.js   (relative to your project root,
//    right next to index.html). Vercel auto-detects anything under /api
//    as a serverless function — no extra config needed.
// 2. In your Vercel project: Settings → Environment Variables → Add:
//      Name:  YOUTUBE_API_KEY
//      Value: <your real YouTube Data API v3 key>
//    Add it for Production (and Preview/Development if you use those).
// 3. Redeploy. The site calls this function at /api/playlist — same
//    origin as your site, so no CORS setup is needed either.
//
// ── RECOMMENDED HARDENING (in Google Cloud Console) ─────────────────────
// Restrict the API key itself to only the "YouTube Data API v3" under
// "API restrictions" — limits the blast radius if it ever leaks some other
// way, even though this function already keeps it out of the browser.
// ─────────────────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  const { playlistId, pageToken } = req.query;

  if (!playlistId) {
    return res.status(400).json({ error: 'Missing playlistId query parameter' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Youtube API is incorrect or missing',
    });
  }

  const apiUrl =
    `https://www.googleapis.com/youtube/v3/playlistItems` +
    `?part=snippet&maxResults=50` +
    `&playlistId=${encodeURIComponent(playlistId)}` +
    `&pageToken=${encodeURIComponent(pageToken || '')}` +
    `&key=${apiKey}`;

  try {
    const upstream = await fetch(apiUrl);
    const data = await upstream.json();
    if (upstream.ok) {
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    }
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream request to YouTube failed.' });
  }
};
