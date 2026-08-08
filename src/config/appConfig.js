/**
 * Application Configuration
 * Real-Time Google Sheet API Settings
 *
 * How to connect your live Google Sheet (from Google Form 2026):
 * Option A (Published CSV):
 * 1. Open Google Sheet -> File -> Share -> Publish to web
 * 2. Select 'Comma-separated values (.csv)' -> Publish
 * 3. Paste the URL into GOOGLE_SHEET_CSV_URL below or set VITE_GOOGLE_SHEET_CSV_URL in .env
 *
 * Option B (Public Sheet ID):
 * Paste your Google Sheet ID (e.g. '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms')
 */

export const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || 'https://docs.google.com/spreadsheets/d/1EivWlwAwzhoMYdj-OT_MfcL-mlVaPUMuFQiAIHGtlJM/edit?usp=sharing';
