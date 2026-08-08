/**
 * Application Configuration
 * Real-Time Google Sheet API & Google Form Settings
 */

// Google Sheet Published CSV URL (for real-time order status querying)
export const GOOGLE_SHEET_CSV_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || 'https://docs.google.com/spreadsheets/d/1EivWlwAwzhoMYdj-OT_MfcL-mlVaPUMuFQiAIHGtlJM/edit?usp=sharing';

// Google Form URL (for ordering shirts / registering)
export const GOOGLE_FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSeP-OP7ixNw6rkWrb9c2JQyZQQpDx8-DT6ndHUNtihWhcJagA/viewform?usp=sharing&ouid=106892660776885504222';
