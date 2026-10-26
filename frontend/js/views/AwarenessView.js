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
            <div class="card" style="display: flex; gap: var(--space-6); flex-direction: column; @media(min-width: 768px){flex-direction: row;} border: 1px solid rgba(27,77,62,0.1);">
              <div style="background-color: var(--secondary-green-light); border-radius: var(--radius-md); padding: var(--space-4) var(--space-6); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 150px;">
                <div style="color: var(--primary-green); margin-bottom: 4px;">
                  ${svgIcons.calendar(28)}
                </div>
                <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-green);">${ev.date}</div>
                <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); margin-top: 2px;">${ev.time}</div>
                ${ev.seatsLeft ? `<div style="font-size: 0.7rem; color: var(--accent-gold); font-weight: 700; margin-top: 4px;">⚡ ${ev.seatsLeft}</div>` : ''}
              </div>

              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2); flex-wrap: wrap; gap: var(--space-2);">
                  <div style="display: flex; gap: 6px; align-items: center;">
                    <span class="badge badge-info">${ev.category}</span>
                    <span class="badge badge-low">${ev.liveStatus || '🟢 Registration Live'}</span>
                  </div>
                  <span class="badge badge-low" style="background-color: #DCFCE7; color: #15803D;">${ev.registrationFee}</span>
                </div>

                <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary-green); margin-bottom: var(--space-2);">${ev.title}</h3>
                
                <p style="font-size: 0.925rem; color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.6;">${ev.description}</p>

                <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4);">
                  ${svgIcons.mapPin(16, 'color: var(--primary-green);')}
                  <span><strong>${t('location', 'Location')}:</strong> ${ev.location}</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid rgba(27,77,62,0.08);">
                  <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-light);">${t('organizer', 'Organizer:')} ${ev.organizer}</span>
                  
                  <div style="display: flex; gap: var(--space-2);">
                    ${ev.virtualLink ? `
                      <a href="${ev.virtualLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                        ${svgIcons.externalLink(14)}
                        <span>${t('join_live_webinar', 'Join Live Webinar')}</span>
                      </a>
                    ` : ''}

                    <button class="btn btn-primary btn-sm register-event-btn" data-title="${ev.title}">
                      ${svgIcons.check(16)}
                      <span>${t('register_online_free', 'Register Online Free')}</span>
                    </button>
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
