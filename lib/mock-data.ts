// Mock data para la demo

export interface Participant {
  id: string
  name: string
  email: string
  budget: number
  preferences: string[]
  links: { url: string; title: string }[]
  notes: string
  assignedTo: string | null
  status: "completo" | "pendiente"
}

export interface Exchange {
  id: string
  name: string
  eventType: string
  preferenceDeadline: string
  exchangeDate: string
  budgetMin: number
  budgetMax: number
  participants: Participant[]
}

export interface Notification {
  id: string
  participantId: string
  type: "preferencias" | "presupuesto" | "recordatorio" | "sistema"
  message: string
  timestamp: string
  read: boolean
}

export interface GiftSuggestion {
  id: string
  name: string
  price: number
  imageUrl: string
  externalLink: string
  platform: string
  matchedKeywords: string[]
}

export const mockExchange: Exchange = {
  id: "demo",
  name: "Navidad Familia 2024",
  eventType: "Navidad",
  preferenceDeadline: "2024-12-15",
  exchangeDate: "2024-12-24",
  budgetMin: 500,
  budgetMax: 1500,
  participants: [
    {
      id: "p1",
      name: "María González",
      email: "maria@example.com",
      budget: 1200,
      preferences: ["Libros de ficción", "Velas aromáticas", "Café gourmet"],
      links: [
        { url: "https://amazon.com/example1", title: "Libro: El Alquimista" },
        { url: "https://mercadolibre.com/example2", title: "Set de velas" },
      ],
      notes: "Me encantan los aromas cítricos y las historias de aventura",
      assignedTo: "p2",
      status: "completo",
    },
    {
      id: "p2",
      name: "Carlos Ruiz",
      email: "carlos@example.com",
      budget: 1000,
      preferences: ["Electrónicos", "Gadgets", "Audífonos"],
      links: [{ url: "https://amazon.com/example3", title: "Audífonos inalámbricos" }],
      notes: "Prefiero colores oscuros y tecnología",
      assignedTo: "p3",
      status: "completo",
    },
    {
      id: "p3",
      name: "Ana Martínez",
      email: "ana@example.com",
      budget: 800,
      preferences: ["Plantas", "Decoración para el hogar", "Arte"],
      links: [],
      notes: "Estilo minimalista, me gustan las suculentas",
      assignedTo: "p4",
      status: "pendiente",
    },
    {
      id: "p4",
      name: "Luis Fernández",
      email: "luis@example.com",
      budget: 1500,
      preferences: ["Deportes", "Ropa deportiva", "Accesorios de gimnasio"],
      links: [{ url: "https://nike.com/example", title: "Tenis Nike" }],
      notes: "Talla M, corro maratones",
      assignedTo: "p5",
      status: "completo",
    },
    {
      id: "p5",
      name: "Sofía López",
      email: "sofia@example.com",
      budget: 1100,
      preferences: ["Cocina", "Recetarios", "Utensilios"],
      links: [
        { url: "https://amazon.com/example4", title: "Set de cuchillos" },
        { url: "https://mercadolibre.com/example5", title: "Recetario mexicano" },
      ],
      notes: "Me encanta hornear y cocinar comida tradicional",
      assignedTo: "p1",
      status: "completo",
    },
  ],
}

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    participantId: "p1",
    type: "preferencias",
    message: "María actualizó sus preferencias y agregó 2 enlaces nuevos",
    timestamp: "2024-12-10T14:30:00",
    read: false,
  },
  {
    id: "n2",
    participantId: "p1",
    type: "presupuesto",
    message: "María ajustó su presupuesto a $1,200",
    timestamp: "2024-12-09T10:15:00",
    read: false,
  },
  {
    id: "n3",
    participantId: "p1",
    type: "recordatorio",
    message: "Fecha límite de preferencias: 5 días restantes",
    timestamp: "2024-12-08T09:00:00",
    read: true,
  },
  {
    id: "n4",
    participantId: "p1",
    type: "sistema",
    message: "Te fue asignado María González para el intercambio",
    timestamp: "2024-12-01T08:00:00",
    read: true,
  },
]

export const mockGiftSuggestions: GiftSuggestion[] = [
  {
    id: "g1",
    name: "El Alquimista - Paulo Coelho",
    price: 350,
    imageUrl: "/book-el-alquimista.jpg",
    externalLink: "https://amazon.com.mx/example1",
    platform: "Amazon",
    matchedKeywords: ["Libros de ficción"],
  },
  {
    id: "g2",
    name: "Set de Velas Aromáticas - Cítricos",
    price: 450,
    imageUrl: "/aromatic-candles-set.jpg",
    externalLink: "https://mercadolibre.com.mx/example2",
    platform: "Mercado Libre",
    matchedKeywords: ["Velas aromáticas"],
  },
  {
    id: "g3",
    name: "Café Gourmet Premium 500g",
    price: 280,
    imageUrl: "/gourmet-coffee-beans.jpg",
    externalLink: "https://amazon.com.mx/example3",
    platform: "Amazon",
    matchedKeywords: ["Café gourmet"],
  },
  {
    id: "g4",
    name: "Cien Años de Soledad - García Márquez",
    price: 380,
    imageUrl: "/book-cien-anos-soledad.jpg",
    externalLink: "https://gandhi.com.mx/example4",
    platform: "Gandhi",
    matchedKeywords: ["Libros de ficción"],
  },
  {
    id: "g5",
    name: "Difusor de Aromas con Aceites",
    price: 550,
    imageUrl: "/aroma-diffuser-zen.png",
    externalLink: "https://liverpool.com.mx/example5",
    platform: "Liverpool",
    matchedKeywords: ["Velas aromáticas"],
  },
  {
    id: "g6",
    name: "Set de Regalo - Café + Taza",
    price: 420,
    imageUrl: "/coffee-gift-set.jpg",
    externalLink: "https://amazon.com.mx/example6",
    platform: "Amazon",
    matchedKeywords: ["Café gourmet"],
  },
]
