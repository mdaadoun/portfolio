// portfolio-static/booking.js: Adaptive modal overlay, dynamic slots, honeypot & submission.

const DEFAULT_API_URL = typeof window !== 'undefined' && window.PAX_API_URL
  ? window.PAX_API_URL
  : (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? `${window.location.protocol}//${window.location.hostname}:8787`
      : 'https://api-paxfabrica.a.run.app');

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MiB
export const ALLOWED_EXTENSIONS = ['.pdf', '.xlsx', '.xls', '.csv', '.ods'];

export function formatSlotLabel(slot) {
  if (!slot || !slot.startTime) return 'Créneau indéfini';
  try {
    const d = new Date(slot.startTime);
    const dateStr = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
    const timeStr = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} à ${timeStr}`;
  } catch {
    return slot.startTime;
  }
}

export async function fetchAvailableSlots(apiBaseUrl = DEFAULT_API_URL, fetchImpl = fetch) {
  const res = await fetchImpl(`${apiBaseUrl}/api/v1/creneaux`);
  if (!res.ok) throw new Error(`Erreur serveur (${res.status}) lors du chargement des créneaux.`);
  const data = await res.json();
  return data.slots || [];
}

export function validateBookingForm(values, file, mode = 'demo') {
  const errors = [];
  if (!values.name || values.name.trim().length < 2) errors.push('Veuillez renseigner votre nom complet.');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email.trim())) errors.push('Veuillez renseigner une adresse e-mail valide.');
  if (mode === 'demo' && !values.slotId) errors.push('Veuillez sélectionner un créneau de rendez-vous.');
  if (mode === 'pilote' && !file) errors.push('Veuillez déposer votre fichier (PDF ou Excel) pour le Pilote 48h.');
  if (file) {
    if (file.size > MAX_FILE_SIZE_BYTES) errors.push('Le fichier dépasse la taille maximale de 5 Mo.');
    const isAllowed = ALLOWED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!isAllowed) errors.push('Seuls les fichiers PDF et Excel (.pdf, .xlsx, .xls, .csv, .ods) sont acceptés.');
  }
  return { isValid: errors.length === 0, errors };
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(undefined);
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result.split(',')[1] : '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function submitBooking(apiBaseUrl = DEFAULT_API_URL, payload = {}, fetchImpl = fetch) {
  const res = await fetchImpl(`${apiBaseUrl}/api/v1/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur lors de la réservation.');
  return data;
}

