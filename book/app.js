(function () {
  'use strict';

  // Book file mapping: key -> { en: path, fr: path }
  const BOOK_FILES = {
    summary: { en: '0_summary_en.md', fr: '0_summary_fr.md' },
    ch1: { en: '1_chapter_1_en.md', fr: '1_chapter_1_fr.md' },
    proj0: { en: '1_project_1_en.md', fr: '1_project_1_fr.md' },
    ch2: { en: '2_chapter_2_en.md', fr: '2_chapter_2_fr.md' },
    proj1: { en: '2_project_2_en.md', fr: '2_project_2_fr.md' },
    ch3: { en: '3_chapter_3_en.md', fr: '3_chapter_3_fr.md' },
    proj2: { en: '3_project_3_en.md', fr: '3_project_3_fr.md' },
    ch4: { en: '4_chapter_4_en.md', fr: '4_chapter_4_fr.md' },
    proj3: { en: '4_project_4_en.md', fr: '4_project_4_fr.md' },
    ch5: { en: '5_chapter_5_en.md', fr: '5_chapter_5_fr.md' },
    proj4: { en: '5_project_5_en.md', fr: '5_project_5_fr.md' },
    ch6: { en: '6_chapter_6_en.md', fr: '6_chapter_6_fr.md' },
    proj5: { en: '6_project_6_en.md', fr: '6_project_6_fr.md' }
  };

  // TOC structure: defines the order and sections
  const TOC_STRUCTURE = [
    { type: 'item', labelKey: 'book_summary', fileKey: 'summary' },
    { type: 'section', key: 'book_part0' },
    { type: 'item', labelKey: 'book_ch1', fileKey: 'ch1' },
    { type: 'item', labelKey: 'book_proj0', fileKey: 'proj0' },
    { type: 'section', key: 'book_part1' },
    { type: 'item', labelKey: 'book_ch2', fileKey: 'ch2' },
    { type: 'item', labelKey: 'book_proj1', fileKey: 'proj1' },
    { type: 'item', labelKey: 'book_ch3', fileKey: 'ch3' },
    { type: 'item', labelKey: 'book_proj2', fileKey: 'proj2' },
    { type: 'item', labelKey: 'book_ch4', fileKey: 'ch4' },
    { type: 'item', labelKey: 'book_proj3', fileKey: 'proj3' },
    { type: 'section', key: 'book_part2' },
    { type: 'item', labelKey: 'book_ch5', fileKey: 'ch5' },
    { type: 'item', labelKey: 'book_proj4', fileKey: 'proj4' },
    { type: 'item', labelKey: 'book_ch6', fileKey: 'ch6' },
    { type: 'item', labelKey: 'book_proj5', fileKey: 'proj5' }
  ];

  let currentFileKey = 'summary';
  let currentLang = 'fr';
  let tocListEl;
  let bookContentEl;
  let bookLoadingEl;

  // Full-featured Markdown to HTML renderer using marked.js with fallback
  function renderMarkdown(md) {
    let rawMd = md;

    if (typeof marked !== 'undefined' && marked.parse) {
      try {
        // Configure marked options if needed
        marked.setOptions({
          gfm: true,
          breaks: true
        });
        let html = marked.parse(rawMd);
        
        // Post-process blockquotes for callouts (e.g. > **Critical Insight :**)
        html = html.replace(/<blockquote>\s*<p>\s*<strong>(.*?)<\/strong>/gi, '<blockquote class="callout"><p><strong class="callout-title">$1</strong>');
        
        return html;
      } catch (e) {
        console.warn('Marked parsing error, falling back:', e);
      }
    }

    // Fallback regex renderer if marked is unavailable
    let html = rawMd;
    html = html.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/^[\*\-] (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^-----+$/gm, '<hr>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    html = html.replace(/^(?!<[hHpPuUoOlLtTdDbBqQpP]|<li|<pre|<code|<h[1-6]|<blockquote|<table|<tr|<td|<th)(.+)$/gm, '<p>$1</p>');
    html = html.replace(/<p>\s*<\/p>/g, '');
    return html;
  }

  // Load a book file by key
  async function loadFile(fileKey) {
    if (!bookContentEl) bookContentEl = document.getElementById('bookContent');
    const filePath = BOOK_FILES[fileKey] ? BOOK_FILES[fileKey][currentLang] : null;
    if (!filePath) {
      if (bookContentEl) bookContentEl.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px;">Content not available.</p>';
      return;
    }

    try {
      let response = await fetch('./' + filePath).catch(() => null);
      if (!response || !response.ok) {
        response = await fetch(filePath).catch(() => null);
      }
      if (!response || !response.ok) {
        response = await fetch('/book/' + filePath).catch(() => null);
      }
      if (!response || !response.ok) throw new Error(`HTTP ${response ? response.status : 'Network Error'}`);
      const md = await response.text();
      const html = renderMarkdown(md);
      if (bookContentEl) {
        bookContentEl.innerHTML = html;
      }
      currentFileKey = fileKey;
      updateActiveTocItem(fileKey);
    } catch (err) {
      console.error("Error loading book file:", err);
      if (bookContentEl && !bookContentEl.querySelector('h2')) {
        bookContentEl.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 40px;">Error loading content (${filePath}): ${err.message}</p>`;
      }
    }
  }

  // Build the table of contents
  function buildToc() {
    if (!tocListEl) tocListEl = document.getElementById('tocList');
    if (!tocListEl) return;
    tocListEl.innerHTML = '';

    const getLangDict = () => window.TRANSLATIONS ? (window.TRANSLATIONS[currentLang] || window.TRANSLATIONS.fr || window.TRANSLATIONS.en || {}) : {};
    const langDict = getLangDict();

    TOC_STRUCTURE.forEach(item => {
      const li = document.createElement('li');

      if (item.type === 'section') {
        const div = document.createElement('div');
        div.className = 'toc-link toc-section';
        div.textContent = langDict[item.key] || item.key;
        li.appendChild(div);
      } else {
        const btn = document.createElement('button');
        btn.className = 'toc-link';
        btn.type = 'button';
        btn.textContent = langDict[item.labelKey] || item.labelKey;
        btn.dataset.fileKey = item.fileKey;
        if (item.fileKey === currentFileKey) {
          btn.classList.add('active');
        }
        btn.addEventListener('click', function() {
          loadFile(this.dataset.fileKey);
        });
        li.appendChild(btn);
      }

      tocListEl.appendChild(li);
    });
  }

  // Update active TOC item
  function updateActiveTocItem(fileKey) {
    if (!tocListEl) tocListEl = document.getElementById('tocList');
    if (!tocListEl) return;
    const links = tocListEl.querySelectorAll('.toc-link');
    links.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.fileKey === fileKey) {
        link.classList.add('active');
      }
    });
  }

  // Listen for language changes from the global lang.js
  function setupLanguageListener() {
    const observer = new MutationObserver(() => {
      const newLang = document.documentElement.getAttribute('lang') || 'fr';
      if (newLang !== currentLang) {
        currentLang = newLang;
        buildToc();
        loadFile(currentFileKey);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  function init() {
    tocListEl = document.getElementById('tocList');
    bookContentEl = document.getElementById('bookContent');
    bookLoadingEl = document.getElementById('bookLoading');
    currentLang = document.documentElement.getAttribute('lang') || 'fr';
    buildToc();
    loadFile('summary');
    setupLanguageListener();

    if (!window.TRANSLATIONS) {
      window.addEventListener('load', () => {
        buildToc();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();