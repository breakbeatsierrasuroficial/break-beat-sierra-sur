import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { Prize } from '../types';
import { GiftIcon, PointsIcon } from '../components/IconComponents';

const PrizeCard: React.FC<{ prize: Prize, userPoints: number, onRedeem: (prizeId: number) => void }> = ({ prize, userPoints, onRedeem }) => {
    const canRedeem = userPoints >= prize.pointsCost && prize.stock > 0;
    const isSoldOut = prize.stock <= 0;

    return (
        <div className={`group relative border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50 flex flex-col ${!prize.active || isSoldOut ? 'opacity-50' : ''}`}>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-900">
                <img
                    src={prize.imageUrl}
                    alt={prize.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                {isSoldOut && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><span className="text-white font-bold text-lg tracking-widest uppercase">Agotado</span></div>}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-white">{prize.name}</h3>
                    <div className="flex items-center text-lg font-semibold text-green-400">
                        <PointsIcon />
                        <span className="ml-1">{prize.pointsCost}</span>
                    </div>
                </div>
                <p className="mt-1 text-sm text-gray-400 flex-grow">{prize.description}</p>
                 <div className="mt-2 text-xs text-gray-500">
                    <span className="font-semibold">Categoría:</span> {prize.category} | <span className="font-semibold">Stock:</span> {prize.stock}
                 </div>
                <button 
                    onClick={() => onRedeem(prize.id)}
                    disabled={!canRedeem}
                    className="w-full mt-6 bg-green-500/80 text-black font-bold py-2.5 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-green-500 enabled:shadow-lg enabled:shadow-green-500/10"
                >
                    {isSoldOut ? 'Agotado' : (userPoints < prize.pointsCost ? 'Puntos insuficientes' : 'Canjear Premio')}
                </button>
            </div>
        </div>
    );
};


const Prizes: React.FC = () => {
    const { prizes, redeemPrize } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    if (!user) return null;

    const handleRedeem = (prizeId: number) => {
        if (window.confirm('¿Seguro que quieres canjear este premio? Se restarán los puntos de tu cuenta.')) {
            const success = redeemPrize(user.id, prizeId);
            if (success) {
                alert('¡Premio canjeado con éxito! Revisa tu historial de canjes en "Mi Perfil".');
            } else {
                alert('No se pudo canjear el premio. Revisa tus puntos o el stock disponible.');
            }
        }
    };
    
    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-green-400">Tienda de Premios</h2>
                <p className="text-gray-400 mt-2">Usa tus puntos para canjear recompensas exclusivas.</p>
                <div className="inline-flex items-center mt-4 bg-gray-800/50 border border-green-500/20 px-4 py-2 rounded-full">
                    <span className="text-gray-400 mr-2">Tus Puntos:</span>
                    <span className="text-2xl font-bold text-green-400">{user.points}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {prizes.filter(p => p.active).map(prize => (
                    <PrizeCard key={prize.id} prize={prize} userPoints={user.points} onRedeem={handleRedeem} />
                ))}
            </div>
        </div>
    );
};

export default Prizes;
