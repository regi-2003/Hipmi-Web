import React from 'react';
import { Clock, MessageCircle } from 'lucide-react';
import { useSettings, joinHref } from '../lib/settings';

export const MembershipSection: React.FC = () => {
  const s = useSettings();
  return (
    <section id="keanggotaan" className="bg-[#0e1b38] text-white py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-8 h-[2.5px] bg-[#EAB308] rounded-full inline-block" />
          <span className="text-[#EAB308] font-bold text-xs tracking-[0.25em] uppercase">
            KEANGGOTAAN
          </span>
          <span className="w-8 h-[2.5px] bg-[#EAB308] rounded-full inline-block" />
        </div>

        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#EAB308] text-[#0f224a] flex items-center justify-center shadow-lg mb-6">
          <Clock className="w-8 h-8" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight">{s.membership_title}</h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          {s.membership_desc}
        </p>

        <a
          href={joinHref(s)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#EAB308] hover:bg-[#ca8a04] text-[#0f224a] rounded-full font-black text-sm tracking-wider uppercase shadow-xl transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Daftar Anggota</span>
        </a>
      </div>
    </section>
  );
};
