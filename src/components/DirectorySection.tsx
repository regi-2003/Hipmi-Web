import React, { useState } from 'react';
import { useMembers } from '../lib/useData';
import { MemberBusiness } from '../types';
import { Search, MapPin, Phone, X } from 'lucide-react';

export const DirectorySection: React.FC = () => {
  const { data: MEMBER_BUSINESSES, loading, error } = useMembers();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedKecamatan, setSelectedKecamatan] = useState('ALL');
  const [activeModalBusiness, setActiveModalBusiness] = useState<MemberBusiness | null>(null);

  // Daftar sektor & lokasi otomatis mengikuti data anggota
  const sectors = ['ALL', ...Array.from(new Set(MEMBER_BUSINESSES.map((b) => b.sector)))];
  const kecamatans = ['ALL', ...Array.from(new Set(MEMBER_BUSINESSES.map((b) => b.location)))];

  const initials = (name: string) =>
    name
      .replace(/^(drh?\.|H\.|Hj\.)\s*/i, '')
      .split(/[\s,]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');

  const waHref = (biz: MemberBusiness) =>
    `https://wa.me/${biz.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
      `Halo ${biz.ceo}, saya tertarik berkolaborasi melalui HIPMI Kabupaten Bandung`
    )}`;

  const FounderAvatar: React.FC<{ biz: MemberBusiness; size: string }> = ({ biz, size }) =>
    biz.founderPhoto ? (
      <img
        src={biz.founderPhoto}
        alt={`Foto ${biz.ceo}`}
        className={`${size} rounded-full object-cover border-2 border-white shadow`}
      />
    ) : (
      <div
        className={`${size} rounded-full bg-gradient-to-br from-[#254180] to-[#0a152e] text-white flex items-center justify-center font-bold border-2 border-white shadow`}
      >
        {initials(biz.ceo)}
      </div>
    );

  const filteredBusinesses = MEMBER_BUSINESSES.filter((biz) => {
    const matchesSearch =
      biz.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.ceo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector =
      selectedSector === 'ALL' || biz.sector === selectedSector;

    const matchesKecamatan =
      selectedKecamatan === 'ALL' || biz.location === selectedKecamatan;

    return matchesSearch && matchesSector && matchesKecamatan;
  });

  return (
    <>
      <section id="direktori" className="bg-white py-20 lg:py-28 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[3px] bg-[#EAB308] rounded-full inline-block" />
              <span className="text-[#254180] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                EKOSISTEM & ENVIRONMENT SYSTEM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Direktori Bisnis Anggota BPC HIPMI Kab. Bandung
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Jelajahi bisnis anggota HIPMI Kabupaten Bandung dari berbagai sektor, mulai dari kuliner, agribisnis, fashion, pariwisata, teknologi, hingga jasa.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 mb-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama bisnis, CEO, atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#254180] focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                />
              </div>

              {/* Kecamatan Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedKecamatan}
                  onChange={(e) => setSelectedKecamatan(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-2xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#254180] shadow-sm"
                >
                  <option value="ALL">Semua Lokasi ({kecamatans.length - 1})</option>
                  {kecamatans
                    .filter((k) => k !== 'ALL')
                    .map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                </select>
              </div>

              {/* Reset Filter Button */}
              <div className="md:col-span-3 flex justify-end">
                <span className="text-xs font-semibold text-slate-500">
                  Ditemukan: <strong className="text-[#254180]">{filteredBusinesses.length}</strong> Bisnis Anggota
                </span>
              </div>
            </div>

            {/* Sector Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60">
              {sectors.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSector === sec
                      ? 'bg-[#254180] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                  }`}
                >
                  {sec === 'ALL' ? 'Semua Sektor' : sec}
                </button>
              ))}
            </div>
          </div>

          {/* Business Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((biz) => (
              <div
                key={biz.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Sektor */}
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-[#254180] text-xs font-bold rounded-lg border border-blue-100">
                      {biz.sector}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#254180] transition-colors leading-snug mb-1">
                    {biz.businessName}
                  </h3>

                  <div className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{biz.location}, Kab. Bandung</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {biz.description}
                  </p>
                </div>

                <div>
                  {/* CEO + foto founder */}
                  <div className="pt-3 border-t border-slate-100 mb-4 flex items-center gap-3">
                    <FounderAvatar biz={biz} size="w-11 h-11 text-sm" />
                    <div>
                      <div className="text-[11px] text-slate-500">CEO / Founder</div>
                      <div className="text-xs font-bold text-slate-800">{biz.ceo}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalBusiness(biz)}
                      className="flex-1 py-2.5 bg-slate-50 hover:bg-[#254180] text-slate-700 hover:text-white border border-slate-200 rounded-xl text-xs font-bold transition-all text-center"
                    >
                      Lihat Profil
                    </button>
                    <a
                      href={waHref(biz)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-xl transition-colors"
                      title="Hubungi WhatsApp"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <div className="text-center py-12 text-slate-500 text-sm">Memuat data anggota...</div>
          )}
          {error && (
            <div className="text-center py-6 text-red-600 text-sm">{error}</div>
          )}

          {!loading && filteredBusinesses.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm font-medium">
                Tidak ada anggota yang cocok dengan filter pencarian Anda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSector('ALL');
                  setSelectedKecamatan('ALL');
                }}
                className="mt-3 px-5 py-2 bg-[#254180] text-white rounded-full text-xs font-bold"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Business Detail Modal */}
      {activeModalBusiness && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setActiveModalBusiness(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-3">
              <span className="px-3 py-1 bg-blue-50 text-[#254180] text-xs font-bold rounded-md">
                {activeModalBusiness.sector}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-1 pr-10">
              {activeModalBusiness.businessName}
            </h3>
            <p className="text-xs text-slate-500 mb-6 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {activeModalBusiness.location}, Kabupaten Bandung, Jawa Barat
            </p>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Deskripsi Bisnis
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  {activeModalBusiness.description}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                <FounderAvatar biz={activeModalBusiness} size="w-16 h-16 text-lg" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">CEO / Founder</span>
                  <span className="text-sm font-bold text-slate-900">{activeModalBusiness.ceo}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">{activeModalBusiness.phone}</span>
                </div>
              </div>

              <a
                href={waHref(activeModalBusiness)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModalBusiness(null)}
                className="px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
