import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface PersistentDonateButtonProps {
  onDonateClick: () => void;
}

export const PersistentDonateButton: React.FC<PersistentDonateButtonProps> = ({ onDonateClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-1.5 sm:gap-2 pointer-events-auto select-none"
    >
      {/* Floating Prompt Pill on Hover/Focus (Desktop only) */}
      {isHovered && (
        <div
          id="donate-hover-tooltip"
          className="hidden sm:flex bg-[#0A1B36] text-white border border-[#C5A253] px-3.5 py-1.5 shadow-xl font-tech-mono text-[10px] sm:text-[11px] uppercase tracking-wider items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150"
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
        className="group relative flex items-center gap-2 sm:gap-3 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] border-2 border-[#C5A253] py-2.5 px-3.5 sm:py-3.5 sm:px-5 shadow-2xl transition-all duration-300 active:scale-95 animate-donate-pulse cursor-pointer select-none rounded-none min-h-[44px]"
      >
        {/* Blinking Flashing Beacon Dot */}
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A253] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#C5A253] group-hover:bg-[#0A1B36]"></span>
        </span>

        {/* Heart Icon */}
        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#C5A253] text-[#C5A253] group-hover:fill-[#0A1B36] group-hover:text-[#0A1B36] transition-colors shrink-0" />

        {/* Text */}
        <div className="flex flex-col items-start text-left">
          <span className="font-display-title text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase leading-tight">
            DONATE TO SCHOLARSHIP
          </span>
          <span className="font-tech-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-widest text-[#C5A253] group-hover:text-[#0A1B36]/80 font-bold uppercase">
            HBCU SCHOLARSHIP
          </span>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-3.5 h-3.5 text-[#C5A253] group-hover:text-[#0A1B36] group-hover:translate-x-0.5 transition-all shrink-0 ml-0.5 sm:ml-1" />
      </button>
    </div>
  );
};
