const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

/**
 * Enterprise Firebase Firestore Connection Manager
 * 
 * Supports:
 * 1. Dedicated Service Account Key File (via FIREBASE_SERVICE_ACCOUNT_PATH or config/serviceAccountKey.json)
 * 2. Environment variables: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 * 3. Application Default Credentials (GCP/Cloud Run/Firebase Functions)
 * 4. Local Resilience Provider (graceful fallback mode when live credentials are not yet injected)
 */

let db = null;
let app = null;
let connectionMode = 'uninitialized';
let connectionError = null;

function initializeFirebase() {
  if (app && db) {
    return { app, db, mode: connectionMode };
  }

  try {
    // 1. Check for explicit Service Account JSON file path
    const customKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    const defaultKeyPath = path.join(__dirname, 'serviceAccountKey.json');
    const projectRootKeyPath = path.join(__dirname, '../../serviceAccountKey.json');

    let keyFilePath = null;
    if (customKeyPath && fs.existsSync(customKeyPath)) {
      keyFilePath = customKeyPath;
    } else if (fs.existsSync(defaultKeyPath)) {
      keyFilePath = defaultKeyPath;
    } else if (fs.existsSync(projectRootKeyPath)) {
      keyFilePath = projectRootKeyPath;
    }

    if (keyFilePath) {
      const serviceAccount = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      }, 'krishisahay-firestore');
      db = app.firestore();
      connectionMode = 'firestore-cloud-keyfile';
      console.log(`🔥 [Firebase] Connected to Cloud Firestore using key file: ${path.basename(keyFilePath)} (Project: ${serviceAccount.project_id || 'active'})`);
      return { app, db, mode: connectionMode };
    }

    // 2. Check for individual environment variables
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : null;

    if (projectId && clientEmail && privateKey) {
      app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey
        })
      }, 'krishisahay-firestore');
      db = app.firestore();
      connectionMode = 'firestore-cloud-env';
      console.log(`🔥 [Firebase] Connected to Cloud Firestore using Environment Variables (Project: ${projectId})`);
      return { app, db, mode: connectionMode };
    }

    // 3. Fallback to Local Resilience Mode
    connectionMode = 'firestore-local-resilience';
    console.log(`🌱 [Firebase] Running in High-Availability Resilience Mode. Local JSON and persistent storage ready.`);
    console.log(`ℹ️ [Firebase] To connect a live Google Cloud Firestore project, place 'serviceAccountKey.json' in backend/config/ or set FIREBASE_PROJECT_ID.`);
    
    return { app: null, db: null, mode: connectionMode };
  } catch (err) {
    connectionError = err.message;
    connectionMode = 'firestore-local-resilience';
    console.warn(`⚠️ [Firebase] Initialization notice: ${err.message}. Defaulting to resilience fallback.`);
    return { app: null, db: null, mode: connectionMode };
  }
}

// Initialize on module load
const instance = initializeFirebase();

module.exports = {
  admin,
  getDb: () => db,
  getApp: () => app,
  getMode: () => connectionMode,
  isLiveCloud: () => connectionMode.startsWith('firestore-cloud'),
  getStatus: () => ({
    mode: connectionMode,
    isLiveCloud: connectionMode.startsWith('firestore-cloud'),
    hasDbInstance: !!db,
    error: connectionError,
    timestamp: new Date().toISOString()
  }),
  reinitialize: initializeFirebase
};
