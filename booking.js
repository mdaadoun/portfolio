// portfolio-static/booking.js
// Portfolio Gateway Frontend: Adaptive modal overlay (Démo vs Pilote 48h DPGF), dynamic slots, honeypot & submission.

const DEFAULT_API_URL = typeof window !== 'undefined' && window.PAX_API_URL
  ? window.PAX_API_URL
  : (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:8787'
      : 'https://api-paxfabrica.a.run.app');

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MiB

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
  if (!values.name || values.name.trim().length < 2) {
    errors.push('Veuillez renseigner votre nom complet.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email.trim())) {
    errors.push('Veuillez renseigner une adresse e-mail valide.');
  }
  if (mode === 'demo' && !values.slotId) {
    errors.push('Veuillez sélectionner un créneau de rendez-vous.');
  }
  if (mode === 'pilote' && !file && !values.slotId) {
    errors.push('Veuillez déposer votre fichier (PDF) ou choisir un créneau.');
  }
  if (file) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.push('Le fichier PDF dépasse la taille maximale de 5 Mo.');
    }
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      errors.push('Seuls les fichiers .pdf sont acceptés.');
    }
  }
  return { isValid: errors.length === 0, errors };
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(undefined);
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result;
      resolve(typeof res === 'string' ? res.split(',')[1] : '');
    };
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

