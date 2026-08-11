/**
 * Home Page View Component
 */
async function renderHomeView() {
  return `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div>
            <div class="hero-badge">
              ${svgIcons.leaf(16)}
              <span>AI-Powered Agriculture Platform</span>
            </div>
            
            <h1 class="hero-title">
              Smart Farming Starts Here.
            </h1>
            
            <p class="hero-description">
              Protect your crops from disease, access real-time weather advisories, receive targeted treatment steps, and connect with official government support services.
            </p>

            <div class="hero-cta-group">
              <a href="#upload" class="btn btn-primary">
                ${svgIcons.camera(20)}
                <span>Check Crop Health</span>
              </a>
              
              <a href="#weather" class="btn btn-secondary">
                ${svgIcons.weather(20)}
                <span>View Weather Risk</span>
              </a>
            </div>

            <!-- Stats Bar -->
            <div style="display: flex; gap: var(--space-6); margin-top: var(--space-8); padding-top: var(--space-6); border-top: 1px solid rgba(27,77,62,0.1);">
              <div>
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary-green);">10,000+</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">Farmers Assisted</div>
              </div>
              <div style="border-left: 1px solid rgba(27,77,62,0.1); padding-left: var(--space-6);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-gold);">98.4%</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">AI Diagnosis Accuracy</div>
              </div>
              <div style="border-left: 1px solid rgba(27,77,62,0.1); padding-left: var(--space-6);">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--secondary-green);">24/7</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">Helpline Support</div>
              </div>
            </div>
          </div>

          <!-- Hero Right Visual Card -->
          <div>
            <div class="hero-visual-card">
              <img src="/samples/rice_blast.svg" alt="Rice Paddy Crop Health Inspection" class="hero-visual-img">
              
              <div class="floating-stat-badge">
                <div class="stat-icon">
                  ${svgIcons.shieldCheck(24)}
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 0.95rem; color: var(--primary-green);">Live Field Status: Safe</div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary);">Humidity 82% | Low Rain Risk Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6 Core Feature Cards Section -->
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Comprehensive Farmer Support Services</h2>
          <p class="section-subtitle">Designed specifically for daily agricultural decision-making with instant AI guidance.</p>
        </div>

        <div class="grid-3">
          <!-- Card 1: Crop Health -->
          <div class="card" onclick="location.hash='#upload'" style="cursor: pointer;">
            <div class="card-header">
              <div class="stat-icon" style="background-color: var(--secondary-green-light); color: var(--primary-green);">
                ${svgIcons.camera(24)}
              </div>
              <span class="badge badge-low">AI Enabled</span>
            </div>
            <h3 class="card-title">Crop Health AI</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--space-4);">
              Upload or snap a leaf photo to detect fungal, bacterial, or pest diseases instantly with confidence scores.
            </p>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--primary-green); display: flex; align-items: center; gap: 4px;">
              Scan Leaf Now ${svgIcons.arrowRight(16)}
            </span>
          </div>

          <!-- Card 2: Weather & Risk -->
          <div class="card" onclick="location.hash='#weather'" style="cursor: pointer;">
            <div class="card-header">
              <div class="stat-icon" style="background-color: var(--accent-gold-light); color: var(--accent-gold);">
                ${svgIcons.weather(24)}
              </div>
              <span class="badge badge-medium">Climate Score</span>
            </div>
            <h3 class="card-title">Weather & Climate Risk</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--space-4);">
              Agricultural weather forecast and regional Climate Risk Score (LOW/MED/HIGH) predicting spore outbreaks.
            </p>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-gold); display: flex; align-items: center; gap: 4px;">
              View Forecast ${svgIcons.arrowRight(16)}
            </span>
          </div>

          <!-- Card 3: AI Recommendations -->
          <div class="card" onclick="location.hash='#recommendations'" style="cursor: pointer;">
            <div class="card-header">
              <div class="stat-icon" style="background-color: var(--color-info-bg); color: var(--color-info);">
                ${svgIcons.shieldCheck(24)}
              </div>
              <span class="badge badge-info">Action Plan</span>
            </div>
            <h3 class="card-title">AI Recommendations</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--space-4);">
              Priority-based farming actions categorized into Immediate, Treatment, Prevention, and Spray timing.
            </p>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-info); display: flex; align-items: center; gap: 4px;">
              View Advisories ${svgIcons.arrowRight(16)}
            </span>
          </div>

          <!-- Card 4: Disease Prevention -->
          <div class="card" onclick="location.hash='#dashboard'" style="cursor: pointer;">
            <div class="card-header">
              <div class="stat-icon" style="background-color: var(--secondary-green-light); color: var(--secondary-green);">
                ${svgIcons.leaf(24)}
              </div>
              <span class="badge badge-low">Foliage History</span>
            </div>
            <h3 class="card-title">Diagnosis Dashboard</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--space-4);">
              Track your field diagnosis history, season health summaries, and download reports for land management.
            </p>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--secondary-green); display: flex; align-items: center; gap: 4px;">
              Open History ${svgIcons.arrowRight(16)}
            </span>
          </div>

          <!-- Card 5: Helplines -->
          <div class="card" onclick="location.hash='#helplines'" style="cursor: pointer;">
            <div class="card-header">
              <div class="stat-icon" style="background-color: var(--color-danger-bg); color: var(--color-danger);">
                ${svgIcons.phone(24)}
              </div>
              <span class="badge badge-high">24/7 Emergency</span>
            </div>
            <h3 class="card-title">Farmer Helplines</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--space-4);">
              Toll-free Kisan Call Center (1800-180-1551), ICAR pathology advisory, and district extension contacts.
            </p>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-danger); display: flex; align-items: center; gap: 4px;">
              Call Support ${svgIcons.arrowRight(16)}
            </span>
          </div>

          <!-- Card 6: Insurance -->
          <div class="card" onclick="location.hash='#insurance'" style="cursor: pointer;">
            <div class="card-header">
              <div class="stat-icon" style="background-color: var(--secondary-green-light); color: var(--primary-green);">
                ${svgIcons.shield(24)}
              </div>
              <span class="badge badge-low">Government</span>
            </div>
            <h3 class="card-title">Crop Insurance</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--space-4);">
              Pradhan Mantri Fasal Bima Yojana (PMFBY) guidelines, weather-index schemes, and claim assistance.
            </p>
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--primary-green); display: flex; align-items: center; gap: 4px;">
              Explore Schemes ${svgIcons.arrowRight(16)}
            </span>
          </div>
        </div>
      </div>
    </section>
  `;
}
