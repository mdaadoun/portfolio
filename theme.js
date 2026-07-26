(function () {
  const THEME_KEY = 'portfolio_theme';

  // Apply theme immediately to document element to avoid FLASH of unstyled/wrong theme
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to dark as requested
    return 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateButtons(theme);
  }

  function updateButtons(theme) {
    const lang = document.documentElement.getAttribute('lang') || localStorage.getItem('portfolio_lang') || 'en';
    const isEn = lang === 'en';
    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => {
      const icon = btn.querySelector('.theme-icon');
      const text = btn.querySelector('.theme-text');
      if (theme === 'light') {
        if (icon) icon.textContent = '☀️';
        if (text) text.textContent = isEn ? 'Light' : 'Clair';
        btn.setAttribute('aria-label', isEn ? 'Switch to dark mode' : 'Passer en mode sombre');
        btn.setAttribute('title', isEn ? 'Switch to dark mode' : 'Passer en mode sombre');
      } else {
        if (icon) icon.textContent = '🌙';
        if (text) text.textContent = isEn ? 'Dark' : 'Sombre';
        btn.setAttribute('aria-label', isEn ? 'Switch to light mode' : 'Passer en mode clair');
        btn.setAttribute('title', isEn ? 'Switch to light mode' : 'Passer en mode clair');
      }
    });
  }

  window.updateThemeButtons = function () {
    const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
    updateButtons(currentTheme);
  };

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', () => {
    updateButtons(getPreferredTheme());

    document.body.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
      }
    });
  });
})();
