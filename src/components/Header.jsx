import React from 'react';

export default function Header({ children }) {
  return (
    <header className="event-header">
      {/* Background Banner Layer */}
      <div className="banner-bg"></div>

      <div className="container header-container">
        {/* Brand Logos Bar */}
        <div className="brand-bar">
          {/* Dual Brand Group on Left */}
          <div className="left-brand-group">
            {/* Logo 1: SWU RUN TOGETHER (SWU Gray + Athletic Red) */}
            <div className="brand-logo swu-run-logo">
              <div className="main-title-group">
                <span className="swu-text">SWU</span>
                <span className="run-text">RUN</span>
              </div>
              <span className="sub-title">TOGETHER 2026</span>
            </div>

            <div className="brand-divider"></div>

            {/* Logo 2: SRINAKHARINWIROT ATHLETICS CLUB */}
            <div className="brand-logo swu-club-logo">
              <div className="club-text">
                <span className="club-title">SRINAKHARINWIROT</span>
                <span className="club-sub">ATHLETICS CLUB</span>
              </div>
              <div className="runner-symbol">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d92323" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* Logo 3: 5KM on Right */}
          <div className="brand-logo logo-5km">
            <span>5KM</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="hero-content">
          <h1 className="hero-title">ระบบตรวจสอบสถานะการสั่งซื้อเสื้อวิ่ง</h1>
          <p className="hero-subtitle">
            SWU RUN TOGETHER 2026 | ตรวจสอบสเปกเสื้อ รายละเอียดลงทะเบียน และสถานะชำระเงิน
          </p>
        </div>

        {/* Children (e.g. SearchBar) */}
        {children}
      </div>
    </header>
  );
}
