import React, { useState } from 'react';
import { Heart, Sparkles, ChevronUp, ArrowRight } from 'lucide-react';

interface PersistentDonateButtonProps {
  onDonateClick: () => void;
}

export const PersistentDonateButton: React.FC<PersistentDonateButtonProps> = ({ onDonateClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Try to scroll smoothly to the dedicated donation section if it exists
    const donateSection = document.getElementById('donate');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onDonateClick();
    }
  };

  return (
    <div
      id="persistent-donate-container"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-2 pointer-events-auto"
    >
      {/* Floating Prompt Pill on Hover/Focus */}
      {isHovered && (
        <div
          id="donate-hover-tooltip"
          className="bg-[#1B365D] text-white border border-[#C5A253] px-3.5 py-1.5 shadow-xl font-tech-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A253]" />
          <span>100% Tax-Deductible 501(c)(3)</span>
        </div>
      )}

      {/* Main Flashing / Glowing Persistent Button */}
      <button
        id="persistent-donate-btn"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Donate to the William Buck Godfrey Legacy Scholarship"
        className="group relative flex items-center gap-3 bg-[#1B365D] text-white hover:bg-[#C5A253] hover:text-[#1B365D] border-2 border-[#C5A253] py-3.5 px-5 sm:py-4 sm:px-6 shadow-2xl transition-all duration-300 active:scale-95 animate-donate-pulse cursor-pointer select-none"
      >
        {/* Blinking Flashing Beacon Dot */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A253] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A253] group-hover:bg-[#1B365D]"></span>
        </span>

        {/* Heart Icon */}
        <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C5A253] text-[#C5A253] group-hover:fill-[#1B365D] group-hover:text-[#1B365D] transition-colors" />

        {/* Text */}
        <div className="flex flex-col items-start text-left">
          <span className="font-display-title text-xs sm:text-sm font-black tracking-wider uppercase leading-none">
            DONATE TO THE SCHOLARSHIP
          </span>
          <span className="font-tech-mono text-[9px] sm:text-[10px] tracking-widest text-[#C5A253] group-hover:text-[#1B365D]/80 font-bold uppercase mt-0.5">
            SUPPORT HBCU SCHOLARS
          </span>
        </div>

        {/* Arrow on hover */}
        <ArrowRight className="w-4 h-4 text-[#C5A253] group-hover:text-[#1B365D] transition-transform group-hover:translate-x-1 hidden sm:block" />
      </button>
    </div>
  );
};
