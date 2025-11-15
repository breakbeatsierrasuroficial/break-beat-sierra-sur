import React, { useState, useContext } from 'react';
import { Announcement, Comment } from '../types';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';

const CommentForm: React.FC<{ onAddComment: (comment: Omit<Comment, 'id' | 'date' | 'avatarUrl' | 'author'>) => void }> = ({ onAddComment }) => {
    const [text, setText] = useState('');
    const { user } = useContext(AuthContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user && text.trim()) {
            onAddComment({ authorId: user.id, text });
            setText('');
        }
    };
    
    if (user?.status === 'PENDING') {
         return <p className="text-sm text-yellow-500 mt-4 bg-yellow-500/10 p-3 rounded-md">Tu cuenta de socio está pendiente de verificación. Podrás comentar cuando un administrador la apruebe.</p>
    }
    
    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex flex-col space-y-3">
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe un comentario..."
                    rows={2}
                    className="bg-gray-800 border border-gray-700 rounded-md p-2 text-sm text-gray-300 focus:ring-green-500 focus:border-green-500"
                    required
                ></textarea>
                <button type="submit" className="self-end bg-green-500/80 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors">
                    Comentar
                </button>
            </div>
        </form>
    );
};


const AnnouncementCard: React.FC<{ 
    announcement: Announcement;
    onAddComment: (comment: Omit<Comment, 'id' | 'date' | 'avatarUrl' | 'author'>) => void;
}> = ({ announcement, onAddComment }) => {
    return (
        <article className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden shadow-lg shadow-green-500/5 transition-shadow duration-300 hover:shadow-green-500/10">
            <img src={announcement.imageUrl} alt={announcement.title} className="w-full h-48 sm:h-64 object-cover" />
            <div className="p-6">
                <p className="text-xs text-green-400 mb-2">{announcement.publishDate}</p>
                <h2 className="text-2xl font-bold text-white mb-4">{announcement.title}</h2>
                <div className="prose prose-invert prose-sm max-w-none text-gray-400">
                    <p>{announcement.content}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-3">Comentarios ({announcement.comments.length})</h3>
                    <div className="space-y-4">
                        {announcement.comments.map(comment => (
                            <div key={comment.id} className="flex items-start space-x-3">
                                <img src={comment.avatarUrl} alt={comment.author} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-sm text-white">{comment.author} <span className="text-xs text-gray-500 ml-2">{comment.date}</span></p>
                                    <p className="text-sm text-gray-400">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CommentForm onAddComment={onAddComment} />
                </div>
            </div>
        </article>
    );
};

const Announcements: React.FC = () => {
    const { announcements, updateAnnouncement } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    const handleAddCommentToAnnouncement = (announcementId: number, newComment: Omit<Comment, 'id' | 'date' | 'avatarUrl' | 'author'>) => {
        if (!user) return;

        const announcementToUpdate = announcements.find(a => a.id === announcementId);
        if (!announcementToUpdate) return;

        const commentToAdd: Comment = {
            ...newComment,
            id: Date.now(),
            author: user.name,
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            avatarUrl: `https://i.pravatar.cc/150?u=${user.email}`
        };

        const updatedAnnouncement = {
            ...announcementToUpdate,
            comments: [...announcementToUpdate.comments, commentToAdd]
        };
        
        updateAnnouncement(updatedAnnouncement);
    };

    return (
        <div className="space-y-12 max-w-3xl mx-auto">
            {announcements.map(announcement => (
                <AnnouncementCard 
                    key={announcement.id} 
                    announcement={announcement} 
                    onAddComment={(comment) => handleAddCommentToAnnouncement(announcement.id, comment)}
                />
            ))}
        </div>
    );
};

export default Announcements;
