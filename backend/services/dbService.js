const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

const getFilePath = (filename) => path.join(DATA_DIR, filename);

/**
 * Safely reads JSON file
 */
function readJson(filename) {
  try {
    const filePath = getFilePath(filename);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

/**
 * Safely writes JSON file
 */
function writeJson(filename, data) {
  try {
    const filePath = getFilePath(filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

module.exports = {
  // Diseases
  getDiseases: () => readJson('diseases.json'),
  getDiseaseById: (id) => {
    const diseases = readJson('diseases.json');
    return diseases.find(d => d.id === id) || null;
  },

  // Weather Data
  getWeatherData: () => readJson('weatherData.json'),
  getWeatherByRegion: (regionId) => {
    const weatherObj = readJson('weatherData.json');
    const regions = weatherObj.regions || [];
    return regions.find(r => r.id.toLowerCase() === (regionId || '').toLowerCase()) || regions[0] || null;
  },

  // Diagnoses History
  getDiagnosesHistory: () => {
    const list = readJson('diagnosesHistory.json');
    return Array.isArray(list) ? list : [];
  },
  getDiagnosisById: (id) => {
    const list = readJson('diagnosesHistory.json');
    return list.find(item => item.id === id) || null;
  },
  saveDiagnosis: (diagnosisRecord) => {
    const history = readJson('diagnosesHistory.json') || [];
    history.unshift(diagnosisRecord); // Newest first
    writeJson('diagnosesHistory.json', history);
    return diagnosisRecord;
  },
  clearDiagnosesHistory: () => {
    writeJson('diagnosesHistory.json', []);
    return true;
  },

  // Helplines
  getHelplines: () => readJson('helplines.json'),

  // Insurance
  getInsuranceSchemes: () => readJson('insurance.json'),

  // Events & Awareness
  getEvents: () => readJson('events.json')
};
