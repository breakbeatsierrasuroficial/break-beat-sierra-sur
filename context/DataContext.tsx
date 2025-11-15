import React, { createContext, useState, useEffect } from 'react';
import { Product, Announcement, DJ, User, Reservation, Prize, PrizeRedemption, PointsHistoryItem, RadioConfig } from '../types';
import { PRODUCTS, ANNOUNCEMENTS, DJS, USERS, RESERVATIONS, PRIZES, PRIZE_REDEMPTIONS } from '../constants';

interface DataContextType {
  // Existing
  products: Product[];
  announcements: Announcement[];
  djs: DJ[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'comments'>) => void;
  updateAnnouncement: (updatedAnnouncement: Announcement) => void;
  deleteAnnouncement: (announcementId: number) => void;
  addDj: (dj: Omit<DJ, 'id'>) => void;
  updateDj: (updatedDj: DJ) => void;
  deleteDj: (djId: number) => void;
  reorderDjs: (djId: number, direction: 'up' | 'down') => void;
  // New
  users: User[];
  reservations: Reservation[];
  prizes: Prize[];
  prizeRedemptions: PrizeRedemption[];
  addUser: (userData: Omit<User, 'id' | 'role' | 'status' | 'profilePictureUrl' | 'registrationDate' | 'points' | 'pointsHistory' | 'eventHistory' | 'reservationHistory' >) => boolean;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: number) => void;
  awardPoints: (userId: number, points: number, reason: string) => void;
  confirmSaleAndAwardPoints: (reservationId: number, points: number) => void;
  redeemPrize: (userId: number, prizeId: number) => boolean;
  addPrize: (prize: Omit<Prize, 'id'>) => void;
  updatePrize: (updatedPrize: Prize) => void;
  deletePrize: (prizeId: number) => void;
  updateRedemptionStatus: (redemptionId: number, status: PrizeRedemption['status']) => void;
  // Radio
  radioConfig: RadioConfig;
  updateRadioConfig: (newConfig: RadioConfig) => void;
}

export const DataContext = createContext<DataContextType>(null!);

