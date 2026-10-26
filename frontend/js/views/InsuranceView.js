/**
 * Government Crop Insurance Page View Component (Live Online Dynamic Auto-Updated)
 */
async function renderInsuranceView() {
  const t = (k, f) => (typeof I18nService !== 'undefined' ? I18nService.t(k, f) : f);
  const schemes = await ApiClient.getInsuranceSchemes();

  return `
    <section class="page-section">
      <div class="container">
        <!-- Live Online Data Synchronization Header Banner -->
        <div class="live-banner-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="live-pulse-dot"></span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green);">
              ${t('insurance_banner', 'Official Ministry of Agriculture & Farmers Welfare (MoA&FW) Sync Live')}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-secondary); opacity: 0.9;">
              • ${t('insurance_banner_sub', 'Active Policy Cycle: Kharif / Rabi 2026')}
            </span>
          </div>

          <button id="insurance-sync-btn" class="btn btn-sm btn-secondary" style="gap: 6px; padding: 4px 12px; font-size: 0.8rem;">
            ${svgIcons.refresh(14)}
            <span>${t('sync_scheme_updates', 'Sync Scheme Updates')}</span>
          </button>
        </div>

        <div class="section-header">
          <h2 class="section-title">${t('insurance_title', 'Government Crop Insurance Schemes')}</h2>
          <p class="section-subtitle">${t('insurance_sub', 'Financial safety nets protecting your farm against natural calamities, unseasonal weather, drought, and crop disease epidemics.')}</p>
        </div>

        <div class="grid-2">
          ${schemes.map(s => `
            <div class="card">
              <div class="card-header" style="flex-wrap: wrap; gap: var(--space-2);">
                <div style="display: flex; gap: 6px; align-items: center;">
                  <span class="badge ${s.statusColor || 'badge-low'}">${s.liveBadge || t('active_policy', 'Active 2026 Policy')}</span>
                </div>
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--accent-gold);">${s.premiumRates}</span>
              </div>

              <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-green); margin-bottom: 4px;">${s.name}</h3>
              <p style="font-size: 0.85rem; font-weight: 600; color: var(--secondary-green); margin-bottom: var(--space-4);">${s.tagline}</p>
              
              <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: var(--space-6); line-height: 1.6;">${s.overview}</p>

              <div style="background-color: var(--bg-surface-secondary); padding: var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-6); border: 1px solid rgba(27,77,62,0.08);">
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">${t('key_policy_benefits', 'Key Policy Benefits:')}</div>
                <ul style="list-style-type: disc; padding-left: var(--space-5); font-size: 0.875rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: var(--space-1);">
                  ${(s.benefits || []).map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>

              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-6);">
                <strong>${t('eligibility_enrollment', 'Eligibility & Enrollment:')}</strong> ${s.eligibility}
                ${s.liveDeadline ? `<div style="margin-top: 4px; font-weight: 600; color: var(--primary-green);">⚡ ${t('status', 'Status:')} ${s.liveDeadline}</div>` : ''}
              </div>

              <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
                <a href="${s.onlineClaimPortal || s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; justify-content: center; min-width: 160px;">
                  <span>${t('apply_claim_online', 'Apply / Claim Online')}</span>
                  ${svgIcons.externalLink(16)}
                </a>

                <a href="tel:${s.helpline}" class="btn btn-secondary" style="flex: 1; justify-content: center; min-width: 160px;">
                  ${svgIcons.phone(16)}
                  <span>${t('helpline', 'Helpline')} (${s.helpline})</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function initInsuranceListeners() {
  const syncBtn = document.getElementById('insurance-sync-btn');
  syncBtn?.addEventListener('click', async () => {
    syncBtn.classList.add('sync-spinning');
    showToast('Checking online PMFBY & state insurance portal updates...', 'info');
    await ApiClient.getInsuranceSchemes(true);
    syncBtn.classList.remove('sync-spinning');
    showToast('Insurance guidelines synchronized with latest 2026 directives!', 'success');
    if (typeof handleRoute === 'function') {
      handleRoute();
    }
  });
}
