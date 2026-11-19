# CLAUDE.md

Panduan untuk Claude Code saat bekerja di repo ini. Bahasa percakapan dengan pemilik proyek: **Bahasa Indonesia**. Teks yang tampil di website juga Bahasa Indonesia.

## Ringkasan proyek

Website resmi **BPC HIPMI Kabupaten Bandung** (organisasi pengusaha muda). Satu halaman (single page) dengan section: Beranda, Tentang, Galeri, BizLab, Direktori Bisnis, HIPMI GO, Keanggotaan (Coming Soon), Kontak. Ada halaman admin di `/#admin` untuk mengelola konten tanpa mengubah kode.

## Status terkini

- Website **sudah online** di `https://hipmi-kab-bandung.seokojinaonlyrin.workers.dev` (Cloudflare Workers, terhubung ke repo GitHub `regi-2003/Hipmi-Web`, build otomatis tiap push ke `main`).
- Database Supabase terhubung. Direktori anggota, galeri, dan pengaturan website dibaca dari database.
- Halaman admin: `/#admin` (login email + password akun admin Supabase).
- Tombol Daftar/Bergabung membuka Google Form pendaftaran (setting `join_url`).
- **Belum:** domain kustom (domain dari Hostinger, DNS dipindah ke Cloudflare, lalu disambungkan lewat tab Domains di proyek Workers).

## Tech stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS v4 (plugin `@tailwindcss/vite`), ikon `lucide-react`
- Supabase (Postgres + Auth + Storage) lewat `@supabase/supabase-js`
- Tidak ada React Router. Routing hanya satu cek: `window.location.hash === '#admin'` di `src/main.tsx`.
- Hosting: Cloudflare (proyek Workers dengan static assets, repo terhubung ke GitHub, build otomatis tiap push ke `main`).

## Perintah

```
npm install --legacy-peer-deps   # wajib pakai flag ini (konflik peer dependency)
npm run dev                      # dev server di http://localhost:3000
npm run build                    # build produksi ke dist/
npm run lint                     # tsc --noEmit (type check)
```

Setelah mengubah kode, jalankan `npm run lint` dan `npm run build` sebelum menyatakan selesai.

## Struktur kode

```
src/
  main.tsx                 Pintu masuk. Hash #admin -> AdminPage, selain itu -> Site (dibungkus SettingsProvider)
  App.tsx                  Susunan section, scroll-spy navigasi, handler tombol daftar
  types.ts                 Tipe MemberBusiness, GalleryPhoto, NavItem
  lib/
    supabase.ts            Klien Supabase, upload/hapus gambar, kompres gambar, nama bucket
    settings.tsx           SETTINGS_GROUPS (daftar semua teks/gambar yang bisa diedit), SettingsProvider, useSettings, waLink, joinHref
    useData.ts             Hook useMembers, useGallery (ambil dari Supabase; fallback ke mockData jika env kosong)
  data/mockData.ts         Data contoh (dipakai hanya jika Supabase belum dikonfigurasi)
  components/
    AdminPage.tsx          Login + tab Anggota, Galeri Event, Pengaturan Website (CRUD)
    Hero, StatsBar, AboutSection, GallerySection, BizLabSection,
    DirectorySection, HipmiGoSection, MembershipSection, ContactSection,
    Navbar, Footer, HipmiLogo
supabase/
  schema.sql               Skema lengkap (tabel, RLS, bucket storage, data awal). Idempotent.
  update-pengaturan.sql    Hanya bagian site_settings + bucket 'site' (untuk yang sudah menjalankan schema lama)
PANDUAN-DATABASE.md        Panduan setup untuk pemilik (Bahasa Indonesia)
```

## Alur data

- **Anggota** (`members`) dan **galeri** (`gallery_photos`) dibaca lewat `useMembers` / `useGallery`. Admin menulisnya langsung ke tabel.
- **Teks dan gambar website** disimpan di tabel `site_settings` (key, value). `SettingsProvider` memuatnya sekali saat website dibuka dan menggabungkannya dengan nilai bawaan (`def`) di `SETTINGS_GROUPS`. Komponen membaca lewat `const s = useSettings()`, misalnya `s.hero_title_1`.
- Website menahan tampilan (layar kosong) maksimal 3 detik sampai pengaturan termuat, supaya tidak berkedip dari teks bawaan ke teks asli.
- Nilai kosong di `site_settings` diabaikan (dipakai nilai bawaan), **kecuali** key di `ALLOW_EMPTY` (`nav_bizlab_badge`, `nav_keanggotaan_badge`).

### Menambah teks/gambar baru yang bisa diedit dari admin

