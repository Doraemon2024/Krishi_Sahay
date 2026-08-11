/**
 * KrishiSahay Frontend API Client Service
 */
const API_BASE = '/api';

class ApiClient {
  /**
   * Submit leaf photo or sample ID for AI Diagnosis
   */
  static async diagnoseCrop(formData) {
    try {
      const response = await fetch(`${API_BASE}/diagnose`, {
        method: 'POST',
        body: formData
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || 'Diagnosis failed');
      return json.data;
    } catch (error) {
      console.error('API Diagnose Error:', error);
      throw error;
    }
  }

  /**
   * Fetch diagnosis history
   */
  static async getDiagnosesHistory() {
    try {
      const response = await fetch(`${API_BASE}/diagnoses`);
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error('API History Error:', error);
      return [];
    }
  }

  /**
   * Fetch specific diagnosis report details
   */
  static async getDiagnosisById(id) {
    try {
      const response = await fetch(`${API_BASE}/diagnoses/${id}`);
      const json = await response.json();
      return json.data || null;
    } catch (error) {
      console.error('API Diagnosis Detail Error:', error);
      return null;
    }
  }

  /**
   * Fetch Weather & Climate Risk Score
   */
  static async getWeather(location = 'punjab') {
    try {
      const response = await fetch(`${API_BASE}/weather?location=${encodeURIComponent(location)}`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Weather Error:', error);
      return null;
    }
  }

  /**
   * Fetch Categorized Recommendations
   */
  static async getRecommendations(location = 'punjab') {
    try {
      const response = await fetch(`${API_BASE}/recommendations?location=${encodeURIComponent(location)}`);
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error('API Recommendations Error:', error);
      return [];
    }
  }

  /**
   * Fetch Helplines Directory
   */
  static async getHelplines() {
    try {
      const response = await fetch(`${API_BASE}/helplines`);
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error('API Helplines Error:', error);
      return [];
    }
  }

  /**
   * Fetch Crop Insurance Schemes
   */
  static async getInsuranceSchemes() {
    try {
      const response = await fetch(`${API_BASE}/insurance`);
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error('API Insurance Error:', error);
      return [];
    }
  }

  /**
   * Fetch Awareness Events
   */
  static async getEvents() {
    try {
      const response = await fetch(`${API_BASE}/awareness`);
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error('API Awareness Error:', error);
      return [];
    }
  }

  /**
   * Fetch Privacy Policy Data
   */
  static async getPrivacyPolicy() {
    try {
      const response = await fetch(`${API_BASE}/privacy`);
      const json = await response.json();
      return json.policy || null;
    } catch (error) {
      console.error('API Privacy Error:', error);
      return null;
    }
  }

  /**
   * Export user privacy data
   */
  static async exportPrivacyData() {
    try {
      const response = await fetch(`${API_BASE}/privacy/export`, { method: 'POST' });
      return await response.json();
    } catch (error) {
      console.error('API Export Error:', error);
      throw error;
    }
  }

  /**
   * Delete all diagnosis records
   */
  static async wipeAllData() {
    try {
      const response = await fetch(`${API_BASE}/privacy/delete-all`, { method: 'DELETE' });
      return await response.json();
    } catch (error) {
      console.error('API Wipe Error:', error);
      throw error;
    }
  }
}
