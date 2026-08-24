import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';
import buckHallOfFameImg from '../assets/images/buck_hall_of_fame_1787153220868.jpg';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax Transformations
  const bgWatermarkY = useTransform(smoothProgress, [0, 1], ['0%', '35%']);
  const portraitY = useTransform(smoothProgress, [0, 1], ['0%', '18%']);
  const textContentY = useTransform(smoothProgress, [0, 1], ['0%', '8%']);
  const badgeY = useTransform(smoothProgress, [0, 1], ['0%', '-25%']);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[90vh] md:min-h-[94vh] pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-28 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden flex items-center bg-[#ffffff]"
    >
      {/* Parallax Background Typography Watermark */}
      <motion.div
        style={{ y: bgWatermarkY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="bg-text-massive opacity-[0.035] sm:opacity-5 transform-gpu">
          GODFREY
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
        {/* Left Editorial Copy with subtle parallax offset & Staggered Fade-in */}
        <motion.div
          style={{ y: textContentY }}
          className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 pt-2 md:pt-0 transform-gpu"
        >
          {/* Top Subtitle */}
          <FadeInView direction="up" delay={0.1} distance={20}>
            <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
              <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C5A253] font-bold">
                THE WILLIAM BUCK GODFREY LEGACY SCHOLARSHIP • IN PARTNERSHIP WITH SPORTY GIRLS, INC.
              </span>
            </div>
          </FadeInView>

          {/* Main Display Headline */}
          <FadeInView direction="up" delay={0.2} distance={24}>
            <h1
              id="hero-main-title"
              className="font-display-title text-3xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[84px] leading-[0.94] sm:leading-[0.9] tracking-[-0.03em] text-[#0A1B36] uppercase mb-6 sm:mb-8 max-w-2xl font-bold"
            >
              BUILDING A LEGACY.
              <br />
              EMPOWERING THE{' '}
              <span className="text-[#C5A253]">
                NEXT GENERATION.
              </span>
            </h1>
          </FadeInView>

          {/* Lead Quote Paragraph */}
          <FadeInView direction="up" delay={0.3} distance={20}>
            <div className="border-l-2 border-[#C5A253] pl-4 sm:pl-6 py-2.5 sm:py-3 mb-8 sm:mb-10 max-w-2xl bg-[#ffffff] border border-[#0A1B36]/10">
              <p
                id="hero-subtext"
                className="font-body-text text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-[#0A1B36]/90 font-medium"
              >
                Coach William 'Buck' Godfrey dedicated his life to developing champions in the classroom, on the field, and in life. As an educator, coach, mentor, author, and community leader, he believed that greatness was cultivated through discipline, character, service, and an unwavering commitment to excellence.
              </p>
            </div>
          </FadeInView>

          {/* Action Buttons & Phase Indicator */}
          <FadeInView direction="up" delay={0.4} distance={20}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center justify-between pt-1">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <button
                  id="hero-cta-support"
                  onClick={() => scrollToSection('donate')}
                  className="font-body-text text-xs sm:text-[11px] font-bold tracking-[0.2em] bg-[#0A1B36] text-white py-4 px-6 sm:px-8 hover:bg-[#C5A253] hover:text-[#0A1B36] active:scale-[0.98] transition-all duration-200 uppercase text-center cursor-pointer shadow-md min-h-[48px] flex items-center justify-center"
                >
                  SUPPORT THE LEGACY
                </button>

                <button
                  id="hero-cta-discover"
                  onClick={() => scrollToSection('legacy')}
                  className="group font-body-text text-xs sm:text-[11px] font-bold tracking-[0.2em] border border-[#0A1B36]/25 text-[#0A1B36] hover:border-[#0A1B36] hover:bg-[#ffffff] transition-all py-4 px-5 sm:px-6 flex items-center justify-center gap-2 uppercase cursor-pointer min-h-[48px]"
                >
                  DISCOVER HIS LEGACY{' '}
                  <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1 text-[#C5A253]" />
                </button>
              </div>

              {/* Current Phase Accent (Desktop) */}
              <div className="hidden lg:flex items-baseline gap-3 shrink-0">
                <div className="font-display-title text-4xl font-light italic text-[#0A1B36]/30">01</div>
                <div className="w-12 xl:w-16 h-[1px] bg-[#0A1B36]/20 mb-2"></div>
                <div className="font-tech-mono text-[10px] uppercase tracking-widest text-[#C5A253] font-bold">
                  ACTIVE HBCU SCHOLARSHIP
                </div>
              </div>
            </div>
          </FadeInView>
        </motion.div>

        {/* Right Portrait Column with Parallax Depth & Fade In */}
        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <FadeInView direction="left" delay={0.25} distance={30} className="w-full max-w-sm sm:max-w-md">
            <motion.div
              style={{ y: portraitY }}
              id="hero-portrait-card"
              className="relative w-full aspect-[3/4] border border-[#0A1B36]/15 p-2.5 sm:p-3 bg-[#ffffff] shadow-2xl group transform-gpu"
            >
              <div className="relative w-full h-full overflow-hidden bg-[#ffffff]">
                <img
                  id="hero-portrait-img"
                  className="w-full h-full object-cover contrast-105 brightness-100 group-hover:grayscale group-hover:scale-105 transition-all duration-700 ease-out"
                  alt="Coach William Buck Godfrey smiling in suit with medal in front of Hall of Fame bronze wall plaques"
                  src={buckHallOfFameImg}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B36]/20 via-transparent to-transparent"></div>
              </div>

              {/* Parallax Plaque Badge */}
              <motion.div
                style={{ y: badgeY }}
                id="hero-est-badge"
                className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 bg-[#ffffff] px-3.5 py-2.5 sm:px-5 sm:py-3.5 border border-[#0A1B36]/15 font-tech-mono text-[10px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[#C5A253] shadow-lg flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#C5A253] animate-pulse"></div>
                HALL OF FAME INDUCTEE
              </motion.div>
            </motion.div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};
