export type Page = 'anuncios' | 'djs' | 'radio' | 'merch' | 'perfil' | 'premios';

export type UserRole = 'SOCIO' | 'ADMIN';
export type UserStatus = 'PENDING' | 'VERIFIED';

export interface PointsHistoryItem {
  date: string;
  reason: string;
  points: number;
}

export interface EventHistoryItem {
    eventId: number;
    eventName: string;
    date: string;
}

export interface ReservationHistoryItem {
    reservationId: number;
    productName: string;
    size: string;
    quantity: number;
    date: string;
}

export interface User {
  id: number;
  socioId: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  profilePictureUrl: string;
  registrationDate: string;
  points: number;
  pointsHistory: PointsHistoryItem[];
  eventHistory: EventHistoryItem[];
  reservationHistory: ReservationHistoryItem[];
}

export interface Comment {
  id: number;
  author: string;
  avatarUrl: string;
  date: string;
  text: string;
  authorId: number | null;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  publishDate: string;
  comments: Comment[];
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  mixcloud?: string;
}

export interface MusicLinks {
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
}

export interface DJ {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
  socials: SocialLinks;
  music: MusicLinks;
  presskitUrl: string;
  style?: string;
  sessionsUrl?: string;
  order: number;
  phone?: string;
  bookingEmail?: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: string[];
  stock: { [size: string]: number };
  active: boolean;
}

export interface Reservation {
    id: number;
    productId: number;
    productName: string;
    size: string;
    quantity: number;
    userId: number;
    userName: string;
    socioId: string;
    userEmail: string;
    date: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELED';
    pointsAwarded: number | null;
}

export interface Event {
    id: number;
    name: string;
    date: string;
    points: number;
}

export interface Prize {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    pointsCost: number;
    stock: number;
    category: string;
    active: boolean;
}

export interface PrizeRedemption {
    id: number;
    prizeId: number;
    prizeName: string;
    userId: number;
    userName: string;
    socioId: string;
    date: string;
    status: 'PENDING' | 'DELIVERED' | 'CANCELED';
}

export interface RadioConfig {
    streamUrl: string;
    infoText: string;
    isActive: boolean;
}