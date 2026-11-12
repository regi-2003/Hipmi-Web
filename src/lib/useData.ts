import { useCallback, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { MEMBER_BUSINESSES, GALLERY_PHOTOS } from '../data/mockData';
import { MemberBusiness, GalleryPhoto } from '../types';

export interface MemberRow {
  id: string;
  business_name: string;
  description: string;
  ceo: string;
  sector: string;
  phone: string;
  location: string;
  founder_photo: string | null;
  is_published: boolean;
  sort_order: number;
}

export interface GalleryRow {
  id: string;
  image_url: string;
  caption: string;
  event: string;
  event_date: string;
  sort_order: number;
}

export const toMember = (r: MemberRow): MemberBusiness => ({
  id: r.id,
  businessName: r.business_name,
  description: r.description,
  ceo: r.ceo,
  sector: r.sector,
  phone: r.phone,
  location: r.location,
  founderPhoto: r.founder_photo ?? undefined,
});

export const toPhoto = (r: GalleryRow): GalleryPhoto => ({
  id: r.id,
  src: r.image_url,
  caption: r.caption,
  event: r.event,
  date: r.event_date,
});

interface State<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useMembers() {
  const [state, setState] = useState<State<MemberBusiness>>({
    data: isSupabaseConfigured ? [] : MEMBER_BUSINESSES,
    loading: isSupabaseConfigured,
    error: null,
  });

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    setState({
      data: error ? [] : (data as MemberRow[]).map(toMember),
      loading: false,
      error: error ? 'Gagal memuat data anggota.' : null,
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return state;
}

export function useGallery() {
  const [state, setState] = useState<State<GalleryPhoto>>({
    data: isSupabaseConfigured ? [] : GALLERY_PHOTOS,
    loading: isSupabaseConfigured,
    error: null,
  });

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    setState({
      data: error ? [] : (data as GalleryRow[]).map(toPhoto),
      loading: false,
      error: error ? 'Gagal memuat galeri.' : null,
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return state;
}
