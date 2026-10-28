const firebaseDbService = require('./firebaseDbService');

/**
 * KrishiSahay Central Database Service
 * Powered by Google Cloud Firestore with High-Availability Local Cache
 */
module.exports = {
  // Engine & Firebase Status
  getFirebaseStatus: () => firebaseDbService.getSystemStatus(),

  // Diseases
  getDiseases: () => firebaseDbService.getDiseases(),
  getDiseaseById: (id) => firebaseDbService.getDiseaseById(id),
  getDiseasesFromFirestore: () => firebaseDbService.getDiseasesFromFirestore(),

  // Weather Data
  getWeatherData: () => firebaseDbService.getWeatherData(),
  getWeatherByRegion: (regionId) => firebaseDbService.getWeatherByRegion(regionId),

  // Diagnoses History (Cloud Firestore 'diagnoses' collection)
  getDiagnosesHistory: () => firebaseDbService.getDiagnosesHistory(),
  getDiagnosesHistoryFromFirestore: () => firebaseDbService.getDiagnosesHistoryFromFirestore(),
  getDiagnosisById: (id) => firebaseDbService.getDiagnosisById(id),
  saveDiagnosis: (diagnosisRecord) => firebaseDbService.saveDiagnosis(diagnosisRecord),
  clearDiagnosesHistory: () => firebaseDbService.clearDiagnosesHistory(),

  // Helplines (Cloud Firestore 'helplines' collection)
  getHelplines: () => firebaseDbService.getHelplines(),

  // Insurance (Cloud Firestore 'insurance' collection)
  getInsuranceSchemes: () => firebaseDbService.getInsuranceSchemes(),

  // Events & Awareness (Cloud Firestore 'events' collection)
  getEvents: () => firebaseDbService.getEvents(),

  // Farmer Profiles & Authentication (Cloud Firestore 'farmers' collection)
  getFarmers: () => firebaseDbService.getFarmers(),
  getFarmerById: (id) => firebaseDbService.getFarmerById(id),
  getFarmerByIdentifier: (identifier) => firebaseDbService.getFarmerByIdentifier(identifier),
  createFarmer: (farmerData) => firebaseDbService.createFarmer(farmerData),
  updateFarmer: (id, updates) => firebaseDbService.updateFarmer(id, updates)
};
