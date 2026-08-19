import React, { useRef } from 'react';
import { GraduationCap, Users, HeartHandshake } from 'lucide-react';
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
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden bg-white border-t border-[#1B365D]/10"
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
              FOUR-YEAR HBCU ENDOWMENT
            </span>
            <h2 className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#1B365D]">
              OUR VISION
            </h2>
            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#1B365D]/80 leading-relaxed font-normal">
              The William Buck Godfrey Legacy Scholarship will annually award a deserving student attending a Historically Black College or University with a full four-year scholarship, including semester stipends to support educational and personal success.
            </p>
          </div>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <FadeInView direction="up" delay={0.15}>
            <div className="bg-white border border-[#1B365D]/15 p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#C5A253] transition-all">
              <div className="w-12 h-12 bg-[#F8FAFC] border border-[#C5A253] flex items-center justify-center text-[#C5A253]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display-title text-xl font-bold uppercase text-[#1B365D]">Four-Year HBCU Tuition</h3>
              <p className="font-body-text text-xs sm:text-sm text-[#1B365D]/75 leading-relaxed font-normal">
                Multi-year financial stipends covering tuition, housing, and instructional technology across all 4 years of college.
              </p>
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.25}>
            <div className="bg-white border border-[#1B365D]/15 p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#C5A253] transition-all">
              <div className="w-12 h-12 bg-[#F8FAFC] border border-[#C5A253] flex items-center justify-center text-[#C5A253]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display-title text-xl font-bold uppercase text-[#1B365D]">Executive Mentorship</h3>
              <p className="font-body-text text-xs sm:text-sm text-[#1B365D]/75 leading-relaxed font-normal">
                Direct pairing with Godfrey alumni mentors in engineering, healthcare, public policy, athletics, and business.
              </p>
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.35}>
            <div className="bg-white border border-[#1B365D]/15 p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#C5A253] transition-all">
              <div className="w-12 h-12 bg-[#F8FAFC] border border-[#C5A253] flex items-center justify-center text-[#C5A253]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-display-title text-xl font-bold uppercase text-[#1B365D]">Civic Leadership</h3>
              <p className="font-body-text text-xs sm:text-sm text-[#1B365D]/75 leading-relaxed font-normal">
                Scholars complete youth athletic mentorship and community tutoring projects, continuing Coach Godfrey's legacy of service.
              </p>
            </div>
          </FadeInView>
        </div>

        <FadeInView direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('donate')}
              className="font-body-text text-xs font-bold tracking-[0.2em] bg-[#1B365D] text-white py-4 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase cursor-pointer shadow-md"
            >
              CONTRIBUTE TO SCHOLARSHIP FUND
            </button>
            <button
              onClick={() => scrollToSection('apply')}
              className="font-body-text text-xs font-bold tracking-[0.2em] border border-[#1B365D]/20 text-[#1B365D] py-4 px-8 hover:border-[#1B365D] hover:bg-[#F8FAFC] transition-all uppercase cursor-pointer"
            >
              REVIEW SCHOLAR APPLICATION
            </button>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
