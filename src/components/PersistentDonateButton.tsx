import React, { useState } from 'react';
import { MessageSquareHeart, Sparkles, ArrowRight } from 'lucide-react';

interface PersistentMemoryButtonProps {
  onMemoryClick?: () => void;
}

export const PersistentDonateButton: React.FC<PersistentMemoryButtonProps> = ({ onMemoryClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const memorySection = document.getElementById('memories');
    if (memorySection) {
      memorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (onMemoryClick) {
      onMemoryClick();
    } else {
      window.location.hash = 'memories';
    }
  };

  return (
    <div
      id="persistent-memory-container"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-1.5 sm:gap-2 pointer-events-auto select-none"
    >
      {/* Floating Prompt Pill on Hover/Focus (Desktop only) */}
      {isHovered && (
        <div
          id="memory-hover-tooltip"
          className="hidden sm:flex bg-[#C5A253] text-[#0A1B36] border-2 border-[#0A1B36] px-3.5 py-1.5 shadow-xl font-tech-mono text-[10px] sm:text-[11px] uppercase tracking-wider items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150 font-bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#0A1B36]" />
          <span>Tribute to Coach Godfrey</span>
        </div>
      )}

      {/* Main Flashing / Glowing Persistent Button */}
      <button
        id="persistent-memory-btn"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Leave a memory honoring Coach William Buck Godfrey"
        className="group relative flex items-center gap-2 sm:gap-3 bg-[#C5A253] text-[#0A1B36] hover:bg-[#0A1B36] hover:text-white border-2 border-[#0A1B36] py-2.5 px-3.5 sm:py-3.5 sm:px-5 shadow-2xl transition-all duration-300 active:scale-95 animate-donate-pulse cursor-pointer select-none rounded-none min-h-[44px]"
      >
        {/* Blinking Flashing Beacon Dot */}
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A1B36] opacity-75 group-hover:bg-[#C5A253]"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#0A1B36] group-hover:bg-[#C5A253]"></span>
        </span>

        {/* Tribute Message Icon */}
        <MessageSquareHeart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0A1B36] group-hover:text-[#C5A253] transition-colors shrink-0" />

        {/* Text */}
        <div className="flex flex-col items-start text-left">
          <span className="font-display-title text-[11px] sm:text-xs md:text-sm font-black tracking-wider uppercase leading-tight text-[#0A1B36] group-hover:text-white">
            LEAVE A MEMORY
          </span>
          <span className="font-tech-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-widest text-[#0A1B36]/85 group-hover:text-[#C5A253] font-bold uppercase">
            HONORING COACH GODFREY
          </span>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-3.5 h-3.5 text-[#0A1B36] group-hover:text-[#C5A253] group-hover:translate-x-0.5 transition-all shrink-0 ml-0.5 sm:ml-1" />
      </button>
    </div>
  );
};
