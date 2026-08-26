import React from 'react';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const scrollToSection = (sectionId: string) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#ffffff] border-t border-[#0A1B36]/10 py-4 sm:py-6 px-4 xs:px-6 sm:px-10 md:px-16 lg:px-20 text-[#0A1B36]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
        {/* Brand & Slogan */}
        <div className="text-center md:text-left">
          <div className="font-display-title text-base sm:text-lg md:text-xl font-bold text-[#0A1B36] tracking-tight uppercase">
            THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP
          </div>
          <p className="font-tech-mono text-[10px] sm:text-[11px] text-[#C5A253] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1">
            IN PARTNERSHIP WITH SPORTY GIRLS, INC. • 501(C)(3) HBCU SCHOLARSHIP FUND
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-4 sm:gap-8 items-center flex-wrap justify-center font-body-text text-[11px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
          <button
            id="footer-link-about"
            onClick={() => scrollToSection('about')}
            className="text-[#0A1B36]/80 hover:text-[#0A1B36] transition-colors cursor-pointer border-b border-transparent hover:border-[#0A1B36] py-1.5 px-1 min-h-[36px] flex items-center"
          >
            ABOUT
          </button>
          <button
            id="footer-link-scholar"
            onClick={() => scrollToSection('scholar')}
            className="text-[#0A1B36]/80 hover:text-[#0A1B36] transition-colors cursor-pointer border-b border-transparent hover:border-[#0A1B36] py-1.5 px-1 min-h-[36px] flex items-center"
          >
            THE SCHOLAR
          </button>
          <button
            id="footer-link-memories"
            onClick={() => scrollToSection('memories')}
            className="text-[#0A1B36]/80 hover:text-[#C5A253] transition-colors cursor-pointer border-b border-transparent hover:border-[#C5A253] py-1.5 px-1 min-h-[36px] flex items-center"
          >
            MEMORIES
          </button>
          <button
            id="footer-link-donate"
            onClick={() => scrollToSection('donate')}
            className="text-[#0A1B36]/80 hover:text-[#C5A253] transition-colors cursor-pointer border-b border-transparent hover:border-[#C5A253] py-1.5 px-1 min-h-[36px] flex items-center font-bold"
          >
            DONATE
          </button>
        </div>

        {/* Copyright */}
        <div className="font-tech-mono text-[9px] sm:text-[10px] text-[#0A1B36]/60 tracking-wider sm:tracking-widest uppercase text-center md:text-right">
          © 2024 THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP &amp; SPORTY GIRLS, INC.
        </div>
      </div>
    </footer>
  );
};
