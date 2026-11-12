-- =====================================================================
-- Skema database HIPMI Kab. Bandung (Supabase / PostgreSQL)
-- Cara pakai: Supabase Dashboard -> SQL Editor -> New query -> tempel -> Run
-- =====================================================================

-- ---------- Tabel anggota (direktori bisnis) ----------
create table if not exists public.members (
  id            uuid primary key default gen_random_uuid(),
  business_name text not null,            -- 1. Nama bisnis
  description   text not null default '', -- 2. Deskripsi bisnis
  ceo           text not null,            -- 3. CEO
  sector        text not null,            -- 4. Sektor bisnis
  phone         text not null,            -- 5. No telepon
  location      text not null,            -- 6. Lokasi (kecamatan)
  founder_photo text,                     -- 7. URL foto founder
  is_published  boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ---------- Tabel galeri foto event ----------
create table if not exists public.gallery_photos (
  id          uuid primary key default gen_random_uuid(),
  image_url   text not null,
  caption     text not null,
  event       text not null default '',
  event_date  text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------- Keamanan (Row Level Security) ----------
-- Pengunjung website: hanya boleh MEMBACA.
-- Admin (user yang sudah login): boleh tambah / ubah / hapus.
alter table public.members        enable row level security;
alter table public.gallery_photos enable row level security;

drop policy if exists "members public read"   on public.members;
drop policy if exists "members admin all"     on public.members;
drop policy if exists "gallery public read"   on public.gallery_photos;
drop policy if exists "gallery admin all"     on public.gallery_photos;

create policy "members public read" on public.members
  for select using (is_published = true or auth.role() = 'authenticated');
create policy "members admin all" on public.members
  for all to authenticated using (true) with check (true);

create policy "gallery public read" on public.gallery_photos
  for select using (true);
create policy "gallery admin all" on public.gallery_photos
  for all to authenticated using (true) with check (true);

-- ---------- Storage (tempat upload foto) ----------
insert into storage.buckets (id, name, public)
values ('founders', 'founders', true), ('events', 'events', true)
on conflict (id) do nothing;

drop policy if exists "photos public read"  on storage.objects;
drop policy if exists "photos admin write"  on storage.objects;
drop policy if exists "photos admin update" on storage.objects;
drop policy if exists "photos admin delete" on storage.objects;

create policy "photos public read" on storage.objects
  for select using (bucket_id in ('founders', 'events'));
create policy "photos admin write" on storage.objects
  for insert to authenticated with check (bucket_id in ('founders', 'events'));
create policy "photos admin update" on storage.objects
  for update to authenticated using (bucket_id in ('founders', 'events'));
create policy "photos admin delete" on storage.objects
  for delete to authenticated using (bucket_id in ('founders', 'events'));

-- ---------- Data awal (contoh, boleh dihapus lewat halaman admin) ----------
insert into public.members (business_name, description, ceo, sector, phone, location, sort_order) values
 ('Puntang Highlands Specialty Coffee','Produsen kopi arabika specialty dari lereng Gunung Puntang, bermitra langsung dengan petani lokal.','M. Fajar Nugraha','Agribisnis & Kopi','+62 812-2234-5678','Cimaung',1),
 ('Majalaya Heritage Denim & Woven Labs','Pabrikasi denim selvedge dan tenun jacquard modern yang memasok brand streetwear nasional.','Rian Pratama','Tekstil & Fashion','+62 813-9876-1234','Majalaya',2),
 ('Rancabali Eco Luxury Glamping','Resort eco-tourism berkonsep kelestarian alam di tengah kebun teh Rancabali.','Sarah Amanda, S.E.','Pariwisata & Hospitality','+62 821-4455-6677','Rancabali',3),
 ('Soreang Digital Kreasi (SDK Tech)','Software house penyedia ERP UMKM, integrasi IoT pertanian, dan sistem ticketing event.','Bagas Aditya, S.Kom','Teknologi & Kreatif','+62 878-1122-3344','Soreang',4),
 ('Susu Murni Sabilulungan Agro','Pengolahan susu pasteurisasi dan aneka keju artisan dari peternak sapi perah Pangalengan.','drh. Hendra Wijaya','Kuliner & F&B','+62 819-3322-1100','Pangalengan',5),
 ('Trans Baleendah Cold Chain & Logistics','Jasa armada berpendingin dan gudang transit untuk pengiriman komoditas segar ke Jabodetabek.','H. Deden Kusnadi','Jasa','+62 812-7788-9900','Baleendah',6);

-- =====================================================================
-- UPDATE: Pengaturan Website (jalankan sekali di SQL Editor)
-- Membuat tempat penyimpanan semua teks/gambar/kontak yang bisa diubah dari admin.
-- =====================================================================
create table if not exists public.site_settings (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
drop policy if exists "settings public read" on public.site_settings;
drop policy if exists "settings admin all"   on public.site_settings;
create policy "settings public read" on public.site_settings
  for select using (true);
create policy "settings admin all" on public.site_settings
  for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('site', 'site', true)
on conflict (id) do nothing;

drop policy if exists "site photos public read"  on storage.objects;
drop policy if exists "site photos admin write"  on storage.objects;
drop policy if exists "site photos admin update" on storage.objects;
drop policy if exists "site photos admin delete" on storage.objects;
create policy "site photos public read" on storage.objects
  for select using (bucket_id = 'site');
create policy "site photos admin write" on storage.objects
  for insert to authenticated with check (bucket_id = 'site');
create policy "site photos admin update" on storage.objects
  for update to authenticated using (bucket_id = 'site');
create policy "site photos admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site');
