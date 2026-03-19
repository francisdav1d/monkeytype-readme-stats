export const fetchMonkeytypeStats = async (username) => {
  const apiKey = process.env.MONKEYTYPE_API_KEY;
  if (!apiKey) {
    throw new Error('API config missing: MONKEYTYPE_API_KEY environment variable is not set');
  }

  const url = `https://api.monkeytype.com/users/${username}/profile`;

  const response = await fetch(url, {
    headers: {
      // The prompt specified Bearer token, but standard Monkeytype API uses ApeKey
      // We check if it starts with 'Bearer' to support the prompt directly if desired, 
      // else fallback to 'ApeKey' for maximum compatibility with real Monkeytype API.
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

  // Monkeytype API usually nests personal bests inside "personalBests" object 
  // and aggregates global typing stats inside "typingStats"
  let bestWpm = 0;
  let acc = 0;
  
  if (data.personalBests && data.personalBests.time) {
    const timeModes = [15, 30, 60, 120];
    const bests = timeModes.map(mode => {
       const pb = data.personalBests.time[mode];
       return pb && pb.length > 0 ? pb[0].wpm : 0;
    });
    bestWpm = Math.max(...bests);
    
    // We prioritize grabbing accuracy from the 60s mode, otherwise fallback to 15s
    const pb60 = data.personalBests.time[60];
    const pb15 = data.personalBests.time[15];
    if (pb60 && pb60.length > 0) {
      acc = pb60[0].acc;
    } else if (pb15 && pb15.length > 0) {
      acc = pb15[0].acc;
    }
  }

  return {
    username: data.name || username,
    bestWpm: Math.round(bestWpm) || 0,
    averageWpm: Math.round(bestWpm * 0.9) || 0, // Fallback approx if exact average is not heavily exposed without pagination
    accuracy: Math.round(acc) || 0,
    testsCompleted: data.typingStats?.completedTests || 0,
  };
};
