import { MemberBusiness, GalleryPhoto } from '../types';

// CATATAN: Data di bawah ini masih contoh. Ganti dengan data anggota yang sebenarnya.
// Foto founder: simpan file di folder `public/founders/` lalu isi founderPhoto: '/founders/nama-file.jpg'.
// Jika founderPhoto dikosongkan, website otomatis menampilkan inisial nama.
export const MEMBER_BUSINESSES: MemberBusiness[] = [
  {
    id: 'biz-1',
    businessName: 'Puntang Highlands Specialty Coffee',
    description: 'Produsen kopi arabika specialty dari lereng Gunung Puntang, bermitra langsung dengan petani lokal.',
    ceo: 'M. Fajar Nugraha',
    sector: 'Agribisnis & Kopi',
    phone: '+62 812-2234-5678',
    location: 'Cimaung',
  },
  {
    id: 'biz-2',
    businessName: 'Majalaya Heritage Denim & Woven Labs',
    description: 'Pabrikasi denim selvedge dan tenun jacquard modern yang memasok brand streetwear nasional.',
    ceo: 'Rian Pratama',
    sector: 'Tekstil & Fashion',
    phone: '+62 813-9876-1234',
    location: 'Majalaya',
  },
  {
    id: 'biz-3',
    businessName: 'Rancabali Eco Luxury Glamping',
    description: 'Resort eco-tourism berkonsep kelestarian alam di tengah kebun teh Rancabali.',
    ceo: 'Sarah Amanda, S.E.',
    sector: 'Pariwisata & Hospitality',
    phone: '+62 821-4455-6677',
    location: 'Rancabali',
  },
  {
    id: 'biz-4',
    businessName: 'Soreang Digital Kreasi (SDK Tech)',
    description: 'Software house penyedia ERP UMKM, integrasi IoT pertanian, dan sistem ticketing event.',
    ceo: 'Bagas Aditya, S.Kom',
    sector: 'Teknologi & Kreatif',
    phone: '+62 878-1122-3344',
    location: 'Soreang',
  },
  {
    id: 'biz-5',
    businessName: 'Susu Murni Sabilulungan Agro',
    description: 'Pengolahan susu pasteurisasi dan aneka keju artisan dari peternak sapi perah Pangalengan.',
    ceo: 'drh. Hendra Wijaya',
    sector: 'Kuliner & F&B',
    phone: '+62 819-3322-1100',
    location: 'Pangalengan',
  },
  {
    id: 'biz-6',
    businessName: 'Trans Baleendah Cold Chain & Logistics',
    description: 'Jasa armada berpendingin dan gudang transit untuk pengiriman komoditas segar ke Jabodetabek.',
    ceo: 'H. Deden Kusnadi',
    sector: 'Jasa',
    phone: '+62 812-7788-9900',
    location: 'Baleendah',
  },
];

// CATATAN: Foto di bawah masih foto contoh (placeholder).
// Ganti dengan foto kegiatan asli: simpan file di folder `public/events/`
// lalu isi src: '/events/nama-file.jpg'.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1',
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    caption: 'Pelantikan & silaturahmi pengurus',
    event: 'Organisasi',
    date: 'Oktober 2025',
  },
  {
    id: 'g-2',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    caption: 'Sesi BizLab bersama anggota',
    event: 'BizLab',
    date: 'Oktober 2025',
  },
  {
    id: 'g-3',
    src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
    caption: 'Football friendly match antar BPC',
    event: 'Olahraga',
    date: 'Oktober 2025',
  },
  {
    id: 'g-4',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Forum diskusi pengusaha muda',
    event: 'Forum',
    date: 'September 2025',
  },
  {
    id: 'g-5',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
    caption: 'Seminar kewirausahaan',
    event: 'Seminar',
    date: 'September 2025',
  },
  {
    id: 'g-6',
    src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    caption: 'Kunjungan sentra tekstil Majalaya',
    event: 'Kunjungan Usaha',
    date: 'Oktober 2025',
  },
];
