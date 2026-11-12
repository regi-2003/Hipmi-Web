import React, { useState, useEffect } from 'react';
import { HipmiLogo } from './HipmiLogo';
import { Menu, X, ChevronRight, UserPlus, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenRegister: () => void;
  onOpenEventModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenRegister,
  onOpenEventModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'bizlab', label: 'BizLab', badge: 'Program' },
    { id: 'direktori', label: 'Direktori Bisnis' },
    { id: 'hipmi-go', label: 'HIPMI GO' },
    { id: 'keanggotaan', label: 'Keanggotaan', badge: 'Soon' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-[#0a152e]/85 backdrop-blur-sm border-b border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('beranda')}
            className="flex items-center text-left transition-transform hover:scale-[1.01] focus:outline-none"
            aria-label="HIPMI Kabupaten Bandung"
          >
            <HipmiLogo variant={isScrolled ? 'dark' : 'light'} size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-0 2xl:space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative px-3 py-2 text-[14px] font-medium transition-colors rounded-lg flex items-center gap-1.5 ${
                    isScrolled
                      ? isActive
                        ? 'text-[#254180] font-semibold'
                        : 'text-[#404040] hover:text-[#254180]'
                      : isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#EAB308] text-[#0f224a]">
                      {item.badge}
                    </span>
                  )}
                  {/* Yellow active underline matching reference screenshot */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-[#EAB308] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenRegister}
              className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all shadow-sm flex items-center gap-1.5 ${
                isScrolled
                  ? 'bg-[#254180] text-white hover:bg-[#1c2d52] hover:shadow'
                  : 'bg-white text-[#193366] hover:bg-slate-100'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Bergabung</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden">
          <div className="fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <HipmiLogo variant="dark" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleLinkClick(item.id)}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-[#254180] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-[#EAB308] text-[#0f224a]">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 bg-[#EAB308] hover:bg-[#d99b00] text-[#0f224a] rounded-xl font-bold text-sm shadow flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Anggota Baru</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEventModal();
                }}
                className="w-full py-2.5 bg-[#254180] hover:bg-[#1a2f5e] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Info BizLab</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
