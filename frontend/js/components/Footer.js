/**
 * Footer Component - Shared across all pages
 */
function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-brand">
            <div class="footer-logo">🌾 KrishiSahay</div>
            <p style="font-size: 0.9rem; color: #CBD5E1; max-width: 320px;">
              Empowering smallholder farmers with AI-driven crop disease diagnostics, real-time weather advisories, emergency helplines, and crop insurance guidance.
            </p>
          </div>

          <!-- Quick Navigation -->
          <div>
            <h4 class="footer-links-title">Quick Links</h4>
            <ul class="footer-links-list">
              <li><a href="#home">Home Platform</a></li>
              <li><a href="#upload">Check Crop Health</a></li>
              <li><a href="#dashboard">Diagnosis History</a></li>
              <li><a href="#weather">Weather & Climate Risk</a></li>
              <li><a href="#recommendations">AI Advisories</a></li>
            </ul>
          </div>

          <!-- Farmer Resources & Helplines -->
          <div>
            <h4 class="footer-links-title">Support & Government</h4>
            <ul class="footer-links-list">
              <li><a href="#helplines">Kisan Call Center (1800-180-1551)</a></li>
              <li><a href="#insurance">PM Fasal Bima Yojana</a></li>
              <li><a href="#awareness">Farmer Awareness Workshops</a></li>
              <li><a href="#privacy">Privacy & Data Rights</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div>
            © 2026 <strong>KrishiSahay AgriTech Platform</strong>. All Rights Reserved. Built for Farmers.
          </div>
          <div style="display: flex; gap: var(--space-4);">
            <a href="#privacy" style="color: #94A3B8;">Privacy Policy</a>
            <a href="#helplines" style="color: #94A3B8;">24/7 Helpline</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
