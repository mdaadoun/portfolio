(function () {
  'use strict';

  // Book file mapping: key -> { en: path, fr: path }
  const BOOK_FILES = {
    ch1: { en: '1_chapter_1_en.md', fr: '1_chapter_1_fr.md' },
    proj0: { en: '1_project_1_en.md', fr: '1_project_1_fr.md' },
    ch2: { en: '2_chapter_2_en.md', fr: '2_chapter_2_fr.md' },
    proj1: { en: '2_project_2_en.md', fr: '2_project_2_fr.md' }
  };

  // TOC structure: defines the order and sections
  const TOC_STRUCTURE = [
    { type: 'section', key: 'book_part0' },
    { type: 'item', labelKey: 'book_ch1', fileKey: 'ch1' },
    { type: 'item', labelKey: 'book_proj0', fileKey: 'proj0' },
    { type: 'section', key: 'book_part1' },
    { type: 'item', labelKey: 'book_ch2', fileKey: 'ch2' },
    { type: 'item', labelKey: 'book_proj1', fileKey: 'proj1' }
  ];

  let currentFileKey = 'ch1';
  let currentLang = 'en';
  let tocListEl = document.getElementById('tocList');
  let bookContentEl = document.getElementById('bookContent');
  let bookLoadingEl = document.getElementById('bookLoading');

  // Simple Markdown to HTML renderer
  function renderMarkdown(md) {
    let html = md;

    // Remove the first line if it's a title (already shown in TOC context)
    html = html.replace(/^# .+\n/, '');

    // Headers
    html = html.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Code blocks (``` ... ```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

    // Blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // Unordered lists
    html = html.replace(/^[\*\-] (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Horizontal rules
    html = html.replace(/^-----+$/gm, '<hr>');

    // Tables (basic support)
    html = html.replace(/\|(.+)\|/g, function(match) {
      if (match.includes('---')) return '';
      return '<td>' + match.slice(1, -1).split('|').map(c => c.trim()).join('</td><td>') + '</td>';
    });

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Paragraphs: wrap text blocks not already in HTML tags
    html = html.replace(/^(?!<[hHpPuUoOlLtTdDbBqQpP]|<li|<pre|<code|<h[1-6]|<blockquote|<table|<tr|<td|<th)(.+)$/gm, '<p>$1</p>');

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');

    // Fix consecutive blockquotes
    html = html.replace(/<\/blockquote>\n<blockquote>/g, '<br>');

    return html;
  }

  // Load a book file by key
  async function loadFile(fileKey) {
    const filePath = BOOK_FILES[fileKey] ? BOOK_FILES[fileKey][currentLang] : null;
    if (!filePath) {
      bookContentEl.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px;">Content not available.</p>';
      return;
    }

    // Show loading
    bookContentEl.innerHTML = '<div class="book-loading"><div class="spinner"></div><span>Loading...</span></div>';

    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const md = await response.text();
      const html = renderMarkdown(md);
      bookContentEl.innerHTML = html;
      currentFileKey = fileKey;
      updateActiveTocItem(fileKey);
    } catch (err) {
      bookContentEl.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 40px;">Error loading content: ${err.message}</p>`;
    }
  }

  // Build the table of contents
  function buildToc() {
    tocListEl.innerHTML = '';
    TOC_STRUCTURE.forEach(item => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'toc-link';

      if (item.type === 'section') {
        btn.classList.add('toc-section');
        // Get translated label
        const langDict = window.TRANSLATIONS ? (window.TRANSLATIONS[currentLang] || window.TRANSLATIONS.en) : {};
        btn.textContent = langDict[item.key] || item.key;
        btn.disabled = true;
      } else {
        const langDict = window.TRANSLATIONS ? (window.TRANSLATIONS[currentLang] || window.TRANSLATIONS.en) : {};
        btn.textContent = langDict[item.labelKey] || item.labelKey;
        btn.dataset.fileKey = item.fileKey;
        btn.addEventListener('click', function() {
          loadFile(this.dataset.fileKey);
        });
      }

      li.appendChild(btn);
      tocListEl.appendChild(li);
    });
  }

  // Update active TOC item
  function updateActiveTocItem(fileKey) {
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
    // The lang.js dispatches a custom event or we can observe the html lang attribute
    const observer = new MutationObserver(() => {
      const newLang = document.documentElement.getAttribute('lang') || 'en';
      if (newLang !== currentLang) {
        currentLang = newLang;
        buildToc();
        // Reload current file in new language
        loadFile(currentFileKey);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    currentLang = document.documentElement.getAttribute('lang') || 'en';
    buildToc();
    loadFile('ch1');
    setupLanguageListener();
  });
})();