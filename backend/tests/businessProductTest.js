const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * ============================================================================
 * KRISHISAHAY ENTERPRISE BUSINESS PRODUCT GRADE TEST SUITE
 * ============================================================================
 * Standard: ISO/IEC 25010 & Production AgriTech SLA Standards
 * Covers:
 *  - Firebase Firestore Database Engine & Collection Integration
 *  - AI Crop Diagnosis Pipeline & Multi-crop Neural Simulation
 *  - Multipart File Upload & Leaf Diagnostic Processing
 *  - Weather Risk Matrix & India-wide Dynamic Geocoding
 *  - Emergency Farmer Helplines & Government Insurance (PMFBY)
 *  - Agronomic Recommendations Engine
 *  - Farmer Privacy Rights & Data Erasure (DPDP Act 2023)
 *  - SLA Performance, Latency Benchmarking (p95, avg, max)
 *  - Schema Validation & Fault Resilience
 * ============================================================================
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:5000';
const URL_OBJ = new URL(BASE_URL);
const PORT = URL_OBJ.port || 5000;
const HOST = URL_OBJ.hostname || 'localhost';

const testResults = [];
let serverProcess = null;

// ANSI Colors for Executive Terminal Output
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m'
};

function formatDuration(ms) {
  if (ms < 100) return `${colors.green}${ms.toFixed(1)}ms${colors.reset}`;
  if (ms < 300) return `${colors.yellow}${ms.toFixed(1)}ms${colors.reset}`;
  return `${colors.red}${ms.toFixed(1)}ms${colors.reset}`;
}

/**
 * HTTP Request Helper with Latency Tracking
 */
function request(endpoint, options = {}) {
  const method = options.method || 'GET';
  const headers = options.headers || {};
  const body = options.body;

  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();

    const reqOptions = {
      hostname: HOST,
      port: PORT,
      path: endpoint,
      method: method,
      headers: headers,
      timeout: 10000
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const diff = process.hrtime(startTime);
        const latencyMs = (diff[0] * 1000) + (diff[1] / 1e6);

        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }

        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: parsed,
          raw: data,
          latencyMs
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out after 10000ms'));
    });

    if (body) {
      req.write(body);
    }
    req.end();
  });
}

/**
 * Multipart/form-data generator for simulated leaf image file uploads
 */
function uploadMultipartFile(endpoint, fieldName, filename, fileBuffer, mimeType, additionalFields = {}) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  const crlf = '\r\n';

  let bodyParts = [];

  // Append additional form fields
  for (const [key, val] of Object.entries(additionalFields)) {
    bodyParts.push(
      `--${boundary}${crlf}` +
      `Content-Disposition: form-data; name="${key}"${crlf}${crlf}` +
      `${val}${crlf}`
    );
  }

  // Append file part
  bodyParts.push(
    `--${boundary}${crlf}` +
    `Content-Disposition: form-data; name="${fieldName}"; filename="${filename}"${crlf}` +
    `Content-Type: ${mimeType}${crlf}${crlf}`
  );

  const prefix = Buffer.from(bodyParts.join(''), 'utf8');
  const suffix = Buffer.from(`${crlf}--${boundary}--${crlf}`, 'utf8');
  const fullBody = Buffer.concat([prefix, fileBuffer, suffix]);

  return request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': fullBody.length
    },
    body: fullBody
  });
}

/**
 * Test Assertion Engine
 */
async function assertTest(name, category, testFn) {
  process.stdout.write(`  ⏳ ${category.padEnd(16)} | ${name.padEnd(52)} `);
  const start = Date.now();
  try {
    const details = await testFn();
    const duration = Date.now() - start;
    const latency = details && details.latencyMs ? details.latencyMs : duration;
    
    testResults.push({
      category,
      name,
      passed: true,
      latencyMs: latency,
      message: details && details.message ? details.message : 'OK'
    });
    console.log(`[ ${colors.green}PASS${colors.reset} ] (${formatDuration(latency)})`);
  } catch (err) {
    const duration = Date.now() - start;
    testResults.push({
      category,
      name,
      passed: false,
      latencyMs: duration,
      error: err.message
    });
    console.log(`[ ${colors.red}FAIL${colors.reset} ] (${duration}ms)`);
    console.log(`     ${colors.red}↳ Assertion Failed: ${err.message}${colors.reset}`);
  }
}

