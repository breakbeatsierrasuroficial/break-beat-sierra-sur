import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Announcement } from '../../types';
import Modal from '../../components/Modal';

const AnnouncementForm: React.FC<{
    announcement: Announcement | null;
    onClose: () => void;
    onSave: (announcement: Omit<Announcement, 'id' | 'comments' | 'publishDate'>) => void;
}> = ({ announcement, onClose, onSave }) => {
    const [title, setTitle] = useState(announcement?.title || '');
    const [content, setContent] = useState(announcement?.content || '');
    const [imageUrl, setImageUrl] = useState(announcement?.imageUrl || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ 
            title, 
            content, 
            imageUrl
        });
        onClose();
    };
    
    const commonInputClass = "mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Título</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={commonInputClass} required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Contenido</label>
                <textarea rows={5} value={content} onChange={e => setContent(e.target.value)} className={commonInputClass} required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">URL de la Imagen (Opcional)</label>
                <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={commonInputClass} placeholder="https://picsum.photos/seed/event/800/400" />
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button type="button" onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancelar</button>
                <button type="submit" className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-md transition-colors">Guardar Anuncio</button>
            </div>
        </form>
    );
};

const AnnouncementManagement: React.FC = () => {
    const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

    const handleOpenModal = (announcement: Announcement | null = null) => {
        setEditingAnnouncement(announcement);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAnnouncement(null);
    };

    const handleSave = (announcementData: Omit<Announcement, 'id' | 'comments' | 'publishDate'>) => {
        if (editingAnnouncement) {
            updateAnnouncement({ ...editingAnnouncement, ...announcementData });
        } else {
            addAnnouncement({
                ...announcementData,
                publishDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            });
        }
    };
    
    const handleDelete = (id: number) => {
        if (window.confirm('¿Seguro que quieres eliminar este anuncio?')) {
            deleteAnnouncement(id);
        }
    };

     return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-400">Gestión de Anuncios</h2>
                <button onClick={() => handleOpenModal()} className="bg-green-500 text-black font-bold py-2 px-4 rounded-md hover:bg-green-400 transition-colors">
                    Crear Anuncio
                </button>
            </div>
             <div className="space-y-4">
                {announcements.map(ann => (
                    <div key={ann.id} className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold text-white">{ann.title}</p>
                            <p className="text-xs text-gray-500">{ann.publishDate}</p>
                        </div>
                        <div className="flex space-x-2">
                             <button onClick={() => handleOpenModal(ann)} className="text-blue-400 hover:underline">Editar</button>
                             <button onClick={() => handleDelete(ann.id)} className="text-red-400 hover:underline">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingAnnouncement ? 'Editar Anuncio' : 'Crear Anuncio'}>
                <AnnouncementForm announcement={editingAnnouncement} onClose={handleCloseModal} onSave={handleSave} />
            </Modal>
        </div>
    );
};

export default AnnouncementManagement;
