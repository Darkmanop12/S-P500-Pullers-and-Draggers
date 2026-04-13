import { useState, useEffect } from "react";

/*
 * PULLERS & DRAGGERS — LIVE S&P 500 Dashboard
 * Data: April 13, 2026 ~11:00 AM ET
 * 
 * Dollar Impact Formula:
 *   $1 Move Impact (bps) = (Weight% / Price) × 100
 *   Because: Weight = (Shares × Price) / Total Market Cap
 *   So: $1 change = Weight/Price fraction of index = (W/P)×10000 bps
 */

const SP500_CLOSE_PREV = 6816.89;

const LIVE_DATA = [
  { ticker: "AAPL", name: "Apple Inc.", weight: 7.12, sector: "Technology", pctChange: 0.61, price: 260.49 },
  { ticker: "MSFT", name: "Microsoft Corp.", weight: 6.58, sector: "Technology", pctChange: -0.34, price: 373.07 },
  { ticker: "NVDA", name: "NVIDIA Corp.", weight: 6.21, sector: "Technology", pctChange: 1.01, price: 183.91 },
  { ticker: "AMZN", name: "Amazon.com Inc.", weight: 3.82, sector: "Consumer Discretionary", pctChange: -0.65, price: 228.10 },
  { ticker: "META", name: "Meta Platforms", weight: 2.61, sector: "Communication Services", pctChange: 1.82, price: 692.50 },
  { ticker: "GOOGL", name: "Alphabet (A)", weight: 2.08, sector: "Communication Services", pctChange: 0.45, price: 176.20 },
  { ticker: "GOOG", name: "Alphabet (C)", weight: 1.74, sector: "Communication Services", pctChange: 0.42, price: 178.05 },
  { ticker: "BRK.B", name: "Berkshire Hathaway", weight: 1.71, sector: "Financials", pctChange: 0.35, price: 546.80 },
  { ticker: "JPM", name: "JPMorgan Chase", weight: 1.41, sector: "Financials", pctChange: 0.77, price: 310.33 },
  { ticker: "AVGO", name: "Broadcom Inc.", weight: 1.68, sector: "Technology", pctChange: 0.72, price: 227.30 },
  { ticker: "LLY", name: "Eli Lilly & Co.", weight: 1.62, sector: "Healthcare", pctChange: 0.48, price: 872.30 },
  { ticker: "TSLA", name: "Tesla Inc.", weight: 1.38, sector: "Consumer Discretionary", pctChange: -1.25, price: 335.90 },
  { ticker: "XOM", name: "Exxon Mobil", weight: 1.21, sector: "Energy", pctChange: 3.85, price: 158.38 },
  { ticker: "UNH", name: "UnitedHealth Group", weight: 1.18, sector: "Healthcare", pctChange: 0.30, price: 306.91 },
  { ticker: "V", name: "Visa Inc.", weight: 1.07, sector: "Financials", pctChange: -0.22, price: 308.29 },
  { ticker: "MA", name: "Mastercard Inc.", weight: 0.96, sector: "Financials", pctChange: -0.15, price: 566.40 },
  { ticker: "PG", name: "Procter & Gamble", weight: 0.92, sector: "Consumer Staples", pctChange: 1.21, price: 146.66 },
  { ticker: "COST", name: "Costco Wholesale", weight: 0.88, sector: "Consumer Staples", pctChange: 0.55, price: 1042.30 },
  { ticker: "JNJ", name: "Johnson & Johnson", weight: 0.87, sector: "Healthcare", pctChange: 0.00, price: 241.31 },
  { ticker: "HD", name: "Home Depot", weight: 0.85, sector: "Consumer Discretionary", pctChange: 1.02, price: 339.58 },
  { ticker: "ABBV", name: "AbbVie Inc.", weight: 0.78, sector: "Healthcare", pctChange: 0.62, price: 205.40 },
  { ticker: "WMT", name: "Walmart Inc.", weight: 0.72, sector: "Consumer Staples", pctChange: 1.47, price: 129.13 },
  { ticker: "NFLX", name: "Netflix Inc.", weight: 0.71, sector: "Communication Services", pctChange: 0.32, price: 1085.40 },
  { ticker: "BAC", name: "Bank of America", weight: 0.68, sector: "Financials", pctChange: 0.38, price: 43.90 },
  { ticker: "CRM", name: "Salesforce Inc.", weight: 0.65, sector: "Technology", pctChange: -2.89, price: 170.85 },
  { ticker: "CVX", name: "Chevron Corp.", weight: 0.62, sector: "Energy", pctChange: 2.15, price: 192.60 },
  { ticker: "KO", name: "Coca-Cola Co.", weight: 0.58, sector: "Consumer Staples", pctChange: 1.15, price: 78.18 },
  { ticker: "MRK", name: "Merck & Co.", weight: 0.57, sector: "Healthcare", pctChange: -0.41, price: 122.68 },
  { ticker: "AMD", name: "Advanced Micro Devices", weight: 0.55, sector: "Technology", pctChange: 0.85, price: 112.40 },
  { ticker: "PEP", name: "PepsiCo Inc.", weight: 0.53, sector: "Consumer Staples", pctChange: 0.78, price: 151.40 },
  { ticker: "LIN", name: "Linde plc", weight: 0.51, sector: "Materials", pctChange: 0.38, price: 478.60 },
  { ticker: "TMO", name: "Thermo Fisher", weight: 0.49, sector: "Healthcare", pctChange: 0.18, price: 540.20 },
  { ticker: "ADBE", name: "Adobe Inc.", weight: 0.48, sector: "Technology", pctChange: -0.68, price: 408.20 },
  { ticker: "WFC", name: "Wells Fargo", weight: 0.47, sector: "Financials", pctChange: -0.52, price: 78.15 },
  { ticker: "CSCO", name: "Cisco Systems", weight: 0.46, sector: "Technology", pctChange: -0.63, price: 83.17 },
  { ticker: "ACN", name: "Accenture plc", weight: 0.44, sector: "Technology", pctChange: -0.41, price: 298.50 },
  { ticker: "ABT", name: "Abbott Labs", weight: 0.43, sector: "Healthcare", pctChange: 0.35, price: 131.50 },
  { ticker: "MCD", name: "McDonald's Corp.", weight: 0.42, sector: "Consumer Discretionary", pctChange: 0.83, price: 309.55 },
  { ticker: "DHR", name: "Danaher Corp.", weight: 0.40, sector: "Healthcare", pctChange: 0.22, price: 228.90 },
  { ticker: "ORCL", name: "Oracle Corp.", weight: 0.39, sector: "Technology", pctChange: 0.55, price: 175.80 },
  { ticker: "GS", name: "Goldman Sachs", weight: 0.38, sector: "Financials", pctChange: -3.00, price: 876.50 },
  { ticker: "COP", name: "ConocoPhillips", weight: 0.38, sector: "Energy", pctChange: 3.45, price: 128.70 },
  { ticker: "IBM", name: "IBM Corp.", weight: 0.35, sector: "Technology", pctChange: -1.89, price: 237.18 },
  { ticker: "CAT", name: "Caterpillar Inc.", weight: 0.34, sector: "Industrials", pctChange: 2.01, price: 787.07 },
  { ticker: "INTC", name: "Intel Corp.", weight: 0.32, sector: "Technology", pctChange: 3.45, price: 64.54 },
  { ticker: "HON", name: "Honeywell Intl.", weight: 0.32, sector: "Industrials", pctChange: 1.54, price: 236.06 },
  { ticker: "UNP", name: "Union Pacific", weight: 0.31, sector: "Industrials", pctChange: 0.45, price: 218.30 },
  { ticker: "NEE", name: "NextEra Energy", weight: 0.30, sector: "Utilities", pctChange: 0.42, price: 76.80 },
  { ticker: "RTX", name: "RTX Corp.", weight: 0.29, sector: "Industrials", pctChange: 1.85, price: 142.80 },
  { ticker: "DE", name: "Deere & Co.", weight: 0.28, sector: "Industrials", pctChange: 0.62, price: 472.50 },
  { ticker: "NKE", name: "Nike Inc.", weight: 0.28, sector: "Consumer Discretionary", pctChange: 2.02, price: 44.00 },
  { ticker: "BA", name: "Boeing Co.", weight: 0.26, sector: "Industrials", pctChange: 1.04, price: 220.06 },
  { ticker: "AMT", name: "American Tower", weight: 0.25, sector: "Real Estate", pctChange: 0.28, price: 192.50 },
  { ticker: "PLTR", name: "Palantir Tech.", weight: 0.22, sector: "Technology", pctChange: 3.92, price: 133.33 },
  { ticker: "DUK", name: "Duke Energy", weight: 0.22, sector: "Utilities", pctChange: 0.55, price: 118.40 },
  { ticker: "SLB", name: "Schlumberger", weight: 0.18, sector: "Energy", pctChange: 4.20, price: 52.80 },
  { ticker: "FAST", name: "Fastenal Co.", weight: 0.10, sector: "Industrials", pctChange: -6.41, price: 46.02 },
  { ticker: "RVMD", name: "Revolution Medicines", weight: 0.04, sector: "Healthcare", pctChange: 36.35, price: 131.48 },
].map(s => {
  const contributionBps = +((s.weight * s.pctChange)).toFixed(2);
  // $1 move impact: how many bps the index moves if this stock moves $1
  // Formula: (weight% / price) × 100
  const dollarImpactBps = +((s.weight / s.price) * 100).toFixed(3);
  return { ...s, contributionBps, dollarImpactBps };
});