1. Tambahkan field di grup yang sesuai pada `SETTINGS_GROUPS` (`src/lib/settings.tsx`): `f('kunci', 'Label', 'text' | 'textarea' | 'image', 'nilai bawaan', 'petunjuk opsional')`.
2. Pakai di komponen: `const s = useSettings();` lalu `{s.kunci}`.
3. Tidak perlu migrasi SQL. Tab "Pengaturan Website" di admin otomatis menampilkan field baru dari `SETTINGS_GROUPS`.
4. Jika field boleh dikosongkan, tambahkan key-nya ke `ALLOW_EMPTY`.

### Menambah kolom pada anggota

Ubah tabel di `supabase/schema.sql` (dan sediakan SQL `alter table` untuk database yang sudah berjalan), lalu perbarui `MemberRow` dan `toMember` di `useData.ts`, tipe di `types.ts`, form di `AdminPage.tsx` (`MembersAdmin`), dan tampilan di `DirectorySection.tsx`.

## Database (Supabase)

Tabel: `members`, `gallery_photos`, `site_settings`. Bucket storage publik: `founders`, `events`, `site`.

**RLS (Row Level Security) adalah satu-satunya pelindung data.** Aturannya:
- Pengunjung (anon): hanya boleh **membaca** (`members` hanya yang `is_published = true`).
- User yang login (admin): boleh tambah/ubah/hapus.
- Jangan pernah melonggarkan policy tanpa alasan kuat. Setelah mengubah policy, uji bahwa penulisan tanpa login ditolak.
- Pendaftaran user baru (sign up) di Supabase **harus mati**. Akun admin dibuat manual di dashboard.

## Keamanan dan rahasia (penting)

- File kunci: `.env.local` (diabaikan Git oleh `.env*` di `.gitignore`). Contoh kosong ada di `.env.example`.
- Variabel yang dipakai: `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` (isinya publishable key `sb_publishable_...`).
- Variabel berawalan `VITE_` **ditanam ke JavaScript hasil build dan terlihat publik**. Hanya kunci publik yang boleh memakai awalan ini.
- **Jangan pernah** menulis, mencetak, mengomit, atau meminta kunci rahasia (`sb_secret_...`, `service_role`, password database, token) di kode, log, dokumentasi, atau pesan commit.
- Jangan membaca atau menampilkan isi `.env.local` tanpa kebutuhan jelas. Jangan memasukkan nilainya ke file yang akan di-commit.
- Sebelum commit: pastikan `git status` tidak memuat `.env.local`.
- Jika sebuah kunci rahasia terlanjur ter-commit: anggap bocor, ganti kuncinya dulu (rotasi), baru bersihkan riwayat.

## Deploy (Cloudflare)

- Build command: `npm run build`. Output: `dist`.
- Variabel **Build** (bukan runtime) di Cloudflare: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `NODE_VERSION=22`. Nama harus persis, dengan garis bawah.
- Variabel `VITE_` dibaca saat **build**. Mengubahnya butuh build ulang (Retry build atau push baru).
- File `.npmrc` berisi `legacy-peer-deps=true` harus ada di repo, kalau tidak `npm install` di server build gagal (ERESOLVE).
- Konten yang diubah lewat admin tidak butuh deploy ulang. Perubahan kode butuh push ke `main`.

## Konvensi

