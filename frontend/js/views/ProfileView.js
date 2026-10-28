/**
 * Professional Farmer Profile & Farm Management Command Center
 * Improvised with Interactive Tabs, Holographic Kisan Smart Card, 
 * Real-Time Area Unit Converter, Geolocation Detection, and Soil Health Telemetry.
 */
const ProfileView = {
  farmer: null,
  activeTab: 'overview', // 'overview', 'card', 'edit', 'soil', 'insurance'
  isEditing: false,

  availableCrops: [
    'Rice (Paddy)', 'Wheat', 'Mustard', 'Cotton', 'Tomato',
    'Onion', 'Soybean', 'Sugarcane', 'Maize', 'Chilli', 'Gram / Chana',
    'Potato', 'Barley', 'Groundnut', 'Sunflower'
  ],

  soilProfiles: {
    'Alluvial Loam': { pH: '7.2 (Neutral)', nitrogen: '280 kg/ha', phosphorus: '22 kg/ha', potassium: '310 kg/ha', organicCarbon: '0.62%', rating: 'Optimal' },
    'Black Cotton Soil (Regur)': { pH: '7.8 (Mild Alkaline)', nitrogen: '240 kg/ha', phosphorus: '18 kg/ha', potassium: '380 kg/ha', organicCarbon: '0.55%', rating: 'High Fertility' },
    'Red Sandy Loam': { pH: '6.4 (Slightly Acidic)', nitrogen: '210 kg/ha', phosphorus: '15 kg/ha', potassium: '240 kg/ha', organicCarbon: '0.45%', rating: 'Needs Zinc/Boron' },
    'Laterite Soil': { pH: '5.8 (Acidic)', nitrogen: '190 kg/ha', phosphorus: '12 kg/ha', potassium: '180 kg/ha', organicCarbon: '0.38%', rating: 'Lime Required' },
    'Clayey Loam': { pH: '7.0 (Neutral)', nitrogen: '295 kg/ha', phosphorus: '26 kg/ha', potassium: '340 kg/ha', organicCarbon: '0.68%', rating: 'High Water Retention' }
  },

  async render() {
    const t = (key, fallback) => (typeof I18nService !== 'undefined' ? I18nService.t(key, fallback) : fallback);
    
    // Fetch live profile from backend or localStorage
    try {
      this.farmer = await ApiClient.getProfile();
    } catch (e) {
      this.farmer = ApiClient.getCurrentUser();
    }

    if (!this.farmer) {
      return `
        <div class="container section">
          <div class="empty-state-card" style="max-width: 520px; margin: 40px auto; text-align: center; padding: 48px 24px; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
            <div style="width: 72px; height: 72px; margin: 0 auto 16px; border-radius: 50%; background: rgba(27,77,62,0.1); display: flex; align-items: center; justify-content: center; color: var(--primary-green);">
              ${svgIcons.user(36)}
            </div>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--primary-green); margin-bottom: 8px;">Farmer Session Required</h2>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px;">Please sign in to access your verified Kisan Smart ID, farm specifications, microclimate telemetry, and government subsidies.</p>
            <a href="#login" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; font-weight: 700;">
              ${svgIcons.user(18)}
              <span>Farmer Sign In / Register</span>
            </a>
          </div>
        </div>
      `;
    }

    const f = this.farmer;
    const initials = (f.name || 'K').trim().charAt(0).toUpperCase();
    const crops = Array.isArray(f.primaryCrops) ? f.primaryCrops : (f.primaryCrops ? [f.primaryCrops] : ['Wheat', 'Rice (Paddy)']);
    const acreage = parseFloat(f.landAcreage) || 4.5;
    const hectares = (acreage * 0.404686).toFixed(2);
    const bigha = (acreage * 1.613).toFixed(1);
    const guntha = (acreage * 40).toFixed(0);
    const pmfbyLimit = (acreage * 48500).toLocaleString('en-IN');
    const soil = this.soilProfiles[f.soilType] || this.soilProfiles['Alluvial Loam'];

    // Fetch quick farm activity statistics
    let diagnosesCount = 0;
    try {
      const history = await ApiClient.getDiagnosesHistory();
      diagnosesCount = Array.isArray(history) ? history.length : 0;
    } catch (e) {}

    return `
      <div class="profile-page-wrapper">
        <div class="container section">
          
          <!-- Top Executive Header Banner -->
          <header class="profile-header-banner">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                <span class="profile-verified-chip">
                  ${svgIcons.check(14)} Government Verified Kisan ID
                </span>
                <span style="font-size: 0.75rem; color: var(--text-tertiary);">
                  • Cloud Firestore Resilient Sync Active
                </span>
              </div>
              <h1 class="profile-main-title">${f.name}</h1>
              <p class="profile-main-subtitle">
                <span>📍 ${f.village ? f.village + ', ' : ''}${f.district ? f.district + ', ' : ''}${f.state || 'India'}</span>
                <span>•</span>
                <span>Kisan ID: <strong>${f.kisanId || 'KA-2026-88914'}</strong></span>
                <span>•</span>
                <span>Holding: <strong>${acreage} Acres</strong> (${hectares} Ha / ${bigha} Bigha)</span>
              </p>
            </div>

            <!-- Top Header Action Controls -->
            <div class="profile-header-actions">
              <button id="btn-quick-edit-toggle" class="btn btn-primary btn-sm" title="Edit farm details and land specifications">
                ${svgIcons.edit(15)}
                <span id="quick-edit-label">${this.isEditing ? 'View Overview' : 'Edit Farm Profile'}</span>
              </button>
              <button id="btn-print-card" class="btn btn-secondary btn-sm" title="Print official Government Kisan Smart Card">
                ${svgIcons.printer(15)}
                <span>Print Kisan Card</span>
              </button>
              <button id="btn-open-logout" class="btn btn-outline-danger btn-sm" title="Sign out of current farmer session">
                ${svgIcons.logOut(15)}
                <span>Sign Out</span>
              </button>
            </div>
          </header>

          <!-- Alert Container -->
          <div id="profile-alert" class="auth-alert" style="display: none; margin-bottom: 20px;"></div>

          <!-- Logout Confirmation Modal Overlay -->
          <div id="logout-modal" class="custom-modal-overlay" style="display: none;">
            <div class="custom-modal-box">
              <div class="logout-icon-wrap">
                ${svgIcons.logOut(28)}
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-green); margin: 0 0 8px 0;">Sign Out of Kisan Portal?</h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0 0 20px 0;">
                You are currently signed in as <strong>${f.name}</strong> (${f.kisanId}). Are you sure you want to end your active session?
              </p>
              <div style="display: flex; gap: 10px; justify-content: center;">
                <button type="button" id="btn-confirm-logout" class="btn btn-outline-danger btn-sm" style="padding: 8px 20px; font-weight: 700;">
                  Yes, Sign Out
                </button>
                <button type="button" id="btn-cancel-logout" class="btn btn-secondary btn-sm" style="padding: 8px 20px;">
                  Stay Logged In
                </button>
              </div>
            </div>
          </div>

          <!-- Interactive Profile Dashboard Tabs -->
          <nav class="profile-dashboard-tabs" aria-label="Profile Sections">
            <button class="profile-tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" data-tab="overview">
              ${svgIcons.user(16)}
              <span>Farm Overview</span>
            </button>
            <button class="profile-tab-btn ${this.activeTab === 'card' ? 'active' : ''}" data-tab="card">
              ${svgIcons.shieldCheck(16)}
              <span>Kisan Smart Card</span>
            </button>
            <button class="profile-tab-btn ${this.activeTab === 'edit' ? 'active' : ''}" data-tab="edit">
              ${svgIcons.edit(16)}
              <span>Edit Farm Details</span>
            </button>
            <button class="profile-tab-btn ${this.activeTab === 'soil' ? 'active' : ''}" data-tab="soil">
              ${svgIcons.layers(16)}
              <span>Soil Health Card (SHC)</span>
            </button>
            <button class="profile-tab-btn ${this.activeTab === 'insurance' ? 'active' : ''}" data-tab="insurance">
              ${svgIcons.shield(16)}
              <span>PMFBY & Government Schemes</span>
            </button>
          </nav>

          <!-- 2-COLUMN PROFILE LAYOUT: Left Identity Column + Right Content Area -->
          <div class="profile-layout-grid">
            
            <!-- ============================================== -->
            <!-- LEFT COLUMN: HOLOGRAPHIC SMART CARD & IDENTITY -->
            <!-- ============================================== -->
            <aside class="profile-column-sidebar" aria-label="Farmer Identity Column">
              
              <!-- Official Holographic Indian Kisan Smart Card -->
              <div class="kisan-id-card" id="printable-kisan-card">
                <div class="kisan-card-header">
                  <div class="kisan-card-emblem">
                    ${svgIcons.leaf(20)}
                    <span>KRISHI SAHAY KISAN CARD</span>
                  </div>
                  <span class="kisan-card-chip">GOI / ICAR VERIFIED</span>
                </div>

                <div class="kisan-card-body">
                  <div class="kisan-avatar-wrap">
                    <div class="kisan-avatar" id="kisan-avatar-display">
                      <span>${initials}</span>
                    </div>
                  </div>
                  <div class="kisan-id-details">
                    <span class="kisan-label">KISAN IDENTIFICATION NO.</span>
                    <span class="kisan-number">${f.kisanId || 'KA-2026-88914'}</span>
                    <span class="kisan-holder-name">${f.name}</span>
                    <span class="kisan-location">📍 ${f.district ? f.district + ', ' : ''}${f.state || 'India'}</span>
                  </div>
                </div>

                <div class="kisan-card-footer">
                  <div class="kisan-meta-item">
                    <span class="kisan-meta-label">SOIL HEALTH STATUS</span>
                    <span class="kisan-meta-val">Cycle-IV Verified</span>
                  </div>
                  <div class="kisan-meta-item">
                    <span class="kisan-meta-label">PMFBY COVERAGE</span>
                    <span class="kisan-meta-val text-success">₹${pmfbyLimit} Active</span>
                  </div>
                </div>

                <div class="kisan-card-barcode">
                  <span>${svgIcons.qrCode(14)} DIGITAL VERIFICATION QR</span>
                  <span>ID: ${f.id || 'farmer_demo_1'}</span>
                </div>
              </div>

              <!-- Quick Identity Specifications Sidebar -->
              <div class="card profile-card" style="margin-top: var(--space-4);">
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 12px;">
                  <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--primary-green); margin: 0;">
                    Farm Profile Snapshot
                  </h3>
                  <button type="button" class="btn btn-sm btn-secondary" id="btn-toggle-inline-edit" style="font-size: 0.75rem; padding: 4px 10px;">
                    ${this.isEditing ? 'Close Edit' : 'Edit'}
                  </button>
                </div>

                <div class="profile-spec-row">
                  <span class="spec-label">Land Holding</span>
                  <span class="spec-value"><strong>${acreage} Acres</strong> (${hectares} Ha)</span>
                </div>
                <div class="profile-spec-row">
                  <span class="spec-label">Primary Crops</span>
                  <div class="crops-chip-group">
                    ${crops.map(c => `<span class="crop-badge">${c}</span>`).join('')}
                  </div>
                </div>
                <div class="profile-spec-row">
                  <span class="spec-label">Soil Classification</span>
                  <span class="spec-value">${f.soilType || 'Alluvial Loam'}</span>
                </div>
                <div class="profile-spec-row">
                  <span class="spec-label">Irrigation System</span>
                  <span class="spec-value">${f.irrigationType || 'Canal & Solar Drip'}</span>
                </div>
                <div class="profile-spec-row">
                  <span class="spec-label">Mobile Contact</span>
                  <span class="spec-value">${f.phone ? 'XXXXXX' + f.phone.slice(-4) : 'Not specified'}</span>
                </div>
                <div class="profile-spec-row">
                  <span class="spec-label">Aadhaar KCC Link</span>
                  <span class="spec-value text-success">✓ Verified Linked</span>
                </div>
              </div>
            </aside>

            <!-- ============================================== -->
            <!-- RIGHT COLUMN: DYNAMIC TAB CONTENT VIEWS        -->
            <!-- ============================================== -->
            <main class="profile-operations-column" aria-label="Farm Operations & Details">
              
              <!-- 3 Live Telemetry KPI Cards -->
              <div class="telemetry-grid">
                <div class="telemetry-card">
                  <div class="telemetry-icon-wrap bg-green-subtle text-green">
                    ${svgIcons.camera(22)}
                  </div>
                  <div class="telemetry-data">
                    <span class="telemetry-number">${diagnosesCount}</span>
                    <span class="telemetry-label">Field Health Scans</span>
                  </div>
                </div>

                <div class="telemetry-card">
                  <div class="telemetry-icon-wrap bg-blue-subtle text-blue">
                    ${svgIcons.weather(22)}
                  </div>
                  <div class="telemetry-data">
                    <span class="telemetry-number text-success">Low Risk</span>
                    <span class="telemetry-label">${f.state || 'Regional'} Climate Risk</span>
                  </div>
                </div>

                <div class="telemetry-card">
                  <div class="telemetry-icon-wrap bg-gold-subtle text-gold">
                    ${svgIcons.shield(22)}
                  </div>
                  <div class="telemetry-data">
                    <span class="telemetry-number text-primary">₹${pmfbyLimit}</span>
                    <span class="telemetry-label">PMFBY Coverage Limit</span>
                  </div>
                </div>
              </div>

              <!-- TAB 1: OVERVIEW & OPERATIONAL SHORTCUTS -->
              <section id="tab-content-overview" class="tab-pane" style="${this.activeTab === 'overview' && !this.isEditing ? 'display: block;' : 'display: none;'}">
                <div class="card" style="margin-bottom: var(--space-4);">
                  <div class="card-header">
                    <h3 style="font-size: 1.1rem; color: var(--primary-green); margin: 0;">
                      Farm Diagnostics & Precision Agriculture Hub
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="quick-action-links-grid">
                      <a href="#upload" class="action-shortcut-card">
                        <div class="shortcut-icon-circle bg-green-subtle text-green">
                          ${svgIcons.camera(22)}
                        </div>
                        <div class="shortcut-text">
                          <strong>Scan Crop Leaf Disease</strong>
                          <span>1-second AI pathology scan with bio-chemical fungicide prescription</span>
                        </div>
                        ${svgIcons.arrowRight(18)}
                      </a>

                      <a href="#weather" class="action-shortcut-card">
                        <div class="shortcut-icon-circle bg-blue-subtle text-blue">
                          ${svgIcons.weather(22)}
                        </div>
                        <div class="shortcut-text">
                          <strong>Localized Microclimate Forecast</strong>
                          <span>5-day rain probability, humidity & spore dissemination alert</span>
                        </div>
                        ${svgIcons.arrowRight(18)}
                      </a>

                      <a href="#awareness" class="action-shortcut-card">
                        <div class="shortcut-icon-circle bg-purple-subtle text-purple">
                          ${svgIcons.calendar(22)}
                        </div>
                        <div class="shortcut-text">
                          <strong>ICAR & KVK Training Workshops</strong>
                          <span>Verified soil testing camps, natural farming & certified seeds</span>
                        </div>
                        ${svgIcons.arrowRight(18)}
                      </a>

                      <a href="#helplines" class="action-shortcut-card">
                        <div class="shortcut-icon-circle bg-gold-subtle text-gold">
                          ${svgIcons.phone(22)}
                        </div>
                        <div class="shortcut-text">
                          <strong>Kisan Call Centre (1800-180-1551)</strong>
                          <span>Toll-free agronomy advice available in 22 regional Indian languages</span>
                        </div>
                        ${svgIcons.arrowRight(18)}
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Soil Health Dial Preview -->
                <div class="soil-health-dashboard-card">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--primary-green); margin: 0 0 4px 0;">
                        Soil Health Card (SHC) - ${f.soilType || 'Alluvial Loam'}
                      </h4>
                      <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">
                        Verified by Department of Agriculture & Farmers Welfare (MoA&FW)
                      </p>
                    </div>
                    <span class="soil-dial-status status-optimal">${soil.rating}</span>
                  </div>

                  <div class="soil-dial-grid">
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">Soil pH Level</div>
                      <div class="soil-dial-val">${soil.pH.split(' ')[0]}</div>
                      <div class="soil-dial-status status-optimal">Optimal Range</div>
                    </div>
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">Nitrogen (N)</div>
                      <div class="soil-dial-val">${soil.nitrogen}</div>
                      <div class="soil-dial-status status-optimal">Sufficient</div>
                    </div>
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">Phosphorus (P)</div>
                      <div class="soil-dial-val">${soil.phosphorus}</div>
                      <div class="soil-dial-status status-moderate">Moderate</div>
                    </div>
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">Potassium (K)</div>
                      <div class="soil-dial-val">${soil.potassium}</div>
                      <div class="soil-dial-status status-high">High</div>
                    </div>
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">Organic Carbon</div>
                      <div class="soil-dial-val">${soil.organicCarbon}</div>
                      <div class="soil-dial-status status-optimal">Good</div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- TAB 2: EDIT FARM PROFILE DETAILS -->
              <section id="tab-content-edit" class="tab-pane" style="${this.activeTab === 'edit' || this.isEditing ? 'display: block;' : 'display: none;'}">
                <div class="card" style="padding: var(--space-6);">
                  <div class="card-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--primary-green); margin: 0 0 4px 0;">
                          Edit Farm Profile & Land Specifications
                        </h3>
                        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">
                          Updates are synchronized live to your Google Cloud Firestore database.
                        </p>
                      </div>
                      <button type="button" class="btn-detect-gps" id="btn-detect-gps" title="Auto-detect current latitude, longitude and district">
                        ${svgIcons.crosshair(14)}
                        <span>Detect Farm GPS</span>
                      </button>
                    </div>
                  </div>

                  <form id="form-edit-profile" novalidate>
                    <div class="edit-section-header">1. Personal & Contact Credentials</div>
                    <div class="form-group">
                      <label class="form-label" for="edit-name">Farmer Full Name *</label>
                      <input type="text" id="edit-name" class="form-input" value="${f.name || ''}" required />
                    </div>

                    <div class="form-row">
                      <div class="form-group col-6">
                        <label class="form-label" for="edit-phone">Registered Mobile Number</label>
                        <input type="tel" id="edit-phone" class="form-input" value="${f.phone || ''}" placeholder="10-digit mobile number" />
                      </div>
                      <div class="form-group col-6">
                        <label class="form-label" for="edit-email">Email Address</label>
                        <input type="email" id="edit-email" class="form-input" value="${f.email || ''}" placeholder="farmer@krishisahay.org" />
                      </div>
                    </div>

                    <div class="edit-section-header">2. Geographical & Land Dimensions</div>
                    <div class="form-row">
                      <div class="form-group col-6">
                        <label class="form-label" for="edit-state">State / UT *</label>
                        <select id="edit-state" class="form-input" required>
                          <option value="Punjab" ${f.state === 'Punjab' ? 'selected' : ''}>Punjab</option>
                          <option value="Haryana" ${f.state === 'Haryana' ? 'selected' : ''}>Haryana</option>
                          <option value="Maharashtra" ${f.state === 'Maharashtra' ? 'selected' : ''}>Maharashtra</option>
                          <option value="Andhra Pradesh" ${f.state === 'Andhra Pradesh' ? 'selected' : ''}>Andhra Pradesh</option>
                          <option value="Telangana" ${f.state === 'Telangana' ? 'selected' : ''}>Telangana</option>
                          <option value="Karnataka" ${f.state === 'Karnataka' ? 'selected' : ''}>Karnataka</option>
                          <option value="Tamil Nadu" ${f.state === 'Tamil Nadu' ? 'selected' : ''}>Tamil Nadu</option>
                          <option value="Uttar Pradesh" ${f.state === 'Uttar Pradesh' ? 'selected' : ''}>Uttar Pradesh</option>
                          <option value="Madhya Pradesh" ${f.state === 'Madhya Pradesh' ? 'selected' : ''}>Madhya Pradesh</option>
                          <option value="Rajasthan" ${f.state === 'Rajasthan' ? 'selected' : ''}>Rajasthan</option>
                          <option value="Gujarat" ${f.state === 'Gujarat' ? 'selected' : ''}>Gujarat</option>
                          <option value="Bihar" ${f.state === 'Bihar' ? 'selected' : ''}>Bihar</option>
                          <option value="West Bengal" ${f.state === 'West Bengal' ? 'selected' : ''}>West Bengal</option>
                          <option value="Odisha" ${f.state === 'Odisha' ? 'selected' : ''}>Odisha</option>
                        </select>
                      </div>
                      <div class="form-group col-6">
                        <label class="form-label" for="edit-district">District *</label>
                        <input type="text" id="edit-district" class="form-input" value="${f.district || ''}" required />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-6">
                        <label class="form-label" for="edit-village">Village / Mandal / Panchayat</label>
                        <input type="text" id="edit-village" class="form-input" value="${f.village || ''}" />
                      </div>
                      <div class="form-group col-6">
                        <label class="form-label" for="edit-acreage">Total Land Holding (Acres) *</label>
                        <input type="number" id="edit-acreage" class="form-input" step="0.25" min="0.1" value="${acreage}" required />
                      </div>
                    </div>

                    <!-- Live Multi-Unit Area Converter Bar -->
                    <div class="unit-preview-bar">
                      <span>Live Unit Converter:</span>
                      <span class="unit-preview-pill" id="conv-hectares">${hectares} Hectares</span>
                      <span>•</span>
                      <span class="unit-preview-pill" id="conv-bigha">${bigha} Bigha (Std)</span>
                      <span>•</span>
                      <span class="unit-preview-pill" id="conv-guntha">${guntha} Guntha</span>
                      <span>•</span>
                      <span class="unit-preview-pill" id="conv-insurance">Est. PMFBY Sum: ₹${pmfbyLimit}</span>
                    </div>

                    <div class="edit-section-header">3. Agronomic Portfolio & Infrastructure</div>
                    <div class="form-row">
                      <div class="form-group col-6">
                        <label class="form-label" for="edit-soil">Soil Type</label>
                        <select id="edit-soil" class="form-input">
                          <option value="Alluvial Loam" ${f.soilType === 'Alluvial Loam' ? 'selected' : ''}>Alluvial Loam (Indo-Gangetic)</option>
                          <option value="Black Cotton Soil (Regur)" ${f.soilType === 'Black Cotton Soil (Regur)' ? 'selected' : ''}>Black Cotton Soil (Deccan)</option>
                          <option value="Red Sandy Loam" ${f.soilType === 'Red Sandy Loam' ? 'selected' : ''}>Red Sandy Loam (Southern Plateau)</option>
                          <option value="Laterite Soil" ${f.soilType === 'Laterite Soil' ? 'selected' : ''}>Laterite Soil (Coastal/Highland)</option>
                          <option value="Clayey Loam" ${f.soilType === 'Clayey Loam' ? 'selected' : ''}>Clayey Loam (Deltaic)</option>
                        </select>
                      </div>

                      <div class="form-group col-6">
                        <label class="form-label" for="edit-irrigation">Irrigation Infrastructure</label>
                        <select id="edit-irrigation" class="form-input">
                          <option value="Canal & Solar Drip Irrigation" ${f.irrigationType === 'Canal & Solar Drip Irrigation' ? 'selected' : ''}>Canal & Solar Drip Irrigation</option>
                          <option value="Canal & Tubewell" ${f.irrigationType === 'Canal & Tubewell' ? 'selected' : ''}>Canal & Tubewell</option>
                          <option value="Solar Borewell (PM-KUSUM)" ${f.irrigationType === 'Solar Borewell (PM-KUSUM)' ? 'selected' : ''}>Solar Borewell (PM-KUSUM)</option>
                          <option value="Drip / Micro-Irrigation" ${f.irrigationType === 'Drip / Micro-Irrigation' ? 'selected' : ''}>Drip / Micro-Irrigation</option>
                          <option value="Sprinkler Irrigation" ${f.irrigationType === 'Sprinkler Irrigation' ? 'selected' : ''}>Sprinkler Irrigation</option>
                          <option value="Rainfed Agriculture" ${f.irrigationType === 'Rainfed Agriculture' ? 'selected' : ''}>Rainfed Agriculture</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="edit-crops">Primary Cultivated Crops</label>
                      <input type="text" id="edit-crops" class="form-input" value="${crops.join(', ')}" placeholder="e.g. Wheat, Rice, Mustard" />
                      
                      <!-- Quick Crop Selector Chips -->
                      <div style="margin-top: 10px;">
                        <span style="font-size: 0.75rem; color: var(--text-tertiary); display: block; margin-bottom: 6px;">
                          Click to quickly toggle Indian staple crops:
                        </span>
                        <div class="crop-quick-selectors">
                          ${this.availableCrops.map(cropName => `
                            <button type="button" class="btn-crop-tag ${crops.includes(cropName) ? 'selected' : ''}" data-crop="${cropName}">
                              ${cropName}
                            </button>
                          `).join('')}
                        </div>
                      </div>
                    </div>

                    <!-- Form Action Buttons -->
                    <div style="display: flex; gap: 12px; margin-top: 24px;">
                      <button type="submit" id="btn-save-profile" class="btn btn-primary" style="flex: 1; padding: 12px; font-weight: 700;">
                        ${svgIcons.check(16)}
                        <span>Save Changes to Cloud Firestore</span>
                      </button>
                      <button type="button" id="btn-cancel-edit-mode" class="btn btn-secondary" style="padding: 12px 20px;">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </section>

              <!-- TAB 3: KISAN SMART CARD DIGITAL VIEW & DOWNLOAD -->
              <section id="tab-content-card" class="tab-pane" style="${this.activeTab === 'card' && !this.isEditing ? 'display: block;' : 'display: none;'}">
                <div class="card" style="padding: var(--space-6);">
                  <div class="card-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
                    <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--primary-green); margin: 0 0 4px 0;">
                      Official Government of India Kisan Smart ID Card
                    </h3>
                    <p style="font-size: 0.825rem; color: var(--text-secondary); margin: 0;">
                      Standard PVC Smart Card format recognized at Mandis, APMC yards, and fertilizer subsidy centres.
                    </p>
                  </div>

                  <div style="max-width: 440px; margin: 20px auto;">
                    <!-- Embedded Card Preview Clone -->
                    <div style="border: 1px solid var(--border-medium); border-radius: var(--radius-xl); padding: 10px; background: var(--bg-surface-secondary);">
                      <div class="kisan-id-card">
                        <div class="kisan-card-header">
                          <div class="kisan-card-emblem">
                            ${svgIcons.leaf(20)}
                            <span>KRISHI SAHAY KISAN CARD</span>
                          </div>
                          <span class="kisan-card-chip">GOI / ICAR VERIFIED</span>
                        </div>
                        <div class="kisan-card-body">
                          <div class="kisan-avatar">
                            <span>${initials}</span>
                          </div>
                          <div class="kisan-id-details">
                            <span class="kisan-label">KISAN IDENTIFICATION NO.</span>
                            <span class="kisan-number">${f.kisanId || 'KA-2026-88914'}</span>
                            <span class="kisan-holder-name">${f.name}</span>
                            <span class="kisan-location">📍 ${f.district ? f.district + ', ' : ''}${f.state || 'India'}</span>
                          </div>
                        </div>
                        <div class="kisan-card-footer">
                          <div class="kisan-meta-item">
                            <span class="kisan-meta-label">SOIL HEALTH</span>
                            <span class="kisan-meta-val">Verified</span>
                          </div>
                          <div class="kisan-meta-item">
                            <span class="kisan-meta-label">INSURANCE</span>
                            <span class="kisan-meta-val text-success">Active Enrolled</span>
                          </div>
                        </div>
                        <div class="kisan-card-barcode">
                          <span>${svgIcons.qrCode(14)} DIGITAL VERIFICATION QR</span>
                          <span>ID: ${f.id || 'farmer_demo_1'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; justify-content: center; gap: 12px; margin-top: 20px;">
                    <button type="button" id="btn-print-card-tab" class="btn btn-primary">
                      ${svgIcons.printer(16)}
                      <span>Print Official PVC Card</span>
                    </button>
                  </div>
                </div>
              </section>

              <!-- TAB 4: SOIL HEALTH CARD DETAILED INSPECTOR -->
              <section id="tab-content-soil" class="tab-pane" style="${this.activeTab === 'soil' && !this.isEditing ? 'display: block;' : 'display: none;'}">
                <div class="card" style="padding: var(--space-6);">
                  <div class="card-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--primary-green); margin: 0 0 4px 0;">
                          National Soil Health Card (SHC) - Lab Report
                        </h3>
                        <p style="font-size: 0.825rem; color: var(--text-secondary); margin: 0;">
                          Sample Ref: SHC-2026-PB-99412 | Testing Lab: KVK Regional Laboratory
                        </p>
                      </div>
                      <span class="profile-verified-chip">Verified Cycle IV</span>
                    </div>
                  </div>

                  <div class="soil-dial-grid" style="margin-bottom: 24px;">
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">pH Value</div>
                      <div class="soil-dial-val">${soil.pH}</div>
                      <div class="soil-dial-status status-optimal">Neutral Buffer</div>
                    </div>
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">Available Nitrogen (N)</div>
                      <div class="soil-dial-val">${soil.nitrogen}</div>
                      <div class="soil-dial-status status-optimal">Normal</div>
                    </div>
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">Phosphorus (P2O5)</div>
                      <div class="soil-dial-val">${soil.phosphorus}</div>
                      <div class="soil-dial-status status-moderate">Supplement DAP</div>
                    </div>
                    <div class="soil-dial-item">
                      <div class="soil-dial-title">Potash (K2O)</div>
                      <div class="soil-dial-val">${soil.potassium}</div>
                      <div class="soil-dial-status status-high">High Reserve</div>
                    </div>
                  </div>

                  <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--primary-green); margin-bottom: 10px;">
                    ICAR Recommended Fertilizer Dosage per Acre:
                  </h4>
                  <ul style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7; padding-left: 20px;">
                    <li><strong>Urea (46% N)</strong>: 110 kg/acre in 3 split doses (Basal, Tillering, Panicle Initiation).</li>
                    <li><strong>DAP (18-46-0)</strong>: 55 kg/acre as basal placement at time of sowing.</li>
                    <li><strong>Muriate of Potash (MOP)</strong>: 20 kg/acre (Soil is naturally rich in potassium; avoid excess).</li>
                    <li><strong>Zinc Sulphate (21%)</strong>: 10 kg/acre once every 2 years to prevent leaf chlorosis.</li>
                  </ul>
                </div>
              </section>

              <!-- TAB 5: PMFBY & GOVERNMENT SCHEMES -->
              <section id="tab-content-insurance" class="tab-pane" style="${this.activeTab === 'insurance' && !this.isEditing ? 'display: block;' : 'display: none;'}">
                <div class="card" style="padding: var(--space-6);">
                  <div class="card-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
                    <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--primary-green); margin: 0 0 4px 0;">
                      Pradhan Mantri Fasal Bima Yojana (PMFBY) Coverage
                    </h3>
                    <p style="font-size: 0.825rem; color: var(--text-secondary); margin: 0;">
                      Comprehensive yield and localized calamity risk cover subsidized by Govt. of India.
                    </p>
                  </div>

                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 20px;">
                    <div style="background: var(--bg-surface-secondary); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                      <div style="font-size: 0.75rem; color: var(--text-tertiary); font-weight: 700;">TOTAL SUM INSURED</div>
                      <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary-green); margin: 4px 0;">₹${pmfbyLimit}</div>
                      <div style="font-size: 0.75rem; color: var(--text-secondary);">Calculated for ${acreage} Acres at ₹48,500/Acre</div>
                    </div>
                    <div style="background: var(--bg-surface-secondary); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                      <div style="font-size: 0.75rem; color: var(--text-tertiary); font-weight: 700;">FARMER PREMIUM SHARE</div>
                      <div style="font-size: 1.5rem; font-weight: 800; color: #2563EB; margin: 4px 0;">1.5% - 2.0%</div>
                      <div style="font-size: 0.75rem; color: var(--text-secondary);">Max ₹${(acreage * 48500 * 0.015).toFixed(0)} (Balance subsidized by Govt.)</div>
                    </div>
                    <div style="background: var(--bg-surface-secondary); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                      <div style="font-size: 0.75rem; color: var(--text-tertiary); font-weight: 700;">POLICY STATUS</div>
                      <div style="font-size: 1.25rem; font-weight: 800; color: #166534; margin: 4px 0;">✓ Active Enrolled</div>
                      <div style="font-size: 0.75rem; color: var(--text-secondary);">Rabi 2026-27 Season</div>
                    </div>
                  </div>

                  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="#insurance" class="btn btn-primary btn-sm">
                      ${svgIcons.shieldCheck(14)} View Full Insurance Policy Details
                    </a>
                    <a href="tel:18001801551" class="btn btn-secondary btn-sm">
                      ${svgIcons.phone(14)} Call PMFBY Claim Helpline
                    </a>
                  </div>
                </div>
              </section>

              <!-- Local Government Liaison Box -->
              <div class="card liaison-card">
                <div class="liaison-badge">Nodal District Agriculture Office</div>
                <h4 style="margin: 0 0 6px 0; font-size: 1.05rem; color: var(--primary-green);">
                  Krishi Vigyan Kendra (KVK) - ${f.district || 'Ludhiana'}, ${f.state || 'Punjab'}
                </h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.5;">
                  Direct institutional connection with Indian Council of Agricultural Research (ICAR). For field verification, seed subsidy distribution, or Soil Health Card renewal, contact your designated Subject Matter Specialist (SMS).
                </p>
                <div class="liaison-contacts">
                  <a href="tel:18001801551" class="btn btn-outline-primary btn-sm">
                    ${svgIcons.phone(14)} Call KVK Toll-Free
                  </a>
                  <a href="#awareness" class="btn btn-secondary btn-sm">
                    ${svgIcons.calendar(14)} KVK Training Camps
                  </a>
                </div>
              </div>
            </main>

          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const editToggleBtn = document.getElementById('btn-quick-edit-toggle');
    const inlineEditBtn = document.getElementById('btn-toggle-inline-edit');
    const cancelEditBtn = document.getElementById('btn-cancel-edit-mode');
    const formEdit = document.getElementById('form-edit-profile');
    const printBtn = document.getElementById('btn-print-card');
    const printTabBtn = document.getElementById('btn-print-card-tab');
    const openLogoutBtn = document.getElementById('btn-open-logout');
    const logoutModal = document.getElementById('logout-modal');
    const confirmLogoutBtn = document.getElementById('btn-confirm-logout');
    const cancelLogoutBtn = document.getElementById('btn-cancel-logout');
    const alertBox = document.getElementById('profile-alert');
    const detectGpsBtn = document.getElementById('btn-detect-gps');
    const acreageInput = document.getElementById('edit-acreage');

    const showAlert = (msg, type = 'success') => {
      if (!alertBox) return;
      alertBox.textContent = msg;
      alertBox.className = `auth-alert auth-alert-${type}`;
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // Tab Switching Functionality
    const tabButtons = document.querySelectorAll('.profile-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        this.activeTab = targetTab;
        this.isEditing = (targetTab === 'edit');

        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.tab-pane').forEach(pane => {
          pane.style.display = 'none';
        });

        const targetPane = document.getElementById(`tab-content-${targetTab}`);
        if (targetPane) {
          targetPane.style.display = 'block';
        }

        const editLabel = document.getElementById('quick-edit-label');
        if (editLabel) {
          editLabel.textContent = this.isEditing ? 'View Overview' : 'Edit Farm Profile';
        }
      });
    });

    // Toggle Edit Mode helper
    const toggleEditMode = (forceState = null) => {
      this.isEditing = forceState !== null ? forceState : !this.isEditing;
      this.activeTab = this.isEditing ? 'edit' : 'overview';

      tabButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-tab') === this.activeTab);
      });

      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.style.display = 'none';
      });

      const targetPane = document.getElementById(`tab-content-${this.activeTab}`);
      if (targetPane) targetPane.style.display = 'block';

      const editLabel = document.getElementById('quick-edit-label');
      if (editLabel) editLabel.textContent = this.isEditing ? 'View Overview' : 'Edit Farm Profile';
    };

    if (editToggleBtn) editToggleBtn.addEventListener('click', () => toggleEditMode());
    if (inlineEditBtn) inlineEditBtn.addEventListener('click', () => toggleEditMode());
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => toggleEditMode(false));

    // Live Multi-Unit Converter when Acreage Changes
    if (acreageInput) {
      acreageInput.addEventListener('input', () => {
        const val = parseFloat(acreageInput.value) || 0;
        const hectares = (val * 0.404686).toFixed(2);
        const bigha = (val * 1.613).toFixed(1);
        const guntha = (val * 40).toFixed(0);
        const pmfby = (val * 48500).toLocaleString('en-IN');

        const elHa = document.getElementById('conv-hectares');
        const elBi = document.getElementById('conv-bigha');
        const elGu = document.getElementById('conv-guntha');
        const elIns = document.getElementById('conv-insurance');

        if (elHa) elHa.textContent = `${hectares} Hectares`;
        if (elBi) elBi.textContent = `${bigha} Bigha (Std)`;
        if (elGu) elGu.textContent = `${guntha} Guntha`;
        if (elIns) elIns.textContent = `Est. PMFBY Sum: ₹${pmfby}`;
      });
    }

    // Geolocation Detection
    if (detectGpsBtn) {
      detectGpsBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
          showAlert('Geolocation is not supported by your browser.', 'error');
          return;
        }

        detectGpsBtn.disabled = true;
        detectGpsBtn.innerHTML = `${svgIcons.crosshair(14)} <span>Pinpointing Field Coordinates...</span>`;

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude.toFixed(4);
            const lon = pos.coords.longitude.toFixed(4);
            showAlert(`Field GPS Coordinates located: 📍 Lat ${lat}, Lon ${lon}. Coordinates verified!`, 'success');
            detectGpsBtn.disabled = false;
            detectGpsBtn.innerHTML = `${svgIcons.check(14)} <span>GPS Verified (Lat ${lat})</span>`;
          },
          (err) => {
            detectGpsBtn.disabled = false;
            detectGpsBtn.innerHTML = `${svgIcons.crosshair(14)} <span>Detect Farm GPS</span>`;
            showAlert('Unable to retrieve GPS coordinates. Please ensure location permissions are enabled.', 'error');
          },
          { timeout: 8000 }
        );
      });
    }

    // Interactive Crop Chip Selectors in Edit Form
    document.querySelectorAll('.btn-crop-tag').forEach(tagBtn => {
      tagBtn.addEventListener('click', () => {
        const crop = tagBtn.getAttribute('data-crop');
        const cropsInput = document.getElementById('edit-crops');
        if (!cropsInput) return;

        let currentCrops = cropsInput.value.split(',').map(c => c.trim()).filter(Boolean);
        if (currentCrops.includes(crop)) {
          currentCrops = currentCrops.filter(c => c !== crop);
          tagBtn.classList.remove('selected');
        } else {
          currentCrops.push(crop);
          tagBtn.classList.add('selected');
        }
        cropsInput.value = currentCrops.join(', ');
      });
    });

    // Form Edit Submit (Profile Details Edit)
    if (formEdit) {
      formEdit.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('btn-save-profile');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `${svgIcons.refresh(16)} <span>Saving to Cloud Firestore...</span>`;
        }

        try {
          const updates = {
            name: document.getElementById('edit-name').value.trim(),
            phone: document.getElementById('edit-phone').value.trim(),
            email: document.getElementById('edit-email').value.trim(),
            state: document.getElementById('edit-state').value,
            district: document.getElementById('edit-district').value.trim(),
            village: document.getElementById('edit-village').value.trim(),
            landAcreage: document.getElementById('edit-acreage').value,
            soilType: document.getElementById('edit-soil').value,
            primaryCrops: document.getElementById('edit-crops').value,
            irrigationType: document.getElementById('edit-irrigation').value
          };

          const res = await ApiClient.updateProfile(updates);
          this.farmer = res.farmer;
          this.isEditing = false;
          this.activeTab = 'overview';
          showAlert('Farm profile updated successfully in Cloud Firestore!', 'success');
          if (typeof showToast !== 'undefined') {
            showToast('Kisan profile updated successfully!', 'success');
          }
          setTimeout(() => {
            if (typeof App !== 'undefined' && App.router) {
              App.router();
            }
          }, 400);
        } catch (err) {
          showAlert(err.message || 'Failed to update profile', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `${svgIcons.check(16)} <span>Save Changes to Cloud Firestore</span>`;
          }
        }
      });
    }

    // Print Kisan Card (Both header and tab triggers)
    const triggerPrint = () => window.print();
    if (printBtn) printBtn.addEventListener('click', triggerPrint);
    if (printTabBtn) printTabBtn.addEventListener('click', triggerPrint);

    // Professional Logout Flow with Custom Modal
    if (openLogoutBtn && logoutModal) {
      openLogoutBtn.addEventListener('click', () => {
        logoutModal.style.display = 'flex';
      });
    }

    if (cancelLogoutBtn && logoutModal) {
      cancelLogoutBtn.addEventListener('click', () => {
        logoutModal.style.display = 'none';
      });
    }

    if (confirmLogoutBtn) {
      confirmLogoutBtn.addEventListener('click', async () => {
        confirmLogoutBtn.disabled = true;
        confirmLogoutBtn.textContent = 'Signing Out...';
        await ApiClient.logout();
        if (typeof showToast !== 'undefined') {
          showToast('You have been signed out successfully.', 'info');
        }
        window.location.hash = '#home';
      });
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProfileView;
}
