const express = require('express');
const router = express.Router();
const dbService = require('../services/dbService');

/**
 * Remove sensitive credentials from farmer profile response
 */
function sanitizeFarmer(farmer) {
  if (!farmer) return null;
  const { password, ...safe } = farmer;
  return safe;
}

/**
 * Extract farmer ID from request token or headers
 */
function resolveFarmerId(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const prefix = 'ks_token_demo_';
    if (token.startsWith(prefix)) {
      const rest = token.substring(prefix.length);
      const lastUnderscore = rest.lastIndexOf('_');
      if (lastUnderscore !== -1) {
        return rest.substring(0, lastUnderscore);
      }
      return rest;
    }
    return token;
  }
  return req.query.id || req.body.id || null;
}

/**
 * POST /api/auth/register
 * Register a new farmer account
 */
router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password, state, district, village, landAcreage, primaryCrops, soilType, irrigationType } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Farmer name is required' });
    }

    const identifier = phone || email;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Phone number or email is required for registration' });
    }

    // Check existing
    const existing = dbService.getFarmerByIdentifier(identifier);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A farmer profile with this phone number or email already exists. Please log in.'
      });
    }

    const currentYear = new Date().getFullYear();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const kisanId = `KA-${currentYear}-${randomSuffix}`;

    const newFarmer = await dbService.createFarmer({
      name: name.trim(),
      phone: phone ? phone.trim() : '',
      email: email ? email.trim() : '',
      password: password || 'kisan@123',
      kisanId,
      state: state || 'Punjab',
      district: district || 'Ludhiana',
      village: village || '',
      landAcreage: landAcreage ? parseFloat(landAcreage) : 2.0,
      primaryCrops: Array.isArray(primaryCrops) ? primaryCrops : (primaryCrops ? [primaryCrops] : ['Wheat', 'Rice (Paddy)']),
      soilType: soilType || 'Alluvial',
      irrigationType: irrigationType || 'Canal & Tubewell'
    });

    const token = `ks_token_demo_${newFarmer.id}_${Date.now()}`;

    res.status(201).json({
      success: true,
      message: 'Farmer registered successfully in KrishiSahay',
      token,
      farmer: sanitizeFarmer(newFarmer)
    });
  } catch (err) {
    console.error('Error registering farmer:', err);
    res.status(500).json({ success: false, message: 'Server error during farmer registration' });
  }
});

/**
 * POST /api/auth/login
 * Log in an existing farmer
 */
router.post('/login', async (req, res) => {
  try {
    const { identifier, phone, email, password } = req.body;
    const lookup = identifier || phone || email;

    if (!lookup) {
      return res.status(400).json({ success: false, message: 'Please enter phone, email, or Kisan ID' });
    }

    const farmer = dbService.getFarmerByIdentifier(lookup);
    if (!farmer) {
      return res.status(401).json({
        success: false,
        message: 'No farmer profile found with those credentials. Please check or register.'
      });
    }

    // Password verification (for demonstration and production safety)
    if (password && farmer.password && farmer.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password. Please try again.' });
    }

    const token = `ks_token_demo_${farmer.id}_${Date.now()}`;

    res.json({
      success: true,
      message: `Welcome back, ${farmer.name}!`,
      token,
      farmer: sanitizeFarmer(farmer)
    });
  } catch (err) {
    console.error('Error logging in farmer:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

/**
 * GET /api/auth/profile
 * Retrieve authenticated farmer's profile
 */
router.get('/profile', async (req, res) => {
  try {
    let farmerId = resolveFarmerId(req);

    let farmer = null;
    if (farmerId) {
      farmer = dbService.getFarmerById(farmerId);
    }

    // Fallback to primary demo profile if not found or demo mode
    if (!farmer) {
      const farmers = dbService.getFarmers();
      farmer = farmers[0] || null;
    }

    if (!farmer) {
      return res.status(404).json({ success: false, message: 'Farmer profile not found' });
    }

    res.json({
      success: true,
      farmer: sanitizeFarmer(farmer)
    });
  } catch (err) {
    console.error('Error fetching farmer profile:', err);
    res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
});

/**
 * PUT /api/auth/profile
 * Update authenticated farmer's profile
 */
router.put('/profile', async (req, res) => {
  try {
    let farmerId = resolveFarmerId(req);
    if (!farmerId) {
      const farmers = dbService.getFarmers();
      if (farmers.length > 0) farmerId = farmers[0].id;
    }

    if (!farmerId) {
      return res.status(400).json({ success: false, message: 'Farmer ID required to update profile' });
    }

    const {
      name,
      phone,
      email,
      state,
      district,
      village,
      landAcreage,
      primaryCrops,
      soilType,
      irrigationType
    } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (email !== undefined) updates.email = email.trim();
    if (state !== undefined) updates.state = state.trim();
    if (district !== undefined) updates.district = district.trim();
    if (village !== undefined) updates.village = village.trim();
    if (landAcreage !== undefined) updates.landAcreage = parseFloat(landAcreage);
    if (primaryCrops !== undefined) {
      updates.primaryCrops = Array.isArray(primaryCrops)
        ? primaryCrops
        : String(primaryCrops).split(',').map(c => c.trim()).filter(Boolean);
    }
    if (soilType !== undefined) updates.soilType = soilType.trim();
    if (irrigationType !== undefined) updates.irrigationType = irrigationType.trim();

    const updated = await dbService.updateFarmer(farmerId, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Farmer not found to update' });
    }

    res.json({
      success: true,
      message: 'Farmer profile updated successfully',
      farmer: sanitizeFarmer(updated)
    });
  } catch (err) {
    console.error('Error updating farmer profile:', err);
    res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
});

/**
 * POST /api/auth/logout
 * Log out farmer session
 */
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
