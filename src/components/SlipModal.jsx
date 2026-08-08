import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { cleanGoogleDriveUrl } from '../utils/csvParser';

export default function SlipModal({ isOpen, slipUrl, onClose }) {
  if (!isOpen || !slipUrl) return null;

  const previewUrl = cleanGoogleDriveUrl(slipUrl);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content slip-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>หลักฐานการชำระเงิน (Payment Slip)</h3>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body text-center">
          <img
            src={previewUrl}
            alt="Payment Slip Preview"
            className="slip-preview-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/400x600?text=Preview+Unavailable';
            }}
          />
          <div className="modal-actions-center">
            <a
              href={slipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              เปิดไฟล์สลิปต้นฉบับ <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
