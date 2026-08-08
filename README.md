# 🏃 SWU RUN TOGETHER 2026 - Order Status & Registration Checker

ระบบเว็บแอปพลิเคชันสำหรับตรวจสอบสถานะการสั่งซื้อเสื้อวิ่งและสถานะการชำระเงิน งาน **SWU RUN TOGETHER 2026** (ชมรมกรีฑา มหาวิทยาลัยศรีนครินทรวิโรฒ) เชื่อมต่อข้อมูลจาก **Google Sheets (Google Form Responses)** แบบ **Real-time 100%** 

---

## 🌟 ฟีเจอร์หลัก (Features)

- ⚡ **Real-Time Google Sheet API Integration**: ดึงข้อมูลสดตรงจาก Google Sheet ทุกครั้งที่กดค้นหาเบอร์โทรศัพท์ (Cache-Busting) ผู้สมัครใหม่หรือแอดมินแก้ไขข้อมูลจะเห็นผลลัพธ์ทันทีโดยไม่ต้องรีเฟรชหน้าเว็บ
- 📱 **Phone Search & Normalizer**: ระบบค้นหาด้วยเบอร์โทรศัพท์ กรอกเบอร์ได้หลากรูปแบบ (`0812345678`, `081-234-5678`, `081 234 5678`, `+66...`)
- 🏃 **Athletic Digital Runner BIB Ticket**: แสดงการ์ด BIB ประจำตัวผู้สมัคร หมายเลข BIB, ไซส์เสื้อ, แพ็กเกจ และป้ายสถานะการชำระเงิน
- 📋 **Complete 10-Field Order Breakdown**: แสดงรายละเอียดข้อมูลครบถ้วนทั้ง 10 ฟิลด์ตรงตามหน้า Google Form 2026 (`Timestamp`, `Name`, `Moblie`, `User Type`, `Student ID`, `Package`, `Size`, `Receiving Option`, `Shipping Address`, `Payment Slip`)
- 🛒 **Direct Google Form Link**: ปุ่ม Call-to-Action "สั่งซื้อเสื้อวิ่ง / ลงทะเบียน" เพื่อเปิดหน้า Google Form สั่งซื้อเสื้อวิ่งได้ทันที
- 🎨 **Full-Page Subtle Backdrop & SWU Brand Identity**: ธีมภาพวาดสีน้ำป่าสนและทิวเขาธรรมชาติซ้อนเป็น Wallpaper จางๆ ครอบคลุมทั้งหน้าเพจ พร้อมใช้สีเทา-แดง อัตลักษณ์ มศว (SWU Gray & Athletic Red)
- 🔄 **Jitter-Free Sponsor Marquee**: แถบโลโก้สปอนเซอร์แบบรูปภาพจริง (`<img>`) เลื่อนวนลูปแบบต่อเนื่อง ลื่นไหล ไร้อาการกระตุก

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

- **Core Framework**: React (Vite)
- **Styling**: Vanilla CSS (Custom Design System, CSS Grid & Flexbox, CSS Keyframes)
- **Icons**: Lucide React Icons
- **Data Parser**: Custom CSV & Real-time Fetcher (`no-store` cache policy)

---

## 🚀 วิธีการติดตั้งและเปิดใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันในโหมดพัฒนา (Development Mode)
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

### 3. Build สำหรับนำไปใช้งานจริง (Production Build)
```bash
npm run build
```
ไฟล์ Production จะถูกสร้างในโฟลเดอร์ `dist/` สามารถนำไปเซิร์ฟบน Web Hosting (เช่น Vercel, Netlify, Cloudflare Pages, GitHub Pages) ได้ทันที

---

## 🔗 วิธีการเชื่อมต่อกับ Google Sheet จริง (Step-by-Step)

1. เปิด Google Sheet ที่เก็บคำตอบจาก Google Form 2026 ของท่าน
2. ไปที่เมนู **ไฟล์ (File)** &gt; **แชร์ (Share)** &gt; **เผยแพร่ไปยังเว็บ (Publish to web)**
3. เลือกชีตที่ต้องการ เลือกรูปแบบเป็น **Comma-separated values (.csv)** แล้วกด **เผยแพร่ (Publish)**
4. คัดลอกลิงก์ CSV มาวางในไฟล์ [`src/config/appConfig.js`](src/config/appConfig.js):

```javascript
// src/config/appConfig.js
export const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?output=csv";
export const GOOGLE_FORM_URL = "https://forms.google.com/...";
```

หรือสร้างไฟล์ `.env` ที่ Root โฟลเดอร์:
```env
VITE_GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/.../pub?output=csv
VITE_GOOGLE_FORM_URL=https://forms.google.com/...
```

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
Swurun/
├── public/
│   └── images/
│       ├── banner_panoramic.jpg   # Full-page Subtle Background Wallpaper
│       └── sponsors/              # โฟลเดอร์ใส่รูปภาพโลโก้แบรนด์สปอนเซอร์ (.png, .svg)
├── src/
│   ├── components/
│   │   ├── Header.jsx             # โลโก้แบรนด์ดิ้ง + หัวข้อระบบ + ปุ่มสั่งซื้อ Google Form
│   │   ├── SearchBar.jsx          # ช่องค้นหาเบอร์โทรศัพท์
│   │   ├── BibCard.jsx            # การ์ด BIB ดิจิทัลประจำตัวผู้สมัคร
│   │   ├── OrderDetails.jsx       # ตารางสรุปรายละเอียด 10 ฟิลด์
│   │   └── SponsorMarquee.jsx     # แถบสไลด์โลโก้สปอนเซอร์วนลูป
│   ├── config/
│   │   ├── appConfig.js           # ตั้งค่า Google Sheet CSV URL & Google Form Link
│   │   └── sponsors.js            # รายชื่อและตำแหน่งไฟล์โลโก้สปอนเซอร์
│   ├── data/
│   │   └── mockRunners.js        # ข้อมูลตัวอย่างทดสอบสำรอง (Fallback)
│   ├── utils/
│   │   └── csvParser.js          # ระบบ Real-Time Fetcher & CSV Parser
│   ├── App.jsx                    # Main App Container & State Management
│   └── index.css                  # Design Tokens & Stylesheet
├── index.html
├── package.json
└── README.md
```

---

## 📜 ลิขสิทธิ์ (Copyright)

© 2026 Srinakharinwirot Athletics Club | SWU RUN TOGETHER. All Rights Reserved.
