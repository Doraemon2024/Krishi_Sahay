/**
 * Professional Farmer Authentication Portal
 * High-grade Sign In, Demo Switcher & Kisan Registration
 */
const LoginView = {
  activeTab: 'login', // 'login' or 'register'

  async render() {
    const t = (key, fallback) => (typeof I18nService !== 'undefined' ? I18nService.t(key, fallback) : fallback);
    const currentUser = typeof ApiClient !== 'undefined' ? ApiClient.getCurrentUser() : null;

    if (currentUser) {
      window.location.hash = '#profile';
      return `<div class="container section" style="text-align: center; padding: 60px 0;"><p>Redirecting to your farmer profile...</p></div>`;
    }

    return `
      <div class="auth-view-wrapper">
        <div class="container auth-container">
          <div class="auth-card">
            <!-- Header Brand Emblem -->
            <div class="auth-card-header">
              <div class="auth-logo-badge">
                ${svgIcons.leaf(28)}
              </div>
              <h1 class="auth-title">${t('auth_portal_title', 'KrishiSahay Kisan Portal')}</h1>
              <p class="auth-subtitle">
                ${t('auth_portal_sub', 'Secure access to your verified Kisan ID, crop pathology records, and personalized regional advisories')}
              </p>
            </div>

            <!-- Tab Switcher -->
            <div class="auth-tabs" role="tablist">
              <button id="tab-btn-login" class="auth-tab-btn ${this.activeTab === 'login' ? 'active' : ''}" role="tab" aria-selected="${this.activeTab === 'login'}">
                ${svgIcons.user(16)}
                <span>${t('tab_signin', 'Farmer Sign In')}</span>
              </button>
              <button id="tab-btn-register" class="auth-tab-btn ${this.activeTab === 'register' ? 'active' : ''}" role="tab" aria-selected="${this.activeTab === 'register'}">
                ${svgIcons.sparkles(16)}
                <span>${t('tab_register', 'New Registration')}</span>
              </button>
            </div>

            <!-- Feedback Alert Message Box -->
            <div id="auth-alert" class="auth-alert" style="display: none;"></div>

            <!-- Demo Farmer Quick Selector Panel -->
            <div class="demo-farmer-panel" style="${this.activeTab === 'login' ? 'display: block;' : 'display: none;'}">
              <div class="demo-panel-header">
                <span class="demo-badge">Instant Demo Access</span>
                <span style="font-size: 0.775rem; color: var(--text-secondary);">Select a verified farmer profile to test:</span>
              </div>
              <div class="demo-farmers-grid">
                <button type="button" class="demo-farmer-btn" data-phone="9876543210" data-pass="password123" title="Login as Ramesh Kumar Patel (Punjab)">
                  <div class="demo-farmer-avatar" style="background: linear-gradient(135deg, #1b4d3e, #2d7a5a);">R</div>
                  <div class="demo-farmer-meta">
                    <strong>Ramesh K. Patel</strong>
                    <span>Punjab • 6.5 Ac (Wheat, Rice)</span>
                  </div>
                </button>

                <button type="button" class="demo-farmer-btn" data-phone="9811223344" data-pass="password123" title="Login as Sunita Devi (Maharashtra)">
                  <div class="demo-farmer-avatar" style="background: linear-gradient(135deg, #9333ea, #7e22ce);">S</div>
                  <div class="demo-farmer-meta">
                    <strong>Sunita Devi</strong>
                    <span>Maharashtra • 4.0 Ac (Onion, Tomato)</span>
                  </div>
                </button>

                <button type="button" class="demo-farmer-btn" data-phone="9848012345" data-pass="password123" title="Login as Venkatesh Rao (Andhra Pradesh)">
                  <div class="demo-farmer-avatar" style="background: linear-gradient(135deg, #d97706, #b45309);">V</div>
                  <div class="demo-farmer-meta">
                    <strong>Venkatesh Rao</strong>
                    <span>Andhra • 5.5 Ac (Chilli, Cotton)</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- 1. SIGN IN FORM -->
            <form id="form-login" class="auth-form" style="${this.activeTab === 'login' ? 'display: block;' : 'display: none;'}" novalidate>
              <div class="form-group">
                <label for="login-identifier" class="form-label">
                  ${t('label_identifier', 'Mobile Number / Email / Kisan ID')}
                </label>
                <div class="input-with-icon">
                  <span class="input-icon">${svgIcons.phone(18)}</span>
                  <input 
                    type="text" 
                    id="login-identifier" 
                    class="form-input" 
                    placeholder="e.g. 9876543210, KA-2026-88914, or ramesh@..." 
                    value="9876543210"
                    required 
                    autocomplete="username"
                  />
                </div>
                <span class="field-hint">Enter your 10-digit mobile, registered email, or Kisan ID card number</span>
              </div>

              <div class="form-group">
                <div class="form-label-row">
                  <label for="login-password" class="form-label">
                    ${t('label_password', 'Security Password / PIN')}
                  </label>
                </div>
                <div class="input-with-icon">
                  <span class="input-icon">${svgIcons.lock(18)}</span>
                  <input 
                    type="password" 
                    id="login-password" 
                    class="form-input" 
                    placeholder="Enter security password" 
                    value="password123"
                    required 
                    autocomplete="current-password"
                  />
                  <button type="button" id="toggle-login-pass" class="pass-toggle-btn" aria-label="Toggle password visibility">
                    ${svgIcons.eye(18)}
                  </button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); font-size: 0.8rem;">
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; color: var(--text-secondary);">
                  <input type="checkbox" id="remember-me" checked style="accent-color: var(--primary-green);">
                  <span>Remember my farm profile</span>
                </label>
                <a href="#helplines" style="color: var(--primary-green); text-decoration: none; font-weight: 600;">
                  Forgot PIN / Help?
                </a>
              </div>

              <button type="submit" id="btn-submit-login" class="btn btn-primary btn-block auth-submit-btn">
                <span>${t('btn_signin', 'Sign In to Farm Dashboard')}</span>
                ${svgIcons.arrowRight(16)}
              </button>
            </form>

            <!-- 2. REGISTRATION FORM (Sign Up) -->
            <form id="form-register" class="auth-form" style="${this.activeTab === 'register' ? 'display: block;' : 'display: none;'}" novalidate>
              <div class="form-section-title">Step 1: Personal & Contact Information</div>
              <div class="form-row">
                <div class="form-group col-6">
                  <label for="reg-name" class="form-label">Full Farmer Name *</label>
                  <input type="text" id="reg-name" class="form-input" placeholder="e.g. Balwinder Singh" required />
                </div>
                <div class="form-group col-6">
                  <label for="reg-phone" class="form-label">10-Digit Mobile *</label>
                  <input type="tel" id="reg-phone" class="form-input" placeholder="e.g. 9812345678" pattern="[0-9]{10}" required />
                </div>
              </div>

              <div class="form-group">
                <label for="reg-email" class="form-label">Email Address (Optional)</label>
                <input type="email" id="reg-email" class="form-input" placeholder="e.g. farmer@gmail.com" />
              </div>

              <div class="form-section-title" style="margin-top: 16px;">Step 2: Farm Location & Geography</div>
              <div class="form-row">
                <div class="form-group col-6">
                  <label for="reg-state" class="form-label">State / UT *</label>
                  <select id="reg-state" class="form-input" required>
                    <option value="Punjab" selected>Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Bihar">Bihar</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                  </select>
                </div>
                <div class="form-group col-6">
                  <label for="reg-district" class="form-label">District *</label>
                  <input type="text" id="reg-district" class="form-input" placeholder="e.g. Ludhiana, Nashik" required />
                </div>
              </div>

              <div class="form-group">
                <label for="reg-village" class="form-label">Village / Tehsil / Gram Panchayat</label>
                <input type="text" id="reg-village" class="form-input" placeholder="e.g. Sahnewal, Niphad" />
              </div>

              <div class="form-section-title" style="margin-top: 16px;">Step 3: Agricultural Parameters</div>
              <div class="form-row">
                <div class="form-group col-6">
                  <label for="reg-acreage" class="form-label">Land Holding (Acres) *</label>
                  <input type="number" id="reg-acreage" class="form-input" placeholder="e.g. 5.0" step="0.5" min="0.1" value="4.5" required />
                </div>
                <div class="form-group col-6">
                  <label for="reg-soil" class="form-label">Soil Classification</label>
                  <select id="reg-soil" class="form-input">
                    <option value="Alluvial Loam" selected>Alluvial Loam</option>
                    <option value="Black Cotton Soil (Regur)">Black Cotton Soil (Regur)</option>
                    <option value="Red Sandy Loam">Red Sandy Loam</option>
                    <option value="Laterite Soil">Laterite Soil</option>
                    <option value="Clayey Loam">Clayey Loam</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-6">
                  <label for="reg-crops" class="form-label">Primary Crops *</label>
                  <input type="text" id="reg-crops" class="form-input" placeholder="e.g. Wheat, Rice, Mustard" value="Wheat, Rice (Paddy)" required />
                </div>
                <div class="form-group col-6">
                  <label for="reg-irrigation" class="form-label">Irrigation System</label>
                  <select id="reg-irrigation" class="form-input">
                    <option value="Canal & Tubewell" selected>Canal & Tubewell</option>
                    <option value="Solar Borewell (PM-KUSUM)">Solar Borewell (PM-KUSUM)</option>
                    <option value="Drip / Micro-Irrigation">Drip / Micro-Irrigation</option>
                    <option value="Sprinkler Irrigation">Sprinkler Irrigation</option>
                    <option value="Rainfed Agriculture">Rainfed Agriculture</option>
                  </select>
                </div>
              </div>

              <div class="form-section-title" style="margin-top: 16px;">Step 4: Security Credential</div>
              <div class="form-group">
                <label for="reg-password" class="form-label">Create Security Password / PIN *</label>
                <div class="input-with-icon">
                  <span class="input-icon">${svgIcons.lock(18)}</span>
                  <input type="password" id="reg-password" class="form-input" placeholder="At least 6 characters" required />
                  <button type="button" id="toggle-reg-pass" class="pass-toggle-btn" aria-label="Toggle password visibility">
                    ${svgIcons.eye(18)}
                  </button>
                </div>
              </div>

              <button type="submit" id="btn-submit-register" class="btn btn-primary btn-block auth-submit-btn">
                <span>${t('btn_register', 'Generate Official Kisan ID & Account')}</span>
                ${svgIcons.check(16)}
              </button>
            </form>

            <!-- Card Footer Note -->
            <div class="auth-footer-note">
              <span>🔒 Encrypted Session • Direct Cloud Firestore & ICAR Data Link</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {
    const tabLogin = document.getElementById('tab-btn-login');
    const tabRegister = document.getElementById('tab-btn-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const demoPanel = document.querySelector('.demo-farmer-panel');
    const alertBox = document.getElementById('auth-alert');

    const showAlert = (msg, type = 'error') => {
      if (!alertBox) return;
      alertBox.textContent = msg;
      alertBox.className = `auth-alert auth-alert-${type}`;
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    const clearAlert = () => {
      if (alertBox) alertBox.style.display = 'none';
    };

    // Tab Switching
    if (tabLogin && tabRegister) {
      tabLogin.addEventListener('click', () => {
        clearAlert();
        this.activeTab = 'login';
        tabLogin.classList.add('active');
        tabLogin.setAttribute('aria-selected', 'true');
        tabRegister.classList.remove('active');
        tabRegister.setAttribute('aria-selected', 'false');
        if (formLogin) formLogin.style.display = 'block';
        if (formRegister) formRegister.style.display = 'none';
        if (demoPanel) demoPanel.style.display = 'block';
      });

      tabRegister.addEventListener('click', () => {
        clearAlert();
        this.activeTab = 'register';
        tabRegister.classList.add('active');
        tabRegister.setAttribute('aria-selected', 'true');
        tabLogin.classList.remove('active');
        tabLogin.setAttribute('aria-selected', 'false');
        if (formRegister) formRegister.style.display = 'block';
        if (formLogin) formLogin.style.display = 'none';
        if (demoPanel) demoPanel.style.display = 'none';
      });
    }

    // Toggle Password Visibility (Login & Register)
    const setupPassToggle = (btnId, inputId) => {
      const btn = document.getElementById(btnId);
      const input = document.getElementById(inputId);
      if (btn && input) {
        btn.addEventListener('click', () => {
          const isPass = input.type === 'password';
          input.type = isPass ? 'text' : 'password';
          btn.innerHTML = isPass ? svgIcons.eyeOff(18) : svgIcons.eye(18);
        });
      }
    };
    setupPassToggle('toggle-login-pass', 'login-password');
    setupPassToggle('toggle-reg-pass', 'reg-password');

    // Demo Farmer Buttons Click Handlers
    document.querySelectorAll('.demo-farmer-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        clearAlert();
        const phone = btn.getAttribute('data-phone');
        const pass = btn.getAttribute('data-pass');
        const idInput = document.getElementById('login-identifier');
        const passInput = document.getElementById('login-password');
        if (idInput) idInput.value = phone;
        if (passInput) passInput.value = pass;

        btn.style.opacity = '0.6';
        showAlert(`Signing in as ${btn.querySelector('strong').textContent}...`, 'success');

        try {
          const res = await ApiClient.login({ identifier: phone, password: pass });
          showAlert(`Welcome, ${res.farmer.name}! Directing to Kisan Profile...`, 'success');
          setTimeout(() => {
            window.location.hash = '#profile';
          }, 450);
        } catch (err) {
          showAlert(err.message || 'Demo login failed', 'error');
          btn.style.opacity = '1';
        }
      });
    });

    // Form Login Submit
    if (formLogin) {
      formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAlert();
        const identifier = document.getElementById('login-identifier').value.trim();
        const password = document.getElementById('login-password').value;

        if (!identifier) {
          showAlert('Please enter your mobile number, email, or Kisan ID', 'error');
          return;
        }

        const submitBtn = document.getElementById('btn-submit-login');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Verifying Farmer Credentials...</span>`;
        }

        try {
          const res = await ApiClient.login({ identifier, password });
          showAlert(`Welcome back, ${res.farmer.name}! Loading your farm dashboard...`, 'success');
          setTimeout(() => {
            window.location.hash = '#profile';
          }, 400);
        } catch (err) {
          showAlert(err.message || 'Login failed. Please check credentials or register.', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Sign In to Farm Dashboard</span> ${svgIcons.arrowRight(16)}`;
          }
        }
      });
    }

    // Form Register Submit
    if (formRegister) {
      formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAlert();
        const name = document.getElementById('reg-name').value.trim();
        const phone = document.getElementById('reg-phone').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const state = document.getElementById('reg-state').value;
        const district = document.getElementById('reg-district').value.trim();
        const village = document.getElementById('reg-village').value.trim();
        const acreage = document.getElementById('reg-acreage').value;
        const soilType = document.getElementById('reg-soil').value;
        const crops = document.getElementById('reg-crops').value;
        const irrigationType = document.getElementById('reg-irrigation').value;
        const password = document.getElementById('reg-password').value;

        if (!name) return showAlert('Farmer Full Name is required', 'error');
        if (!phone || phone.length < 10) return showAlert('Valid 10-digit Mobile Number is required', 'error');
        if (!district) return showAlert('District is required', 'error');
        if (!password || password.length < 4) return showAlert('Password must be at least 4 characters', 'error');

        const submitBtn = document.getElementById('btn-submit-register');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Generating Official Kisan ID...</span>`;
        }

        try {
          const res = await ApiClient.register({
            name,
            phone,
            email,
            state,
            district,
            village,
            landAcreage: acreage,
            soilType,
            primaryCrops: crops.split(',').map(c => c.trim()).filter(Boolean),
            irrigationType,
            password
          });

          showAlert(`Kisan ID Registered Successfully: ${res.farmer.kisanId}! Loading profile...`, 'success');
          setTimeout(() => {
            window.location.hash = '#profile';
          }, 500);
        } catch (err) {
          showAlert(err.message || 'Registration failed', 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Generate Official Kisan ID & Account</span> ${svgIcons.check(16)}`;
          }
        }
      });
    }
  }
};
