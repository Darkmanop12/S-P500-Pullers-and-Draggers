# Pullers & Draggers

**Real-time S&P 500 Index Contribution Engine**

Instantly identify which stocks are pushing the S&P 500 up (**Pullers**) or dragging it down (**Draggers**). Quantifies each stock's contribution in basis points using market-cap weighted impact.

![Dashboard](https://img.shields.io/badge/status-MVP-blue) ![React](https://img.shields.io/badge/React-18-61DAFB) ![Vite](https://img.shields.io/badge/Vite-5-646CFF)

## Why This Exists

Most traders look at charts and *guess* why the market moved. This tool flips it — you **know exactly which stocks caused the move**. That's edge.

## Core Formula

```
Impact (bps) = Stock Weight (%) × Price Change (%) × 100
```

The S&P 500 is market-cap weighted. A 1% move in Apple (~7% weight) moves the index 10x more than a 1% move in a 0.7% weight stock.

## Features (MVP)

- **Top 10 Pullers & Draggers** — Ranked by basis point contribution
- **Sector Breakdown** — See if Tech, Financials, or Energy is driving the move
- **Index Contribution Split** — Top 10 vs remaining 490 stocks (broad vs concentrated)
- **Breadth Indicator** — Advancing vs declining count
- **Timeframe Controls** — 1m, 5m, 15m, Daily views
- **Auto-refresh** — Simulates real-time market ticks

## Quick Start

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/pullers-draggers.git
cd pullers-draggers

# Install
npm install

# Run
npm run dev
```

Open `http://localhost:3000`

## Project Structure

```
src/
├── App.jsx                    # Main dashboard orchestrator
├── main.jsx                   # Entry point
├── index.css                  # Global styles (CSS variables)
├── components/
│   ├── TopBar.jsx             # Index stats + timeframe selector
│   ├── StockTable.jsx         # Pullers/Draggers table
│   ├── SectorBreakdown.jsx    # Sector contribution bars
│   ├── ContributionBreakdown.jsx  # Top 10 vs Rest analysis
│   └── LiveIndicator.jsx      # Pulsing live badge
├── data/
│   └── sp500.js               # S&P 500 constituent data + weights
└── utils/
    ├── engine.js              # Calculation engine (swap data source here)
    └── format.js              # Number formatting helpers
```

## Plugging In Real Data

The architecture is designed for a clean data source swap:

### 1. Price Feed
Replace `generateSimulatedData()` in `src/utils/engine.js` with:
- **Polygon.io** WebSocket — best for real-time equities
- **IEX Cloud** — REST API, good free tier
- **Alpha Vantage** — free fallback (rate-limited)

### 2. Index Weights
Replace `SP500_STOCKS` in `src/data/sp500.js` with a daily fetch from:
- SPDR SPY Holdings CSV (ssga.com)
- Or a Supabase table updated daily

### 3. Volume Data
Replace the random `volumeSpike` flag with actual volume comparison vs 20-day average.

## Roadmap

- [ ] Real-time data integration (Polygon.io)
- [ ] Heatmap visualization
- [ ] Alert system (">5 bps from single stock")
- [ ] Historical analytics
- [ ] /ES futures correlation
- [ ] AI explanation layer ("Why is AAPL moving?")

## Tech Stack

- **React 18** + **Vite 5** — Fast dev + build
- **CSS Variables** — Dark trading terminal theme
- **Zero dependencies** beyond React — lightweight by design

## License

MIT
