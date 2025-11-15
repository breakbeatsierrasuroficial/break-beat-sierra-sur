import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import { RadioConfig } from '../../types';

const RadioManagement: React.FC = () => {
    const { radioConfig, updateRadioConfig } = useContext(DataContext);
    const [config, setConfig] = useState<RadioConfig>(radioConfig);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setConfig(radioConfig);
    }, [radioConfig]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateRadioConfig(config);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const commonInputClass = "mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm";

    return (
        <div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">Gestión de Radio</h2>
            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="bg-gray-900/70 border border-gray-800 rounded-lg p-6 space-y-6">
                    <div>
                        <label htmlFor="streamUrl" className="block text-sm font-medium text-gray-300">URL del Stream de Audio</label>
                        <input
                            type="url"
                            id="streamUrl"
                            name="streamUrl"
                            value={config.streamUrl}
                            onChange={handleChange}
                            className={commonInputClass}
                            placeholder="https://servidor.de/stream"
                        />
                    </div>

                    <div>
                        <label htmlFor="infoText" className="block text-sm font-medium text-gray-300">Texto Informativo</label>
                        <input
                            type="text"
                            id="infoText"
                            name="infoText"
                            value={config.infoText}
                            onChange={handleChange}
                            className={commonInputClass}
                            placeholder="Emitiendo la señal de..."
                        />
                    </div>

                    <div className="flex items-center space-x-3 pt-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={config.isActive}
                            onChange={handleChange}
                            className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-300">
                           Activar Radio
                           <span className="block text-xs text-gray-500">Si está desactivada, los socios verán un mensaje de mantenimiento.</span>
                        </label>
                    </div>

                    <div className="flex justify-end items-center pt-4 border-t border-gray-700">
                         {saved && <span className="text-green-400 text-sm mr-4">Cambios guardados</span>}
                        <button type="submit" className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-md transition-colors">
                            Guardar Configuración
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RadioManagement;