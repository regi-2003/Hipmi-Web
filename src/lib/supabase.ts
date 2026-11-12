import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Jika env belum diisi, website tetap jalan memakai data contoh (mockData.ts).
export const isSupabaseConfigured = Boolean(url && anonKey && !url.includes('xxxxxxxx'));

export const supabase = isSupabaseConfigured ? createClient(url!, anonKey!) : null;

export const BUCKET_FOUNDERS = 'founders';
export const BUCKET_EVENTS = 'events';
export const BUCKET_SITE = 'site';

// Perkecil foto dari HP (bisa 5-10 MB) sebelum diunggah, agar hemat kuota storage gratis.
export async function compressImage(file: File, maxSize = 1600, quality = 0.85): Promise<Blob> {
  if (!file.type.startsWith('image/')) throw new Error('File harus berupa gambar.');
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error('Format gambar tidak didukung. Gunakan file JPG, PNG, atau WEBP.');
  }
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Gagal memproses gambar.'))), 'image/jpeg', quality)
  );
}

// Pembuat ID unik yang tetap jalan walau website dibuka lewat http:// (bukan localhost/https)
function uniqueId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function uploadImage(bucket: string, file: File, maxSize?: number): Promise<string> {
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
  const blob = await compressImage(file, maxSize);
  const path = `${uniqueId()}.jpg`;
  const { error } = await supabase.storage.from(bucket).upload(path, blob, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
  });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

// Hapus file di storage berdasarkan URL publiknya (best-effort).
export async function removeImageByUrl(bucket: string, publicUrl?: string | null) {
  if (!supabase || !publicUrl) return;
  const marker = `/object/public/${bucket}/`;
  const i = publicUrl.indexOf(marker);
  if (i === -1) return;
  await supabase.storage.from(bucket).remove([decodeURIComponent(publicUrl.slice(i + marker.length))]);
}
