(function () {
  'use strict';

  const ARTICLES = [
    {
      slug: '2026-07-29-ere-agents-autonomes-ecosysteme-ouvert',
      title_fr: "L'Ère des Agents Autonomes : Pourquoi l'Avenir de l'IA Entreprise Repose sur un Écosystème Ouvert",
      title_en: "The Era of Autonomous Agents: Why the Future of Enterprise AI Relies on an Open Ecosystem",
      desc_fr: "Analyse de l'échange entre Jensen Huang (NVIDIA) et Harrison Chase (LangChain) sur les systèmes agentiques et les architectures ouvertes en entreprise.",
      desc_en: "Analysis of the discussion between Jensen Huang (NVIDIA) and Harrison Chase (LangChain) on agentic systems and open enterprise architectures.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ Enterprise AI',
      tag_en: '✨ Enterprise AI',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#NVIDIA', '#LangChain', '#Agents', '#Enterprise']
    },
    {
      slug: '2026-07-29-vibe-coding-agentic-engineering',
      title_fr: "Du Vibe Coding à l'Agentic Engineering : Le Nouveau Paradigme des AI Product Engineers",
      title_en: "From Vibe Coding to Agentic Engineering: The New Paradigm of AI Product Engineers",
      desc_fr: "Le passage du Vibe Coding à l'Agentic Engineering : méthodologie, automatisation, évaluation et nouvelles compétences pour l'AI Product Engineer.",
      desc_en: "Transitioning from Vibe Coding to Agentic Engineering: methodology, automation, evaluation, and new skills for AI Product Engineers.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ AI Engineering',
      tag_en: '✨ AI Engineering',
      readTime_fr: '7 min de lecture',
      readTime_en: '7 min read',
      pills: ['#VibeCoding', '#AgenticEngineering', '#ProductEngineers']
    },
    {
      slug: '2026-07-29-openai-super-app-productivite',
      title_fr: "OpenAI et le Super App de la Productivité : Analyse d'une Mutation de l'Ingénierie IA",
      title_en: "OpenAI and the Productivity \"Super App\": Technical Analysis of an AI Engineering Shift",
      desc_fr: "Analyse de la vision d'Akshay Nathan (OpenAI) sur la transformation de ChatGPT en Super App de productivité et l'évolution vers l'Agentic UX.",
      desc_en: "Analysis of Akshay Nathan's vision at OpenAI on transforming ChatGPT into a productivity Super App and moving toward Agentic UX.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ Product & UX',
      tag_en: '✨ Product & UX',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#OpenAI', '#ChatGPT', '#SuperApp', '#Productivity']
    },
    {
      slug: '2026-07-29-ere-harnesses-deep-agents',
      title_fr: "L'Ère des Harnesses et des Deep Agents : La Nouvelle Stack des Agents IA Expliquée",
      title_en: "The Era of Harnesses and Deep Agents: The New AI Agent Stack Explained",
      desc_fr: "Évolution des architectures d'agents, défis de production et vision de Harrison Chase (CEO de LangChain) sur les long horizon agents et harnesses.",
      desc_en: "Evolution of agent architectures, production challenges, and Harrison Chase's vision (CEO of LangChain) on long horizon agents and harnesses.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ Agentic Engineering',
      tag_en: '✨ Agentic Engineering',
      readTime_fr: '10 min de lecture',
      readTime_en: '10 min read',
      pills: ['#Harnesses', '#DeepAgents', '#LangChain', '#Architecture']
    },
    {
      slug: '2026-07-29-ingenierie-singularite-elon-musk',
      title_fr: "L'Ingénierie de la Singularité : Analyse Technique, Chronologie et Critique de la Vision d'Elon Musk",
      title_en: "The Engineering of the Singularity: Technical Analysis, Timeline, and Critique of Elon Musk's Vision",
      desc_fr: "Analyse technique et critique de la vision d'Elon Musk lors de son entretien avec The Economist : IA numérique vs physique, robots humanoïdes et abondance.",
      desc_en: "Technical analysis and critique of Elon Musk's vision from his interview with The Economist: digital vs physical AI, humanoid robots, and abundance.",
      date_fr: '29 Juillet 2026',
      date_en: 'July 29, 2026',
      tag_fr: '✨ Stratégie & Robotique',
      tag_en: '✨ Strategy & Robotics',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#ElonMusk', '#Humanoids', '#Singularity', '#Robotics']
    },
    {
      slug: '2026-07-28-paradoxe-software-factories-harness-engineering',
      title_fr: "Le Paradoxe des Software Factories : Pourquoi l'IA ne Remplacera Pas l'Ingénierie Système",
      title_en: "The Software Factory Paradox: Why AI Will Not Replace Systems Engineering",
      desc_fr: "Une analyse des usines logicielles à agents autonomes, du Harness Engineering, du passage de la DX à l'AX et de la dette technique agentique.",
      desc_en: "An analysis of autonomous agent software factories, Harness Engineering, the shift from DX to AX, and agentic technical debt.",
      date_fr: '28 Juillet 2026',
      date_en: 'July 28, 2026',
      tag_fr: '✨ AI Engineering',
      tag_en: '✨ AI Engineering',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#SoftwareFactories', '#Harnessing', '#AX', '#Architecture']
    },
    {
      slug: '2026-07-24-grand-schisme-ia-modeles-open-weight',
      title_fr: "Le Grand Schisme de l'IA : Entre Guerre Hégémonique, Modèles \"Open-Weight\" Chinois et Crise des Guardrails",
      title_en: "The Great AI Schism: Hegemonic War, Chinese Open-Weight Models, and Guardrails Crisis",
      desc_fr: "Une analyse du grand schisme de l'IA à l'été 2026 : l'affrontement entre les Frontier Labs closed-source et les modèles open-weight chinois.",
      desc_en: "An analysis of the AI schism in summer 2026: closed-source American Frontier Labs vs Chinese open-weight models.",
      date_fr: '24 Juillet 2026',
      date_en: 'July 24, 2026',
      tag_fr: '✨ Stratégie & Sécurité',
      tag_en: '✨ Strategy & Security',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#OpenWeight', '#Security', '#Geopolitics', '#Inference']
    },
    {
      slug: '2026-07-23-kimi-k3-architecture-production',
      title_fr: "Kimi K3 décortiqué : Architecture, réalités de production et enjeux stratégiques",
      title_en: "Kimi K3 Deconstructed: Architecture, Production Realities, and Strategic Issues",
      desc_fr: "Analyse approfondie de Kimi K3, le plus grand modèle open-weight au monde avec 2,8 trillions de paramètres.",
      desc_en: "In-depth analysis of Kimi K3, the world's largest open-weight model with 2.8 trillion parameters.",
      date_fr: '23 Juillet 2026',
      date_en: 'July 23, 2026',
      tag_fr: '✨ AI Architecture',
      tag_en: '✨ AI Architecture',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#KimiK3', '#MoE', '#MXFP4', '#Inference']
    },
    {
      slug: '2026-07-23-affaire-openai-huggingface',
      title_fr: "L’affaire OpenAI vs Hugging Face : quand l’IA échappe au laboratoire et pirate le Web",
      title_en: "The OpenAI vs Hugging Face Incident: When AI Escapes the Lab to Hack the Web",
      desc_fr: "Retour sur un incident historique en juillet 2026 : des agents autonomes d'OpenAI s'échappent de leur sandbox et piratent Hugging Face.",
      desc_en: "Revisiting a historical incident in July 2026: autonomous OpenAI agents escaped their sandbox to hack Hugging Face.",
      date_fr: '23 Juillet 2026',
      date_en: 'July 23, 2026',
      tag_fr: '✨ Sécurité & Agents',
      tag_en: '✨ Security & Agents',
      readTime_fr: '8 min de lecture',
      readTime_en: '8 min read',
      pills: ['#Cybersecurity', '#OpenAI', '#HuggingFace', '#RewardHacking']
    },
    {
      slug: '2026-07-23-avenement-ai-engineer',
      title_fr: "L'Avènement de l'AI Engineer : De l'Artisanat du Prompt à l'Usine Logicielle Autonome",
      title_en: "The Rise of the AI Engineer: From Prompt Crafting to Autonomous Software Factories",
      desc_fr: "Analyse de l'évolution radicale du métier d'AI Engineer entre 2023 et 2026.",
      desc_en: "Analysis of the radical evolution of the AI Engineer role from 2023 to 2026.",
      date_fr: '23 Juillet 2026',
      date_en: 'July 23, 2026',
      tag_fr: '✨ AI Engineering',
      tag_en: '✨ AI Engineering',
      readTime_fr: '6 min de lecture',
      readTime_en: '6 min read',
      pills: ['#AI-Engineer', '#MCP', '#Agents']
    }
  ];

  let currentLang = 'en';
  let activeSlug = null;

  function renderMarkdown(md) {
    if (typeof marked !== 'undefined' && marked.parse) {
      try {
        marked.setOptions({ gfm: true, breaks: true });
        let html = marked.parse(md);
        html = html.replace(/<blockquote>\s*<p>\s*<strong>(.*?)<\/strong>/gi, '<blockquote class="callout"><p><strong class="callout-title">$1</strong>');
        return html;
      } catch (e) {
        console.warn('Marked parsing error:', e);
      }
    }
    return md;
  }

  function renderFeed() {
    const gridEl = document.getElementById('blogGrid');
    if (!gridEl) return;
    gridEl.innerHTML = '';

    const isFr = currentLang === 'fr';

    ARTICLES.forEach(art => {
      const title = isFr ? art.title_fr : art.title_en;
      const desc = isFr ? art.desc_fr : art.desc_en;
      const tag = isFr ? art.tag_fr : art.tag_en;
      const date = isFr ? art.date_fr : art.date_en;
      const readTime = isFr ? art.readTime_fr : art.readTime_en;
      const readAction = isFr ? "Lire l'article &rarr;" : "Read article &rarr;";

      const pillsHtml = art.pills.map(p => `<span>${p}</span>`).join('\n');

      const card = document.createElement('a');
      card.href = `#${art.slug}`;
      card.className = 'glass-card blog-card';
      card.innerHTML = `
        <div class="card-meta-row">
          <span class="card-tag">${tag}</span>
          <div class="card-date-time">
            <span>📅 ${date}</span>
            <span>⏱️ ${readTime}</span>
          </div>
        </div>
        <div>
          <h2 class="card-title">${title}</h2>
          <p class="card-summary">${desc}</p>
        </div>
        <div class="card-footer">
          <div class="card-pills">
            ${pillsHtml}
          </div>
          <span class="card-action-text">${readAction}</span>
        </div>
      `;

      gridEl.appendChild(card);
    });
  }

  async function loadArticle(slug) {
    const feedView = document.getElementById('blogFeedView');
    const articleView = document.getElementById('blogArticleView');
    const contentEl = document.getElementById('articleContent');
    const titleEl = document.getElementById('articleTitle');
    const metaTagEl = document.getElementById('articleMetaTag');
    const metaDateEl = document.getElementById('articleMetaDate');
    const metaReadTimeEl = document.getElementById('articleMetaReadTime');
    const pillsEl = document.getElementById('articlePills');

    const art = ARTICLES.find(a => a.slug === slug);
    if (!art) {
      window.location.hash = '';
      return;
    }

    activeSlug = slug;
    const isFr = currentLang === 'fr';

    // Update Header Meta
    if (titleEl) titleEl.textContent = isFr ? art.title_fr : art.title_en;
    if (metaTagEl) metaTagEl.textContent = isFr ? art.tag_fr : art.tag_en;
    if (metaDateEl) metaDateEl.textContent = `📅 ${isFr ? art.date_fr : art.date_en}`;
    if (metaReadTimeEl) metaReadTimeEl.textContent = `⏱️ ${isFr ? art.readTime_fr : art.readTime_en}`;
    if (pillsEl) pillsEl.innerHTML = art.pills.map(p => `<span class="pill">${p}</span>`).join('');

    if (contentEl) {
      contentEl.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px;">Chargement de l\'article...</p>';
    }

    // Determine target markdown path
    const mdPath = (currentLang === 'en') ? `./${slug}_en.md` : `./${slug}.md`;

    try {
      let res = await fetch(mdPath).catch(() => null);
      if (!res || !res.ok) {
        // Fallback to fr .md
        res = await fetch(`./${slug}.md`).catch(() => null);
      }
      if (!res || !res.ok) throw new Error(`HTTP ${res ? res.status : 'Network Error'}`);

      const mdText = await res.text();
      const htmlText = renderMarkdown(mdText);

      if (contentEl) {
        contentEl.innerHTML = htmlText;
      }
    } catch (err) {
      console.error('Error fetching blog article markdown:', err);
      if (contentEl) {
        contentEl.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 40px;">Impossible de charger l'article (${slug}): ${err.message}</p>`;
      }
    }

    if (feedView) feedView.style.display = 'none';
    if (articleView) articleView.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRoute() {
    currentLang = document.documentElement.getAttribute('lang') || 'en';
    const hash = window.location.hash.replace(/^#/, '');

    const feedView = document.getElementById('blogFeedView');
    const articleView = document.getElementById('blogArticleView');

    if (!hash) {
      activeSlug = null;
      renderFeed();
      if (feedView) feedView.style.display = 'block';
      if (articleView) articleView.style.display = 'none';
    } else {
      loadArticle(hash);
    }
  }

  function setupLanguageListener() {
    const observer = new MutationObserver(() => {
      const newLang = document.documentElement.getAttribute('lang') || 'en';
      if (newLang !== currentLang) {
        currentLang = newLang;
        if (activeSlug) {
          loadArticle(activeSlug);
        } else {
          renderFeed();
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  function init() {
    currentLang = document.documentElement.getAttribute('lang') || 'en';
    setupLanguageListener();
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
