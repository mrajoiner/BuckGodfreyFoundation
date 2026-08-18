import React from 'react';
import { ArrowDown, Globe } from 'lucide-react';

interface HeroSectionProps {
  onOpenSupport: () => void;
  onOpenLegacyModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSupport,
  onOpenLegacyModal,
}) => {
  return (
    <section
      id="about"
      className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 px-6 sm:px-10 md:px-16 lg:px-20 overflow-hidden flex items-center bg-white"
    >
      {/* Bold Typography Theme Radial Ambient Glows */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#C5A253] rounded-full blur-[140px] opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C5A253] rounded-full blur-[160px] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left Editorial Copy */}
        <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 pt-4 md:pt-0">
          <div className="inline-flex items-center gap-3 mb-6 flex-wrap">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold">
              THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP
            </span>
            <div className="w-8 h-[1px] bg-[#1B365D]/20 hidden sm:block"></div>
            <a
              href="https://www.WilliamBuckGodfrey.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-tech-mono text-xs uppercase tracking-[0.2em] text-[#1B365D]/60 hover:text-[#1B365D] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A253]" />
              www.WilliamBuckGodfrey.com
            </a>
          </div>

          <h1
            id="hero-main-title"
            className="font-display-title text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.88] tracking-[-0.04em] text-[#1B365D] uppercase mb-8 max-w-2xl font-black"
          >
            BUILDING A LEGACY.
            <br />
            EMPOWERING THE{' '}
            <span className="text-[#C5A253]">
              NEXT GENERATION.
            </span>
          </h1>

          <div className="border-l-2 border-[#C5A253] pl-6 py-3 mb-10 max-w-2xl bg-[#F8FAFC]">
            <p
              id="hero-subtext"
              className="font-body-text text-base sm:text-lg md:text-xl leading-relaxed text-[#1B365D]/80 font-normal"
            >
              Coach William 'Buck' Godfrey dedicated his life to developing champions in the classroom, on the field, and in life. As an educator, coach, mentor, author, and community leader, he believed that greatness was cultivated through discipline, character, service, and an unwavering commitment to excellence.
            </p>
          </div>

          {/* Action Buttons & Phase Indicator */}
          <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center justify-between pt-2">
            <div className="flex flex-wrap gap-4 items-center">
              <button
                id="hero-cta-support"
                onClick={onOpenSupport}
                className="font-body-text text-[11px] font-bold tracking-[0.2em] bg-[#1B365D] text-white py-4 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] active:scale-[0.98] transition-all duration-200 uppercase text-center cursor-pointer shadow-md"
              >
                SUPPORT THE LEGACY
              </button>

              <button
                id="hero-cta-discover"
                onClick={onOpenLegacyModal}
                className="group font-body-text text-[11px] font-bold tracking-[0.2em] border border-[#1B365D]/20 text-[#1B365D] hover:border-[#1B365D] hover:bg-[#F8FAFC] transition-all py-4 px-6 flex items-center justify-center gap-2 uppercase cursor-pointer"
              >
                DISCOVER HIS LEGACY{' '}
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-[#C5A253]" />
              </button>
            </div>

            {/* Current Phase Accent */}
            <div className="hidden lg:flex items-baseline gap-3 shrink-0">
              <div className="font-display-title text-4xl font-light italic text-[#1B365D]/30">01</div>
              <div className="w-16 h-[1px] bg-[#1B365D]/20 mb-2"></div>
              <div className="font-tech-mono text-[10px] uppercase tracking-widest text-[#C5A253] font-bold">
                ACTIVE HBCU ENDOWMENT
              </div>
            </div>
          </div>
        </div>

        {/* Right Portrait Column */}
        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <div
            id="hero-portrait-card"
            className="relative w-full max-w-md aspect-[3/4] border border-[#1B365D]/15 p-3 bg-white shadow-2xl group"
          >
            <div className="relative w-full h-full overflow-hidden bg-slate-100">
              <img
                id="hero-portrait-img"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                alt="Coach William Buck Godfrey in a powerful portrait, wearing a jacket and knit cap"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKjLJPx0bWhTcZfH2Oq7mqtwVyAo6AFwOc5EeauzLywQbr2JIvsFoh_HNDvClIXcdzzplgGmywAUu6SZG8j92p8AHkK4CJPvaAPAfKBRJgh-7RusInmibzCH5WJQgKtb6HspgZO79JTFZOulAlRfdLiKazY7S5E_sDaIiydxuzqZXw_pvsKueILm27H9ODTAZQNPgaO3cMvsO3KpSLFD0UpzJYuygzgqZqLh-l2MNW-QnV1sk-bBOib-sZjBlrjFi9dw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/40 via-transparent to-transparent"></div>
            </div>

            {/* Plaque Badge */}
            <div
              id="hero-est-badge"
              className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white px-4 py-3 sm:px-5 sm:py-3.5 border border-[#1B365D]/15 font-tech-mono text-[11px] font-bold tracking-[0.2em] text-[#C5A253] shadow-lg flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#C5A253] animate-pulse"></div>
              HBCU EXCELLENCE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
