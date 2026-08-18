import React from 'react';
import { Heart, ShieldCheck, Sparkles, Globe } from 'lucide-react';

interface CtaSectionProps {
  onOpenSupport: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenSupport }) => {
  return (
    <section
      id="support"
      className="py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 lg:px-20 bg-white text-center border-t border-[#1B365D]/10 relative overflow-hidden text-[#1B365D]"
    >
      {/* Background Glows & Architectural Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <span className="bg-text-massive opacity-10">
          LEGACY
        </span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A253] rounded-full blur-[160px] opacity-15 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#1B365D]/10 bg-[#F8FAFC] mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A253]" />
          <span className="font-tech-mono text-[11px] font-bold tracking-[0.25em] text-[#C5A253] uppercase">
            ENDOWMENT &amp; GIVING
          </span>
        </div>

        <h2
          id="cta-headline"
          className="font-display-title text-4xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.9] text-[#1B365D] mb-8 max-w-3xl font-black uppercase tracking-[-0.04em]"
        >
          SUPPORT THE <span className="text-[#C5A253]">LEGACY</span>
        </h2>

        <p
          id="cta-description"
          className="font-body-text text-lg sm:text-xl md:text-2xl text-[#1B365D]/80 mb-6 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Honor Coach Godfrey by investing in the next generation of HBCU leaders.
        </p>

        {/* Domain Display */}
        <a
          href="https://www.WilliamBuckGodfrey.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-tech-mono text-sm sm:text-base text-[#C5A253] font-bold hover:text-[#1B365D] transition-colors mb-10 tracking-[0.15em] uppercase border-b border-[#C5A253]/40 hover:border-[#1B365D] pb-1"
        >
          <Globe className="w-4 h-4" />
          www.WilliamBuckGodfrey.com
        </a>

        {/* Primary Support Action Button */}
        <div>
          <button
            id="cta-support-btn"
            onClick={onOpenSupport}
            className="font-body-text text-[11px] sm:text-xs font-bold tracking-[0.2em] bg-[#1B365D] text-white py-5 px-10 sm:px-14 hover:bg-[#C5A253] hover:text-[#1B365D] active:scale-[0.98] transition-all duration-200 uppercase cursor-pointer shadow-xl"
          >
            SUPPORT THE LEGACY
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-[#1B365D]/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-tech-mono text-[11px] text-[#1B365D]/60 uppercase tracking-widest font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A253]" />
            <span>501(C)(3) TAX-DEDUCTIBLE ENDOWMENT</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#C5A253]" />
            <span>100% DIRECT HBCU SCHOLAR ALLOCATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
