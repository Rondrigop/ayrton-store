// ==========================================================================
// AYRTON STORE — LÓGICA DE APLICACIÓN (A-DAM DESIGN SYSTEM)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Estado local
    let state = {
    activeCategory: 'Todos',
     searchQuery: '',
    sortBy: 'default',
   selectedSizes: {},
    modalProductId: null,
   modalSelectedSize: null,
   currentImageIndex: {}   // ← aquí guardaremos el índice activo por producto
   };
  

  // Elementos DOM
  const productsGrid = document.getElementById('productsGrid');
  const productsCount = document.getElementById('productsCount');
  const categoryChips = document.querySelectorAll('.category-chip');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const productDialog = document.getElementById('productDialog');
  const navWhatsApp = document.getElementById('navWhatsApp');
  const heroWhatsApp = document.getElementById('heroWhatsApp');
  const splitWhatsAppBtn = document.getElementById('splitWhatsAppBtn');

  // SVG de WhatsApp minimalista
  const whatsappSvg = `
    <svg viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.488-8.414z"/>
    </svg>
  `;

  // SVG de estrella Sunbeam
  const starSvg = `
    <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  `;

  // Asignar enlaces directos a WhatsApp general
  const generalUrl = `https://wa.me/${STORE_CONFIG.phone}?text=${encodeURIComponent(STORE_CONFIG.welcomeMessage)}`;
  if (navWhatsApp) navWhatsApp.href = generalUrl;
  if (heroWhatsApp) heroWhatsApp.href = generalUrl;
  if (splitWhatsAppBtn) splitWhatsAppBtn.href = generalUrl;

  // Filtrado y ordenamiento de prendas
  function getFilteredItems() {
    let list = [...PRODUCTS];

    if (state.activeCategory !== 'Todos') {
      list = list.filter(p => p.category.toLowerCase() === state.activeCategory.toLowerCase());
    }

    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (state.sortBy === 'price-asc') {
      list.sort((a, b) => {
        const pa = Number(a.price.replace(/[.,]/g, ''));
        const pb = Number(b.price.replace(/[.,]/g, ''));
        return pa - pb;
      });
    } else if (state.sortBy === 'price-desc') {
      list.sort((a, b) => {
        const pa = Number(a.price.replace(/[.,]/g, ''));
        const pb = Number(b.price.replace(/[.,]/g, ''));
        return pb - pa;
      });
    }

    return list;
  }

  // Renderizar catálogo
  function renderCatalog() {
    const items = getFilteredItems();
    // Inicializamos índice de imagen para cada producto si aún no está definido
    PRODUCTS.forEach(p => {
      if (state.currentImageIndex[p.id] === undefined) {
        state.currentImageIndex[p.id] = 0;
      }
    });

    if (productsCount) {
      productsCount.textContent = `Mostrando ${items.length} ${items.length === 1 ? 'prenda' : 'prendas'}`;
    }

    if (items.length === 0) {
      productsGrid.innerHTML = `
        <div class="catalog-empty-view">
          <h3>No encontramos resultados</h3>
          <p>Intenta con otro término de búsqueda o selecciona otra categoría.</p>
          <button type="button" class="btn-pill-primary" id="btnResetFilters">Ver toda la colección</button>
        </div>
      `;

      const btnReset = document.getElementById('btnResetFilters');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          state.activeCategory = 'Todos';
          state.searchQuery = '';
          if (searchInput) searchInput.value = '';
          updateCategoryChips();
          renderCatalog();
        });
      }
      return;
    }

    productsGrid.innerHTML = items.map(product => {
      const selectedSize = state.selectedSizes[product.id] || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
      const waUrl = createWhatsAppProductUrl(product, selectedSize);

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media-wrap" data-id="${product.id}" onclick="window.openQuickView(${product.id})">
            <img 
              src="${product.images[state.currentImageIndex[product.id] ?? 0]}" 
              alt="${product.name}" 
              loading="lazy" 
              decoding="async"
              class="product-img"
            />
            ${product.badge ? `<span class="product-badge-flag">${product.badge}</span>` : ''}


            <button class="img-nav btn-next" onclick="event.stopPropagation(); nextImage(${product.id})" aria-label="Foto siguiente">→</button>
          </div>

          <div class="product-brand-line">AYRTON STORE</div>
          <h3 class="product-name-title" onclick="window.openQuickView(${product.id})">${product.name}</h3>
          <div class="product-price-line">${STORE_CONFIG.currency}${product.price.toLocaleString('es-AR')}</div>

          

          ${product.sizes && product.sizes.length > 0 ? `
            <div class="sizes-selector-group">
              <div class="sizes-label-mini">Talle:</div>
              <div class="sizes-pill-row">
                ${product.sizes.map(size => `
                  <button 
                    type="button" 
                    class="size-pill-btn ${size === selectedSize ? 'selected' : ''}" 
                    data-id="${product.id}" 
                    data-size="${size}"
                  >
                    ${size}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="product-card-action">
            <a 
              href="${waUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-card-whatsapp"
              id="card-wa-${product.id}"
            >
              ${whatsappSvg}
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </article>
      `;
    }).join('');

    // Listener para botones de talle en tarjeta
    const sizeButtons = productsGrid.querySelectorAll('.size-pill-btn');
    sizeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prodId = parseInt(btn.getAttribute('data-id'), 10);
        const sz = btn.getAttribute('data-size');
        state.selectedSizes[prodId] = sz;

        const parentRow = btn.parentElement;
        parentRow.querySelectorAll('.size-pill-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const product = PRODUCTS.find(p => p.id === prodId);
        const waCardLink = document.getElementById(`card-wa-${prodId}`);
        if (waCardLink && product) {
          waCardLink.href = createWhatsAppProductUrl(product, sz);
        }
      });
    });
  }

  // Actualizar chips de categoría
  function updateCategoryChips() {
    categoryChips.forEach(chip => {
      if (chip.getAttribute('data-category') === state.activeCategory) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      state.activeCategory = chip.getAttribute('data-category');
      updateCategoryChips();
      renderCatalog();
    });
  });
  /* -------------------------------------------------
   CONTROL DE CARRUSEL DE IMÁGENES POR PRODUCTO
   ------------------------------------------------- */
   function prevImage(productId){
    const prod = PRODUCTS.find(p => p.id === productId);
    if(!prod) return;
    //iniciar indice si no existe
    if ( state.currentImageIndex[productId] === undefined){
      state.currentImageIndex[productId] = 0;
    }
    const total = prod.images.length;
    state.currentImageIndex[productId] =
    (state.currentImageIndex[productId] - 1 + total) % total; //ciclo atras
    
    //Actualizar src del <img> que esta dentro del contenedor
    const wrapper =
    document.querySelector(`.product-media-wrap[data-id="${productId}"]`);
    if (wrapper) {
      const img = wrapper.querySelector('img.product-img');
      img.src = 
      prod.images[state.currentImageIndex[productId]]
      ;
    }
   }
   function nextImage(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;
  if (state.currentImageIndex[productId] === undefined) {
    state.currentImageIndex[productId] = 0;
  }
  const total = prod.images.length;
  state.currentImageIndex[productId] =
    (state.currentImageIndex[productId] + 1) % total; // ciclo adelante
  const wrapper = document.querySelector(`.product-media-wrap[data-id="${productId}"]`);
  if (wrapper) {
    const img = wrapper.querySelector('img.product-img');
    img.src = prod.images[state.currentImageIndex[productId]];
  }
}

  // Filtros desde la navegación o el footer
  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-filter');
      if (cat) {
        state.activeCategory = cat;
        updateCategoryChips();
        renderCatalog();
      }
    });
  });

  // Búsqueda en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Ordenamiento por precio
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });
  }

  // ==========================================
  // MODAL DE VISTA RÁPIDA (A-dam flat styling)
  // ==========================================
  window.openQuickView = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !productDialog) return;

    state.modalProductId = productId;
    state.modalSelectedSize = state.selectedSizes[productId] || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);

    const dialogContent = document.getElementById('dialogContent');
    if (!dialogContent) return;

    function renderDialogBody() {
      const waUrl = createWhatsAppProductUrl(product, state.modalSelectedSize);

      dialogContent.innerHTML = `
        <div class="quickview-inner">
          <button type="button" class="btn-close-dialog" id="btnCloseQuickView" aria-label="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div class="quickview-img-box">
            <button class=\"image-nav btn-prev\" onclick=\"event.stopPropagation(); prevImage(${product.id});\" aria-label=\"Foto anterior\">←</button>
            <button class=\"img-nav btn-next\" onclick=\"event.stopPropagation(); nextImage(${product.id});\" aria-label=\"Foto siguiente\">→</button>
            <img src=\"${product.images[state.currentImageIndex[product.id] ?? 0]}\" alt=\"${product.name}\" />
          </div>

          <div class="quickview-info-box">
            <div class="quickview-brand-tag">AYRTON STORE • ${product.category}</div>
            <h2 class="quickview-title">${product.name}</h2>
            <div class="quickview-price">${STORE_CONFIG.currency}${product.price.toLocaleString('es-AR')}</div>

              

              </div>
              <span class="rating-score-count">(${product.rating || '4.9'}) • ${product.reviewsCount || 25} reseñas</span>
            </div>

            <p class="quickview-desc">${product.description}</p>

            ${product.sizes && product.sizes.length > 0 ? `
              <div class="quickview-sizes-label">Seleccionar Talle:</div>
              <div class="quickview-sizes-list">
                ${product.sizes.map(size => `
                  <button 
                    type="button" 
                    class="quickview-size-btn ${size === state.modalSelectedSize ? 'selected' : ''}" 
                    data-size="${size}"
                  >
                    ${size}
                  </button>
                `).join('')}
              </div>
            ` : ''}

            <a 
              href="${waUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-quickview-whatsapp"
            >
              ${whatsappSvg}
              <span>Consultar Stock en WhatsApp</span>
            </a>
          </div>
        </div>
      `;

      // Cerrar modal
      document.getElementById('btnCloseQuickView').addEventListener('click', () => {
        productDialog.close();
      });

      // Seleccionar talle en modal
      const modalSizeButtons = dialogContent.querySelectorAll('.quickview-size-btn');
      modalSizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const sz = btn.getAttribute('data-size');
          state.modalSelectedSize = sz;
          state.selectedSizes[product.id] = sz;
          renderDialogBody();
          renderCatalog();
        });
      });
    }

    renderDialogBody();
    productDialog.showModal();
  };

  // Cierre por clic fuera del cuadro
  if (productDialog) {
    productDialog.addEventListener('click', (e) => {
      const rect = productDialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        productDialog.close();
      }
    });
  }

  // Render inicial
  renderCatalog();
});

// Ocultar botones de navegación de imágenes en tarjetas y vista rápida
const hideNavStyle = document.createElement('style');
hideNavStyle.textContent = '.image-nav, .img-nav { display:none !important; }';
document.head.appendChild(hideNavStyle);

// Ocultar rating y estrellas en tarjetas y vista rápida
const hideRatingStyle = document.createElement('style');
hideRatingStyle.textContent = '.rating-score-count, .product-rating-row, .stars-list { display:none !important; }';
document.head.appendChild(hideRatingStyle);
