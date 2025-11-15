import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Page } from '../types';
import VerificationBanner from '../components/VerificationBanner';

import Profile from './socio/Profile';
import Announcements from './Announcements';
import Djs from './Djs';
import Radio from './Radio';
import Merch from './Merch';
import Prizes from './Prizes';

import { UserIcon, AnnounceIcon, DjIcon, RadioIcon, MerchIcon, LogoutIcon, GiftIcon } from '../components/IconComponents';

const SocioPanel: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('perfil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const renderContent = () => {
    switch (activePage) {
      case 'perfil':
        return <Profile />;
      case 'anuncios':
        return <Announcements />;
      case 'djs':
        return <Djs />;
      case 'radio':
        return <Radio />;
      case 'merch':
        return <Merch />;
      case 'premios':
        return <Prizes />;
      default:
        return <Profile />;
    }
  };
  
  const NavItem: React.FC<{page: Page, children: React.ReactNode, icon: React.ReactNode}> = ({ page, children, icon }) => {
    const isActive = activePage === page;
    return (
        <button 
            onClick={() => {
                setActivePage(page);
                setIsMenuOpen(false);
            }}
            className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive ? 'bg-green-500/10 text-green-400' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
            }`}
        >
            {icon}
            {children}
        </button>
    );
  }

  const navItems = [
      { page: 'perfil', label: 'Mi Perfil', icon: <UserIcon /> },
      { page: 'anuncios', label: 'Anuncios', icon: <AnnounceIcon /> },
      { page: 'djs', label: 'Nuestros DJs', icon: <DjIcon /> },
      { page: 'radio', label: 'Emisora', icon: <RadioIcon /> },
      { page: 'merch', label: 'Merch', icon: <MerchIcon /> },
      { page: 'premios', label: 'Canjear Premios', icon: <GiftIcon /> },
  ]

  const SidebarContent = () => (
     <div className="flex flex-col h-full">
        <div className="px-4 pt-4">
            <h1 className="text-xl font-black tracking-wider text-green-400 uppercase">
                Breakbeat Sierra Sur
            </h1>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-2">
            {navItems.map(item => <NavItem key={item.page} page={item.page as Page} icon={item.icon}>{item.label}</NavItem>)}
        </nav>
        <div className="px-2 pb-4">
             <button
                onClick={logout}
                className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md text-gray-400 hover:bg-red-500/20 hover:text-red-400"
              >
                <LogoutIcon />
                Cerrar Sesión
            </button>
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-black flex text-gray-300">
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900 border-r border-gray-800">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0 w-64 bg-gray-900 border-r border-gray-800">
        <SidebarContent />
      </aside>

      <div className="flex flex-col flex-1">
        <div className="md:hidden sticky top-0 z-30 flex justify-between items-center p-2 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
            <h1 className="text-lg font-black tracking-wider text-green-400 uppercase">BSS</h1>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </div>
        {user?.status === 'PENDING' && <VerificationBanner />}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SocioPanel;