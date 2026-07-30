module.exports = async function handler(req, res) {
  const { playlistId, pageToken } = req.query;

  if (!playlistId) {
    return res.status(400).json({ error: 'Missing playlistId query parameter' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Youtube API is incorrect or missing.',
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
