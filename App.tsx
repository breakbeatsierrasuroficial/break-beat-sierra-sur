import React, { useState, useContext } from 'react';
import Announcements from './pages/Announcements';
import Djs from './pages/Djs';
import Radio from './pages/Radio';
import Merch from './pages/Merch';
import AdminPanel from './pages/AdminPanel';
import AuthModal from './components/AuthModal';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Page } from './types';
import LandingPage from './pages/LandingPage';
import VerificationBanner from './components/VerificationBanner';
import SocioPanel from './pages/SocioPanel';

const AppContent: React.FC = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'socio' | 'admin'>('socio');
  const { user } = useContext(AuthContext);

  const handleOpenAuthModal = (mode: 'socio' | 'admin') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };
  
  const handleCloseAuthModal = () => {
      setAuthModalOpen(false);
  }

  if (!user) {
    return (
      <>
        <LandingPage onOpenAuthModal={handleOpenAuthModal} />
        <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={handleCloseAuthModal}
            initialMode={authInitialMode}
        />
      </>
    );
  }

  if (user.role === 'ADMIN') {
    return <AdminPanel />;
  }
  
  // User is a SOCIO
  return <SocioPanel />;
};


const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DataProvider>
  );
};


export default App;