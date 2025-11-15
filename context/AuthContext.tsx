import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types';
import { DataContext } from './DataContext';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  adminLogin: (user: string, pass: string) => boolean;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'role' | 'status' | 'profilePictureUrl' | 'registrationDate' | 'points' | 'pointsHistory' | 'eventHistory' | 'reservationHistory' >) => boolean;
  updateUser: (updatedUser: User) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const dataContext = useContext(DataContext);
  
  if (!dataContext) {
    // This can happen if DataProvider is not an ancestor.
    // The new structure in App.tsx should prevent this.
    // Render a loading state or null until the context is available.
    return <div>Cargando...</div>; 
  }

  const { users, addUser, updateUser: updateUserData } = dataContext;
  
  // Check for a logged-in user in localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      // Find the most up-to-date user data from our central "DB"
      const freshUser = users.find(u => u.id === parsedUser.id);
      setUser(freshUser || null);
    }
  }, []); // Note: users dependency is removed to prevent re-running on every data change, sync is handled below.

  // This effect syncs the logged-in user's state with the global user list from DataContext
  useEffect(() => {
    if (user) {
      const freshUser = users.find(u => u.id === user.id);
      // Check if the user data in DataContext is different from the local state
      if (freshUser && JSON.stringify(freshUser) !== JSON.stringify(user)) {
        setUser(freshUser);
        localStorage.setItem('authUser', JSON.stringify(freshUser));
      }
    }
  }, [users, user]);

  const login = (email: string, pass: string): boolean => {
    // In a real app, you'd check the password hash
    const foundUser = users.find(u => u.email === email && u.role === 'SOCIO');
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('authUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };
  
  const updateUser = (updatedUser: User) => {
      // This function now updates the central data store
      updateUserData(updatedUser);
      // The useEffect above will handle updating the local `user` state reactively.
  };

  const adminLogin = (username: string, pass: string): boolean => {
    if (username === 'Admin2025' && pass === 'Sierrasur2025') {
      const adminUser: User = {
        id: 999,
        name: 'Admin',
        email: 'admin@bss.com',
        role: 'ADMIN',
        socioId: 'ADMIN01',
        status: 'VERIFIED',
        profilePictureUrl: '',
        registrationDate: '',
        points: 0,
        pointsHistory: [],
        eventHistory: [],
        reservationHistory: []
      };
      setUser(adminUser);
      localStorage.setItem('authUser', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const register = (userData: Omit<User, 'id' | 'role' | 'status' | 'profilePictureUrl' | 'registrationDate' | 'points' | 'pointsHistory' | 'eventHistory' | 'reservationHistory' >): boolean => {
    const success = addUser(userData);
    if (!success) {
      alert("El email o ID de socio ya está en uso.");
    }
    return success;
  };

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;