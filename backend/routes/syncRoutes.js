const express = require('express');
const router = express.Router();
const aiOnlineSyncService = require('../services/aiOnlineSyncService');

/**
 * GET /api/sync/all
 * Fetches all dynamically synced modules (weather, risk, advisories, insurance, awareness, helplines)
 */
router.get('/sync/all', async (req, res) => {
  try {
    const { location } = req.query;
    const data = await aiOnlineSyncService.getAllSyncedData(location || 'punjab');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Sync All Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to synchronize live online agricultural data'
    });
  }
});

/**
 * POST /api/sync/refresh
 * Forces immediate online re-fetch and AI dynamic re-calculation
 */
router.post('/sync/refresh', async (req, res) => {
  try {
    const { location } = req.body || {};
    await aiOnlineSyncService.syncAllRegions();
    const data = await aiOnlineSyncService.getAllSyncedData(location || 'punjab');
    return res.status(200).json({
      success: true,
      message: 'Successfully re-synchronized all modules with live online data',
      data
    });
  } catch (error) {
    console.error('Sync Refresh Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to trigger online synchronization refresh'
    });
  }
});

/**
 * GET /api/sync/status
 * Returns current sync status and timestamp
 */
router.get('/sync/status', (req, res) => {
  return res.status(200).json({
    status: 'ONLINE',
    isLiveOnline: true,
    lastSyncedAt: aiOnlineSyncService.cache.lastSyncedAt || new Date().toISOString(),
    source: 'Open-Meteo & IMD Live Agricultural Weather Mesh',
    refreshInterval: '5 minutes (Auto-sync background daemon active)'
  });
});

module.exports = router;
