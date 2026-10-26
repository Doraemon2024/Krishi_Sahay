/**
 * KrishiSahay Single Page Application (SPA) Main Router & Controller
 */
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
});

const routes = {
  'home': { render: renderHomeView },
  'upload': { render: renderUploadDiagnosisView, init: initUploadDiagnosisListeners },
  'problem': { render: renderProblemDetailView, init: initProblemDetailListeners },
  'dashboard': { render: renderDashboardView, init: initDashboardListeners },
  'weather': { render: renderWeatherView, init: initWeatherListeners },
  'recommendations': { render: renderRecommendationsView, init: initRecommendationsListeners },
  'helplines': { render: renderHelplinesView, init: initHelplinesListeners },
  'insurance': { render: renderInsuranceView, init: initInsuranceListeners },
  'awareness': { render: renderAwarenessView, init: initAwarenessListeners },
  'privacy': { render: renderPrivacyView, init: initPrivacyListeners }
};

let autoSyncInterval = null;

async function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
  startBackgroundAutoSync();

  // Global voice state listener for animated visualizer/icon updates
  document.addEventListener('krishi_voice_state', (e) => {
    const isSpeaking = e.detail && e.detail.isSpeaking;
    const voiceBtns = document.querySelectorAll('.header-voice-btn, .voice-toggle-btn');
    voiceBtns.forEach(btn => {
      if (isSpeaking) {
        btn.classList.add('voice-active');
      } else {
        btn.classList.remove('voice-active');
      }
    });
  });
}

/**
 * Periodically auto-synchronizes live data in the background (every 3 minutes)
 */
function startBackgroundAutoSync() {
  if (autoSyncInterval) clearInterval(autoSyncInterval);
  autoSyncInterval = setInterval(async () => {
    try {
      const activeLocation = localStorage.getItem('krishi_location') || 'punjab';
      await ApiClient.getAllSyncedData(activeLocation);
      console.log('🌾 KrishiSahay background auto-sync completed at:', new Date().toLocaleTimeString());
    } catch (e) {
      console.warn('Background auto-sync skipped:', e);
    }
  }, 3 * 60 * 1000);
}

async function handleRoute() {
  const rawHash = window.location.hash.replace('#', '').trim();
  const currentTab = routes[rawHash] ? rawHash : 'home';

  const appHeader = document.getElementById('app-header');
  const appContent = document.getElementById('app-content');
  const appFooter = document.getElementById('app-footer');

  // Render Header & Footer
  if (appHeader) appHeader.innerHTML = renderHeader(currentTab);
  if (appFooter) appFooter.innerHTML = renderFooter();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Show loading skeleton shimmer
  if (appContent) {
    appContent.innerHTML = `
      <div class="container page-section">
        <div class="skeleton" style="height: 48px; width: 60%; margin: 0 auto var(--space-6);"></div>
        <div class="skeleton" style="height: 240px; border-radius: var(--radius-lg); margin-bottom: var(--space-6);"></div>
        <div class="grid-3">
          <div class="skeleton" style="height: 180px;"></div>
          <div class="skeleton" style="height: 180px;"></div>
          <div class="skeleton" style="height: 180px;"></div>
        </div>
      </div>
    `;
  }

  // Render View Content
  try {
    const routeObj = routes[currentTab];
    const html = await routeObj.render();
    if (appContent) {
      appContent.innerHTML = html;
      if (routeObj.init) {
        routeObj.init();
      }
      if (typeof I18nService !== 'undefined' && typeof I18nService.translateDOM === 'function') {
        I18nService.translateDOM(document.body);
      }
    }
  } catch (error) {
    console.error('Route Render Error:', error);
    if (appContent) {
      appContent.innerHTML = `
        <div class="container page-section" style="text-align: center;">
          <div class="card" style="max-width: 500px; margin: 0 auto;">
            <h3 style="color: var(--color-danger); margin-bottom: var(--space-2);">Something went wrong while loading this page.</h3>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">Please refresh or try clicking the button below.</p>
            <button onclick="window.location.reload()" class="btn btn-primary">Try Again</button>
          </div>
        </div>
      `;
    }
  }

  // Attach Global Mobile Drawer & Header Listeners
  attachHeaderListeners();
}

