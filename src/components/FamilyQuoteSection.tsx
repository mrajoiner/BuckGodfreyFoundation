import React, { useRef } from 'react';
import { Quote } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';

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
      className="py-20 sm:py-28 md:py-36 bg-[#ffffff] border-t border-[#0A1B36]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left Family Message with Parallax & Intersection Observer */}
        <motion.div
          style={{ y: quoteY }}
          className="md:col-span-7 md:col-start-1 order-2 md:order-1 transform-gpu"
        >
          <FadeInView direction="up" delay={0.1} distance={36}>
            <div className="border-l-2 border-[#C5A253] pl-5 sm:pl-8 md:pl-12 py-2">
              <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C5A253] font-bold block mb-3 sm:mb-4">
                A Message from the Family
              </span>

              <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#C5A253] mb-4 sm:mb-6 opacity-80" />

              <h3
                id="family-quote-text"
                className="font-display-title text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#0A1B36] font-bold leading-snug sm:leading-tight mb-4 sm:mb-6"
              >
                "This scholarship carries forward what Coach Godfrey dedicated his life to: helping young people earn their college degrees, build strong character, and give back to their communities."
              </h3>

              <p
                id="family-attribution"
                className="font-tech-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-[#C5A253] uppercase"
              >
                — The Godfrey Family
              </p>
            </div>
          </FadeInView>
        </motion.div>

        {/* Right Photo Frame with Parallax & Intersection Observer */}
        <div className="md:col-span-5 md:col-start-8 order-1 md:order-2 flex justify-center md:justify-end">
          <FadeInView direction="up" delay={0.2} distance={40} className="w-full max-w-sm sm:max-w-md">
            <motion.div
              style={{ y: photoY }}
              id="family-photo-card"
              className="relative w-full aspect-square border border-[#0A1B36]/15 p-2.5 sm:p-3 bg-[#ffffff] shadow-xl group transform-gpu"
            >
              <div className="relative w-full h-full overflow-hidden bg-[#ffffff]">
                <img
                  id="family-celebration-img"
                  className="w-full h-full object-cover contrast-105 brightness-100 group-hover:grayscale group-hover:scale-105 transition-all duration-700 ease-out"
                  alt="Warm candid photo of Coach Godfrey smiling with family and friends in a gymnasium, celebrating, vintage feel."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbHVJNPuOGjDB181AZS259WfjjeG_zdZ9voH0hk_gnsaOus59bgdilFuPyp0Zfzq0f5avk2cwrsT0_J5Tzz23Vm_VCsu-8fk_bD51QDiMujzjxd_koHXDN2j6XoBJ3fH4RtmsOXjGggHMM2OhPuKHEbPFpJsSREyhAp2j2GO0gZWgF7DkU2wql2V_hgaZSnOfnAXdtDZjXovN8wIL271L5WEiTOpo1i573D-gDHhYr_xbTviSzl7FW51djxVCzt9aIhQ"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 text-right font-tech-mono text-[9px] sm:text-[10px] tracking-widest text-[#0A1B36]/70 uppercase">
                Coach Godfrey, wife Joyce &amp; The SWD Community
              </div>
            </motion.div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
