const express = require('express');
const router = express.Router();
const aiOnlineSyncService = require('../services/aiOnlineSyncService');

/**
 * GET /api/recommendations
 * Dynamic recommendation engine endpoint based on region live weather & user history
 */
router.get('/recommendations', async (req, res) => {
  try {
    const { location, lat, lon, name, state } = req.query;
    let customCoords = null;
    if (lat && lon && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon))) {
      customCoords = {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        name: name || `Farm Location (${parseFloat(lat).toFixed(2)}°N, ${parseFloat(lon).toFixed(2)}°E)`,
        state: state || 'India'
      };
    }
    const result = await aiOnlineSyncService.getLiveRecommendations(location || 'punjab', customCoords);

    return res.status(200).json({
      success: true,
      isLiveOnline: true,
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' (Live Online)',
      weatherSummary: result.weatherSummary,
      latestDiagnosis: result.latestDiagnosis,
      data: result.recommendations
    });
  } catch (error) {
    console.error('Recommendations Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch agricultural recommendations'
    });
  }
});

module.exports = router;
