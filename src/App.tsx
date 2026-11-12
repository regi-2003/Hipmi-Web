import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { BizLabSection } from './components/BizLabSection';
import { HipmiGoSection } from './components/HipmiGoSection';
import { DirectorySection } from './components/DirectorySection';
import { MembershipSection } from './components/MembershipSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { useSettings, joinHref } from './lib/settings';

export default function App() {
  const settings = useSettings();
  const [activeSection, setActiveSection] = useState('beranda');
  // Pendaftaran: ke link yang diisi di admin (mis. Google Form), atau WhatsApp jika kosong
  const openRegister = () => {
    window.open(joinHref(settings), '_blank', 'noopener,noreferrer');
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll listener to update active nav state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'beranda',
        'tentang',
        'galeri',
        'bizlab',
        'direktori',
        'hipmi-go',
        'keanggotaan',
        'kontak',
      ];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#404040] flex flex-col font-sans">
      {/* Sticky Header Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenRegister={openRegister}
        onOpenEventModal={() => handleNavigate('bizlab')}
      />

      <main className="flex-grow">
        {/* Hero Section matching Screenshot 1 */}
        <Hero
          onOpenRegister={openRegister}
          onExploreAbout={() => handleNavigate('tentang')}
          onOpenBizLab={() => handleNavigate('bizlab')}
        />

        {/* Counter Stats Bar matching bottom of Screenshot 1 */}
        <StatsBar />

        {/* About BPC HIPMI Kab. Bandung matching Screenshot 2 */}
        <AboutSection />

        {/* Galeri Foto Event */}
        <GallerySection />

        {/* BizLab */}
        <BizLabSection />

        {/* Direktori Bisnis Anggota */}
        <DirectorySection />

        {/* Aplikasi HIPMI GO */}
        <HipmiGoSection />

        {/* Keanggotaan (Coming Soon) */}
        <MembershipSection />

        {/* Kontak Sekretariat */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRegister={openRegister}
      />
    </div>
  );
}
