import React, { useState, useEffect } from 'react';
import { X, Link as LinkIcon, RotateCcw } from 'lucide-react';

export default function ConfigModal({ isOpen, currentUrl, onSave, onReset, onClose }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(currentUrl || '');
  }, [currentUrl, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(url.trim());
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <LinkIcon size={18} /> ตั้งค่า Google Sheets (Live Data)
          </h3>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-intro">
            ท่านสามารถดึงข้อมูลจริงจาก Google Sheet (คำตอบจาก Google Form 2026) มาเปิดดูบนเว็บนี้ได้ง่ายๆ โดยทำตาม 3 ขั้นตอน:
          </p>

          <ol className="steps-list">
            <li>เปิด Google Sheet ที่รับคำตอบจาก Google Form</li>
            <li>ไปที่เมนู <strong>ไฟล์ (File)</strong> &gt; <strong>แชร์ (Share)</strong> &gt; <strong>เผยแพร่ไปยังเว็บ (Publish to web)</strong></li>
            <li>เลือกรูปแบบเป็น <strong>Comma-separated values (.csv)</strong> แล้วกด <strong>เผยแพร่ (Publish)</strong> จากนั้นคัดลอกลิงก์มาวางด้านล่าง</li>
          </ol>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sheetUrlInput">Google Sheet Published CSV URL:</label>
              <input
                type="url"
                id="sheetUrlInput"
                className="form-control"
                placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onReset}>
                <RotateCcw size={14} /> กลับไปใช้ข้อมูลตัวอย่าง (Demo Data)
              </button>
              <button type="submit" className="btn-primary">
                บันทึกและใช้ข้อมูลนี้
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
