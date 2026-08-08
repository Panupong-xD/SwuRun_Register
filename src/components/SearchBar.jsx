import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, onClear }) {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    onSearch(phone.trim());
  };

  const handleClear = () => {
    setPhone('');
    onClear();
  };

  return (
    <section className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="searchInput" className="search-label">
          กรอกเบอร์โทรศัพท์ที่ใช้ลงทะเบียน
        </label>

        <div className="search-input-wrapper">
          <input
            type="tel"
            id="searchInput"
            className="search-input"
            placeholder="เช่น 081-234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength={15}
          />

          {phone && (
            <button
              type="button"
              className="btn-clear-input"
              onClick={handleClear}
              title="ล้างข้อความ"
            >
              <X size={14} />
            </button>
          )}

          <button type="submit" className="btn-search">
            <span>ค้นหา</span>
            <Search size={15} />
          </button>
        </div>
      </form>
    </section>
  );
}
