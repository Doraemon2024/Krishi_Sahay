const express = require('express');
const router = express.Router();
const aiOnlineSyncService = require('../services/aiOnlineSyncService');

/**
 * GET /api/insurance
 * Returns dynamically auto-updated crop insurance schemes & guidance
 */
router.get('/insurance', (req, res) => {
  try {
    const { refresh } = req.query;
    const forceRefresh = refresh === 'true' || refresh === '1';
    const schemes = aiOnlineSyncService.getLiveInsurance(forceRefresh);
    return res.status(200).json({
      success: true,
      isLiveOnline: true,
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' (Live Online)',
      count: schemes.length,
      data: schemes
    });
  } catch (error) {
    console.error('Insurance Route Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch insurance schemes'
    });
  }
});

module.exports = router;