export function initBookingGateway(root = document) {
  const overlay = root.getElementById('gatewayModalOverlay');
  const backdrop = root.getElementById('gatewayModalBackdrop');
  const btnClose = root.getElementById('btnCloseGatewayModal');
  const form = root.getElementById('gatewayBookingForm');
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

  const modeBtnDemo = root.getElementById('modeBtnDemo');
  const modeBtnPilote = root.getElementById('modeBtnPilote');
  const modeBtnDeploy = root.getElementById('modeBtnDeploy');
  const modeBtnContact = root.getElementById('modeBtnContact');

  const btnSelectDemo = root.getElementById('btnSelectModeDemo');
  const btnSelectPilote = root.getElementById('btnSelectModePilote');
  const btnSelectDeploy = root.getElementById('btnSelectModeDeploy');
  const btnSelectContact = root.getElementById('btnSelectModeContact');

  let currentMode = 'demo';
  let turnstileToken = 'mock-valid-token';
  let selectedFile = null;

  if (typeof window !== 'undefined') {
    window.onTurnstileSuccess = (t) => { turnstileToken = t; };
  }

  function setMode(mode) {
    currentMode = mode;
    if (modeBtnDemo) modeBtnDemo.classList.toggle('active', mode === 'demo');
    if (modeBtnPilote) modeBtnPilote.classList.toggle('active', mode === 'pilote');
    if (modeBtnDeploy) modeBtnDeploy.classList.toggle('active', mode === 'deploy');
    if (modeBtnContact) modeBtnContact.classList.toggle('active', mode === 'contact');

    if (mode === 'demo') {
      if (modalTitle) modalTitle.textContent = '0. Démo Directe en Visio (15 min)';
      if (modalSubtitle) modalSubtitle.textContent = 'Découvrez l\'outil en direct sur un DPGF type et posez vos questions techniques ou métier.';
      if (slotLabel) slotLabel.textContent = '1. Créneau de démo disponible *';
      if (fileLabel) fileLabel.textContent = '5. Joindre un DPGF ou CCTP exemple (Optionnel, max 5 Mo)';
      if (messageLabel) messageLabel.textContent = '6. Questions ou points particuliers à aborder (Optionnel)';
      if (submitBtn) submitBtn.innerHTML = '<span>📅 Valider ma réservation de Démo (15 min)</span>';
    } else if (mode === 'pilote') {
      if (modalTitle) modalTitle.textContent = '1. Lancer votre Pilote Flash 48 h (490 € net)';
      if (modalSubtitle) modalSubtitle.textContent = 'Déposez votre DPGF ou CCTP. Livraison sous 48h du fichier Excel structuré et du rapport d\'anomalies (100% déductible).';
      if (fileLabel) fileLabel.textContent = '1. Joindre votre DPGF ou CCTP (PDF) pour le Pilote 48h *';
      if (slotLabel) slotLabel.textContent = '5. Créneau d\'échange / restitution vidéo (Optionnel)';
      if (messageLabel) messageLabel.textContent = '6. Précisions sur votre dossier (Optionnel)';
      if (submitBtn) submitBtn.innerHTML = '<span>📤 Transmettre mon fichier &amp; Lancer le Pilote 48h</span>';
    } else if (mode === 'deploy') {
      if (modalTitle) modalTitle.textContent = '2. Mise en Production de Votre Outil Métier';
      if (modalSubtitle) modalSubtitle.textContent = 'Déploiement de votre espace web privé dédié (2 990 € net — Pilote 490 € déduit — 1 an de service inclus).';
      if (slotLabel) slotLabel.textContent = '1. Créneau d\'échange pour cadrage technique (Optionnel)';
      if (fileLabel) fileLabel.textContent = '5. Joindre un cahier des charges ou trame type (Optionnel, max 5 Mo)';
      if (messageLabel) messageLabel.textContent = '6. Précisions sur vos volumes ou vos besoins d\'intégration';
      if (submitBtn) submitBtn.innerHTML = '<span>💻 Échanger pour déployer l\'Outil Métier</span>';
    } else if (mode === 'contact') {
      if (modalTitle) modalTitle.textContent = '3. Extensions & Automatisation Sur-Mesure';
      if (modalSubtitle) modalSubtitle.textContent = 'Recherche dans les archives CCTP/DTU, connecteurs logiciels, workflows sur-mesure.';
      if (slotLabel) slotLabel.textContent = '1. Créneau d\'échange souhaité (Optionnel)';
      if (fileLabel) fileLabel.textContent = '5. Joindre un document exemple / spécifications (Optionnel, max 5 Mo)';
      if (messageLabel) messageLabel.textContent = '6. Décrivez vos besoins d\'automatisation ou d\'extensions';
      if (submitBtn) submitBtn.innerHTML = '<span>💬 Envoyer ma demande de contact / devis</span>';
    }
  }

  function openModal(mode = 'demo') {
    setMode(mode);
    if (overlay) {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.overflow = 'hidden';
      }
    }
  }

  function closeModal() {
    if (overlay) {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.overflow = '';
      }
    }
  }

  if (btnSelectDemo) btnSelectDemo.addEventListener('click', () => openModal('demo'));
  if (btnSelectPilote) btnSelectPilote.addEventListener('click', () => openModal('pilote'));
  if (btnSelectDeploy) btnSelectDeploy.addEventListener('click', () => openModal('deploy'));
  if (btnSelectContact) btnSelectContact.addEventListener('click', () => openModal('contact'));

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  if (modeBtnDemo) modeBtnDemo.addEventListener('click', () => setMode('demo'));
  if (modeBtnPilote) modeBtnPilote.addEventListener('click', () => setMode('pilote'));
  if (modeBtnDeploy) modeBtnDeploy.addEventListener('click', () => setMode('deploy'));
  if (modeBtnContact) modeBtnContact.addEventListener('click', () => setMode('contact'));

  if (typeof root.addEventListener === 'function') {
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay?.classList.contains('active')) closeModal();
    });
  }

  // Handle URL confirmation params
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    const confirmToken = params.get('confirm_token') || params.get('token');
    if (confirmToken && feedback) {
      openModal('demo');
      feedback.className = 'gateway-feedback-banner pending';
      feedback.textContent = 'Validation de votre confirmation en cours...';
      feedback.style.display = 'block';
      confirmBookingByToken(DEFAULT_API_URL, confirmToken)
        .then((res) => {
          feedback.className = 'gateway-feedback-banner success';
          feedback.textContent = `✅ ${res.message}`;
        })
        .catch((err) => {
          feedback.className = 'gateway-feedback-banner error';
          feedback.textContent = `❌ ${err.message}`;
        });
    }
  }

  // Load slots
  if (slotSelect) {
    fetchAvailableSlots()
      .then((slots) => {
        if (!slots.length) {
          slotSelect.innerHTML = '<option value="">Aucun créneau disponible</option>';
          return;
        }
        slotSelect.innerHTML = '<option value="">-- Sélectionnez un créneau --</option>' +
          slots.map((s) => `<option value="${s.slotId}">${formatSlotLabel(s)}</option>`).join('');
      })
      .catch(() => {
        slotSelect.innerHTML = '<option value="">Créneaux indisponibles</option>';
      });
  }

  // File picker
  if (fileInput && fileDisplay) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        selectedFile = file;
        fileDisplay.style.display = 'flex';
        fileDisplay.textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} Ko)`;
      } else {
        selectedFile = null;
        fileDisplay.style.display = 'none';
      }
    });
  }

  // Submission
  if (form && feedback && submitBtn) {
    form.addEventListener('submit', async (e) => {
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

      submitBtn.disabled = true;
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
        submitBtn.disabled = false;
      }
    });
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initBookingGateway(document));
  } else {
    initBookingGateway(document);
  }
}
