import React from 'react';
import { Lightbulb, Users, Handshake, GraduationCap, MessageCircle, Sparkles } from 'lucide-react';
import { useSettings, waLink } from '../lib/settings';

const ICONS = [Lightbulb, GraduationCap, Handshake, Users];

export const BizLabSection: React.FC = () => {
  const s = useSettings();
  const PILLARS = [1, 2, 3, 4].map((n) => ({
    icon: ICONS[n - 1],
    title: s[`bizlab_${n}_title`],
    desc: s[`bizlab_${n}_desc`],
  }));
  return (
    <section id="bizlab" className="bg-[#0b1730] text-white py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#254180]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAB308]/20 border border-[#EAB308]/40 text-[#EAB308] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Program HIPMI Kab. Bandung</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            BizLab
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {s.bizlab_desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EAB308] text-[#0f224a] flex items-center justify-center mb-4 shadow">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <a
          href={waLink(s, s.bizlab_message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#EAB308] hover:bg-[#ca8a04] text-[#0f224a] rounded-full font-black text-sm tracking-wide shadow-xl transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Tanya Info BizLab via WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
