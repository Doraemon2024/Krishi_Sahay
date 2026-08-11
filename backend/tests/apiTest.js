const http = require('http');

/**
 * Self-Contained Backend API Test Runner
 */
const BASE_URL = 'http://localhost:5000';

function makeRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    }).on('error', (err) => reject(err));
  });
}

async function runTests() {
  console.log('🧪 Starting KrishiSahay Backend API Verification Suite...\n');

  const endpoints = [
    '/api/health',
    '/api/diagnoses',
    '/api/weather?location=punjab',
    '/api/recommendations',
    '/api/helplines',
    '/api/insurance',
    '/api/awareness',
    '/api/privacy'
  ];

  let passed = 0;
  let failed = 0;

  for (const endpoint of endpoints) {
    try {
      const res = await makeRequest(endpoint);
      if (res.status === 200 && (res.body.success || res.body.status === 'OK')) {
        console.log(`✅ [PASS] ${endpoint} -> Status 200 OK`);
        passed++;
      } else {
        console.log(`❌ [FAIL] ${endpoint} -> Status ${res.status}`);
        failed++;
      }
    } catch (err) {
      console.log(`❌ [ERROR] ${endpoint} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\n==================================================`);
  console.log(`📊 Test Summary: ${passed} PASSED, ${failed} FAILED out of ${endpoints.length} Endpoints`);
  console.log(`==================================================`);
}

runTests();
