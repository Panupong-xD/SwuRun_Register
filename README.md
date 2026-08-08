# SWU RUN TOGETHER 2026 - Order Status & Runner Registration Checker

A lightweight, modern web application for checking shirt order statuses, registration details, and payment statuses for the **SWU RUN TOGETHER 2026** event organized by the Srinakharinwirot University Athletics Club. The application integrates directly with **Google Sheets (Google Form Responses)** for **100% real-time** data lookup.

---

## Key Features

- **Real-Time Google Sheets Integration**: Fetches live data from Google Sheets on every phone search with cache-busting (`no-store` policy). Any update made by administrators or new Google Form submissions are instantly reflected without reloading the page.
- **Flexible Phone Search**: Normalizes input numbers automatically (supports formats like `0812345678`, `081-234-5678`, `081 234 5678`, or `+66...`).
- **Athletic Digital Runner BIB**: Renders a dynamic digital BIB ticket displaying BIB number, shirt size, selected package, runner name, and real-time payment status.
- **Complete Order Breakdown**: Displays all 10 response fields matching the 2026 Google Form (`Timestamp`, `Name`, `Mobile`, `User Type`, `Student ID`, `Package`, `Size`, `Receiving Option`, `Shipping Address`, and `Payment Slip`).
- **Direct Google Form Link**: Features an integrated Call-To-Action button redirecting users to the official Google Form for ordering running shirts or registering.
- **SWU Brand Identity & Aesthetics**: Styled with SWU Gray and Athletic Red accents paired with a full-page subtle pine forest backdrop.
- **Smooth Sponsor Marquee**: An infinite, jitter-free sponsor logo ticker powered by hardware-accelerated CSS animations.

---

## Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Vanilla CSS (Custom Design System, CSS Grid & Flexbox, Keyframe Animations)
- **Icons**: Lucide React Icons
- **Data Fetcher & Parser**: Native Fetch API with `no-store` cache control & Custom CSV Parser

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

3. Build for production:
   ```bash
   npm run build
   ```
   Production artifacts will be generated in the `dist/` directory, ready to deploy to web hosting platforms (such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages).

---

## Google Sheets Integration Setup

Follow these steps to connect the app to your live Google Sheet (Google Form responses):

1. Open your Google Sheet containing the Google Form responses.
2. Go to **File** > **Share** > **Publish to web**.
3. Select the target sheet, set the export format to **Comma-separated values (.csv)**, and click **Publish**.
4. Copy the published CSV URL and add it to [`src/config/appConfig.js`](src/config/appConfig.js):

```javascript
// src/config/appConfig.js
export const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?output=csv";
export const GOOGLE_FORM_URL = "https://forms.google.com/...";
```

Alternatively, create a `.env` file in the project root:

```env
VITE_GOOGLE_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?output=csv
VITE_GOOGLE_FORM_URL=https://forms.google.com/...
```

---

## Project Structure

```
SwuRun_Register/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── banner_panoramic.jpg   # Full-page background wallpaper
│       └── sponsors/              # Official sponsor logo assets (.png, .svg)
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Brand logos, hero title, and Google Form CTA
│   │   ├── SearchBar.jsx          # Phone number search form
│   │   ├── BibCard.jsx            # Dynamic digital runner BIB ticket
│   │   ├── OrderDetails.jsx       # 10-field order breakdown table
│   │   ├── SponsorMarquee.jsx     # Infinite scrolling sponsor marquee
│   │   ├── ConfigModal.jsx        # Google Sheets live URL configuration modal
│   │   └── SlipModal.jsx          # Payment slip image preview modal
│   ├── config/
│   │   ├── appConfig.js           # Google Sheet CSV & Google Form configuration
│   │   └── sponsors.js            # Sponsor logo registry
│   ├── data/
│   │   └── mockRunners.js        # Fallback demonstration data
│   ├── utils/
│   │   └── csvParser.js          # Real-time CSV fetcher & data normalizer
│   ├── App.jsx                    # Main application container & state management
│   ├── index.css                  # Custom design system & stylesheet
│   └── main.jsx                   # React application entry point
├── index.html
├── package.json
└── README.md
```

---

## License & Copyright

© 2026 Srinakharinwirot Athletics Club | SWU RUN TOGETHER. All Rights Reserved.
