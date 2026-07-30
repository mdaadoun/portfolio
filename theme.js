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

    // Écouteur pour les selects de thème
    document.body.addEventListener('change', (e) => {
      if (e.target.classList.contains('theme-select')) {
        const newTheme = e.target.value;
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
      }
    });
  });
})();


