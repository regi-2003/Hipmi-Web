# Panduan Database (Supabase – gratis)

Data anggota dan galeri foto sekarang disimpan di Supabase, bukan lagi di dalam kode.
Admin bisa tambah/ubah/hapus lewat halaman **`https://domain-anda/#admin`** tanpa coding.

## A. Setup sekali saja (±10 menit)

1. Daftar di https://supabase.com (gratis) → **New project**. Pilih region **Singapore**. Catat password database.
2. Buka **SQL Editor → New query**, tempel seluruh isi `supabase/schema.sql`, klik **Run**.
   Ini membuat tabel `members` & `gallery_photos`, aturan keamanan, bucket foto, dan 6 data contoh.
3. Buat akun admin: **Authentication → Users → Add user → Create new user**
   (isi email + password, centang *Auto Confirm User*).
4. **PENTING (keamanan):** **Authentication → Sign In / Providers** → matikan
   **"Allow new users to sign up"**. Kalau tidak, orang lain bisa mendaftar dan ikut mengedit data.
5. Ambil kunci: **Project Settings → API** → salin **Project URL** dan **anon public key**.
6. Di folder proyek, salin `.env.example` menjadi `.env.local`, lalu isi:
   ```
   VITE_SUPABASE_URL="https://xxxx.supabase.co"
   VITE_SUPABASE_ANON_KEY="kunci-anon-public"
   ```
7. Jalankan: `npm install --legacy-peer-deps` lalu `npm run dev`.

> Kunci *anon public* memang aman ada di website. Yang melindungi data adalah aturan keamanan (RLS)
> di `schema.sql`: pengunjung hanya bisa membaca, hanya admin yang login bisa mengubah.
> Jangan pernah memakai kunci `service_role` di website.

> **Sudah pernah menjalankan `schema.sql` versi lama?** Jalankan juga `supabase/update-pengaturan.sql`
> di SQL Editor (sekali saja). Kalau baru mulai dari nol, `schema.sql` terbaru sudah memuat semuanya.

## B. Memakai halaman admin

Buka `/#admin` → login → pilih tab:
- **Anggota**: nama bisnis, deskripsi, CEO, sektor, no. telepon, lokasi, foto founder.
  Sektor bisa dipilih atau diketik sektor baru (otomatis muncul sebagai filter di website).
  Centang/lepas "Tampilkan di website" untuk menyembunyikan tanpa menghapus.
- **Pengaturan Website**: ubah semua teks, foto, kontak, nomor WhatsApp, alamat, angka statistik, link HIPMI GO, dan isi footer. Klik judul grup untuk membuka, ubah, lalu **Simpan Semua Perubahan** (tombol di bagian bawah). Tombol "kembalikan bawaan" mengembalikan isi awal.
- **Galeri Event**: unggah banyak foto sekaligus. Foto otomatis diperkecil agar hemat penyimpanan.

## C. Online (deploy gratis)

Upload proyek ke GitHub, lalu hubungkan ke **Vercel**, **Netlify**, atau **Cloudflare Pages**.
- Build command: `npm run build`   •   Output directory: `dist`
- Tambahkan dua environment variable yang sama seperti di `.env.local`
  (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) di pengaturan hosting.

## D. Batas paket gratis Supabase

- Database 500 MB, penyimpanan foto 1 GB, cukup untuk ribuan anggota dan ratusan foto.
- Proyek gratis **otomatis dijeda jika tidak ada aktivitas ±1 minggu**. Kalau terjadi, buka dashboard
  Supabase lalu klik *Restore*. Agar tidak terjeda, pastikan website sering dikunjungi atau
  upgrade ke paket berbayar.

## Catatan
- Jika `.env.local` belum diisi, website tetap jalan memakai data contoh di `src/data/mockData.ts`.
