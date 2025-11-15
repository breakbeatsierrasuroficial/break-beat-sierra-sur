import React, { useState } from 'react';

// This is a hardcoded example prompt that will trigger the simulated AI response.
const examplePrompt = "Añade un campo 'twitter' a los DJs";

// This object simulates the response from the AI.
const aiResponse = {
  description: "Se añadirá un nuevo campo 'twitter' a la entidad DJ. Esto implica actualizar la definición de tipos, los datos de ejemplo (mock data), y el componente de la tarjeta de DJ para mostrar el nuevo enlace social con su icono correspondiente.",
  fileChanges: [
    {
      path: "src/types.ts",
      description: "Añadir la propiedad opcional 'twitter' a la interfaz 'SocialLinks' para permitir almacenar el enlace al perfil de Twitter de un DJ.",
      code: `export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  mixcloud?: string;
  twitter?: string; // <-- AÑADIR ESTA LÍNEA
}`
    },
    {
        path: "src/components/IconComponents.tsx",
        description: "Crear un nuevo componente 'TwitterIcon' para poder mostrarlo en la interfaz de usuario. Se utilizará un SVG estándar para el icono de Twitter.",
        code: `export const TwitterIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);`
    },
    {
      path: "src/constants.ts",
      description: "Actualizar el objeto del DJ 'CYBERPUNK' en el array 'DJS' para incluir el nuevo campo 'twitter' con un enlace de ejemplo.",
      code: `export const DJS: DJ[] = [
  {
    id: 1,
    name: "CYBERPUNK",
    bio: "Residente y fundador de Breakbeat Sierra Sur...",
    imageUrl: "https://picsum.photos/seed/dj1/400/400",
    socials: {
      instagram: "#",
      facebook: "#",
      twitter: "#", // <-- AÑADIR ESTA LÍNEA
    },
    music: {
      soundcloud: "#",
      spotify: "#",
    },
    presskitUrl: "/presskit_cyberpunk.zip",
    // ...
  },
  // ... resto de DJs
];`
    },
    {
      path: "src/pages/Djs.tsx",
      description: "Modificar el componente 'DjCard' para que renderice el nuevo 'TwitterIcon' si el DJ tiene un enlace de Twitter definido en sus datos.",
      code: `import { InstagramIcon, FacebookIcon, SoundcloudIcon, SpotifyIcon, YoutubeIcon, DownloadIcon, TwitterIcon } from '../components/IconComponents'; // <-- AÑADIR TwitterIcon

// ... dentro del componente DjCard

<div className="flex items-center space-x-4">
    {dj.socials.instagram && <a...><InstagramIcon /></a>}
    {dj.socials.facebook && <a...><FacebookIcon /></a>}
    {dj.socials.tiktok && <a...><TikTokIcon /></a>}
    {dj.socials.twitter && <a href={dj.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors"><TwitterIcon /></a>} {/* <-- AÑADIR ESTA LÍNEA */}
    {dj.music.soundcloud && <a...><SoundcloudIcon /></a>}
    {/* ... */}
</div>
`
    }
  ],
  databaseChanges: {
    description: "Para persistir esta información en una base de datos real, se necesita añadir una nueva columna 'twitter' a la tabla 'djs'. A continuación se muestra el script de migración SQL.",
    sql: "ALTER TABLE djs ADD COLUMN twitter VARCHAR(255) NULL;"
  }
};

const ResultCard: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 bg-gray-800/50 hover:bg-gray-800 transition-colors">
                 <h3 className="text-lg font-bold text-green-400">{title}</h3>
                 <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && <div className="p-4">{children}</div>}
        </div>
    )
};

const CodeBlock: React.FC<{code: string}> = ({ code }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    return (
        <div className="relative">
            <button onClick={handleCopy} className="absolute top-2 right-2 text-xs bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-2 rounded-md">
                {copied ? 'Copiado!' : 'Copiar'}
            </button>
            <pre className="bg-black p-4 rounded-md text-sm text-white overflow-x-auto">
                <code>
                    {code}
                </code>
            </pre>
        </div>
    );
}

