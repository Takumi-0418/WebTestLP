export default async function handler(req, res) {
  const serviceId = process.env.MICROCMS_SERVICE_ID;
  const apiKey    = process.env.MICROCMS_API_KEY;

  if (!serviceId || !apiKey) {
    return res.status(500).json({
      error: 'Missing environment variables',
      missing: { serviceId: !serviceId, apiKey: !apiKey }
    });
  }

  const limit  = parseInt(req.query.limit  ?? '5',  10);
  const offset = parseInt(req.query.offset ?? '0', 10);
  const endpoint = `https://${serviceId}.microcms.io/api/v1/news?limit=${limit}&offset=${offset}&orders=-publishedAt`;

  try {
    const response = await fetch(endpoint, {
      headers: { 'X-MICROCMS-API-KEY': apiKey }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
