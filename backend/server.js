const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Config & Middleware
const dbConfig = require('./config/db');
const requestLogger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import Routes
const diagnosisRoutes = require('./routes/diagnosisRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const recommendationsRoutes = require('./routes/recommendationsRoutes');
const helplinesRoutes = require('./routes/helplinesRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');
const awarenessRoutes = require('./routes/awarenessRoutes');
const privacyRoutes = require('./routes/privacyRoutes');
const syncRoutes = require('./routes/syncRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Request Logging
app.use(requestLogger);

// Enable CORS
app.use(cors());

// Body Parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Ensure upload & sample directories exist safely
const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (e) {
  console.warn('Notice: uploads directory setup:', e.message);
}

const samplesDir = path.join(__dirname, '../frontend/samples');
try {
  if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir, { recursive: true });
  }
} catch (e) {}

// Serve Static Directories
app.use('/uploads', express.static(uploadsDir));
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api', diagnosisRoutes);
app.use('/api', weatherRoutes);
app.use('/api', recommendationsRoutes);
app.use('/api', helplinesRoutes);
app.use('/api', insuranceRoutes);
app.use('/api', awarenessRoutes);
app.use('/api', privacyRoutes);
app.use('/api', syncRoutes);
app.use('/api/auth', authRoutes);

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

// Firebase Database Status API
app.get('/api/firebase/status', (req, res) => {
  try {
    const dbService = require('./services/dbService');
    const status = dbService.getFirebaseStatus();
    res.status(200).json({
      success: true,
      message: 'Firebase Database System Status',
      data: status
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Firebase status',
      error: err.message
    });
  }
});

// API 404 Handler
app.use(notFoundHandler);

// Fallback to index.html for Single Page Application navigation
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../frontend/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('🌾 KrishiSahay AgriTech Platform API Server Ready.');
  }
});

// Centralized Express Error Handler
app.use(errorHandler);

// Start Express Server only when executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🌾 KrishiSahay AgriTech Express Server Running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`==================================================`);
  });
}

module.exports = app;
