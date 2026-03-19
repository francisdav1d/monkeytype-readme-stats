export const fetchMonkeytypeStats = async (username) => {
  const apiKey = process.env.MONKEYTYPE_API_KEY;
  if (!apiKey) {
    throw new Error('API config missing: MONKEYTYPE_API_KEY environment variable is not set');
  }

  const url = `https://api.monkeytype.com/users/${username}/profile`;

  const response = await fetch(url, {
    headers: {
      'Authorization': apiKey.startsWith('Bearer') ? apiKey : `ApeKey ${apiKey}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 404 || response.status === 400 || response.status === 422) {
      throw new Error('USER_NOT_FOUND');
    }
    throw new Error(`API_ERROR: HTTP ${response.status}`);
  }

  const result = await response.json();
  const data = result.data;

  // Safely extract personal bests
  const pbTime = data.personalBests?.time || {};
  const getPb = (mode) => pbTime[mode] && pbTime[mode].length > 0 ? pbTime[mode][0] : null;
  
  const pb15 = getPb(15);
  const pb30 = getPb(30);
  const pb60 = getPb(60);
  const pb120 = getPb(120);

  // Extract all-time leaderboard rankings (stored by language, 'english' is default)
  const lbsTime = data.allTimeLbs?.time || {};
  const getRankData = (mode) => {
    if (lbsTime[mode]?.english?.rank) return lbsTime[mode].english;
    const langs = Object.keys(lbsTime[mode] || {});
    return langs.length > 0 ? lbsTime[mode][langs[0]] : null;
  };

  // Highest achieved WPM out of primary categories for tier ring calculation
  const bestWpm = Math.max(pb15?.wpm || 0, pb30?.wpm || 0, pb60?.wpm || 0, pb120?.wpm || 0);

  const rank15Data = getRankData(15);
  const rank60Data = getRankData(60);

  return {
    username: data.name || username,
    bestWpm: Math.round(bestWpm),
    wpm15: pb15 ? Math.round(pb15.wpm) : 0,
    wpm30: pb30 ? Math.round(pb30.wpm) : 0,
    wpm60: pb60 ? Math.round(pb60.wpm) : 0,
    wpm120: pb120 ? Math.round(pb120.wpm) : 0,
    rank15: rank15Data?.rank || null,
    rank15Count: rank15Data?.count || null,
    rank60: rank60Data?.rank || null,
    rank60Count: rank60Data?.count || null,
    testsCompleted: data.typingStats?.completedTests || 0,
  };
};
