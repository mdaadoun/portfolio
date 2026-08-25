// portfolio-static/booking.js
// Portfolio Gateway Frontend Client: Dynamic slots fetching, honeypot, Turnstile and booking submission.

const DEFAULT_API_URL = typeof window !== 'undefined' && window.PAX_API_URL
  ? window.PAX_API_URL
  : (typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:8787'
      : 'https://api-paxfabrica.a.run.app');

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MiB

/**
 * Format a slot ISO start date to human-readable French label.
 */
export function formatSlotLabel(slot) {
  if (!slot || !slot.startTime) return 'Créneau indéfini';
  try {
    const d = new Date(slot.startTime);
    const dateStr = d.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    const timeStr = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} à ${timeStr}`;
  } catch {
    return slot.startTime;
  }
}

/**
 * Fetch available slots from backend.
 */
export async function fetchAvailableSlots(apiBaseUrl = DEFAULT_API_URL, fetchImpl = fetch) {
  const res = await fetchImpl(`${apiBaseUrl}/api/v1/creneaux`);
  if (!res.ok) throw new Error(`Erreur serveur (${res.status}) lors du chargement des créneaux.`);
  const data = await res.json();
  return data.slots || [];
}

/**
 * Validates booking form fields client-side.
 */
export function validateBookingForm(values, file) {
  const errors = [];
  if (!values.name || values.name.trim().length < 2) {
    errors.push('Veuillez renseigner votre nom complet.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email.trim())) {
    errors.push('Veuillez renseigner une adresse e-mail valide.');
  }
  if (!values.slotId) {
    errors.push('Veuillez sélectionner un créneau de rendez-vous.');
  }
  if (file) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.push('Le fichier PDF dépasse la taille maximale autorisée de 5 Mo.');
    }
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      errors.push('Seuls les fichiers au format .pdf sont acceptés.');
    }
  }
  return { isValid: errors.length === 0, errors };
}

/**
 * Convert a File or Blob to Base64 string.
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(undefined);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = typeof result === 'string' ? result.split(',')[1] : '';
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Submit booking request to backend API.
 */
export async function submitBooking(apiBaseUrl = DEFAULT_API_URL, payload = {}, fetchImpl = fetch) {
  const res = await fetchImpl(`${apiBaseUrl}/api/v1/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erreur lors de la réservation.');
  }
  return data;
}

/**
 * Confirm booking token Double Opt-In.
 */
export async function confirmBookingByToken(apiBaseUrl = DEFAULT_API_URL, token = '', fetchImpl = fetch) {
  const res = await fetchImpl(`${apiBaseUrl}/api/v1/bookings/confirm?token=${encodeURIComponent(token)}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Validation de confirmation échouée.');
  }
  return data;
}

/**
 * DOM Binding and initialization on page load.
 */
export function initBookingGateway(root = document) {
  const form = root.getElementById('gatewayBookingForm');
  const slotSelect = root.getElementById('gatewaySlotSelect');
  const nameInput = root.getElementById('gatewayNameInput');
  const emailInput = root.getElementById('gatewayEmailInput');
  const companyInput = root.getElementById('gatewayCompanyInput');
  const honeypotInput = root.querySelector('input[name="website_url"]');
  const feedback = root.getElementById('gatewayFeedback');
  const submitBtn = root.getElementById('btnSubmitGatewayBooking');
  const fileInput = root.getElementById('gatewayPdfInput');
  const fileSelectedDisplay = root.getElementById('gatewayFileSelectedDisplay');

  let turnstileToken = 'mock-valid-token';
  let selectedFile = null;

  if (typeof window !== 'undefined') {
    window.onTurnstileSuccess = (token) => { turnstileToken = token; };
  }

  // Handle URL confirmation params if redirected from email
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    const confirmToken = params.get('confirm_token') || params.get('token');
    if (confirmToken && feedback) {
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
        if (slots.length === 0) {
          slotSelect.innerHTML = '<option value="">Aucun créneau disponible pour le moment</option>';
          return;
        }
        slotSelect.innerHTML = '<option value="">-- Sélectionnez un créneau --</option>' +
          slots.map((s) => `<option value="${s.slotId}">${formatSlotLabel(s)}</option>`).join('');
      })
      .catch(() => {
        slotSelect.innerHTML = '<option value="">Indisponible temporairement</option>';
      });
  }

  // Handle file picker
  if (fileInput && fileSelectedDisplay) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        selectedFile = file;
        fileSelectedDisplay.style.display = 'flex';
        fileSelectedDisplay.textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} Ko)`;
      } else {
        selectedFile = null;
        fileSelectedDisplay.style.display = 'none';
      }
    });
  }

  // Handle form submission
  if (form && feedback && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const values = {
        slotId: slotSelect?.value || '',
        name: nameInput?.value || '',
        email: emailInput?.value || '',
        company: companyInput?.value || '',
        website_url: honeypotInput?.value || '',
        cf_turnstile_response: turnstileToken,
      };

      const validation = validateBookingForm(values, selectedFile);
      if (!validation.isValid) {
        feedback.className = 'gateway-feedback-banner error';
        feedback.innerHTML = `⚠️ ${validation.errors.join('<br>')}`;
        feedback.style.display = 'block';
        return;
      }

      submitBtn.disabled = true;
      feedback.className = 'gateway-feedback-banner pending';
      feedback.textContent = 'Envoi de votre réservation en cours...';
      feedback.style.display = 'block';

      try {
        let fileBase64;
        if (selectedFile) {
          fileBase64 = await fileToBase64(selectedFile);
          values.fileName = selectedFile.name;
          values.fileBase64 = fileBase64;
        }

        const result = await submitBooking(DEFAULT_API_URL, values);
        feedback.className = 'gateway-feedback-banner success';
        feedback.innerHTML = `🎉 <strong>Créneau réservé !</strong> ${result.message}`;
        form.reset();
        if (fileSelectedDisplay) fileSelectedDisplay.style.display = 'none';
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
