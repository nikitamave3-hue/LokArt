import React from "react";

export default function BrandMark({ showLabel = true, compact = false }) {
  return (
    <div className={`brand-mark-row ${compact ? "compact" : ""}`}>
      <div className="brand-mark-badge" aria-label="LokArt logo">
        LA
      </div>
      {showLabel && (
        <div className="brand-mark-copy">
          <strong>LokArt</strong>
          <span>Gaon ki pehchan</span>
        </div>
      )}
    </div>
  );
}
