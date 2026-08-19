import React, { useRef } from 'react';
import { Quote } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export const FamilyQuoteSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const photoY = useTransform(smoothProgress, [0, 1], ['-6%', '10%']);
  const quoteY = useTransform(smoothProgress, [0, 1], ['4%', '-4%']);

  return (
    <section
      ref={containerRef}
      id="family-quote"
      className="py-20 sm:py-28 md:py-36 bg-[#ffffff] border-t border-[#1B365D]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left Family Message with Parallax */}
        <motion.div
          style={{ y: quoteY }}
          className="md:col-span-7 md:col-start-1 order-2 md:order-1 transform-gpu"
        >
          <div className="border-l-2 border-[#C5A253] pl-5 sm:pl-8 md:pl-12 py-2">
            <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C5A253] font-bold block mb-3 sm:mb-4">
              A Message from the Family
            </span>

            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#C5A253] mb-4 sm:mb-6 opacity-80" />

            <blockquote
              id="family-quote-text"
              className="font-display-title text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.3] text-[#1B365D] mb-6 sm:mb-8 font-bold tracking-tight"
            >
              "This scholarship is a continuation of Coach Godfrey's life's work. Every contribution helps ensure that future generations have the opportunity to learn, lead, and leave their own lasting legacy."
            </blockquote>

            <p
              id="family-quote-attribution"
              className="font-tech-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-[#C5A253] uppercase"
            >
              — The Godfrey Family
            </p>
          </div>
        </motion.div>

        {/* Right Photo Frame with Parallax */}
        <div className="md:col-span-5 md:col-start-8 order-1 md:order-2 flex justify-center md:justify-end">
          <motion.div
            style={{ y: photoY }}
            id="family-photo-card"
            className="relative w-full max-w-sm sm:max-w-md aspect-square border border-[#1B365D]/15 p-2.5 sm:p-3 bg-white shadow-xl group transform-gpu"
          >
            <div className="relative w-full h-full overflow-hidden bg-slate-200">
              <img
                id="family-celebration-img"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                alt="Warm candid photo of Coach Godfrey smiling with family and friends in a gymnasium, celebrating, vintage feel."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbHVJNPuOGjDB181AZS259WfjjeG_zdZ9voH0hk_gnsaOus59bgdilFuPyp0Zfzq0f5avk2cwrsT0_J5Tzz23Vm_VCsu-8fk_bD51QDiMujzjxd_koHXDN2j6XoBJ3fH4RtmsOXjGggHMM2OhPuKHEbPFpJsSREyhAp2j2GO0gZWgF7DkU2wql2V_hgaZSnOfnAXdtDZjXovN8wIL271L5WEiTOpo1i573D-gDHhYr_xbTviSzl7FW51djxVCzt9aIhQ"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 text-right font-tech-mono text-[9px] sm:text-[10px] tracking-widest text-[#1B365D]/60 uppercase">
              Coach Godfrey &amp; DeKalb Community
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
