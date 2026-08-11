/**
 * AI Recommendations Page View Component
 */
async function renderRecommendationsView() {
  const activeLocation = localStorage.getItem('krishi_location') || 'punjab';
  const recommendations = await ApiClient.getRecommendations(activeLocation);

  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Smart Agricultural Recommendations</h2>
          <p class="section-subtitle">Categorized actionable guidance prioritized by field risk, active leaf diagnostics, and micro-climate advisories.</p>
        </div>

        <!-- Filter Chips -->
        <div style="display: flex; justify-content: center; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-8);">
          <button class="btn btn-sm btn-primary rec-filter-btn" data-filter="all">All Advisories</button>
          <button class="btn btn-sm btn-secondary rec-filter-btn" data-filter="Immediate Actions">Immediate Actions</button>
          <button class="btn btn-sm btn-secondary rec-filter-btn" data-filter="Treatment">Treatment</button>
          <button class="btn btn-sm btn-secondary rec-filter-btn" data-filter="Prevention">Prevention</button>
          <button class="btn btn-sm btn-secondary rec-filter-btn" data-filter="Weather-Based Advice">Weather Advice</button>
        </div>

        <!-- Recommendations Grid -->
        <div class="grid-2">
          ${recommendations.map(rec => `
            <div class="card rec-card" data-category="${rec.category}">
              <div class="card-header">
                <span class="badge ${rec.priorityClass}">${rec.priority} PRIORITY</span>
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); uppercase;">${rec.category}</span>
              </div>

              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">${rec.title}</h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.6;">${rec.description}</p>

              ${rec.steps ? `
                <div style="margin-bottom: var(--space-4); padding: var(--space-3); background-color: var(--bg-surface-secondary); border-radius: var(--radius-sm);">
                  <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-green); margin-bottom: 4px;">Recommended Action Sequence:</div>
                  <ul style="list-style-type: decimal; padding-left: var(--space-5); font-size: 0.85rem; color: var(--text-secondary);">
                    ${rec.steps.map(s => `<li>${s}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <a href="#${rec.targetTab || 'upload'}" class="btn btn-sm btn-secondary" style="width: 100%; justify-content: center;">
                <span>${rec.actionText || 'Take Action'}</span>
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
