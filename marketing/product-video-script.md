# 🎬 PRODUCT VIDEO SCRIPT — Pullers & Draggers
# Duration: ~90 seconds
# Format: Screen recording + face cam overlay + motion graphics
# Tone: Product showcase — confident, technical but accessible, trader authority
# Platform: Instagram Reels / TikTok / YouTube Shorts / LinkedIn

---

## SCENE 1 — HOOK (0-6 sec)
**[Screen: Dashboard loads up with live data. Green/red numbers cascading.]**
**[Face cam corner — direct to camera]**

"Every single day the S&P 500 moves — and nobody can tell you WHY. I built a tool that breaks it down to the exact stock, the exact basis point. Here's the full build."

**[TEXT OVERLAY: "I built a real-time S&P 500 engine 📊"]**

---

## SCENE 2 — THE PROBLEM (6-14 sec)
**[Screen: Generic TradingView chart, S&P 500 candle going down]**

"See this? S&P dropped half a percent today. CNBC says 'markets fell on geopolitical concerns.' Cool — but WHICH stocks caused it? Was it three mega-caps dragging everything or a broad sell-off? Nobody tells you that."

**[Screen: News headline — "Markets fall on uncertainty"]**

"That's the problem. I wanted actual answers."

**[TEXT OVERLAY: "The problem: Nobody tells you WHICH stocks moved the index"]**

---

## SCENE 3 — THE APPROACH (14-24 sec)
**[Screen: Claude chat — show the PRD document being written]**

"So before I wrote a single line of code, I wrote a full PRD — Product Requirements Document — inside Claude. Every feature spec'd out. The core math, the data model, the architecture."

**[Screen: Zoom into the formula in the PRD]**

"The S&P 500 is market-cap weighted. So the formula is simple but powerful — take each stock's index weight, multiply by its percent change — that gives you the contribution in basis points."

**[TEXT OVERLAY: "Impact (bps) = Weight% × Price Change%"]**

**[Screen: Show the formula visually — AAPL 7.12% weight × +0.61% = +4.3 bps]**

"Apple has a 7% weight. If it moves half a percent, that alone moves the index 4 basis points. A small-cap? Doesn't even register."

---

## SCENE 4 — THE BUILD (24-42 sec)
**[Screen: Code generating in Claude — React components appearing]**

"I told Claude to build me a full React dashboard. Vite for speed, component-based architecture — separate modules for the calculation engine, the data layer, and the UI."

**[Screen: Quick cuts of each file being created — engine.js, StockTable.jsx, SectorBreakdown.jsx]**

"The calculation engine handles the core math. Stock tables rank the top 10 Pullers pushing the index UP and top 10 Draggers pulling it DOWN."

**[Screen: Show sector breakdown component code briefly]**

"Then I added sector-level aggregation — so you instantly see if Tech, Energy, or Financials is driving the move."

**[TEXT OVERLAY: "Tech Stack: React 18 + Vite 5 + CSS Variables"]**

"And then the dollar sensitivity analysis — this one's key."

**[Screen: Show the formula — $1 Impact = (Weight% ÷ Price) × 100]**

"If a stock moves just one dollar, how many basis points does the S&P move? Low-priced heavy-weight stocks have the biggest sensitivity. Bank of America at 44 bucks moves the index 1.5 bps per dollar. Eli Lilly at 870? Only 0.2 bps."

**[TEXT OVERLAY: "$1 Impact = (Weight% ÷ Price) × 100 bps"]**

---

## SCENE 5 — LIVE DATA (42-58 sec)
**[Screen: Full dashboard — slowly scroll through it]**

"Then I wired it to live market data. This is today — April 13th, 2026."

**[Screen: Zoom into the market alert banner]**

"Trump just announced a blockade on the Strait of Hormuz. Oil is surging 8 percent. And you can see it instantly —"

**[Screen: Point cursor at Energy sector bar]**

"Energy sector is the biggest puller today. Exxon adding 4.7 bps, ConocoPhillips 1.3, Chevron 1.3."

**[Screen: Point cursor at GS in Draggers table]**

"Goldman Sachs is dragging the index — down 3 percent after missing on their FICC trading revenue. That's minus 1.1 bps of index impact."

**[Screen: Point cursor at the Concentration panel]**

"And this panel tells me — is this a broad move or are three stocks faking the tape? Right now it's concentrated. Few mega-caps are masking broader weakness."

**[TEXT OVERLAY: "Real data. Real impact. Real edge. 🔥"]**

---

## SCENE 6 — THE FULL WEIGHT LIST (58-68 sec)
**[Screen: Scroll down to the full constituent table]**

"At the bottom — every single stock's index weight, cumulative weight, and dollar sensitivity."

**[Screen: Click sort by $1 Impact]**

"Sort by dollar impact and you instantly see which stocks move the index the most per dollar. Traders — this is your sensitivity map."

**[Screen: Show $5 and $10 move columns]**

