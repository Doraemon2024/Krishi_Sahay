const fs = require('fs');
const path = require('path');
const firebaseConfig = require('../config/firebase');

const DATA_DIR = path.join(__dirname, '../data');

function getFilePath(filename) {
  return path.join(DATA_DIR, filename);
}

function readLocalJson(filename) {
  try {
    const filePath = getFilePath(filename);
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[FirebaseDb] Error reading local ${filename}:`, err.message);
    return [];
  }
}

function writeLocalJson(filename, data) {
  try {
    const filePath = getFilePath(filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`[FirebaseDb] Error writing local ${filename}:`, err.message);
    return false;
  }
}

/**
 * Enterprise Firebase Firestore Service
 * Implements Cloud Firestore operations with automated local cache and fallback
 */
class FirebaseDbService {
  constructor() {
    this.seeded = false;
    this.init();
  }

  async init() {
    const db = firebaseConfig.getDb();
    if (db && firebaseConfig.isLiveCloud()) {
      await this.autoSeedFirestore(db);
    }
  }

  /**
   * Seeds Cloud Firestore with agricultural catalog if empty
   */
  async autoSeedFirestore(db) {
    if (this.seeded) return;
    try {
      console.log(`📡 [Firebase Firestore] Checking collection population...`);

      // 1. Seed Diseases
      const diseasesSnap = await db.collection('diseases').limit(1).get();
      if (diseasesSnap.empty) {
        const localDiseases = readLocalJson('diseases.json');
        const batch = db.batch();
        localDiseases.forEach(d => {
          const docRef = db.collection('diseases').doc(d.id || `disease_${Date.now()}`);
          batch.set(docRef, d);
        });
        await batch.commit();
        console.log(`✅ [Firebase Firestore] Seeded ${localDiseases.length} disease profiles into 'diseases' collection.`);
      }

      // 2. Seed Helplines
      const helplinesSnap = await db.collection('helplines').limit(1).get();
      if (helplinesSnap.empty) {
        const localHelplines = readLocalJson('helplines.json');
        await db.collection('helplines').doc('directory').set({ items: localHelplines, updatedAt: new Date().toISOString() });
        console.log(`✅ [Firebase Firestore] Seeded emergency contacts into 'helplines' collection.`);
      }

      // 3. Seed Insurance
      const insuranceSnap = await db.collection('insurance').limit(1).get();
      if (insuranceSnap.empty) {
        const localInsurance = readLocalJson('insurance.json');
        await db.collection('insurance').doc('catalog').set({ items: localInsurance, updatedAt: new Date().toISOString() });
        console.log(`✅ [Firebase Firestore] Seeded insurance schemes into 'insurance' collection.`);
      }

      // 4. Seed Events
      const eventsSnap = await db.collection('events').limit(1).get();
      if (eventsSnap.empty) {
        const localEvents = readLocalJson('events.json');
        await db.collection('events').doc('awareness').set({ items: localEvents, updatedAt: new Date().toISOString() });
        console.log(`✅ [Firebase Firestore] Seeded farmer awareness events into 'events' collection.`);
      }

      // 5. Seed Farmers
      const farmersSnap = await db.collection('farmers').limit(1).get();
      if (farmersSnap.empty) {
        const localFarmers = readLocalJson('farmers.json');
        const batch = db.batch();
        localFarmers.forEach(f => {
          const docRef = db.collection('farmers').doc(f.id);
          batch.set(docRef, f);
        });
        await batch.commit();
        console.log(`✅ [Firebase Firestore] Seeded farmer profiles into 'farmers' collection.`);
      }

      this.seeded = true;
    } catch (err) {
      console.warn(`⚠️ [Firebase Firestore] Seeding notice: ${err.message}`);
    }
  }

  // ==========================================
  // Diseases Collection
  // ==========================================
  getDiseases() {
    return readLocalJson('diseases.json');
  }

  async getDiseasesFromFirestore() {
    const db = firebaseConfig.getDb();
    if (db && firebaseConfig.isLiveCloud()) {
      try {
        const snap = await db.collection('diseases').get();
        if (!snap.empty) {
          return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn(`[Firebase] Firestore getDiseases fallback:`, err.message);
      }
    }
    return this.getDiseases();
  }

  getDiseaseById(id) {
    const list = this.getDiseases();
    return list.find(d => d.id === id) || null;
  }

  // ==========================================
  // Weather Collection
  // ==========================================
  getWeatherData() {
    return readLocalJson('weatherData.json');
  }

  getWeatherByRegion(regionId) {
    const weatherObj = this.getWeatherData();
    const regions = weatherObj.regions || [];
    return regions.find(r => r.id.toLowerCase() === (regionId || '').toLowerCase()) || regions[0] || null;
  }

  // ==========================================
  // Diagnoses History Collection
  // ==========================================
  getDiagnosesHistory() {
    const list = readLocalJson('diagnosesHistory.json');
    return Array.isArray(list) ? list : [];
  }

  async getDiagnosesHistoryFromFirestore() {
    const db = firebaseConfig.getDb();
    if (db && firebaseConfig.isLiveCloud()) {
      try {
        const snap = await db.collection('diagnoses')
          .orderBy('timestamp', 'desc')
          .limit(100)
          .get();
        if (!snap.empty) {
          return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn(`[Firebase] Firestore getDiagnosesHistory fallback:`, err.message);
      }
    }
    return this.getDiagnosesHistory();
  }

  getDiagnosisById(id) {
    const list = this.getDiagnosesHistory();
    return list.find(item => item.id === id) || null;
  }

  async saveDiagnosis(diagnosisRecord) {
    // 1. Save to local high-speed cache
    const history = this.getDiagnosesHistory();
    history.unshift(diagnosisRecord);
    writeLocalJson('diagnosesHistory.json', history);

    // 2. Persist asynchronously to Cloud Firestore if connected
    const db = firebaseConfig.getDb();
    if (db && firebaseConfig.isLiveCloud()) {
      try {
        const docRef = db.collection('diagnoses').doc(diagnosisRecord.id);
        await docRef.set(diagnosisRecord);
        console.log(`🔥 [Firestore] Persisted crop diagnosis '${diagnosisRecord.id}' to Cloud Firestore.`);
      } catch (err) {
        console.warn(`⚠️ [Firestore] Background write error: ${err.message}`);
      }
    }

    return diagnosisRecord;
  }

  async clearDiagnosesHistory() {
    // 1. Clear local
    writeLocalJson('diagnosesHistory.json', []);

    // 2. Clear Firestore collection if connected
    const db = firebaseConfig.getDb();
    if (db && firebaseConfig.isLiveCloud()) {
      try {
        const snap = await db.collection('diagnoses').limit(100).get();
        const batch = db.batch();
        snap.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        console.log(`🔥 [Firestore] Cleared diagnoses records from Cloud Firestore.`);
      } catch (err) {
        console.warn(`⚠️ [Firestore] Clear collection notice: ${err.message}`);
      }
    }

    return true;
  }

  // ==========================================
  // Farmer Profiles & Authentication
  // ==========================================
  getFarmers() {
    return readLocalJson('farmers.json');
  }

  getFarmerById(id) {
    const farmers = this.getFarmers();
    return farmers.find(f => f.id === id) || null;
  }

  getFarmerByIdentifier(identifier) {
    if (!identifier) return null;
    const farmers = this.getFarmers();
    const clean = String(identifier).trim().toLowerCase();
    return farmers.find(f => 
      (f.phone && f.phone.trim() === clean) || 
      (f.email && f.email.trim().toLowerCase() === clean) ||
      (f.kisanId && f.kisanId.trim().toLowerCase() === clean)
    ) || null;
  }

  async createFarmer(farmerData) {
    const farmers = this.getFarmers();
    const id = farmerData.id || `farmer_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const kisanId = farmerData.kisanId || `KA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newFarmer = {
      ...farmerData,
      id,
      kisanId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    farmers.push(newFarmer);
    writeLocalJson('farmers.json', farmers);

    const db = firebaseConfig.getDb();
    if (db && firebaseConfig.isLiveCloud()) {
      try {
        await db.collection('farmers').doc(id).set(newFarmer);
        console.log(`🔥 [Firestore] Farmer profile registered in 'farmers' collection: ${id}`);
      } catch (err) {
        console.warn(`⚠️ [Firestore] Failed to save farmer to Cloud Firestore: ${err.message}`);
      }
    }

    return newFarmer;
  }

  async updateFarmer(id, updates) {
    const farmers = this.getFarmers();
    const idx = farmers.findIndex(f => f.id === id);
    if (idx === -1) return null;

    const updated = {
      ...farmers[idx],
      ...updates,
      id: farmers[idx].id, // protect immutable id
      updatedAt: new Date().toISOString()
    };

    farmers[idx] = updated;
    writeLocalJson('farmers.json', farmers);

    const db = firebaseConfig.getDb();
    if (db && firebaseConfig.isLiveCloud()) {
      try {
        await db.collection('farmers').doc(id).set(updated, { merge: true });
        console.log(`🔥 [Firestore] Farmer profile updated in 'farmers' collection: ${id}`);
      } catch (err) {
        console.warn(`⚠️ [Firestore] Failed to update farmer in Cloud Firestore: ${err.message}`);
      }
    }

    return updated;
  }

  // ==========================================
  // Helplines, Insurance, Events
  // ==========================================
  getHelplines() {
    return readLocalJson('helplines.json');
  }

  getInsuranceSchemes() {
    return readLocalJson('insurance.json');
  }

  getEvents() {
    return readLocalJson('events.json');
  }

  /**
   * System Status & Diagnostics
   */
  getSystemStatus() {
    const firebaseStatus = firebaseConfig.getStatus();
    const history = this.getDiagnosesHistory();
    const diseases = this.getDiseases();

    return {
      databaseEngine: 'Google Cloud Firestore',
      connectionMode: firebaseStatus.mode,
      isLiveCloud: firebaseStatus.isLiveCloud,
      collections: {
        diagnoses: { count: history.length, collectionName: 'diagnoses' },
        diseases: { count: diseases.length, collectionName: 'diseases' },
        weather: { collectionName: 'weather' },
        helplines: { collectionName: 'helplines' },
        insurance: { collectionName: 'insurance' },
        events: { collectionName: 'events' },
        farmers: { count: this.getFarmers().length, collectionName: 'farmers' }
      },
      ready: true,
      lastChecked: new Date().toISOString()
    };
  }
}

module.exports = new FirebaseDbService();
