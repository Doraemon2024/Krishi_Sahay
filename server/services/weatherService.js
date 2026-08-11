const dbService = require('./dbService');

class WeatherService {
  /**
   * Fetch weather details and compute agricultural Climate Risk Score
   * @param {string} regionId - Punjab, Maharashtra, UP, Karnataka, etc.
   */
  static getWeather(regionId = 'punjab') {
    const regionData = dbService.getWeatherByRegion(regionId);
    if (!regionData) {
      return null;
    }

    // Dynamic Risk Calculation engine
    const humidity = regionData.humidity;
    const rainProb = regionData.rainProbability;
    const temp = regionData.temp;

    // Formula: Risk Score (0-100) based on disease-conducive environmental factor
    let score = Math.round((humidity * 0.5) + (rainProb * 0.4) + (temp > 25 && temp < 32 ? 10 : 0));
    score = Math.min(99, Math.max(15, score));

    let riskLevel = 'LOW';
    let riskBadgeClass = 'risk-low';
    let riskReason = 'Favorable weather conditions with minimal fungal disease risks.';
    let recommendedAction = 'Good weather window available for routine field care.';

    if (score >= 70) {
      riskLevel = 'HIGH';
      riskBadgeClass = 'risk-high';
      riskReason = `High atmospheric humidity (${humidity}%) and rain probability (${rainProb}%) create prime conditions for fungal leaf blast and rust spore outbreaks.`;
      recommendedAction = 'Spray protective fungicide within 24-36 hours. Ensure farm field drainage is clear.';
    } else if (score >= 45) {
      riskLevel = 'MEDIUM';
      riskBadgeClass = 'risk-medium';
      riskReason = `Moderate humidity (${humidity}%) and cloud cover increase vulnerability to bacterial leaf spots and early blight.`;
      recommendedAction = 'Inspect foliage twice weekly. Avoid overhead watering during late evenings.';
    }

    return {
      ...regionData,
      riskScore: score,
      riskLevel,
      riskBadgeClass,
      riskReason,
      recommendedAction
    };
  }
}

module.exports = WeatherService;
