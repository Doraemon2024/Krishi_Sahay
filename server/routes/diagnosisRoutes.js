const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AIService = require('../services/aiService');
const dbService = require('../services/dbService');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Storage setup for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'leaf-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

/**
 * POST /api/diagnose
 * Handles crop leaf photo upload or sample ID selection
 */
router.post('/diagnose', upload.single('leafImage'), async (req, res) => {
  try {
    const { sampleId, location } = req.body;
    const file = req.file;

    const result = await AIService.diagnoseCrop({
      file,
      sampleId,
      location
    });

    return res.status(200).json({
      success: true,
      message: 'AI Leaf Diagnosis Completed',
      data: result
    });
  } catch (error) {
    console.error('Diagnosis Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while checking your crop. Please try again.',
      error: error.message
    });
  }
});

/**
 * GET /api/diagnoses
 * Fetches diagnosis history list
 */
router.get('/diagnoses', (req, res) => {
  try {
    const history = dbService.getDiagnosesHistory();
    return res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch diagnosis history'
    });
  }
});

/**
 * GET /api/diagnoses/:id and GET /api/health/:id
 * Fetches diagnosis report details by ID
 */
const getDiagnosisHandler = (req, res) => {
  try {
    const history = dbService.getDiagnosesHistory();
    const id = req.params.id;
    let record = null;

    if (id && id !== 'latest' && id !== ':id') {
      record = dbService.getDiagnosisById(id);
    }
    
    // Fallback to latest record if specific ID not found or 'latest'
    if (!record) {
      record = history[0] || dbService.getDiseases()[0];
    }

    return res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch diagnosis details'
    });
  }
};

router.get('/diagnoses/:id', getDiagnosisHandler);
router.get('/health/:id', getDiagnosisHandler);

/**
 * DELETE /api/diagnoses
 * Clears history
 */
router.delete('/diagnoses', (req, res) => {
  try {
    dbService.clearDiagnosesHistory();
    return res.status(200).json({
      success: true,
      message: 'Diagnosis history cleared successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to clear diagnosis history'
    });
  }
});

module.exports = router;
