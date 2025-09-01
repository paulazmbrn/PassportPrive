// Netlify Function: Fetch recent Instagram media via Basic Display API
// Set env vars in Netlify: INSTAGRAM_USER_ID, INSTAGRAM_ACCESS_TOKEN
// Optional: INSTAGRAM_CACHE_SECONDS (default 900 = 15 min)

exports.handler = async (event) => {
  const corsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, OPTIONS',
    'access-control-allow-headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders };
  }
  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const cacheSeconds = parseInt(process.env.INSTAGRAM_CACHE_SECONDS || '900', 10);

  if (!userId || !accessToken) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ error: 'Missing INSTAGRAM_USER_ID or INSTAGRAM_ACCESS_TOKEN' })
    };
  }

  const url = new URL(`https://graph.instagram.com/${encodeURIComponent(userId)}/media`);
  // fields: include thumbnail_url for videos
  url.searchParams.set('fields', 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp');
  url.searchParams.set('access_token', accessToken);

  const limit = Math.min(parseInt((event.queryStringParameters && event.queryStringParameters.limit) || '12', 10) || 12, 25);
  url.searchParams.set('limit', String(Math.max(1, limit)));

  try {
    // Node 18+ global fetch available on Netlify
    const igResp = await fetch(url.toString(), { method: 'GET' });
    if (!igResp.ok) {
      const text = await igResp.text();
      return {
        statusCode: igResp.status,
        headers: { 'content-type': 'application/json', ...corsHeaders },
        body: JSON.stringify({ error: 'Instagram API error', status: igResp.status, details: text })
      };
    }

    const data = await igResp.json();
    const items = Array.isArray(data.data)
      ? data.data
          .filter(Boolean)
          .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
          .slice(0, limit)
      : [];

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': `public, max-age=${cacheSeconds}`,
        ...corsHeaders
      },
      body: JSON.stringify({ data: items })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json', ...corsHeaders },
      body: JSON.stringify({ error: 'Unexpected error', message: String(e) })
    };
  }
};
