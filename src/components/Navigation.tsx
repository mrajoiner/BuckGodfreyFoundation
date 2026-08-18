import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onOpenSupport: () => void;
  onOpenApply: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenSupport, onOpenApply }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#1B365D]/10 shadow-xs'
          : 'bg-white/90 backdrop-blur-xs border-b border-[#1B365D]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 h-20 flex items-center justify-between">
        {/* Brand Logo / Monogram */}
        <a
          id="nav-brand-link"
          href="#about"
          className="group flex flex-col items-start focus:outline-hidden"
        >
          <span className="font-display-title text-base sm:text-xl font-black tracking-tighter uppercase text-[#1B365D] transition-colors group-hover:text-[#C5A253]">
            WBG LEGACY SCHOLARSHIP
          </span>
          <span className="font-tech-mono text-[10px] tracking-[0.2em] uppercase text-[#1B365D]/60 hidden sm:block">
            IN HONOR OF COACH WILLIAM 'BUCK' GODFREY
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-8 lg:gap-10">
          <a
            id="nav-link-about"
            href="#about"
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#1B365D] transition-colors py-2 uppercase border-b border-transparent hover:border-[#1B365D]"
          >
            ABOUT
          </a>
          <a
            id="nav-link-legacy"
            href="#legacy"
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#1B365D] transition-colors py-2 uppercase border-b border-transparent hover:border-[#1B365D]"
          >
            LEGACY
          </a>
          <a
            id="nav-link-scholar"
            href="#scholar"
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#1B365D] transition-colors py-2 uppercase border-b border-transparent hover:border-[#1B365D]"
          >
            THE SCHOLAR
          </a>
          <button
            id="nav-btn-apply"
            onClick={onOpenApply}
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#C5A253] transition-colors py-2 uppercase flex items-center gap-1 cursor-pointer"
          >
            APPLY <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <a
            id="nav-link-donate"
            href="#donate"
            className="font-body-text text-[11px] font-bold tracking-[0.2em] text-[#C5A253] hover:text-[#1B365D] transition-colors py-2 uppercase flex items-center gap-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A253] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A253]"></span>
            </span>
            DONATE
          </a>
          <a
            id="nav-link-support"
            href="#support"
            className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#1B365D] transition-colors py-2 uppercase border-b border-transparent hover:border-[#1B365D]"
          >
            ENDOWMENT
          </a>

          {/* Primary Action Button */}
          <button
            id="nav-btn-support-legacy"
            onClick={onOpenSupport}
            className="font-body-text text-[11px] font-bold tracking-[0.2em] bg-[#1B365D] text-white py-2.5 px-6 sm:px-8 hover:bg-[#C5A253] hover:text-[#1B365D] active:scale-[0.98] transition-all duration-200 uppercase cursor-pointer shadow-xs"
          >
            PLEDGE SUPPORT
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            id="mobile-support-quick-btn"
            onClick={onOpenSupport}
            className="font-body-text text-[10px] font-bold tracking-widest bg-[#C5A253] text-[#1B365D] py-1.5 px-3 uppercase"
          >
            SUPPORT
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1B365D] hover:text-[#C5A253] focus:outline-hidden"
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
          className="md:hidden bg-white border-b border-[#1B365D]/10 px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-3">
            <a
              id="mobile-link-about"
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-2 border-b border-[#1B365D]/10 uppercase"
            >
              ABOUT
            </a>
            <a
              id="mobile-link-legacy"
              href="#legacy"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-2 border-b border-[#1B365D]/10 uppercase"
            >
              LEGACY
            </a>
            <a
              id="mobile-link-scholar"
              href="#scholar"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-2 border-b border-[#1B365D]/10 uppercase"
            >
              THE SCHOLAR
            </a>
            <button
              id="mobile-btn-apply-drawer"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="text-left font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-2 border-b border-[#1B365D]/10 uppercase flex items-center justify-between"
            >
              SCHOLAR APPLICATION <ArrowUpRight className="w-4 h-4 text-[#C5A253]" />
            </button>
            <a
              id="mobile-link-donate"
              href="#donate"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-text text-xs font-bold tracking-[0.2em] text-[#C5A253] py-2 border-b border-[#1B365D]/10 uppercase flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A253] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A253]"></span>
              </span>
              DONATE TO SCHOLARSHIP
            </a>
            <a
              id="mobile-link-support-anchor"
              href="#support"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-text text-xs font-bold tracking-[0.2em] text-[#1B365D] py-2 border-b border-[#1B365D]/10 uppercase"
            >
              ENDOWMENT &amp; GIVING
            </a>
          </div>

          <div className="pt-2">
            <button
              id="mobile-drawer-cta-support"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSupport();
              }}
              className="w-full font-body-text text-xs font-bold tracking-[0.2em] bg-[#1B365D] text-white py-3.5 px-6 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all duration-200 uppercase text-center cursor-pointer"
            >
              SUPPORT THE LEGACY
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
