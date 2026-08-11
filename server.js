const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Config & Middleware
const dbConfig = require('./server/config/db');
const requestLogger = require('./server/middleware/logger');
const { errorHandler, notFoundHandler } = require('./server/middleware/errorHandler');

// Import Routes
const diagnosisRoutes = require('./server/routes/diagnosisRoutes');
const weatherRoutes = require('./server/routes/weatherRoutes');
const recommendationsRoutes = require('./server/routes/recommendationsRoutes');
const helplinesRoutes = require('./server/routes/helplinesRoutes');
const insuranceRoutes = require('./server/routes/insuranceRoutes');
const awarenessRoutes = require('./server/routes/awarenessRoutes');
const privacyRoutes = require('./server/routes/privacyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Request Logging
app.use(requestLogger);

// Enable CORS
app.use(cors());

// Body Parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Ensure upload & sample directories exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const samplesDir = path.join(__dirname, 'public/samples');
if (!fs.existsSync(samplesDir)) {
  fs.mkdirSync(samplesDir, { recursive: true });
}

// Serve Static Directories
app.use('/uploads', express.static(uploadsDir));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', diagnosisRoutes);
app.use('/api', weatherRoutes);
app.use('/api', recommendationsRoutes);
app.use('/api', helplinesRoutes);
app.use('/api', insuranceRoutes);
app.use('/api', awarenessRoutes);
app.use('/api', privacyRoutes);

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'KrishiSahay AgriTech Platform Server',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API 404 Handler
app.use(notFoundHandler);

// Fallback to index.html for Single Page Application navigation
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('🌾 KrishiSahay AgriTech Platform API Server Ready.');
  }
});

// Centralized Express Error Handler
app.use(errorHandler);

// Start Express Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🌾 KrishiSahay AgriTech Express Server Running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
