const express = require('express');
const router = express.Router();
const dbService = require('../services/dbService');

/**
 * GET /api/awareness
 * Returns agricultural awareness workshops & events
 */
router.get('/awareness', (req, res) => {
  try {
    const events = dbService.getEvents();
    return res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch awareness events'
    });
  }
});

module.exports = router;
