/**
 * Weather & Climate Risk Score View Component (All-India Real-Time Dynamic Auto-Updated)
 */
async function renderWeatherView() {
  const activeLocation = localStorage.getItem('krishi_location') || 'punjab';
  const customCoordsStr = localStorage.getItem('krishi_custom_coords');
  let customCoords = null;
  try { if (customCoordsStr) customCoords = JSON.parse(customCoordsStr); } catch (e) {}

  const weatherRes = await ApiClient.getWeather(activeLocation, false, customCoords);
  const weather = (weatherRes && weatherRes.data) ? weatherRes.data : {};
  const regions = (weatherRes && weatherRes.regions) ? weatherRes.regions : [];
  window._latestWeather = weather;

  const t = (k, f) => (typeof I18nService !== 'undefined' ? I18nService.t(k, f) : f);
  const currentLang = typeof I18nService !== 'undefined' ? I18nService.getLanguage() : 'en';
  const supportedLangs = typeof I18nService !== 'undefined' ? I18nService.getSupportedLanguages() : [];
  const currentLangObj = supportedLangs.find(l => l.code === currentLang) || { native: 'English', name: 'English' };

  return `
    <section class="page-section">
      <div class="container">
        <!-- Live Online Data Synchronization Header Banner -->
        <div class="live-banner-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="live-pulse-dot"></span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green);">
              ${t('weather_banner', 'Pan-India Agricultural Micro-Climate Mesh Online')}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-secondary); opacity: 0.9;">
              • ${t('weather_banner_sub', 'Covering All 28 States & 8 Union Territories')}
            </span>
          </div>

          <div style="display: flex; gap: var(--space-2); align-items: center;">
            <span style="font-size: 0.8rem; color: var(--text-light);">${weather.lastUpdated || 'Just Now'}</span>
            <button id="weather-sync-btn" class="btn btn-sm btn-secondary" style="gap: 6px; padding: 4px 12px; font-size: 0.8rem;">
              ${svgIcons.refresh(14)}
              <span>${t('refresh_live', 'Refresh Live Data')}</span>
            </button>
          </div>
        </div>

        <div class="section-header">
          <h2 class="section-title">${t('weather_title', 'Agricultural Weather & Climate Risk')}</h2>
          <p class="section-subtitle">${t('weather_sub', 'Real-time micro-climate monitoring and fungal spore outbreak risk predictions tailored for any farm in India.')}</p>
        </div>

        <!-- All-India Location Search & GPS Toolbar -->
        <div class="card" style="margin-bottom: var(--space-8); padding: var(--space-5); border: 2px solid rgba(27,77,62,0.15); box-shadow: var(--shadow-md);">
          <div style="display: flex; gap: var(--space-4); flex-wrap: wrap; align-items: center; justify-content: space-between;">
            <!-- Real-Time District/Village Search Input -->
            <div style="flex: 1; min-width: 280px; position: relative;">
              <div style="display: flex; align-items: center; gap: 10px; background-color: var(--bg-surface-secondary); padding: 10px 16px; border-radius: var(--radius-md); border: 1px solid rgba(27,77,62,0.2);">
                ${svgIcons.search(20, 'color: var(--primary-green);')}
                <input type="text" id="weather-district-search" placeholder="${t('weather_search_ph', 'Search any district, city, or village in India (e.g. Guntur, Burdwan, Nagpur, Karnal, Indore...)')}" style="border: none; background: transparent; width: 100%; outline: none; font-size: 0.95rem; font-family: inherit;">
                <span id="search-spinner" style="display: none; font-size: 0.8rem; color: var(--primary-green);">Searching...</span>
              </div>

              <!-- Live Autocomplete Results Dropdown -->
              <div id="search-autocomplete-box" class="search-autocomplete-box" style="display: none;"></div>
            </div>

            <!-- GPS Auto-Detect Farm Button -->
            <button id="detect-gps-btn" class="btn btn-secondary" style="gap: 8px; font-weight: 700; border-color: var(--secondary-green); color: var(--primary-green);">
              ${svgIcons.mapPin(18)}
              <span>${t('detect_gps', '📍 Detect My Farm (GPS)')}</span>
            </button>
          </div>

          <!-- All States & UTs Quick Dropdown -->
          <div style="margin-top: var(--space-4); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3); padding-top: var(--space-4); border-top: 1px solid rgba(27,77,62,0.08);">
            <div style="display: flex; align-items: center; gap: 8px;">
              ${svgIcons.mapPin(18, 'color: var(--primary-green);')}
              <span style="font-size: 0.875rem; font-weight: 700; color: var(--primary-green);">${t('active_zone', 'Active Zone:')}</span>
              <span id="active-location-name" style="font-size: 0.95rem; font-weight: 800; color: var(--text-main);">${weather.name || 'Punjab Zone'}</span>
              ${weather.cropHub ? `<span class="badge badge-low" style="font-size: 0.75rem;">${t('major_crops', 'Major Crops:')} ${weather.cropHub}</span>` : ''}
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <label for="all-states-selector" style="font-size: 0.825rem; font-weight: 600; color: var(--text-secondary);">${t('select_state', 'Browse by State/UT:')}</label>
              <select id="all-states-selector" style="padding: 6px 12px; border-radius: var(--radius-md); border: 1px solid rgba(27,77,62,0.2); background-color: var(--bg-surface); color: var(--text-main); font-weight: 600; outline: none; cursor: pointer; max-width: 220px;">
                ${customCoords ? `<option value="custom_gps" selected>📍 ${customCoords.name}</option>` : ''}
                ${regions.map(r => `
                  <option value="${r.id}" ${(!customCoords && r.id === weather.id) ? 'selected' : ''}>
                    ${r.name} (${r.state})
                  </option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- Prominent Climate Risk Score Component -->
        <div style="margin-bottom: var(--space-8);">
          <div class="climate-risk-box">
            <div class="risk-score-circle ${weather.riskBadgeClass || 'risk-low'}">
              <span class="risk-num">${weather.riskScore || 25}</span>
              <span class="risk-label">${weather.riskLevelDisplay || weather.riskLevel || 'LOW'} ${t('risk_level', 'RISK')}</span>
            </div>

            <div>
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2); flex-wrap: wrap;">
                <span class="badge ${weather.riskBadgeClass || 'risk-low'}">${t('weather_risk_assessment', 'AI CLIMATE RISK ASSESSMENT')}</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">Coordinates: ${weather.lat ? weather.lat.toFixed(2) : '30.90'}°N, ${weather.lon ? weather.lon.toFixed(2) : '75.85'}°E</span>
              </div>

              <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--primary-green); margin-bottom: var(--space-2);">
                ${weather.riskLevelDisplay || weather.riskLevel || 'LOW'} ${t('outbreak_risk_in', 'Fungal Spore Outbreak Risk in')} ${weather.state || 'Selected Region'}
              </h3>

              <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.6;">
                <strong>${t('biological_rationale', 'Biological Rationale:')}</strong> ${weather.riskReason || 'Optimal atmospheric humidity and moderate temperatures.'}
              </p>

              <div style="padding: var(--space-4); background-color: var(--bg-surface-secondary); border-left: 4px solid var(--primary-green); border-radius: var(--radius-sm); margin-bottom: var(--space-4);">
                <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--primary-green); margin-bottom: 2px;">${t('weather_action', 'Recommended Agricultural Action:')}</h4>
                <p style="font-size: 0.9rem; color: var(--text-main);">${weather.recommendedAction || 'Continue routine crop care.'}</p>
              </div>

              <!-- Native Weather Voice Advisory Player -->
              <div class="voice-advisory-banner">
                <div class="voice-advisory-left">
                  <div class="voice-audio-icon">
                    ${svgIcons.volume2(20)}
                  </div>
                  <div>
                    <div class="voice-advisory-title">
                      <span>${t('listen_voice', 'Listen Weather Voice Advisory')}</span>
                      <span class="voice-lang-pill" id="weather-voice-lang-badge">${currentLangObj.native}</span>
                    </div>
                    <div class="voice-advisory-subtitle">${t('weather_voice_subtitle', 'Micro-climate summary & spore risk audio spoken in your selected regional language.')}</div>
                  </div>
                </div>

                <div class="voice-advisory-controls">
                  <select id="weather-voice-lang-select" class="voice-lang-picker" aria-label="Select Weather Voice Language">
                    ${supportedLangs.map(l => `
                      <option value="${l.code}" ${l.code === currentLang ? 'selected' : ''}>
                        ${l.native} (${l.name})
                      </option>
                    `).join('')}
                  </select>

                  <button id="weather-voice-play-btn" class="btn btn-sm btn-primary voice-toggle-btn">
                    ${svgIcons.volume2(16)}
                    <span id="weather-voice-btn-text">🔊 Listen in ${currentLangObj.native}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Current Weather Metrics Bar -->
        <div class="grid-3" style="margin-bottom: var(--space-8);">
          <div class="card" style="display: flex; align-items: center; gap: var(--space-4);">
            <div class="stat-icon" style="background-color: var(--accent-gold-light); color: var(--accent-gold);">
              ${svgIcons.sun(28)}
            </div>
            <div>
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary);">${t('weather_temp', 'Live Temperature')}</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary-green);">${weather.temp || 28}°C</div>
              <div style="font-size: 0.8rem; color: var(--text-light);">${weather.condition || 'Clear Sky'}</div>
            </div>
          </div>

          <div class="card" style="display: flex; align-items: center; gap: var(--space-4);">
            <div class="stat-icon" style="background-color: var(--color-info-bg); color: var(--color-info);">
              ${svgIcons.droplet(28)}
            </div>
            <div>
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary);">${t('weather_humidity', 'Relative Humidity')}</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary-green);">${weather.humidity || 65}%</div>
              <div style="font-size: 0.8rem; color: var(--text-light);">${t('rain_probability', 'Rain Chance:')} ${weather.rainProbability || 20}%</div>
            </div>
          </div>

          <div class="card" style="display: flex; align-items: center; gap: var(--space-4);">
            <div class="stat-icon" style="background-color: var(--secondary-green-light); color: var(--secondary-green);">
              ${svgIcons.weather(28)}
            </div>
            <div>
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary);">${t('weather_wind', 'Wind & UV Index')}</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary-green);">${weather.windSpeed || 10} km/h</div>
              <div style="font-size: 0.8rem; color: var(--text-light);">UV Index: ${weather.uvIndex || 6}</div>
            </div>
          </div>
        </div>

        <!-- 7-Day Forecast Grid -->
        <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-4);">${t('weather_forecast', '7-Day Live Agricultural Weather Forecast')}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-4);">
          ${(weather.forecast || []).map(f => `
            <div class="card" style="text-align: center; padding: var(--space-4); border: 1px solid rgba(27,77,62,0.08);">
              <div style="font-weight: 700; color: var(--primary-green); margin-bottom: 4px;">${f.day}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: var(--space-3); min-height: 34px;">${f.condition}</div>
              <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">${f.high}° / ${f.low}°</div>
              <div style="font-size: 0.75rem; color: var(--color-info); margin-top: 4px; font-weight: 600;">💧 ${f.rain}% ${t('rain_probability', 'Rain')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function initWeatherListeners() {
  const allStatesSelector = document.getElementById('all-states-selector');
  const searchInput = document.getElementById('weather-district-search');
  const searchResultsBox = document.getElementById('search-autocomplete-box');
  const searchSpinner = document.getElementById('search-spinner');
  const detectGpsBtn = document.getElementById('detect-gps-btn');
  const syncBtn = document.getElementById('weather-sync-btn');

  let debounceTimer = null;

  // Search input with debounce
  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(debounceTimer);
    if (query.length < 2) {
      searchResultsBox.style.display = 'none';
      return;
    }

    if (searchSpinner) searchSpinner.style.display = 'inline';

    debounceTimer = setTimeout(async () => {
      const results = await ApiClient.searchLocations(query);
      if (searchSpinner) searchSpinner.style.display = 'none';

      if (results && results.length > 0) {
        searchResultsBox.innerHTML = results.map(item => `
          <div class="autocomplete-item" data-id="${item.id}" data-lat="${item.lat}" data-lon="${item.lon}" data-name="${item.name}" data-state="${item.state}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>${item.name}</strong>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${item.state} • ${item.cropHub || 'Agricultural Zone'}</div>
              </div>
              <span style="font-size: 0.75rem; color: var(--primary-green); font-weight: 600;">Select ➜</span>
            </div>
          </div>
        `).join('');
        searchResultsBox.style.display = 'block';

        // Attach item click listeners
        searchResultsBox.querySelectorAll('.autocomplete-item').forEach(el => {
          el.addEventListener('click', () => {
            const id = el.getAttribute('data-id');
            const lat = parseFloat(el.getAttribute('data-lat'));
            const lon = parseFloat(el.getAttribute('data-lon'));
            const name = el.getAttribute('data-name');
            const state = el.getAttribute('data-state');

            localStorage.setItem('krishi_location', id);
            localStorage.setItem('krishi_custom_coords', JSON.stringify({ lat, lon, name, state }));
            
            searchResultsBox.style.display = 'none';
            searchInput.value = '';
            showToast(`Location set to ${name}! Fetching real-time weather & risk...`, 'success');
            if (typeof handleRoute === 'function') handleRoute();
          });
        });
      } else {
        searchResultsBox.innerHTML = `<div style="padding: 12px; color: var(--text-secondary); font-size: 0.85rem;">No Indian locations found matching "${query}". Try another district or state.</div>`;
        searchResultsBox.style.display = 'block';
      }
    }, 300);
  });

  // Close search dropdown on click outside
  document.addEventListener('click', (e) => {
    if (searchResultsBox && !searchResultsBox.contains(e.target) && e.target !== searchInput) {
      searchResultsBox.style.display = 'none';
    }
  });

  // GPS Auto-Detection
  detectGpsBtn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    showToast('Acquiring farm GPS coordinates...', 'info');
    detectGpsBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        detectGpsBtn.disabled = false;
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const name = `My Farm (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;

        localStorage.setItem('krishi_location', 'custom_gps');
        localStorage.setItem('krishi_custom_coords', JSON.stringify({ lat, lon, name, state: 'Local Farm' }));
        showToast('Farm GPS acquired! Loading localized weather & risk score...', 'success');
        if (typeof handleRoute === 'function') handleRoute();
      },
      (err) => {
        detectGpsBtn.disabled = false;
        console.warn('Geolocation error:', err);
        showToast('Unable to retrieve GPS coordinates. Please select your state or search district above.', 'error');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });

  // State / UT Select Change
  allStatesSelector?.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'custom_gps') return;
    localStorage.removeItem('krishi_custom_coords');
    localStorage.setItem('krishi_location', val);
    showToast('Loading agricultural data for selected state...', 'info');
    if (typeof handleRoute === 'function') handleRoute();
  });

  // Refresh Sync Button
  syncBtn?.addEventListener('click', async () => {
    syncBtn.classList.add('sync-spinning');
    showToast('Re-synchronizing live weather for your location...', 'info');
    const activeLocation = localStorage.getItem('krishi_location') || 'punjab';
    const customCoordsStr = localStorage.getItem('krishi_custom_coords');
    let customCoords = null;
    try { if (customCoordsStr) customCoords = JSON.parse(customCoordsStr); } catch (err) {}

    await ApiClient.getWeather(activeLocation, true, customCoords);
    syncBtn.classList.remove('sync-spinning');
    showToast('Live weather updated from online satellite mesh!', 'success');
    if (typeof handleRoute === 'function') handleRoute();
  });

  // Native Weather Voice Advisory Audio Listeners
  const weatherVoicePlayBtn = document.getElementById('weather-voice-play-btn');
  const weatherVoiceLangSelect = document.getElementById('weather-voice-lang-select');
  const weatherVoiceBtnText = document.getElementById('weather-voice-btn-text');
  const weatherVoiceLangBadge = document.getElementById('weather-voice-lang-badge');

  const speakActiveWeather = (lang) => {
    if (typeof VoiceEngine === 'undefined') return;
    const lObj = typeof I18nService !== 'undefined' 
      ? I18nService.getSupportedLanguages().find(l => l.code === lang) 
      : null;
    if (weatherVoiceLangBadge && lObj) weatherVoiceLangBadge.textContent = lObj.native;
    
    VoiceEngine.speakWeather(window._latestWeather || {}, lang);
    if (weatherVoiceBtnText && lObj) weatherVoiceBtnText.textContent = `⏹ Stop Voice (${lObj ? lObj.native : lang})`;
    weatherVoicePlayBtn?.classList.add('voice-active');
  };

  weatherVoicePlayBtn?.addEventListener('click', () => {
    if (typeof VoiceEngine === 'undefined') return;
    if (VoiceEngine.isSpeaking()) {
      VoiceEngine.stop();
      const currentLang = weatherVoiceLangSelect ? weatherVoiceLangSelect.value : (typeof I18nService !== 'undefined' ? I18nService.getLanguage() : 'en');
      const lObj = typeof I18nService !== 'undefined' ? I18nService.getSupportedLanguages().find(l => l.code === currentLang) : null;
      if (weatherVoiceBtnText && lObj) weatherVoiceBtnText.textContent = `🔊 Listen in ${lObj.native}`;
      weatherVoicePlayBtn?.classList.remove('voice-active');
    } else {
      const chosenLang = weatherVoiceLangSelect ? weatherVoiceLangSelect.value : (typeof I18nService !== 'undefined' ? I18nService.getLanguage() : 'en');
      speakActiveWeather(chosenLang);
    }
  });

  weatherVoiceLangSelect?.addEventListener('change', (e) => {
    const lang = e.target.value;
    if (typeof I18nService !== 'undefined') I18nService.setLanguage(lang);
    speakActiveWeather(lang);
  });
}
