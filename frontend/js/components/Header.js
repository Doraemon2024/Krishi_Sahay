/**
 * Header Component - Sticky Top Bar with Logo, Desktop Nav, GPS Badge, & Mobile Drawer Menu
 */
function renderHeader(activeTab = 'home') {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'leaf' },
    { id: 'upload', label: 'Check Health', icon: 'camera' },
    { id: 'dashboard', label: 'Dashboard', icon: 'activity' },
    { id: 'weather', label: 'Weather & Risk', icon: 'weather' },
    { id: 'recommendations', label: 'Advisories', icon: 'shieldCheck' },
    { id: 'helplines', label: 'Helplines', icon: 'phone' },
    { id: 'insurance', label: 'Insurance', icon: 'shield' },
    { id: 'awareness', label: 'Awareness', icon: 'calendar' },
    { id: 'privacy', label: 'Privacy', icon: 'lock' }
  ];

  return `
    <header class="site-header">
      <div class="container header-container">
        <!-- Logo -->
        <a href="#home" class="brand-logo" aria-label="KrishiSahay Home">
          <div class="logo-icon-wrap">
            ${svgIcons.leaf(24)}
          </div>
          <div class="brand-text-wrap">
            <span class="brand-name">KrishiSahay</span>
            <span class="brand-tagline">Smart Agriculture</span>
          </div>
        </a>

        <!-- Desktop Navigation Menu -->
        <nav aria-label="Primary Navigation">
          <ul class="nav-menu">
            ${navItems.map(item => `
              <li>
                <a href="#${item.id}" class="nav-link ${activeTab === item.id ? 'active' : ''}">
                  ${svgIcons[item.icon](18)}
                  <span>${item.label}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>

        <!-- Right Header Actions -->
        <div class="header-actions">
          <div class="gps-status-pill" title="Select agricultural zone for localized advisories">
            <span class="gps-dot"></span>
            <select id="header-location-selector" style="border: none; background: none; font-size: 0.775rem; font-weight: 600; color: var(--text-secondary); outline: none; cursor: pointer; padding-right: 4px; font-family: inherit;">
              <option value="punjab" ${localStorage.getItem('krishi_location') === 'punjab' || !localStorage.getItem('krishi_location') ? 'selected' : ''}>Punjab, IN</option>
              <option value="maharashtra" ${localStorage.getItem('krishi_location') === 'maharashtra' ? 'selected' : ''}>Maharashtra, IN</option>
              <option value="uttar_pradesh" ${localStorage.getItem('krishi_location') === 'uttar_pradesh' ? 'selected' : ''}>Uttar Pradesh, IN</option>
              <option value="karnataka" ${localStorage.getItem('krishi_location') === 'karnataka' ? 'selected' : ''}>Karnataka, IN</option>
            </select>
          </div>
          
          <button id="mobile-menu-toggle" class="mobile-menu-btn" aria-label="Open Navigation Menu">
            ${svgIcons.menu(24)}
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <div id="mobile-drawer" class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div class="drawer-content">
        <div class="drawer-header">
          <a href="#home" class="brand-logo">
            <div class="logo-icon-wrap">
              ${svgIcons.leaf(22)}
            </div>
            <span class="brand-name">KrishiSahay</span>
          </a>
          <button id="mobile-drawer-close" class="mobile-menu-btn" aria-label="Close Navigation Menu">
            ${svgIcons.x(24)}
          </button>
        </div>

        <ul class="mobile-nav-list">
          ${navItems.map(item => `
            <li>
              <a href="#${item.id}" class="mobile-nav-link ${activeTab === item.id ? 'active' : ''}">
                ${svgIcons[item.icon](20)}
                <span>${item.label}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}
