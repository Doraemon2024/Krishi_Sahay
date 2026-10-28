/**
 * Header Component - Sticky Top Bar with Logo, Desktop Nav, All-India Location Selector, GPS, Language & Voice Selector
 */
function renderHeader(activeTab = 'home') {
  const t = (key, fallback) => (typeof I18nService !== 'undefined' ? I18nService.t(key, fallback) : fallback);
  const currentLang = typeof I18nService !== 'undefined' ? I18nService.getLanguage() : 'en';
  const supportedLangs = typeof I18nService !== 'undefined' ? I18nService.getSupportedLanguages() : [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  const navItems = [
    { id: 'home', label: t('nav_home', 'Home'), icon: 'leaf' },
    { id: 'upload', label: t('nav_upload', 'Check Health'), icon: 'camera' },
    { id: 'dashboard', label: t('nav_dashboard', 'Dashboard'), icon: 'activity' },
    { id: 'weather', label: t('nav_weather', 'Weather & Risk'), icon: 'weather' },
    { id: 'recommendations', label: t('nav_recommendations', 'Advisories'), icon: 'shieldCheck' },
    { id: 'helplines', label: t('nav_helplines', 'Helplines'), icon: 'phone' },
    { id: 'insurance', label: t('nav_insurance', 'Insurance'), icon: 'shield' },
    { id: 'awareness', label: t('nav_awareness', 'Awareness'), icon: 'calendar' },
    { id: 'profile', label: t('nav_profile', 'Profile'), icon: 'user' },
    { id: 'privacy', label: t('nav_privacy', 'Privacy'), icon: 'lock' }
  ];

  const currentUser = typeof ApiClient !== 'undefined' ? ApiClient.getCurrentUser() : null;

  const currentLocation = localStorage.getItem('krishi_location') || 'punjab';
  const customCoordsStr = localStorage.getItem('krishi_custom_coords');
  let customCoords = null;
  try { if (customCoordsStr) customCoords = JSON.parse(customCoordsStr); } catch (e) {}

  const allIndiaZones = [
    {
      zone: 'North Zone',
      states: [
        { id: 'punjab', name: 'Punjab' },
        { id: 'haryana', name: 'Haryana' },
        { id: 'uttar_pradesh', name: 'Uttar Pradesh' },
        { id: 'himachal_pradesh', name: 'Himachal Pradesh' },
        { id: 'uttarakhand', name: 'Uttarakhand' },
        { id: 'jammu_kashmir', name: 'Jammu & Kashmir' },
        { id: 'ladakh', name: 'Ladakh' },
        { id: 'delhi', name: 'Delhi' },
        { id: 'chandigarh', name: 'Chandigarh' }
      ]
    },
    {
      zone: 'West Zone',
      states: [
        { id: 'maharashtra', name: 'Maharashtra' },
        { id: 'gujarat', name: 'Gujarat' },
        { id: 'rajasthan', name: 'Rajasthan' },
        { id: 'goa', name: 'Goa' },
        { id: 'dadra_nagar_daman', name: 'DNH and Daman & Diu' }
      ]
    },
    {
      zone: 'South Zone',
      states: [
        { id: 'karnataka', name: 'Karnataka' },
        { id: 'andhra_pradesh', name: 'Andhra Pradesh' },
        { id: 'telangana', name: 'Telangana' },
        { id: 'tamil_nadu', name: 'Tamil Nadu' },
        { id: 'kerala', name: 'Kerala' },
        { id: 'puducherry', name: 'Puducherry' }
      ]
    },
    {
      zone: 'Central & East Zone',
      states: [
        { id: 'madhya_pradesh', name: 'Madhya Pradesh' },
        { id: 'chhattisgarh', name: 'Chhattisgarh' },
        { id: 'bihar', name: 'Bihar' },
        { id: 'west_bengal', name: 'West Bengal' },
        { id: 'odisha', name: 'Odisha' },
        { id: 'jharkhand', name: 'Jharkhand' }
      ]
    },
    {
      zone: 'North-East Zone',
      states: [
        { id: 'assam', name: 'Assam' },
        { id: 'arunachal_pradesh', name: 'Arunachal Pradesh' },
        { id: 'meghalaya', name: 'Meghalaya' },
        { id: 'manipur', name: 'Manipur' },
        { id: 'mizoram', name: 'Mizoram' },
        { id: 'nagaland', name: 'Nagaland' },
        { id: 'tripura', name: 'Tripura' },
        { id: 'sikkim', name: 'Sikkim' }
      ]
    },
    {
      zone: 'Islands',
      states: [
        { id: 'andaman_nicobar', name: 'Andaman & Nicobar' },
        { id: 'lakshadweep', name: 'Lakshadweep' }
      ]
    }
  ];

  return `
    <header class="site-header">
      <div class="container header-container">
        <!-- Logo -->
        <a href="#home" class="brand-logo" aria-label="KrishiSahay Home">
          <div class="logo-icon-wrap">
            ${svgIcons.leaf(24)}
          </div>
          <div class="brand-text-wrap">
            <span class="brand-name">KrishiSahay</span>
            <span class="brand-tagline">Pan-India Smart Agriculture</span>
          </div>
        </a>

        <!-- Desktop Navigation Menu -->
        <nav aria-label="Primary Navigation">
          <ul class="nav-menu">
            ${navItems.map(item => `
              <li>
                <a href="#${item.id}" class="nav-link ${activeTab === item.id ? 'active' : ''}">
                  ${svgIcons[item.icon](18)}
                  <span>${item.label}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>

        <!-- Right Header Actions -->
        <div class="header-actions">
          <button id="global-sync-btn" class="sync-status-pill" title="Online data dynamically synced. Click to re-sync now." aria-label="Sync Online Agricultural Data">
            <span class="live-pulse-dot"></span>
            <span id="global-sync-text">${t('live_synced', 'Live Synced')}</span>
            ${svgIcons.refresh(14)}
          </button>

          <!-- All-India Location Selector -->
          <div class="gps-status-pill" title="Select agricultural state or detect farm via GPS" style="max-width: 180px;">
            <span class="gps-dot"></span>
            <select id="header-location-selector" style="border: none; background: none; font-size: 0.775rem; font-weight: 600; color: var(--text-secondary); outline: none; cursor: pointer; padding-right: 2px; font-family: inherit; max-width: 130px; text-overflow: ellipsis;">
              ${customCoords ? `<option value="custom_gps" selected>📍 ${customCoords.name || 'GPS Farm'}</option>` : ''}
              ${allIndiaZones.map(group => `
                <optgroup label="${group.zone}">
                  ${group.states.map(s => `
                    <option value="${s.id}" ${(!customCoords && currentLocation === s.id) ? 'selected' : ''}>${s.name}, IN</option>
                  `).join('')}
                </optgroup>
              `).join('')}
            </select>

            <button id="header-gps-btn" title="Detect Current Farm Location (GPS)" style="border: none; background: none; cursor: pointer; padding: 2px 4px; color: var(--primary-green); display: flex; align-items: center;" aria-label="Detect Farm GPS">
              ${svgIcons.mapPin(15)}
            </button>
          </div>

          <!-- Multilingual Language & Voice Selector Pill -->
          <div class="lang-status-pill" title="Select Voice & Interface Language (Telugu, Hindi, Tamil, Kannada, English, etc.)">
            <span style="color: var(--primary-green); display: flex; align-items: center;">${svgIcons.globe(15)}</span>
            <select id="header-language-selector" aria-label="Choose Language" style="border: none; background: none; font-size: 0.775rem; font-weight: 700; color: var(--primary-green); outline: none; cursor: pointer; font-family: inherit; max-width: 110px;">
              ${supportedLangs.map(l => `
                <option value="${l.code}" ${currentLang === l.code ? 'selected' : ''}>${l.native} (${l.name})</option>
              `).join('')}
            </select>
            <button id="header-voice-btn" class="header-voice-btn" title="Test Voice Response" aria-label="Test Voice">
              ${svgIcons.volume2(15)}
            </button>
          </div>

          <!-- Farmer Profile Column / Authentication Pill -->
          ${currentUser ? `
            <a href="#profile" class="farmer-profile-pill ${activeTab === 'profile' ? 'active' : ''}" title="Kisan ID: ${currentUser.kisanId || 'Verified'} | ${currentUser.name}" aria-label="Farmer Profile">
              <div class="farmer-avatar-badge">${(currentUser.name || 'K').trim().charAt(0).toUpperCase()}</div>
              <div class="farmer-info-col">
                <span class="farmer-name-text">${currentUser.name || 'Farmer'}</span>
                <span class="farmer-meta-text">🌾 ${currentUser.district ? currentUser.district + ', ' : ''}${currentUser.state || 'India'}</span>
              </div>
            </a>
          ` : `
            <a href="#login" class="farmer-login-btn ${activeTab === 'login' ? 'active' : ''}" title="Sign In or Register Farmer Profile">
              ${svgIcons.user(15)}
              <span>${t('nav_login', 'Farmer Sign In')}</span>
            </a>
          `}
          
          <button id="mobile-menu-toggle" class="mobile-menu-btn" aria-label="Open Navigation Menu">
            ${svgIcons.menu(24)}
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <div id="mobile-drawer" class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div class="drawer-content">
        <div class="drawer-header">
          <a href="#home" class="brand-logo">
            <div class="logo-icon-wrap">
              ${svgIcons.leaf(22)}
            </div>
            <span class="brand-name">KrishiSahay</span>
          </a>
          <button id="mobile-drawer-close" class="mobile-menu-btn" aria-label="Close Navigation Menu">
            ${svgIcons.x(24)}
          </button>
        </div>

        <!-- Mobile Language Selector -->
        <div style="padding: 12px 16px; background-color: var(--bg-surface-secondary); border-radius: var(--radius-md); margin-bottom: var(--space-3); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            ${svgIcons.globe(18, 'color: var(--primary-green);')}
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green);">Language / భాష:</span>
          </div>
          <select id="mobile-language-selector" style="padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid rgba(27,77,62,0.2); font-weight: 700; color: var(--primary-green); font-size: 0.85rem;">
            ${supportedLangs.map(l => `
              <option value="${l.code}" ${currentLang === l.code ? 'selected' : ''}>${l.native} (${l.name})</option>
            `).join('')}
          </select>
        </div>

        <!-- Mobile Farmer Account Header Pill -->
        ${currentUser ? `
          <div style="padding: 10px 14px; background: rgba(27,77,62,0.08); border-radius: var(--radius-md); margin-bottom: var(--space-4); display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="farmer-avatar-badge">${(currentUser.name || 'K').trim().charAt(0).toUpperCase()}</div>
              <div>
                <strong style="font-size: 0.85rem; color: var(--primary-green); display: block;">${currentUser.name}</strong>
                <span style="font-size: 0.725rem; color: var(--text-secondary);">${currentUser.kisanId || 'Kisan ID'}</span>
              </div>
            </div>
            <a href="#profile" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 4px 10px;">My Profile</a>
          </div>
        ` : `
          <div style="padding: 10px 14px; background: rgba(27,77,62,0.08); border-radius: var(--radius-md); margin-bottom: var(--space-4); display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Farmer Profile</span>
            <a href="#login" class="btn btn-primary btn-sm" style="font-size: 0.75rem; padding: 4px 12px;">Sign In</a>
          </div>
        `}

        <ul class="mobile-nav-list">
          ${navItems.map(item => `
            <li>
              <a href="#${item.id}" class="mobile-nav-link ${activeTab === item.id ? 'active' : ''}">
                ${svgIcons[item.icon](20)}
                <span>${item.label}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}
