(function () {
  'use strict';

  const KNOWLEDGE_BASE = [
    {
      id: "doc_1_p1",
      title: "Architecture RAG & Hybrid Search Specs v2.4",
      content: "Hybrid Search combines BM25 lexical keyword matching with vector embedding cosine similarity using Reciprocal Rank Fusion (RRF). FlashRank cross-encoder reranking refines top-K candidate chunks before passing to LLM context.",
      bm25Score: 0.89,
      vectorScore: 0.94,
      rerankScore: 0.97
    },
    {
      id: "doc_2_p3",
      title: "FastAPI & Pydantic V2 Security Guidelines",
      content: "Pydantic V2 enforces strict schema validation at API boundaries. Input fields use Field(..., min_length=1, max_length=2000) and regex sanitizers to prevent injection payloads from reaching internal business logic.",
      bm25Score: 0.85,
      vectorScore: 0.91,
      rerankScore: 0.95
    },
    {
      id: "doc_3_p2",
      title: "FinOps Telemetry & Multi-LLM Pricing Specs",
      content: "GPT-4o API costs are calculated at $2.50 / 1M prompt tokens and $10.00 / 1M completion tokens. Post-stream token counters calculate exact USD micro-cents per session.",
      bm25Score: 0.82,
      vectorScore: 0.88,
      rerankScore: 0.93
    },
    {
      id: "doc_4_p1",
      title: "Defensive Prompt Injection & XML Framing Policy",
      content: "Untrusted user text is encapsulated inside <untrusted_user_input> XML tags. The system prompt instructs the model to parse string content strictly as data, neutralizing jailbreak attempts.",
      bm25Score: 0.88,
      vectorScore: 0.93,
      rerankScore: 0.96
    }
  ];

  const PRESET_RESPONSES = {
    hybrid: {
      query: "How does hybrid search combine BM25 and vector embeddings?",
      answer: "Hybrid Search combines lexical term matching (**BM25**) with dense semantic embedding similarity using **Reciprocal Rank Fusion (RRF)**. Once candidates are retrieved, a cross-encoder (**FlashRank**) re-ranks the chunks to select only the highest context relevance items before injecting them into the prompt.",
      citations: [
        { label: "Doc 1: Hybrid Search Specs #P1", chunkId: "doc_1_p1" }
      ],
      chunks: [KNOWLEDGE_BASE[0], KNOWLEDGE_BASE[1]],
      latency: "44 ms",
      confidence: "98.4%",
      cost: "$0.00014"
    },
    pydantic: {
      query: "What are the rules for strict Pydantic V2 input validation?",
      answer: "Pydantic V2 enforces 100% strict type safety and schema validation at application boundaries. All incoming payload fields pass through explicit length constraints and regex sanitization to block malformed inputs prior to downstream execution.",
      citations: [
        { label: "Doc 2: Pydantic Security #P3", chunkId: "doc_2_p3" }
      ],
      chunks: [KNOWLEDGE_BASE[1]],
      latency: "38 ms",
      confidence: "97.8%",
      cost: "$0.00011"
    },
    finops: {
      query: "What is the token cost policy for GPT-4o?",
      answer: "GPT-4o requests are monitored in real-time and billed at **$2.50 per 1M prompt tokens** and **$10.00 per 1M completion tokens**. Telemetry logs stream exact token counts post-completion to maintain session-level FinOps visibility.",
      citations: [
        { label: "Doc 3: FinOps Specs #P2", chunkId: "doc_3_p2" }
      ],
      chunks: [KNOWLEDGE_BASE[2]],
      latency: "41 ms",
      confidence: "99.1%",
      cost: "$0.00009"
    },
    injection: {
      query: "What happens if a user prompt contains a prompt injection attack?",
      answer: "User input is isolated inside `<untrusted_user_input>` XML tags and evaluated by defensive regex patterns. The system instructions explicitly separate data instructions from system rules, preventing prompt overrides.",
      citations: [
        { label: "Doc 4: Prompt Defense #P1", chunkId: "doc_4_p1" }
      ],
      chunks: [KNOWLEDGE_BASE[3]],
      latency: "35 ms",
      confidence: "98.9%",
      cost: "$0.00012"
    },
    unknown: {
      query: "What is the capital of France?",
      answer: "⚠️ **Grounding Filter Triggered:** I cannot answer this question based on the provided document corpus. The knowledge base contains only technical specifications on RAG, Pydantic, FinOps, and Security.",
      citations: [],
      chunks: [],
      latency: "18 ms",
      confidence: "0.0% (Rejected)",
      cost: "$0.00000"
    }
  };

  function executeRagQuery(presetKey) {
    let data;
    if (presetKey && PRESET_RESPONSES[presetKey]) {
      data = PRESET_RESPONSES[presetKey];
      document.getElementById('ragQueryInput').value = data.query;
    } else {
      const customQuery = document.getElementById('ragQueryInput').value.trim();
      if (!customQuery) return;
      const lower = customQuery.toLowerCase();
      if (lower.includes('hybrid') || lower.includes('bm25') || lower.includes('search')) {
        data = PRESET_RESPONSES.hybrid;
      } else if (lower.includes('pydantic') || lower.includes('validation')) {
        data = PRESET_RESPONSES.pydantic;
      } else if (lower.includes('cost') || lower.includes('gpt-4') || lower.includes('token')) {
        data = PRESET_RESPONSES.finops;
      } else if (lower.includes('injection') || lower.includes('attack') || lower.includes('xml')) {
        data = PRESET_RESPONSES.injection;
      } else {
        data = PRESET_RESPONSES.unknown;
      }
    }

    // Render Chunks
    const chunksContainer = document.getElementById('retrievedChunksContainer');
    if (chunksContainer) {
      chunksContainer.innerHTML = '';
      if (data.chunks.length === 0) {
        chunksContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 12px;">Aucun chunk pertinent extrait (Score < Seuil minimum).</div>';
      } else {
        data.chunks.forEach(c => {
          const div = document.createElement('div');
          div.className = 'retrieved-chunk-item';
          div.innerHTML = `
            <div class="retrieved-chunk-header">
              <span class="chunk-source-tag">${escapeHtml(c.title)}</span>
              <div class="scores-group">
                <span class="score-badge">BM25: ${c.bm25Score}</span>
                <span class="score-badge">Vector: ${c.vectorScore}</span>
                <span class="score-badge highlight">Rerank: ${c.rerankScore}</span>
              </div>
            </div>
            <div style="font-size: 0.84rem; color: var(--text-main); line-height: 1.4;">${escapeHtml(c.content)}</div>
          `;
          chunksContainer.appendChild(div);
        });
      }
    }

    // Render Answer
    const answerEl = document.getElementById('ragAnswerText');
    if (answerEl) {
      let formattedHtml = data.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (data.citations.length > 0) {
        formattedHtml += '<div style="margin-top: 12px; font-weight: 600; font-size: 0.85rem; color: var(--text-muted);">Sources Cétées :</div><div style="margin-top: 6px;">';
        data.citations.forEach(cit => {
          formattedHtml += `<span class="citation-chip" title="Source: ${cit.chunkId}">📍 ${escapeHtml(cit.label)}</span>`;
        });
        formattedHtml += '</div>';
      }
      answerEl.innerHTML = formattedHtml;
    }

    // Render Telemetry
    document.getElementById('telLatency').textContent = data.latency;
    document.getElementById('telConfidence').textContent = data.confidence;
    document.getElementById('telTopK').textContent = data.chunks.length.toString();
    document.getElementById('telCost').textContent = data.cost;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function init() {
    const btnSubmit = document.getElementById('btnSubmitQuery');
    const inputQuery = document.getElementById('ragQueryInput');

    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => executeRagQuery());
    }

    if (inputQuery) {
      inputQuery.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          executeRagQuery();
        }
      });
    }

    const presetBtns = document.querySelectorAll('.preset-pill-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const key = this.dataset.preset;
        executeRagQuery(key);
      });
    });

    executeRagQuery('hybrid');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
