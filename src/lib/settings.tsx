import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

// =====================================================================
// Daftar SEMUA teks & gambar website yang bisa diubah dari halaman admin.
// Nilai `def` adalah isi bawaan; jika admin mengosongkan/belum mengisi,
// website memakai nilai bawaan ini.
// =====================================================================
export type FieldType = 'text' | 'textarea' | 'image';
export interface Field {
  key: string;
  label: string;
  type: FieldType;
  def: string;
  hint?: string;
}
export interface Group {
  id: string;
  title: string;
  fields: Field[];
}

const f = (key: string, label: string, type: FieldType, def: string, hint?: string): Field => ({
  key, label, type, def, hint,
});

export const SETTINGS_GROUPS: Group[] = [
  {
    id: 'kontak',
    title: 'Kontak & WhatsApp',
    fields: [
      f('contact_person', 'Nama penanggung jawab WhatsApp', 'text', 'Pak Binsa'),
      f('wa_number', 'Nomor WhatsApp (format 62, tanpa + dan spasi)', 'text', '6285811532572', 'Contoh: 6285811532572 (untuk 0858-1153-2572)'),
      f('wa_display', 'Nomor WhatsApp (tampilan)', 'text', '0858-1153-2572'),
      f('address', 'Alamat sekretariat', 'textarea', 'Jl. Ceuri No.1, Katapang, Kec. Katapang, Kabupaten Bandung, Jawa Barat 40921'),
      f('email', 'Email resmi', 'text', 'sekretariat@hipmikabbandung.org'),
      f('hours', 'Jam pelayanan', 'text', 'Senin – Jumat: 09.00 – 17.00 WIB'),
      f('join_url', 'Link pendaftaran anggota (misalnya Google Form)', 'text', 'https://forms.gle/r2Gy9PYTd9wgy57s8', 'Isi dengan link https://... Semua tombol Daftar/Bergabung membuka link ini. Jika dikosongkan, tombol membuka WhatsApp.'),
      f('join_message', 'Pesan WhatsApp otomatis saat tombol Daftar diklik', 'textarea', 'Halo Pak Binsa, saya ingin mendaftar menjadi anggota HIPMI Kabupaten Bandung. Mohon informasi langkah pendaftarannya.'),
    ],
  },
  {
    id: 'hero',
    title: 'Halaman Depan (Hero)',
    fields: [
      f('hero_image', 'Foto latar halaman depan', 'image', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2000&q=85'),
      f('hero_tagline', 'Tulisan kecil di atas judul', 'text', 'HIPMI KAB. BANDUNG • JAWA BARAT'),
      f('hero_title_1', 'Judul baris 1', 'text', 'BANGKIT BERSAMA'),
      f('hero_title_2', 'Judul baris 2', 'text', 'KABUPATEN BANDUNG'),
      f('hero_subtitle', 'Teks di bawah judul', 'textarea', 'Bergabunglah bersama wadah organisasi pengusaha muda terdepan di Kabupaten Bandung. Membangun kemandirian ekonomi, menggerakkan potensi 31 kecamatan, dan mencetak wirausahawan pejuang berdaya saing global.'),
    ],
  },
  {
    id: 'statistik',
    title: 'Angka Statistik (bar biru)',
    fields: [1, 2, 3, 4].flatMap((n) => {
      const d = [
        ['31', '', 'Kecamatan Terjangkau'],
        ['12', '', 'Bidang Usaha & Kompartemen'],
        ['450', '+', 'Pengusaha Muda Tergabung'],
        ['185', '+', 'Kemitraan Strategis & UMKM'],
      ][n - 1];
      return [
        f(`stat_${n}_value`, `Angka ${n}`, 'text', d[0]),
        f(`stat_${n}_suffix`, `Tanda di belakang angka ${n} (mis. +)`, 'text', d[1]),
        f(`stat_${n}_label`, `Keterangan ${n}`, 'text', d[2]),
      ];
    }),
  },
  {
    id: 'tentang',
    title: 'Tentang Kami',
    fields: [
      f('about_tagline', 'Tulisan kecil di atas judul', 'text', 'HIMPUNAN PENGUSAHA MUDA INDONESIA'),
      f('about_title', 'Judul', 'text', 'HIPMI BPC Kabupaten Bandung'),
      f('about_p1', 'Paragraf 1', 'textarea', 'Sejak didirikan, BPC HIPMI Kabupaten Bandung konsisten membina pengusaha muda untuk berjuang — bukan hanya untuk kesuksesan diri dan usahanya, tetapi demi kemandirian ekonomi Bumi Parahyangan dan Indonesia.'),
      f('about_p2', 'Paragraf 2', 'textarea', 'Kabupaten Bandung memiliki keragaman potensi ekonomi luar biasa: mulai dari sentra agribisnis dan perkebunan kopi specialty di Ciwidey dan Pangalengan, denyut industri tekstil & fesyen kreatif di Majalaya, hingga destinasi ekowisata dan industri manufaktur. HIPMI hadir sebagai rumah bersama untuk tumbuh, berjejaring, dan saling menguatkan dalam semangat Pengusaha Pejuang, Pejuang Pengusaha.'),
      f('about_image', 'Foto Tentang Kami', 'image', 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1000&q=80'),
      f('about_badge_title', 'Kotak biru di foto: judul', 'text', 'Sejak 2008', 'Pastikan tahun berdiri sudah benar'),
      f('about_badge_sub', 'Kotak biru di foto: sub judul', 'text', 'Membina Pengusaha Muda Kab. Bandung'),
      f('about_badge_desc', 'Kotak biru di foto: keterangan', 'text', 'Mitra strategis Pemkab Bandung & akselerator ekonomi daerah.'),
      f('about_pillars_title', 'Judul bagian pilar', 'text', 'Tiga Pilar Kemajuan BPC HIPMI Kabupaten Bandung'),
      f('about_pillar_1_title', 'Pilar 1: judul', 'text', 'Akselerasi UMKM 31 Kecamatan'),
      f('about_pillar_1_desc', 'Pilar 1: isi', 'textarea', 'Menjangkau dan memberdayakan para pelaku usaha rintisan di pelosok Kabupaten Bandung, mulai dari sentra agro, konveksi garmen, hingga sentra kerajinan.'),
      f('about_pillar_2_title', 'Pilar 2: judul', 'text', 'Akses Modal & Business Matching'),
      f('about_pillar_2_desc', 'Pilar 2: isi', 'textarea', 'Menjembatani akses permodalan perbankan, angel investor, dan venture capital serta membuka jalur rantai pasok B2B antarsesama anggota HIPMI se-Indonesia.'),
      f('about_pillar_3_title', 'Pilar 3: judul', 'text', 'Advokasi Kebijakan & Digitalisasi'),
      f('about_pillar_3_desc', 'Pilar 3: isi', 'textarea', 'Menjadi mitra kritis konstruktif bagi pemerintah daerah dalam melahirkan regulasi ramah investasi dan mengadopsi teknologi digital bagi pengusaha muda.'),
      f('about_vision', 'Visi (jendela "Kenali Lebih Dalam")', 'textarea', 'Menjadikan BPC HIPMI Kabupaten Bandung sebagai lokomotif utama pertumbuhan ekonomi daerah berbasis inovasi, kolaborasi lintas sektor, dan keberpihakan pada produk lokal kebanggaan Bandung Selatan.'),
      f('about_values', 'Nilai-nilai (satu nilai per baris)', 'textarea', 'Integritas & Etika Bisnis Tinggi\nJiwa Pejuang & Pantang Menyerah\nSolidaritas & Sinergi Persaudaraan\nInovatif, Adaptif, dan Berdaya Saing'),
      f('about_area', 'Wilayah cakupan', 'textarea', 'Mencakup 31 Kecamatan dari Ciwidey, Rancabali, Pasirjambu, Pangalengan, Cimaung, Banjaran, Arjasari, Soreang, Kutawaringin, Katapang, Margahayu, Margaasih, Dayeuhkolot, Baleendah, Ciparay, Pacet, Kertasari, Majalaya, Solokanjeruk, Paseh, Ibun, Cikancung, Cicalengka, Nagreg, Rancaekek, Cileunyi, Cilengkrang, Cimenyan, Bojongsoang, Cangkuang, hingga Pameungpeuk.'),
    ],
  },
  {
    id: 'bizlab',
    title: 'BizLab',
    fields: [
      f('bizlab_desc', 'Penjelasan BizLab', 'textarea', 'Ruang belajar, berdiskusi, dan berkolaborasi bagi pengusaha muda Kabupaten Bandung untuk mengembangkan usaha bersama HIPMI.'),
      f('bizlab_1_title', 'Poin 1: judul', 'text', 'Klinik & Mentoring Bisnis'),
      f('bizlab_1_desc', 'Poin 1: isi', 'textarea', 'Konsultasi langsung seputar strategi, legalitas, keuangan, dan pemasaran usaha bersama mentor berpengalaman.'),
      f('bizlab_2_title', 'Poin 2: judul', 'text', 'Workshop & Masterclass'),
      f('bizlab_2_desc', 'Poin 2: isi', 'textarea', 'Pelatihan praktis untuk meningkatkan kapasitas pengusaha muda, dari manajemen hingga digital marketing.'),
      f('bizlab_3_title', 'Poin 3: judul', 'text', 'Business Matching'),
      f('bizlab_3_desc', 'Poin 3: isi', 'textarea', 'Mempertemukan anggota dengan sesama pengusaha, mitra, dan calon pembeli untuk peluang kerja sama baru.'),
      f('bizlab_4_title', 'Poin 4: judul', 'text', 'Kolaborasi Komunitas'),
      f('bizlab_4_desc', 'Poin 4: isi', 'textarea', 'Ruang berjejaring dan bertukar ide antaranggota HIPMI Kabupaten Bandung.'),
      f('bizlab_message', 'Pesan WhatsApp otomatis tombol BizLab', 'textarea', 'Halo, saya ingin mendapatkan informasi tentang BizLab HIPMI Kabupaten Bandung.'),
    ],
  },
  {
    id: 'hipmigo',
    title: 'Aplikasi HIPMI GO',
    fields: [
      f('hipmigo_desc', 'Penjelasan', 'textarea', 'Gunakan HIPMI GO untuk mengakses KTA digital dan layanan keanggotaan HIPMI. Belum punya aplikasinya? Install dulu. Sudah punya? Langsung buka aplikasinya.'),
      f('hipmigo_install_url', 'Link tombol "Install Aplikasi"', 'text', 'https://hipmigo.co.id/', 'Isi link Play Store / App Store jika ada'),
      f('hipmigo_open_url', 'Link tombol "Buka Aplikasi"', 'text', 'https://hipmigo.co.id/'),
    ],
  },
  {
    id: 'keanggotaan',
    title: 'Keanggotaan',
    fields: [
      f('membership_title', 'Judul', 'text', 'Coming Soon'),
      f('membership_desc', 'Keterangan', 'textarea', 'Informasi lengkap keanggotaan BPC HIPMI Kabupaten Bandung akan segera hadir. Untuk pendaftaran anggota, silakan hubungi sekretariat melalui WhatsApp.'),
    ],
  },
  {
    id: 'footer',
    title: 'Footer (bagian bawah)',
    fields: [
      f('footer_desc', 'Deskripsi organisasi', 'textarea', 'Badan Pengurus Cabang Himpunan Pengusaha Muda Indonesia (BPC HIPMI) Kabupaten Bandung. Wadah resmi persatuan dan akselerasi wirausahawan muda Bumi Parahyangan.'),
      f('footer_motto', 'Semboyan', 'text', 'Pengusaha Pejuang, Pejuang Pengusaha'),
      f('footer_kompartemen', 'Kompartemen strategis (satu per baris)', 'textarea', 'Agribisnis, Kopi & Peternakan\nIndustri Tekstil, Garmen & Ekraf Majalaya\nPariwisata Alam & Ekowisata Ciwidey\nManufaktur, Logistik & Rantai Pasok\nTeknologi Digital & Inkubasi Start-up'),
    ],
  },
];

export type Settings = Record<string, string>;

export const DEFAULTS: Settings = Object.fromEntries(
  SETTINGS_GROUPS.flatMap((g) => g.fields.map((fl) => [fl.key, fl.def]))
);

// Pecah teks multi-baris menjadi daftar
export const lines = (text: string) =>
  text.split('\n').map((l) => l.trim()).filter(Boolean);

export const waLink = (s: Settings, message: string) =>
  `https://wa.me/${s.wa_number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

// Tujuan tombol Daftar/Bergabung: link pendaftaran jika diisi, jika kosong ke WhatsApp
export const joinHref = (s: Settings) =>
  s.join_url.trim() || waLink(s, s.join_message);

const Ctx = createContext<{ s: Settings; ready: boolean }>({ s: DEFAULTS, ready: true });
export const useSettings = () => useContext(Ctx).s;
export const useSettingsReady = () => useContext(Ctx).ready;

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [s, setS] = useState<Settings>(DEFAULTS);
  const [ready, setReady] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    let done = false;
    const finish = () => { if (!done) { done = true; setReady(true); } };
    const timer = setTimeout(finish, 3000); // jangan menahan tampilan terlalu lama
    supabase
      .from('site_settings')
      .select('key,value')
      .then(({ data }) => {
        if (data) {
          const merged = { ...DEFAULTS };
          for (const r of data as { key: string; value: string }[]) {
            if (r.key in DEFAULTS && r.value.trim() !== '') merged[r.key] = r.value;
          }
          setS(merged);
        }
        finish();
      });
    return () => clearTimeout(timer);
  }, []);

  return <Ctx.Provider value={{ s, ready }}>{children}</Ctx.Provider>;
};