export async function confirmBookingByToken(apiBaseUrl = DEFAULT_API_URL, token = '', fetchImpl = fetch) {
  const res = await fetchImpl(`${apiBaseUrl}/api/v1/bookings/confirm?token=${encodeURIComponent(token)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Validation de confirmation échouée.');
  return data;
}

const MODE_CONFIGS = {
  demo: {
    title: '0. Démo Directe en Visio (15 min)',
    subtitle: 'Découvrez l\'outil en direct sur un DPGF type et posez vos questions techniques ou métier.',
    showSlot: true,
    slotLabel: '1. Créneau de démo disponible *',
    showDropzone: false,
    messageLabel: '5. Un message à nous faire parvenir ? (Optionnel)',
    submitHtml: '<span>📅 Valider ma réservation de Démo (15 min)</span>',
  },
  pilote: {
    title: '1. Lancer votre Pilote Flash 48 h (490 € net)',
    subtitle: 'Déposez votre DPGF ou CCTP. Livraison sous 48h du fichier Excel structuré et du rapport d\'anomalies (100% déductible).',
    showSlot: false,
    showDropzone: true,
    fileLabel: '5. Joindre votre premier DPGF ou CCTP (PDF ou Excel, max 5 Mo) *',
    messageLabel: '6. Précisions sur votre dossier (Optionnel)',
    submitHtml: '<span>📤 Transmettre mon fichier &amp; Lancer le Pilote 48h</span>',
  },
  deploy: {
    title: '2. Mise en Production de Votre Outil Métier',
    subtitle: 'Déploiement de votre espace web privé dédié (2 990 € net — Pilote 490 € déduit — 1 an de service inclus).',
    showSlot: false,
    showDropzone: true,
    fileLabel: '5. Joindre un cahier des charges ou trame type (PDF ou Excel, max 5 Mo)',
    messageLabel: '6. Précisions sur vos volumes ou vos besoins d\'intégration (Optionnel)',
    submitHtml: '<span>💻 Échanger pour déployer l\'Outil Métier</span>',
  },
  contact: {
    title: '3. Extensions & Automatisation Sur-Mesure',
    subtitle: 'Recherche dans les archives CCTP/DTU, connecteurs logiciels, workflows sur-mesure.',
    showSlot: false,
    showDropzone: false,
    messageLabel: '5. Décrivez vos besoins d\'automatisation ou d\'extensions (Optionnel)',
    submitHtml: '<span>💬 Envoyer ma demande de contact / devis</span>',
  },
};

export function initBookingGateway(root = document) {
  const overlay = root.getElementById('gatewayModalOverlay');
  const backdrop = root.getElementById('gatewayModalBackdrop');
  const btnClose = root.getElementById('btnCloseGatewayModal');
  const form = root.getElementById('gatewayBookingForm');
  const slotGroup = root.getElementById('gatewaySlotGroup');
  const dropzoneGroup = root.getElementById('gatewayDropzoneGroup');
  const slotSelect = root.getElementById('gatewaySlotSelect');
  const slotLabel = root.getElementById('gatewaySlotLabel');
  const fileLabel = root.getElementById('gatewayFileLabel');
  const nameInput = root.getElementById('gatewayNameInput');
  const emailInput = root.getElementById('gatewayEmailInput');
  const companyInput = root.getElementById('gatewayCompanyInput');
  const messageInput = root.getElementById('gatewayMessageInput');
  const messageLabel = root.getElementById('gatewayMessageLabel');
  const modalTitle = root.getElementById('gatewayModalTitle');
  const modalSubtitle = root.getElementById('gatewayModalSubtitle');
  const honeypotInput = root.querySelector('input[name="website_url"]');
  const feedback = root.getElementById('gatewayFeedback');
  const submitBtn = root.getElementById('btnSubmitGatewayBooking');
  const fileInput = root.getElementById('gatewayPdfInput');
  const fileDisplay = root.getElementById('gatewayFileSelectedDisplay');

  const modeBtns = {
    demo: root.getElementById('modeBtnDemo'),
    pilote: root.getElementById('modeBtnPilote'),
    deploy: root.getElementById('modeBtnDeploy'),
    contact: root.getElementById('modeBtnContact'),
  };

  let currentMode = 'demo';
  let turnstileToken = 'mock-valid-token';
  let selectedFile = null;

  if (typeof window !== 'undefined') {
    window.onTurnstileSuccess = (t) => { turnstileToken = t; };
  }

  function setMode(mode) {
    currentMode = mode;
    const cfg = MODE_CONFIGS[mode] || MODE_CONFIGS.demo;
    Object.entries(modeBtns).forEach(([k, btn]) => btn?.classList.toggle('active', k === mode));
    if (modalTitle) modalTitle.textContent = cfg.title;
    if (modalSubtitle) modalSubtitle.textContent = cfg.subtitle;
    if (slotGroup) slotGroup.style.display = cfg.showSlot ? '' : 'none';
    if (slotLabel && cfg.slotLabel) slotLabel.textContent = cfg.slotLabel;
    if (dropzoneGroup) dropzoneGroup.style.display = cfg.showDropzone ? '' : 'none';
    if (fileLabel && cfg.fileLabel) fileLabel.textContent = cfg.fileLabel;
    if (messageLabel) messageLabel.textContent = cfg.messageLabel;
    if (submitBtn) submitBtn.innerHTML = cfg.submitHtml;
  }

  const openModal = (mode = 'demo') => {
    setMode(mode);
    overlay?.classList.add('active');
    overlay?.setAttribute('aria-hidden', 'false');
    if (typeof document !== 'undefined' && document.body) document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    overlay?.classList.remove('active');
    overlay?.setAttribute('aria-hidden', 'true');
    if (typeof document !== 'undefined' && document.body) document.body.style.overflow = '';
  };

  ['Demo', 'Pilote', 'Deploy', 'Contact'].forEach((m) => {
    root.getElementById(`btnSelectMode${m}`)?.addEventListener('click', () => openModal(m.toLowerCase()));
    modeBtns[m.toLowerCase()]?.addEventListener('click', () => setMode(m.toLowerCase()));
  });
  btnClose?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  root.addEventListener?.('keydown', (e) => e.key === 'Escape' && overlay?.classList.contains('active') && closeModal());

  if (slotSelect) {
    fetchAvailableSlots().then((slots) => {
      slotSelect.innerHTML = slots.length
        ? '<option value="">-- Sélectionnez un créneau --</option>' + slots.map((s) => `<option value="${s.slotId}">${formatSlotLabel(s)}</option>`).join('')
        : '<option value="">Aucun créneau disponible</option>';
    }).catch(() => { slotSelect.innerHTML = '<option value="">Créneaux indisponibles</option>'; });
  }

  fileInput?.addEventListener('change', (e) => {
    selectedFile = e.target.files?.[0] || null;
    if (fileDisplay) {
      fileDisplay.style.display = selectedFile ? 'flex' : 'none';
      fileDisplay.textContent = selectedFile ? `📄 ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} Ko)` : '';
    }
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = {
      mode: currentMode,
      slotId: slotSelect?.value || '',
      name: nameInput?.value || '',
      email: emailInput?.value || '',
      company: companyInput?.value || '',
      message: messageInput?.value || '',
      website_url: honeypotInput?.value || '',
      cf_turnstile_response: turnstileToken,
    };
    const validation = validateBookingForm(values, selectedFile, currentMode);
    if (!validation.isValid) {
      feedback.className = 'gateway-feedback-banner error';
      feedback.innerHTML = `⚠️ ${validation.errors.join('<br>')}`;
      feedback.style.display = 'block';
      return;
    }
    if (submitBtn) submitBtn.disabled = true;
    feedback.className = 'gateway-feedback-banner pending';
    feedback.textContent = 'Traitement de votre demande en cours...';
    feedback.style.display = 'block';
    try {
      if (selectedFile) {
        values.fileBase64 = await fileToBase64(selectedFile);
        values.fileName = selectedFile.name;
      }
      const result = await submitBooking(DEFAULT_API_URL, values);
      feedback.className = 'gateway-feedback-banner success';
      feedback.innerHTML = `🎉 <strong>Demande enregistrée !</strong> ${result.message}`;
      form.reset();
      if (fileDisplay) fileDisplay.style.display = 'none';
    } catch (err) {
      feedback.className = 'gateway-feedback-banner error';
      feedback.textContent = `❌ ${err.message}`;
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initBookingGateway(document));
  } else {
    initBookingGateway(document);
  }
}
