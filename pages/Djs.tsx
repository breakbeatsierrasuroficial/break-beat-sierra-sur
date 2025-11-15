import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { DJ } from '../types';
import { InstagramIcon, FacebookIcon, SoundcloudIcon, SpotifyIcon, YoutubeIcon, DownloadIcon, TikTokIcon, MixcloudIcon, SessionsIcon } from '../components/IconComponents';

const DjCard: React.FC<{ dj: DJ }> = ({ dj }) => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/10 flex flex-col">
            <div className="relative">
                <img src={dj.imageUrl} alt={dj.name} className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                     <h3 className="text-3xl font-black text-white uppercase tracking-widest">{dj.name}</h3>
                     {dj.style && <p className="text-sm font-semibold bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full inline-block mt-1">{dj.style}</p>}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-400 text-sm mb-4 flex-grow">{dj.bio}</p>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4">
                    <div className="flex items-center space-x-4">
                        {dj.socials.instagram && <a href={dj.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors"><InstagramIcon /></a>}
                        {dj.socials.facebook && <a href={dj.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors"><FacebookIcon /></a>}
                        {dj.socials.tiktok && <a href={dj.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors"><TikTokIcon /></a>}
                        {dj.socials.mixcloud && <a href={dj.socials.mixcloud} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors"><MixcloudIcon /></a>}
                        {dj.music.soundcloud && <a href={dj.music.soundcloud} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors"><SoundcloudIcon /></a>}
                        {dj.music.spotify && <a href={dj.music.spotify} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors"><SpotifyIcon /></a>}
                        {dj.music.youtube && <a href={dj.music.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors"><YoutubeIcon /></a>}
                    </div>
                     <div className="flex items-center gap-2">
                        {dj.sessionsUrl && (
                            <a 
                                href={dj.sessionsUrl} 
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-sm font-medium bg-gray-800 text-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-black transition-colors"
                            >
                                <SessionsIcon />
                            </a>
                        )}
                        <a 
                            href={dj.presskitUrl} 
                            download 
                            className="inline-flex items-center space-x-2 text-sm font-medium bg-gray-800 text-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-black transition-colors"
                        >
                            <DownloadIcon />
                            <span>Presskit</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


const Djs: React.FC = () => {
    const { djs } = useContext(DataContext);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {djs.map(dj => (
                <DjCard key={dj.id} dj={dj} />
            ))}
        </div>
    );
};

export default Djs;