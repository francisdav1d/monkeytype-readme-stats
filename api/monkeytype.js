import { fetchMonkeytypeStats } from '../src/fetcher.js';
import { generateSvg, generateErrorSvg } from '../src/svgBuilder.js';

export default async function handler(req, res) {
  const { username, theme, accent, hide, show, font, bg_color, title_color, text_color, icon_color, ring_color } = req.query;

  // Set the correct Content-Type to return an SVG image
  res.setHeader('Content-Type', 'image/svg+xml');
  
  // Enable Edge Caching (Cache for 5 mins, stale-while-revalidate for 2 mins)
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=120');

  if (!username) {
    res.status(400);
    return res.send(generateErrorSvg('Username parameter is required.'));
  }

  try {
    const stats = await fetchMonkeytypeStats(username);
    
    // Parse the hidden/show items conditionally passed in query
    const hiddenItems = hide ? hide.split(',') : [];
    const showItems = req.query.show ? req.query.show.split(',') : null;
    
    const svg = generateSvg(stats, {
      theme: theme || 'dark',
      accent: accent,
      font: font,
      bg_color: bg_color,
      title_color: title_color,
      text_color: text_color,
      icon_color: icon_color,
      ring_color: ring_color,
      hide: hiddenItems,
      show: showItems
    });
    
    res.status(200);
    return res.send(svg);
    
  } catch (error) {
    console.error('API Error:', error.message);
    
    let errorMessage = 'An error occurred while fetching stats.';
    if (error.message === 'USER_NOT_FOUND') {
      errorMessage = 'User not found.';
      res.status(404);
    } else {
      res.status(500);
    }
    
    return res.send(generateErrorSvg(errorMessage));
  }
}
