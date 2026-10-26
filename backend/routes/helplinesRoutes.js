const express = require('express');
const router = express.Router();
const aiOnlineSyncService = require('../services/aiOnlineSyncService');

/**
 * GET /api/helplines
 * Returns dynamically auto-updated official agricultural helpline contacts
 */
router.get('/helplines', (req, res) => {
  try {
    const { refresh } = req.query;
    const forceRefresh = refresh === 'true' || refresh === '1';
    const helplines = aiOnlineSyncService.getLiveHelplines(forceRefresh);
    return res.status(200).json({
      success: true,
      isLiveOnline: true,
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' (Live Online)',
      count: helplines.length,
      data: helplines
    });
  } catch (error) {
    console.error('Helplines Route Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch helpline directory'
    });
  }
});

module.exports = router;
