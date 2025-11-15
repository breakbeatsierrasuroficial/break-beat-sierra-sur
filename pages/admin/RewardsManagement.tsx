import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Prize, PrizeRedemption } from '../../types';
import Modal from '../../components/Modal';

const PrizeForm: React.FC<{
    prize: Prize | null;
    onClose: () => void;
    onSave: (prizeData: Omit<Prize, 'id'>) => void;
}> = ({ prize, onClose, onSave }) => {
    const [name, setName] = useState(prize?.name || '');
    const [description, setDescription] = useState(prize?.description || '');
    const [imageUrl, setImageUrl] = useState(prize?.imageUrl || '');
    const [pointsCost, setPointsCost] = useState(prize?.pointsCost || 0);
    const [stock, setStock] = useState(prize?.stock || 0);
    const [category, setCategory] = useState(prize?.category || 'Regalos físicos');
    const [active, setActive] = useState(prize?.active ?? true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, description, imageUrl, pointsCost, stock, category, active });
        onClose();
    };

    const commonInputClass = "mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-300">Nombre del Premio</label><input type="text" value={name} onChange={e => setName(e.target.value)} className={commonInputClass} required /></div>
                <div><label className="block text-sm font-medium text-gray-300">URL de la Imagen</label><input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={commonInputClass} placeholder="https://picsum.photos/seed/prize/400/400" required/></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-300">Descripción</label><textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} className={commonInputClass} required /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-300">Coste en Puntos</label><input type="number" value={pointsCost} onChange={e => setPointsCost(Number(e.target.value))} className={commonInputClass} required min="0"/></div>
                <div><label className="block text-sm font-medium text-gray-300">Stock</label><input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} className={commonInputClass} required min="0"/></div>
            </div>
             <div><label className="block text-sm font-medium text-gray-300">Categoría</label><input type="text" value={category} onChange={e => setCategory(e.target.value)} className={commonInputClass} required /></div>
            <div className="flex items-center space-x-3 pt-2">
                <input type="checkbox" id="active" checked={active} onChange={e => setActive(e.target.checked)} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500" />
                <label htmlFor="active" className="text-sm font-medium text-gray-300">Premio Activo (visible para socios)</label>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button type="button" onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancelar</button>
                <button type="submit" className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-md transition-colors">Guardar Premio</button>
            </div>
        </form>
    );
};

const RewardsManagement = () => {
    const { prizes, prizeRedemptions, addPrize, updatePrize, deletePrize, updateRedemptionStatus } = useContext(DataContext);
    const [activeTab, setActiveTab] = useState<'prizes' | 'redemptions'>('prizes');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPrize, setEditingPrize] = useState<Prize | null>(null);

    const handleOpenModal = (prize: Prize | null = null) => {
        setEditingPrize(prize);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPrize(null);
    };

    const handleSavePrize = (prizeData: Omit<Prize, 'id'>) => {
        if (editingPrize) {
            updatePrize({ ...editingPrize, ...prizeData });
        } else {
            addPrize(prizeData);
        }
    };

    const handleDeletePrize = (id: number) => {
        if (window.confirm('¿Seguro que quieres eliminar este premio?')) {
            deletePrize(id);
        }
    };
    
    const handleStatusChange = (redemptionId: number, status: PrizeRedemption['status']) => {
        updateRedemptionStatus(redemptionId, status);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">Gestión de Recompensas</h2>
            <div className="flex border-b border-gray-700 mb-6">
                <button onClick={() => setActiveTab('prizes')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'prizes' ? 'border-b-2 border-green-400 text-green-400' : 'text-gray-400'}`}>Gestión de Premios</button>
                <button onClick={() => setActiveTab('redemptions')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'redemptions' ? 'border-b-2 border-green-400 text-green-400' : 'text-gray-400'}`}>Gestión de Canjes</button>
            </div>

            {activeTab === 'prizes' && (
                <div>
                    <div className="flex justify-end mb-4"><button onClick={() => handleOpenModal()} className="bg-green-500 text-black font-bold py-2 px-4 rounded-md hover:bg-green-400 transition-colors">Añadir Premio</button></div>
                    <div className="bg-gray-900 rounded-lg overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                             <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3">Premio</th>
                                    <th className="px-6 py-3">Coste</th>
                                    <th className="px-6 py-3">Stock</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prizes.map(p => (
                                <tr key={p.id} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                                    <td className="px-6 py-4">{p.pointsCost} pts</td>
                                    <td className="px-6 py-4">{p.stock}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{p.active ? 'Activo' : 'Inactivo'}</span></td>
                                    <td className="px-6 py-4 flex space-x-2"><button onClick={() => handleOpenModal(p)} className="text-blue-400 hover:underline">Editar</button><button onClick={() => handleDeletePrize(p.id)} className="text-red-400 hover:underline">Eliminar</button></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {activeTab === 'redemptions' && (
                <div className="bg-gray-900 rounded-lg overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                         <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                            <tr>
                                <th className="px-6 py-3">Socio</th>
                                <th className="px-6 py-3">Premio</th>
                                <th className="px-6 py-3">Fecha</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prizeRedemptions.map(r => (
                                <tr key={r.id} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-medium text-white">{r.userName} ({r.socioId})</td>
                                    <td className="px-6 py-4">{r.prizeName}</td>
                                    <td className="px-6 py-4">{r.date}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.status === 'DELIVERED' ? 'bg-green-500/20 text-green-400' : r.status === 'CANCELED' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{r.status}</span></td>
                                    <td className="px-6 py-4">
                                        {r.status === 'PENDING' && (
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleStatusChange(r.id, 'DELIVERED')} className="text-green-400 hover:underline">Entregado</button>
                                                <button onClick={() => handleStatusChange(r.id, 'CANCELED')} className="text-red-400 hover:underline">Cancelar</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingPrize ? 'Editar Premio' : 'Añadir Premio'}>
                <PrizeForm prize={editingPrize} onClose={handleCloseModal} onSave={handleSavePrize} />
            </Modal>
        </div>
    );
};

export default RewardsManagement;
