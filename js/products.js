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
      "images/d33dd98c-32a0-4c30-bfb9-c6d5b3b82e98.jpg"
    ],
    sizes: ["XL"],
    reviewsCount: 20,
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
    sizes: ["XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 4,
    name: "Remera Boca Juniors adidas 2026 Hombre",
    category: "Remeras",
    price: "139,000",
    description: "La Remera Boca Juniors adidas 2026 Hombre está inspirada en los colores emblemáticos del club y ofrece un look seguro para los días de partido, la vida en la ciudad y todo lo que te imagines.",
    images: ["images/ubegarca.jpg"],
    sizes: ["L","XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 5,
    name: "Remera OG Boca Juniors",
    category: "Remeras",
    price: "129,000",
    description: "Remera de ajuste ceñido con diseño inspirado en la herencia futbolera, para un auténtico estilo de fútbol.",
    images: ["images/Remera_OG_Boca_Juniors_Azul_KH2144_01_laydown.avif"],
    sizes: ["M","L","XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 6,
    name: "Remera EQT Boca Juniors",
    category: "Remeras",
    price: "149,000",
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
    price: "239,000",
    description: "Campera deportiva de ajuste holgado con cuello alto y cierre frontal, que brinda comodidad y elegancia.",
    images: [ "images/campera_boca eqt.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    category: "AFA",
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
    category: "Buzos",
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
    sizes: ["M","L"],
    reviewsCount: 35,
    badge: "",
    inStock: true
  },
  

  // --- PANTALONES ---
  {
    id: 16,
    name: "Pantalón Deportivo EQT Boca Juniors",
    category: "Pantalones",
    price: "179,000",
    description: "Pantalones deportivos de ajuste clásico con cordón ajustable para mayor comodidad personalizada.",
    images: ["images/bocapantaloeqt.avif"],
    sizes: ["L", "XL","XXL"],
    reviewsCount: 47,
    badge: "",
    inStock: true
  },
   {
    id: 17,
    name: "Remera EQT Argentina",
    category: "AFA",
    price: "139,000",
    description: "Remera de ajuste holgado con escote redondo para un estilo relajado inspirado en el fútbol.",
    images: ["images/Remera_EQT_Argentina_Blanco_KG2288_HM5.avif"],
    sizes: ["L","XL"],
    reviewsCount: 47,
    badge: "",
    inStock: true
  },
  {
    id: 18,
    name: "Camiseta Prepartido 26/27 Boca Jrs",
    category: "Remeras",
    price: "139,000",
    description: "Entrá al campo de juego con confianza usando la camiseta prepartido Boca 26/27",
    images: ["images/KV1869-1.jpg"],
    sizes: ["L","XL"],
    reviewsCount: 47,
    badge: "",
    inStock: true
  },
  {
    id: 19,
    name: "Camiseta Alternativa Authentic 25/26 - Match",
    category: "Camisetas",
    price: "159,000",
    description: "Del origen a la gloria, el dorado recorre toda la historia de Boca. Esta camiseta continúa la celebración de los 120 años, siendo fiel a las raíces del club y homenajeando triunfos inolvidables.",
    images: ["images/173727-1200-auto.webp"],
    sizes: ["L"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },
  {
    id: 20,
    name: "Campera Impermeable Boca Juniors 26/27",
    category: "Camperas",
    price: "289,000",
    description: "Campera impermeable con capucha plegable para una comodidad fiable en condiciones de lluvia o humedad.",
    images: ["images/Campera_Impermeable_Boca_Juniors_26-27_Azul_KB6271_01_laydown.jpg"],
    sizes: ["L","XL"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },
  {
    id: 21,
    name: "Campera de Presentación Boca Juniors 25 Competition",
    category: "Camperas",
    price: "159,000",
    description: "Campera impermeable con capucha plegable para una comodidad fiable en condiciones de lluvia o humedad.",
    images: ["images/Campera_de_Presentacion_Tiro_de_Boca_Juniors_Tiro_25_Competition_Azul_JP1931_01_laydown.avif"],
    sizes: ["XL"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },
  {
    id: 22,
    name: "Campera De Boca Adidas De Lluvia 25 Amarilla",
    category: "Camperas",
    price: "169,000",
    description: "La tecnología avanzada RAIN.RDY canaliza el agua lejos de tu cuerpo para que te mantengas seco y concentrado en cada ejercicio.",
    images: ["images/campera-de-boca-adidas-de-lluvia-tiro-25-amarilla-100020jp1927001-1.jpg"],
    sizes: ["L","XL"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },
  {
    id: 23,
    name: "Buzo de Cuello Redondo Boca Juniors Originals",
    category: "Buzos",
    price: "179,000",
    description: "Buzo con capucha inspirado en la herencia, confeccionado en tejido polar para ofrecer una comodidad clásica.",
    images: ["images/Buzo_con_Capucha_Boca_Juniors_OG_Azul_KH2140_01_laydown.avif"],
    sizes: ["XL"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },
  {
    id: 24,
    name: "Campera Parka Boca Juniors Tiro 25",
    category: "Camperas",
    price: "259,000",
    description: "Parka de Boca Juniors para que te abrigues bien en la tribuna.",
    images: ["images/D_NQ_NP_2X_667032-MLA88111259299_072025-F.webp"],
    sizes: ["L"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },
  {
    id: 25,
    name: "Campera Deportiva Boca Juniors Originals",
    category: "Camperas",
    price: "189,000",
    description: "Campera deportiva con cuello alto para un toque distintivo y elegante.",
    images: ["images/Campera_Deportiva_Boca_Juniors_Originals_Azul_JZ2753_01_laydown.avif"],
    sizes: ["XL"],
    reviewsCount: 24,
    badge: "",
    inStock: true
  },
  {
    id: 26,
    name: "Remera Boca Juniors adidas 26 27 Hombre algodón",
    category: "Remeras",
    price: "69,000",
    description: "Remera gráfica con cuello redondo clásico y detalles del club.",
    images: ["images/Remera_Graphic_Originals_Boca_Juniors_Blanco_KH2157_01_laydown.avif"],
    sizes: ["L","XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  }
  ,
  {
    id: 27,
    name: "Morral De Boca Adidas Festival Alternativo Azul",
    category: "Accesorios",
    price: "59,999",
    description: "Dimensiones aproximadas. Largo:16cm. Ancho:5cm. Alto:19cm.Compartimiento principal forrado con amplio bolsillo interno.",
    images: ["images/istqb.jpg"],
    sizes: ["Unico"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 28,
    name: "Camiseta Boca Juniors 25 Aniversario Bicampeón de América 2001",
    category: "Camisetas",
    price: "199,000",
    description: "Camiseta de fútbol con tecnología Climacool para una comodidad fresca y seca dentro y fuera de la cancha.",
    images: ["images/boca2001.avif"],
    sizes: ["L","XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 29,
    name: "Buzo Deportivo EQT Boca Jrs",
    category: "Buzos",
    price: "199,000",
    description: "Celebrá el legado de Boca Juniors con el buzo EQT Boca Juniors, parte de la colección EQT emblemática. Esta prenda está inspirada en la cultura de fútbol, fusionando la herencia deportiva clásica con la actitud del estilo urbano moderno. ",
    images: ["images/Buzo_EQT_Boca_Juniors_Azul_KH2151_01_laydown.avif"],
    sizes: ["L","XL","XXL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  }
  ,
  {
    id: 30,
    name: "Campera Deportiva Boca Juniors Stadium",
    category: "Camperas",
    price: "199,000",
    description: "Campera deportiva de ajuste holgado con elegante cierre para una comodidad inspirada en el fútbol.",
    images: ["images/Campera_Deportiva_Boca_Juniors_Stadium_Blanco_KH2161_01_laydown.avif"],
    sizes: ["L","XL"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  },
  {
    id: 31,
    name: "Mochila Titular Boca Juniors 26/27",
    category: "Accesorios",
    price: "119,000",
    description: "Mochila de Boca Juniors con diseño inspirado en las camisetas de fútbol para llevar estilo a donde vayas.",
    images: ["images/Mochila_Titular_Boca_Juniors_26-27_Azul_KY5119_01_00_standard.avif"],
    sizes: ["Unico"],
    reviewsCount: 15,
    badge: "",
    inStock: true
  }
];
