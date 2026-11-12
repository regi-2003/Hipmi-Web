import React from 'react';

interface HipmiLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const HipmiLogo: React.FC<HipmiLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';

  // Dimension helpers
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-sm font-bold tracking-wider',
    md: 'text-base font-extrabold tracking-wider',
    lg: 'text-xl font-extrabold tracking-wider',
  };

  const subSizes = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[11px] tracking-widest',
    lg: 'text-xs tracking-widest',
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* HIPMI Official Golden Flame Emblem */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]} drop-shadow-sm`}>
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>

          {/* Pedestal / Base ring */}
          <ellipse cx="50" cy="88" rx="28" ry="6" fill="url(#goldGrad)" opacity="0.9" />
          <path d="M30 88 L34 78 L66 78 L70 88 Z" fill="url(#goldGrad)" />
          
          {/* Torch Cup / Stand */}
          <path d="M32 78 Q50 82 68 78 L65 65 Q50 68 35 65 Z" fill="#B45309" opacity="0.6" />
          <path d="M34 68 Q50 72 66 68 L64 56 Q50 60 36 56 Z" fill="url(#silverGrad)" />

          {/* Hand holding Keris / Flame base */}
          <path d="M40 60 Q50 64 60 60 L58 48 Q50 52 42 48 Z" fill="url(#goldGrad)" />
          
          {/* Stylized Keris Blade / Flame of Youth (Api Perjuangan Pengusaha) */}
          <path
            d="M50 8 C53 18 63 24 60 34 C58 42 62 48 50 54 C38 48 42 42 40 34 C37 24 47 18 50 8 Z"
            fill="url(#goldGrad)"
          />
          {/* Inner Flame highlight */}
          <path
            d="M50 16 C52 23 57 27 55 33 C53 38 56 42 50 46 C44 42 47 38 45 33 C43 27 48 23 50 16 Z"
            fill="#FEF08A"
          />
          {/* Core glow */}
          <circle cx="50" cy="32" r="4" fill="#FFFFFF" opacity="0.8" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className={`flex items-center gap-1.5 leading-none ${titleSizes[size]} ${isLight ? 'text-white' : 'text-[#0f224a]'}`}>
          <span>HIPMI</span>
          <span className="text-[#EAB308]">KAB. BANDUNG</span>
        </div>
        {showSubtitle && (
          <span className={`font-semibold uppercase leading-tight ${subSizes[size]} ${isLight ? 'text-slate-300' : 'text-[#606e79]'}`}>
            Jawa Barat
          </span>
        )}
      </div>
    </div>
  );
};
