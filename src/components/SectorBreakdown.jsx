import React from 'react';
import { fmtBps } from '../utils/format';
import { SECTOR_COLORS } from '../data/sp500';

export default function SectorBreakdown({ sectors }) {
  const maxAbs = Math.max(...sectors.map((s) => Math.abs(s.contribution)), 1);

  return (
    <div style={{
      background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)",
      padding: 18, flex: 1, minWidth: 320,
    }}>
      <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>
        Sector Contribution
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sectors.map((s) => {
          const isPositive = s.contribution >= 0;
          const barWidth = (Math.abs(s.contribution) / maxAbs) * 100;
          const sectorColor = SECTOR_COLORS[s.name] || "#475569";

          return (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 10, height: 10, borderRadius: 3, flexShrink: 0,
                background: sectorColor,
              }} />
              <div style={{
                width: 160, fontSize: 12, color: "#cbd5e1", flexShrink: 0,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {s.name}
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 3, transition: "width 0.5s ease",
                    width: `${barWidth}%`,
                    background: isPositive
                      ? `linear-gradient(90deg, ${sectorColor}, ${sectorColor}88)`
                      : "linear-gradient(90deg, var(--red), rgba(239,68,68,0.5))",
                  }} />
                </div>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700,
                  minWidth: 60, textAlign: "right",
                  color: isPositive ? "var(--green)" : "var(--red)",
                }}>
                  {fmtBps(s.contribution)} bps
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
