/**
 * Problem / Diagnosis Detail Page View Component
 */
async function renderProblemDetailView() {
  const history = await ApiClient.getDiagnosesHistory();
  const report = history[0] || {
    id: "diag_demo_1",
    crop: "Rice (Paddy)",
    disease: "Rice Blast (Magnaporthe oryzae)",
    severity: "HIGH",
    severityBadgeClass: "severity-high",
    confidence: 95.2,
    sampleImage: "/samples/rice_blast.svg",
    summary: "Fungal infection creating diamond-shaped lesions with grayish centers on rice leaves, causing severe yield reduction if untreated.",
    symptoms: [
      "Spindle-shaped or diamond-shaped spots on leaves",
      "Lesions with reddish-brown margins and gray or white centers",
      "Yellowing around lesions causing leaf tip drying"
    ],
    treatments: [
      { step: 1, title: "Immediate Fungicide Application", description: "Spray Tricyclazole 75% WP @ 0.6g/liter of water or Isoprothiolane 40% EC @ 1.5ml/liter of water thoroughly across affected field patches." },
      { step: 2, title: "Adjust Nitrogen Fertilizer Usage", description: "Temporarily suspend top-dressing of Urea nitrogen fertilizer. Excessive nitrogen promotes soft foliage that accelerates spore germination." },
      { step: 3, title: "Drain Field Excess Water", description: "Drain stagnant water for 2-3 days to lower canopy relative humidity, then re-irrigate with clean fresh water." }
    ],
    warnings: [
      "Do not apply systemic fungicide during active rainfall or within 3 hours before expected rain.",
      "Avoid spraying in hot mid-day sun to prevent leaf scorching."
    ],
    prevention: [
      "Use certified disease-resistant varieties such as Swarna Sub1 or PR 126",
      "Treat seeds with Carbendazim @ 2g/kg seed before sowing",
      "Maintain recommended plant spacing (20cm x 15cm) to ensure adequate airflow"
    ],
    weatherAdvisory: {
      recommendation: "Spray recommended fungicide immediately within the next 24-36 hours.",
      actionTime: "Early Morning (6:00 AM - 9:00 AM) or Late Evening",
      humidityThreshold: "High (>85% relative humidity favors blast spore release)",
      sprayStatus: "SAFE_TO_SPRAY",
      sprayStatusText: "Good time to spray - Low rain probability for next 18 hours"
    },
    formattedDate: "11 Aug 2026, 09:30 AM",
    location: "Ludhiana, Punjab"
  };

  return `
    <section class="page-section">
      <div class="container">
        <!-- Top Header Card -->
        <div class="card" style="margin-bottom: var(--space-8); background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-secondary) 100%);">
          <div style="display: flex; gap: var(--space-6); flex-wrap: wrap; align-items: center;">
            <img src="${report.uploadedImage || report.sampleImage || '/samples/rice_blast.svg'}" alt="${report.disease}" style="width: 120px; height: 120px; object-fit: cover; border-radius: var(--radius-md); border: 2px solid var(--primary-green);">
            
            <div style="flex: 1;">
              <div style="display: flex; gap: var(--space-3); align-items: center; margin-bottom: var(--space-2);">
                <span class="badge ${report.severityBadgeClass}">${report.severity} SEVERITY</span>
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-gold);">AI Confidence: ${report.confidence}%</span>
              </div>
              
              <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--primary-green); margin-bottom: 4px;">${report.disease}</h1>
              <p style="font-size: 0.95rem; color: var(--text-secondary);">Target Crop: <strong>${report.crop}</strong> | Location: ${report.location || 'Punjab'} | Date: ${report.formattedDate}</p>
            </div>

            <div>
              <a href="#upload" class="btn btn-secondary">
                ${svgIcons.camera(18)}
                <span>Check Another Leaf</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 4 Visually Distinct Sections -->
        <div class="problem-detail-tabs">
          
          <!-- Section 1: What's Wrong -->
          <div class="detail-section-card">
            <h2 class="detail-section-title">
              ${svgIcons.alertTriangle(24, 'color: var(--accent-gold);')}
              <span>1. What's Wrong (Symptoms & Explanation)</span>
            </h2>
            <p style="font-size: 1rem; color: var(--text-main); margin-bottom: var(--space-4); line-height: 1.7;">
              ${report.summary}
            </p>
            
            <h3 style="font-size: 1rem; font-weight: 600; color: var(--primary-green); margin-bottom: var(--space-3);">Identified Field Symptoms:</h3>
            <ul style="list-style-type: disc; padding-left: var(--space-6); display: flex; flex-direction: column; gap: var(--space-2); color: var(--text-secondary);">
              ${(report.symptoms || []).map(sym => `<li>${sym}</li>`).join('')}
            </ul>
          </div>

          <!-- Section 2: How to Treat (Numbered Steps) -->
          <div class="detail-section-card">
            <h2 class="detail-section-title">
              ${svgIcons.droplet(24, 'color: var(--secondary-green);')}
              <span>2. How to Treat (Actionable Steps)</span>
            </h2>
            
            ${(report.treatments || []).map(tr => `
              <div class="treatment-step-card">
                <div class="step-number-circle">${tr.step}</div>
                <div>
                  <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--primary-green); margin-bottom: 4px;">${tr.title}</h3>
                  <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">${tr.description}</p>
                </div>
              </div>
            `).join('')}

            ${report.warnings && report.warnings.length > 0 ? `
              <div style="margin-top: var(--space-6); padding: var(--space-4); background-color: var(--color-danger-bg); border-left: 4px solid var(--color-danger); border-radius: var(--radius-sm);">
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-danger); margin-bottom: 4px;">⚠️ Important Warnings:</h4>
                <ul style="list-style-type: disc; padding-left: var(--space-6); font-size: 0.875rem; color: #991B1B;">
                  ${report.warnings.map(w => `<li>${w}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>

          <!-- Section 3: Prevention Methods -->
          <div class="detail-section-card">
            <h2 class="detail-section-title">
              ${svgIcons.shieldCheck(24, 'color: var(--primary-green);')}
              <span>3. Prevention Methods</span>
            </h2>
            
            <div class="grid-3">
              ${(report.prevention || []).map((prev, idx) => `
                <div style="background-color: var(--bg-surface-secondary); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid rgba(27,77,62,0.08);">
                  <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2); font-weight: 600; color: var(--primary-green);">
                    ${svgIcons.check(18, 'color: var(--color-success);')}
                    <span>Tip #${idx + 1}</span>
                  </div>
                  <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">${prev}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 4: When to Act (Special Weather Advisory Card) -->
          <div class="weather-advisory-card">
            <div class="weather-advisory-header">
              ${svgIcons.sun(28)}
              <span>4. When to Act (Weather-Aware Spray Advisory)</span>
            </div>

            <div style="display: flex; gap: var(--space-6); flex-wrap: wrap; margin-bottom: var(--space-4);">
              <div style="flex: 1;">
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: var(--space-2);">
                  ${report.weatherAdvisory ? report.weatherAdvisory.sprayStatusText : 'Good time to spray - Low rain probability for next 18 hours'}
                </div>
                <p style="font-size: 0.95rem; color: var(--text-secondary);">
                  ${report.weatherAdvisory ? report.weatherAdvisory.recommendation : 'Spray recommended fungicide immediately within the next 24-36 hours.'}
                </p>
              </div>

              <div style="background-color: rgba(255,255,255,0.8); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid rgba(217,119,6,0.2); text-align: center; min-width: 200px;">
                <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--accent-gold-hover);">Recommended Action Window</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--primary-green); margin-top: 4px;">
                  ${report.weatherAdvisory ? report.weatherAdvisory.actionTime : 'Early Morning (6 AM - 9 AM)'}
                </div>
              </div>
            </div>

            <div style="display: flex; gap: var(--space-4); flex-wrap: wrap; font-size: 0.85rem; color: var(--text-secondary); padding-top: var(--space-3); border-top: 1px solid rgba(217,119,6,0.2);">
              <span>💧 Humidity Threshold: ${report.weatherAdvisory ? report.weatherAdvisory.humidityThreshold : '>85%'}</span>
              <span>🌡️ Optimal Temperature: 20°C - 28°C</span>
              <span>🌧️ Rain Likelihood: Low (<20%)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}
