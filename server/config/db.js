const path = require('path');
const fs = require('fs');

/**
 * Database Configuration & Initialization Manager
 */
const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

module.exports = {
  dataDir: DATA_DIR,
  files: {
    diseases: path.join(DATA_DIR, 'diseases.json'),
    weatherData: path.join(DATA_DIR, 'weatherData.json'),
    helplines: path.join(DATA_DIR, 'helplines.json'),
    insurance: path.join(DATA_DIR, 'insurance.json'),
    events: path.join(DATA_DIR, 'events.json'),
    diagnosesHistory: path.join(DATA_DIR, 'diagnosesHistory.json')
  },
  maxHistoryLimit: 100
};
