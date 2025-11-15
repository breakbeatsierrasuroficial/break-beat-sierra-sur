import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { User, PointsHistoryItem, EventHistoryItem, ReservationHistoryItem, PrizeRedemption } from '../../types';
import { PointsIcon, EventIcon, ReservationIcon, GiftIcon } from '../../components/IconComponents';

const InfoCard: React.FC<{title: string, children: React.ReactNode, icon?: React.ReactNode, className?: string}> = ({ title, children, icon, className }) => (
    <div className={`bg-gray-900/70 border border-gray-800 rounded-lg p-6 ${className} flex flex-col`}>
        <div className="flex items-center mb-4">
            {icon && <div className="text-green-400 mr-3">{icon}</div>}
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="flex-grow">{children}</div>
    </div>
);

const HistoryItem: React.FC<{item: PointsHistoryItem | EventHistoryItem | ReservationHistoryItem | PrizeRedemption}> = ({item}) => {
    let text, detail, points, statusBadge;

    const statusMap = {
        PENDING: <span className="text-yellow-400">Pendiente</span>,
        DELIVERED: <span className="text-green-400">Entregado</span>,
        CANCELED: <span className="text-red-400">Cancelado</span>,
    };

    if ('reason' in item) { // PointsHistoryItem
        text = item.reason;
        detail = item.date;
        points = <span className={`font-bold ${item.points >= 0 ? 'text-green-400' : 'text-red-400'}`}>{item.points >= 0 ? `+${item.points}` : item.points} pts</span>;
    } else if ('eventName' in item) { // EventHistoryItem
        text = item.eventName;
        detail = item.date;
    } else if ('productName' in item) { // ReservationHistoryItem
        text = `${item.productName} (x${item.quantity}, Talla: ${item.size})`;
        detail = item.date;
    } else { // PrizeRedemption
        text = item.prizeName;
        detail = item.date;
        statusBadge = statusMap[item.status];
    }

    return (
        <li className="flex justify-between items-center py-2.5 border-b border-gray-800 last:border-b-0">
            <div>
                <p className="text-sm text-gray-300">{text}</p>
                <p className="text-xs text-gray-500">{detail}</p>
            </div>
            {points && <div className="text-sm">{points}</div>}
            {statusBadge && <div className="text-xs font-semibold">{statusBadge}</div>}
        </li>
    );
};


const Profile: React.FC = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { prizeRedemptions } = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(user);
  const [newProfilePic, setNewProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user || !editedUser) {
    return <div>Cargando perfil...</div>;
  }

  const userRedemptions = prizeRedemptions.filter(r => r.userId === user.id);

  const handleEditToggle = () => {
    if (isEditing) {
        updateUser(editedUser);
    }
    setIsEditing(!isEditing);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedUser({...editedUser, [e.target.name]: e.target.value});
  }
  
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setNewProfilePic(result);
        setEditedUser({...editedUser, profilePictureUrl: result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const statusClass = user.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400';
  const statusText = user.status === 'VERIFIED' ? 'Verificado' : 'Pendiente';

  return (
    <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <InfoCard title="Mi Perfil" className="lg:col-span-1">
                 <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <img src={newProfilePic || user.profilePictureUrl} alt={user.name} className="w-32 h-32 rounded-full object-cover border-4 border-gray-700" />
                        {isEditing && (
                            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-green-500 text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-400">
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleProfilePicChange} accept="image/*" className="hidden" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <p className="text-sm text-gray-500">ID: {user.socioId}</p>
                    <span className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${statusClass}`}>{statusText}</span>
                </div>

                <div className="mt-6 space-y-4 text-sm">
                   <div className="flex justify-between">
                       <span className="text-gray-400">Email:</span>
                       {isEditing ? <input type="email" name="email" value={editedUser.email} onChange={handleChange} className="bg-gray-800 border-b border-green-500 text-right"/> : <span className="font-medium text-white">{user.email}</span>}
                   </div>
                   <div className="flex justify-between">
                       <span className="text-gray-400">Teléfono:</span>
                        {isEditing ? <input type="tel" name="phone" value={editedUser.phone} onChange={handleChange} className="bg-gray-800 border-b border-green-500 text-right"/> : <span className="font-medium text-white">{user.phone || 'No especificado'}</span>}
                   </div>
                   <div className="flex justify-between">
                       <span className="text-gray-400">Miembro desde:</span>
                       <span className="font-medium text-white">{user.registrationDate}</span>
                   </div>
                </div>
                <button onClick={handleEditToggle} className="w-full mt-6 bg-green-500/80 hover:bg-green-500 text-black font-bold py-2 px-4 rounded-md text-sm transition-colors">
                    {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
                </button>
            </InfoCard>

            <div className="lg:col-span-2 space-y-8">
                <InfoCard title="Mis Puntos" icon={<PointsIcon />}>
                    <div className="flex items-center justify-center text-center flex-grow">
                        <div>
                            <p className="text-7xl font-black text-green-400">{user.points}</p>
                            <p className="text-gray-500">Puntos Acumulados</p>
                        </div>
                    </div>
                </InfoCard>
                 <InfoCard title="Historial de Puntos" icon={<PointsIcon />}>
                     <ul className="max-h-48 overflow-y-auto pr-2">
                        {user.pointsHistory.length > 0 ? user.pointsHistory.map((item, i) => <HistoryItem key={`points-${i}`} item={item} />) : <p className="text-sm text-gray-500">Aún no has ganado puntos.</p>}
                     </ul>
                </InfoCard>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard title="Historial de Eventos" icon={<EventIcon />}>
                 <ul className="max-h-60 overflow-y-auto pr-2">
                    {user.eventHistory.length > 0 ? user.eventHistory.map((item, i) => <HistoryItem key={`event-${i}`} item={item} />) : <p className="text-sm text-gray-500">Aún no has participado en eventos.</p>}
                 </ul>
            </InfoCard>
            <InfoCard title="Mis Reservas" icon={<ReservationIcon />}>
                 <ul className="max-h-60 overflow-y-auto pr-2">
                    {user.reservationHistory.length > 0 ? user.reservationHistory.map((item, i) => <HistoryItem key={`res-${i}`} item={item} />) : <p className="text-sm text-gray-500">Aún no tienes reservas.</p>}
                 </ul>
            </InfoCard>
             <InfoCard title="Historial de Canjes" icon={<GiftIcon />}>
                 <ul className="max-h-60 overflow-y-auto pr-2">
                    {userRedemptions.length > 0 ? userRedemptions.map(item => <HistoryItem key={`redemption-${item.id}`} item={item} />) : <p className="text-sm text-gray-500">Aún no has canjeado premios.</p>}
                 </ul>
            </InfoCard>
        </div>
    </div>
  );
};

export default Profile;