const express = require('express');
const router = express.Router();
const aiOnlineSyncService = require('../services/aiOnlineSyncService');

/**
 * GET /api/awareness
 * Returns dynamically auto-updated agricultural awareness workshops & events
 */
router.get('/awareness', (req, res) => {
  try {
    const { refresh } = req.query;
    const forceRefresh = refresh === 'true' || refresh === '1';
    const events = aiOnlineSyncService.getLiveAwareness(forceRefresh);
    return res.status(200).json({
      success: true,
      isLiveOnline: true,
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' (Live Online)',
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Awareness Route Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch awareness events'
    });
  }
});

module.exports = router;