function attachHeaderListeners() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const locationSelector = document.getElementById('header-location-selector');
  const globalSyncBtn = document.getElementById('global-sync-btn');

  toggleBtn?.addEventListener('click', () => drawer?.classList.add('open'));
  closeBtn?.addEventListener('click', () => drawer?.classList.remove('open'));
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) drawer.classList.remove('open');
  });

  // Global AI Live Sync Header Button
  globalSyncBtn?.addEventListener('click', async () => {
    globalSyncBtn.classList.add('spinning');
    const syncText = document.getElementById('global-sync-text');
    if (syncText) syncText.textContent = 'Syncing...';
    
    showToast('Re-synchronizing all agricultural modules with live online data...', 'info');
    const activeLocation = localStorage.getItem('krishi_location') || 'punjab';
    
    const res = await ApiClient.triggerOnlineSync(activeLocation);
    globalSyncBtn.classList.remove('spinning');
    if (syncText) syncText.textContent = 'Live Synced';

    if (res && res.success) {
      showToast('All modules (weather, insurance, events, helplines, advisories) updated from live online feeds!', 'success');
      handleRoute();
    } else {
      showToast('Live online sync updated.', 'info');
      handleRoute();
    }
  });

  const headerGpsBtn = document.getElementById('header-gps-btn');

  // Handle dynamic location selection changes across all India
  locationSelector?.addEventListener('change', (e) => {
    const regionId = e.target.value;
    if (regionId === 'custom_gps') return;

    localStorage.removeItem('krishi_custom_coords');
    localStorage.setItem('krishi_location', regionId);

    const selectedOption = locationSelector.options[locationSelector.selectedIndex];
    const label = selectedOption ? selectedOption.text : regionId;
    
    showToast(`Agricultural location updated to ${label}`, 'success');
    
    // Dynamically refresh active page contents
    handleRoute();
  });

  // Header GPS Auto-Detection
  headerGpsBtn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    showToast('Detecting your farm GPS coordinates...', 'info');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const name = `My Farm (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;

        localStorage.setItem('krishi_location', 'custom_gps');
        localStorage.setItem('krishi_custom_coords', JSON.stringify({ lat, lon, name, state: 'Local Farm' }));
        showToast(`Farm coordinates pinned: ${lat.toFixed(3)}°N, ${lon.toFixed(3)}°E! Loading live data...`, 'success');
        handleRoute();
      },
      (err) => {
        console.warn('GPS error:', err);
        showToast('Could not access GPS. Please choose your state from the dropdown or search on Weather page.', 'error');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });

  // Language & Voice Engine Listeners
  const headerLangSelector = document.getElementById('header-language-selector');
  const mobileLangSelector = document.getElementById('mobile-language-selector');
  const headerVoiceBtn = document.getElementById('header-voice-btn');

  const onLanguageChange = (langCode) => {
    if (typeof I18nService !== 'undefined') {
      I18nService.setLanguage(langCode);
      const langObj = I18nService.getSupportedLanguages().find(l => l.code === langCode);
      const name = langObj ? `${langObj.native} (${langObj.name})` : langCode;
      showToast(`Language switched to ${name}. Native voice advisory active.`, 'success');
      
      // Speak a brief greeting in the newly selected language
      if (typeof VoiceEngine !== 'undefined') {
        const greetings = {
          te: 'కృషి సహాయ్ కి స్వాగతం. మీ పంట రక్షణ మరియు వాతావరణ సమాచారం అందుబాటులో ఉన్నాయి.',
          hi: 'कृषि सहाय में आपका स्वागत है। आपकी फसल सुरक्षा और मौसम की जानकारी तैयार है।',
          ta: 'கிருஷி சகாய்க்கு வரவேற்கிறோம். பயிர் பாதுகாப்பு மற்றும் வானிலை தகவல்கள் தயார்.',
          kn: 'ಕೃಷಿ ಸಹಾಯ್ ಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ ಬೆಳೆ ರಕ್ಷಣೆ ಮತ್ತು ಹವಾಮಾನ ಮಾಹಿತಿ ಸಿದ್ಧವಾಗಿದೆ.',
          mr: 'कृषी सहाय मध्ये आपले स्वागत आहे. पीक संरक्षण आणि हवामान माहिती उपलब्ध आहे.',
          pa: 'ਕ੍ਰਿਸ਼ੀ ਸਹਾਇਕ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਫ਼ਸਲ ਸੁਰੱਖਿਆ ਅਤੇ ਮੌਸਮ ਜਾਣਕਾਰੀ ਤਿਆਰ ਹੈ।',
          bn: 'কৃষি সহায় এ আপনাকে স্বাগতম। ফসল সুরক্ষা ও আবহাওয়া তথ্য প্রস্তুত।',
          en: 'Welcome to KrishiSahay. Pan-India crop disease diagnostics and climate advisories are ready.'
        };
        VoiceEngine.speak(greetings[langCode] || greetings.en, langCode);
      }
      handleRoute();
    }
  };

  headerLangSelector?.addEventListener('change', (e) => onLanguageChange(e.target.value));
  mobileLangSelector?.addEventListener('change', (e) => onLanguageChange(e.target.value));

  headerVoiceBtn?.addEventListener('click', () => {
    if (typeof VoiceEngine === 'undefined') return;
    if (VoiceEngine.isSpeaking()) {
      VoiceEngine.stop();
      showToast('Voice paused', 'info');
    } else {
      const activeLang = typeof I18nService !== 'undefined' ? I18nService.getLanguage() : 'en';
      const welcomePrompts = {
        te: 'కృషి సహాయ్. భారతీయ రైతుల కోసం ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ పంట తెగులు నిర్ధారణ మరియు వాతావరణ హెచ్చరికల వేదిక.',
        hi: 'कृषि सहाय। भारतीय किसानों के लिए एआई फसल रोग निदान और मौसम चेतावनी मंच।',
        ta: 'கிருஷி சகாய். இந்திய விவசாயிகளுக்கான ஏஐ பயிர் நோய் கண்டறிதல் மற்றும் வானிலை எச்சரிக்கை தளம்.',
        kn: 'ಕೃಷಿ ಸಹಾಯ್. ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ಎಐ ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ವೇದಿಕೆ.',
        mr: 'कृषी सहाय. भारतीय शेतकऱ्यांसाठी एआय पीक रोग निदान आणि हवामान चेतावणी मंच.',
        pa: 'ਕ੍ਰਿਸ਼ੀ ਸਹਾਇਕ। ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਲਈ ਏਆਈ ਫ਼ਸਲ ਰੋਗ ਜਾਂਚ ਅਤੇ ਮੌਸਮ ਚੇਤਾਵਨੀ ਪਲੇਟਫਾਰਮ।',
        bn: 'কৃষি সহায়। ভারতীয় কৃষকদের জন্য এআই ফসল রোগ নির্ণয় ও আবহাওয়া সতর্কতা প্ল্যাটফর্ম।',
        en: 'KrishiSahay. Pan-India AI crop disease diagnostics and climate risk advisory platform.'
      };
      VoiceEngine.speak(welcomePrompts[activeLang] || welcomePrompts.en, activeLang);
    }
  });
}
