/**
 * Application Configuration
 * To use your real Google Sheet (from Google Form 2026):
 * 1. Open your Google Sheet -> File -> Share -> Publish to web
 * 2. Select CSV format and click Publish
 * 3. Paste the CSV URL below or set VITE_GOOGLE_SHEET_CSV_URL in your .env file
 */

export const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || '';
