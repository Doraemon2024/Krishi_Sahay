/**
 * AI Recommendations Page View Component (Live Online Dynamic Auto-Updated)
 */
async function renderRecommendationsView() {
  const t = (k, f) => (typeof I18nService !== 'undefined' ? I18nService.t(k, f) : f);
  const activeLocation = localStorage.getItem('krishi_location') || 'punjab';
  const recommendations = await ApiClient.getRecommendations(activeLocation);

  return `
    <section class="page-section">
      <div class="container">
        <!-- Live Online Data Synchronization Header Banner -->
        <div class="live-banner-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="live-pulse-dot"></span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green);">
              ${t('rec_banner', 'AI Agro-Climatic Recommendation Engine Live')}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-secondary); opacity: 0.9;">
              • ${t('rec_banner_sub', 'Dynamically Calibrated to Real-Time Weather & Leaf Diagnoses')}
            </span>
          </div>

          <button id="recommendations-sync-btn" class="btn btn-sm btn-secondary" style="gap: 6px; padding: 4px 12px; font-size: 0.8rem;">
            ${svgIcons.refresh(14)}
            <span>${t('recalibrate', 'Recalibrate Advisories')}</span>
          </button>
        </div>

        <div class="section-header">
          <h2 class="section-title">${t('rec_title', 'Smart Agricultural Recommendations')}</h2>
          <p class="section-subtitle">${t('rec_sub', 'Categorized actionable guidance prioritized by live micro-climate risk, active leaf diagnostics, and field conditions.')}</p>
        </div>

        <!-- Filter Chips -->
        <div style="display: flex; justify-content: center; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-8);">
          <button class="btn btn-sm btn-primary rec-filter-btn" data-filter="all">${t('filter_all', 'All Advisories')}</button>
          <button class="btn btn-sm btn-secondary rec-filter-btn" data-filter="Immediate Actions">${t('filter_immediate', 'Immediate Actions')}</button>
          <button class="btn btn-sm btn-secondary rec-filter-btn" data-filter="Treatment">${t('filter_treatment', 'Treatment')}</button>
          <button class="btn btn-sm btn-secondary rec-filter-btn" data-filter="Prevention">${t('filter_prevention', 'Prevention')}</button>
          <button class="btn btn-sm btn-secondary rec-filter-btn" data-filter="Weather-Based Advice">${t('filter_weather', 'Weather Advice')}</button>
        </div>

        <!-- Recommendations Grid -->
        <div class="grid-2">
          ${recommendations.map(rec => `
            <div class="card rec-card" data-category="${rec.category}">
              <div class="card-header" style="flex-wrap: wrap; gap: var(--space-2);">
                <div style="display: flex; gap: 6px; align-items: center;">
                  <span class="badge ${rec.priorityClass}">${rec.priority} ${t('risk_level', 'PRIORITY')}</span>
                  ${rec.isLiveOnline ? `<span class="badge badge-low" style="background-color: #DCFCE7; color: #15803D;">${t('live_online_ai', 'Live Online AI')}</span>` : ''}
                </div>
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase;">${rec.category}</span>
              </div>

              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">${rec.title}</h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.6;">${rec.description}</p>

              ${rec.steps ? `
                <div style="margin-bottom: var(--space-4); padding: var(--space-3); background-color: var(--bg-surface-secondary); border-radius: var(--radius-sm); border-left: 3px solid var(--secondary-green);">
                  <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green); margin-bottom: 4px;">${t('action_sequence', 'Recommended Action Sequence:')}</div>
                  <ul style="list-style-type: decimal; padding-left: var(--space-5); font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
                    ${rec.steps.map(s => `<li>${s}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <a href="#${rec.targetTab || 'upload'}" class="btn btn-sm btn-secondary" style="width: 100%; justify-content: center;">
                <span>${rec.actionText || t('take_action', 'Take Action')}</span>
                ${svgIcons.arrowRight(16)}
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function initRecommendationsListeners() {
  const syncBtn = document.getElementById('recommendations-sync-btn');
  syncBtn?.addEventListener('click', async () => {
    syncBtn.classList.add('sync-spinning');
    showToast('Re-evaluating weather indices & recent crop diagnoses...', 'info');
    const activeLocation = localStorage.getItem('krishi_location') || 'punjab';
    await ApiClient.getRecommendations(activeLocation, true);
    syncBtn.classList.remove('sync-spinning');
    showToast('Recommendations re-calibrated with live online agronomy models!', 'success');
    if (typeof handleRoute === 'function') {
      handleRoute();
    }
  });

  document.querySelectorAll('.rec-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rec-filter-btn').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-secondary');
      });
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.rec-card').forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
