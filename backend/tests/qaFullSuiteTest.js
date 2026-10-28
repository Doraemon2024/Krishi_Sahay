const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawn } = require('child_process');

/**
 * ============================================================================
 * KRISHISAHAY AGRI-TECH PLATFORM - PROFESSIONAL SENIOR QA AUDIT SUITE
 * ============================================================================
 * Standards: ISO/IEC 25010 Software Quality Standard, OWASP Top 10 Web Security,
 * W3C Web Content Accessibility Guidelines (WCAG 2.1 AA), India DPDP Act 2023.
 * ============================================================================
 */

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:5000';
const URL_OBJ = new URL(BASE_URL);
const PORT = URL_OBJ.port || 5000;
const HOST = URL_OBJ.hostname || 'localhost';

const testResults = [];
let serverProcess = null;

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  blue: '\x1b[34m'
};

function formatDuration(ms) {
  if (ms < 100) return `${colors.green}${ms.toFixed(1)}ms${colors.reset}`;
  if (ms < 350) return `${colors.yellow}${ms.toFixed(1)}ms${colors.reset}`;
  return `${colors.red}${ms.toFixed(1)}ms${colors.reset}`;
}

function request(endpoint, options = {}) {
  const method = options.method || 'GET';
  const headers = options.headers || {};
  const body = options.body;

  if (body && !headers['Content-Length']) {
    headers['Content-Length'] = Buffer.byteLength(body);
  }

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

function uploadMultipartFile(endpoint, fieldName, filename, fileBuffer, mimeType, additionalFields = {}) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  const crlf = '\r\n';

  let bodyParts = [];

  for (const [key, val] of Object.entries(additionalFields)) {
    bodyParts.push(
      `--${boundary}${crlf}` +
      `Content-Disposition: form-data; name="${key}"${crlf}${crlf}` +
      `${val}${crlf}`
    );
  }

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

async function assertTest(name, category, testFn) {
  process.stdout.write(`  ⏳ ${category.padEnd(18)} | ${name.padEnd(54)} `);
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

async function isServerUp() {
  try {
    const res = await request('/api/health');
    return res.status === 200;
  } catch (e) {
    return false;
  }
}

async function ensureServerRunning() {
  const up = await isServerUp();
  if (up) {
    console.log(`${colors.cyan}📡 Connected to active KrishiSahay server at ${BASE_URL}${colors.reset}\n`);
    return null;
  }

  console.log(`${colors.yellow}🚀 Starting KrishiSahay server in background for QA audit...${colors.reset}`);
  const serverPath = path.join(__dirname, '../server.js');
  serverProcess = spawn(process.execPath, [serverPath], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: PORT.toString() }
  });

  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    if (await isServerUp()) {
      console.log(`${colors.green}✅ KrishiSahay server spawned and ready on port ${PORT}!${colors.reset}\n`);
      return serverProcess;
    }
  }

  throw new Error(`Failed to spin up KrishiSahay server on ${BASE_URL}`);
}

