/**
 * Weather & Climate Risk Score View Component
 */
async function renderWeatherView() {
  const weatherRes = await ApiClient.getWeather('punjab');
  const weather = weatherRes.data;
  const regions = weatherRes.regions || [];

  return `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Agricultural Weather & Climate Risk</h2>
          <p class="section-subtitle">Real-time micro-climate monitoring and fungal spore outbreak risk predictions tailored for crop protection.</p>
        </div>

        <!-- Location Switcher Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-8); background-color: var(--bg-surface); padding: var(--space-4) var(--space-6); border-radius: var(--radius-lg); border: 1px solid rgba(27,77,62,0.1);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            ${svgIcons.mapPin(22, 'color: var(--primary-green);')}
            <div>
              <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-secondary);">Selected Agricultural Zone</div>
              <div id="active-location-name" style="font-size: 1.1rem; font-weight: 700; color: var(--primary-green);">${weather.name}</div>
            </div>
          </div>

          <div>
            <select id="region-selector" style="padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); border: 1px solid rgba(27,77,62,0.2); background-color: var(--bg-surface-secondary); color: var(--text-main); font-weight: 600; outline: none;">
              ${regions.map(r => `<option value="${r.id}" ${r.id === weather.id ? 'selected' : ''}>${r.name}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Prominent Climate Risk Score Component -->
        <div style="margin-bottom: var(--space-8);">
          <div class="climate-risk-box">
            <div class="risk-score-circle ${weather.riskBadgeClass}">
              <span class="risk-num">${weather.riskScore}</span>
              <span class="risk-label">${weather.riskLevel} RISK</span>
            </div>

            <div>
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
                <span class="badge ${weather.riskBadgeClass}">CLIMATE RISK ASSESSMENT</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">Updated Just Now</span>
              </div>

              <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--primary-green); margin-bottom: var(--space-2);">
                ${weather.riskLevel} Fungal Spore Outbreak Risk
              </h3>

              <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: var(--space-4); line-height: 1.6;">
                <strong>Biological Rationale:</strong> ${weather.riskReason}
              </p>

              <div style="padding: var(--space-4); background-color: var(--bg-surface-secondary); border-left: 4px solid var(--primary-green); border-radius: var(--radius-sm);">
                <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--primary-green); margin-bottom: 2px;">Recommended Agricultural Action:</h4>
                <p style="font-size: 0.9rem; color: var(--text-main);">${weather.recommendedAction}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Current Weather Metrics Bar -->
        <div class="grid-3" style="margin-bottom: var(--space-8);">
          <div class="card" style="display: flex; align-items: center; gap: var(--space-4);">
            <div class="stat-icon" style="background-color: var(--accent-gold-light); color: var(--accent-gold);">
              ${svgIcons.sun(28)}
            </div>
            <div>
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary);">Temperature</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary-green);">${weather.temp}°C</div>
              <div style="font-size: 0.8rem; color: var(--text-light);">${weather.condition}</div>
            </div>
          </div>

          <div class="card" style="display: flex; align-items: center; gap: var(--space-4);">
            <div class="stat-icon" style="background-color: var(--color-info-bg); color: var(--color-info);">
              ${svgIcons.droplet(28)}
            </div>
            <div>
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary);">Relative Humidity</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary-green);">${weather.humidity}%</div>
              <div style="font-size: 0.8rem; color: var(--text-light);">Rain Chance: ${weather.rainProbability}%</div>
            </div>
          </div>

          <div class="card" style="display: flex; align-items: center; gap: var(--space-4);">
            <div class="stat-icon" style="background-color: var(--secondary-green-light); color: var(--secondary-green);">
              ${svgIcons.weather(28)}
            </div>
            <div>
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary);">Wind & UV Index</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary-green);">${weather.windSpeed} km/h</div>
              <div style="font-size: 0.8rem; color: var(--text-light);">UV Index: ${weather.uvIndex}</div>
            </div>
          </div>
        </div>

        <!-- 7-Day Forecast Grid -->
        <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--primary-green); margin-bottom: var(--space-4);">7-Day Agricultural Weather Forecast</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-4);">
          ${(weather.forecast || []).map(f => `
            <div class="card" style="text-align: center; padding: var(--space-4);">
              <div style="font-weight: 700; color: var(--primary-green); margin-bottom: 4px;">${f.day}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: var(--space-3);">${f.condition}</div>
              <div style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">${f.high}° / ${f.low}°</div>
              <div style="font-size: 0.75rem; color: var(--color-info); margin-top: 4px;">💧 ${f.rain}% Rain</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function initWeatherListeners() {
  const selector = document.getElementById('region-selector');
  selector?.addEventListener('change', async (e) => {
    const regionId = e.target.value;
    const res = await ApiClient.getWeather(regionId);
    if (res && res.data) {
      showToast(`Updated weather data for ${res.data.name}`, 'info');
      // Re-render
      window.location.reload();
    }
  });
}
