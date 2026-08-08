import React from 'react';
import { SPONSOR_LOGOS } from '../config/sponsors';

export default function SponsorMarquee() {
  if (!SPONSOR_LOGOS || SPONSOR_LOGOS.length === 0) return null;

  // Duplicate list twice for seamless 50% infinite translation loop
  const marqueeSet = [...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS];

  return (
    <footer className="sponsor-footer">
      <div className="sponsor-marquee-header">
        <span className="marquee-title">OFFICIAL SPONSORS & PARTNERS</span>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeSet.map((item, idx) => (
            <div className="sponsor-logo-item" key={`${item.id}-${idx}`}>
              <img
                src={item.logoUrl}
                alt={item.name}
                className="sponsor-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2026 Srinakharinwirot Athletics Club | SWU RUN TOGETHER. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
