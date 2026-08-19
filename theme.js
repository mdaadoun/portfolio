(function () {
  const THEME_KEY = 'portfolio_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'pax-dark' || saved === 'dark') {
      return 'pax-dark';
    }
    return 'pax-light';
  }

  function applyTheme(theme) {
    if (theme !== 'pax-light') {
      theme = 'pax-dark';
    }

    // Clean up all legacy and active theme classes
    document.documentElement.classList.remove(
      'pax-dark-theme',
      'pax-light-theme',
      'paxfabrica-theme',
      'dark-theme',
      'light-theme',
      'dracula-theme',
      'templeos-theme'
    );

    if (theme === 'pax-light') {
      document.documentElement.classList.add('pax-light-theme');
      document.documentElement.setAttribute('data-theme', 'pax-light');
    } else {
      document.documentElement.classList.add('pax-dark-theme', 'paxfabrica-theme');
      document.documentElement.setAttribute('data-theme', 'pax-dark');
    }

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* ignore storage quota / disabled errors */
    }

    updateThemeControls(theme);
  }

  function updateThemeControls(theme) {
    const currentLang = document.documentElement.getAttribute('lang') || 'fr';
    const isLight = theme === 'pax-light';
    const buttons = document.querySelectorAll('.theme-toggle-btn');

    buttons.forEach((btn) => {
      const icon = isLight ? '🌙' : '☀️';
      const label = isLight
        ? (currentLang === 'en' ? 'Switch to dark mode' : 'Passer au mode sombre')
        : (currentLang === 'en' ? 'Switch to light mode' : 'Passer au mode clair');

      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      btn.innerHTML = `<span class="theme-toggle-icon">${icon}</span>`;
    });
  }

  window.updateThemeButtons = function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    updateThemeControls(currentTheme);
  };

  // Immediate theme application to prevent unstyled flash
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeControls(getPreferredTheme());

    // Toggle theme on button click
    document.body.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'pax-light';
        const newTheme = currentTheme === 'pax-light' ? 'pax-dark' : 'pax-light';
        applyTheme(newTheme);
      }
    });

    // Mobile Hamburger Menu Toggle Logic
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const linksWrapper = document.querySelector('.nav-links-wrapper');
    if (toggleBtn && linksWrapper) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = linksWrapper.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close menu when clicking a link inside mobile drawer
      linksWrapper.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          linksWrapper.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Floating Back to Top Button
    let backToTopBtn = document.querySelector('.back-to-top-btn');
    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.className = 'back-to-top-btn';
      backToTopBtn.setAttribute('aria-label', 'Back to Top');
      backToTopBtn.setAttribute('title', 'Back to Top');
      backToTopBtn.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
      document.body.appendChild(backToTopBtn);
    }

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll Handler for Back to Top & Navbar ScrollSpy
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener(
      'scroll',
      () => {
        const scrollPos = window.scrollY || document.documentElement.scrollTop;

        if (scrollPos > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }

        let currentSectionId = '';
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 120;
          const sectionHeight = section.offsetHeight;
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
          }
        });

        navAnchors.forEach((anchor) => {
          const targetId = anchor.getAttribute('href').replace('#', '');
          if (targetId === currentSectionId && currentSectionId !== '') {
            anchor.classList.add('active');
          } else {
            anchor.classList.remove('active');
          }
        });
      },
      { passive: true }
    );
  });
})();
