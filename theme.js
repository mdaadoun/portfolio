(function () {
  const THEME_KEY = 'portfolio_theme';
  const VALID_THEMES = ['paxfabrica', 'dark', 'light', 'dracula', 'templeos'];

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && VALID_THEMES.includes(saved)) {
      return saved;
    }
    return 'paxfabrica';
  }

  function applyTheme(theme) {
    if (!VALID_THEMES.includes(theme)) theme = 'paxfabrica';
    
    // Nettoyer les classes de thèmes sur documentElement
    VALID_THEMES.forEach(t => {
      if (t !== 'dark') document.documentElement.classList.remove(t + '-theme');
    });
    
    if (theme !== 'dark') {
      document.documentElement.classList.add(theme + '-theme');
    }
    document.documentElement.setAttribute('data-theme', theme);

    updateThemeControls(theme);
  }


  function updateThemeControls(theme) {
    const selects = document.querySelectorAll('.theme-select');
    selects.forEach(select => {
      if (select.value !== theme) {
        select.value = theme;
      }
    });
  }

  window.updateThemeButtons = function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    updateThemeControls(currentTheme);
  };

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeControls(getPreferredTheme());

    // Listener for theme select controls
    document.body.addEventListener('change', (e) => {
      if (e.target.classList.contains('theme-select')) {
        const newTheme = e.target.value;
        localStorage.setItem(THEME_KEY, newTheme);
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
      linksWrapper.querySelectorAll('a').forEach(link => {
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
      backToTopBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
      document.body.appendChild(backToTopBtn);
    }

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll Handler for Back to Top & Navbar ScrollSpy
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;

      // Show/Hide Back to Top
      if (scrollPos > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      // Active Section ScrollSpy
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navAnchors.forEach(anchor => {
        const targetId = anchor.getAttribute('href').replace('#', '');
        if (targetId === currentSectionId && currentSectionId !== '') {
          anchor.classList.add('active');
        } else {
          anchor.classList.remove('active');
        }
      });
    }, { passive: true });
  });
})();