"If NVDA moves 10 bucks, that's 3.4 basis points on the index. If AAPL moves 10 bucks, that's 2.7. Now you know exactly where the leverage is."

**[TEXT OVERLAY: "Your S&P 500 sensitivity map"]**

---

## SCENE 7 — SHIPPED TO GITHUB (68-76 sec)
**[Screen: GitHub repo page — files, README, commit history]**

"Pushed the whole thing to GitHub. Full version control. V1 was the simulation engine, V2 is live data with dollar sensitivity."

**[Screen: Show CHANGELOG.md briefly]**

"Clean commit history, modular codebase, ready to plug in real-time APIs like Polygon or IEX Cloud."

**[TEXT OVERLAY: "Open source — GitHub link in bio"]**

---

## SCENE 8 — CTA & POSITIONING (76-90 sec)
**[Face cam — full frame, direct to camera, slower pace]**

"Here's the thing. Most traders look at a chart and guess. Most developers build fintech apps they'd never actually use. I trade the markets AND I build the tools."

"This went from a PRD to a live dashboard with real market data — in a single session. With Claude."

**[Beat — slight pause]**

"If you trade and you're not building your own tools in 2026, you're leaving edge on the table. Code is open source. Link in bio."

**[TEXT OVERLAY: "Trader × Builder. Code in bio. 🔗"]**

---

## ON-SCREEN TEXT OVERLAYS (for editing):
- 0s: "I built a real-time S&P 500 engine 📊"
- 6s: "The problem: Nobody tells you WHICH stocks moved the index"
- 16s: "Impact (bps) = Weight% × Price Change%"
- 28s: "Tech Stack: React 18 + Vite 5 + CSS Variables"
- 38s: "$1 Impact = (Weight% ÷ Price) × 100 bps"
- 50s: "Real data. Real impact. Real edge. 🔥"
- 62s: "Your S&P 500 sensitivity map"
- 70s: "Open source — GitHub link in bio"
- 82s: "Trader × Builder. Code in bio. 🔗"

---

## CAPTION:

I vibe-coded a real-time S&P 500 contribution engine that tells you EXACTLY which stocks are moving the index — and by how much.

Features:
→ Top 10 Pullers & Draggers ranked by basis point impact
→ Sector-level contribution breakdown
→ Dollar sensitivity: how much the index moves per $1
→ Broad vs concentrated move detection
→ Live market data
→ Full index weight list with cumulative weights

Built the PRD, the calculation engine, the dashboard, and shipped to GitHub — all in one session using Claude.

The formula: Impact = Weight × % Change
Dollar sensitivity: (Weight ÷ Price) × 100

Open source 👇

#vibecoding #sp500 #trading #buildinpublic #fintech #ai #claude #stockmarket #indextrading #futures #productmanagement #react #opensource #tradingtools #quanttrading

---

## RECORDING CHECKLIST:

### Screen recordings needed (record each separately):
1. ✅ Dashboard loading up (5 sec)
2. ✅ Generic S&P 500 chart dropping (3 sec)
3. ✅ Claude chat showing the PRD being typed (5 sec)
4. ✅ Formula zoom: Weight × % Change = bps (3 sec)
5. ✅ AAPL example calculation (3 sec)
6. ✅ Code generating — quick cuts of 3-4 files (6 sec)
7. ✅ Dollar sensitivity formula (3 sec)
8. ✅ BAC vs LLY comparison (3 sec)
9. ✅ Full dashboard slow scroll (8 sec)
10. ✅ Market alert banner zoom (3 sec)
11. ✅ Energy sector bar highlight (3 sec)
12. ✅ GS in draggers table highlight (3 sec)
13. ✅ Concentration panel zoom (3 sec)
14. ✅ Full weight list scroll (4 sec)
15. ✅ Sort by $1 impact click (3 sec)
16. ✅ GitHub repo page (4 sec)
17. ✅ CHANGELOG.md (2 sec)

### Face cam recordings needed:
1. ✅ Hook (0-6s) — energetic, lean in
2. ✅ Problem (6-14s) — frustrated tone, "nobody tells you"
3. ✅ CTA (76-90s) — slower, confident, direct to camera

### Post-production:
- Cut to beat — use a trending instrumental (lo-fi or cinematic)
- Add cursor highlights / zoom animations on key numbers
- Subtle glow effect on green/red numbers
- Use CapCut or Premiere for text overlays
- Export 9:16 for Reels/TikTok, 16:9 for YouTube/LinkedIn

### Posting strategy:
- Instagram Reels: Full 90 sec version
- TikTok: Full 90 sec (or split Part 1 / Part 2 at 45 sec each)
- YouTube Shorts: Cut to 58 sec version (skip Scene 6 & 7)
- LinkedIn: Full version with longer written caption emphasizing PM + engineering skills
- X/Twitter: 45-sec cut (Hook → Formula → Reveal → CTA) + thread with screenshots
