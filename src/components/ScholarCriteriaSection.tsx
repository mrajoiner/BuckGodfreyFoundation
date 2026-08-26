import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';
import { ScholarCriterion } from '../types';

const CRITERIA_DATA: ScholarCriterion[] = [
  {
    number: '01',
    title: 'Character & Integrity',
    description: 'Personal accountability, honesty, and sound judgment in academic work, personal conduct, and community relationships.',
  },
  {
    number: '02',
    title: 'Leadership',
    description: 'Setting a positive standard through teamwork, student organization involvement, or athletic leadership.',
  },
  {
    number: '03',
    title: 'Work Ethic & Initiative',
    description: 'Demonstrating focused effort, intellectual curiosity, and clear dedication to educational goals.',
  },
  {
    number: '04',
    title: 'Academic Commitment',
    description: 'Prioritizing classroom performance and intellectual discipline as the foundation for future opportunities.',
  },
  {
    number: '05',
    title: 'Resilience',
    description: 'Showing discipline, patience, and resolve when navigating academic, personal, or financial challenges.',
  },
  {
    number: '06',
    title: 'Community Service',
    description: 'Actively contributing to the community through volunteer work, tutoring, and youth mentorship.',
  },
  {
    number: '07',
    title: 'Dedication to Growth',
    description: 'Striving for continuous improvement in all areas of life, carrying forward the standards set by Coach Godfrey.',
  },
];

export const ScholarCriteriaSection: React.FC = () => {
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

  const scrollToDonate = () => {
    const el = document.getElementById('donate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="scholar"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden bg-[#ffffff] border-t border-[#0A1B36]/10"
    >
      {/* Background Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-[0.025] sm:opacity-[0.035] select-none transform-gpu"
      >
        STANDARDS
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
              SCHOLARSHIP CRITERIA
            </span>
            <h2 className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36]">
              CRITERIA &amp; VALUES
            </h2>
            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 leading-relaxed font-medium">
              Recipients of the William Buck Godfrey Legacy Scholarship reflect the qualities Coach Godfrey valued most in students and athletes throughout his career.
            </p>
          </div>
        </FadeInView>

        {/* 7 Core Criteria Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CRITERIA_DATA.map((item, index) => (
            <FadeInView key={item.number} direction="up" delay={0.08 * (index + 1)}>
              <div className="bg-[#ffffff] border border-[#0A1B36]/15 p-5 sm:p-7 md:p-8 space-y-3 sm:space-y-4 shadow-xs hover:border-[#C5A253] transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="font-display-title text-2xl sm:text-3xl font-bold text-[#C5A253] block mb-1.5 sm:mb-2">
                    {item.number}
                  </span>
                  <h3 className="font-display-title text-lg sm:text-xl font-bold uppercase text-[#0A1B36] mb-1.5 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/85 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        <FadeInView direction="up" delay={0.4}>
          <div className="text-center pt-4 sm:pt-6">
            <button
              onClick={scrollToDonate}
              className="w-full sm:w-auto font-body-text text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] bg-[#0A1B36] text-white py-4 px-6 sm:px-10 hover:bg-[#C5A253] hover:text-[#0A1B36] transition-all uppercase inline-flex items-center justify-center gap-2 cursor-pointer shadow-md min-h-[48px]"
            >
              <span>SUPPORT SCHOLARSHIP RECIPIENTS</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
