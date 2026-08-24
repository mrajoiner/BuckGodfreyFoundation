import React, { useRef } from 'react';
import { Users, HeartHandshake } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';

export const VisionSection: React.FC = () => {
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

  const watermarkY = useTransform(smoothProgress, [0, 1], ['-15%', '25%']);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="vision"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden bg-[#ffffff] border-t border-[#0A1B36]/10"
    >
      {/* Background Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-15 sm:opacity-25 select-none transform-gpu"
      >
        VISION
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
              HBCU SCHOLARSHIP FUND • IN PARTNERSHIP WITH SPORTY GIRLS, INC.
            </span>
            <h2 className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36]">
              OUR VISION
            </h2>
            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 leading-relaxed font-medium">
              The William Buck Godfrey Legacy Scholarship, in partnership with Sporty Girls, Inc., will annually award deserving students attending a Historically Black College or University with scholarship support to foster educational and personal success.
            </p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <FadeInView direction="up" delay={0.15}>
            <div className="bg-[#ffffff] border border-[#0A1B36]/15 p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#C5A253] transition-all h-full">
              <div className="w-12 h-12 bg-[#ffffff] border border-[#C5A253] flex items-center justify-center text-[#C5A253]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display-title text-xl font-bold uppercase text-[#0A1B36]">Executive Mentorship</h3>
              <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/85 leading-relaxed font-medium">
                Direct pairing with Godfrey alumni mentors in engineering, healthcare, public policy, athletics, and business.
              </p>
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.25}>
            <div className="bg-[#ffffff] border border-[#0A1B36]/15 p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#C5A253] transition-all h-full">
              <div className="w-12 h-12 bg-[#ffffff] border border-[#C5A253] flex items-center justify-center text-[#C5A253]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-display-title text-xl font-bold uppercase text-[#0A1B36]">Civic Leadership</h3>
              <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/85 leading-relaxed font-medium">
                Scholars complete youth athletic mentorship and community tutoring projects, continuing Coach Godfrey's legacy of service.
              </p>
            </div>
          </FadeInView>
        </div>

        <FadeInView direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('donate')}
              className="font-body-text text-xs font-bold tracking-[0.2em] bg-[#0A1B36] text-white py-4 px-8 hover:bg-[#C5A253] hover:text-[#0A1B36] transition-all uppercase cursor-pointer shadow-md"
            >
              CONTRIBUTE TO SCHOLARSHIP FUND
            </button>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
