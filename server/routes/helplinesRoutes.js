const express = require('express');
const router = express.Router();
const dbService = require('../services/dbService');

/**
 * GET /api/helplines
 * Returns official agricultural helpline contacts
 */
router.get('/helplines', (req, res) => {
  try {
    const helplines = dbService.getHelplines();
    return res.status(200).json({
      success: true,
      count: helplines.length,
      data: helplines
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch helpline directory'
    });
  }
});

module.exports = router;
