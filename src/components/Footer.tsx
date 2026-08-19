import React from 'react';

export const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#ffffff] border-t border-[#0A1B36]/10 py-12 sm:py-16 px-6 sm:px-10 md:px-16 lg:px-20 text-[#0A1B36]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Slogan */}
        <div className="text-center md:text-left">
          <div className="font-display-title text-lg sm:text-xl font-bold text-[#0A1B36] tracking-tight uppercase">
            THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP
          </div>
          <p className="font-tech-mono text-[11px] text-[#C5A253] font-bold uppercase tracking-[0.2em] mt-1">
            BUILDING A LEGACY. EMPOWERING THE NEXT GENERATION.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 sm:gap-8 items-center flex-wrap justify-center font-body-text text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
          <button
            id="footer-link-about"
            onClick={() => scrollToSection('about')}
            className="text-[#0A1B36]/80 hover:text-[#0A1B36] transition-colors cursor-pointer border-b border-transparent hover:border-[#0A1B36] pb-0.5"
          >
            ABOUT
          </button>
          <button
            id="footer-link-scholar"
            onClick={() => scrollToSection('scholar')}
            className="text-[#0A1B36]/80 hover:text-[#0A1B36] transition-colors cursor-pointer border-b border-transparent hover:border-[#0A1B36] pb-0.5"
          >
            THE SCHOLAR
          </button>
          <button
            id="footer-link-apply"
            onClick={() => scrollToSection('apply')}
            className="text-[#0A1B36]/80 hover:text-[#0A1B36] transition-colors cursor-pointer border-b border-transparent hover:border-[#0A1B36] pb-0.5"
          >
            APPLY
          </button>
          <button
            id="footer-link-donate"
            onClick={() => scrollToSection('donate')}
            className="text-[#0A1B36]/80 hover:text-[#C5A253] transition-colors cursor-pointer border-b border-transparent hover:border-[#C5A253] pb-0.5 font-bold"
          >
            DONATE
          </button>
          <button
            id="footer-link-contact"
            onClick={() => scrollToSection('contact')}
            className="text-[#0A1B36]/80 hover:text-[#0A1B36] transition-colors cursor-pointer border-b border-transparent hover:border-[#0A1B36] pb-0.5"
          >
            CONTACT
          </button>
        </div>

        {/* Copyright */}
        <div className="font-tech-mono text-[10px] text-[#0A1B36]/60 tracking-widest uppercase text-center md:text-right">
          © 2024 THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP.
        </div>
      </div>
    </footer>
  );
};
