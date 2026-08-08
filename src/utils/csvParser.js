/**
 * Real-Time Phone normalizer, Google Sheet URL formatter, and Cache-Busting CSV fetcher
 */

export function normalizePhone(phoneStr) {
  if (!phoneStr) return '';
  let digits = String(phoneStr).replace(/\D/g, '');
  if (digits.startsWith('66')) {
    digits = '0' + digits.substring(2);
  }
  return digits;
}

/**
 * Format any raw Google Sheet URL or Sheet ID into a direct CSV endpoint
 */
export function formatGoogleSheetCsvUrl(rawUrlOrId) {
  if (!rawUrlOrId) return '';
  let str = rawUrlOrId.trim();

  // If already a published CSV link
  if (str.includes('/pub') && str.includes('output=csv')) {
    return str;
  }

  // If it's a standard Google Sheet URL (docs.google.com/spreadsheets/d/ID/...)
  if (str.includes('docs.google.com/spreadsheets/d/')) {
    const parts = str.split('/d/');
    if (parts[1]) {
      const sheetId = parts[1].split('/')[0];
      return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
    }
  }

  // If passed only the Sheet ID string
  if (!str.includes('http') && str.length > 15) {
    return `https://docs.google.com/spreadsheets/d/${str}/gviz/tq?tqx=out:csv`;
  }

  return str;
}

/**
 * Fetch live data from Google Sheet with no-store cache busting (Real-Time)
 */
export async function fetchLiveSheetDataRealtime(sheetUrlOrId) {
  const formattedUrl = formatGoogleSheetCsvUrl(sheetUrlOrId);
  if (!formattedUrl) return null;

  // Add cache-busting timestamp parameter to force real-time fetch
  const cacheBuster = formattedUrl.includes('?')
    ? `&t=${Date.now()}`
    : `?t=${Date.now()}`;
  const finalUrl = formattedUrl + cacheBuster;

  const response = await fetch(finalUrl, {
    cache: 'no-store',
    headers: {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const csvText = await response.text();
  return parseCSV(csvText);
}

export function parseCSV(csvText) {
  if (!csvText) return [];
  const lines = csvText.split(/\r\n|\n/);
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]);
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const row = parseCSVLine(lines[i]);
    if (row.length === 0) continue;

    const rawObj = {};
    headers.forEach((header, index) => {
      const key = header.trim();
      rawObj[key] = row[index] ? row[index].trim() : '';
    });

    const normalizedRunner = {
      timestamp: getFieldValue(rawObj, ['Timestamp', 'เวลา', 'วันเวลา']),
      name: getFieldValue(rawObj, ['Name', 'ชื่อ', 'ชื่อ-นามสกุล']),
      mobile: getFieldValue(rawObj, ['Moblie', 'Mobile', 'เบอร์', 'เบอร์โทร', 'เบอร์โทรศัพท์']),
      userType: getFieldValue(rawObj, ['User Type', 'ประเภทผู้สมัคร', 'ประเภท']),
      studentId: getFieldValue(rawObj, ['Student ID', 'รหัสนิสิต']),
      package: getFieldValue(rawObj, ['Package', 'แพ็กเกจ', 'แพ็คเกจ']),
      size: getFieldValue(rawObj, ['Size', 'ไซส์', 'ขนาดเสื้อ']),
      receivingOption: getFieldValue(rawObj, ['Receiving Option', 'ช่องทางการรับเสื้อ', 'วิธีรับเสื้อ']),
      shippingAddress: getFieldValue(rawObj, ['Shipping Address (For Delivery Option)', 'Shipping Address', 'ที่อยู่จัดส่ง', 'ที่อยู่']),
      paymentSlip: getFieldValue(rawObj, ['Payment Slip', 'สลิป', 'หลักฐานการโอนเงิน']),
      status: getFieldValue(rawObj, ['Payment Status', 'Status', 'สถานะการชำระเงิน', 'สถานะ'], 'รอการตรวจสอบ'),
      raw: rawObj
    };

    result.push(normalizedRunner);
  }
  return result;
}

function getFieldValue(obj, possibleKeys, defaultValue = '-') {
  for (const key of possibleKeys) {
    if (obj[key] !== undefined && obj[key] !== '') {
      return obj[key];
    }
  }
  const objKeys = Object.keys(obj);
  for (const pKey of possibleKeys) {
    const matchKey = objKeys.find(k => k.toLowerCase() === pKey.toLowerCase());
    if (matchKey && obj[matchKey] !== '') {
      return obj[matchKey];
    }
  }
  return defaultValue;
}

function parseCSVLine(text) {
  const result = [];
  let start = 0;
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      let field = text.substring(start, i).trim();
      if (field.startsWith('"') && field.endsWith('"')) {
        field = field.substring(1, field.length - 1).replace(/""/g, '"');
      }
      result.push(field);
      start = i + 1;
    }
  }
  let lastField = text.substring(start).trim();
  if (lastField.startsWith('"') && lastField.endsWith('"')) {
    lastField = lastField.substring(1, lastField.length - 1).replace(/""/g, '"');
  }
  result.push(lastField);
  return result;
}

export function cleanGoogleDriveUrl(url) {
  if (!url) return '';
  if (url.includes('drive.google.com/file/d/')) {
    const fileId = url.split('/d/')[1].split('/')[0];
    return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
  }
  return url;
}
