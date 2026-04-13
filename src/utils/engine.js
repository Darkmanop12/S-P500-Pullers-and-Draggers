/**
 * Pullers & Draggers Calculation Engine
 * 
 * Core formula: Impact (bps) = (Stock Weight %) × (% Price Change) × 100
 * 
 * To plug in real data:
 *   Replace generateSimulatedData() with a function that fetches from
 *   Polygon.io WebSocket, IEX Cloud, or Alpha Vantage and returns
 *   the same shape: { ticker, name, weight, sector, pctChange }
 */

/**
 * Generate simulated price changes for demo/development.
 * @param {Array} stocks - Array of stock objects with weight, ticker, etc.
 * @param {number} volatility - Multiplier for price change magnitude (1.0 = normal)
 * @returns {Array} Stocks enriched with pctChange, contribution, contributionBps, volumeSpike
 */
export function generateSimulatedData(stocks, volatility = 1.0) {
  return stocks.map((stock) => {
    // Slightly bullish bias (0.48 instead of 0.5) to mimic real market drift
    const base = (Math.random() - 0.48) * 3.2 * volatility;
    const skew = Math.random() > 0.7 ? (Math.random() - 0.5) * 2.5 : 0;
    const pctChange = +(base + skew).toFixed(2);

    return enrichWithContribution(stock, pctChange);
  });
}

/**
 * Enrich a stock with contribution metrics given a % change.
 * This is the function you'd call with real price data.
 */
export function enrichWithContribution(stock, pctChange) {
  const contribution = +((stock.weight * pctChange) / 100).toFixed(4);
  const contributionBps = +(contribution * 10000).toFixed(2);
  const volumeSpike = Math.random() > 0.75; // Replace with real volume comparison

  return {
    ...stock,
    pctChange,
    contribution,
    contributionBps,
    volumeSpike,
  };
}

/**
 * Rank stocks into pullers (positive impact) and draggers (negative impact).
 * @param {Array} stocks - Enriched stock array
 * @returns {{ pullers: Array, draggers: Array }}
 */
export function rankStocks(stocks) {
  const sorted = [...stocks].sort((a, b) => b.contributionBps - a.contributionBps);
  const pullers = sorted.filter((s) => s.contributionBps > 0).slice(0, 10);
  const draggers = sorted
    .filter((s) => s.contributionBps < 0)
    .sort((a, b) => a.contributionBps - b.contributionBps)
    .slice(0, 10);

  return { pullers, draggers };
}

/**
 * Calculate index-level aggregates.
 */
export function calculateIndexMetrics(stocks) {
  const totalMove = stocks.reduce((sum, s) => sum + s.contributionBps, 0);

  const top10ByAbsImpact = [...stocks]
    .sort((a, b) => Math.abs(b.contributionBps) - Math.abs(a.contributionBps))
    .slice(0, 10);

  const top10Contribution = top10ByAbsImpact.reduce((sum, s) => sum + s.contributionBps, 0);
  const restContribution = totalMove - top10Contribution;

  const advancing = stocks.filter((s) => s.pctChange > 0).length;
  const declining = stocks.filter((s) => s.pctChange < 0).length;

  return {
    totalMove,
    top10Contribution,
    restContribution,
    breadth: { adv: advancing, dec: declining },
    indexPct: totalMove / 100,
  };
}

/**
 * Aggregate contributions by sector.
 */
export function aggregateBySector(stocks) {
  const sectorMap = {};

  stocks.forEach((s) => {
    if (!sectorMap[s.sector]) {
      sectorMap[s.sector] = { contribution: 0, count: 0, weight: 0 };
    }
    sectorMap[s.sector].contribution += s.contributionBps;
    sectorMap[s.sector].count++;
    sectorMap[s.sector].weight += s.weight;
  });

  return Object.entries(sectorMap)
    .map(([name, data]) => ({
      name,
      contribution: +data.contribution.toFixed(1),
      count: data.count,
      weight: +data.weight.toFixed(2),
    }))
    .sort((a, b) => b.contribution - a.contribution);
}

/**
 * Volatility multipliers per timeframe.
 */
export const VOLATILITY_MAP = {
  "1m": 1.0,
  "5m": 1.4,
  "15m": 1.8,
  "1D": 2.5,
};

/**
 * Refresh intervals per timeframe (ms).
 */
export const REFRESH_MAP = {
  "1m": 4000,
  "5m": 8000,
  "15m": 12000,
  "1D": 20000,
};
