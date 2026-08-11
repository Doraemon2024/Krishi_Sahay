/**
 * Dashboard / Crop Health View Component
 */
async function renderDashboardView() {
  const history = await ApiClient.getDiagnosesHistory();

  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Crop Health Dashboard</h2>
          <p class="section-subtitle">Monitor seasonal crop performance, review historical AI diagnosis logs, and manage field health records.</p>
        </div>

        <!-- Season Summary Card -->
        <div class="card" style="margin-bottom: var(--space-8); background: linear-gradient(135deg, var(--primary-green), #154734); color: var(--text-on-primary);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
            <div>
              <span class="badge" style="background-color: rgba(255,255,255,0.2); color: #FFFFFF;">KHARIF SEASON 2026</span>
              <h3 style="font-size: 1.6rem; font-weight: 800; margin-top: 6px;">Paddy & Solanaceous Crop Health Status</h3>
              <p style="font-size: 0.95rem; opacity: 0.9;">Field Location: Ludhiana, Punjab | Total Logged Inspections: ${history.length}</p>
            </div>
            
            <div style="background-color: rgba(255,255,255,0.15); backdrop-filter: blur(8px); padding: var(--space-4) var(--space-6); border-radius: var(--radius-md); text-align: center;">
              <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.8;">Overall Field Risk</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #4ADE80; margin-top: 2px;">
                ${history.length > 0 && history[0].severity === 'HIGH' ? 'MODERATE RISK' : 'LOW / SAFE'}
              </div>
            </div>
          </div>
        </div>

        <!-- History Search & Actions Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-6);">
          <div style="display: flex; align-items: center; gap: var(--space-3); background-color: var(--bg-surface); padding: 8px var(--space-4); border-radius: var(--radius-md); border: 1px solid rgba(27,77,62,0.12); flex: 1; max-width: 400px;">
            ${svgIcons.search(18, 'color: var(--text-secondary);')}
            <input type="text" id="history-search-input" placeholder="Search diagnoses by crop or disease..." style="border: none; background: none; width: 100%; outline: none;">
          </div>

          <div style="display: flex; gap: var(--space-3);">
            <a href="#upload" class="btn btn-primary btn-sm">
              ${svgIcons.camera(16)}
              <span>New Diagnosis</span>
            </a>
            
            ${history.length > 0 ? `
              <button id="clear-history-btn" class="btn btn-secondary btn-sm" style="color: var(--color-danger); border-color: var(--color-danger);">
                ${svgIcons.trash(16)}
                <span>Clear Logs</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Diagnosis Records Grid / Empty State -->
        <div id="history-list-container">
          ${history.length === 0 ? `
            <!-- Friendly Empty State -->
            <div class="card" style="text-align: center; padding: var(--space-12);">
              <div class="upload-icon-circle" style="background-color: var(--secondary-green-light); color: var(--primary-green);">
                ${svgIcons.leaf(40)}
              </div>
              <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">
                No Crop Diagnoses Yet
              </h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 460px; margin: 0 auto var(--space-6);">
                Upload a leaf photo or test a sample image to generate your first AI-powered crop health report.
              </p>
              <a href="#upload" class="btn btn-primary">
                ${svgIcons.camera(20)}
                <span>Upload Leaf Photo</span>
              </a>
            </div>
          ` : `
            <div class="grid-2">
              ${history.map(item => `
                <div class="card history-item-card">
                  <div style="display: flex; gap: var(--space-4); align-items: flex-start;">
                    <img src="${item.uploadedImage || item.sampleImage || '/samples/rice_blast.svg'}" alt="${item.disease}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-md); border: 1px solid rgba(27,77,62,0.1);">
                    
                    <div style="flex: 1;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span class="badge ${item.severityBadgeClass || 'badge-medium'}">${item.severity} SEVERITY</span>
                        <span style="font-size: 0.75rem; color: var(--text-light);">${item.formattedDate}</span>
                      </div>
                      
                      <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-green);">${item.disease}</h4>
                      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-3);">Crop: <strong>${item.crop}</strong> | Confidence: <strong>${item.confidence}%</strong></p>

                      <div style="display: flex; gap: var(--space-3);">
                        <a href="#problem" class="btn btn-sm btn-secondary">
                          ${svgIcons.leaf(14)} View Report
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </section>
  `;
}

function initDashboardListeners() {
  const searchInput = document.getElementById('history-search-input');
  const clearBtn = document.getElementById('clear-history-btn');

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.history-item-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? 'block' : 'none';
    });
  });

  clearBtn?.addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear all stored crop diagnosis logs?')) {
      await ApiClient.wipeAllData();
      showToast('Diagnosis logs cleared successfully.', 'success');
      window.location.reload();
    }
  });
}
