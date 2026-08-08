import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BibCard from './components/BibCard';
import OrderDetails from './components/OrderDetails';
import SponsorMarquee from './components/SponsorMarquee';

import { MOCK_RUNNERS } from './data/mockRunners';
import { normalizePhone, parseCSV } from './utils/csvParser';
import { GOOGLE_SHEET_CSV_URL } from './config/appConfig';

export default function App() {
  const [runners, setRunners] = useState(MOCK_RUNNERS);
  const [activeRunner, setActiveRunner] = useState(null);
  const [searchState, setSearchState] = useState('idle'); // 'idle' | 'loading' | 'found' | 'notfound'
  const [lastQuery, setLastQuery] = useState('');

  // Load Google Sheet CSV if URL is configured in appConfig.js or .env
  useEffect(() => {
    if (GOOGLE_SHEET_CSV_URL && GOOGLE_SHEET_CSV_URL.trim() !== '') {
      fetchLiveSheetData(GOOGLE_SHEET_CSV_URL);
    }
  }, []);

  const fetchLiveSheetData = async (url) => {
    try {
      const res = await fetch(url);
      const csvText = await res.text();
      const parsedData = parseCSV(csvText);
      if (parsedData && parsedData.length > 0) {
        setRunners(parsedData);
      }
    } catch (err) {
      console.error('Fetch Google Sheet Error:', err);
    }
  };

  const handleSearch = (query) => {
    setLastQuery(query);
    setSearchState('loading');

    const cleanQuery = normalizePhone(query);

    setTimeout(() => {
      const match = runners.find((r) => {
        const itemMobile = normalizePhone(r.mobile);
        return itemMobile && (itemMobile === cleanQuery || itemMobile.endsWith(cleanQuery) || cleanQuery.endsWith(itemMobile));
      });

      if (match) {
        setActiveRunner(match);
        setSearchState('found');
      } else {
        setActiveRunner(null);
        setSearchState('notfound');
      }
    }, 250);
  };

  const handleClearSearch = () => {
    setActiveRunner(null);
    setSearchState('idle');
    setLastQuery('');
  };

  return (
    <>
      {/* Event Header & Wide Panoramic Watercolor Banner */}
      <Header />

      <main className="main-content container">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

        {/* Loading State */}
        {searchState === 'loading' && (
          <div className="status-state">
            <div className="spinner"></div>
            <p className="state-text">กำลังค้นหาข้อมูล...</p>
          </div>
        )}

        {/* Welcome State */}
        {searchState === 'idle' && (
          <section className="status-state">
            <div className="welcome-card">
              <h2>ระบบตรวจสอบสถานะการสั่งซื้อเสื้อวิ่ง</h2>
              <p>
                กรอกเบอร์โทรศัพท์ที่ลงทะเบียนไว้เพื่อตรวจสอบสเปกเสื้อ รายละเอียดลงทะเบียน
                และสถานะการชำระเงินงาน SWU RUN TOGETHER 2026
              </p>
            </div>
          </section>
        )}

        {/* Not Found State */}
        {searchState === 'notfound' && (
          <section className="status-state">
            <div className="notfound-card">
              <h2>ไม่พบข้อมูลการสั่งซื้อ</h2>
              <p>ไม่พบข้อมูลผู้ลงทะเบียนสำหรับเบอร์ "{lastQuery}" กรุณาตรวจสอบเบอร์โทรศัพท์อีกครั้ง</p>
            </div>
          </section>
        )}

        {/* Found Result State */}
        {searchState === 'found' && activeRunner && (
          <section className="result-section">
            <div className="result-actions">
              <span className="found-badge">พบข้อมูลการสั่งซื้อ</span>
            </div>

            <div className="result-grid">
              {/* Left Column: Athletic Digital BIB Card */}
              <BibCard runner={activeRunner} />

              {/* Right Column: Full Order Details */}
              <OrderDetails runner={activeRunner} />
            </div>
          </section>
        )}
      </main>

      {/* Real Image Sponsor Marquee Footer */}
      <SponsorMarquee />
    </>
  );
}
