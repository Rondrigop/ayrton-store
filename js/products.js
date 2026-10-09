// ==========================================================================
// AYRTON STORE - CONFIGURACIÓN Y CATÁLOGO (ESTILO A-DAM)
// ==========================================================================

const STORE_CONFIG = {
  name: "Ayrton Store",
  phone: "5491123139050", // Enlace wa.me sin signos
  currency: "$",
  announcementText: "ENVÍOS A TODO EL PAÍS • CONSULTÁ TALLES Y STOCK DIRECTO POR WHATSAPP",
  welcomeMessage: "¡Hola Ayrton Store! Estoy visitando la web y quisiera consultar por asesoramiento y compras.",
  shippingNotice: "Envíos a todo el país | Pagos por Transferencia Bancaria o Efectivo"
};

// Generador de enlace WhatsApp con mensaje formateado por producto
function createWhatsAppProductUrl(product, selectedSize = null) {
  const sizeText = selectedSize ? `\n• Talle: *${selectedSize}*` : (product.sizes && product.sizes.length > 0 ? `\n• Talles disponibles: ${product.sizes.join(', ')}` : '');
  const priceFormatted = `$${product.price.toLocaleString('es-AR')}`;
  
  const text = `¡Hola *${STORE_CONFIG.name}*! 👋\n\n` +
    `Quisiera consultar por la siguiente prenda de su catálogo:\n` +
    ` *${product.name}*\n` +
    ` Categoría: *${product.category}*\n` +
    ` Precio: *${priceFormatted}*` +
    sizeText + `\n\n` +
    `¿Tienen disponibilidad para envío inmediato? ¡Muchas gracias!`;

  return `https://wa.me/${STORE_CONFIG.phone}?text=${encodeURIComponent(text)}`;
}

