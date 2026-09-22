import React, { useRef } from 'react';
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

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative pt-36 pb-12 sm:pt-44 sm:pb-16 md:pt-48 md:pb-20 lg:pt-52 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden flex flex-col justify-center bg-[#ffffff]"
    >
      {/* Parallax Background Typography Watermark */}
      <motion.div
        style={{ y: bgWatermarkY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="bg-text-massive opacity-[0.03] sm:opacity-[0.04] transform-gpu">
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
              className="font-display-title text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] leading-[0.96] xs:leading-[0.94] sm:leading-[0.9] tracking-[-0.03em] text-[#0A1B36] uppercase mb-5 sm:mb-8 max-w-2xl font-bold"
            >
              HONORING A LEGEND.
              <br />
              SUPPORTING{' '}
              <span className="text-[#C5A253]">
                HBCU SCHOLARS.
              </span>
            </h1>
          </FadeInView>

          {/* Lead Quote Paragraph */}
          <FadeInView direction="up" delay={0.3} distance={20}>
            <div className="border-l-2 border-[#C5A253] pl-3.5 sm:pl-6 py-2 sm:py-3 mb-2 sm:mb-4 max-w-2xl bg-[#ffffff] border border-[#0A1B36]/10">
              <p
                id="hero-subtext"
                className="font-body-text text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-[#0A1B36]/90 font-medium"
              >
                Coach William 'Buck' Godfrey spent more than three decades at Southwest DeKalb High School as a head football coach, English teacher, and author. He led his teams to 273 victories and a state championship, while sending hundreds of student-athletes to college on scholarship. This fund carries his work forward by supporting students attending Historically Black Colleges and Universities.
              </p>
            </div>
          </FadeInView>
        </motion.div>

        {/* Right Portrait Column with Parallax Depth & Fade In */}
        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <FadeInView direction="left" delay={0.25} distance={30} className="w-full max-w-[260px] xs:max-w-[300px] sm:max-w-sm md:max-w-md">
            <motion.div
              style={{ y: portraitY }}
              id="hero-portrait-card"
              className="relative w-full aspect-[3/4] border border-[#0A1B36]/15 p-2 sm:p-3 bg-[#ffffff] shadow-2xl group transform-gpu mx-auto"
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
                className="absolute -bottom-3 -left-2 sm:-bottom-5 sm:-left-5 bg-[#ffffff] px-2.5 py-2 sm:px-5 sm:py-3.5 border border-[#0A1B36]/15 font-tech-mono text-[9px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.2em] text-[#C5A253] shadow-lg flex items-center gap-1.5 sm:gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#C5A253] animate-pulse shrink-0"></div>
                HALL OF FAME INDUCTEE
              </motion.div>
            </motion.div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};

