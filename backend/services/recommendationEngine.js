const dbService = require('./dbService');
const WeatherService = require('./weatherService');

class RecommendationEngine {
  /**
   * Generates dynamic, context-aware crop health recommendations
   * @param {string} regionId - Punjab, Maharashtra, UP, etc.
   */
  static generateRecommendations(regionId = 'punjab') {
    const weather = WeatherService.getWeather(regionId);
    const history = dbService.getDiagnosesHistory();
    const latestDiagnosis = history[0] || null;

    const recommendations = [];

    // Rule 1: High Weather Climate Risk Score
    if (weather && weather.riskLevel === 'HIGH') {
      recommendations.push({
        id: 'rec_weather_risk',
        category: 'Immediate Actions',
        title: `High Fungal Outbreak Risk in ${weather.state || 'Region'}`,
        description: `Current humidity (${weather.humidity}%) and rain probability (${weather.rainProbability}%) increase vulnerability to Rice Blast and Rust spores.`,
        priority: 'Urgent',
        priorityClass: 'priority-high',
        icon: 'alert-triangle',
        actionText: 'View Weather Risk',
        targetTab: 'weather',
        steps: [
          'Inspect leaf undersides for powdery spots or diamond lesions.',
          'Ensure farm drainage channels are open and free of blockage.',
          'Prepare protective fungicide spray for the next dry morning window.'
        ]
      });
    }

    // Rule 2: Active Recent Diagnosis Follow-up
    if (latestDiagnosis && latestDiagnosis.severity !== 'NONE') {
      recommendations.push({
        id: 'rec_active_treatment',
        category: 'Treatment',
        title: `Active Care for ${latestDiagnosis.crop}: ${latestDiagnosis.disease}`,
        description: `Follow up on your recent AI diagnosis report (${latestDiagnosis.formattedDate}). Apply target treatment steps to prevent spreading.`,
        priority: 'Recommended',
        priorityClass: 'priority-medium',
        icon: 'droplet',
        actionText: 'View Treatment Steps',
        targetTab: 'problem',
        steps: latestDiagnosis.treatments ? latestDiagnosis.treatments.map(t => `${t.title}: ${t.description}`) : [
          'Apply recommended systemic spray early morning.',
          'Suspend top-dressing of Urea nitrogen until leaves recover.'
        ]
      });
    }

    // Rule 3: General Preventive Care
    recommendations.push({
      id: 'rec_bio_prevention',
      category: 'Prevention',
      title: 'Biological Soil & Seed Health Conditioning',
      description: 'Strengthen crop immunity against root rot and wilt pathogens by incorporating beneficial bio-agents during land prep.',
      priority: 'Recommended',
      priorityClass: 'priority-medium',
      icon: 'shield-check',
      actionText: 'Learn Prevention',
      targetTab: 'problem',
      steps: [
        'Apply Trichoderma viride @ 5kg/acre mixed with well-rotted FYM compost.',
        'Treat seeds with Pseudomonas fluorescens @ 10g/kg seed before sowing.'
      ]
    });

    // Rule 4: Optimal Spray Window Weather Advice
    recommendations.push({
      id: 'rec_spray_window',
      category: 'Weather-Based Advice',
      title: weather ? `Spray Window: ${weather.recommendedAction}` : 'Optimal Spray Window Advice',
      description: 'Foliar chemical sprays are 3x more effective when applied during early morning dew drying without heavy rainfall forecast within 6 hours.',
      priority: 'Info',
      priorityClass: 'priority-low',
      icon: 'sun',
      actionText: 'Check Forecast',
      targetTab: 'weather',
      steps: [
        'Spray during 6:00 AM - 9:00 AM window.',
        'Use flat fan nozzle for uniform leaf canopy coverage.'
      ]
    });

    return {
      weatherSummary: weather,
      latestDiagnosis,
      recommendations
    };
  }
}

module.exports = RecommendationEngine;
