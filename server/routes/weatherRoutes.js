const express = require('express');
const router = express.Router();
const WeatherService = require('../services/weatherService');
const dbService = require('../services/dbService');

/**
 * GET /api/weather
 * Fetch weather & Climate Risk Score for a specified region or default
 */
router.get('/weather', (req, res) => {
  try {
    const { location } = req.query;
    const weatherData = WeatherService.getWeather(location || 'punjab');
    const allRegions = (dbService.getWeatherData().regions || []).map(r => ({ id: r.id, name: r.name, state: r.state }));

    return res.status(200).json({
      success: true,
      data: weatherData,
      regions: allRegions
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch weather advisory data'
    });
  }
});

module.exports = router;
