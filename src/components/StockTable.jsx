import React from 'react';
import { fmt, fmtBps } from '../utils/format';

const HEADERS = ["#", "Ticker", "% Chg", "Weight", "Impact (bps)", "Vol"];

export default function StockTable({ title, stocks, color, icon }) {
  return (
    <div style={{
      flex: 1, minWidth: 320, background: "var(--bg-card)",
      borderRadius: 12, border: "1px solid var(--border)", overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 18px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: 0.5 }}>{title}</span>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
          background: color === "green" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
          color: color === "green" ? "var(--green)" : "var(--red)",
          marginLeft: "auto",
        }}>
          TOP 10
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {HEADERS.map((h, i) => (
                <th key={h} style={{
                  padding: "10px 12px", textAlign: i === 0 ? "center" : "left",
                  color: "var(--text-faint)", fontSize: 10, fontWeight: 600,
                  letterSpacing: 1.2, textTransform: "uppercase", whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((s, i) => {
              const isPositive = s.contributionBps >= 0;
              return (
                <tr key={s.ticker} style={{
                  borderBottom: "1px solid var(--border-subtle)",
                  background: i % 2 === 0 ? "transparent" : "var(--bg-hover)",
                }}>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "var(--text-faint)", fontSize: 11, fontFamily: "var(--font-mono)" }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontSize: 13 }}>{s.ticker}</div>
                    <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 1, maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {s.name}
                    </div>
                  </td>
                  <td style={{
                    padding: "10px 12px", fontFamily: "var(--font-mono)", fontWeight: 600,
                    color: s.pctChange >= 0 ? "var(--green)" : "var(--red)",
                  }}>
                    {fmt(s.pctChange)}%
                  </td>
                  <td style={{ padding: "10px 12px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                    {s.weight.toFixed(2)}%
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13,
                      color: isPositive ? "var(--green)" : "var(--red)",
                      background: isPositive ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                      padding: "3px 8px", borderRadius: 4,
                    }}>
                      {fmtBps(s.contributionBps)}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    {s.volumeSpike && (
                      <span style={{
                        display: "inline-block", width: 8, height: 8, borderRadius: "50%",
                        background: "var(--amber)", boxShadow: "0 0 6px rgba(245,158,11,0.5)",
                      }} title="Volume Spike" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
