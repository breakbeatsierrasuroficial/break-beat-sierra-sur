import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const InstagramIcon: React.FC = () => (
  <svg {...iconProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const FacebookIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const TikTokIcon: React.FC = () => (
    <svg {...iconProps} strokeWidth="1.5">
        <path d="M16.14 6.33a4.74 4.74 0 0 1-5.06-2.07v10.15a3.44 3.44 0 1 1-3.44-3.44" />
        <path d="M16.14 2.14a4.74 4.74 0 1 0 0 9.48 4.74 4.74 0 0 0 0-9.48z" />
    </svg>
);

export const MixcloudIcon: React.FC = () => (
    <svg {...iconProps} fill="currentColor" stroke="none">
        <path d="M7.182 17.182a4 4 0 1 1-5.656-5.656 4 4 0 0 1 5.656 5.656zm2-2a4 4 0 1 1-5.656-5.656 4 4 0 0 1 5.656 5.656zm6 0a4 4 0 1 1-5.656-5.656 4 4 0 0 1 5.656 5.656zm-2 2a4 4 0 1 1-5.656-5.656 4 4 0 0 1 5.656 5.656zm6 0a4 4 0 1 1-5.656-5.656 4 4 0 0 1 5.656 5.656z"/>
    </svg>
);

export const SpotifyIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 13.06c-.22.36-.67.48-1.03.26-2.89-1.74-6.48-2.12-10.7-.11-.42.2-.88-.1-.98-.52s.1-.88.52-.98c4.61-2.19 8.58-1.75 11.77.26.36.22.48.67.26 1.03zm1.06-2.31c-.28.45-.84.6-1.29.32-3.23-1.97-8.04-2.56-11.78-.32-.5.29-1.1-.06-1.29-.56s.06-1.1.56-1.29c4.22-2.53 9.48-1.87 13.06.47.45.28.6.84.32 1.29zm.1-2.56c-3.8-2.3-10.04-2.5-13.83-.29-.6.35-1.35-.04-1.49-.64-.14-.6.24-1.35.64-1.49C9.52 4.28 16.19 4.5 20.48 7.1c.54.33.74.99.41 1.53-.33.53-.99.73-1.53.4z" fill="currentColor" stroke="none"></path>
    </svg>
);

export const SoundcloudIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M9 18V5l12-4v13M9 18a4 4 0 1 1-4-4 4 4 0 0 1 4 4z" stroke="none" fill="currentColor"></path>
        <path d="M9 18V5l12-4v13" fill="none"></path>
        <path d="M12 8a3 3 0 0 0 3 3h4V5h-4a3 3 0 0 0-3 3z"></path>
    </svg>
);

export const YoutubeIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export const DownloadIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export const SessionsIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);

export const PlayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-12 h-12"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

export const PauseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-12 h-12"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

export const VolumeHighIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-6 h-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);

// Socio Panel Icons
const panelIconProps = {
    className: "w-5 h-5 mr-3",
    "aria-hidden": "true"
};
export const UserIcon: React.FC = () => <svg {...panelIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
export const AnnounceIcon: React.FC = () => <svg {...panelIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.584C18.354 1.832 18 3.65 18 4.5c0 2.25 1.25 4.5 4 5.5-2.75 1-4 3.25-4 5.5 0 .85.354 2.668.832 3.584C16.457 16.236 12.93 14 8.832 14H7a4.001 4.001 0 01-1.564-.317z" /></svg>;
export const DjIcon: React.FC = () => <svg {...panelIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12-3" /></svg>;
export const RadioIcon: React.FC = () => <svg {...panelIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /><path d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" /><path d="M12 14a2 2 0 100-4 2 2 0 000 4z" /></svg>;
export const MerchIcon: React.FC = () => <svg {...panelIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
export const LogoutIcon: React.FC = () => <svg {...panelIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
export const PointsIcon: React.FC = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;
export const EventIcon: React.FC = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
export const ReservationIcon: React.FC = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
export const AiBuilderIcon: React.FC = () => <svg {...panelIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M4 21h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
export const GiftIcon: React.FC = () => <svg {...panelIconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>;

// Admin Icons
export const ArrowUpIcon: React.FC = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
export const ArrowDownIcon: React.FC = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;