import React from 'react';
import { fmt } from '../utils/format';
import LiveIndicator from './LiveIndicator';

const TIMEFRAMES = ["1m", "5m", "15m", "1D"];

export default function TopBar({ indexMove, indexPct, breadth, lastUpdate, timeframe, setTimeframe }) {
  const isUp = indexPct >= 0;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 24px", borderBottom: "1px solid var(--border)",
      background: "linear-gradient(180deg, #0d1520 0%, #0a1019 100%)",
      flexWrap: "wrap", gap: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: 1.5, fontWeight: 600, textTransform: "uppercase" }}>
            S&P 500
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 2 }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
              {(5280 + indexMove).toFixed(2)}
            </span>
            <span style={{
              fontSize: 15, fontWeight: 600, fontFamily: "var(--font-mono)",
              color: isUp ? "var(--green)" : "var(--red)",
            }}>
              {fmt(indexMove)} ({fmt(indexPct)}%)
            </span>
          </div>
        </div>

        <div style={{ width: 1, height: 36, background: "var(--border)" }} />

        <div>
          <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: 1.2, textTransform: "uppercase" }}>Breadth</div>
          <div style={{ fontSize: 14, fontFamily: "var(--font-mono)", marginTop: 2 }}>
            <span style={{ color: "var(--green)" }}>{breadth.adv}</span>
            <span style={{ color: "var(--text-faint)" }}> / </span>
            <span style={{ color: "var(--red)" }}>{breadth.dec}</span>
          </div>
        </div>

        <div style={{ width: 1, height: 36, background: "var(--border)" }} />

        <div>
          <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: 1.2, textTransform: "uppercase" }}>Last Update</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: 2 }}>{lastUpdate}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {TIMEFRAMES.map((tf) => (
          <button key={tf} onClick={() => setTimeframe(tf)} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-mono)",
            border: tf === timeframe ? "1px solid var(--blue)" : "1px solid var(--border)",
            borderRadius: 6, cursor: "pointer", letterSpacing: 0.5,
            background: tf === timeframe ? "rgba(59,130,246,0.15)" : "transparent",
            color: tf === timeframe ? "#60a5fa" : "var(--text-dim)",
            transition: "all 0.15s",
          }}>
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
}
