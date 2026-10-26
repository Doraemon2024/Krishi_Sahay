/**
 * Footer Component - Shared across all pages
 */
function renderFooter() {
  const t = (k, f) => (typeof I18nService !== 'undefined' ? I18nService.t(k, f) : f);

  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-brand">
            <div class="footer-logo">🌾 KrishiSahay</div>
            <p style="font-size: 0.9rem; color: #CBD5E1; max-width: 320px;">
              ${t('footer_desc', 'Empowering smallholder farmers with AI-driven crop disease diagnostics, real-time weather advisories, emergency helplines, and crop insurance guidance.')}
            </p>
          </div>

          <!-- Quick Navigation -->
          <div>
            <h4 class="footer-links-title">${t('quick_links', 'Quick Links')}</h4>
            <ul class="footer-links-list">
              <li><a href="#home">${t('nav_home', 'Home Platform')}</a></li>
              <li><a href="#upload">${t('nav_upload', 'Check Crop Health')}</a></li>
              <li><a href="#dashboard">${t('nav_dashboard', 'Diagnosis History')}</a></li>
              <li><a href="#weather">${t('nav_weather', 'Weather & Climate Risk')}</a></li>
              <li><a href="#recommendations">${t('nav_recommendations', 'AI Advisories')}</a></li>
            </ul>
          </div>

          <!-- Farmer Resources & Helplines -->
          <div>
            <h4 class="footer-links-title">${t('support_govt', 'Support & Government')}</h4>
            <ul class="footer-links-list">
              <li><a href="#helplines">${t('kisan_call_center', 'Kisan Call Center (1800-180-1551)')}</a></li>
              <li><a href="#insurance">${t('pmfby_name', 'PM Fasal Bima Yojana')}</a></li>
              <li><a href="#awareness">${t('awareness_title', 'Farmer Awareness Workshops')}</a></li>
              <li><a href="#privacy">${t('nav_privacy', 'Privacy & Data Rights')}</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div>
            ${t('all_rights', '© 2026 KrishiSahay AgriTech Platform. All Rights Reserved. Built for Farmers.')}
          </div>
          <div style="display: flex; gap: var(--space-4);">
            <a href="#privacy" style="color: #94A3B8;">${t('privacy_policy', 'Privacy Policy')}</a>
            <a href="#helplines" style="color: #94A3B8;">${t('helpline_247', '24/7 Helpline')}</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
