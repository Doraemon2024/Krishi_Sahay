/**
 * Farmer Awareness & Workshops View Component
 */
async function renderAwarenessView() {
  const events = await ApiClient.getEvents();

  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Farmer Awareness & Skill Workshops</h2>
          <p class="section-subtitle">Upcoming field training camps, soil testing drives, smart irrigation webinars, and seed orientation summits.</p>
        </div>

        <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--space-6);">
          ${events.map(ev => `
            <div class="card" style="display: flex; gap: var(--space-6); flex-direction: column; @media(min-width: 768px){flex-direction: row;}">
              <div style="background-color: var(--secondary-green-light); border-radius: var(--radius-md); padding: var(--space-4) var(--space-6); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 150px;">
                <div style="color: var(--primary-green); margin-bottom: 4px;">
                  ${svgIcons.calendar(28)}
                </div>
                <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-green);">${ev.date}</div>
                <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); margin-top: 2px;">${ev.time}</div>
              </div>

              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2); flex-wrap: wrap; gap: var(--space-2);">
                  <span class="badge badge-info">${ev.category}</span>
                  <span class="badge badge-low">${ev.registrationFee}</span>
                </div>

                <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary-green); margin-bottom: var(--space-2);">${ev.title}</h3>
                
                <p style="font-size: 0.925rem; color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.6;">${ev.description}</p>

                <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-4);">
                  ${svgIcons.mapPin(16, 'color: var(--primary-green);')}
                  <span><strong>Location:</strong> ${ev.location}</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3);">
                  <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-light);">Organizer: ${ev.organizer}</span>
                  
                  <button class="btn btn-primary btn-sm register-event-btn" data-title="${ev.title}">
                    ${svgIcons.check(16)}
                    <span>Register for Free</span>
                  </button>
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
  document.querySelectorAll('.register-event-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      showToast(`Registered successfully for "${title}"! Check your SMS for confirmation.`, 'success');
    });
  });
}
