(function () {
  const THEME_KEY = 'portfolio_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'pax-dark') {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    theme = theme === 'dark' ? 'dark' : 'light';

    // Clean up all legacy and active theme classes
    document.documentElement.classList.remove(
      'dark-theme',
      'light-theme',
      'pax-dark-theme',
      'pax-light-theme',
      'paxfabrica-theme',
      'dracula-theme',
      'templeos-theme'
    );

    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.setAttribute('data-theme', 'light');
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
    const isLight = theme === 'light';
    const buttons = document.querySelectorAll('.theme-toggle-btn');

    buttons.forEach((btn) => {
      // In Light mode -> target action is Dark mode (🌙 Sombre)
      // In Dark mode  -> target action is Light mode (☀️ Clair)
      const icon = isLight ? '🌙' : '☀️';
      const label = isLight
        ? (currentLang === 'en' ? 'Switch to dark mode' : 'Passer au mode sombre')
        : (currentLang === 'en' ? 'Switch to light mode' : 'Passer au mode clair');
      const text = isLight
        ? (currentLang === 'en' ? 'Dark' : 'Sombre')
        : (currentLang === 'en' ? 'Light' : 'Clair');

      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);

      const iconSpan = btn.querySelector('.theme-toggle-icon');
      const textSpan = btn.querySelector('.theme-toggle-text');
      if (iconSpan) {
        iconSpan.textContent = icon;
      }
      if (textSpan) {
        textSpan.textContent = text;
      }
      if (!iconSpan && !textSpan) {
        btn.innerHTML = `<span class="theme-toggle-icon">${icon}</span>`;
      }
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
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
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
