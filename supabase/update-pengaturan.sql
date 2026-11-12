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
