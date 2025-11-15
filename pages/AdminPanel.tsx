import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserManagement from './admin/UserManagement';
import AnnouncementManagement from './admin/AnnouncementManagement';
import MerchManagement from './admin/MerchManagement';
import DjManagement from './admin/DjManagement';
import AiBuilder from './admin/AiBuilder';
import RewardsManagement from './admin/RewardsManagement';
import RadioManagement from './admin/RadioManagement';
import { AiBuilderIcon, RadioIcon } from '../components/IconComponents';


type AdminPage = 'users' | 'announcements' | 'merch' | 'djs' | 'rewards' | 'aiBuilder' | 'radio';

const AdminPanel: React.FC = () => {
  const [page, setPage] = useState<AdminPage>('users');
  const { user, logout } = useContext(AuthContext);

  const renderContent = () => {
    switch (page) {
      case 'users':
        return <UserManagement />;
      case 'announcements':
        return <AnnouncementManagement />;
      case 'merch':
        return <MerchManagement />;
      case 'djs':
        return <DjManagement />;
      case 'rewards':
        return <RewardsManagement />;
      case 'radio':
        return <RadioManagement />;
      case 'aiBuilder':
        return <AiBuilder />;
      default:
        return <UserManagement />;
    }
  };

  const NavItem: React.FC<{id: AdminPage, children: React.ReactNode, icon?: React.ReactNode}> = ({ id, children, icon }) => (
    <button onClick={() => setPage(id)} className={`w-full flex items-center text-left px-4 py-2 rounded-md transition-colors ${page === id ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:bg-gray-700'}`}>
        {icon}
        {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-gray-300 flex">
      <aside className="w-64 bg-gray-900 p-4 border-r border-gray-800 flex flex-col">
        <h1 className="text-2xl font-black tracking-wider text-green-400 uppercase mb-8">
            Admin Panel
        </h1>
        <nav className="flex flex-col space-y-2 flex-grow">
            <NavItem id="users">Gestión de Socios</NavItem>
            <NavItem id="announcements">Gestión de Anuncios</NavItem>
            <NavItem id="merch">Gestión de Merch</NavItem>
            <NavItem id="djs">Gestión de DJs</NavItem>
            <NavItem id="rewards">Gestión de Recompensas</NavItem>
            <NavItem id="radio">Gestión de Radio</NavItem>
            <NavItem id="aiBuilder" icon={<AiBuilderIcon />}>AI Builder</NavItem>
        </nav>
        <div>
            <p className="text-sm text-gray-500">Logueado como {user?.name}</p>
            <button onClick={logout} className="w-full mt-2 text-left px-4 py-2 rounded-md hover:bg-red-500/20 hover:text-red-400">
                Logout
            </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;