// Catálogo con las 4 categorías solicitadas: Camisetas, Camperas, Shorts, Pantalones
// Fotografía luminosa, fondos claros y limpios acorde al estilo A-dam
const PRODUCTS = [
  // --- CAMISETAS ---
 {
    id: 1,
    name: "Camiseta Manga Corta Boca Juniors adidas Titular 25 26 Hombre",
    category: "Camisetas",
    price: "159,000",
    description: "Rinde homenaje a los 120 años de éxitos ininterrumpidos de Boca Juniors. En un tono más oscuro, viene con un escudo conmemorativo del equipo en el pecho. La tecnología AEROREADY ayuda a mantener a los hinchas secos y cómodos, y el rótulo '1905' en la nuca es un recordatorio de cuándo empezó la leyenda.",
    images: [
      // CORREGIDO: Barras cambiadas a /
      "images/ADKV2842-1.jpg"
    ],
    sizes: ["XL"],
    reviewsCount: 20,
    badge: "",
    inStock: true
},
  {
    id: 2,
    name: "Camiseta Manga Larga Boca Juniors adidas Titular 25 26 Hombre",
    category: "Camisetas",
    price: "159,000",
    description: "Rinde homenaje a los 120 años de éxitos ininterrumpidos de Boca Juniors. En un tono más oscuro, viene con un escudo conmemorativo del equipo en el pecho. La tecnología AEROREADY ayuda a mantener a los hinchas secos y cómodos, y el rótulo '1905' en la nuca es un recordatorio de cuándo empezó la leyenda.",
    images: ["images/camiseta-manga-larga-de-boca-adidas-oficial-azul-100020jm1262001-1_2_.jpg"],
    sizes: ["L"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },
  

// --- REMERAS ---
  {
    id: 3,
    name: "Remera Boca Juniors adidas 26 27 Hombre algodón",
    category: "Remeras",
    price: "89,000",
    description: "Sumergite en la cultura futbolística con la Remera Boca Juniors adidas 26 27 Hombre algodón, diseñada para los aficionados que viven y respiran por el fútbol. ",
    images: ["images/remerabocaazulyamarillo.jpg"],
    sizes: ["S","M","L","XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 4,
    name: "Remera Boca Juniors adidas 2026 Hombre",
    category: "Remeras",
    price: "129,000",
    description: "La Remera Boca Juniors adidas 2026 Hombre está inspirada en los colores emblemáticos del club y ofrece un look seguro para los días de partido, la vida en la ciudad y todo lo que te imagines.",
    images: ["images/ubegarca.jpg"],
    sizes: ["XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 5,
    name: "Remera OG Boca Juniors",
    category: "Remeras",
    price: "119,000",
    description: "Remera de ajuste ceñido con diseño inspirado en la herencia futbolera, para un auténtico estilo de fútbol.",
    images: ["images/remerabocaazulyamarillo.jpg"],
    sizes: ["M","L","XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 6,
    name: "Remera EQT Boca Juniors",
    category: "Remeras",
    price: "139,000",
    description: "Remera de ajuste holgado hecha con una estructura de tejido de punto simple para una comodidad fácil.",
    images: ["images/Remera_EQT_Boca_Juniors_Blanco.avif"],
    sizes: ["S","M","L","XL","XXL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 7,
    name: "Camiseta EQT Boca Juniors",
    category: "Remeras",
    price: "149,000",
    description: "Camiseta con una estructura de tejido técnico para brindar durabilidad en el uso diario.",
    images: ["images/Camiseta_EQT_Boca_Juniors_Azul_KH2148_01_laydown.avif"],
    sizes: ["L","XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
// --- CAMPERAS ---
  {
     id: 8,
    name: "Campera EQT Boca Juniors",
    category: "Camperas",
    price: "219,000",
    description: "Campera deportiva de ajuste holgado con cuello alto y cierre frontal, que brinda comodidad y elegancia.",
    images: [ "images/campera_boca eqt.jpg"],
    sizes: ["XS","S", "M", "L", "XL", "XXL"],
    reviewsCount: 20,
    badge: "",
    inStock: true
  },
  {
    id: 9,
    name: "Campera Deportiva OG Boca Juniors",
    category: "Camperas",
    price: "199.000",
    description: "Campera de ajuste clásico y cuello alto, con un estilo clásico inspirado en el fútbol.",
    images: ["images/Campera_Deportiva_OG_Boca_Juniors_Blanco_KH2141_01_laydown.jpg"],
    sizes: [ "L", "XL"],
    reviewsCount: 42,
    badge: "",
    inStock: true
  },
  {
    id: 10,
    name: "Campera Titular Anthem Boca Juniors",
    category: "Camperas",
    price: "209.000",
    description: "Campera de fútbol con ajuste clásico y cuello alto, para un estilo clásico.",
    images: ["images/Campera_Titular_Anthem.avif"],
    sizes: ["L", "XL"],
    reviewsCount: 29,
    badge: "",
    inStock: true
  },
  {
    id: 11,
    name: "Campera Boca Juniors 25 Aniversario Bicampeón de América 2001",
    category: "Camperas",
    price: "209.000",
    description: "Campera deportiva con el escudo del equipo para un estilo inspirado en el fútbol.",
    images: ["images/Campera_Boca_Juniors_25_Aniversario_Bicampeon_de_America_2001.avif"],
    sizes: ["L", "XL"],
    reviewsCount: 29,
    badge: "",
    inStock: true
  },
   {
    id: 12,
    name: "Campera Deportiva EQT Argentina",
    category: "Camperas",
    price: "209.000",
    description: "Campera deportiva de cuello alto con ajuste holgado para un estilo futbolístico relajado.",
    images: ["images/EQT_Argentina_Azul_KG2287_HM5.avif"],
    sizes: ["L", "XL"],
    reviewsCount: 29,
    badge: "",
    inStock: true
  },
  {
    id: 13,
    name: "Buzo de Cuello Redondo Boca Juniors Originals",
    category: "Camperas",
    price: "169,000",
    description: "Buzo con felpa francesa para una comodidad cómoda.",
    images: ["images/Buzo_de_Cuello_Redondo_Boca_Juniors_Originals.avif"],
    sizes: ["XL"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },

  // --- SHORTS ---
  {
    id: 14,
    name: "Shorts Tiro26 Competition Downtime Boca 26/27",
    category: "Shorts",
    price: "120.000",
    description: "Shorts livianos con cordón ajustable para un uso diario cómodo.",
    images: ["images/short azul claro.avif"],
    sizes: ["M", "L", "XL"],
    reviewsCount: 22,
    badge: "",
    inStock: true
  },
  {
    id: 15,
    name: "Shorts de Entrenamiento de Boca Juniors Tiro 25 Competition",
    category: "Shorts",
    price: "120.000",
    description: "Entrená como un jugador Xeneize con estos shorts que controlan la humedad.",
    images: ["images/shortoscuro.avif"],
    sizes: ["L"],
    reviewsCount: 35,
    badge: "",
    inStock: true
  },
  

  // --- PANTALONES ---
  {
    id: 16,
    name: "Pantalón Deportivo EQT Boca Juniors",
    category: "Pantalones",
    price: "179.000",
    description: "Pantalones deportivos de ajuste clásico con cordón ajustable para mayor comodidad personalizada.",
    images: ["images/bocapantaloeqt.avif"],
    sizes: ["L", "XL"],
    reviewsCount: 47,
    badge: "",
    inStock: true
  }
];
