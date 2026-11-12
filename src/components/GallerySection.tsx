import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { useGallery } from '../lib/useData';

export const GallerySection: React.FC = () => {
  const { data: GALLERY_PHOTOS, loading } = useGallery();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? i : (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length));
  const next = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % GALLERY_PHOTOS.length));

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, GALLERY_PHOTOS.length]);

  const active = activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  return (
    <section id="galeri" className="bg-slate-50 py-20 lg:py-28 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[3px] bg-[#EAB308] rounded-full inline-block" />
            <span className="text-[#254180] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
              DOKUMENTASI KEGIATAN
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeri Event BPC HIPMI Kab. Bandung
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Potret kebersamaan dan kegiatan HIPMI Kabupaten Bandung bersama para anggota.
          </p>
        </div>

        {loading && <p className="text-center text-slate-500 text-sm py-10">Memuat foto...</p>}
        {!loading && GALLERY_PHOTOS.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-10">Foto kegiatan akan segera ditambahkan.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setActiveIndex(idx)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 text-left shadow-sm hover:shadow-xl transition-all"
            >
              {failed[photo.id] ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#193366] to-[#0a152e] text-white/60">
                  <Camera className="w-8 h-8" />
                </div>
              ) : (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  onError={() => setFailed((f) => ({ ...f, [photo.id]: true }))}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <span className="inline-block mb-1 px-2 py-0.5 bg-[#EAB308] text-[#0f224a] text-[10px] font-bold uppercase rounded-full">
                  {photo.event}
                </span>
                <p className="text-white text-xs sm:text-sm font-semibold leading-snug">{photo.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Tutup"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Berikutnya"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.caption}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <figcaption className="mt-3 text-center text-white">
              <div className="font-bold">{active.caption}</div>
              <div className="text-xs text-slate-300">{active.event} • {active.date}</div>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};
