module.exports = async function handler(req, res) {
  const { q, relevanceLanguage, regionCode } = req.query;

  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Missing q (search query) parameter' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Youtube API is incorrect or missing',
    });
  }

  const params = new URLSearchParams({
    part: 'snippet',
    type: 'playlist',
    maxResults: '12',
    q: q,
    key: apiKey,
  });
  if (relevanceLanguage) params.set('relevanceLanguage', relevanceLanguage);
  if (regionCode) params.set('regionCode', regionCode);

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;

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
