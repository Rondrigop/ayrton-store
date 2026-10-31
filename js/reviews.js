// ==========================================================================
// AYRTON STORE — SISTEMA DE RESEÑAS CON SUPABASE Y PANEL DE MODERACIÓN
// ==========================================================================

const SUPABASE_CONFIG = {
  url: 'https://njwqiyeieuiyfxrmhpso.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qd3FpeWVpZXVpeWZ4cm1ocHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MjkwNjgsImV4cCI6MjEwOTAwNTA2OH0.9YT47SnsWo7PSTwea8FKWBC1GCGQ0SD4DJSgxXXWmqM',
  bucket: 'review-images'
};

// Cliente de Supabase
let supabaseClient = null;
if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!supabaseClient) {
    console.error('Supabase no está disponible');
    return;
  }

  // Elementos DOM de Reseñas
  const reviewsContainer = document.getElementById('reviewsContainer');
  const reviewsAvgScore = document.getElementById('reviewsAvgScore');
  const reviewsCountText = document.getElementById('reviewsCountText');
  const btnOpenReviewModal = document.getElementById('btnOpenReviewModal');
  const reviewDialog = document.getElementById('reviewDialog');
  const btnCloseReviewDialog = document.getElementById('btnCloseReviewDialog');
  const reviewForm = document.getElementById('reviewForm');
  const ratingStarsInput = document.querySelectorAll('.star-rating-input span');
  const reviewRatingValue = document.getElementById('reviewRatingValue');
  const reviewImageInput = document.getElementById('reviewImageInput');
  const imagePreviewWrap = document.getElementById('imagePreviewWrap');
  const imagePreviewImg = document.getElementById('imagePreviewImg');
  const btnRemovePreview = document.getElementById('btnRemovePreview');
  const reviewSubmitBtn = document.getElementById('reviewSubmitBtn');
  const reviewMsg = document.getElementById('reviewMsg');

  // Elementos DOM de Moderación Admin
  const btnOpenAdminModal = document.getElementById('btnOpenAdminModal');
  const adminDialog = document.getElementById('adminDialog');
  const btnCloseAdminDialog = document.getElementById('btnCloseAdminDialog');
  const adminAuthStep = document.getElementById('adminAuthStep');
  const adminListStep = document.getElementById('adminListStep');
  const adminPinInput = document.getElementById('adminPinInput');
  const btnAdminLogin = document.getElementById('btnAdminLogin');
  const adminPendingContainer = document.getElementById('adminPendingContainer');
  const adminApprovedContainer = document.getElementById('adminApprovedContainer');
  const tabPendingBtn = document.getElementById('tabPendingBtn');
  const tabApprovedBtn = document.getElementById('tabApprovedBtn');
  const countPendingBadge = document.getElementById('countPendingBadge');
  const countApprovedBadge = document.getElementById('countApprovedBadge');
  const adminErrorMsg = document.getElementById('adminErrorMsg');
  const btnAdminLogout = document.getElementById('btnAdminLogout');

  let currentAdminPin = '';
  let selectedFile = null;
  let activeAdminTab = 'pending'; // 'pending' | 'approved'

  // SVG Estrellas
  const starFullSvg = `<svg class="star-icon full" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  const starEmptySvg = `<svg class="star-icon empty" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

  function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += i <= rating ? starFullSvg : starEmptySvg;
    }
    return html;
  }

  // 1. CARGAR RESEÑAS PÚBLICAS APROBADAS
  async function loadApprovedReviews() {
    try {
      const { data, error } = await supabaseClient
        .from('reviews')
        .select('*')
        .eq('status', 'aprobado')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        reviewsContainer.innerHTML = `
          <div class="reviews-empty">
            <div class="empty-stars">${renderStars(5)}</div>
            <h4>Sé el primero en compartir tu experiencia</h4>
            <p>Compraste en Ayrton Store? Subí tu foto y contanos qué te pareció la prenda.</p>
            <button type="button" class="btn-pill-primary" id="btnEmptyLeaveReview">Dejar mi opinión</button>
          </div>
        `;
        const btnEmpty = document.getElementById('btnEmptyLeaveReview');
        if (btnEmpty) btnEmpty.addEventListener('click', () => reviewDialog.showModal());

        if (reviewsAvgScore) reviewsAvgScore.textContent = '5.0';
        if (reviewsCountText) reviewsCountText.textContent = '0 opiniones verificadas';
        return;
      }

      // Cálculo de promedio
      const totalScore = data.reduce((acc, r) => acc + (r.rating || 5), 0);
      const avg = (totalScore / data.length).toFixed(1);

      if (reviewsAvgScore) reviewsAvgScore.textContent = avg;
      if (reviewsCountText) {
        reviewsCountText.textContent = `${data.length} ${data.length === 1 ? 'opinión verificada' : 'opiniones verificadas'}`;
      }

      // Render de tarjetas
      reviewsContainer.innerHTML = data.map(rev => {
        const dateStr = new Date(rev.created_at).toLocaleDateString('es-AR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });

        return `
          <article class="review-card">
            <div class="review-card-header">
              <div class="review-stars-row">
                ${renderStars(rev.rating)}
              </div>
              <span class="review-date">${dateStr}</span>
            </div>

            <p class="review-comment-text">"${escapeHtml(rev.comment)}"</p>

            ${rev.image_url ? `
              <div class="review-image-wrap" onclick="window.open('${rev.image_url}', '_blank')">
                <img src="${rev.image_url}" alt="Foto enviada por ${escapeHtml(rev.name)}" loading="lazy" />
                <span class="review-img-badge">Ver foto original ↗</span>
              </div>
            ` : ''}

            <div class="review-author-line">
              <span class="review-author-name">${escapeHtml(rev.name)}</span>
              <span class="review-verified-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Cliente Verificado
              </span>
            </div>
          </article>
        `;
      }).join('');

    } catch (err) {
      console.error('Error al cargar reseñas:', err);
      reviewsContainer.innerHTML = `<p class="reviews-error">No se pudieron cargar las opiniones en este momento.</p>`;
    }
  }

  // 2. MODAL DE RESEÑA: INTERACCIÓN DE ESTRELLAS
  let currentRating = 5;
  ratingStarsInput.forEach(star => {
    star.addEventListener('click', () => {
      currentRating = parseInt(star.getAttribute('data-value'), 10);
      reviewRatingValue.value = currentRating;
      updateStarInput(currentRating);
    });

    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      updateStarInput(val);
    });
  });

  const starRow = document.querySelector('.star-rating-input');
  if (starRow) {
    starRow.addEventListener('mouseleave', () => {
      updateStarInput(currentRating);
    });
  }

  function updateStarInput(rating) {
    ratingStarsInput.forEach(star => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      if (val <= rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  // 3. VALIDACIÓN Y PREVISUALIZACIÓN DE FOTO (Anti-malware: solo imágenes reales, máx 3MB)
  if (reviewImageInput) {
    reviewImageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validación estricta de tipo MIME
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        alert('Por favor selecciona una imagen válida (.jpg, .jpeg, .png, .webp).');
        reviewImageInput.value = '';
        return;
      }

      // Validación de tamaño (5 MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5 MB.');
        reviewImageInput.value = '';
        return;
      }

      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (ev) => {
        imagePreviewImg.src = ev.target.result;
        imagePreviewWrap.style.display = 'block';
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnRemovePreview) {
    btnRemovePreview.addEventListener('click', () => {
      selectedFile = null;
      if (reviewImageInput) reviewImageInput.value = '';
      imagePreviewWrap.style.display = 'none';
      imagePreviewImg.src = '';
    });
  }

  // 4. ENVÍO DE NUEVA RESEÑA
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('reviewName');
      const commentInput = document.getElementById('reviewComment');

      const name = nameInput.value.trim();
      const comment = commentInput.value.trim();
      const rating = currentRating;

      if (!name || !comment) {
        alert('Por favor completa tu nombre y comentario.');
        return;
      }

      reviewSubmitBtn.disabled = true;
      reviewSubmitBtn.textContent = 'Enviando...';
      reviewMsg.textContent = '';
      reviewMsg.className = 'review-msg';

      let uploadedImageUrl = null;

      try {
        // Subida de imagen si seleccionó archivo
        if (selectedFile) {
          const fileExt = selectedFile.name.split('.').pop().toLowerCase();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

          const { error: uploadError } = await supabaseClient.storage
            .from(SUPABASE_CONFIG.bucket)
            .upload(fileName, selectedFile, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error('Error al subir imagen:', uploadError);
            throw new Error('No se pudo subir la foto. Asegurate de que sea menor a 5MB.');
          }

          const { data: publicUrlData } = supabaseClient.storage
            .from(SUPABASE_CONFIG.bucket)
            .getPublicUrl(fileName);

          uploadedImageUrl = publicUrlData.publicUrl;
        }

        // Insertar registro en reviews (status 'pendiente')
        const { error: insertError } = await supabaseClient
          .from('reviews')
          .insert([
            {
              name: name,
              rating: rating,
              comment: comment,
              image_url: uploadedImageUrl,
              status: 'pendiente'
            }
          ]);

        if (insertError) throw insertError;

        reviewMsg.textContent = '¡Muchas gracias! Tu opinión fue enviada con éxito y se publicará tras ser verificada.';
        reviewMsg.classList.add('success');
        reviewForm.reset();
        selectedFile = null;
        imagePreviewWrap.style.display = 'none';
        currentRating = 5;
        updateStarInput(5);

        setTimeout(() => {
          reviewDialog.close();
          reviewMsg.textContent = '';
        }, 3200);

      } catch (err) {
        console.error('Error al enviar reseña:', err);
        reviewMsg.textContent = err.message || 'Ocurrió un error al enviar tu reseña. Por favor intentá nuevamente.';
        reviewMsg.classList.add('error');
      } finally {
        reviewSubmitBtn.disabled = false;
        reviewSubmitBtn.textContent = 'Publicar opinión';
      }
    });
  }

  // 5. APERTURA / CIERRE DE MODALES
  if (btnOpenReviewModal) {
    btnOpenReviewModal.addEventListener('click', () => {
      reviewDialog.showModal();
    });
  }

  if (btnCloseReviewDialog) {
    btnCloseReviewDialog.addEventListener('click', () => {
      reviewDialog.close();
    });
  }

  // ==========================================================================
  // PANEL DE ADMINISTRACIÓN / MODERACIÓN (ACCESO SECRETO)
  // ==========================================================================

  function openAdminPanel() {
    if (!adminDialog) return;
    adminDialog.showModal();
    if (!currentAdminPin) {
      adminAuthStep.style.display = 'block';
      adminListStep.style.display = 'none';
      adminPinInput.value = '';
      adminErrorMsg.textContent = '';
      setTimeout(() => adminPinInput.focus(), 150);
    } else {
      loadAllAdminData();
    }
  }

  // 1. Acceso secreto por atajo de teclado: Ctrl + Shift + A (o Cmd + Shift + A en Mac)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminPanel();
    }
  });

  // 2. Acceso secreto por URL: si termina en #admin (ideal para celular)
  function checkUrlHash() {
    if (window.location.hash.toLowerCase() === '#admin') {
      openAdminPanel();
    }
  }
  checkUrlHash();
  window.addEventListener('hashchange', checkUrlHash);

  // 3. Acceso secreto por triple toque/clic en el ® de "Powered by Rondrigo®"
  const secretTrigger = document.getElementById('secretAdminTrigger');
  let secretClickCount = 0;
  let secretClickTimer = null;
  if (secretTrigger) {
    secretTrigger.addEventListener('click', () => {
      secretClickCount++;
      clearTimeout(secretClickTimer);
      if (secretClickCount >= 3) {
        secretClickCount = 0;
        openAdminPanel();
      } else {
        secretClickTimer = setTimeout(() => {
          secretClickCount = 0;
        }, 1200);
      }
    });
  }

  if (btnOpenAdminModal) {
    btnOpenAdminModal.addEventListener('click', openAdminPanel);
  }

  if (btnCloseAdminDialog) {
    btnCloseAdminDialog.addEventListener('click', () => {
      adminDialog.close();
    });
  }

  if (btnAdminLogin) {
    btnAdminLogin.addEventListener('click', async () => {
      const pin = adminPinInput.value.trim();
      if (!pin) {
        adminErrorMsg.textContent = 'Ingresa la contraseña';
        return;
      }

      btnAdminLogin.disabled = true;
      btnAdminLogin.textContent = 'Verificando...';
      adminErrorMsg.textContent = '';

      try {
        const { data, error } = await supabaseClient.rpc('get_pending_reviews', {
          admin_pin: pin
        });

        if (error) throw error;

        currentAdminPin = pin;
        adminAuthStep.style.display = 'none';
        adminListStep.style.display = 'block';
        renderPendingReviews(data);
        loadAdminApprovedReviews();

      } catch (err) {
        adminErrorMsg.textContent = 'Contraseña incorrecta';
      } finally {
        btnAdminLogin.disabled = false;
        btnAdminLogin.textContent = 'Ingresar al Panel';
      }
    });
  }

  // Pestañas de Admin
  if (tabPendingBtn && tabApprovedBtn) {
    tabPendingBtn.addEventListener('click', () => {
      activeAdminTab = 'pending';
      tabPendingBtn.classList.add('active');
      tabApprovedBtn.classList.remove('active');
      adminPendingContainer.style.display = 'flex';
      adminApprovedContainer.style.display = 'none';
    });

    tabApprovedBtn.addEventListener('click', () => {
      activeAdminTab = 'approved';
      tabApprovedBtn.classList.add('active');
      tabPendingBtn.classList.remove('active');
      adminApprovedContainer.style.display = 'flex';
      adminPendingContainer.style.display = 'none';
      loadAdminApprovedReviews();
    });
  }

  if (btnAdminLogout) {
    btnAdminLogout.addEventListener('click', () => {
      currentAdminPin = '';
      adminAuthStep.style.display = 'block';
      adminListStep.style.display = 'none';
      adminPinInput.value = '';
    });
  }

  async function loadAllAdminData() {
    await loadPendingReviews();
    await loadAdminApprovedReviews();
  }

  async function loadPendingReviews() {
    try {
      const { data, error } = await supabaseClient.rpc('get_pending_reviews', {
        admin_pin: currentAdminPin
      });
      if (error) throw error;
      renderPendingReviews(data);
    } catch (err) {
      console.error('Error al recargar pendientes:', err);
    }
  }

  function renderPendingReviews(list) {
    if (countPendingBadge) countPendingBadge.textContent = list ? list.length : 0;

    if (!list || list.length === 0) {
      adminPendingContainer.innerHTML = `
        <div class="admin-empty">
          <p>✅ ¡Al día! No hay comentarios pendientes de revisión.</p>
        </div>
      `;
      return;
    }

    adminPendingContainer.innerHTML = list.map(item => {
      const dateStr = new Date(item.created_at).toLocaleString('es-AR');

      return `
        <div class="admin-review-item" data-id="${item.id}">
          <div class="admin-review-top">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${renderStars(item.rating)} (${item.rating}/5)</span>
            <small>${dateStr}</small>
          </div>

          <p class="admin-review-text">"${escapeHtml(item.comment)}"</p>

          ${item.image_url ? `
            <div class="admin-review-img-preview">
              <a href="${item.image_url}" target="_blank" rel="noopener noreferrer">
                <img src="${item.image_url}" alt="Foto subida" />
                <span>Ampliar foto ↗</span>
              </a>
            </div>
          ` : '<span class="admin-no-img">Sin imagen adjunta</span>'}

          <div class="admin-actions-row">
            <button type="button" class="btn-admin-approve" onclick="window.moderateItem(${item.id}, 'aprobado')">
              ✅ Aprobar y Publicar
            </button>
            <button type="button" class="btn-admin-reject" onclick="window.moderateItem(${item.id}, 'rechazado')">
              ❌ Rechazar
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Cargar reseñas que ya están aprobadas/publicadas para poder darlas de baja
  async function loadAdminApprovedReviews() {
    try {
      const { data, error } = await supabaseClient
        .from('reviews')
        .select('*')
        .eq('status', 'aprobado')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (countApprovedBadge) countApprovedBadge.textContent = data ? data.length : 0;

      if (!data || data.length === 0) {
        adminApprovedContainer.innerHTML = `
          <div class="admin-empty">
            <p>Aún no hay opiniones publicadas en la tienda.</p>
          </div>
        `;
        return;
      }

      adminApprovedContainer.innerHTML = data.map(item => {
        const dateStr = new Date(item.created_at).toLocaleString('es-AR');

        return `
          <div class="admin-review-item published" data-id="${item.id}">
            <div class="admin-review-top">
              <strong>${escapeHtml(item.name)}</strong>
              <span>${renderStars(item.rating)} (${item.rating}/5)</span>
              <small>${dateStr}</small>
            </div>

            <p class="admin-review-text">"${escapeHtml(item.comment)}"</p>

            ${item.image_url ? `
              <div class="admin-review-img-preview">
                <a href="${item.image_url}" target="_blank" rel="noopener noreferrer">
                  <img src="${item.image_url}" alt="Foto subida" />
                  <span>Ampliar foto ↗</span>
                </a>
              </div>
            ` : '<span class="admin-no-img">Sin imagen adjunta</span>'}

            <div class="admin-actions-row">
              <button type="button" class="btn-admin-delete" onclick="window.deletePublishedReview(${item.id})">
                🗑️ Eliminar de la tienda
              </button>
            </div>
          </div>
        `;
      }).join('');

    } catch (err) {
      console.error('Error al cargar publicadas para admin:', err);
    }
  }

  // Eliminar / dar de baja reseña ya publicada
  window.deletePublishedReview = async function(id) {
    if (!currentAdminPin) return;

    if (!confirm('¿Estás seguro de que deseas eliminar esta opinión de la tienda pública? Dejará de ser visible inmediatamente.')) {
      return;
    }

    try {
      const { error } = await supabaseClient.rpc('moderate_review', {
        review_id: id,
        new_status: 'rechazado',
        admin_pin: currentAdminPin
      });

      if (error) throw error;

      // Actualizar listas
      await loadAdminApprovedReviews();
      await loadApprovedReviews();
      alert('La opinión ha sido eliminada de la tienda.');

    } catch (err) {
      alert('Error al eliminar reseña: ' + err.message);
    }
  };

  // Moderar reseña individual
  window.moderateItem = async function(id, newStatus) {
    if (!currentAdminPin) return;

    const actionText = newStatus === 'aprobado' ? '¿Aprobar esta reseña y publicarla en la tienda?' : '¿Rechazar esta reseña?';
    if (!confirm(actionText)) return;

    try {
      const { error } = await supabaseClient.rpc('moderate_review', {
        review_id: id,
        new_status: newStatus,
        admin_pin: currentAdminPin
      });

      if (error) throw error;

      // Recargar listas
      await loadPendingReviews();
      await loadAdminApprovedReviews();
      await loadApprovedReviews();

    } catch (err) {
      alert('Error al moderar reseña: ' + err.message);
    }
  };

  // Helper sanitización básica
  function escapeHtml(text) {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Carga inicial de reseñas aprobadas
  loadApprovedReviews();
});