export const DataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
    const [djs, setDjs] = useState<DJ[]>(DJS.sort((a, b) => a.order - b.order));
    const [users, setUsers] = useState<User[]>(USERS);
    const [reservations, setReservations] = useState<Reservation[]>(RESERVATIONS);
    const [prizes, setPrizes] = useState<Prize[]>(PRIZES);
    const [prizeRedemptions, setPrizeRedemptions] = useState<PrizeRedemption[]>(PRIZE_REDEMPTIONS);
    const [radioConfig, setRadioConfig] = useState<RadioConfig>({
        streamUrl: "https://stream.ecable.es/8020/stream",
        infoText: "Emitiendo la señal de nuestros amigos de DECIBELIA FM — 94.5 MHz (Jaén)",
        isActive: true,
    });

    // SIMULATE WEEKLY SENIORITY POINTS (CRON JOB)
    useEffect(() => {
        const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
        const weeklyPointsReason = "Antigüedad semanal";
        
        setUsers(currentUsers => currentUsers.map(u => {
            const hasReceivedPointsToday = u.pointsHistory.some(item => item.date === today && item.reason === weeklyPointsReason);
            if (u.role === 'SOCIO' && u.status === 'VERIFIED' && !hasReceivedPointsToday) {
                const pointsToAdd = 10;
                const newHistoryItem: PointsHistoryItem = { date: today, reason: weeklyPointsReason, points: pointsToAdd };
                return { ...u, points: u.points + pointsToAdd, pointsHistory: [newHistoryItem, ...u.pointsHistory] };
            }
            return u;
        }));
    }, []); // Runs once on app load

    // USER FUNCTIONS
    const addUser = (userData: Omit<User, 'id' | 'role' | 'status' | 'profilePictureUrl' | 'registrationDate' | 'points' | 'pointsHistory' | 'eventHistory' | 'reservationHistory' >): boolean => {
        if (users.some(u => u.email === userData.email || u.socioId === userData.socioId)) {
            return false;
        }
        const newUser: User = {
            ...userData,
            id: Date.now(),
            role: 'SOCIO', status: 'PENDING',
            profilePictureUrl: `https://i.pravatar.cc/150?u=${userData.email}`,
            registrationDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            points: 0, pointsHistory: [], eventHistory: [], reservationHistory: [],
        };
        setUsers(prev => [...prev, newUser]);
        return true;
    };
    const updateUser = (updatedUser: User) => {
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    const deleteUser = (userId: number) => {
        setUsers(prev => prev.filter(u => u.id !== userId));
    };

    // POINTS & REWARDS FUNCTIONS
    const awardPoints = (userId: number, points: number, reason: string) => {
        setUsers(prevUsers => prevUsers.map(u => {
            if (u.id === userId) {
                const newHistoryItem: PointsHistoryItem = {
                    date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
                    reason, points
                };
                return { ...u, points: u.points + points, pointsHistory: [newHistoryItem, ...u.pointsHistory] };
            }
            return u;
        }));
    };

    const confirmSaleAndAwardPoints = (reservationId: number, points: number) => {
        const reservation = reservations.find(r => r.id === reservationId);
        if (!reservation) return;

        setReservations(prev => prev.map(r => r.id === reservationId ? { ...r, status: 'CONFIRMED', pointsAwarded: points } : r));
        awardPoints(reservation.userId, points, `Venta confirmada: ${reservation.productName}`);
    };

    const redeemPrize = (userId: number, prizeId: number): boolean => {
        const user = users.find(u => u.id === userId);
        const prize = prizes.find(p => p.id === prizeId);
        if (!user || !prize || !prize.active || user.points < prize.pointsCost || prize.stock <= 0) {
            alert(user && prize ? 'No tienes suficientes puntos o el premio está agotado.' : 'Error al procesar el canje.');
            return false;
        }
        awardPoints(userId, -prize.pointsCost, `Canje: ${prize.name}`);
        setPrizes(prev => prev.map(p => p.id === prizeId ? { ...p, stock: p.stock - 1 } : p));
        const newRedemption: PrizeRedemption = {
            id: Date.now(), prizeId, prizeName: prize.name, userId,
            userName: user.name, socioId: user.socioId,
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            status: 'PENDING'
        };
        setPrizeRedemptions(prev => [newRedemption, ...prev]);
        return true;
    };

    const updateRedemptionStatus = (redemptionId: number, status: PrizeRedemption['status']) => {
        const redemption = prizeRedemptions.find(r => r.id === redemptionId);
        if (!redemption) return;
        
        if (status === 'CANCELED' && redemption.status !== 'CANCELED') {
             const prize = prizes.find(p => p.id === redemption.prizeId);
             if (prize) {
                awardPoints(redemption.userId, prize.pointsCost, `Devolución por canje cancelado: ${prize.name}`);
                setPrizes(prev => prev.map(p => p.id === prize.id ? { ...p, stock: p.stock + 1 } : p));
             }
        }
        setPrizeRedemptions(prev => prev.map(r => r.id === redemptionId ? { ...r, status } : r));
    };

    const addPrize = (prize: Omit<Prize, 'id'>) => {
        const newPrize: Prize = { ...prize, id: Date.now() };
        setPrizes(prev => [newPrize, ...prev]);
    };
    const updatePrize = (updatedPrize: Prize) => {
        setPrizes(prev => prev.map(p => p.id === updatedPrize.id ? updatedPrize : p));
    };
    const deletePrize = (prizeId: number) => {
        setPrizes(prev => prev.filter(p => p.id !== prizeId));
    };

    // RADIO FUNCTIONS
    const updateRadioConfig = (newConfig: RadioConfig) => {
        setRadioConfig(newConfig);
    };

    // --- EXISTING FUNCTIONS ---
    const addProduct = (product: Omit<Product, 'id'>) => setProducts(prev => [{ ...product, id: Date.now() }, ...prev]);
    const updateProduct = (updatedProduct: Product) => setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    const deleteProduct = (productId: number) => setProducts(prev => prev.filter(p => p.id !== productId));
    const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'comments'>) => setAnnouncements(prev => [{ ...announcement, id: Date.now(), comments: [] }, ...prev]);
    const updateAnnouncement = (updatedAnnouncement: Announcement) => setAnnouncements(prev => prev.map(a => a.id === updatedAnnouncement.id ? updatedAnnouncement : a));
    const deleteAnnouncement = (announcementId: number) => setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
    const addDj = (dj: Omit<DJ, 'id'>) => {
        const maxOrder = djs.reduce((max, d) => d.order > max ? d.order : max, 0);
        setDjs(prev => [...prev, { ...dj, id: Date.now(), order: maxOrder + 1 }]);
    };
    const updateDj = (updatedDj: DJ) => setDjs(prev => prev.map(d => d.id === updatedDj.id ? updatedDj : d).sort((a, b) => a.order - b.order));
    const deleteDj = (djId: number) => setDjs(prev => prev.filter(d => d.id !== djId));
    const reorderDjs = (djId: number, direction: 'up' | 'down') => {
        const djIndex = djs.findIndex(d => d.id === djId);
        if (djIndex === -1) return;
        const newDjs = [...djs];
        const djToMove = newDjs[djIndex];
        if (direction === 'up' && djIndex > 0) {
            const djToSwap = newDjs[djIndex - 1];
            [djToMove.order, djToSwap.order] = [djToSwap.order, djToMove.order];
        } else if (direction === 'down' && djIndex < newDjs.length - 1) {
            const djToSwap = newDjs[djIndex + 1];
            [djToMove.order, djToSwap.order] = [djToSwap.order, djToMove.order];
        }
        setDjs(newDjs.sort((a, b) => a.order - b.order));
    };

    return (
        <DataContext.Provider value={{ 
            products, announcements, djs, users, reservations, prizes, prizeRedemptions,
            addProduct, updateProduct, deleteProduct,
            addAnnouncement, updateAnnouncement, deleteAnnouncement,
            addDj, updateDj, deleteDj, reorderDjs,
            addUser, updateUser, deleteUser, awardPoints, confirmSaleAndAwardPoints, redeemPrize,
            addPrize, updatePrize, deletePrize, updateRedemptionStatus,
            radioConfig, updateRadioConfig
        }}>
            {children}
        </DataContext.Provider>
    );
}