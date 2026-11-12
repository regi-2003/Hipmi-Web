import React, { useState } from 'react';
import { useSettings, waLink } from '../lib/settings';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  MessageSquare
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const s = useSettings();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Konsultasi Keanggotaan',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    const text =
      `Halo ${s.contact_person}, saya ${formState.name} (${formState.phone}).\n` +
      `Keperluan: ${formState.subject}\n` +
      (formState.email ? `Email: ${formState.email}\n` : '') +
      `Pesan: ${formState.message}`;
    window.open(waLink(s, text), '_blank', 'noopener,noreferrer');
    setIsSent(true);
  };

  return (
    <section id="kontak" className="bg-white py-20 lg:py-28 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office & Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[3px] bg-[#EAB308] rounded-full inline-block" />
              <span className="text-[#254180] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                SEKRETARIAT CABANG
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Hubungi BPC HIPMI Kabupaten Bandung
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Pintu sekretariat kami selalu terbuka untuk audiensi, kerjasama institusi, konsultasi usaha, dan pendaftaran anggota baru.
            </p>

            <div className="space-y-6 text-sm text-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#254180] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Alamat Sekretariat:</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">WhatsApp Hotline:</h4>
                  <a
                    href={waLink(s, "Halo, saya ingin bertanya tentang HIPMI Kabupaten Bandung.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-green-700 font-semibold hover:underline block"
                  >
                    {s.wa_display} (WhatsApp {s.contact_person})
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email Resmi:</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {s.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Jam Pelayanan:</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {s.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 p-8 rounded-3xl shadow-sm">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Kirim Pesan / Permohonan Audiensi
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Pesan akan dibuka di WhatsApp dan dikirim langsung ke {s.contact_person}.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#254180]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxx"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#254180]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#254180]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori Keperluan
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#254180]"
                    >
                      <option value="Konsultasi Keanggotaan">Pendaftaran Anggota & HIPMI GO</option>
                      <option value="BizLab">Informasi BizLab</option>
                      <option value="Kemitraan B2B">Kerjasama Bisnis / Business Matching</option>
                      <option value="Undangan Pembicara / Event">Undangan Audiensi / Event</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Isi Pesan / Keterangan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pesan, permohonan kerjasama, atau pertanyaan Anda..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#254180]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#254180] hover:bg-[#1a2e5c] text-white rounded-full font-bold text-xs sm:text-sm tracking-wide shadow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim via WhatsApp</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  WhatsApp Sudah Dibuka
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                  Silakan kirim pesan di WhatsApp. Jika jendela WhatsApp tidak terbuka, hubungi langsung nomor yang tertera di samping.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormState({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Konsultasi Keanggotaan',
                      message: '',
                    });
                  }}
                  className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-bold"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
