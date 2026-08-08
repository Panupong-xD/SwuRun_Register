import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BibCard from './components/BibCard';
import OrderDetails from './components/OrderDetails';
import SponsorMarquee from './components/SponsorMarquee';

import { MOCK_RUNNERS } from './data/mockRunners';
import { normalizePhone, fetchLiveSheetDataRealtime } from './utils/csvParser';
import { GOOGLE_SHEET_CSV_URL } from './config/appConfig';

export default function App() {
  const [runners, setRunners] = useState(MOCK_RUNNERS);
  const [activeRunner, setActiveRunner] = useState(null);
  const [searchState, setSearchState] = useState('idle'); // 'idle' | 'loading' | 'found' | 'notfound'
  const [lastQuery, setLastQuery] = useState('');

  // Initial load on mount if Google Sheet URL is configured
  useEffect(() => {
    if (GOOGLE_SHEET_CSV_URL && GOOGLE_SHEET_CSV_URL.trim() !== '') {
      fetchRealtimeData(GOOGLE_SHEET_CSV_URL);
    }
  }, []);

  const fetchRealtimeData = async (url) => {
    try {
      const liveData = await fetchLiveSheetDataRealtime(url);
      if (liveData && liveData.length > 0) {
        setRunners(liveData);
        return liveData;
      }
    } catch (err) {
      console.warn('Realtime fetch warning:', err);
    }
    return runners;
  };

  /**
   * Real-Time Search Handler
   * Triggers a live Google Sheet API fetch on every search click
   */
  const handleSearch = async (query) => {
    setLastQuery(query);
    setSearchState('loading');

    const cleanQuery = normalizePhone(query);

    // 1. Fetch live Google Sheet data in real-time if URL is set
    let currentData = runners;
    if (GOOGLE_SHEET_CSV_URL && GOOGLE_SHEET_CSV_URL.trim() !== '') {
      currentData = await fetchRealtimeData(GOOGLE_SHEET_CSV_URL);
    }

    // 2. Find matching runner by mobile number
    const match = currentData.find((r) => {
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
  };

  const handleClearSearch = () => {
    setActiveRunner(null);
    setSearchState('idle');
    setLastQuery('');
  };

  return (
    <>
      {/* Header wrapping SearchBar for full banner height */}
      <Header>
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      </Header>

      <main className="main-content container">
        {/* Loading State */}
        {searchState === 'loading' && (
          <div className="status-state">
            <div className="spinner"></div>
            <p className="state-text">กำลังดึงข้อมูลล่าสุดจาก Google Sheet...</p>
          </div>
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
