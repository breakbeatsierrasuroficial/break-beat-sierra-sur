import { Announcement, DJ, Product, User, Reservation, Event, Prize, PrizeRedemption } from './types';

export const USERS: User[] = [
    { 
        id: 101,
        socioId: "S001",
        name: "RaverX",
        email: "raverx@email.com",
        phone: "611223344",
        role: 'SOCIO',
        status: 'VERIFIED',
        profilePictureUrl: "https://i.pravatar.cc/150?u=raverx@email.com",
        registrationDate: "10 de Octubre, 2023",
        points: 280,
        pointsHistory: [
            { date: "02 de Enero, 2024", reason: "Antigüedad semanal", points: 10 },
            { date: "28 de Diciembre, 2023", reason: "Canje de premio: Gorra Exclusiva BSS", points: -150 },
            { date: "25 de Diciembre, 2023", reason: "Asistencia a NEON JUNGLE", points: 100 },
            { date: "15 de Noviembre, 2023", reason: "Participación activa en foro", points: 50 },
            { date: "01 de Noviembre, 2023", reason: "Venta confirmada: Camiseta Logo BSS", points: 270 },
        ],
        eventHistory: [
            { eventId: 1, eventName: "NEON JUNGLE", date: "25 de Diciembre, 2023" },
        ],
        reservationHistory: [
            { reservationId: 1, productName: "Camiseta Logo BSS", size: "L", quantity: 1, date: "01 de Noviembre, 2023" }
        ],
    },
    { 
        id: 102,
        socioId: "S002",
        name: "AcidQueen",
        email: "acidqueen@email.com",
        role: 'SOCIO',
        status: 'VERIFIED',
        profilePictureUrl: "https://i.pravatar.cc/150?u=acidqueen@email.com",
        registrationDate: "12 de Octubre, 2023",
        points: 150,
        pointsHistory: [
            { date: "25 de Diciembre, 2023", reason: "Asistencia a NEON JUNGLE", points: 100 },
            { date: "10 de Noviembre, 2023", reason: "Reserva Merch 'Neon Jungle'", points: 50 },
        ],
        eventHistory: [
             { eventId: 1, eventName: "NEON JUNGLE", date: "25 de Diciembre, 2023" },
        ],
        reservationHistory: [
            { reservationId: 2, productName: "Sudadera 'Neon Jungle'", size: "M", quantity: 1, date: "10 de Noviembre, 2023" }
        ],
    },
    { 
        id: 103,
        socioId: "S003",
        name: "DJ_Breaker",
        email: "breaker@email.com",
        role: 'SOCIO',
        status: 'PENDING',
        profilePictureUrl: "https://i.pravatar.cc/150?u=breaker@email.com",
        registrationDate: "01 de Noviembre, 2024",
        points: 0,
        pointsHistory: [],
        eventHistory: [],
        reservationHistory: [],
    },
    { 
        id: 104,
        socioId: "S004",
        name: "NewbieRaver",
        email: "newbie@email.com",
        phone: "600112233",
        role: 'SOCIO',
        status: 'PENDING',
        profilePictureUrl: "https://i.pravatar.cc/150?u=newbie@email.com",
        registrationDate: "15 de Noviembre, 2024",
        points: 0,
        pointsHistory: [],
        eventHistory: [],
        reservationHistory: [],
    },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "PRÓXIMO EVENTO: NEON JUNGLE",
    content: "Prepárense para una noche inolvidable en el corazón de la sierra. El 25 de Diciembre, transformaremos el bosque en una jungla de neón con los mejores ritmos de breakbeat, dnb y techno. Contaremos con un line-up de lujo y un sistema de sonido que hará temblar la tierra. ¡No te quedes fuera!",
    imageUrl: "https://picsum.photos/seed/rave1/800/400",
    publishDate: "15 de Noviembre, 2024",
    comments: [
      { id: 1, author: "RaverX", authorId: 101, avatarUrl: "https://i.pravatar.cc/150?u=raverx@email.com", date: "15 de Noviembre, 2024", text: "¡Qué ganas! 🔥🔥🔥" },
      { id: 2, author: "AcidQueen", authorId: 102, avatarUrl: "https://i.pravatar.cc/150?u=acidqueen@email.com", date: "16 de Noviembre, 2024", text: "Allí estaremos dándolo todo. ¿Se sabe ya el line-up completo?" },
    ],
  },
  {
    id: 2,
    title: "NUEVO MERCH DISPONIBLE",
    content: "¡Ya está aquí la nueva colección de merchandising de BREAKBEAT SIERRA SUR! Camisetas, sudaderas y gorras con diseños exclusivos para que lleves el espíritu del colectivo a todas partes. Unidades limitadas. Visita la sección 'Merch' y haz tu reserva.",
    imageUrl: "https://picsum.photos/seed/merch1/800/400",
    publishDate: "10 de Noviembre, 2024",
    comments: [
      { id: 3, author: "DJ_Breaker", authorId: 103, avatarUrl: "https://i.pravatar.cc/150?u=breaker@email.com", date: "10 de Noviembre, 2024", text: "¡Brutal el diseño de la camiseta!" },
    ],
  },
];

