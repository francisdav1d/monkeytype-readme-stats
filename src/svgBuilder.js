export const generateSvg = (stats, options) => {
  const { username, bestWpm, averageWpm, accuracy, testsCompleted } = stats;
  const { theme, accent, hide } = options;

  const isLight = theme === 'light';
  const accentColor = accent ? `#${accent}` : null;
  
  const colors = {
    bg: isLight ? '#ffffff' : '#0d1117',
    border: isLight ? '#e1e4e8' : '#30363D',
    title: isLight ? '#24292f' : '#c9d1d9',
    username: accentColor || (isLight ? '#0969da' : '#58a6ff'),
    text: isLight ? '#57606a' : '#8b949e',
    value: isLight ? '#24292f' : '#c9d1d9',
    progressBg: isLight ? '#e1e4e8' : '#21262d',
    gradientStart: accentColor || (isLight ? '#0969da' : '#58a6ff'),
    gradientEnd: accentColor || (isLight ? '#8250df' : '#bc8cff')
  };

  // Rank logic based on Best WPM
  let rank = 'BEGINNER';
  let rankColor = '#8b949e';
  let maxWpm = 60;
  
  if (bestWpm >= 140) { 
    rank = 'GOD'; 
    rankColor = '#d29922'; 
    maxWpm = 200; 
  } else if (bestWpm >= 100) { 
    rank = 'PRO'; 
    rankColor = '#bf3989'; 
    maxWpm = 150; 
  } else if (bestWpm >= 60) { 
    rank = 'INTERMEDIATE'; 
    rankColor = '#3fb950'; 
    maxWpm = 100; 
  }
  
  const progressPercent = Math.min((bestWpm / maxWpm) * 100, 100);

  // Parse hide options
  const showUsername = !hide.includes('username');
  const showWpm = !hide.includes('wpm');
  const showAcc = !hide.includes('accuracy');
  const showTests = !hide.includes('tests');

  return `
    <svg width="450" height="230" viewBox="0 0 450 230" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <style>
          .bg { fill: ${colors.bg}; stroke: ${colors.border}; stroke-width: 1px; rx: 10px; }
          .title { fill: ${colors.title}; font-family: 'Segoe UI', Ubuntu, sans-serif; font-weight: bold; font-size: 18px; }
          .username { fill: ${colors.username}; font-family: 'Segoe UI', Ubuntu, sans-serif; font-weight: bold; font-size: 20px; }
          .stat-label { fill: ${colors.text}; font-family: 'Segoe UI', Ubuntu, sans-serif; font-size: 13px; }
          .stat-value { fill: ${colors.value}; font-family: 'Segoe UI', Ubuntu, sans-serif; font-weight: bold; font-size: 16px; }
          .rank-bg { fill: ${colors.border}; rx: 4px; }
          .rank-text { fill: ${rankColor}; font-family: 'Segoe UI', Ubuntu, sans-serif; font-weight: bold; font-size: 12px; }
          .progress-bg { fill: ${colors.progressBg}; rx: 5px; }
          .progress-bar { fill: url(#gradient); rx: 5px; }
          
          @keyframes glow {
            0% { filter: drop-shadow(0 0 2px ${colors.gradientStart}80); }
            50% { filter: drop-shadow(0 0 8px ${colors.gradientStart}80); }
            100% { filter: drop-shadow(0 0 2px ${colors.gradientStart}80); }
          }
          .animated-bar { animation: glow 2s ease-in-out infinite; }
        </style>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${colors.gradientStart}" />
          <stop offset="100%" stop-color="${colors.gradientEnd}" />
        </linearGradient>
      </defs>
      
      <rect x="0" y="0" width="450" height="230" class="bg" />
      <text x="30" y="35" class="title">Monkeytype Stats</text>
      
      ${showUsername ? `
      <text x="30" y="70" class="username">@${username}</text>
      <rect x="340" y="52" width="80" height="22" class="rank-bg" />
      <text x="380" y="67" class="rank-text" text-anchor="middle">${rank}</text>
      ` : ''}
      
      <!-- Stats Grid -->
      ${showWpm ? `
      <text x="30" y="110" class="stat-label">Best WPM</text>
      <text x="30" y="130" class="stat-value">${bestWpm}</text>
      
      <text x="130" y="110" class="stat-label">Avg WPM</text>
      <text x="130" y="130" class="stat-value">${averageWpm}</text>
      ` : ''}
      
      ${showAcc ? `
      <text x="230" y="110" class="stat-label">Accuracy</text>
      <text x="230" y="130" class="stat-value">${accuracy}%</text>
      ` : ''}
      
      ${showTests ? `
      <text x="330" y="110" class="stat-label">Total Tests</text>
      <text x="330" y="130" class="stat-value">${testsCompleted}</text>
      ` : ''}
      
      <!-- Progress Bar -->
      <text x="30" y="170" class="stat-label">WPM Progress to Next Tier (${maxWpm} WPM)</text>
      <rect x="30" y="180" width="390" height="12" class="progress-bg" />
      <rect x="30" y="180" width="${3.90 * progressPercent}" height="12" class="progress-bar animated-bar" />
    </svg>
  `.trim();
};

export const generateErrorSvg = (message) => {
  return `
    <svg width="450" height="120" viewBox="0 0 450 120" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <style>
          .bg { fill: #0d1117; stroke: #ff7b72; stroke-width: 1px; rx: 10px; }
          .title { fill: #c9d1d9; font-family: 'Segoe UI', Ubuntu, sans-serif; font-weight: bold; font-size: 18px; }
          .error-text { fill: #ff7b72; font-family: 'Segoe UI', Ubuntu, sans-serif; font-weight: bold; font-size: 16px; }
        </style>
      </defs>
      
      <rect x="0" y="0" width="450" height="120" class="bg" />
      <text x="30" y="35" class="title">Monkeytype Stats Error</text>
      <text x="30" y="80" class="error-text">${message}</text>
    </svg>
  `.trim();
};

