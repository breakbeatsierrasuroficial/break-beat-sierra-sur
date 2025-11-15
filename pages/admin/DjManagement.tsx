import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { DJ } from '../../types';
import Modal from '../../components/Modal';
import { ArrowUpIcon, ArrowDownIcon } from '../../components/IconComponents';

const DjForm: React.FC<{
    dj: DJ | null;
    onClose: () => void;
    onSave: (djData: Omit<DJ, 'id' | 'order'>, djId?: number) => void;
}> = ({ dj, onClose, onSave }) => {
    
    const [formData, setFormData] = useState({
        name: dj?.name || '',
        bio: dj?.bio || '',
        imageUrl: dj?.imageUrl || '',
        style: dj?.style || '',
        sessionsUrl: dj?.sessionsUrl || '',
        presskitUrl: dj?.presskitUrl || '',
        instagram: dj?.socials.instagram || '',
        tiktok: dj?.socials.tiktok || '',
        facebook: dj?.socials.facebook || '',
        mixcloud: dj?.socials.mixcloud || '',
        soundcloud: dj?.music.soundcloud || '',
        youtube: dj?.music.youtube || '',
        spotify: dj?.music.spotify || '',
        phone: dj?.phone || '',
        bookingEmail: dj?.bookingEmail || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, bio, imageUrl, style, sessionsUrl, presskitUrl, instagram, tiktok, facebook, mixcloud, soundcloud, youtube, spotify, phone, bookingEmail } = formData;
        const djData: Omit<DJ, 'id' | 'order'> = {
            name, bio, imageUrl, style, sessionsUrl, presskitUrl, phone, bookingEmail,
            socials: { instagram, tiktok, facebook, mixcloud },
            music: { soundcloud, youtube, spotify }
        };
        onSave(djData, dj?.id);
        onClose();
    };

    const commonInputClass = "mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-1">
            <h3 className="text-lg font-medium text-green-400 border-b border-gray-700 pb-2">Información Pública</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Nombre Artístico</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={commonInputClass} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">URL Foto</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className={commonInputClass} required />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Biografía</label>
                <textarea rows={4} name="bio" value={formData.bio} onChange={handleChange} className={commonInputClass} required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Estilo Musical (Opcional)</label>
                    <input type="text" name="style" value={formData.style} onChange={handleChange} className={commonInputClass} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">URL Sesiones (Opcional)</label>
                    <input type="text" name="sessionsUrl" value={formData.sessionsUrl} onChange={handleChange} className={commonInputClass} />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300">URL Presskit</label>
                <input type="text" name="presskitUrl" value={formData.presskitUrl} onChange={handleChange} className={commonInputClass} required />
            </div>

            <fieldset className="border border-gray-700 p-4 rounded-md">
                <legend className="text-sm font-medium text-gray-300 px-2">Redes y Música</legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                     <div><label className="block text-xs font-medium text-gray-400">Instagram</label><input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className={commonInputClass} /></div>
                     <div><label className="block text-xs font-medium text-gray-400">TikTok</label><input type="text" name="tiktok" value={formData.tiktok} onChange={handleChange} className={commonInputClass} /></div>
                     <div><label className="block text-xs font-medium text-gray-400">Facebook</label><input type="text" name="facebook" value={formData.facebook} onChange={handleChange} className={commonInputClass} /></div>
                     <div><label className="block text-xs font-medium text-gray-400">Mixcloud</label><input type="text" name="mixcloud" value={formData.mixcloud} onChange={handleChange} className={commonInputClass} /></div>
                     <div><label className="block text-xs font-medium text-gray-400">SoundCloud</label><input type="text" name="soundcloud" value={formData.soundcloud} onChange={handleChange} className={commonInputClass} /></div>
                     <div><label className="block text-xs font-medium text-gray-400">YouTube</label><input type="text" name="youtube" value={formData.youtube} onChange={handleChange} className={commonInputClass} /></div>
                     <div><label className="block text-xs font-medium text-gray-400">Spotify</label><input type="text" name="spotify" value={formData.spotify} onChange={handleChange} className={commonInputClass} /></div>
                </div>
            </fieldset>

            <h3 className="text-lg font-medium text-yellow-400 border-b border-gray-700 pb-2 pt-4">Información Privada (Solo Admin)</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Teléfono</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={commonInputClass} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Email de Contratación</label>
                    <input type="email" name="bookingEmail" value={formData.bookingEmail} onChange={handleChange} className={commonInputClass} />
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button type="button" onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancelar</button>
                <button type="submit" className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-md transition-colors">Guardar DJ</button>
            </div>
        </form>
    );
};

const DjManagement: React.FC = () => {
    const { djs, addDj, updateDj, deleteDj, reorderDjs } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDj, setEditingDj] = useState<DJ | null>(null);

    const handleOpenModal = (dj: DJ | null = null) => {
        setEditingDj(dj);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingDj(null);
    };

    const handleSave = (djData: Omit<DJ, 'id' | 'order'>, djId?: number) => {
        if (djId !== undefined && editingDj) {
            updateDj({ ...editingDj, ...djData });
        } else {
            addDj(djData);
        }
    };
    
    const handleDelete = (id: number) => {
        if (window.confirm('¿Seguro que quieres eliminar a este DJ?')) {
            deleteDj(id);
        }
    };

     return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-400">Gestión de DJs</h2>
                <button onClick={() => handleOpenModal()} className="bg-green-500 text-black font-bold py-2 px-4 rounded-md hover:bg-green-400 transition-colors">
                    Añadir DJ
                </button>
            </div>
             <div className="bg-gray-900 rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                        <tr>
                            <th className="px-6 py-3">Orden</th>
                            <th className="px-6 py-3">DJ</th>
                            <th className="px-6 py-3">Estilo</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {djs.map((dj, index) => (
                            <tr key={dj.id} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <span>{dj.order}</span>
                                        <div className="flex flex-col">
                                            <button onClick={() => reorderDjs(dj.id, 'up')} disabled={index === 0} className="disabled:opacity-20"><ArrowUpIcon/></button>
                                            <button onClick={() => reorderDjs(dj.id, 'down')} disabled={index === djs.length - 1} className="disabled:opacity-20"><ArrowDownIcon/></button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <img src={dj.imageUrl} alt={dj.name} className="w-10 h-10 rounded-full object-cover"/>
                                        <span className="font-medium text-white">{dj.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{dj.style || '-'}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleOpenModal(dj)} className="text-blue-400 hover:underline font-medium">Editar</button>
                                    <button onClick={() => handleDelete(dj.id)} className="text-red-400 hover:underline font-medium ml-4">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingDj ? `Editando a ${editingDj.name}` : 'Añadir Nuevo DJ'}>
                <DjForm dj={editingDj} onClose={handleCloseModal} onSave={handleSave} />
            </Modal>
        </div>
    );
};

export default DjManagement;