function calculateScore(value, sortedValues, reverse = false) {
  const idx = sortedValues.indexOf(value);
  const percentile = (idx / (sortedValues.length - 1)) * 100;
  
  let finalPercentile = percentile;
  if (reverse) {
    finalPercentile = 100 - percentile;
  }
  
  if (finalPercentile <= 20) return 1;
  if (finalPercentile <= 40) return 2;
  if (finalPercentile <= 60) return 3;
  if (finalPercentile <= 80) return 4;
  return 5;
}

export const calculateRFMScores = (data) => {
  const recencyVals = data.map(d => d.recency);
  const frequencyVals = data.map(d => d.frequency);
  const monetaryVals = data.map(d => d.monetary);
  
  const sortedRecency = [...recencyVals].sort((a, b) => a - b);
  const sortedFrequency = [...frequencyVals].sort((a, b) => a - b);
  const sortedMonetary = [...monetaryVals].sort((a, b) => a - b);
  
  const results = data.map(record => {
    return {
      ...record,
      recency_score: calculateScore(record.recency, sortedRecency, true),
      frequency_score: calculateScore(record.frequency, sortedFrequency, false),
      monetary_score: calculateScore(record.monetary, sortedMonetary, false)
    };
  });
  
  return results;
};

export const getCoordinates = (item) => ({
  x: item.frequency_score,
  y: item.monetary_score
});

export const groupByGridPosition = (data) => {
  const grid = {};
  
  data.forEach(item => {
    const { x, y } = getCoordinates(item);
    const key = `${x}-${y}`;
    
    if (!grid[key]) {
      grid[key] = [];
    }
    grid[key].push(item);
  });
  
  return grid;
};

export const filterByRFM = (data, filters) => {
  const filtered = data.filter(item => {
    const recencyOk = item.recency >= filters.recency.min && item.recency <= filters.recency.max;
    const frequencyOk = item.frequency >= filters.frequency.min && item.frequency <= filters.frequency.max;
    const monetaryOk = item.monetary >= filters.monetary.min && item.monetary <= filters.monetary.max;
    
    if (recencyOk && frequencyOk && monetaryOk) {
      return true;
    }
    return false;
  });
  return filtered;
};