const AiBuilder = () => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<typeof aiResponse | null>(null);
    const [result, setResult] = useState<typeof aiResponse | null>(null);
    const [error, setError] = useState('');
    
    const handleGenerate = () => {
        setError('');
        setResult(null);
        setPreview(null);
        if (prompt.trim().toLowerCase() !== examplePrompt.toLowerCase()) {
            setError(`Esta es una demo. Por favor, usa el prompt exacto: "${examplePrompt}"`);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setPreview(aiResponse);
            setIsLoading(false);
        }, 2500);
    };

    const handleApply = () => {
        if(preview) {
            setResult(preview);
            setPreview(null);
            alert("Cambios aplicados con éxito. En una aplicación real, el código del proyecto se habría modificado.");
        }
    };
    
    const handleCancel = () => {
        setPreview(null);
    };

    const handleNewChange = () => {
        setResult(null);
        setPrompt('');
    };

    const renderResult = (data: typeof aiResponse) => (
         <div className="mt-4 space-y-6">
            <ResultCard title="Descripción del Cambio">
                <p className="text-gray-400">{data.description}</p>
            </ResultCard>
            <ResultCard title="Cambios en Ficheros">
               <div className="space-y-6">
                    {data.fileChanges.map(change => (
                        <div key={change.path}>
                            <p className="font-mono text-sm text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-t-md">{change.path}</p>
                            <div className="border border-t-0 border-gray-700 p-4 rounded-b-md space-y-2">
                                <p className="text-sm text-gray-400">{change.description}</p>
                                <CodeBlock code={change.code} />
                            </div>
                        </div>
                    ))}
               </div>
            </ResultCard>
             <ResultCard title="Cambios en Base de Datos">
                <div className="space-y-2">
                     <p className="text-sm text-gray-400">{data.databaseChanges.description}</p>
                     <CodeBlock code={data.databaseChanges.sql} />
                </div>
            </ResultCard>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-green-400 mb-2">Editor IA</h2>
            <p className="text-gray-500 text-sm mb-6">Modifica la aplicación mediante prompts. Describe los cambios que necesitas y la IA generará el código y los pasos necesarios.</p>
            
            {result && (
                <div className="bg-gray-900 border border-green-500/30 p-6 rounded-lg">
                    <h3 className="text-lg text-green-400 font-bold">Cambio Aplicado Correctamente</h3>
                    {renderResult(result)}
                    <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-700">
                        <button onClick={handleNewChange} className="bg-green-500/80 hover:bg-green-500 text-black font-bold py-2 px-6 rounded-md transition-colors">
                            Realizar otro cambio
                        </button>
                         <button disabled className="bg-gray-700 text-gray-500 font-bold py-2 px-6 rounded-md cursor-not-allowed">
                            Deshacer último cambio (Demo)
                        </button>
                    </div>
                </div>
            )}

            {!preview && !result && (
                <div className="space-y-4">
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={`Ej: ${examplePrompt}`}
                        rows={4}
                        className="w-full bg-gray-900 border-2 border-gray-700 rounded-md p-3 font-mono text-sm text-gray-300 focus:ring-green-500 focus:border-green-500 transition"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button 
                        onClick={handleGenerate} 
                        disabled={isLoading}
                        className="bg-green-500/80 hover:bg-green-500 text-black font-bold py-2 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isLoading ? 'Generando...' : 'Generar Cambios con IA'}
                    </button>
                </div>
            )}

            {isLoading && (
                <div className="mt-8 text-center">
                    <p className="text-green-400 animate-pulse">Analizando el proyecto y generando código...</p>
                </div>
            )}
            
            {preview && (
                 <div className="mt-8 bg-gray-900 border border-yellow-500/30 p-6 rounded-lg">
                    <h3 className="text-lg text-yellow-400 font-bold">Previsualización de Cambios</h3>
                    <p className="text-sm text-gray-400 mb-4">Revisa los cambios generados por la IA. Si estás de acuerdo, aplícalos al proyecto.</p>
                    {renderResult(preview)}
                    <div className="mt-6 flex justify-end space-x-4 pt-4 border-t border-gray-700">
                         <button onClick={handleCancel} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
                            Cancelar
                        </button>
                        <button onClick={handleApply} className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-6 rounded-md transition-colors">
                            Aplicar Cambios
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiBuilder;
