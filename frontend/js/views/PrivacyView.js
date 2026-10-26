/**
 * Privacy Policy & Data Control View Component
 */
async function renderPrivacyView() {
  const t = (k, f) => (typeof I18nService !== 'undefined' ? I18nService.t(k, f) : f);
  const policy = await ApiClient.getPrivacyPolicy() || {
    title: t('privacy_title', 'KrishiSahay Data Privacy & Security Policy'),
    lastUpdated: "2026",
    sections: [
      { id: "data_collection", title: t('data_collection_title', 'Data We Collect'), icon: "database", content: t('data_collection_desc', 'We collect uploaded leaf images, basic GPS location coordinates (if permitted) for localized weather advisories, and device preferences to maintain your diagnosis history locally.') },
      { id: "data_usage", title: t('data_usage_title', 'How We Use Data'), icon: "cpu", content: t('data_usage_desc', 'Your leaf images are processed solely by our computer vision neural network to detect crop pathogens, calculate confidence scores, and generate customized treatment plans. We never sell farmer data to third parties.') },
      { id: "farmer_rights", title: t('farmer_rights_title', 'Your Rights'), icon: "userCheck", content: t('farmer_rights_desc', 'You retain 100% ownership of your farm data. You have the right to inspect, export as JSON, or completely delete all stored leaf diagnosis history at any time with one click.') },
      { id: "data_security", title: t('data_security_title', 'Data Security'), icon: "shield", content: t('data_security_desc', 'All communication is encrypted over HTTPS (TLS 1.3). Uploaded leaf files are securely stored and automatically scrubbed according to user retention preferences.') },
      { id: "data_deletion", title: t('data_deletion_title', 'Data Erasure & Export'), icon: "trash", content: t('data_deletion_desc', 'Use the interactive controls below to instantly download a copy of your crop health logs or permanently wipe all records from this browser session.') },
      { id: "support_contact", title: t('support_contact_title', 'Privacy Support'), icon: "phone", content: t('support_contact_desc', 'For privacy inquiries or technical support, contact privacy@krishisahay.org or call Kisan Support at 1800-180-1551.') }
    ]
  };

  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">${policy.title}</h2>
          <p class="section-subtitle">${t('privacy_sub', 'KrishiSahay is committed to safeguarding farmer data sovereignty, field GPS security, and image privacy.')}</p>
        </div>

        <!-- Privacy Interactive Actions Card -->
        <div class="card" style="margin-bottom: var(--space-8); background-color: var(--secondary-green-light); border: 1.5px solid var(--secondary-green);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
            <div>
              <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-green); margin-bottom: 4px;">${t('take_control_data', 'Take Control of Your Farm Data')}</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">${t('take_control_desc', 'Download a copy of your diagnostic history or wipe all data permanently.')}</p>
            </div>

            <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
              <button id="export-data-btn" class="btn btn-primary btn-sm">
                ${svgIcons.upload(16)}
                <span>${t('export_json', 'Export My Data (JSON)')}</span>
              </button>

              <button id="wipe-data-btn" class="btn btn-danger btn-sm">
                ${svgIcons.trash(16)}
                <span>${t('delete_records', 'Delete All My Records')}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Privacy Sections Cards Grid -->
        <div class="grid-2">
          ${(policy.sections || []).map(sec => `
            <div class="card">
              <div class="card-header">
                <span class="badge badge-low">${t('verified_policy', 'Verified Policy')}</span>
              </div>

              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-2);">${sec.title}</h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${sec.content}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function initPrivacyListeners() {
  const exportBtn = document.getElementById('export-data-btn');
  const wipeBtn = document.getElementById('wipe-data-btn');

  exportBtn?.addEventListener('click', async () => {
    try {
      const data = await ApiClient.exportPrivacyData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `krishisahay_farm_data_${Date.now()}.json`;
      a.click();
      showToast('Data exported successfully!', 'success');
    } catch (e) {
      showToast('Failed to export data', 'error');
    }
  });

  wipeBtn?.addEventListener('click', async () => {
    if (confirm('Permanently delete all your crop diagnosis logs from KrishiSahay? This cannot be undone.')) {
      try {
        await ApiClient.wipeAllData();
        showToast('All your data has been permanently erased.', 'success');
        setTimeout(() => window.location.reload(), 1000);
      } catch (e) {
        showToast('Failed to delete data', 'error');
      }
    }
  });
}