- UI berbahasa Indonesia. Kode, nama variabel, dan komentar boleh Indonesia atau Inggris, ikuti gaya file yang sedang diedit.
- Styling dengan kelas utilitas Tailwind. Warna utama: biru tua (`#254180`, `#0a152e`, `#0f224a`) dan kuning aksen (`#EAB308`). Ikuti pola komponen yang sudah ada.
- Komponen section memakai `useSettings()` untuk semua teks, jadi jangan menulis teks permanen di komponen bila seharusnya bisa diedit admin.
- Jangan memakai `localStorage` untuk data penting. Data persisten ada di Supabase.
- Gunakan `uploadImage()` dari `src/lib/supabase.ts` untuk semua unggahan gambar (otomatis dikecilkan, ID unik tetap jalan di http://).
- Tombol "Daftar/Bergabung" memakai `joinHref(settings)`: tujuan default Google Form (setting `join_url`), jika kosong ke WhatsApp.

## Jebakan yang sudah pernah terjadi

- `npm install` tanpa `--legacy-peer-deps` gagal (ERESOLVE).
- `crypto.randomUUID` tidak ada saat website dibuka lewat `http://IP` (bukan localhost/https). Sudah ditangani dengan `uniqueId()` di `supabase.ts`. Jangan menambah pemakaian API browser yang hanya jalan di konteks aman tanpa fallback.
- Pesan sukses "Tersimpan" di admin pernah menutupi error upload gambar. Tampilkan error di dekat kolom yang bersangkutan.
- Variabel Cloudflare dengan nama salah (garis bawah hilang) membuat website jatuh ke data contoh tanpa pesan error.
- `vite.config.ts` memakai `__dirname` (muncul peringatan Vite, tidak merusak).

## Hasil verifikasi keamanan

Diuji pada website yang sudah online. Ulangi setiap kali policy RLS atau skema berubah.

| Uji | Cara | Hasil yang benar | Status |
|---|---|---|---|
| Repo tidak melacak file env | `git ls-files \| findstr /i env` | Kosong (atau hanya `.env.example`) | Lolos |
| `.env.local` tidak pernah masuk riwayat | `git log --all --oneline -- .env.local` | Kosong | Lolos |
| Penulisan tanpa login ditolak | `fetch` POST ke `/rest/v1/members` dengan kunci publishable dari Console (jendela Incognito) | Error `new row violates row-level security policy` (kode 42501) | Lolos |
| Website tersambung ke database | Direktori menampilkan data admin, bukan data contoh | Data dari database | Lolos |

Kode uji penulisan (jalankan di Console jendela Incognito, ganti `KUNCI` dengan kunci publishable dari `.env.local`; kunci harus diapit tanda kutip):

```js
fetch('https://PROJECT-REF.supabase.co/rest/v1/members', {method:'POST', headers:{apikey:'KUNCI', 'Content-Type':'application/json'}, body:JSON.stringify({business_name:'tes',ceo:'x',sector:'x',phone:'1',location:'x'})}).then(r=>r.text()).then(console.log)
```

Jika uji ini malah berhasil menambah baris, itu bahaya: hapus baris `tes` di Supabase (Table Editor), jalankan ulang `supabase/schema.sql`, lalu ulangi uji.

## Checklist keamanan berjalan

- [ ] 2FA aktif di GitHub, Supabase, Cloudflare, dan Hostinger.
- [ ] Supabase: **Allow new users to sign up** tetap mati.
- [ ] Password admin kuat, unik, dan hanya dipegang pengurus yang berwenang.
- [ ] Supabase **Authentication, URL Configuration**: Site URL diisi domain asli setelah domain terpasang.
- [ ] Tidak ada kunci `secret` / `service_role` di kode, repo, variabel `VITE_`, maupun pesan commit.
- [ ] `git status` tidak pernah memuat `.env.local` sebelum commit.
- [ ] GitHub secret scanning / push protection diaktifkan bila tersedia.
- [ ] Penggunaan Supabase (Usage) dicek berkala: egress, ukuran database, penyimpanan file.
- [ ] Setelah mengubah policy RLS, uji penulisan tanpa login (tabel di atas).

## Prosedur operasional (runbook)

**Menambah / mengubah / menghapus anggota, foto galeri, atau teks website**
Lewat `/#admin`. Tidak perlu deploy ulang. Gambar di admin langsung tersimpan saat dipilih.

**Mengubah kode**
1. Edit di VS Code, jalankan `npm run lint` dan `npm run build`.
2. Commit dengan pesan (isi kotak Message dulu, kalau kosong commit dibatalkan), lalu push ke `main`.
3. Cloudflare membangun otomatis. Cek di tab Deployments proyek Workers.

**Website tampil tapi anggota kosong / berisi data contoh**
Variabel Build di Cloudflare tidak terbaca. Pastikan nama persis `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `NODE_VERSION` (di bagian Build, bukan runtime), lalu Retry build.

**Mengganti kunci (rotasi)**
1. Supabase, Project Settings, API Keys: buat kunci baru.
2. Ganti di `.env.local` dan di variabel Build Cloudflare.
3. Build ulang, pastikan website berfungsi, lalu hapus kunci lama.
Untuk kunci rahasia yang bocor: ganti dulu, baru bersihkan riwayat Git.

**Proyek Supabase dijeda (paket gratis, ±1 minggu tanpa aktivitas)**
Website tetap tampil dengan teks bawaan tapi daftar anggota kosong. Buka dashboard Supabase, klik Restore.

**Memasang domain kustom**
1. Beli domain di Hostinger (domain saja, tanpa paket hosting).
2. Cloudflare: Add a domain, paket Free, catat dua nameserver.
3. Hostinger: Domains, Nameservers, Change nameservers ke nameserver Cloudflare (matikan DNSSEC jika aktif).
4. Tunggu status Active di Cloudflare.
5. Proyek Workers, tab Domains, tambahkan custom domain.
6. Supabase: isi Site URL dengan domain baru.

## Yang belum selesai / bisa dikembangkan

- Domain kustom belum dipasang (lihat runbook di atas).
- Teks kecil di kode yang belum bisa diedit admin: "Lihat Profil" di kartu anggota, tautan footer, logo navbar.
- Halaman Keanggotaan masih Coming Soon.
- Paket gratis Supabase: proyek dijeda otomatis setelah ±1 minggu tanpa aktivitas, ada batas egress bulanan. Pantau di dashboard.
