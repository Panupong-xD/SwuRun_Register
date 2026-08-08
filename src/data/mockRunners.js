/**
 * Mock data matching exact 2026 Google Form fields:
 * - Timestamp
 * - Name
 * - Moblie
 * - User Type (General / Student)
 * - Student ID
 * - Package (1 (Only Bib) / 2 (Bib, Medal) / 3 (Bib, Medal, Shirt))
 * - Size (XS / S / M / L / XL / XXL)
 * - Receiving Option (Pick up at university / Delivery)
 * - Shipping Address (For Delivery Option)
 * - Payment Slip
 * - Payment Status
 */

export const MOCK_RUNNERS = [
  {
    timestamp: '2026-08-01 10:15:22',
    name: 'สมชาย วิ่งดี',
    mobile: '0812345678',
    userType: 'Student',
    studentId: '641010099',
    package: '3 (Bib, Medal, Shirt)',
    size: 'L',
    receivingOption: 'Delivery',
    shippingAddress: '123/45 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110',
    paymentSlip: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    status: 'ชำระเงินเรียบร้อยแล้ว',
    bibNumber: 'SWU-2026-0101'
  },
  {
    timestamp: '2026-08-02 14:22:05',
    name: 'กานต์ดา รักสุขภาพ',
    mobile: '0898765432',
    userType: 'General',
    studentId: '-',
    package: '3 (Bib, Medal, Shirt)',
    size: 'M',
    receivingOption: 'Pick up at university',
    shippingAddress: '-',
    paymentSlip: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    status: 'รอการตรวจสอบสลิป',
    bibNumber: 'SWU-2026-0502'
  },
  {
    timestamp: '2026-08-03 09:40:11',
    name: 'ดนัย สกุลทอง',
    mobile: '0921112233',
    userType: 'General',
    studentId: '-',
    package: '2 (Bib, Medal)',
    size: 'XL',
    receivingOption: 'Delivery',
    shippingAddress: '88/9 หมู่ 2 ตำบลบางกระสอ อำเภอเมือง จังหวัดนนทบุรี 11000',
    paymentSlip: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80',
    status: 'จัดส่งพัสดุเรียบร้อยแล้ว (TH019283746)',
    bibNumber: 'SWU-2026-0889'
  },
  {
    timestamp: '2026-08-04 18:05:30',
    name: 'ปรียาภรณ์ มั่งมี',
    mobile: '0654445566',
    userType: 'Student',
    studentId: '651030112',
    package: '1 (Only Bib)',
    size: 'S',
    receivingOption: 'Pick up at university',
    shippingAddress: '-',
    paymentSlip: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    status: 'ชำระเงินเรียบร้อยแล้ว',
    bibNumber: 'SWU-2026-1044'
  }
];
