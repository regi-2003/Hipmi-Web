import React, { useEffect, useState, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  supabase,
  isSupabaseConfigured,
  uploadImage,
  removeImageByUrl,
  BUCKET_FOUNDERS,
  BUCKET_EVENTS,
  BUCKET_SITE,
} from '../lib/supabase';
import { MemberRow, GalleryRow } from '../lib/useData';
import { SETTINGS_GROUPS, DEFAULTS } from '../lib/settings';

const DEFAULT_SECTORS = [
  'Jasa',
  'Kuliner & F&B',
  'Agribisnis & Kopi',
  'Tekstil & Fashion',
  'Pariwisata & Hospitality',
  'Teknologi & Kreatif',
  'Manufaktur & Industri',
  'Perdagangan & Retail',
];

const inputCls =
  'w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#254180]';
const btnPrimary =
  'px-4 py-2 bg-[#254180] hover:bg-[#1a2e5c] text-white rounded-lg text-sm font-bold disabled:opacity-50';
const btnGhost =
  'px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold';

// ---------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) setError('Email atau password salah.');
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-white w-full max-w-sm rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-xl font-black text-slate-900">Admin HIPMI Kab. Bandung</h1>
        <input className={inputCls} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className={inputCls} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className={`${btnPrimary} w-full`} disabled={busy}>{busy ? 'Masuk...' : 'Masuk'}</button>
        <a href="#" className="block text-center text-xs text-slate-500 hover:underline">← Kembali ke website</a>
      </form>
    </div>
  );
};

// ---------------------------------------------------------------------
// Kelola anggota
// ---------------------------------------------------------------------
type MemberForm = {
  id?: string;
  business_name: string;
  description: string;
  ceo: string;
  sector: string;
  phone: string;
  location: string;
  founder_photo: string | null;
  is_published: boolean;
};

const emptyMember: MemberForm = {
  business_name: '',
  description: '',
  ceo: '',
  sector: '',
  phone: '',
  location: '',
  founder_photo: null,
  is_published: true,
};