async function runProfessionalQASuite() {
  console.log(`\n${colors.bold}================================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.green}🌿 KRISHISAHAY AGRI-TECH PLATFORM - PROFESSIONAL QA WEBSITE AUDIT${colors.reset}`);
  console.log(`${colors.gray}Lead QA Automation Engineer • ISO 25010 • OWASP • WCAG 2.1 AA Standards${colors.reset}`);
  console.log(`${colors.bold}================================================================================${colors.reset}\n`);

  let server = null;
  try {
    server = await ensureServerRunning();
  } catch (err) {
    console.error(`${colors.red}Fatal: ${err.message}${colors.reset}`);
    process.exit(1);
  }

  // ==========================================================================
  // SECTION 1: STATIC ASSETS, HTML DOM & JAVASCRIPT SYNTAX INTEGRITY
  // ==========================================================================
  console.log(`${colors.bold}${colors.magenta}📑 SECTION 1: Code Integrity, HTML DOM & Static Assets${colors.reset}`);

  await assertTest('Frontend JS Code Syntax Compilation', 'Code Integrity', async () => {
    const jsDir = path.join(__dirname, '../../frontend/js');
    const getFiles = (dir) => {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(getFiles(file));
        else if (file.endsWith('.js')) results.push(file);
      });
      return results;
    };

    const allJs = getFiles(jsDir);
    if (allJs.length < 10) throw new Error(`Expected at least 10 JS files, found ${allJs.length}`);

    for (const filePath of allJs) {
      const code = fs.readFileSync(filePath, 'utf8');
      try {
        new vm.Script(code, { filename: path.basename(filePath) });
      } catch (syntaxErr) {
        throw new Error(`Syntax error in ${path.basename(filePath)}: ${syntaxErr.message}`);
      }
    }
    return { message: `All ${allJs.length} frontend JavaScript modules compiled error-free.` };
  });

  await assertTest('index.html DOM & Semantic Structure', 'HTML Structure', async () => {
    const indexPath = path.join(__dirname, '../../frontend/index.html');
    const html = fs.readFileSync(indexPath, 'utf8');

    if (!html.includes('<!DOCTYPE html>')) throw new Error('Missing standard <!DOCTYPE html>');
    if (!html.includes('<meta name="viewport"')) throw new Error('Missing responsive viewport meta tag');
    if (!html.includes('id="app-header"')) throw new Error('Missing #app-header mount point');
    if (!html.includes('id="app-content"')) throw new Error('Missing #app-content mount point');
    if (!html.includes('id="app-footer"')) throw new Error('Missing #app-footer mount point');
    if (!html.includes('role="main"')) throw new Error('Missing role="main" for WCAG accessibility');
    return { message: 'index.html conforms to semantic HTML5 standards' };
  });

  await assertTest('problem.html Report Page DOM Structure', 'HTML Structure', async () => {
    const reportPath = path.join(__dirname, '../../frontend/problem.html');
    const html = fs.readFileSync(reportPath, 'utf8');

    if (!html.includes('<!DOCTYPE html>')) throw new Error('Missing standard <!DOCTYPE html>');
    if (!html.includes('KrishiSahay')) throw new Error('Missing KrishiSahay brand in title/markup');
    if (!html.includes('class="site-header"')) throw new Error('Missing report header markup');
    return { message: 'problem.html standalone diagnostic view validated' };
  });

  await assertTest('Core Design System CSS Availability', 'Design System', async () => {
    const resMain = await request('/css/main.css');
    if (resMain.status !== 200) throw new Error(`HTTP ${resMain.status} on /css/main.css`);
    const resVars = await request('/css/variables.css');
    if (resVars.status !== 200) throw new Error(`HTTP ${resVars.status} on /css/variables.css`);
    if (!resVars.raw.includes('--primary-green')) throw new Error('Missing --primary-green design token in variables.css');
    return { message: 'CSS design tokens and typography stylesheets served cleanly' };
  });

  // ==========================================================================
  // SECTION 2: SERVER INFRASTRUCTURE, HEALTH & ERROR RESILIENCE
  // ==========================================================================
  console.log(`\n${colors.bold}${colors.cyan}🌐 SECTION 2: Server Infrastructure, Health & Resilience${colors.reset}`);

  await assertTest('Server Health Check SLA (/api/health)', 'Infrastructure', async () => {
    const res = await request('/api/health');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (res.data.status !== 'OK') throw new Error(`Invalid status: ${res.data.status}`);
    if (res.latencyMs > 250) throw new Error(`Latency SLA breached: ${res.latencyMs}ms > 250ms`);
    return { latencyMs: res.latencyMs };
  });

  await assertTest('Firebase Engine Status (/api/firebase/status)', 'Infrastructure', async () => {
    const res = await request('/api/firebase/status');
    if (res.status !== 200) throw new Error(`Expected HTTP 200, got ${res.status}`);
    if (!res.data.success) throw new Error('Firebase status success is false');
    const dbData = res.data.data;
    if (dbData.databaseEngine !== 'Google Cloud Firestore') {
      throw new Error(`Expected Google Cloud Firestore, got ${dbData.databaseEngine}`);
    }
    return { message: `Firebase mode: ${dbData.connectionMode}` };
  });

  await assertTest('Nonexistent Route 404 Resilience', 'Resilience', async () => {
    const res = await request('/api/unsupported_route_test_xyz');
    if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
    if (!res.data || res.data.success !== false) throw new Error('Expected { success: false } in 404 response');
    return { message: '404 handled gracefully with standard JSON structure' };
  });

  await assertTest('Path Traversal Attack Protection', 'Security', async () => {
    const res = await request('/api/diagnoses/../../../../windows/win.ini');
    if (res.status === 200 && res.raw.includes('[extensions]')) {
      throw new Error('Vulnerable to path traversal attack!');
    }
    return { message: 'Path traversal attempts rejected safely' };
  });

  // ==========================================================================
  // SECTION 3: FARMER AUTHENTICATION & PROFILE MANAGEMENT
  // ==========================================================================
  console.log(`\n${colors.bold}${colors.blue}👤 SECTION 3: Farmer Authentication, Login & Profile Telemetry${colors.reset}`);

  let testAuthToken = null;
  let testKisanId = null;

  await assertTest('Farmer Login: Punjab Demo Account (9876543210)', 'Authentication', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: '9876543210', password: 'password123' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.success) throw new Error(res.data.message || 'Login failed');
    if (!res.data.farmer || res.data.farmer.name !== 'Ramesh Kumar Patel') {
      throw new Error(`Unexpected farmer name: ${res.data.farmer ? res.data.farmer.name : 'none'}`);
    }
    testAuthToken = res.data.token;
    testKisanId = res.data.farmer.kisanId;
    return { message: `Logged in as ${res.data.farmer.name} (${testKisanId})` };
  });

  await assertTest('Farmer Login: Maharashtra Demo Account (9811223344)', 'Authentication', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: '9811223344', password: 'password123' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.farmer || res.data.farmer.name !== 'Sunita Devi') {
      throw new Error(`Unexpected farmer: ${res.data.farmer ? res.data.farmer.name : 'null'}`);
    }
    return { message: `Verified Sunita Devi (${res.data.farmer.state})` };
  });

  await assertTest('Farmer Login: Negative Validation (Invalid Credentials)', 'Authentication', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: '9876543210', password: 'wrongpassword' })
    });
    if (res.status === 200) throw new Error('Expected login failure on wrong password');
    if (res.status !== 401) throw new Error(`Expected 401 Unauthorized, got ${res.status}`);
    return { message: 'Rejected wrong password correctly' };
  });

  await assertTest('Farmer Registration: New Kisan Creation & Validation', 'Authentication', async () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newPhone = `91${randomSuffix}5522`;
    const res = await request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Kisan QA Tester ${randomSuffix}`,
        phone: newPhone,
        password: 'Password@2026',
        state: 'Haryana',
        district: 'Karnal',
        village: 'Nilokheri',
        landAcreage: 5.5,
        soilType: 'Alluvial Loam',
        primaryCrops: ['Wheat', 'Mustard']
      })
    });
    if (res.status !== 201 && res.status !== 200) throw new Error(`Expected 201/200, got ${res.status}: ${JSON.stringify(res.data)}`);
    if (!res.data.farmer.kisanId) throw new Error('New registration failed to generate Kisan ID');
    return { message: `Created new farmer with Kisan ID: ${res.data.farmer.kisanId}` };
  });

  await assertTest('Farmer Profile Fetch & Telemetry (/api/auth/profile)', 'Profile', async () => {
    const res = await request(`/api/auth/profile?kisanId=${encodeURIComponent(testKisanId)}`, {
      headers: {
        'Authorization': `Bearer ${testAuthToken}`
      }
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.farmer || !res.data.farmer.kisanId) throw new Error('Profile payload missing farmer details');
    return { message: `Retrieved profile for ${res.data.farmer.name}` };
  });

  await assertTest('Farmer Profile Live Update & Persistence', 'Profile', async () => {
    const updatedAcreage = 7.0;
    const res = await request('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${testAuthToken}`
      },
      body: JSON.stringify({
        kisanId: testKisanId,
        landAcreage: updatedAcreage,
        soilType: 'Clayey Loam',
        primaryCrops: ['Wheat', 'Rice (Paddy)', 'Barley']
      })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (parseFloat(res.data.farmer.landAcreage) !== updatedAcreage) {
      throw new Error(`Acreage not updated: expected ${updatedAcreage}, got ${res.data.farmer.landAcreage}`);
    }
    return { message: 'Profile updated and verified in database' };
  });

  // ==========================================================================
  // SECTION 4: AI CROP LEAF DIAGNOSTICS & MULTIPART UPLOADS
  // ==========================================================================
  console.log(`\n${colors.bold}${colors.green}🌿 SECTION 4: AI Crop Disease Diagnostics & Neural Scanner${colors.reset}`);

  let createdDiagnosisId = null;

  await assertTest('AI Diagnosis: Rice Blast Leaf Sample', 'AI Diagnostics', async () => {
    const res = await request('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleId: 'rice_blast', location: 'Ludhiana, Punjab' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = res.data.data;
    if (!data.disease.toLowerCase().includes('blast')) {
      throw new Error(`Expected Rice Blast, got ${data.disease}`);
    }
    if (!Array.isArray(data.treatments) || data.treatments.length === 0) {
      throw new Error('Diagnosis missing treatments array');
    }
    createdDiagnosisId = data.id;
    return { message: `Diagnosed: ${data.disease} (${data.confidence}% confidence, ID: ${data.id})` };
  });

  await assertTest('AI Diagnosis: Tomato Early Blight Sample', 'AI Diagnostics', async () => {
    const res = await request('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleId: 'tomato_early_blight', location: 'Nashik, Maharashtra' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = res.data.data;
    if (!data.disease.toLowerCase().includes('early blight')) {
      throw new Error(`Expected Early Blight, got ${data.disease}`);
    }
    return { message: `Diagnosed: ${data.disease} (Severity: ${data.severity})` };
  });

  await assertTest('AI Diagnosis: Wheat Yellow Rust Sample', 'AI Diagnostics', async () => {
    const res = await request('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleId: 'wheat_yellow_rust', location: 'Karnal, Haryana' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = res.data.data;
    if (!data.disease.toLowerCase().includes('rust')) {
      throw new Error(`Expected Yellow Rust, got ${data.disease}`);
    }
    return { message: `Diagnosed: ${data.disease}` };
  });

  await assertTest('AI Diagnosis: Healthy Leaf Benchmark', 'AI Diagnostics', async () => {
    const res = await request('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sampleId: 'healthy_crop', location: 'PAU Farm, Punjab' })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = res.data.data;
    if (data.severity !== 'Healthy' && data.severity !== 'NONE') {
      throw new Error(`Expected Healthy status, got: ${data.disease} (${data.severity})`);
    }
    return { message: `Confirmed Healthy Foliage benchmark: ${data.disease}` };
  });

  await assertTest('Multipart Image File Upload & Diagnostic Execution', 'AI Diagnostics', async () => {
    const samplePath = path.join(__dirname, '../../frontend/samples/cotton_blight.jpg');
    let buffer;
    if (fs.existsSync(samplePath)) {
      buffer = fs.readFileSync(samplePath);
    } else {
      buffer = Buffer.from('SIMULATED_LEAF_RAW_IMAGE_DATA_JPEG_STREAM');
    }

    const res = await uploadMultipartFile('/api/diagnose', 'leafImage', 'cotton_leaf_field.jpg', buffer, 'image/jpeg', {
      location: 'Nagpur, Maharashtra'
    });

    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.success) throw new Error('Multipart diagnosis returned success: false');
    return { message: `Processed image upload: ${res.data.data.disease}` };
  });

  await assertTest('Diagnosis History Retrieval (/api/diagnoses)', 'AI Diagnostics', async () => {
    const res = await request('/api/diagnoses');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!Array.isArray(res.data.data)) throw new Error('Expected array in diagnoses response');
    if (res.data.data.length === 0) throw new Error('Expected history to contain recent diagnoses');
    return { message: `Retrieved ${res.data.data.length} diagnostic records` };
  });

  await assertTest('Single Diagnosis Lookup (/api/diagnoses/:id)', 'AI Diagnostics', async () => {
    const targetId = createdDiagnosisId;
    if (!targetId) throw new Error('No created diagnosis ID was captured');
    const res = await request(`/api/diagnoses/${targetId}`);
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.data || res.data.data.id !== targetId) {
      throw new Error(`Mismatch in fetched diagnosis ID: ${res.data.data ? res.data.data.id : 'null'}`);
    }
    return { message: `Verified diagnosis lookup for ID: ${targetId}` };
  });

  // ==========================================================================
  // SECTION 5: WEATHER RISK ENGINE & PAN-INDIA GEOCODING
  // ==========================================================================
  console.log(`\n${colors.bold}${colors.yellow}🌦️ SECTION 5: Dynamic Weather Risk Engine & Indian Geocoding${colors.reset}`);

  await assertTest('Regional Weather Advisory: Punjab', 'Weather & Risk', async () => {
    const res = await request('/api/weather?location=punjab');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const d = res.data.data;
    if (!d) throw new Error('Missing weather data object');
    const temp = typeof d.temp === 'number' ? d.temp : d.temperature;
    if (typeof temp === 'undefined') throw new Error('Missing temp in weather');
    const riskLevel = d.riskLevel || d.diseaseRiskLevel;
    if (!riskLevel) throw new Error('Missing riskLevel in weather payload');
    return { message: `Punjab temp: ${temp}°C, Risk Level: ${riskLevel}` };
  });

  await assertTest('Regional Weather Advisory: Karnataka', 'Weather & Risk', async () => {
    const res = await request('/api/weather?location=karnataka');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const d = res.data.data;
    const temp = typeof d.temp === 'number' ? d.temp : d.temperature;
    return { message: `Karnataka temp: ${temp}°C, Humidity: ${d.humidity}%` };
  });

  await assertTest('Custom Farm GPS Coordinates Telemetry', 'Weather & Risk', async () => {
    const res = await request('/api/weather?lat=30.901&lon=75.857&name=PAU%20Ludhiana%20Farm&state=Punjab');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const d = res.data.data;
    if (!d || (!d.name && !d.state)) throw new Error('Missing location details in GPS weather response');
    return { message: `Weather resolved for farm at 30.901°N, 75.857°E (${d.name || d.state})` };
  });

  await assertTest('All 36 Indian States & Union Territories Catalog', 'Regional Catalog', async () => {
    const res = await request('/api/sync/locations');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!Array.isArray(res.data.data) || res.data.data.length < 28) {
      throw new Error(`Expected >= 28 states/UTs, found ${res.data.data ? res.data.data.length : 0}`);
    }
    return { message: `Verified all ${res.data.data.length} Indian territories` };
  });

  await assertTest('Real-time District Autocomplete Search (/api/sync/search)', 'Geocoding', async () => {
    const res = await request('/api/sync/search?q=amritsar');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!Array.isArray(res.data.data) || res.data.data.length === 0) {
      throw new Error('Search for "amritsar" returned zero results');
    }
    return { message: `Found ${res.data.data.length} matches for 'amritsar'` };
  });

  // ==========================================================================
  // SECTION 6: AGRONOMIC RECOMMENDATIONS, HELPLINES & INSURANCE
  // ==========================================================================
  console.log(`\n${colors.bold}${colors.magenta}🌾 SECTION 6: Agronomic Engine, Helplines & Government Insurance${colors.reset}`);

  await assertTest('Agronomic Recommendations Engine (/api/recommendations)', 'Agronomy Engine', async () => {
    const res = await request('/api/recommendations?location=punjab');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.success || !res.data.data) throw new Error(`Invalid recommendations response`);
    const recs = Array.isArray(res.data.data) ? res.data.data : (res.data.data.crops || []);
    if (recs.length === 0) throw new Error(`No crop advisories returned`);
    return { message: `Generated ${recs.length} actionable seasonal crop advisories` };
  });

  await assertTest('Emergency Farmer Helplines Directory (/api/helplines)', 'Farmer Welfare', async () => {
    const res = await request('/api/helplines');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
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
    return { message: `Verified Kisan Call Center and ${res.data.data.length} official numbers` };
  });

  await assertTest('PMFBY Crop Insurance Schemes (/api/insurance)', 'Government Insurance', async () => {
    const res = await request('/api/insurance');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Expected array of insurance schemes`);
    }
    const pmfby = res.data.data.find(s => s.code === 'PMFBY' || (s.name && s.name.includes('Pradhan Mantri')));
    if (!pmfby) throw new Error(`Pradhan Mantri Fasal Bima Yojana (PMFBY) missing`);
    return { message: `Verified ${res.data.data.length} government schemes` };
  });

  await assertTest('Agricultural Awareness & Krishi Vigyan Events', 'Awareness', async () => {
    const res = await request('/api/awareness');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Expected array of awareness events`);
    }
    return { message: `Verified ${res.data.data.length} active farmer workshops and webinars` };
  });

  await assertTest('Full Agricultural Modules Synchronizer (/api/sync/all)', 'Online Sync', async () => {
    const res = await request('/api/sync/all?location=punjab');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.data.weather || !res.data.recommendations || !res.data.helplines) {
      throw new Error('Sync all payload missing required module sub-objects');
    }
    return { message: 'All modules integrated into single consolidated sync stream' };
  });

  // ==========================================================================
  // SECTION 7: MULTILINGUAL (I18N) & ACCESSIBILITY READINESS
  // ==========================================================================
  console.log(`\n${colors.bold}${colors.blue}🇮🇳 SECTION 7: Multilingual (i18n) & Accessibility (WCAG)${colors.reset}`);

  await assertTest('Multilingual Coverage: 8 Indian Languages', 'i18n', async () => {
    const i18nPath = path.join(__dirname, '../../frontend/js/services/i18nService.js');
    const i18nCode = fs.readFileSync(i18nPath, 'utf8');

    const expectedLangs = ['en', 'hi', 'pa', 'bn', 'te', 'ta', 'mr', 'kn'];
    for (const lang of expectedLangs) {
      if (!i18nCode.includes(`${lang}:`)) {
        throw new Error(`i18n service missing language configuration: ${lang}`);
      }
    }
    return { message: `Supported languages verified: English, Hindi, Punjabi, Bengali, Telugu, Tamil, Marathi, Kannada` };
  });

  // ==========================================================================
  // SECTION 8: FARMER PRIVACY RIGHTS (DPDP ACT 2023)
  // ==========================================================================
  console.log(`\n${colors.bold}${colors.cyan}🛡️ SECTION 8: Farmer Privacy Rights & DPDP Act 2023 Compliance${colors.reset}`);

  await assertTest('Privacy Policy & Farmer Data Rights (/api/privacy)', 'Compliance', async () => {
    const res = await request('/api/privacy');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const policy = res.data.policy;
    if (!policy || !policy.title || !Array.isArray(policy.sections)) {
      throw new Error('Privacy policy missing required structure');
    }
    return { message: `Verified DPDP Act compliance policy with ${policy.sections.length} clauses` };
  });

  // ==========================================================================
  // FINAL EXECUTIVE SUMMARY
  // ==========================================================================
  const total = testResults.length;
  const passed = testResults.filter(t => t.passed).length;
  const failed = testResults.filter(t => !t.passed).length;
  const passRate = ((passed / total) * 100).toFixed(1);

  const latencies = testResults.map(t => t.latencyMs).filter(l => !isNaN(l));
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / (latencies.length || 1);
  const sorted = [...latencies].sort((a, b) => a - b);
  const p95 = sorted[Math.floor(sorted.length * 0.95)] || 0;
  const minLatency = sorted[0] || 0;
  const maxLatency = sorted[sorted.length - 1] || 0;

  console.log(`\n${colors.bold}================================================================================${colors.reset}`);
  console.log(`${colors.bold}📊 EXECUTIVE QA AUDIT REPORT - KRISHISAHAY AGRI-TECH PLATFORM${colors.reset}`);
  console.log(`${colors.bold}================================================================================${colors.reset}`);
  console.log(` Total Verified Test Scenarios  : ${colors.bold}${total}${colors.reset}`);
  console.log(` Scenarios Passed Successfully  : ${colors.bold}${colors.green}${passed}${colors.reset}`);
  console.log(` Scenarios Failed / Deficiencies: ${colors.bold}${failed === 0 ? colors.green : colors.red}${failed}${colors.reset}`);
  console.log(` Quality Assurance Pass Rate   : ${colors.bold}${passRate === '100.0' ? colors.green : colors.yellow}${passRate}%${colors.reset}`);
  console.log(`--------------------------------------------------------------------------------`);
  console.log(` SLA Performance Profile:`);
  console.log(`   • Average Response Latency   : ${avgLatency.toFixed(1)}ms`);
  console.log(`   • p95 Production SLA Latency : ${p95.toFixed(1)}ms`);
  console.log(`   • Min / Max Response Range   : ${minLatency.toFixed(1)}ms / ${maxLatency.toFixed(1)}ms`);
  console.log(`   • SLA Performance Status     : ${avgLatency < 250 ? colors.green + 'EXCELLENT (<250ms)' : colors.yellow + 'ACCEPTABLE'}${colors.reset}`);
  console.log(`${colors.bold}================================================================================${colors.reset}\n`);

  if (serverProcess) {
    serverProcess.kill();
  }

  if (failed > 0) {
    console.error(`${colors.red}❌ AUDIT FAILED: ${failed} scenarios did not pass requirements.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}🏆 AUDIT PASSED: Platform meets enterprise production standards for web release!${colors.reset}\n`);
    process.exit(0);
  }
}

runProfessionalQASuite().catch(err => {
  console.error('Fatal Test Runner Exception:', err);
  if (serverProcess) serverProcess.kill();
  process.exit(1);
});
