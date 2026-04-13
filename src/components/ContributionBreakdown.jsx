import React from 'react';
import { fmt } from '../utils/format';

export default function ContributionBreakdown({ top10Contribution, restContribution, totalMove }) {
  const top10Pct = totalMove !== 0 ? Math.abs((top10Contribution / totalMove) * 100) : 0;
  const restPct = Math.max(0, 100 - top10Pct);
  const isBroad = top10Pct < 50;

  return (
    <div style={{
      background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)",
      padding: 18, flex: "0 0 280px", minWidth: 260,
    }}>
      <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16 }}>
        Index Move Breakdown
      </div>

      {/* Top 10 bar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Top 10 Contributors</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
            {top10Pct.toFixed(1)}%
          </span>
        </div>
        <div style={{ height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 4, transition: "width 0.6s ease",
            width: `${Math.min(top10Pct, 100)}%`,
            background: "linear-gradient(90deg, var(--blue), var(--purple))",
          }} />
        </div>
      </div>

      {/* Remaining 490 bar */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Remaining 490</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
            {restPct.toFixed(1)}%
          </span>
        </div>
        <div style={{ height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 4, transition: "width 0.6s ease",
            width: `${Math.min(restPct, 100)}%`,
            background: "linear-gradient(90deg, var(--text-faint), var(--text-dim))",
          }} />
        </div>
      </div>

      {/* Signal badge */}
      <div style={{
        padding: "10px 14px", borderRadius: 8,
        background: isBroad ? "rgba(34,197,94,0.08)" : "rgba(245,158,11,0.08)",
        border: `1px solid ${isBroad ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: isBroad ? "var(--green)" : "var(--amber)", marginBottom: 4 }}>
          {isBroad ? "BROAD MOVE" : "CONCENTRATED MOVE"}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.4 }}>
          {isBroad
            ? "Move is distributed across many stocks — broad market participation."
            : "A few heavy-weights are driving this move — watch for reversal risk."
          }
        </div>
      </div>

      {/* Total estimated move */}
      <div style={{ marginTop: 16, padding: "10px 0", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1 }}>Est. Index Move</span>
          <span style={{
            fontSize: 18, fontWeight: 700, fontFamily: "var(--font-mono)",
            color: totalMove >= 0 ? "var(--green)" : "var(--red)",
          }}>
            {fmt(totalMove)} bps
          </span>
        </div>
      </div>
    </div>
  );
}
