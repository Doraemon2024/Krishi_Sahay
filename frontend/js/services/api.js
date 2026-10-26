/**
 * KrishiSahay Frontend API Client Service
 */
const API_BASE = '/api';

class ApiClient {
  /**
   * Submit leaf photo or sample ID for AI Diagnosis
   */
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
      const data = json.data;
      return typeof I18nService !== 'undefined' ? I18nService.translateOnlineData(data, 'diagnosis') : data;
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
      const list = json.data || [];
      if (typeof I18nService !== 'undefined') {
        return list.map(item => I18nService.translateOnlineData(item, 'diagnosis'));
      }
      return list;
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
      const data = json.data || null;
      return (data && typeof I18nService !== 'undefined') ? I18nService.translateOnlineData(data, 'diagnosis') : data;
    } catch (error) {
      console.error('API Diagnosis Detail Error:', error);
      return null;
    }
  }

  /**
   * Fetch Weather & Climate Risk Score for ANY location in India
   */
  static async getWeather(location = 'punjab', forceRefresh = false, customCoords = null) {
    try {
      let url = `${API_BASE}/weather?location=${encodeURIComponent(location)}${forceRefresh ? '&refresh=true' : ''}`;
      if (customCoords && customCoords.lat && customCoords.lon) {
        url += `&lat=${customCoords.lat}&lon=${customCoords.lon}&name=${encodeURIComponent(customCoords.name || '')}&state=${encodeURIComponent(customCoords.state || '')}`;
      }
      const response = await fetch(url);
      const json = await response.json();
      return typeof I18nService !== 'undefined' ? I18nService.translateOnlineData(json, 'weather') : json;
    } catch (error) {
      console.error('API Weather Error:', error);
      return null;
    }
  }

  /**
   * Fetch Categorized Recommendations for ANY location in India
   */
  static async getRecommendations(location = 'punjab', forceRefresh = false, customCoords = null) {
    try {
      let url = `${API_BASE}/recommendations?location=${encodeURIComponent(location)}${forceRefresh ? '&refresh=true' : ''}`;
      if (customCoords && customCoords.lat && customCoords.lon) {
        url += `&lat=${customCoords.lat}&lon=${customCoords.lon}&name=${encodeURIComponent(customCoords.name || '')}&state=${encodeURIComponent(customCoords.state || '')}`;
      }
      const response = await fetch(url);
      const json = await response.json();
      const data = json.data || [];
      return typeof I18nService !== 'undefined' ? I18nService.translateOnlineData(data, 'recommendations') : data;
    } catch (error) {
      console.error('API Recommendations Error:', error);
      return [];
    }
  }

  /**
   * Search ANY district, city, or village across India
   */
  static async searchLocations(query = '') {
    try {
      const response = await fetch(`${API_BASE}/locations/search?q=${encodeURIComponent(query)}`);
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error('API Location Search Error:', error);
      return [];
    }
  }

  /**
   * Get all 28 states and 8 union territories of India
   */
  static async getAllLocations() {
    try {
      const response = await fetch(`${API_BASE}/locations/all`);
      const json = await response.json();
      return json.data || [];
    } catch (error) {
      console.error('API All Locations Error:', error);
      return [];
    }
  }

  /**
   * Fetch Helplines Directory
   */
  static async getHelplines(forceRefresh = false) {
    try {
      const url = `${API_BASE}/helplines${forceRefresh ? '?refresh=true' : ''}`;
      const response = await fetch(url);
      const json = await response.json();
      const data = json.data || [];
      return typeof I18nService !== 'undefined' ? I18nService.translateOnlineData(data, 'helplines') : data;
    } catch (error) {
      console.error('API Helplines Error:', error);
      return [];
    }
  }

  /**
   * Fetch Crop Insurance Schemes
   */
  static async getInsuranceSchemes(forceRefresh = false) {
    try {
      const url = `${API_BASE}/insurance${forceRefresh ? '?refresh=true' : ''}`;
      const response = await fetch(url);
      const json = await response.json();
      const data = json.data || [];
      return typeof I18nService !== 'undefined' ? I18nService.translateOnlineData(data, 'insurance') : data;
    } catch (error) {
      console.error('API Insurance Error:', error);
      return [];
    }
  }

  /**
   * Fetch Awareness Workshops
   */
  static async getAwarenessEvents(forceRefresh = false) {
    try {
      const url = `${API_BASE}/awareness${forceRefresh ? '?refresh=true' : ''}`;
      const response = await fetch(url);
      const json = await response.json();
      const data = json.data || [];
      return typeof I18nService !== 'undefined' ? I18nService.translateOnlineData(data, 'awareness') : data;
    } catch (error) {
      console.error('API Awareness Error:', error);
      return [];
    }
  }

  /**
   * Fetch Awareness Events
   */
  static async getEvents(forceRefresh = false) {
    try {
      const url = `${API_BASE}/awareness${forceRefresh ? '?refresh=true' : ''}`;
      const response = await fetch(url);
      const json = await response.json();
      const data = json.data || [];
      return typeof I18nService !== 'undefined' ? I18nService.translateOnlineData(data, 'awareness') : data;
    } catch (error) {
      console.error('API Awareness Error:', error);
      return [];
    }
  }

  /**
   * Fetch all dynamically synchronized data across modules
   */
  static async getAllSyncedData(location = 'punjab') {
    try {
      const response = await fetch(`${API_BASE}/sync/all?location=${encodeURIComponent(location)}`);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Sync All Error:', error);
      return null;
    }
  }

  /**
   * Trigger immediate online re-fetch & AI dynamic re-calculation
   */
  static async triggerOnlineSync(location = 'punjab') {
    try {
      const response = await fetch(`${API_BASE}/sync/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location })
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('API Sync Trigger Error:', error);
      return null;
    }
  }

  /**
   * Fetch Privacy Policy Data
   */
  static async getPrivacyPolicy() {
    try {
      const response = await fetch(`${API_BASE}/privacy`);
      const json = await response.json();
      const policy = json.policy || null;
      return (policy && typeof I18nService !== 'undefined') ? I18nService.translateOnlineData(policy, 'privacy') : policy;
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
