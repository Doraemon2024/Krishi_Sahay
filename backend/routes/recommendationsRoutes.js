const express = require('express');
const router = express.Router();
const RecommendationEngine = require('../services/recommendationEngine');

/**
 * GET /api/recommendations
 * Dynamic recommendation engine endpoint based on region weather & user history
 */
router.get('/recommendations', (req, res) => {
  try {
    const { location } = req.query;
    const result = RecommendationEngine.generateRecommendations(location || 'punjab');

    return res.status(200).json({
      success: true,
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
