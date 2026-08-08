/**
 * Application Configuration
 * Real-Time Google Sheet API & Google Form Settings
 */

// Google Sheet Published CSV URL (for real-time order status querying)
export const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || '';

// Google Form URL (for ordering shirts / registering)
export const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || '';
