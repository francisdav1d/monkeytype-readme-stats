export const generateSvg = (stats, options) => {
  const { username, bestWpm, wpm15, wpm30, wpm60, wpm120, rank15, rank15Count, rank60, rank60Count, testsCompleted } = stats;
  const { theme, accent, hide, show, font, bg_color, title_color, text_color, icon_color, ring_color } = options;

  const isLight = theme === 'light';
  const customAccent = accent ? `#${accent}` : null;
  
  // Authentic Monkeytype Theme Colors (Serika Dark / Light)
  const colors = {
    bg: bg_color ? `#${bg_color}` : (isLight ? '#e3e5e3' : '#323437'),
    border: isLight ? '#d4d6d4' : '#2b2d30',
    title: title_color ? `#${title_color}` : (customAccent || (isLight ? '#5e6a86' : '#e2b714')),
    icon: icon_color ? `#${icon_color}` : (customAccent || (isLight ? '#5e6a86' : '#e2b714')),
    label: isLight ? '#7b8496' : '#646669',
    value: text_color ? `#${text_color}` : (isLight ? '#323437' : '#d1d0c5'),
    ringBg: isLight ? '#d4d6d4' : '#2b2d30',
    ringProg: ring_color ? `#${ring_color}` : (customAccent || (isLight ? '#5e6a86' : '#e2b714')),
    circleText: text_color ? `#${text_color}` : (isLight ? '#323437' : '#d1d0c5')
  };

  const fontFamily = font ? `"${font}", 'Segoe UI', Ubuntu, sans-serif` : "'Segoe UI', Ubuntu, sans-serif";

  const clockIcon = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />';
  const hashIcon = '<path d="M16 4h-2l-1 4H9l1-4H8l-1 4H3v2h3.5l-1.5 6H2v2h3l-1 4h2l1-4h4l-1 4h2l1-4h4v-2h-3.5l1.5-6H19V8h-3l1-4zM12 14H8l1.5-6h4L12 14z" />';
  const checkIcon = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />';
  
  // Available stats to select from
  let activeStats = [
    { id: 'wpm15', label: '15s WPM:', value: wpm15 || '-', icon: clockIcon },
    { id: 'wpm30', label: '30s WPM:', value: wpm30 || '-', icon: clockIcon },
    { id: 'wpm60', label: '60s WPM:', value: wpm60 || '-', icon: clockIcon },
    { id: 'wpm120', label: '120s WPM:', value: wpm120 || '-', icon: clockIcon },
    { id: 'rank15', label: '15s Leaderboard:', value: rank15 ? `#${rank15.toLocaleString()}` : 'Unranked', icon: hashIcon },
    { id: 'rank60', label: '60s Leaderboard:', value: rank60 ? `#${rank60.toLocaleString()}` : 'Unranked', icon: hashIcon },
    { id: 'tests', label: 'Tests Completed:', value: testsCompleted.toLocaleString(), icon: checkIcon }
  ];

  // Apply user query parameter filters
  if (show && show.length > 0) {
    activeStats = activeStats.filter(s => show.includes(s.id));
  } else if (hide && hide.length > 0) {
    activeStats = activeStats.filter(s => !hide.includes(s.id));
  }

  // Generate SVG list items
  const statRows = activeStats.map((stat, i) => `
    <g transform="translate(0, ${i * 26})">
      <svg x="0" y="0" width="16" height="16" viewBox="0 0 24 24" fill="${colors.icon}">
        ${stat.icon}
      </svg>
      <text x="25" y="12.5" class="stat-label" dominant-baseline="middle">${stat.label}</text>
      <text x="180" y="12.5" class="stat-value" dominant-baseline="middle">${stat.value}</text>
    </g>
  `).join('');

  const cx = 390;
  const cy = Math.max(70, (activeStats.length * 26) / 2 + 10);
  const r = 40;
  const circ = 2 * Math.PI * r;
  
  // Calculate World Percentile for top ring (Average of 15s and 60s if available)
  let percentileStr = 'Unranked';
  let progFill = 0;
  
  let validPercentiles = [];
  if (rank15 && rank15Count) {
    validPercentiles.push((rank15 / rank15Count) * 100);
  }
  if (rank60 && rank60Count) {
    validPercentiles.push((rank60 / rank60Count) * 100);
  }
  
  if (validPercentiles.length > 0) {
    const rawPercentile = validPercentiles.reduce((sum, val) => sum + val, 0) / validPercentiles.length;
    
    if (rawPercentile < 0.01) percentileStr = '0.01%';
    else if (rawPercentile < 1) percentileStr = rawPercentile.toFixed(2) + '%';
    else percentileStr = rawPercentile.toFixed(1) + '%';
    
    progFill = Math.max(0, Math.min(1, (100 - rawPercentile) / 100)); // The lower the percentile, the fuller the bar
  } else {
    // Fallback if no rank data is available
    percentileStr = 'Unranked';
    progFill = 0;
  }
  
  const prog = progFill * circ;
  const offset = circ - prog;

  // Dynamic height adaptation for card based on row count
  const totalHeight = Math.max(160, 55 + activeStats.length * 26 + 15);

  return `
    <svg width="495" height="${totalHeight}" viewBox="0 0 495 ${totalHeight}" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <style>
          .bg { fill: ${colors.bg}; stroke: ${colors.border}; stroke-width: 1px; rx: 10px; }
          .title { fill: ${colors.title}; font-family: ${fontFamily}; font-weight: bold; font-size: 18px; }
          .stat-label { fill: ${colors.label}; font-family: ${fontFamily}; font-weight: 500; font-size: 14px; }
          .stat-value { fill: ${colors.value}; font-family: ${fontFamily}; font-weight: bold; font-size: 14px; }
          .rank-circle-bg { stroke: ${colors.ringBg}; }
          .rank-circle { stroke: ${colors.ringProg}; stroke-dasharray: ${circ}; stroke-dashoffset: ${circ}; animation: fillAnimation 1s ease-out forwards; }
          .circle-title { fill: ${colors.circleText}; font-family: ${fontFamily}; font-weight: bold; font-size: 14px; }
          .circle-subtitle { fill: ${colors.label}; font-family: ${fontFamily}; font-weight: bold; font-size: 12px; }
          @keyframes fillAnimation { to { stroke-dashoffset: ${offset}; } }
        </style>
      </defs>
      
      <rect x="0" y="0" width="495" height="${totalHeight}" class="bg" />
      <text x="30" y="35" class="title">${username}'s Monkeytype Stats</text>
      
      <g transform="translate(30, 55)">
        ${statRows}
      </g>
      
      <g transform="translate(0, 5)">
        <circle class="rank-circle-bg" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke-width="6" />
        <circle class="rank-circle" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke-width="6" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})" />
        <text x="${cx}" y="${cy}" class="circle-title" text-anchor="middle" dominant-baseline="middle">${percentileStr}</text>
        <text x="${cx}" y="${cy - 14}" class="circle-subtitle" text-anchor="middle" dominant-baseline="middle">Top</text>
      </g>
    </svg>
  `.trim();
};

export const generateErrorSvg = (message) => {
  return `
    <svg width="495" height="120" viewBox="0 0 495 120" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <style>
          .bg { fill: #0d1117; stroke: #ff7b72; stroke-width: 1px; rx: 10px; }
          .title { fill: #c9d1d9; font-family: 'Segoe UI', Ubuntu, sans-serif; font-weight: bold; font-size: 18px; }
          .error-text { fill: #ff7b72; font-family: 'Segoe UI', Ubuntu, sans-serif; font-weight: bold; font-size: 16px; }
        </style>
      </defs>
      <rect x="0" y="0" width="495" height="120" class="bg" />
      <text x="30" y="35" class="title">Monkeytype Stats Error</text>
      <text x="30" y="80" class="error-text">${message}</text>
    </svg>
  `.trim();
};
