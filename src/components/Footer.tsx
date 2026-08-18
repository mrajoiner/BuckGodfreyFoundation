import React from 'react';
import { Globe } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenPrivacy: () => void;
  onOpenHbcuInfo: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenPrivacy,
  onOpenHbcuInfo,
}) => {
  return (
    <footer
      id="main-footer"
      className="bg-[#FAFAFA] border-t border-[#1B365D]/10 py-12 sm:py-16 px-6 sm:px-10 md:px-16 lg:px-20 text-[#1B365D]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Slogan */}
        <div className="text-center md:text-left">
          <div className="font-display-title text-lg sm:text-xl font-black text-[#1B365D] tracking-tight uppercase">
            THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP
          </div>
          <p className="font-tech-mono text-[11px] text-[#C5A253] font-bold uppercase tracking-[0.2em] mt-1">
            BUILDING A LEGACY. EMPOWERING THE NEXT GENERATION.
          </p>
        </div>

        {/* Links & Website */}
        <div className="flex gap-6 sm:gap-8 items-center flex-wrap justify-center font-body-text text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase">
          <a
            href="https://www.WilliamBuckGodfrey.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C5A253] hover:text-[#1B365D] transition-colors flex items-center gap-1.5 border-b border-[#C5A253]/50 hover:border-[#1B365D] pb-0.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>WWW.WILLIAMBUCKGODFREY.COM</span>
          </a>
          <button
            id="footer-link-privacy"
            onClick={onOpenPrivacy}
            className="text-[#1B365D]/60 hover:text-[#1B365D] transition-colors cursor-pointer border-b border-transparent hover:border-[#1B365D] pb-0.5"
          >
            PRIVACY POLICY
          </button>
          <button
            id="footer-link-contact"
            onClick={onOpenContact}
            className="text-[#1B365D]/60 hover:text-[#1B365D] transition-colors cursor-pointer border-b border-transparent hover:border-[#1B365D] pb-0.5"
          >
            CONTACT
          </button>
          <button
            id="footer-link-hbcu"
            onClick={onOpenHbcuInfo}
            className="text-[#1B365D]/60 hover:text-[#C5A253] transition-colors cursor-pointer border-b border-transparent hover:border-[#C5A253] pb-0.5"
          >
            HBCU EXCELLENCE
          </button>
        </div>

        {/* Copyright */}
        <div className="font-tech-mono text-[10px] text-[#1B365D]/40 tracking-widest uppercase text-center md:text-right">
          © 2024 THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP.
        </div>
      </div>
    </footer>
  );
};
