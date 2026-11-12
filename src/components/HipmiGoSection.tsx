import React from 'react';
import { Smartphone, Download, ExternalLink, IdCard, CalendarCheck, Newspaper } from 'lucide-react';
import { useSettings } from '../lib/settings';

const FEATURES = [
  { icon: IdCard, title: 'KTA Digital', desc: 'Kartu Tanda Anggota elektronik di genggaman Anda.' },
  { icon: CalendarCheck, title: 'Event & Absensi', desc: 'Info kegiatan dan absensi anggota yang praktis.' },
  { icon: Newspaper, title: 'Berita & Artikel', desc: 'Kabar terbaru seputar HIPMI.' },
];

export const HipmiGoSection: React.FC = () => {
  const s = useSettings();
  return (
    <section id="hipmi-go" className="bg-white py-20 lg:py-28 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#193366] to-[#0a152e] rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[3px] bg-[#EAB308] rounded-full inline-block" />
              <span className="text-[#EAB308] font-bold text-xs tracking-[0.2em] uppercase">
                Aplikasi Resmi Anggota
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Aplikasi HIPMI GO</h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {s.hipmigo_desc}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={s.hipmigo_install_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#EAB308] hover:bg-[#ca8a04] text-[#0f224a] rounded-full font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Install Aplikasi HIPMI GO</span>
              </a>
              <a
                href={s.hipmigo_open_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Sudah Punya? Buka Aplikasi</span>
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="w-11 h-11 rounded-xl bg-[#EAB308] text-[#0f224a] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{f.title}</h3>
                    <p className="text-sm text-slate-300">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
