const express = require('express');
const router = express.Router();
const dbService = require('../services/dbService');

/**
 * GET /api/privacy
 * Returns privacy policy sections
 */
router.get('/privacy', (req, res) => {
  return res.status(200).json({
    success: true,
    policy: {
      title: "KrishiSahay Data Privacy & Security Policy",
      lastUpdated: "August 2026",
      sections: [
        {
          id: "data_collection",
          title: "Data We Collect",
          icon: "database",
          content: "We collect uploaded leaf images, basic GPS location coordinates (if permitted) for localized weather advisories, and device preferences to maintain your diagnosis history locally."
        },
        {
          id: "data_usage",
          title: "How We Use Data",
          icon: "cpu",
          content: "Your leaf images are processed solely by our computer vision neural network to detect crop pathogens, calculate confidence scores, and generate customized treatment plans. We never sell farmer data to third parties."
        },
        {
          id: "farmer_rights",
          title: "Your Rights",
          icon: "user-check",
          content: "You retain 100% ownership of your farm data. You have the right to inspect, export as JSON, or completely delete all stored leaf diagnosis history at any time with one click."
        },
        {
          id: "data_security",
          title: "Data Security",
          icon: "shield",
          content: "All communication is encrypted over HTTPS (TLS 1.3). Uploaded leaf files are securely stored and automatically scrubbed according to user retention preferences."
        },
        {
          id: "data_deletion",
          title: "Data Erasure & Export",
          icon: "trash-2",
          content: "Use the interactive controls below to instantly download a copy of your crop health logs or permanently wipe all records from this browser session."
        },
        {
          id: "support_contact",
          title: "Privacy Support",
          icon: "mail",
          content: "For privacy inquiries or technical support, contact privacy@krishisahay.org or call Kisan Support at 1800-180-1551."
        }
      ]
    }
  });
});

/**
 * POST /api/privacy/export
 * Exports user diagnosis data as downloadable JSON payload
 */
router.post('/privacy/export', (req, res) => {
  try {
    const history = dbService.getDiagnosesHistory();
    return res.status(200).json({
      success: true,
      exportTimestamp: new Date().toISOString(),
      recordCount: history.length,
      data: history
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to export privacy data'
    });
  }
});

/**
 * DELETE /api/privacy/delete-all
 * Deletes all diagnosis records
 */
router.delete('/privacy/delete-all', (req, res) => {
  try {
    dbService.clearDiagnosesHistory();
    return res.status(200).json({
      success: true,
      message: 'All diagnosis records deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to wipe diagnosis records'
    });
  }
});

module.exports = router;