const MembersAdmin: React.FC = () => {
  const [rows, setRows] = useState<MemberRow[]>([]);
  const [form, setForm] = useState<MemberForm | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const { data, error } = await supabase!
      .from('members')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (error) setMsg('Gagal memuat: ' + error.message);
    else setRows(data as MemberRow[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const sectors = Array.from(new Set([...DEFAULT_SECTORS, ...rows.map((r) => r.sector)]));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    setMsg('');
    try {
      let photo = form.founder_photo;
      if (file) {
        const newUrl = await uploadImage(BUCKET_FOUNDERS, file, 800);
        await removeImageByUrl(BUCKET_FOUNDERS, photo);
        photo = newUrl;
      }
      const payload = {
        business_name: form.business_name.trim(),
        description: form.description.trim(),
        ceo: form.ceo.trim(),
        sector: form.sector.trim(),
        phone: form.phone.trim(),
        location: form.location.trim(),
        founder_photo: photo,
        is_published: form.is_published,
      };
      const res = form.id
        ? await supabase!.from('members').update(payload).eq('id', form.id)
        : await supabase!.from('members').insert({ ...payload, sort_order: rows.length + 1 });
      if (res.error) throw res.error;
      setForm(null);
      setFile(null);
      await load();
      setMsg('Tersimpan.');
    } catch (err: any) {
      setMsg('Gagal menyimpan: ' + (err.message || err));
    }
    setBusy(false);
  };

  const remove = async (r: MemberRow) => {
    if (!confirm(`Hapus "${r.business_name}"?`)) return;
    const { error } = await supabase!.from('members').delete().eq('id', r.id);
    if (error) return setMsg('Gagal menghapus: ' + error.message);
    await removeImageByUrl(BUCKET_FOUNDERS, r.founder_photo);
    load();
  };

  const set = (k: keyof MemberForm, v: any) => setForm((f) => (f ? { ...f, [k]: v } : f));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Anggota ({rows.length})</h2>
        <button className={btnPrimary} onClick={() => { setForm({ ...emptyMember }); setFile(null); setMsg(''); }}>
          + Tambah Anggota
        </button>
      </div>
      {msg && <p className="mb-3 text-sm text-slate-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{msg}</p>}

      {form && (
        <form onSubmit={save} className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 grid gap-3 sm:grid-cols-2">
          <h3 className="sm:col-span-2 font-bold">{form.id ? 'Ubah Anggota' : 'Anggota Baru'}</h3>
          <label className="text-xs font-semibold text-slate-600">Nama Bisnis *
            <input className={inputCls} required value={form.business_name} onChange={(e) => set('business_name', e.target.value)} />
          </label>
          <label className="text-xs font-semibold text-slate-600">CEO *
            <input className={inputCls} required value={form.ceo} onChange={(e) => set('ceo', e.target.value)} />
          </label>
          <label className="text-xs font-semibold text-slate-600">Sektor Bisnis *
            <input className={inputCls} required list="sector-list" value={form.sector} onChange={(e) => set('sector', e.target.value)} placeholder="Pilih atau ketik sektor baru" />
            <datalist id="sector-list">{sectors.map((s) => <option key={s} value={s} />)}</datalist>
          </label>
          <label className="text-xs font-semibold text-slate-600">No. Telepon / WhatsApp *
            <input className={inputCls} required value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="0812xxxxxxx" />
          </label>
          <label className="text-xs font-semibold text-slate-600 sm:col-span-2">Lokasi (kecamatan) *
            <input className={inputCls} required value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Contoh: Katapang" />
          </label>
          <label className="text-xs font-semibold text-slate-600 sm:col-span-2">Deskripsi Bisnis
            <textarea className={inputCls} rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </label>
          <div className="sm:col-span-2 flex items-center gap-4">
            {(file || form.founder_photo) && (
              <img
                src={file ? URL.createObjectURL(file) : form.founder_photo!}
                alt="Foto founder"
                className="w-16 h-16 rounded-full object-cover border"
              />
            )}
            <label className="text-xs font-semibold text-slate-600 flex-1">Foto Founder
              <input className={inputCls} type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
          </div>
          <label className="sm:col-span-2 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} />
            Tampilkan di website
          </label>
          <div className="sm:col-span-2 flex gap-2">
            <button className={btnPrimary} disabled={busy}>{busy ? 'Menyimpan...' : 'Simpan'}</button>
            <button type="button" className={btnGhost} onClick={() => { setForm(null); setFile(null); }}>Batal</button>
          </div>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl divide-y">
        {rows.length === 0 && <p className="p-5 text-sm text-slate-500">Belum ada anggota.</p>}
        {rows.map((r) => (
          <div key={r.id} className="p-4 flex items-center gap-4">
            {r.founder_photo ? (
              <img src={r.founder_photo} alt="" className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs">—</div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm truncate">
                {r.business_name} {!r.is_published && <span className="ml-1 text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">DISEMBUNYIKAN</span>}
              </div>
              <div className="text-xs text-slate-500 truncate">{r.ceo} • {r.sector} • {r.location} • {r.phone}</div>
            </div>
            <button className={btnGhost} onClick={() => { setForm({ ...r }); setFile(null); setMsg(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Ubah</button>
            <button className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg" onClick={() => remove(r)}>Hapus</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// Kelola galeri
// ---------------------------------------------------------------------
const GalleryAdmin: React.FC = () => {
  const [rows, setRows] = useState<GalleryRow[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const { data, error } = await supabase!
      .from('gallery_photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error) setMsg('Gagal memuat: ' + error.message);
    else setRows(data as GalleryRow[]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return setMsg('Pilih minimal satu foto.');
    setBusy(true);
    setMsg('');
    try {
      for (const f of files) {
        const url = await uploadImage(BUCKET_EVENTS, f, 1600);
        const { error } = await supabase!.from('gallery_photos').insert({
          image_url: url,
          caption: caption.trim() || f.name.replace(/\.[^.]+$/, ''),
          event: event.trim(),
          event_date: date.trim(),
        });
        if (error) throw error;
      }
      setFiles([]);
      setCaption('');
      (document.getElementById('gallery-file') as HTMLInputElement).value = '';
      setMsg(`${files.length} foto berhasil diunggah.`);
      await load();
    } catch (err: any) {
      setMsg('Gagal mengunggah: ' + (err.message || err));
    }
    setBusy(false);
  };

  const remove = async (r: GalleryRow) => {
    if (!confirm(`Hapus foto "${r.caption}"?`)) return;
    const { error } = await supabase!.from('gallery_photos').delete().eq('id', r.id);
    if (error) return setMsg('Gagal menghapus: ' + error.message);
    await removeImageByUrl(BUCKET_EVENTS, r.image_url);
    load();
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Galeri Event ({rows.length})</h2>
      {msg && <p className="mb-3 text-sm text-slate-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{msg}</p>}

      <form onSubmit={add} className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 grid gap-3 sm:grid-cols-3">
        <label className="text-xs font-semibold text-slate-600 sm:col-span-3">Foto (boleh pilih banyak sekaligus)
          <input id="gallery-file" className={inputCls} type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
        </label>
        <label className="text-xs font-semibold text-slate-600">Keterangan foto
          <input className={inputCls} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Contoh: Pelantikan pengurus" />
        </label>
        <label className="text-xs font-semibold text-slate-600">Nama event
          <input className={inputCls} value={event} onChange={(e) => setEvent(e.target.value)} placeholder="Contoh: BizLab" />
        </label>
        <label className="text-xs font-semibold text-slate-600">Tanggal / bulan
          <input className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} placeholder="Contoh: November 2026" />
        </label>
        <div className="sm:col-span-3">
          <button className={btnPrimary} disabled={busy}>{busy ? 'Mengunggah...' : 'Unggah Foto'}</button>
        </div>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {rows.map((r) => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <img src={r.image_url} alt={r.caption} className="w-full aspect-[4/3] object-cover" />
            <div className="p-3">
              <div className="text-xs font-bold truncate">{r.caption}</div>
              <div className="text-[11px] text-slate-500 truncate">{r.event} {r.event_date && `• ${r.event_date}`}</div>
              <button className="mt-2 text-xs text-red-600 hover:underline" onClick={() => remove(r)}>Hapus</button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-sm text-slate-500 col-span-full">Belum ada foto.</p>}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// Pengaturan website (teks, gambar, kontak, dll)
// ---------------------------------------------------------------------
const SettingsAdmin: React.FC = () => {
  const [values, setValues] = useState<Record<string, string>>({ ...DEFAULTS });
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [fieldMsg, setFieldMsg] = useState<Record<string, string>>({});
  const [activeGroup, setActiveGroup] = useState(SETTINGS_GROUPS[0].id);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    supabase!
      .from('site_settings')
      .select('key,value')
      .then(({ data, error }) => {
        if (error) {
          setMsg('Gagal memuat: ' + error.message + ' (sudah menjalankan update-pengaturan.sql?)');
        } else {
          const merged = { ...DEFAULTS };
          for (const r of (data ?? []) as { key: string; value: string }[]) {
            if (r.key in DEFAULTS && r.value.trim() !== '') merged[r.key] = r.value;
          }
          setValues(merged);
        }
        setLoaded(true);
      });
  }, []);

  const set = (k: string, v: string) => setValues((x) => ({ ...x, [k]: v }));

  const pickImage = async (key: string, file: File | undefined) => {
    if (!file) return;
    setUploading(key);
    setFieldMsg({ [key]: 'Mengunggah gambar...' });
    try {
      const url = await uploadImage(BUCKET_SITE, file, 2000);
      // langsung disimpan ke database, tidak perlu klik Simpan lagi
      const { error } = await supabase!
        .from('site_settings')
        .upsert({ key, value: url, updated_at: new Date().toISOString() }, { onConflict: 'key' });
      if (error) throw error;
      const old = values[key];
      set(key, url);
      if (old !== DEFAULTS[key]) await removeImageByUrl(BUCKET_SITE, old);
      setFieldMsg({ [key]: '✓ Gambar berhasil diunggah dan sudah aktif. Muat ulang website untuk melihatnya.' });
    } catch (err: any) {
      setFieldMsg({ [key]: '✗ Gagal: ' + (err?.message || String(err)) });
    }
    setUploading(null);
  };

  const save = async () => {
    setBusy(true);
    setMsg('');
    const rows = Object.entries(values).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase!.from('site_settings').upsert(rows, { onConflict: 'key' });
    setMsg(error ? 'Gagal menyimpan: ' + error.message : 'Tersimpan. Muat ulang website untuk melihat perubahan.');
    setBusy(false);
  };

  if (!loaded) return <p className="text-slate-500 text-sm">Memuat pengaturan...</p>;

  const group = SETTINGS_GROUPS.find((g) => g.id === activeGroup) ?? SETTINGS_GROUPS[0];

  return (
    <div>
      <h2 className="text-lg font-bold mb-1">Pengaturan Website</h2>
      <p className="text-sm text-slate-500 mb-4">
        Pilih bagian di sebelah kiri, lalu ubah isinya di sebelah kanan.
      </p>

      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Menu bagian (kiri) */}
        <nav className="w-full md:w-60 md:flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-2 flex md:flex-col gap-1 overflow-x-auto md:sticky md:top-4">
          {SETTINGS_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`text-left whitespace-nowrap md:whitespace-normal px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                g.id === group.id ? 'bg-[#254180] text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {g.title}
            </button>
          ))}
        </nav>

        {/* Isi bagian (kanan) */}
        <div className="flex-1 min-w-0 w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
          <h3 className="text-base font-black text-slate-900 mb-5">{group.title}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.fields.map((fl) => (
              <div key={fl.key} className={fl.type === 'text' ? '' : 'sm:col-span-2'}>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-600">{fl.label}</label>
                  {values[fl.key] !== fl.def && (
                    <button type="button" className="text-[11px] text-slate-400 hover:text-slate-700 underline" onClick={() => set(fl.key, fl.def)}>
                      kembalikan bawaan
                    </button>
                  )}
                </div>
                {fl.type === 'text' && (
                  <input className={inputCls} value={values[fl.key]} onChange={(e) => set(fl.key, e.target.value)} />
                )}
                {fl.type === 'textarea' && (
                  <textarea className={inputCls} rows={fl.def.length > 160 ? 5 : 3} value={values[fl.key]} onChange={(e) => set(fl.key, e.target.value)} />
                )}
                {fl.type === 'image' && (
                  <div className="flex items-center gap-4 mt-1">
                    <img src={values[fl.key]} alt="" className="w-32 h-20 object-cover rounded-lg border bg-slate-100" />
                    <div className="flex-1">
                      <input
                        className={inputCls}
                        type="file"
                        accept="image/*"
                        disabled={uploading === fl.key}
                        onChange={(e) => pickImage(fl.key, e.target.files?.[0])}
                      />
                      {fieldMsg[fl.key] && (
                        <p className={`text-xs mt-1 font-semibold ${fieldMsg[fl.key].startsWith('✗') ? 'text-red-600' : fieldMsg[fl.key].startsWith('✓') ? 'text-green-700' : 'text-slate-500'}`}>
                          {fieldMsg[fl.key]}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {fl.hint && <p className="text-[11px] text-slate-400 mt-1">{fl.hint}</p>}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button className={btnPrimary} onClick={save} disabled={busy}>
              {busy ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
            </button>
            <a href="#" className="text-sm text-slate-600 hover:underline">Lihat website</a>
            {msg && <span className="text-sm text-slate-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">{msg}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------
// Halaman admin
// ---------------------------------------------------------------------
export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<'members' | 'gallery' | 'settings'>('members');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
        <div className="max-w-md bg-white rounded-2xl p-6 shadow text-sm text-slate-700">
          <h1 className="font-black text-lg mb-2">Database belum terhubung</h1>
          Isi <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code> di file <code>.env.local</code>
          (lihat <code>PANDUAN-DATABASE.md</code>), lalu jalankan ulang website.
        </div>
      </div>
    );
  }
  if (!ready) return <div className="min-h-screen flex items-center justify-center text-slate-500">Memuat...</div>;
  if (!session) return <Login />;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-[#0a152e] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="font-black">Admin HIPMI Kab. Bandung</div>
          <div className="flex items-center gap-3 text-sm">
            <a href="#" className="text-slate-300 hover:text-white">Lihat website</a>
            <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg" onClick={() => supabase!.auth.signOut()}>Keluar</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {(['members', 'gallery', 'settings'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-bold ${tab === t ? 'bg-[#254180] text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
            >
              {t === 'members' ? 'Anggota' : t === 'gallery' ? 'Galeri Event' : 'Pengaturan Website'}
            </button>
          ))}
        </div>
        {tab === 'members' ? <MembersAdmin /> : tab === 'gallery' ? <GalleryAdmin /> : <SettingsAdmin />}
      </main>
    </div>
  );
};
