import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';
import { ScholarCriterion } from '../types';

const CRITERIA_DATA: ScholarCriterion[] = [
  {
    number: '01',
    title: 'Character & Integrity',
    description: 'Demonstrating honesty, accountability, and moral courage in personal choices, academic work, and interactions with peers and community.',
  },
  {
    number: '02',
    title: 'Leadership',
    description: 'Serving as a positive role model who inspires others through active guidance, athletic or civic stewardship, and personal example.',
  },
  {
    number: '03',
    title: 'Ambition & Drive',
    description: 'Showing initiative, intellectual curiosity, and a relentless commitment to setting and achieving ambitious educational milestones.',
  },
  {
    number: '04',
    title: 'Academic Commitment',
    description: 'Prioritizing scholarship and scholastic excellence as the foundational cornerstone for personal advancement and long-term career growth.',
  },
  {
    number: '05',
    title: 'Perseverance & Grit',
    description: 'Exhibiting resilience, discipline, and mental fortitude when navigating academic, athletic, or socioeconomic obstacles.',
  },
  {
    number: '06',
    title: 'Service to Others',
    description: 'Actively uplifting teammates, classmates, and community through selfless engagement, tutoring, or civic contribution.',
  },
  {
    number: '07',
    title: 'Pursuit of Greatness',
    description: 'Striving for continuous improvement in all areas of life, carrying forward the high standards established by Coach Godfrey.',
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-15 sm:opacity-25 select-none transform-gpu"
      >
        EXCELLENCE
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
              SELECTION STANDARDS
            </span>
            <h2 className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36]">
              THE SCHOLAR WE SEEK
            </h2>
            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 leading-relaxed font-medium">
              Recipients of the William Buck Godfrey Legacy Scholarship embody the core principles Coach Godfrey cultivated across four decades of leadership.
            </p>
          </div>
        </FadeInView>

        {/* 7 Core Criteria Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CRITERIA_DATA.map((item, index) => (
            <FadeInView key={item.number} direction="up" delay={0.08 * (index + 1)}>
              <div className="bg-[#ffffff] border border-[#0A1B36]/15 p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#C5A253] transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="font-display-title text-3xl font-bold text-[#C5A253] block mb-2">
                    {item.number}
                  </span>
                  <h3 className="font-display-title text-xl font-bold uppercase text-[#0A1B36] mb-2">
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
          <div className="text-center pt-6">
            <button
              onClick={scrollToDonate}
              className="font-body-text text-xs sm:text-sm font-bold tracking-[0.2em] bg-[#0A1B36] text-white py-4 px-10 hover:bg-[#C5A253] hover:text-[#0A1B36] transition-all uppercase inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>SUPPORT SCHOLARSHIP RECIPIENTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
