import React, { useState, useRef, useEffect, useContext } from 'react';
import { PlayIcon, PauseIcon, VolumeHighIcon, RadioIcon } from '../components/IconComponents';
import { DataContext } from '../context/DataContext';

const Radio: React.FC = () => {
  const { radioConfig } = useContext(DataContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    // If admin disables the radio while playing, pause the audio
    if (!radioConfig.isActive && audioRef.current) {
        audioRef.current.pause();
    }
  }, [radioConfig.isActive]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderPlayer = () => (
    <>
        <div className="relative z-10 bg-black/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black">
            <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">En Directo</h2>
            <h3 className="text-3xl md:text-5xl font-black text-green-400 uppercase tracking-wider">
                BSS Radio
            </h3>
            <p className="text-gray-500 mt-4 max-w-sm">
                La banda sonora de la resistencia. 24/7 con los mejores ritmos rotos y la cultura underground.
            </p>

            <div className="mt-8 flex flex-col items-center space-y-6">
                <button
                    onClick={togglePlayPause}
                    className="w-24 h-24 flex items-center justify-center rounded-full bg-green-500 text-black hover:bg-green-400 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-green-500/20"
                >
                    {isPlaying ? <PauseIcon className="w-12 h-12" /> : <PlayIcon className="w-12 h-12" />}
                </button>

                <div className="flex items-center space-x-3 w-full max-w-xs">
                    <VolumeHighIcon className="w-6 h-6 text-gray-400" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                </div>
            </div>
        </div>
        <p className="relative z-10 mt-8 text-green-400 font-semibold tracking-wide text-center max-w-md">
            {radioConfig.infoText}
        </p>
        <audio ref={audioRef} src={radioConfig.streamUrl} preload="none" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}></audio>
    </>
  );

  const renderOfflineMessage = () => (
     <div className="relative z-10 bg-black/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black text-center">
        <div className="flex justify-center text-gray-600 mb-4">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /><path d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" /><path d="M12 14a2 2 0 100-4 2 2 0 000 4z" /></svg>
        </div>
        <h3 className="text-3xl font-black text-gray-500 uppercase tracking-wider">
            BSS Radio
        </h3>
        <p className="text-gray-600 mt-4 max-w-sm">
            Radio fuera de servicio temporalmente.
        </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 min-h-[70vh] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
            <div className={`absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl 
                ${isPlaying ? 'animate-pulse' : ''}`}></div>
        </div>
        
        {radioConfig.isActive && radioConfig.streamUrl ? renderPlayer() : renderOfflineMessage()}

    </div>
  );
};

export default Radio;