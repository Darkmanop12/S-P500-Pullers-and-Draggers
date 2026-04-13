/**
 * Formatting helpers for the trading dashboard.
 */

/** Format a number with +/- sign */
export const fmt = (n, decimals = 2) => (n >= 0 ? "+" : "") + n.toFixed(decimals);

/** Format basis points with +/- sign */
export const fmtBps = (n) => (n >= 0 ? "+" : "") + n.toFixed(1);

/** Format percentage */
export const fmtPct = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