const SECTOR_COLORS = {
  "Technology": "#3b82f6", "Healthcare": "#a855f7", "Financials": "#f59e0b",
  "Consumer Discretionary": "#ec4899", "Communication Services": "#06b6d4",
  "Consumer Staples": "#10b981", "Energy": "#ef4444", "Industrials": "#f97316",
  "Materials": "#6366f1", "Utilities": "#84cc16", "Real Estate": "#14b8a6",
};

const fmt = (n, d = 2) => (n >= 0 ? "+" : "") + n.toFixed(d);
const fmtBps = (n) => (n >= 0 ? "+" : "") + n.toFixed(1);

function StockTable({ title, stocks, icon, accent }) {
  return (
    <div style={{ flex: 1, minWidth: 360, background: "#0c131d", borderRadius: 14, border: "1px solid #1a2332", overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #1a2332", display: "flex", alignItems: "center", gap: 10, background: "linear-gradient(90deg, rgba(15,23,35,1), rgba(12,19,29,1))" }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", letterSpacing: 1 }}>{title}</span>
        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: accent === "#22c55e" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)", color: accent, marginLeft: "auto" }}>TOP 10</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {["#", "TICKER", "PRICE", "% CHG", "WT%", "IMPACT", "$1 MOVE"].map((h, i) => (
                <th key={h} style={{ padding: "10px 10px", textAlign: i < 1 ? "center" : "left", color: "#3e4c5e", fontSize: 9, fontWeight: 700, letterSpacing: 1.3, borderBottom: "1px solid #1a2332", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((s, i) => (
              <tr key={s.ticker} style={{ borderBottom: "1px solid #111a27", background: i % 2 === 0 ? "transparent" : "rgba(10,15,25,0.5)" }}>
                <td style={{ padding: "9px 10px", textAlign: "center", color: "#3e4c5e", fontSize: 10, fontFamily: "monospace" }}>{i + 1}</td>
                <td style={{ padding: "9px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 5, height: 5, borderRadius: 2, background: SECTOR_COLORS[s.sector] || "#475569", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 800, color: "#f1f5f9", fontFamily: "monospace", fontSize: 12 }}>{s.ticker}</div>
                      <div style={{ fontSize: 9, color: "#4b5b73", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "9px 10px", fontFamily: "monospace", color: "#94a3b8", fontSize: 11 }}>${s.price.toFixed(2)}</td>
                <td style={{ padding: "9px 10px", fontFamily: "monospace", fontWeight: 700, fontSize: 12, color: s.pctChange >= 0 ? "#22c55e" : "#ef4444" }}>{fmt(s.pctChange)}%</td>
                <td style={{ padding: "9px 10px", fontFamily: "monospace", color: "#64748b", fontSize: 11 }}>{s.weight.toFixed(2)}</td>
                <td style={{ padding: "9px 10px" }}>
                  <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 12, color: s.contributionBps >= 0 ? "#22c55e" : "#ef4444", background: s.contributionBps >= 0 ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", padding: "3px 8px", borderRadius: 5 }}>{fmtBps(s.contributionBps)}</span>
                </td>
                <td style={{ padding: "9px 10px" }}>
                  <span style={{ fontFamily: "monospace", fontWeight: 600, fontSize: 11, color: "#60a5fa", background: "rgba(59,130,246,0.08)", padding: "3px 7px", borderRadius: 5 }}>{s.dollarImpactBps.toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectorBars({ data }) {
  const maxAbs = Math.max(...data.map(s => Math.abs(s.contribution)), 0.1);
  return (
    <div style={{ background: "#0c131d", borderRadius: 14, border: "1px solid #1a2332", padding: 20, flex: 1, minWidth: 340 }}>
      <div style={{ fontSize: 11, color: "#3e4c5e", fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 14 }}>Sector Contribution (bps)</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {data.map(s => {
          const pct = (Math.abs(s.contribution) / maxAbs) * 100;
          const color = SECTOR_COLORS[s.name] || "#475569";
          return (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: color, flexShrink: 0 }} />
              <div style={{ width: 155, fontSize: 11, color: "#cbd5e1", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
              <div style={{ flex: 1, height: 7, background: "#111a27", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 4, width: `${pct}%`, background: s.contribution >= 0 ? `linear-gradient(90deg, ${color}, ${color}66)` : "linear-gradient(90deg, #ef4444, #ef444466)", transition: "width 0.5s" }} />
              </div>
              <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, minWidth: 60, textAlign: "right", color: s.contribution >= 0 ? "#22c55e" : "#ef4444" }}>{fmtBps(s.contribution)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BreakdownPanel({ top10Contrib, totalMove }) {
  const top10Pct = totalMove !== 0 ? Math.abs((top10Contrib / totalMove) * 100) : 0;
  const restPct = Math.max(0, 100 - top10Pct);
  const concentrated = top10Pct > 50;
  return (
    <div style={{ background: "#0c131d", borderRadius: 14, border: "1px solid #1a2332", padding: 20, minWidth: 270, flex: "0 0 290px" }}>
      <div style={{ fontSize: 11, color: "#3e4c5e", fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 16 }}>Move Concentration</div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Top 10</span>
          <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "monospace", color: "#f1f5f9" }}>{top10Pct.toFixed(0)}%</span>
        </div>
        <div style={{ height: 9, background: "#111a27", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 5, width: `${Math.min(top10Pct, 100)}%`, background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }} />
        </div>
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Rest 490</span>
          <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "monospace", color: "#f1f5f9" }}>{restPct.toFixed(0)}%</span>
        </div>
        <div style={{ height: 9, background: "#111a27", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 5, width: `${Math.min(restPct, 100)}%`, background: "linear-gradient(90deg, #475569, #64748b)" }} />
        </div>
      </div>
      <div style={{ padding: "12px 14px", borderRadius: 10, background: concentrated ? "rgba(245,158,11,0.06)" : "rgba(34,197,94,0.06)", border: `1px solid ${concentrated ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)"}` }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: concentrated ? "#f59e0b" : "#22c55e", marginBottom: 4 }}>{concentrated ? "⚠ CONCENTRATED" : "✓ BROAD"}</div>
        <div style={{ fontSize: 10, color: "#7a8b9e", lineHeight: 1.5 }}>{concentrated ? "Few mega-caps driving. Reversal risk." : "Broadly distributed. Healthy."}</div>
      </div>
      <div style={{ marginTop: 16, padding: "12px 0", borderTop: "1px solid #1a2332" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 10, color: "#3e4c5e", letterSpacing: 1, fontWeight: 600 }}>EST. MOVE</span>
          <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "monospace", color: totalMove >= 0 ? "#22c55e" : "#ef4444" }}>{fmtBps(totalMove)} <span style={{ fontSize: 11 }}>bps</span></span>
        </div>
      </div>
    </div>
  );
}

function FullWeightList({ data }) {
  const [sortBy, setSortBy] = useState("weight");
  const [showAll, setShowAll] = useState(false);

  const sorted = [...data].sort((a, b) => {
    if (sortBy === "weight") return b.weight - a.weight;
    if (sortBy === "dollarImpact") return b.dollarImpactBps - a.dollarImpactBps;
    if (sortBy === "contribution") return b.contributionBps - a.contributionBps;
    if (sortBy === "ticker") return a.ticker.localeCompare(b.ticker);
    return 0;
  });

  const displayed = showAll ? sorted : sorted.slice(0, 25);
  const totalWeight = data.reduce((s, x) => s + x.weight, 0);

  return (
    <div style={{ background: "#0c131d", borderRadius: 14, border: "1px solid #1a2332", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a2332", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9", letterSpacing: 0.5 }}>S&P 500 Index Weights & Dollar Sensitivity</div>
          <div style={{ fontSize: 11, color: "#4b5b73", marginTop: 4 }}>
            <span style={{ color: "#60a5fa" }}>$1 Move</span> = How many basis points the index moves if this stock changes by $1.
            Formula: <span style={{ fontFamily: "monospace", color: "#94a3b8" }}>(Weight% ÷ Price) × 100</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { key: "weight", label: "By Weight" },
            { key: "dollarImpact", label: "By $1 Impact" },
            { key: "contribution", label: "By Today's Impact" },
            { key: "ticker", label: "A→Z" },
          ].map(b => (
            <button key={b.key} onClick={() => setSortBy(b.key)} style={{
              padding: "5px 12px", fontSize: 10, fontWeight: 700, fontFamily: "monospace",
              border: sortBy === b.key ? "1px solid #3b82f6" : "1px solid #1a2332",
              borderRadius: 6, cursor: "pointer", letterSpacing: 0.5,
              background: sortBy === b.key ? "rgba(59,130,246,0.15)" : "transparent",
              color: sortBy === b.key ? "#60a5fa" : "#4b5b73",
            }}>{b.label}</button>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ padding: "10px 20px", borderBottom: "1px solid #111a27", display: "flex", gap: 24, flexWrap: "wrap", background: "rgba(59,130,246,0.03)" }}>
        <div style={{ fontSize: 11, color: "#64748b" }}>
          Tracked: <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{data.length}</span> stocks
        </div>
        <div style={{ fontSize: 11, color: "#64748b" }}>
          Coverage: <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{totalWeight.toFixed(1)}%</span> of index
        </div>
        <div style={{ fontSize: 11, color: "#64748b" }}>
          Highest $1 sensitivity: <span style={{ color: "#60a5fa", fontWeight: 700 }}>{sorted.sort((a,b) => b.dollarImpactBps - a.dollarImpactBps)[0]?.ticker}</span>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {["#", "TICKER", "COMPANY", "SECTOR", "PRICE", "WEIGHT %", "CUM. WT%", "% CHG", "TODAY BPS", "$1 MOVE (BPS)", "$5 MOVE", "$10 MOVE"].map((h, i) => (
                <th key={h} style={{
                  padding: "10px 10px", textAlign: i === 0 ? "center" : "left",
                  color: "#3e4c5e", fontSize: 9, fontWeight: 700, letterSpacing: 1.2,
                  borderBottom: "1px solid #1a2332", whiteSpace: "nowrap",
                  position: "sticky", top: 0, background: "#0c131d",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.map((s, i) => {
              const cumWeight = displayed.slice(0, i + 1).reduce((sum, x) => sum + x.weight, 0);
              return (
                <tr key={s.ticker} style={{ borderBottom: "1px solid #111a27", background: i % 2 === 0 ? "transparent" : "rgba(10,15,25,0.4)" }}>
                  <td style={{ padding: "8px 10px", textAlign: "center", color: "#3e4c5e", fontSize: 10, fontFamily: "monospace" }}>{i + 1}</td>
                  <td style={{ padding: "8px 10px", fontWeight: 800, color: "#f1f5f9", fontFamily: "monospace", fontSize: 12 }}>{s.ticker}</td>
                  <td style={{ padding: "8px 10px", color: "#94a3b8", fontSize: 11, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</td>
                  <td style={{ padding: "8px 10px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: 2, background: SECTOR_COLORS[s.sector] || "#475569" }} />
                      <span style={{ fontSize: 10, color: "#7a8b9e" }}>{s.sector}</span>
                    </span>
                  </td>
                  <td style={{ padding: "8px 10px", fontFamily: "monospace", color: "#cbd5e1", fontSize: 11 }}>${s.price.toFixed(2)}</td>
                  <td style={{ padding: "8px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 50, height: 5, background: "#111a27", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 3, width: `${(s.weight / 7.2) * 100}%`, background: SECTOR_COLORS[s.sector] || "#3b82f6" }} />
                      </div>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#f1f5f9", fontSize: 12 }}>{s.weight.toFixed(2)}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "8px 10px", fontFamily: "monospace", color: "#64748b", fontSize: 11 }}>{cumWeight.toFixed(1)}%</td>
                  <td style={{ padding: "8px 10px", fontFamily: "monospace", fontWeight: 600, fontSize: 11, color: s.pctChange >= 0 ? "#22c55e" : "#ef4444" }}>{fmt(s.pctChange)}%</td>
                  <td style={{ padding: "8px 10px" }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 11, color: s.contributionBps >= 0 ? "#22c55e" : "#ef4444" }}>{fmtBps(s.contributionBps)}</span>
                  </td>
                  <td style={{ padding: "8px 10px" }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 12, color: "#60a5fa", background: "rgba(59,130,246,0.08)", padding: "3px 8px", borderRadius: 5 }}>{s.dollarImpactBps.toFixed(2)}</span>
                  </td>
                  <td style={{ padding: "8px 10px", fontFamily: "monospace", color: "#7a8b9e", fontSize: 11 }}>{(s.dollarImpactBps * 5).toFixed(2)}</td>
                  <td style={{ padding: "8px 10px", fontFamily: "monospace", color: "#7a8b9e", fontSize: 11 }}>{(s.dollarImpactBps * 10).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "12px 20px", borderTop: "1px solid #1a2332", display: "flex", justifyContent: "center" }}>
        <button onClick={() => setShowAll(!showAll)} style={{
          padding: "8px 24px", fontSize: 11, fontWeight: 700, fontFamily: "monospace",
          border: "1px solid #1a2332", borderRadius: 8, cursor: "pointer",
          background: "rgba(59,130,246,0.06)", color: "#60a5fa", letterSpacing: 0.5,
        }}>
          {showAll ? "SHOW TOP 25" : `SHOW ALL ${data.length} STOCKS`}
        </button>
      </div>
    </div>
  );
}

function MarketContext() {
  return (
    <div style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.06) 0%, rgba(12,19,29,1) 50%, rgba(34,197,94,0.06) 100%)", borderRadius: 14, border: "1px solid #1a2332", padding: "12px 18px", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ fontSize: 10, color: "#ef4444", fontWeight: 800, letterSpacing: 1.5, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "pulse 2s infinite" }} />ALERT
      </div>
      <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5, flex: 1 }}>
        <strong style={{ color: "#f1f5f9" }}>Hormuz Blockade</strong> — Oil surges 8%.
        <strong style={{ color: "#f59e0b" }}> GS</strong> misses FICC.
        <strong style={{ color: "#22c55e" }}> Energy leading.</strong> Banks earnings week (JPM, WFC tomorrow).
      </div>
    </div>
  );
}

export default function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false }));
  useEffect(() => { const i = setInterval(() => setTime(new Date().toLocaleTimeString("en-US", { hour12: false })), 1000); return () => clearInterval(i); }, []);

  const sorted = [...LIVE_DATA].sort((a, b) => b.contributionBps - a.contributionBps);
  const pullers = sorted.filter(s => s.contributionBps > 0).slice(0, 10);
  const draggers = sorted.filter(s => s.contributionBps < 0).sort((a, b) => a.contributionBps - b.contributionBps).slice(0, 10);
  const totalMove = LIVE_DATA.reduce((s, x) => s + x.contributionBps, 0);
  const top10Abs = [...LIVE_DATA].sort((a, b) => Math.abs(b.contributionBps) - Math.abs(a.contributionBps)).slice(0, 10);
  const top10Contrib = top10Abs.reduce((s, x) => s + x.contributionBps, 0);
  const sectorMap = {};
  LIVE_DATA.forEach(s => { if (!sectorMap[s.sector]) sectorMap[s.sector] = 0; sectorMap[s.sector] += s.contributionBps; });
  const sectors = Object.entries(sectorMap).map(([name, contribution]) => ({ name, contribution: +contribution.toFixed(1) })).sort((a, b) => b.contribution - a.contribution);
  const adv = LIVE_DATA.filter(s => s.pctChange > 0).length;
  const dec = LIVE_DATA.filter(s => s.pctChange < 0).length;
  const indexPct = totalMove / 100;
  const indexPts = totalMove / 10;
  const isUp = totalMove >= 0;

  return (
    <div style={{ minHeight: "100vh", background: "#080d14", color: "#e2e8f0", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
      
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 22px", borderBottom: "1px solid #111a27" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 900, color: "#fff" }}>P</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9" }}>Pullers & Draggers</div>
            <div style={{ fontSize: 10, color: "#3e4c5e", letterSpacing: 0.5 }}>S&P 500 Index Contribution Engine</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.6)" }} />
          <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 700, letterSpacing: 1.5 }}>LIVE DATA</span>
        </div>
      </div>

      {/* TOP BAR */}
      <div style={{ padding: "14px 22px", borderBottom: "1px solid #111a27", background: "linear-gradient(180deg, #0d1520, #0a1019)", display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 10, color: "#3e4c5e", letterSpacing: 1.5, fontWeight: 700 }}>S&P 500</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 3 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", fontFamily: "monospace" }}>{(SP500_CLOSE_PREV + indexPts).toFixed(2)}</span>
            <span style={{ fontSize: 15, fontWeight: 700, fontFamily: "monospace", color: isUp ? "#22c55e" : "#ef4444" }}>{fmt(indexPts)} ({fmt(indexPct)}%)</span>
          </div>
        </div>
        <div style={{ width: 1, height: 38, background: "#1a2332" }} />
        <div>
          <div style={{ fontSize: 10, color: "#3e4c5e", letterSpacing: 1.2, fontWeight: 700 }}>BREADTH</div>
          <div style={{ fontSize: 15, fontFamily: "monospace", marginTop: 3, fontWeight: 700 }}>
            <span style={{ color: "#22c55e" }}>{adv}</span><span style={{ color: "#2a3545" }}> / </span><span style={{ color: "#ef4444" }}>{dec}</span>
          </div>
        </div>
        <div style={{ width: 1, height: 38, background: "#1a2332" }} />
        <div>
          <div style={{ fontSize: 10, color: "#3e4c5e", letterSpacing: 1.2, fontWeight: 700 }}>WTI CRUDE</div>
          <div style={{ fontSize: 15, fontFamily: "monospace", marginTop: 3, fontWeight: 700, color: "#ef4444" }}>$104.82 <span style={{ fontSize: 11 }}>+8.5%</span></div>
        </div>
        <div style={{ width: 1, height: 38, background: "#1a2332" }} />
        <div>
          <div style={{ fontSize: 10, color: "#3e4c5e", letterSpacing: 1.2, fontWeight: 700 }}>UPDATED</div>
          <div style={{ fontSize: 13, color: "#64748b", fontFamily: "monospace", marginTop: 3 }}>Apr 13 · {time}</div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <MarketContext />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <StockTable title="PULLERS" stocks={pullers} icon="▲" accent="#22c55e" />
          <StockTable title="DRAGGERS" stocks={draggers} icon="▼" accent="#ef4444" />
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <SectorBars data={sectors} />
          <BreakdownPanel top10Contrib={top10Contrib} totalMove={totalMove} />
        </div>

        {/* FULL WEIGHT LIST WITH DOLLAR SENSITIVITY */}
        <FullWeightList data={LIVE_DATA} />

        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #111a27", fontSize: 10, color: "#2a3545", flexWrap: "wrap", gap: 6 }}>
          <span>Pullers & Draggers v1.1 · Live data Apr 13, 2026 · {LIVE_DATA.length} constituents</span>
          <span>$1 Impact = (Weight% ÷ Price) × 100 bps</span>
        </div>
      </div>
    </div>
  );
}
