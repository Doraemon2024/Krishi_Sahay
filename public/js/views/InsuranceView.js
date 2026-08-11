/**
 * Government Crop Insurance Page View Component
 */
async function renderInsuranceView() {
  const schemes = await ApiClient.getInsuranceSchemes();

  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Government Crop Insurance Schemes</h2>
          <p class="section-subtitle">Financial safety nets protecting your farm against natural calamities, unseasonal weather, drought, and crop disease epidemics.</p>
        </div>

        <div class="grid-2">
          ${schemes.map(s => `
            <div class="card">
              <div class="card-header">
                <span class="badge badge-low">Government Scheme</span>
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--accent-gold);">${s.premiumRates}</span>
              </div>

              <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-green); margin-bottom: 4px;">${s.name}</h3>
              <p style="font-size: 0.85rem; font-weight: 600; color: var(--secondary-green); margin-bottom: var(--space-4);">${s.tagline}</p>
              
              <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: var(--space-6); line-height: 1.6;">${s.overview}</p>

              <div style="background-color: var(--bg-surface-secondary); padding: var(--space-4); border-radius: var(--radius-md); margin-bottom: var(--space-6); border: 1px solid rgba(27,77,62,0.08);">
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">Key Policy Benefits:</div>
                <ul style="list-style-type: disc; padding-left: var(--space-5); font-size: 0.875rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: var(--space-1);">
                  ${(s.benefits || []).map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>

              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-6);">
                <strong>Eligibility:</strong> ${s.eligibility}
              </div>

              <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
                <a href="${s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; justify-content: center;">
                  <span>Official Portal</span>
                  ${svgIcons.externalLink(16)}
                </a>

                <a href="tel:${s.helpline}" class="btn btn-secondary" style="flex: 1; justify-content: center;">
                  ${svgIcons.phone(16)}
                  <span>Helpline (${s.helpline})</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