export const DJS: DJ[] = [
  {
    id: 1,
    name: "CYBERPUNK",
    bio: "Residente y fundador de Breakbeat Sierra Sur. Sus sesiones son un viaje a través de los ritmos rotos, mezclando breakbeat clásico con sonidos futuristas y bajos contundentes. Una garantía de energía en la pista de baile.",
    imageUrl: "https://picsum.photos/seed/dj1/400/400",
    socials: {
      instagram: "#",
      facebook: "#",
    },
    music: {
      soundcloud: "#",
      spotify: "#",
    },
    presskitUrl: "/presskit_cyberpunk.zip",
    style: "Breakbeat / Bass Music",
    order: 1,
    phone: "666-111-222",
    bookingEmail: "cyberpunk@bss-booking.com"
  },
  {
    id: 2,
    name: "NEØN",
    bio: "Especialista en Drum and Bass y Neurofunk. NEØN es conocida por sus mezclas técnicas y su selección musical vanguardista. Sus sets son una descarga de adrenalina que no deja a nadie indiferente.",
    imageUrl: "https://picsum.photos/seed/dj2/400/400",
    socials: {
      instagram: "#",
      tiktok: "#"
    },
    music: {
      soundcloud: "#",
      youtube: "#",
    },
    presskitUrl: "/presskit_neon.zip",
    style: "Drum & Bass / Neurofunk",
    order: 2,
  },
  {
    id: 3,
    name: "VOID",
    bio: "El lado más oscuro y profundo del colectivo. VOID explora los paisajes sonoros del techno industrial y el acid techno. Sus sesiones son hipnóticas, potentes y diseñadas para la introspección en la pista.",
    imageUrl: "https://picsum.photos/seed/dj3/400/400",
    socials: {
      instagram: "#",
    },
    music: {
        soundcloud: "#",
    },
    presskitUrl: "/presskit_void.zip",
    order: 3,
  },
];

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Camiseta Logo BSS",
        price: "25€",
        description: "Camiseta de algodón 100% orgánico con el logo clásico de BREAKBEAT SIERRA SUR en el pecho. Corte unisex.",
        images: ["https://picsum.photos/seed/shirt1/600/600", "https://picsum.photos/seed/shirt2/600/600"],
        stock: { "S": 10, "M": 15, "L": 5, "XL": 0 },
        active: true,
    },
    {
        id: 4,
        name: "Camiseta BreakBeat Sierra Sur – Edición Verde",
        price: "25€",
        description: "Camiseta negra con diseño exclusivo inspirado en la Sierra Sur, vinilos, altavoces y DJ. Colores verde neón y estilo rave.",
        images: ["https://picsum.photos/seed/greentshirt/600/600", "https://picsum.photos/seed/greentshirt2/600/600"],
        stock: { "S": 20, "M": 30, "L": 30, "XL": 25, "XXL": 15 },
        active: true,
    },
    {
        id: 2,
        name: "Sudadera 'Neon Jungle'",
        price: "50€",
        description: "Sudadera con capucha y diseño exclusivo del evento 'Neon Jungle'. Perfecta para las noches más frías en la sierra.",
        images: ["https://picsum.photos/seed/hoodie1/600/600", "https://picsum.photos/seed/hoodie2/600/600"],
        stock: { "M": 8, "L": 12, "XL": 3 },
        active: true,
    },
    {
        id: 3,
        name: "Gorra BSS",
        price: "20€",
        description: "Gorra tipo 'trucker' con el logo de BSS bordado en el frontal. Ajustable y transpirable.",
        images: ["https://picsum.photos/seed/cap1/600/600", "https://picsum.photos/seed/cap2/600/600"],
        stock: { "Talla Única": 0 },
        active: false,
    },
];

export const RESERVATIONS: Reservation[] = [
    { id: 1, productId: 1, productName: "Camiseta Logo BSS", size: "L", quantity: 1, userId: 101, userName: "RaverX", socioId: "S001", userEmail: "raverx@email.com", date: "01 de Noviembre, 2023", status: "CONFIRMED", pointsAwarded: 270 },
    { id: 2, productId: 2, productName: "Sudadera 'Neon Jungle'", size: "M", quantity: 1, userId: 102, userName: "AcidQueen", socioId: "S002", userEmail: "acidqueen@email.com", date: "10 de Noviembre, 2023", status: "PENDING", pointsAwarded: null },
];

export const EVENTS: Event[] = [
    { id: 1, name: "NEON JUNGLE", date: "25 de Diciembre, 2023", points: 100 },
    { id: 2, name: "INDUSTRIAL DECAY", date: "15 de Enero, 2024", points: 150 },
];

export const PRIZES: Prize[] = [
    {
        id: 1,
        name: "Gorra Exclusiva BSS",
        description: "Gorra trucker de edición limitada con el logo bordado. Solo para socios.",
        imageUrl: "https://picsum.photos/seed/prize1/400/400",
        pointsCost: 150,
        stock: 20,
        category: "Regalos físicos",
        active: true,
    },
    {
        id: 2,
        name: "Descuento 10% en Merch",
        description: "Obtén un 10% de descuento en tu próxima compra de merchandising.",
        imageUrl: "https://picsum.photos/seed/prize2/400/400",
        pointsCost: 50,
        stock: 100,
        category: "Descuentos",
        active: true,
    },
    {
        id: 3,
        name: "Entrada VIP Próximo Evento",
        description: "Acceso a la zona VIP en el próximo evento oficial de BSS. Incluye una consumición.",
        imageUrl: "https://picsum.photos/seed/prize3/400/400",
        pointsCost: 500,
        stock: 5,
        category: "Exclusivos VIP",
        active: false,
    }
];

export const PRIZE_REDEMPTIONS: PrizeRedemption[] = [
    {
        id: 1,
        prizeId: 1,
        prizeName: "Gorra Exclusiva BSS",
        userId: 101,
        userName: "RaverX",
        socioId: "S001",
        date: "28 de Diciembre, 2023",
        status: 'DELIVERED'
    }
];