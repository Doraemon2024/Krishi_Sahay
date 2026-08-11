/**
 * Farmer Helplines Page View Component
 */
async function renderHelplinesView() {
  const helplines = await ApiClient.getHelplines();

  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Emergency Farmer Helplines</h2>
          <p class="section-subtitle">Direct toll-free phone contacts for immediate agricultural advice, plant pathology support, and crop emergency assistance.</p>
        </div>

        <div class="grid-2">
          ${helplines.map(h => `
            <div class="card">
              <div class="card-header">
                <span class="badge badge-high">${h.category}</span>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">${h.timings}</span>
              </div>

              <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary-green); margin-bottom: var(--space-2);">${h.name}</h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: var(--space-6); line-height: 1.6;">${h.description}</p>

              <div style="background-color: var(--bg-surface-secondary); padding: var(--space-4); border-radius: var(--radius-md); text-align: center; margin-bottom: var(--space-6); border: 1px solid rgba(27,77,62,0.1);">
                <div style="font-size: 0.75rem; uppercase; font-weight: 700; color: var(--text-secondary);">Toll-Free Phone Number</div>
                <a href="tel:${h.dialNumber}" style="font-size: 1.8rem; font-weight: 800; color: var(--primary-green); text-decoration: none; display: block; margin-top: 2px;">
                  ${h.phone}
                </a>
              </div>

              <div style="display: flex; gap: var(--space-3);">
                <a href="tel:${h.dialNumber}" class="btn btn-primary" style="flex: 1;">
                  ${svgIcons.phone(20)}
                  <span>Call Now</span>
                </a>

                <a href="https://wa.me/${(h.whatsapp || '').replace('+', '')}?text=Hello%20KrishiSahay%20Helpline" target="_blank" class="btn btn-secondary" style="flex: 1;">
                  <span>WhatsApp Help</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
