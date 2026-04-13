import React, { useState, useEffect } from 'react';

export default function LiveIndicator() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setOn((v) => !v), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%",
        background: on ? "var(--green)" : "transparent",
        boxShadow: on ? "0 0 8px rgba(34,197,94,0.6)" : "none",
        transition: "all 0.3s",
      }} />
      <span style={{ fontSize: 10, color: "var(--green)", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>
        LIVE
      </span>
    </span>
  );
}
