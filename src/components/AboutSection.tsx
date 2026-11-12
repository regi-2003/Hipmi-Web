import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Award, Target, Building2, X, Sparkles, Compass } from 'lucide-react';
import { useSettings, lines } from '../lib/settings';

export const AboutSection: React.FC = () => {
  const s = useSettings();
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <>
      <section id="tentang" className="bg-white py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content matching Screenshot 2 */}
            <div className="lg:col-span-7">
              {/* Tag header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[3px] bg-[#EAB308] rounded-full inline-block" />
                <span className="text-[#254180] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                  {s.about_tagline}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-6 font-sans">
                {s.about_title}
              </h2>

              {/* Narrative Paragraph */}
              <p className="text-base sm:text-lg text-[#555d66] leading-relaxed mb-6">
                {s.about_p1}
              </p>
              <p className="text-base sm:text-lg text-[#555d66] leading-relaxed mb-8">
                {s.about_p2}
              </p>

              {/* Primary Action Button */}
              <div>
                <button
                  onClick={() => setShowDetailModal(true)}
                  className="px-8 py-3.5 bg-[#193366] hover:bg-[#12244a] text-white rounded-full font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <span>Kenali Lebih Dalam</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Visual Composition matching Screenshot 2 */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main ceremonial photo */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={s.about_image}
                    alt="HIPMI Flag Ceremony & Young Entrepreneurs"
                    className="w-full h-[380px] sm:h-[440px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating Badge matching Screenshot 2 */}
                <div className="absolute -bottom-6 -left-4 sm:left-4 z-20 bg-[#162a56] text-white p-5 rounded-2xl shadow-xl border border-blue-400/20 max-w-[280px]">
                  <div className="text-2xl font-black text-[#EAB308] tracking-tight">
                    {s.about_badge_title}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mt-1 leading-snug">
                    {s.about_badge_sub}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-300">
                    {s.about_badge_desc}
                  </div>
                </div>

                {/* Decorative background geometry */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#EAB308]/15 rounded-full filter blur-2xl -z-10" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#254180]/20 rounded-full filter blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Navy Misi Section Ribbon matching Screenshot 2 bottom transition */}
        <div className="mt-24 bg-gradient-to-r from-[#0d1e42] via-[#142954] to-[#0a1733] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-8 h-[2px] bg-[#EAB308] rounded-full inline-block" />
                <span className="text-[#EAB308] font-bold text-xs tracking-[0.25em] uppercase">
                  MISI STRATEGIS
                </span>
                <span className="w-8 h-[2px] bg-[#EAB308] rounded-full inline-block" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {s.about_pillars_title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-white/5 border border-white/10 p-7 rounded-2xl backdrop-blur-sm hover:border-[#EAB308]/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#EAB308] text-[#0f224a] flex items-center justify-center font-bold mb-5 shadow">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{s.about_pillar_1_title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {s.about_pillar_1_desc}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white/5 border border-white/10 p-7 rounded-2xl backdrop-blur-sm hover:border-[#EAB308]/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#EAB308] text-[#0f224a] flex items-center justify-center font-bold mb-5 shadow">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{s.about_pillar_2_title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {s.about_pillar_2_desc}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white/5 border border-white/10 p-7 rounded-2xl backdrop-blur-sm hover:border-[#EAB308]/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#EAB308] text-[#0f224a] flex items-center justify-center font-bold mb-5 shadow">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{s.about_pillar_3_title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {s.about_pillar_3_desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal: Profil Lengkap & Struktur Organisasi */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-200 animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#254180] text-[#EAB308] flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0f224a]">
                  Profil & Visi BPC HIPMI Kabupaten Bandung
                </h3>
                <p className="text-xs text-slate-500">Badan Pengurus Cabang Masa Bakti Berjalan</p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 max-h-[70vh] overflow-y-auto pr-2">
              <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl">
                <h4 className="font-bold text-[#254180] mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Visi Organisasi
                </h4>
                <p className="text-slate-700 leading-relaxed text-sm">
                  "{s.about_vision}"
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Nilai-Nilai Luhur HIPMI:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {lines(s.about_values).map((v) => (
                    <li key={v} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Wilayah Cakupan Strategis:</h4>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  {s.about_area}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-full transition-colors"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
