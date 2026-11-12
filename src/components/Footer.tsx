import React from 'react';
import { HipmiLogo } from './HipmiLogo';
import { useSettings, lines } from '../lib/settings';
import { MapPin, Phone, Mail, Instagram, Globe, Youtube, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRegister }) => {
  const s = useSettings();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#081224] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <HipmiLogo variant="light" size="md" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              {s.footer_desc}
            </p>
            <div className="inline-block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-serif italic text-amber-300">
              "{s.footer_motto}"
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#EAB308] mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tentang')}
                  className="hover:text-white transition-colors"
                >
                  Tentang Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('galeri')}
                  className="hover:text-white transition-colors"
                >
                  Galeri Event
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bizlab')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>BizLab</span>
                  <span className="text-[10px] bg-[#EAB308] text-[#0f224a] px-1.5 py-0.2 rounded font-bold">
                    Program
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('direktori')}
                  className="hover:text-white transition-colors"
                >
                  Direktori Bisnis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hipmi-go')}
                  className="hover:text-white transition-colors"
                >
                  HIPMI GO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('keanggotaan')}
                  className="hover:text-white transition-colors"
                >
                  Keanggotaan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kontak')}
                  className="hover:text-white transition-colors"
                >
                  Kontak Sekretariat
                </button>
              </li>
            </ul>
          </div>

          {/* Program & Kompartemen */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#EAB308] mb-4">
              Kompartemen Strategis
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {lines(s.footer_kompartemen).map((k) => (
                <li key={k} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sekretariat & Kontak */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#EAB308] mb-4">
              Sekretariat BPC
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EAB308] flex-shrink-0 mt-0.5" />
                <span>{s.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                <span>{s.wa_display} (WhatsApp {s.contact_person})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
                <span>{s.email}</span>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 bg-[#EAB308] hover:bg-[#ca8a04] text-[#0f224a] rounded-xl font-bold text-xs shadow tracking-wide transition-all"
              >
                Daftar Calon Anggota
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} BPC HIPMI Kabupaten Bandung — Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
