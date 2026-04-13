import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SP500_STOCKS } from './data/sp500';
import {
  generateSimulatedData,
  rankStocks,
  calculateIndexMetrics,
  aggregateBySector,
  VOLATILITY_MAP,
  REFRESH_MAP,
} from './utils/engine';
import TopBar from './components/TopBar';
import StockTable from './components/StockTable';
import SectorBreakdown from './components/SectorBreakdown';
import ContributionBreakdown from './components/ContributionBreakdown';
import LiveIndicator from './components/LiveIndicator';

export default function App() {
  const [stocks, setStocks] = useState([]);
  const [timeframe, setTimeframe] = useState("1m");
  const [lastUpdate, setLastUpdate] = useState("");
  const intervalRef = useRef(null);

  const refresh = useCallback(() => {
    const data = generateSimulatedData(SP500_STOCKS, VOLATILITY_MAP[timeframe] || 1);
    setStocks(data);
    setLastUpdate(new Date().toLocaleTimeString("en-US", { hour12: false }));
  }, [timeframe]);

  useEffect(() => {
    refresh();
    intervalRef.current = setInterval(refresh, REFRESH_MAP[timeframe] || 4000);
    return () => clearInterval(intervalRef.current);
  }, [refresh, timeframe]);

  // Derived state
  const { pullers, draggers } = rankStocks(stocks);
  const { totalMove, top10Contribution, restContribution, breadth, indexPct } = calculateIndexMetrics(stocks);
  const sectors = aggregateBySector(stocks);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px", borderBottom: "1px solid var(--border-subtle)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, var(--blue), var(--purple))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 800, color: "#fff",
          }}>P</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", letterSpacing: -0.3 }}>
              Pullers & Draggers
            </div>
            <div style={{ fontSize: 10, color: "var(--text-faint)", letterSpacing: 0.5 }}>
              S&P 500 Index Contribution Engine
            </div>
          </div>
        </div>
        <LiveIndicator />
      </div>

      {/* Top Bar */}
      <TopBar
        indexMove={totalMove / 10}
        indexPct={indexPct}
        breadth={breadth}
        lastUpdate={lastUpdate}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />

      {/* Main Content */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Pullers & Draggers Tables */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <StockTable title="PULLERS" stocks={pullers} color="green" icon="🟢" />
          <StockTable title="DRAGGERS" stocks={draggers} color="red" icon="🔴" />
        </div>

        {/* Sector + Contribution Breakdown */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <SectorBreakdown sectors={sectors} />
          <ContributionBreakdown
            top10Contribution={top10Contribution}
            restContribution={restContribution}
            totalMove={totalMove}
          />
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 0", borderTop: "1px solid var(--border-subtle)", marginTop: 4,
          flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ fontSize: 10, color: "var(--text-ghost)" }}>
            MVP v1.0 · Simulated data · {SP500_STOCKS.length} constituents tracked
          </div>
          <div style={{ fontSize: 10, color: "var(--text-ghost)" }}>
            Impact = Weight × % Change · Normalized to basis points
          </div>
        </div>
      </div>
    </div>
  );
}
