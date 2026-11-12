import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useSettings } from '../lib/settings';

interface HeroProps {
  onOpenRegister: () => void;
  onExploreAbout: () => void;
  onOpenBizLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRegister,
  onExploreAbout,
  onOpenBizLab,
}) => {
  const s = useSettings();
  return (
    <section id="beranda" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image Layer with Executive Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Authentic Indonesian leadership photo backdrop with classical architecture columns */}
        <img
          src={s.hero_image}
          alt="BPC HIPMI Kabupaten Bandung Assembly"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.78] contrast-[1.05]"
        />
        {/* Gradient overlays matching Screenshot 1 navy atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a152e]/95 via-[#0d1e42]/85 to-[#0b1730]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a152e] via-transparent to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-3xl">
          {/* Tagline Badge matching screenshot */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[3px] bg-[#EAB308] rounded-full inline-block" />
            <span className="text-[#EAB308] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
              {s.hero_tagline}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-5 drop-shadow-sm font-sans">
            {s.hero_title_1} <br className="hidden sm:inline" />
            <span className="text-white">{s.hero_title_2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl">
            {s.hero_subtitle}
          </p>

          {/* Action Buttons matching reference */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onOpenRegister}
              className="px-8 py-3.5 bg-[#EAB308] hover:bg-[#ca8a04] text-[#0f224a] rounded-full font-extrabold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer"
            >
              <span>Daftar Anggota</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreAbout}
              className="px-7 py-3.5 bg-[#172b53]/85 hover:bg-[#1f3768] text-white border border-white/25 rounded-full font-semibold text-sm sm:text-base tracking-wide backdrop-blur-sm transition-all hover:border-white/40 cursor-pointer"
            >
              Tentang Kami
            </button>
          </div>

          {/* Banner BizLab */}
          <div
            onClick={onOpenBizLab}
            className="inline-flex items-center gap-3 p-2.5 sm:p-3 pr-5 bg-white/10 hover:bg-white/15 border border-[#EAB308]/40 rounded-2xl backdrop-blur-md cursor-pointer transition-all hover:border-[#EAB308] group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EAB308] text-[#0f224a] flex items-center justify-center font-black shadow flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#0f224a]" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red-600/90 text-white text-[10px] font-bold rounded-full uppercase tracking-wider animate-pulse">
                  Program Baru
                </span>
                <span className="text-[#EAB308] text-xs font-bold uppercase tracking-wider">
                  BPC HIPMI Kab. Bandung
                </span>
              </div>
              <p className="text-white text-xs sm:text-sm font-semibold group-hover:text-amber-300 transition-colors">
                BizLab • Ruang belajar & kolaborasi pengusaha muda &rarr;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
