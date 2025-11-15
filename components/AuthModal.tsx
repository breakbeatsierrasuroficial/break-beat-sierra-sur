import React, { useState, useContext } from 'react';
import Modal from './Modal';
import { AuthContext } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'socio' | 'admin';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState<'socio' | 'admin'>(initialMode);
  const [socioMode, setSocioMode] = useState<'login' | 'register'>('login');
  
  React.useEffect(() => {
    setMode(initialMode);
    setSocioMode('login');
  }, [initialMode, isOpen]);
  
  const { login, adminLogin, register } = useContext(AuthContext);

  // Socio Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Socio Register State
  const [regSocioId, setRegSocioId] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');
  
  // Admin Login State
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  
  const [error, setError] = useState('');

  const handleSocioLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(loginEmail, loginPass);
    if (success) {
      onClose();
    } else {
      setError('Credenciales de socio incorrectas.');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = adminLogin(adminUser, adminPass);
    if (success) {
      onClose();
    } else {
      setError('Credenciales de administrador incorrectas.');
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      const success = register({ socioId: regSocioId, name: regName, email: regEmail, phone: regPhone });
      if (success) {
          alert('¡Registro completado! Tu cuenta está pendiente de verificación por un administrador.');
          onClose();
      } else {
          setError('Error en el registro. Revisa los datos.');
      }
  }

  const commonInputClass = "mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

  const renderSocioForm = () => (
    <div>
        <div className="flex border-b border-gray-700">
            <button onClick={() => setSocioMode('login')} className={`py-2 px-4 text-sm font-medium ${socioMode === 'login' ? 'border-b-2 border-green-400 text-green-400' : 'text-gray-400'}`}>Iniciar Sesión</button>
            <button onClick={() => setSocioMode('register')} className={`py-2 px-4 text-sm font-medium ${socioMode === 'register' ? 'border-b-2 border-green-400 text-green-400' : 'text-gray-400'}`}>Registrarse</button>
        </div>
        <div className="pt-4">
            {socioMode === 'login' ? (
                <form onSubmit={handleSocioLogin} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className={commonInputClass} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Contraseña</label>
                        <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} className={commonInputClass} required />
                    </div>
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-md">Entrar</button>
                </form>
            ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-300">ID de Socio</label>
                        <input type="text" value={regSocioId} onChange={e => setRegSocioId(e.target.value)} className={commonInputClass} required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Nombre Completo</label>
                        <input type="text" value={regName} onChange={e => setRegName(e.target.value)} className={commonInputClass} required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} className={commonInputClass} required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Teléfono (Opcional)</label>
                        <input type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} className={commonInputClass} />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Contraseña</label>
                        <input type="password" value={regPass} onChange={e => setRegPass(e.target.value)} className={commonInputClass} required />
                    </div>
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-md">Crear Cuenta</button>
                </form>
            )}
        </div>
    </div>
  );

  const renderAdminForm = () => (
    <div>
        <p className="text-sm text-gray-400 mb-4">Acceso exclusivo para la gestión de la plataforma.</p>
        <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Usuario</label>
                <input type="text" value={adminUser} onChange={e => setAdminUser(e.target.value)} className={commonInputClass} required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Contraseña</label>
                <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} className={commonInputClass} required />
            </div>
            <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">Entrar</button>
        </form>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="flex justify-center border-b border-gray-700 mb-4">
        <button onClick={() => setMode('socio')} className={`flex-1 text-center pb-2 font-bold ${mode === 'socio' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-500'}`}>
          ACCESO SOCIOS
        </button>
        <button onClick={() => setMode('admin')} className={`flex-1 text-center pb-2 font-bold ${mode === 'admin' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-500'}`}>
          ACCESO ADMIN
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {mode === 'socio' ? renderSocioForm() : renderAdminForm()}
    </Modal>
  );
};

export default AuthModal;