import React from 'react';
import { cleanGoogleDriveUrl } from '../utils/csvParser';

export default function OrderDetails({ runner }) {
  if (!runner) return null;

  const {
    timestamp = '-',
    name = '-',
    mobile = '-',
    userType = '-',
    studentId = '-',
    package: pkg = '-',
    size = '-',
    receivingOption = '-',
    shippingAddress = '-',
    paymentSlip = '',
    status = 'รอการตรวจสอบ'
  } = runner;

  const getBadgeClass = (statusStr) => {
    const s = String(statusStr).toLowerCase();
    if (s.includes('จ่ายแล้ว')) return 'badge-approved';
    if (s.includes('ยกเลิก') || s.includes('cancel')) return 'badge-rejected';
    return 'badge-pending';
  };

  const slipUrl = cleanGoogleDriveUrl(paymentSlip);

  return (
    <article className="order-details-card">
      <header className="details-header">
        <h3 className="details-title">รายละเอียดการสั่งซื้อและลงทะเบียน</h3>
      </header>

      <div className="details-body">
        <dl className="details-list">
          {/* Status */}
          <div className="detail-item full-width highlight-status">
            <dt>สถานะการสั่งซื้อ & ชำระเงิน</dt>
            <dd>
              <span className={`status-badge ${getBadgeClass(status)}`}>
                {status}
              </span>
            </dd>
          </div>

          {/* Name */}
          <div className="detail-item">
            <dt>ชื่อ - นามสกุล</dt>
            <dd>{name}</dd>
          </div>

          {/* Mobile */}
          <div className="detail-item">
            <dt>เบอร์โทรศัพท์</dt>
            <dd>{mobile}</dd>
          </div>

          {/* User Type */}
          <div className="detail-item">
            <dt>ประเภทผู้สมัคร</dt>
            <dd>
              <span className={`user-type-badge ${userType === 'Student' ? 'user-type-student' : 'user-type-general'}`}>
                {userType === 'Student' ? 'นิสิต (Student)' : 'บุคคลทั่วไป (General)'}
              </span>
            </dd>
          </div>

          {/* Student ID - Only show for students */}
          {userType === 'Student' && (
            <div className="detail-item">
              <dt>รหัสนิสิต</dt>
              <dd>{studentId && studentId !== '' && studentId !== '-' ? studentId : '-'}</dd>
            </div>
          )}

          {/* Package */}
          <div className="detail-item">
            <dt>แพ็กเกจ</dt>
            <dd>{pkg}</dd>
          </div>

          {/* Size */}
          <div className="detail-item">
            <dt>ขนาดเสื้อ</dt>
            <dd>
              <span className="size-tag">{size}</span>
            </dd>
          </div>

          {/* Receiving Option */}
          <div className="detail-item">
            <dt>ช่องทางการรับเสื้อ</dt>
            <dd>{receivingOption}</dd>
          </div>

          {/* Timestamp */}
          <div className="detail-item">
            <dt>วัน-เวลาที่สั่งซื้อ</dt>
            <dd>{timestamp}</dd>
          </div>

          {/* Shipping Address */}
          <div className="detail-item">
            <dt>ที่อยู่จัดส่ง</dt>
            <dd className="address-text">{shippingAddress || '-'}</dd>
          </div>

          {/* Payment Slip */}
          <div className="detail-item full-width">
            <dt>หลักฐานการชำระเงิน</dt>
            <dd>
              {paymentSlip && paymentSlip !== '-' && paymentSlip.trim() !== '' ? (
                <a
                  href={slipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-preview-slip"
                >
                  ดูหลักฐานการโอนเงิน ↗
                </a>
              ) : (
                <span className="no-slip-text">ไม่มีการแนบสลิป</span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
