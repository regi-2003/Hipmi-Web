export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

// Data anggota (direktori bisnis)
export interface MemberBusiness {
  id: string;
  businessName: string;   // 1. Nama bisnis
  description: string;    // 2. Deskripsi bisnis
  ceo: string;            // 3. CEO
  sector: string;         // 4. Sektor bisnis (mis. Jasa, Kuliner & F&B, dst.)
  phone: string;          // 5. No telepon
  location: string;       // 6. Lokasi (kecamatan / alamat)
  founderPhoto?: string;  // 7. Foto founder (path gambar; kosong = tampil inisial)
}

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  event: string;
  date: string;
}
