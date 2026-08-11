const express = require('express');
const router = express.Router();
const dbService = require('../services/dbService');

/**
 * GET /api/insurance
 * Returns crop insurance schemes & guidance
 */
router.get('/insurance', (req, res) => {
  try {
    const schemes = dbService.getInsuranceSchemes();
    return res.status(200).json({
      success: true,
      count: schemes.length,
      data: schemes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch insurance schemes'
    });
  }
});

module.exports = router;
