import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

interface LegacySectionProps {
  onOpenLegacyModal: () => void;
}

export const LegacySection: React.FC<LegacySectionProps> = ({ onOpenLegacyModal }) => {
  return (
    <section
      id="legacy"
      className="relative py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-20 overflow-hidden border-t border-[#1B365D]/10 bg-[#FAFAFA]"
    >
      {/* Massive Editorial Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-40">
        LEGACY
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Sideline Vintage Photo Frame */}
        <div className="md:col-span-5 flex justify-center md:justify-start">
          <div
            id="legacy-sideline-frame"
            className="relative w-full max-w-md aspect-[4/5] border border-[#1B365D]/15 p-3 bg-white shadow-xl group"
          >
            <div className="relative w-full h-full overflow-hidden bg-slate-200">
              <img
                id="legacy-sideline-img"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                alt="Vintage photo of Coach Godfrey crouching on the sideline during a football game in a yellow shirt"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBEMjOAoy5Xno6zGiVNGYo8jhAzrnTXiN3GL5xJbGwI3QgpdNMo_u8QW0tOPZD3r_CMY1isijjkINBSxtsc_xz4Wsz2vv5MZgmxgcy6A4UV5mNw8b8WAJegLHIyXdmddQ3TNwqwhAye5QLicI2YZp0z72SeR9VmcWCgT6WSgGKWG_mHAvFr2NnsObN3lW6Ngsc5cgPXASIo-z_Z7aIbjk--Q1XJ8LIaDUtEfZEs2WNi9ZiqK1lXLAWDOVkpU0Q7dGKWg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/40 via-transparent to-transparent"></div>
            </div>
            <div className="mt-3 flex items-center justify-between font-tech-mono text-[10px] tracking-widest text-[#1B365D]/60 uppercase">
              <span>SOUTHWEST DEKALB DYNASTY</span>
              <span className="text-[#C5A253] font-bold">HISTORIC ARCHIVE</span>
            </div>
          </div>
        </div>

        {/* Right Editorial Story */}
        <div className="md:col-span-7 md:pl-4 lg:pl-10">
          <div className="border-l-2 border-[#C5A253] pl-8 sm:pl-12 py-2">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block mb-3">
              THE COACH'S CREED
            </span>
            <h2
              id="legacy-headline"
              className="font-display-title text-3xl sm:text-5xl md:text-6xl leading-[0.92] text-[#1B365D] mb-8 font-black uppercase tracking-[-0.03em]"
            >
              GREATNESS WAS NEVER JUST ABOUT WINNING.
            </h2>

            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#1B365D]/80 mb-6 leading-relaxed font-normal">
              For decades, Coach Godfrey built more than just winning teams; he built men of character. He understood that true excellence extends far beyond the final whistle.
            </p>

            <p className="font-body-text text-sm sm:text-base text-[#1B365D]/60 mb-10 leading-relaxed font-normal">
              His approach to mentorship was rigorous, demanding, and profoundly compassionate. He saw the potential in every student-athlete and demanded their very best, preparing them for the challenges of higher education and professional life.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                id="legacy-vision-link"
                href="#scholar"
                className="group font-body-text text-[11px] font-bold tracking-[0.2em] text-[#C5A253] hover:text-[#1B365D] transition-colors flex items-center gap-2 uppercase py-1 border-b border-[#C5A253] hover:border-[#1B365D]"
              >
                THE SCHOLARSHIP VISION{' '}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                id="legacy-read-bio-btn"
                onClick={onOpenLegacyModal}
                className="font-body-text text-[11px] font-medium tracking-[0.2em] text-[#1B365D]/70 hover:text-[#C5A253] transition-colors flex items-center gap-2 uppercase cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C5A253]" />
                READ BIOGRAPHY &amp; HONORS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
