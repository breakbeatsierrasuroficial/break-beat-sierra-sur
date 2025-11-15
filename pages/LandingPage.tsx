import React from 'react';

interface LandingPageProps {
    onOpenAuthModal: (mode: 'socio' | 'admin') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuthModal }) => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
            {/* Animated background elements for aesthetic */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                 <h1 className="text-4xl sm:text-6xl font-black tracking-wider text-green-400 uppercase">
                    Breakbeat Sierra Sur
                </h1>
                <p className="text-gray-400 mt-4 max-w-lg">
                    La plataforma del colectivo. Accede para ver anuncios, escuchar nuestra radio, y conectar con la comunidad.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                     <button
                        onClick={() => onOpenAuthModal('socio')}
                        className="w-64 px-6 py-3 text-lg font-bold rounded-md transition-all duration-300 bg-green-500/80 text-white hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105"
                    >
                        Acceso Socios
                    </button>
                    <button
                        onClick={() => onOpenAuthModal('admin')}
                        className="w-64 px-6 py-3 text-lg font-bold rounded-md transition-all duration-300 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transform hover:scale-105"
                    >
                        Acceso Administrador
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;