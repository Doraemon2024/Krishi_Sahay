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
/**
 * GET /api/sync/locations
 * Returns list of all 36 Indian states and union territories
 */
router.get('/sync/locations', (req, res) => {
  try {
    const locations = aiOnlineSyncService.getAllLocations();
    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve locations list'
    });
  }
});

/**
 * GET /api/sync/search?q=...
 * Search ANY district, city, or farm location
 */
router.get('/sync/search', async (req, res) => {
  try {
    const { q } = req.query;
    const results = await aiOnlineSyncService.searchLocations(q || '');
    return res.status(200).json({
      success: true,
      query: q || '',
      count: results.length,
      data: results
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Location search error'
    });
  }
});

module.exports = router;
