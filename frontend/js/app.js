/**
 * KrishiSahay Single Page Application (SPA) Main Router & Controller
 */
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
});

const routes = {
  'home': { render: renderHomeView },
  'upload': { render: renderUploadDiagnosisView, init: initUploadDiagnosisListeners },
  'problem': { render: renderProblemDetailView },
  'dashboard': { render: renderDashboardView, init: initDashboardListeners },
  'weather': { render: renderWeatherView, init: initWeatherListeners },
  'recommendations': { render: renderRecommendationsView, init: initRecommendationsListeners },
  'helplines': { render: renderHelplinesView },
  'insurance': { render: renderInsuranceView },
  'awareness': { render: renderAwarenessView, init: initAwarenessListeners },
  'privacy': { render: renderPrivacyView, init: initPrivacyListeners }
};

async function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

async function handleRoute() {
  const rawHash = window.location.hash.replace('#', '').trim();
  const currentTab = routes[rawHash] ? rawHash : 'home';

  const appHeader = document.getElementById('app-header');
  const appContent = document.getElementById('app-content');
  const appFooter = document.getElementById('app-footer');

  // Render Header & Footer
  if (appHeader) appHeader.innerHTML = renderHeader(currentTab);
  if (appFooter) appFooter.innerHTML = renderFooter();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Show loading skeleton shimmer
  if (appContent) {
    appContent.innerHTML = `
      <div class="container page-section">
        <div class="skeleton" style="height: 48px; width: 60%; margin: 0 auto var(--space-6);"></div>
        <div class="skeleton" style="height: 240px; border-radius: var(--radius-lg); margin-bottom: var(--space-6);"></div>
        <div class="grid-3">
          <div class="skeleton" style="height: 180px;"></div>
          <div class="skeleton" style="height: 180px;"></div>
          <div class="skeleton" style="height: 180px;"></div>
        </div>
      </div>
    `;
  }

  // Render View Content
  try {
    const routeObj = routes[currentTab];
    const html = await routeObj.render();
    if (appContent) {
      appContent.innerHTML = html;
      if (routeObj.init) {
        routeObj.init();
      }
    }
  } catch (error) {
    console.error('Route Render Error:', error);
    if (appContent) {
      appContent.innerHTML = `
        <div class="container page-section" style="text-align: center;">
          <div class="card" style="max-width: 500px; margin: 0 auto;">
            <h3 style="color: var(--color-danger); margin-bottom: var(--space-2);">Something went wrong while loading this page.</h3>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">Please refresh or try clicking the button below.</p>
            <button onclick="window.location.reload()" class="btn btn-primary">Try Again</button>
          </div>
        </div>
      `;
    }
  }

  // Attach Global Mobile Drawer Listeners
  attachHeaderListeners();
}

function attachHeaderListeners() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const locationSelector = document.getElementById('header-location-selector');

  toggleBtn?.addEventListener('click', () => drawer?.classList.add('open'));
  closeBtn?.addEventListener('click', () => drawer?.classList.remove('open'));
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) drawer.classList.remove('open');
  });

  // Handle dynamic location selection changes
  locationSelector?.addEventListener('change', (e) => {
    const regionId = e.target.value;
    localStorage.setItem('krishi_location', regionId);
    
    const locLabels = {
      punjab: 'Punjab, IN',
      maharashtra: 'Maharashtra, IN',
      uttar_pradesh: 'Uttar Pradesh, IN',
      karnataka: 'Karnataka, IN'
    };
    
    showToast(`Agricultural location updated to ${locLabels[regionId] || regionId}`, 'success');
    
    // Dynamically refresh active page contents
    handleRoute();
  });
}
