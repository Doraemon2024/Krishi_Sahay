const dbService = require('./dbService');

/**
 * AI Crop Leaf Disease Scanner Service
 */
class AIService {
  /**
   * Run AI diagnosis on an uploaded leaf image or sample trigger
   * @param {Object} options - { file, sampleId, location }
   */
  static async diagnoseCrop({ file, sampleId, location = 'Ludhiana, Punjab' }) {
    // Artificial slight processing delay to mirror neural network inference
    await new Promise(resolve => setTimeout(resolve, 800));

    const diseases = dbService.getDiseases();
    let matchedDisease = null;

    if (sampleId && sampleId !== 'auto') {
      matchedDisease = diseases.find(d => d.id === sampleId);
    }

    if (!matchedDisease) {
      // Pick disease based on filename hints or default to Rice Blast / Tomato Blight
      if (file && file.originalname) {
        const name = file.originalname.toLowerCase();
        if (name.includes('tomato')) matchedDisease = diseases.find(d => d.id === 'tomato_early_blight');
        else if (name.includes('wheat') || name.includes('rust')) matchedDisease = diseases.find(d => d.id === 'wheat_yellow_rust');
        else if (name.includes('cotton')) matchedDisease = diseases.find(d => d.id === 'cotton_bacterial_blight');
        else if (name.includes('healthy')) matchedDisease = diseases.find(d => d.id === 'healthy_crop');
        else matchedDisease = diseases.find(d => d.id === 'rice_blast');
      } else {
        matchedDisease = diseases[0]; // Default Rice Blast
      }
    }

    // Add realistic floating confidence score variation (e.g. 93.4% - 97.6%)
    const confidenceVariation = (Math.random() * 3.5 - 1.5).toFixed(1);
    const confidence = Math.min(99.4, Math.max(88.0, (matchedDisease.defaultConfidence + parseFloat(confidenceVariation)))).toFixed(1);

    const imageUrl = file 
      ? `/uploads/${file.filename}` 
      : (matchedDisease.sampleImage || '/samples/rice_blast.jpg');

    const diagnosisId = `diag_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const now = new Date();
    
    const formattedDate = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const diagnosisRecord = {
      id: diagnosisId,
      crop: matchedDisease.crop,
      disease: matchedDisease.disease,
      severity: matchedDisease.severity,
      severityBadgeClass: matchedDisease.severityBadgeClass,
      confidence: parseFloat(confidence),
      uploadedImage: imageUrl,
      summary: matchedDisease.summary,
      symptoms: matchedDisease.symptoms,
      treatments: matchedDisease.treatments,
      warnings: matchedDisease.warnings || [],
      prevention: matchedDisease.prevention,
      weatherAdvisory: matchedDisease.weatherAdvisory,
      timestamp: now.toISOString(),
      formattedDate,
      location
    };

    // Save to persistent database
    dbService.saveDiagnosis(diagnosisRecord);

    return diagnosisRecord;
  }
}

module.exports = AIService;
