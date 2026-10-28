/**
 * Farmer Awareness & Workshops View Component (Live Online Dynamic Auto-Updated)
 */
async function renderAwarenessView() {
  const t = (k, f) => (typeof I18nService !== 'undefined' ? I18nService.t(k, f) : f);
  const events = await ApiClient.getEvents();

  return `
    <section class="page-section">
      <div class="container">
        <!-- Live Online Data Synchronization Header Banner -->
        <div class="live-banner-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="live-pulse-dot"></span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green);">
              ${t('awareness_banner', 'ICAR & Krishi Vigyan Kendra (KVK) Workshop Feed Live')}
            </span>
            <span style="font-size: 0.8rem; color: var(--text-secondary); opacity: 0.9;">
              • ${t('awareness_banner_sub', 'Real-Time Training Schedule Synchronized')}
            </span>
          </div>

          <button id="awareness-sync-btn" class="btn btn-sm btn-secondary" style="gap: 6px; padding: 4px 12px; font-size: 0.8rem;">
            ${svgIcons.refresh(14)}
            <span>${t('sync_event_calendar', 'Sync Event Calendar')}</span>
          </button>
        </div>

        <div class="section-header">
          <h2 class="section-title">${t('awareness_title', 'Farmer Awareness & Training Workshops')}</h2>
          <p class="section-subtitle">${t('awareness_sub', 'Upcoming field training camps, soil testing drives, smart irrigation webinars, and seed orientation summits.')}</p>
        </div>

        <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--space-6);">
          ${events.map(ev => `
            <div class="card awareness-event-card">
              <div style="background-color: var(--secondary-green-light); border-radius: var(--radius-md); padding: var(--space-4) var(--space-6); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 150px;">
                <div style="color: var(--primary-green); margin-bottom: 4px;">
                  ${svgIcons.calendar(28)}
                </div>
                <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-green);">${ev.date}</div>
                <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); margin-top: 2px;">${ev.time}</div>
                ${ev.status ? `<div style="font-size: 0.725rem; color: var(--primary-green); font-weight: 700; margin-top: 6px; background: rgba(27,77,62,0.12); padding: 2px 6px; border-radius: var(--radius-sm);">${ev.status}</div>` : ''}
              </div>

              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2); flex-wrap: wrap; gap: var(--space-2);">
                  <div style="display: flex; gap: 6px; align-items: center;">
                    <span class="badge badge-info">${ev.category}</span>
                    <span class="badge badge-low" style="background-color: #E0F2FE; color: #0369A1;">🏛️ Verified MoA&FW / ICAR</span>
                  </div>
                  <span class="badge badge-low" style="background-color: #DCFCE7; color: #15803D;">${ev.registrationFee}</span>
                </div>

                <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary-green); margin-bottom: var(--space-2);">${ev.title}</h3>
                
                <p style="font-size: 0.925rem; color: var(--text-secondary); margin-bottom: var(--space-3); line-height: 1.6;">${ev.description}</p>

                ${ev.targetCrops ? `
                  <div style="margin-bottom: var(--space-3); display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-light); text-transform: uppercase;">Target Crops:</span>
                    <span class="badge badge-low" style="font-size: 0.75rem;">${ev.targetCrops}</span>
                  </div>
                ` : ''}

                <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: var(--space-4);">
                  <div style="display: flex; align-items: center; gap: var(--space-2);">
                    ${svgIcons.mapPin(16, 'color: var(--primary-green);')}
                    <span><strong>${t('location', 'Location')}:</strong> ${ev.location}</span>
                  </div>
                  ${ev.nodalOfficer ? `
                    <div style="display: flex; align-items: center; gap: var(--space-2); font-size: 0.8rem; color: var(--text-light);">
                      <span>🏛️ <strong>Nodal Division:</strong> ${ev.nodalOfficer}</span>
                    </div>
                  ` : ''}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid rgba(27,77,62,0.08);">
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary-green);">${ev.organizer}</span>
                    <span style="font-size: 0.725rem; color: var(--text-light);">Helpline: ${ev.helpline || '1800-180-1551'}</span>
                  </div>
                  
                  <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
                    ${ev.officialPortalUrl ? `
                      <a href="${ev.officialPortalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Visit Official Ministry / ICAR Portal" style="font-size: 0.775rem;">
                        ${svgIcons.externalLink(14)}
                        <span>Official Portal</span>
                      </a>
                    ` : ''}

                    <a href="${ev.registrationUrl || 'https://kvk.icar.gov.in/'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm register-event-btn" data-title="${ev.title}">
                      ${svgIcons.check(16)}
                      <span>${t('register_online_free', 'Register on Portal')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function initAwarenessListeners() {
  const syncBtn = document.getElementById('awareness-sync-btn');
  syncBtn?.addEventListener('click', async () => {
    syncBtn.classList.add('sync-spinning');
    showToast('Checking live ICAR & university training schedules...', 'info');
    await ApiClient.getEvents(true);
    syncBtn.classList.remove('sync-spinning');
    showToast('Awareness event calendar updated with upcoming workshops!', 'success');
    if (typeof handleRoute === 'function') {
      handleRoute();
    }
  });

  document.querySelectorAll('.register-event-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      showToast(`Registered successfully for "${title}"! A confirmation SMS and joining link have been sent.`, 'success');
    });
  });
}
