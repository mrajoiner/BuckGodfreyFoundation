import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#ffffff] border-b border-[#1B365D]/10 shadow-xs'
          : 'bg-[#ffffff] border-b border-[#1B365D]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-brand-link"
          onClick={() => scrollToSection('about')}
          className="group flex flex-col items-start focus:outline-hidden text-left cursor-pointer"
        >
          <span className="font-display-title text-base sm:text-xl font-bold tracking-tight uppercase text-[#1B365D] transition-colors group-hover:text-[#C5A253]">
            WBG LEGACY SCHOLARSHIP
          </span>
          <span className="font-tech-mono text-[10px] tracking-[0.2em] uppercase text-[#1B365D]/60 hidden sm:block">
            IN HONOR OF COACH WILLIAM 'BUCK' GODFREY
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-7 lg:gap-9">
          <button
            onClick={() => scrollToSection('about')}
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#1B365D] transition-colors py-2 uppercase cursor-pointer"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('legacy')}
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#1B365D] transition-colors py-2 uppercase cursor-pointer"
          >
            LEGACY
          </button>
          <button
            onClick={() => scrollToSection('scholar')}
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#1B365D] transition-colors py-2 uppercase cursor-pointer"
          >
            THE SCHOLAR
          </button>
          <button
            onClick={() => scrollToSection('apply')}
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#C5A253] transition-colors py-2 uppercase flex items-center gap-1 cursor-pointer"
          >
            APPLY <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scrollToSection('donate')}
            className="font-body-text text-[11px] font-bold tracking-[0.2em] text-[#C5A253] hover:text-[#1B365D] transition-colors py-2 uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A253] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A253]"></span>
            </span>
            DONATE
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#1B365D] transition-colors py-2 uppercase cursor-pointer"
          >
            CONTACT
          </button>

          {/* Primary Action Button */}
          <button
            id="nav-btn-support-legacy"
            onClick={() => scrollToSection('donate')}
            className="font-body-text text-[11px] font-bold tracking-[0.2em] bg-[#1B365D] text-white py-2.5 px-6 sm:px-8 hover:bg-[#C5A253] hover:text-[#1B365D] active:scale-[0.98] transition-all duration-200 uppercase cursor-pointer shadow-xs"
          >
            SUPPORT THE LEGACY
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => scrollToSection('donate')}
            className="font-body-text text-[10px] font-bold tracking-widest bg-[#C5A253] text-[#1B365D] py-1.5 px-3 uppercase"
          >
            SUPPORT
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1B365D] hover:text-[#C5A253] focus:outline-hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white border-b border-[#1B365D]/10 px-5 sm:px-6 py-5 sm:py-6 space-y-3 shadow-2xl animate-in fade-in duration-200"
        >
          <button
            onClick={() => scrollToSection('about')}
            className="w-full text-left font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-3 px-2 border-b border-[#1B365D]/10 uppercase"
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection('legacy')}
            className="w-full text-left font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-3 px-2 border-b border-[#1B365D]/10 uppercase"
          >
            LEGACY
          </button>
          <button
            onClick={() => scrollToSection('scholar')}
            className="w-full text-left font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-3 px-2 border-b border-[#1B365D]/10 uppercase"
          >
            THE SCHOLAR
          </button>
          <button
            onClick={() => scrollToSection('apply')}
            className="w-full text-left font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-3 px-2 border-b border-[#1B365D]/10 uppercase"
          >
            APPLY FOR SCHOLARSHIP
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full text-left font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-3 px-2 border-b border-[#1B365D]/10 uppercase"
          >
            CONTACT
          </button>
          <button
            onClick={() => scrollToSection('donate')}
            className="w-full font-body-text text-xs font-bold tracking-[0.2em] bg-[#1B365D] text-white py-3.5 uppercase mt-2"
          >
            SUPPORT THE LEGACY
          </button>
        </div>
      )}
    </header>
  );
};
