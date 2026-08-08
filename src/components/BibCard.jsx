import React from 'react';

export default function BibCard({ runner }) {
  if (!runner) return null;

  const {
    name = 'ไม่ระบุชื่อ',
    userType = 'General',
    studentId = '-',
    package: pkg = 'SWU RUN 5KM',
    size = 'L',
    status = 'รอการตรวจสอบ',
    bibNumber = 'SWU-2026-9999'
  } = runner;

  const getStatusFormat = (statusStr) => {
    const s = String(statusStr).toLowerCase();
    if (s.includes('ชำระ') || s.includes('อนุมัติ') || s.includes('เรียบร้อย') || s.includes('confirmed')) {
      return { title: 'ยืนยันการชำระเงินแล้ว', className: 'status-approved' };
    } else if (s.includes('จัดส่ง') || s.includes('shipped') || s.includes('พัสดุ')) {
      return { title: 'จัดส่งพัสดุแล้ว', className: 'status-shipped' };
    } else if (s.includes('ยกเลิก') || s.includes('cancel')) {
      return { title: 'ถูกยกเลิก', className: 'status-rejected' };
    } else {
      return { title: 'รอการตรวจสอบสลิป', className: 'status-pending' };
    }
  };

  const statusMeta = getStatusFormat(status);

  return (
    <article className="bib-card" id="bibCard">
      <div className="bib-header">
        <div className="bib-top-logos">
          <span className="bib-logo-text">SWU RUN TOGETHER</span>
          <span className="bib-event-tag">5KM</span>
        </div>
      </div>

      <div className="bib-body">
        {/* Category & Size */}
        <div className="bib-category-row">
          <span className="bib-category">{pkg}</span>
          <span className="bib-size-pill">{size}</span>
        </div>

        {/* Big BIB Number */}
        <div className="bib-number-display">
          <span className="bib-number">{bibNumber}</span>
        </div>

        {/* Runner Name & Info */}
        <div className="bib-runner-info">
          <span className="bib-runner-name">{name}</span>
          <span className="bib-runner-sub">
            {userType === 'Student' ? `นิสิต (รหัส: ${studentId})` : 'บุคคลทั่วไป'}
          </span>
        </div>

        {/* Status Ribbon */}
        <div className={`bib-status-ribbon ${statusMeta.className}`}>
          <span className="status-text-main">{statusMeta.title}</span>
        </div>
      </div>
    </article>
  );
}
