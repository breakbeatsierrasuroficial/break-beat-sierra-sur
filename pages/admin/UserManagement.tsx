import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { User } from '../../types';

const UserManagement = () => {
    const { users, updateUser, deleteUser } = useContext(DataContext);
    const [filter, setFilter] = useState<'all' | 'pending' | 'verified'>('all');

    const handleAccept = (user: User) => {
        updateUser({ ...user, status: 'VERIFIED' });
    }
    const handleReject = (id: number) => {
        if(window.confirm('¿Seguro que quieres rechazar y eliminar a este usuario? Esta acción no se puede deshacer.')) {
            deleteUser(id);
        }
    }
    
    const filteredUsers = users.filter(user => {
        if (user.role === 'ADMIN') return false;
        if (filter === 'pending') return user.status === 'PENDING';
        if (filter === 'verified') return user.status === 'VERIFIED';
        return true;
    });

    return (
        <div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">Gestión de Socios</h2>
             <div className="flex space-x-2 mb-4">
                <button onClick={() => setFilter('all')} className={`px-3 py-1 text-sm rounded-md ${filter === 'all' ? 'bg-green-500 text-black' : 'bg-gray-700 text-white'}`}>Todos</button>
                <button onClick={() => setFilter('pending')} className={`px-3 py-1 text-sm rounded-md ${filter === 'pending' ? 'bg-green-500 text-black' : 'bg-gray-700 text-white'}`}>Pendientes</button>
                <button onClick={() => setFilter('verified')} className={`px-3 py-1 text-sm rounded-md ${filter === 'verified' ? 'bg-green-500 text-black' : 'bg-gray-700 text-white'}`}>Verificados</button>
            </div>
            <div className="bg-gray-900 rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID Socio</th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Registrado</th>
                            <th scope="col" className="px-6 py-3">Puntos</th>
                            <th scope="col" className="px-6 py-3">Estado</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800/50">
                                <td className="px-6 py-4 font-medium text-white">{user.socioId}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.registrationDate}</td>
                                <td className="px-6 py-4">{user.points}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {user.status === 'PENDING' ? 'Pendiente' : 'Verificado'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex space-x-4">
                                    {user.status === 'PENDING' && <button onClick={() => handleAccept(user)} className="text-green-400 hover:underline">Aceptar</button>}
                                    <button onClick={() => handleReject(user.id)} className="text-red-400 hover:underline">Rechazar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredUsers.length === 0 && <p className="text-center p-8 text-gray-500">No hay usuarios que coincidan con los filtros seleccionados.</p>}
            </div>
        </div>
    );
};

export default UserManagement;