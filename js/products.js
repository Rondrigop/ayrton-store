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
    `👕 *${product.name}*\n` +
    `🏷️ Categoría: *${product.category}*\n` +
    `💰 Precio: *${priceFormatted}*` +
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
    name: "Campera EQT Boca Juniors",
    category: "Campera",
    price: "260,000",
    description: "Campera deportiva de ajuste holgado con cuello alto y cierre frontal, que brinda comodidad y elegancia.",
    image: [
      // CORREGIDO: Barras cambiadas a /
      "images/hero-banner.png"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 20,
    badge: "Básico",
    inStock: true
},
  {
    id: 2,
    name: "Camiseta Boxy Minimalist Deep Navy",
    category: "Camisetas",
    price: 22000,
    description: "Silueta relajada boxy fit con hombros ligeramente caídos. Algodón puro teñido en tono marino profundo con costuras reforzadas a tono.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
    sizes: ["M", "L", "XL"],
    rating: 4.8,
    reviewsCount: 24,
    badge: "Nuevo",
    inStock: true
  },
  {
    id: 3,
    name: "Camiseta Essential Slub Gris Melange",
    category: "Camisetas",
    price: 19500,
    description: "Tejido liviano con textura natural slub yarn. Fresca, transpirable y versátil para usar sola o debajo de sobrecamisas y camperas.",
    image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewsCount: 19,
    badge: "",
    inStock: true
  },

  // --- CAMPERAS ---
  {
    id: 4,
    name: "Campera Windbreaker Coastal Minimal",
    category: "Camperas",
    price: 64000,
    description: "Microfibra técnica mate resistente al viento y lluvia ligera. Forro interior de malla transpirable, capucha ajustable y cierres termosellados.",
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviewsCount: 31,
    badge: "Destacado",
    inStock: true
  },
  {
    id: 5,
    name: "Campera Bomber Varsity Twill Marino",
    category: "Camperas",
    price: 79000,
    description: "Twill de algodón premium estructurado con cuello y puños acanalados en punto inglés. Cierre frontal metálico y bolsillos ojal laterales.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    sizes: ["M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 42,
    badge: "Temporada",
    inStock: true
  },
  {
    id: 6,
    name: "Campera Puffer Matte Insulated",
    category: "Camperas",
    price: 89000,
    description: "Aislamiento térmico ultraliviano con acolchado horizontal equilibrado. Acabado textil sin brillo y calce limpio que no añade volumen excesivo.",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 29,
    badge: "",
    inStock: true
  },

  // --- SHORTS ---
  {
    id: 7,
    name: "Short Chino Daily Cotton Arena",
    category: "Shorts",
    price: 27500,
    description: "Gabardina suave de algodón con lavado enzimático. Cintura con presillas, botón de asta vegetal y bolsillos traseros dobles con vivos finos.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
    sizes: ["38", "40", "42", "44", "46"],
    rating: 4.8,
    reviewsCount: 22,
    badge: "Más Vendido",
    inStock: true
  },
  {
    id: 8,
    name: "Short Swim & Leisure Quick-Dry",
    category: "Shorts",
    price: 24000,
    description: "Poliamida de secado ultra rápido con acabado peach-skin suave. Cintura elastizada ancha con cordón de ajuste en algodón trenzado crudo.",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 35,
    badge: "Verano",
    inStock: true
  },
  {
    id: 9,
    name: "Short Terry Lounge Crudo",
    category: "Shorts",
    price: 23000,
    description: "Frisa francesa de algodón rústico sin frizar. Máxima frescura y comodidad para fines de semana, playa o relax diario.",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviewsCount: 16,
    badge: "",
    inStock: true
  },

  // --- PANTALONES ---
  {
    id: 10,
    name: "Pantalón Chino Relaxed Fit Marino",
    category: "Pantalones",
    price: 48000,
    description: "Corte recto relajado con pinzas suaves delanteras. Algodón satinado de 280g con caída impecable tanto para zapatillas como calzado formal.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
    sizes: ["38", "40", "42", "44", "46"],
    rating: 4.9,
    reviewsCount: 47,
    badge: "Destacado",
    inStock: true
  },
  {
    id: 11,
    name: "Jean Denim Straight Raw Indigo",
    category: "Pantalones",
    price: 53000,
    description: "Denim 100% algodón rígido de 13.5 oz teñido con índigo puro. Calce recto atemporal con remaches de cobre y costuras reforzadas en hilo dorado.",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=80",
    sizes: ["38", "40", "42", "44", "46"],
    rating: 4.8,
    reviewsCount: 39,
    badge: "Clásico",
    inStock: true
  },
  {
    id: 12,
    name: "Pantalón Jogger French Terry Gris",
    category: "Pantalones",
    price: 41000,
    description: "Algodón peinado pesado con interior de bucle suave. Cintura ribeteada ajustable y botamanga con puño elástico suave que no aprieta.",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 28,
    badge: "",
    inStock: true
  }
];