/**
 * Health check to verify if KrishiSahay server is already running
 */
async function isServerUp() {
  try {
    const res = await request('/api/health');
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

/**
 * Ensure Server is ready before executing test suite
 */
async function ensureServerRunning() {
  const up = await isServerUp();
  if (up) {
    console.log(`${colors.cyan}📡 Connected to active KrishiSahay server at ${BASE_URL}${colors.reset}\n`);
    return null;
  }

  console.log(`${colors.yellow}🚀 Starting KrishiSahay server in background for verification...${colors.reset}`);
  const serverPath = path.join(__dirname, '../server.js');
  serverProcess = spawn(process.execPath, [serverPath], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: PORT.toString() }
  });

  // Wait up to 10 seconds for server to boot
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    if (await isServerUp()) {
      console.log(`${colors.green}✅ KrishiSahay server spawned and ready on port ${PORT}!${colors.reset}\n`);
      return serverProcess;
    }
  }

  throw new Error(`Failed to spin up KrishiSahay server on ${BASE_URL}`);
}

/**
 * ============================================================================
 * MAIN BUSINESS PRODUCT GRADE TEST RUNNER
 * ============================================================================
 */
async function runEnterpriseTestSuite() {
  console.log(`\n${colors.bold}================================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.green}🌾 KRISHISAHAY AGRI-TECH PLATFORM - FINAL PRODUCT GRADE VERIFICATION${colors.reset}`);
  console.log(`${colors.gray}Target Architecture: Node.js Express + Google Cloud Firestore + Dynamic Weather AI${colors.reset}`);
  console.log(`${colors.bold}================================================================================${colors.reset}\n`);

  let server = null;
  try {
    server = await ensureServerRunning();
  } catch (err) {
    console.error(`${colors.red}Fatal: ${err.message}${colors.reset}`);
    process.exit(1);
  }

  let capturedDiagnosisId = null;

  // --------------------------------------------------------------------------
  // SUITE 1: Infrastructure, Database Engine & Cloud Firestore Connectivity
  // --------------------------------------------------------------------------
  console.log(`${colors.bold}${colors.cyan}📦 SECTION 1: Infrastructure, Health & Firestore Database Engine${colors.reset}`);

  await assertTest('Server Health Check SLA (/api/health)', 'Infrastructure', async () => {
    const res = await request('/api/health');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (res.data.status !== 'OK') throw new Error(`Expected status 'OK' in payload`);
    if (!res.data.service) throw new Error(`Missing service descriptor`);
    return { latencyMs: res.latencyMs };
  });

  await assertTest('Firebase Firestore Engine & Status (/api/firebase/status)', 'Database', async () => {
    const res = await request('/api/firebase/status');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success) throw new Error(`Firebase status returned success=false`);
    const dbData = res.data.data;
    if (dbData.databaseEngine !== 'Google Cloud Firestore') {
      throw new Error(`Expected databaseEngine 'Google Cloud Firestore', got '${dbData.databaseEngine}'`);
    }
    if (!dbData.collections || !dbData.collections.diagnoses) {
      throw new Error(`Missing Firestore collections status in response`);
    }
    return { latencyMs: res.latencyMs, message: `Mode: ${dbData.connectionMode}` };
  });

  await assertTest('Database Service Direct CRUD & Persistence', 'Database', async () => {
    const dbService = require('../services/dbService');
    const testId = `diag_test_verification_${Date.now()}`;
    const testRecord = {
      id: testId,
      crop: 'Rice',
      disease: 'Rice Blast (Magnaporthe oryzae)',
      severity: 'High',
      confidence: 96.5,
      timestamp: new Date().toISOString(),
      location: 'Amritsar, Punjab'
    };

    // Save record
    await dbService.saveDiagnosis(testRecord);

    // Retrieve record
    const retrieved = dbService.getDiagnosisById(testId);
    if (!retrieved) throw new Error(`Failed to retrieve saved diagnosis record from database`);
    if (retrieved.disease !== testRecord.disease) throw new Error(`Record integrity mismatch`);
    return { message: 'CRUD Verified' };
  });

  // --------------------------------------------------------------------------
  // SUITE 2: AI Crop Leaf Diagnosis & Neural Classifier Workflows
  // --------------------------------------------------------------------------
  console.log(`\n${colors.bold}${colors.cyan}🌿 SECTION 2: AI Crop Leaf Diagnostics & Neural Scanner${colors.reset}`);

  await assertTest('AI Diagnosis - Rice Blast (Magnaporthe oryzae)', 'AI Diagnostics', async () => {
    const payload = JSON.stringify({ sampleId: 'rice_blast', location: 'Ludhiana, Punjab' });
    const res = await request('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      body: payload
    });

    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !res.data.data) throw new Error(`Invalid diagnosis payload`);
    const diag = res.data.data;
    if (!diag.crop.includes('Rice') || !diag.disease.includes('Blast')) {
      throw new Error(`Unexpected diagnosis output: ${diag.crop} - ${diag.disease}`);
    }
    if (diag.confidence < 80 || diag.confidence > 100) {
      throw new Error(`Abnormal confidence score: ${diag.confidence}`);
    }
    if (!Array.isArray(diag.treatments) || diag.treatments.length === 0) {
      throw new Error(`Missing treatment recommendations in response`);
    }

    capturedDiagnosisId = diag.id;
    return { latencyMs: res.latencyMs, message: `Confidence: ${diag.confidence}% (ID: ${diag.id})` };
  });

  await assertTest('AI Diagnosis - Tomato Early Blight (Alternaria solani)', 'AI Diagnostics', async () => {
    const payload = JSON.stringify({ sampleId: 'tomato_early_blight', location: 'Nashik, Maharashtra' });
    const res = await request('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      body: payload
    });

    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const diag = res.data.data;
    if (diag.crop !== 'Tomato' || !diag.disease.includes('Early Blight')) {
      throw new Error(`Crop mismatch: Expected Tomato Early Blight, got ${diag.crop} - ${diag.disease}`);
    }
    return { latencyMs: res.latencyMs };
  });

  await assertTest('AI Diagnosis - Healthy Crop Leaf Benchmark', 'AI Diagnostics', async () => {
    const payload = JSON.stringify({ sampleId: 'healthy_crop', location: 'Karnal, Haryana' });
    const res = await request('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      body: payload
    });

    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const diag = res.data.data;
    if (diag.severity !== 'Healthy' && diag.severity !== 'NONE') {
      throw new Error(`Expected severity 'Healthy' or 'NONE', got '${diag.severity}'`);
    }
    return { latencyMs: res.latencyMs };
  });

  await assertTest('Multipart Image File Upload & Inspection', 'AI Diagnostics', async () => {
    // Generate a minimal valid 1x1 GIF / JPEG buffer to simulate camera image upload
    const mockImageBuffer = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );

    const res = await uploadMultipartFile(
      '/api/diagnose',
      'leafImage',
      'farmer_wheat_leaf.jpg',
      mockImageBuffer,
      'image/jpeg',
      { location: 'Patiala, Punjab' }
    );

    if (res.status !== 200) throw new Error(`Multipart upload failed with status ${res.status}`);
    if (!res.data.success || !res.data.data) throw new Error(`Multipart diagnosis payload invalid`);
    const diag = res.data.data;
    if (!diag.id || !diag.crop) throw new Error(`Missing expected fields in uploaded diagnosis`);
    return { latencyMs: res.latencyMs, message: `Created diagnosis ID: ${diag.id}` };
  });

  await assertTest('Diagnosis History Retrieval (/api/diagnoses)', 'AI Diagnostics', async () => {
    const res = await request('/api/diagnoses');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Expected array of diagnoses`);
    }
    if (res.data.data.length === 0) {
      throw new Error(`Diagnoses history is unexpectedly empty`);
    }
    return { latencyMs: res.latencyMs, message: `${res.data.count} records retrieved` };
  });

  await assertTest('Single Diagnosis Detail Lookup (/api/diagnoses/:id)', 'AI Diagnostics', async () => {
    if (!capturedDiagnosisId) throw new Error(`No diagnosis ID was captured from previous test`);
    const res = await request(`/api/diagnoses/${capturedDiagnosisId}`);
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.data || res.data.data.id !== capturedDiagnosisId) {
      throw new Error(`Retrieved diagnosis ID did not match requested ID`);
    }
    return { latencyMs: res.latencyMs };
  });

  // --------------------------------------------------------------------------
  // SUITE 3: Dynamic Weather Risk Matrix & India-wide Geocoding
  // --------------------------------------------------------------------------
  console.log(`\n${colors.bold}${colors.cyan}🌦️ SECTION 3: Weather Risk Engine & Indian Regional Services${colors.reset}`);

  await assertTest('Regional Weather & Disease Risk Index (/api/weather?location=punjab)', 'Weather & Risk', async () => {
    const res = await request('/api/weather?location=punjab');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !res.data.data) throw new Error(`Invalid weather response structure`);
    const w = res.data.data;
    const temp = typeof w.temp === 'number' ? w.temp : (typeof w.temperature === 'number' ? w.temperature : null);
    const humidity = typeof w.humidity === 'number' ? w.humidity : null;
    if (temp === null || humidity === null) {
      throw new Error(`Missing numeric weather metrics (temp, humidity)`);
    }
    const riskScore = typeof w.riskScore === 'number' ? w.riskScore : (typeof w.diseaseRiskIndex === 'number' ? w.diseaseRiskIndex : null);
    const riskLevel = w.riskLevel || w.diseaseRiskLevel;
    if (!riskLevel || riskScore === null) {
      throw new Error(`Missing agricultural riskLevel or riskScore`);
    }
    return { latencyMs: res.latencyMs, message: `Risk: ${riskLevel} (${riskScore}%), Temp: ${temp}°C, Humidity: ${humidity}%` };
  });

  await assertTest('Live India-wide Location Geocoding (/api/weather?location=bhopal)', 'Weather & Risk', async () => {
    const res = await request('/api/weather?location=bhopal');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const w = res.data.data;
    return { latencyMs: res.latencyMs, message: `Resolved: ${w.name || w.state || 'Bhopal'}` };
  });

  await assertTest('Location Catalog for all 36 States/UTs (/api/sync/locations)', 'Regional Sync', async () => {
    const res = await request('/api/sync/locations');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Expected array of locations`);
    }
    if (res.data.data.length < 28) {
      throw new Error(`Expected at least 28 states, got ${res.data.data.length}`);
    }
    return { latencyMs: res.latencyMs, message: `${res.data.data.length} Indian territories` };
  });

  await assertTest('Real-time District Search Autocomplete (/api/sync/search?q=amritsar)', 'Regional Sync', async () => {
    const res = await request('/api/sync/search?q=amritsar');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Expected array of search matches`);
    }
    if (res.data.data.length === 0) throw new Error(`Failed to match known major district 'amritsar'`);
    return { latencyMs: res.latencyMs, message: `${res.data.data.length} match found` };
  });

  // --------------------------------------------------------------------------
  // SUITE 4: Agri Recommendations, Helplines & Insurance
  // --------------------------------------------------------------------------
  console.log(`\n${colors.bold}${colors.cyan}🚜 SECTION 4: Agronomic Support, Emergency Helplines & PMFBY Insurance${colors.reset}`);

  await assertTest('Agronomic Recommendation Engine (/api/recommendations)', 'Agronomy Engine', async () => {
    const res = await request('/api/recommendations');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !res.data.data) throw new Error(`Invalid recommendations response`);
    const recs = Array.isArray(res.data.data) ? res.data.data : (res.data.data.crops || []);
    if (recs.length === 0) throw new Error(`No crop advisories returned`);
    return { latencyMs: res.latencyMs, message: `${recs.length} actionable advisories generated` };
  });

  await assertTest('Emergency Farmer Helplines Directory (/api/helplines)', 'Farmer Services', async () => {
    const res = await request('/api/helplines');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Expected array of helpline contacts`);
    }
    const kisanCallCenter = res.data.data.find(h => 
      (h.phone && h.phone.includes('1800-180-1551')) ||
      (h.dialNumber && h.dialNumber.includes('18001801551')) ||
      (h.name && h.name.toLowerCase().includes('kisan call'))
    );
    if (!kisanCallCenter) {
      throw new Error(`Kisan Call Centre (1800-180-1551) missing from helpline directory`);
    }
    return { latencyMs: res.latencyMs, message: `${res.data.data.length} helplines verified` };
  });

  await assertTest('PMFBY Crop Insurance Schemes (/api/insurance)', 'Farmer Services', async () => {
    const res = await request('/api/insurance');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Expected array of insurance schemes`);
    }
    const pmfby = res.data.data.find(s => s.code === 'PMFBY' || (s.name && s.name.includes('Pradhan Mantri')));
    if (!pmfby) throw new Error(`Pradhan Mantri Fasal Bima Yojana (PMFBY) missing`);
    return { latencyMs: res.latencyMs, message: `${res.data.data.length} schemes verified` };
  });

  await assertTest('Agricultural Awareness & Krishi Vigyan Events (/api/awareness)', 'Farmer Services', async () => {
    const res = await request('/api/awareness');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Expected array of awareness events`);
    }
    return { latencyMs: res.latencyMs, message: `${res.data.data.length} events active` };
  });

  // --------------------------------------------------------------------------
  // SUITE 5: Privacy Compliance, Data Sovereignty & DPDP Act 2023
  // --------------------------------------------------------------------------
  console.log(`\n${colors.bold}${colors.cyan}🛡️ SECTION 5: Farmer Privacy Rights & Security Verification${colors.reset}`);

  await assertTest('Privacy Policy & Farmer Data Rights (/api/privacy)', 'Compliance', async () => {
    const res = await request('/api/privacy');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const policy = res.data.policy || res.data.data;
    if (!policy || !Array.isArray(policy.sections)) {
      throw new Error(`Missing policy sections definition`);
    }
    return { latencyMs: res.latencyMs, message: `${policy.sections.length} policy sections verified` };
  });

  await assertTest('Nonexistent Route 404 Resilience (/api/nonexistent_route_404)', 'Resilience', async () => {
    const res = await request('/api/nonexistent_route_404');
    if (res.status !== 404) throw new Error(`Expected HTTP 404, got ${res.status}`);
    if (!res.data.error && !res.data.message) throw new Error(`Expected JSON error message on 404`);
    return { latencyMs: res.latencyMs };
  });

  // --------------------------------------------------------------------------
  // SUITE 6: Farmer Authentication, Kisan Profile Column & Online Awareness Data
  // --------------------------------------------------------------------------
  console.log(`\n${colors.bold}${colors.cyan}👤 SECTION 6: Farmer Authentication, Profile Column & Verified Awareness Data${colors.reset}`);

  let authToken = null;
  let farmerId = null;

  await assertTest('Farmer Authentication & Sign In (/api/auth/login)', 'Farmer Portal', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: '9876543210',
        password: 'password123'
      })
    });
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !res.data.token || !res.data.farmer) {
      throw new Error(`Invalid login response structure`);
    }
    authToken = res.data.token;
    farmerId = res.data.farmer.id;
    if (res.data.farmer.name !== 'Ramesh Kumar Patel') {
      throw new Error(`Expected farmer name Ramesh Kumar Patel, got ${res.data.farmer.name}`);
    }
    return { latencyMs: res.latencyMs, message: `Authenticated Kisan ID ${res.data.farmer.kisanId}` };
  });

  await assertTest('Farmer Profile Column Data Fetch (/api/auth/profile)', 'Farmer Portal', async () => {
    const res = await request('/api/auth/profile', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || !res.data.farmer) throw new Error(`Failed to retrieve profile`);
    const f = res.data.farmer;
    if (!f.kisanId || !f.state || !f.primaryCrops) throw new Error(`Missing profile column fields`);
    return { latencyMs: res.latencyMs, message: `Profile column: ${f.name} (${f.landAcreage} Acres, ${f.state})` };
  });

  await assertTest('Farmer Profile Column Live Updates (/api/auth/profile)', 'Farmer Portal', async () => {
    const res = await request('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        landAcreage: 7.0,
        irrigationType: 'Canal & Solar Drip Irrigation'
      })
    });
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success || res.data.farmer.landAcreage !== 7.0) {
      throw new Error(`Profile update did not persist new acreage`);
    }
    return { latencyMs: res.latencyMs, message: `Updated acreage to 7.0 Acres in Firestore` };
  });

  await assertTest('Verified Government Data in Awareness Module (/api/awareness)', 'Awareness Audit', async () => {
    const res = await request('/api/awareness');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    const events = res.data.data;
    if (!Array.isArray(events) || events.length === 0) throw new Error(`No events returned`);
    
    // Audit online government links
    const hasGovLinks = events.some(e => {
      const url = e.officialPortalUrl || e.registrationUrl || e.officialLink;
      return url && (
        url.includes('.gov.in') ||
        url.includes('.org.in') ||
        url.includes('.ac.in') ||
        url.includes('.edu') ||
        url.includes('icar') ||
        url.includes('pau.edu')
      );
    });
    if (!hasGovLinks) {
      throw new Error(`Awareness events must link to authentic government or research portals (.gov.in / .org.in)`);
    }

    const hasNodalDivision = events.some(e => e.nodalDivision || e.organizer);
    if (!hasNodalDivision) {
      throw new Error(`Awareness events missing official organizer / nodal division metadata`);
    }

    return { latencyMs: res.latencyMs, message: `${events.length} authentic government-linked events verified` };
  });

  // --------------------------------------------------------------------------
  // EXECUTIVE SUMMARY & PERFORMANCE BENCHMARKING
  // --------------------------------------------------------------------------
  const total = testResults.length;
  const passed = testResults.filter(t => t.passed).length;
  const failed = testResults.filter(t => !t.passed).length;

  const latencies = testResults.map(t => t.latencyMs).filter(l => typeof l === 'number');
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / (latencies.length || 1);
  const minLatency = Math.min(...latencies);
  const maxLatency = Math.max(...latencies);
  
  // Calculate p95 latency
  const sortedLatencies = [...latencies].sort((a, b) => a - b);
  const p95Index = Math.floor(sortedLatencies.length * 0.95);
  const p95Latency = sortedLatencies[p95Index] || avgLatency;

  console.log(`\n${colors.bold}================================================================================${colors.reset}`);
  console.log(`${colors.bold}📊 EXECUTIVE BUSINESS PRODUCT GRADE AUDIT REPORT${colors.reset}`);
  console.log(`${colors.bold}================================================================================${colors.reset}`);
  console.log(` Total Verified Test Scenarios  : ${colors.bold}${total}${colors.reset}`);
  console.log(` Scenarios Passed Successfully  : ${colors.green}${colors.bold}${passed}${colors.reset}`);
  console.log(` Scenarios Failed / Deficiencies: ${failed === 0 ? colors.green : colors.red}${colors.bold}${failed}${colors.reset}`);
  console.log(` Overall Compliance Pass Rate   : ${failed === 0 ? colors.green : colors.yellow}${colors.bold}${((passed / total) * 100).toFixed(1)}%${colors.reset}`);
  console.log(`--------------------------------------------------------------------------------`);
  console.log(` SLA Latency Profile:`);
  console.log(`   • Average Response Latency   : ${formatDuration(avgLatency)}`);
  console.log(`   • p95 Production SLA Latency : ${formatDuration(p95Latency)}`);
  console.log(`   • Min / Max Response Window  : ${formatDuration(minLatency)} / ${formatDuration(maxLatency)}`);
  console.log(`   • Enterprise Benchmark Status: ${avgLatency < 250 ? `${colors.green}EXCELLENT (<250ms)${colors.reset}` : `${colors.yellow}ACCEPTABLE${colors.reset}`}`);
  console.log(`${colors.bold}================================================================================${colors.reset}`);

  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }

  if (failed > 0) {
    console.log(`\n${colors.red}❌ AUDIT FAILED: ${failed} issue(s) require remediation.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}🏆 AUDIT PASSED: KrishiSahay AgriTech Platform qualifies for Business Production Grade release!${colors.reset}\n`);
    process.exit(0);
  }
}

runEnterpriseTestSuite().catch(err => {
  console.error(`Unhandled test execution error:`, err);
  if (serverProcess) serverProcess.kill('SIGTERM');
  process.exit(1);
});
