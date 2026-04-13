# Changelog

## v2.0.0 — April 13, 2026

### Live Market Data
- Replaced simulated data with real S&P 500 market data (April 13, 2026)
- 58 constituents tracked with real prices from Yahoo Finance, CNBC, Bloomberg, Investing.com
- Market context alert banner (Hormuz blockade, GS earnings, oil surge)
- WTI Crude price indicator in top bar

### Dollar Sensitivity Analysis (NEW)
- **$1 Move Impact** column: shows how many bps the index moves per $1 price change
- Formula: `(Weight% ÷ Price) × 100 = bps per $1`
- $5 and $10 move projections
- Sortable by dollar impact to find most price-sensitive stocks

### Full S&P 500 Weight List (NEW)
- Complete constituent table at bottom
- Cumulative weight column (see "top 10 = 45% of index")
- Weight visualization bars
- Sort by: Weight, $1 Impact, Today's Impact, A→Z
- Toggle between Top 25 and full list

### UI Improvements
- Market alert banner with real-time context
- Refined dark trading terminal aesthetic
- Better responsive layout

## v1.0.0 — April 13, 2026

### Initial MVP
- Top 10 Pullers & Draggers tables
- Core calculation engine (Weight × % Change = bps)
- Sector-level contribution breakdown
- Index move concentration analysis (broad vs concentrated)
- Timeframe controls (1m, 5m, 15m, Daily)
- Auto-refreshing simulation
- Dark trading terminal UI
