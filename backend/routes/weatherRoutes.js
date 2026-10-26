const express = require('express');
const router = express.Router();
const aiOnlineSyncService = require('../services/aiOnlineSyncService');

/**
 * GET /api/weather
 * Fetch real-time live weather & dynamic Climate Risk Score for ANY location in India
 */
router.get('/weather', async (req, res) => {
  try {
    const { location, refresh, lat, lon, name, state } = req.query;
    const forceRefresh = refresh === 'true' || refresh === '1';

    let customCoords = null;
    if (lat && lon && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon))) {
      customCoords = {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        name: name || `Farm Location (${parseFloat(lat).toFixed(2)}°N, ${parseFloat(lon).toFixed(2)}°E)`,
        state: state || 'India'
      };
    }

    const weatherData = await aiOnlineSyncService.getLiveWeather(location || 'punjab', forceRefresh, customCoords);
    const allLocations = aiOnlineSyncService.getAllLocations();

    return res.status(200).json({
      success: true,
      isLiveOnline: weatherData.isLiveOnline || true,
      lastUpdated: weatherData.lastUpdated,
      data: weatherData,
      regions: allLocations
    });
  } catch (error) {
    console.error('Weather Route Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch weather advisory data'
    });
  }
});

/**
 * GET /api/locations/search?q=...
 * Search ANY district, city, village, or state across India
 */
router.get('/locations/search', async (req, res) => {
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
    console.error('Location Search Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to search locations'
    });
  }
});

/**
 * GET /api/locations/all
 * List all 28 states & 8 Union Territories with zones
 */
router.get('/locations/all', (req, res) => {
  try {
    const all = aiOnlineSyncService.getAllLocations();
    return res.status(200).json({
      success: true,
      count: all.length,
      data: all
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch India locations'
    });
  }
});

module.exports = router;
