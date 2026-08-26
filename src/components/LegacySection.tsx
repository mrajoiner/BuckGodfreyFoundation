import React, { useRef } from 'react';
import { ArrowRight, BookOpen, MapPin, Award, Landmark } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';
import { CareerMilestone } from '../types';
import buckStadiumImg from '../assets/images/regenerated_image_1787587209260.png';

const MILESTONES: CareerMilestone[] = [
  {
    year: '1960s',
    title: 'HBCU Collegiate Roots & Graduate Studies',
    description: 'A standout multi-sport collegiate student-athlete at Delaware State, earning his degree with distinction in English, receiving his master\'s in Linguistics from Atlanta University.',
    category: 'academic',
  },
  {
    year: '1983',
    title: 'Southwest DeKalb High School Appointment',
    description: 'Named head football coach and English literature instructor at Southwest DeKalb High School in Decatur, Georgia, establishing mandatory study tables.',
    category: 'coaching',
  },
  {
    year: '1995',
    title: 'Class AAAA Georgia State Championship',
    description: 'Guided the Panthers to a 14-1 season and state title while graduating 100% of seniors with college or vocational placement.',
    category: 'honor',
  },
  {
    year: '1983–2012',
    title: '30-Year Dynasty & 273 Victories',
    description: 'Amassed 273 career victories, sending more than 250 student-athletes to collegiate football on scholarship, including numerous NFL standouts.',
    category: 'coaching',
  },
  {
    year: 'Hall of Fame',
    title: 'Quadruple Hall of Fame Inductee',
    description: 'Inducted into the Delaware State Athletic Hall of Fame, the Atlanta Sports Hall of Fame, the Georgia Coaches Association Hall of Fame, and the Georgia Sports Hall of Fame.',
    category: 'honor',
  },
  {
    year: '2015',
    title: 'William "Buck" Godfrey Stadium Dedication',
    description: 'In 2015, Southwest DeKalb\'s home field was permanently renamed William "Buck" Godfrey Stadium, ensuring that generations of athletes would continue to walk in the shadow of his legacy.',
    category: 'honor',
  },
];

export const LegacySection: React.FC = () => {
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

  const watermarkY = useTransform(smoothProgress, [0, 1], ['-20%', '30%']);
  const photoY = useTransform(smoothProgress, [0, 1], ['-8%', '12%']);
  const textY = useTransform(smoothProgress, [0, 1], ['5%', '-5%']);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="legacy"
      className="relative py-20 sm:py-28 md:py-36 lg:py-40 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden border-t border-[#0A1B36]/10 bg-[#ffffff]"
    >
      {/* Parallax Massive Editorial Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-[0.025] sm:opacity-[0.035] select-none transform-gpu"
      >
        LEGACY
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Top Split: Photo & Creed */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Sideline Vintage Photo Frame */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <FadeInView direction="right" delay={0.15} distance={30} className="w-full max-w-sm sm:max-w-md">
              <motion.div
                style={{ y: photoY }}
                id="legacy-sideline-frame"
                className="relative w-full aspect-[4/5] border border-[#0A1B36]/15 p-2.5 sm:p-3 bg-[#ffffff] shadow-xl group transform-gpu"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#ffffff]">
                  <img
                    id="legacy-sideline-img"
                    className="w-full h-full object-cover contrast-105 group-hover:grayscale group-hover:scale-105 transition-all duration-700 ease-out"
                    alt="Vintage photo of Coach Godfrey crouching on the sideline during a football game in a yellow shirt"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBEMjOAoy5Xno6zGiVNGYo8jhAzrnTXiN3GL5xJbGwI3QgpdNMo_u8QW0tOPZD3r_CMY1isijjkINBSxtsc_xz4Wsz2vv5MZgmxgcy6A4UV5mNw8b8WAJegLHIyXdmddQ3TNwqwhAye5QLicI2YZp0z72SeR9VmcWCgT6WSgGKWG_mHAvFr2NnsObN3lW6Ngsc5cgPXASIo-z_Z7aIbjk--Q1XJ8LIaDUtEfZEs2WNi9ZiqK1lXLAWDOVkpU0Q7dGKWg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B36]/40 via-transparent to-transparent"></div>
                </div>
                <div className="mt-3 flex items-center justify-between font-tech-mono text-[9px] sm:text-[10px] tracking-widest text-[#0A1B36]/70 uppercase">
                  <span>Southwest DeKalb Dynasty</span>
                  <span className="text-[#C5A253] font-bold">Historic Archive</span>
                </div>
              </motion.div>
            </FadeInView>
          </div>

          {/* Right Editorial Story */}
          <motion.div
            style={{ y: textY }}
            className="md:col-span-7 md:pl-2 lg:pl-10 transform-gpu"
          >
            <div className="border-l-2 border-[#C5A253] pl-5 sm:pl-8 md:pl-12 py-2">
              <FadeInView direction="up" delay={0.1} distance={20}>
                <span className="font-tech-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C5A253] font-bold block mb-3">
                  A Standard of Excellence
                </span>
              </FadeInView>

              <FadeInView direction="up" delay={0.2} distance={24}>
                <h2
                  id="legacy-headline"
                  className="font-display-title text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] sm:leading-[0.92] text-[#0A1B36] mb-6 sm:mb-8 font-bold uppercase tracking-[-0.03em]"
                >
                  “More Than Victories”
                </h2>
              </FadeInView>

              <FadeInView direction="up" delay={0.3} distance={20}>
                <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 mb-4 sm:mb-6 leading-relaxed font-medium">
                  Across 30 seasons at Southwest DeKalb High School, Coach Godfrey proved that sports and academic excellence go hand in hand. To Coach Godfrey, athletics was a vehicle to prepare young men for college and adult life.
                </p>
              </FadeInView>

              <FadeInView direction="up" delay={0.4} distance={20}>
                <p className="font-body-text text-sm sm:text-base text-[#0A1B36]/85 mb-8 sm:mb-10 leading-relaxed font-medium">
                  As an English literature teacher and published writer, he instituted mandatory study tables and expected the same discipline in the classroom as on the gridiron. He helped more than 250 players earn college athletic scholarships and inspired hundreds more to pursue higher education.
                </p>
              </FadeInView>

              <FadeInView direction="up" delay={0.5} distance={20}>
                <button
                  onClick={() => scrollToSection('scholar')}
                  className="group font-body-text text-xs sm:text-[11px] font-bold tracking-[0.2em] text-[#C5A253] hover:text-[#0A1B36] transition-colors flex items-center justify-center sm:justify-start gap-2 uppercase py-2 sm:py-1 border-b border-[#C5A253] hover:border-[#0A1B36] min-h-[44px] cursor-pointer"
                >
                  THE SCHOLARSHIP CRITERIA{' '}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </FadeInView>
            </div>
          </motion.div>
        </div>

        {/* Persistent Full Biography, Career Timeline & Writings */}
        <FadeInView direction="up" delay={0.2}>
          <div className="bg-[#ffffff] border border-[#0A1B36]/15 p-4 sm:p-8 md:p-10 shadow-lg space-y-8 sm:space-y-10">
            {/* Career Numbers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#0A1B36]/10 border border-[#0A1B36]/10 text-center">
              <div className="bg-[#ffffff] p-4 sm:p-6">
                <div className="font-display-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A1B36]">273+</div>
                <div className="font-tech-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#C5A253] mt-1">
                  Victories
                </div>
              </div>
              <div className="bg-[#ffffff] p-4 sm:p-6">
                <div className="font-display-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A1B36]">250+</div>
                <div className="font-tech-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#C5A253] mt-1">
                  Scholarships
                </div>
              </div>
              <div className="bg-[#ffffff] p-4 sm:p-6">
                <div className="font-display-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A1B36]">30 Yrs</div>
                <div className="font-tech-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#C5A253] mt-1">
                  Dynasty
                </div>
              </div>
              <div className="bg-[#ffffff] p-4 sm:p-6">
                <div className="font-display-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A1B36]">100%</div>
                <div className="font-tech-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#C5A253] mt-1">
                  Graduation Focus
                </div>
              </div>
            </div>

            {/* Biography Detailed Text */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="border border-[#0A1B36]/15 p-2 bg-[#ffffff] group w-full max-w-[260px] sm:max-w-xs md:max-w-none">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKjLJPx0bWhTcZfH2Oq7mqtwVyAo6AFwOc5EeauzLywQbr2JIvsFoh_HNDvClIXcdzzplgGmywAUu6SZG8j92p8AHkK4CJPvaAPAfKBRJgh-7RusInmibzCH5WJQgKtb6HspgZO79JTFZOulAlRfdLiKazY7S5E_sDaIiydxuzqZXw_pvsKueILm27H9ODTAZQNPgaO3cMvsO3KpSLFD0UpzJYuygzgqZqLh-l2MNW-QnV1sk-bBOib-sZjBlrjFi9dw"
                    alt="Coach William Buck Godfrey portrait"
                    className="w-full aspect-[4/5] object-cover contrast-105 hover:grayscale group-hover:grayscale transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="md:col-span-7 space-y-3 sm:space-y-4">
                <span className="font-tech-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#C5A253] uppercase">
                  Educator • Poet • Hall of Fame Coach
                </span>
                <h4 className="font-display-title text-xl sm:text-2xl md:text-3xl text-[#0A1B36] font-bold uppercase tracking-tight leading-snug">
                  "The measure of our season is not our trophy case, but where our young men stand twenty years from today."
                </h4>
                <p className="font-body-text text-xs sm:text-sm md:text-base text-[#0A1B36]/90 leading-relaxed font-medium">
                  Coach Godfrey was far more than an athletic icon; he was a master educator. As an English teacher and published author, he insisted that intellect, articulate communication, and civic consciousness were the true hallmarks of a champion.
                </p>
                <p className="font-body-text text-xs sm:text-sm md:text-base text-[#0A1B36]/90 leading-relaxed font-medium">
                  His remarkable career earned induction into the Delaware State Athletic Hall of Fame, the Atlanta Sports Hall of Fame, the Georgia Coaches Association Hall of Fame, and the Georgia Sports Hall of Fame.
                </p>
                <div className="flex items-center gap-2 font-tech-mono text-[10px] sm:text-xs text-[#0A1B36]/70 pt-1">
                  <MapPin className="w-4 h-4 text-[#C5A253] shrink-0" />
                  <span>Southwest DeKalb High School // Decatur, GA</span>
                </div>
              </div>
            </div>

            {/* Hall of Fame Inductions Callout Box */}
            <div className="p-4 sm:p-6 bg-[#ffffff] border border-[#0A1B36]/15 shadow-xs space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A253] shrink-0" />
                <span className="font-tech-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#0A1B36] uppercase">
                  Hall of Fame Honors &amp; Distinctions
                </span>
              </div>
              <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/85 leading-relaxed font-medium">
                His remarkable career earned induction into the Delaware State Athletic Hall of Fame, the Atlanta Sports Hall of Fame, the Georgia Coaches Association Hall of Fame, and the Georgia Sports Hall of Fame.
              </p>
            </div>

            {/* Stadium Dedication Landmark Card */}
            <div className="border border-[#0A1B36]/15 bg-[#ffffff] shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] md:aspect-auto overflow-hidden bg-[#0A1B36] group">
                <img
                  src={buckStadiumImg}
                  alt="Coach William Buck Godfrey smiling in front of the William Buck Godfrey Stadium scoreboard"
                  className="w-full h-full object-cover contrast-105 group-hover:scale-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-6 p-5 sm:p-8 flex flex-col justify-center space-y-2.5 sm:space-y-3 border-t md:border-t-0 md:border-l border-[#0A1B36]/10">
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C5A253] shrink-0" />
                  <span className="font-tech-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#C5A253] uppercase">
                    Stadium Dedication // 2015
                  </span>
                </div>
                <h4 className="font-display-title text-lg sm:text-xl md:text-2xl text-[#0A1B36] font-bold uppercase tracking-tight">
                  William "Buck" Godfrey Stadium
                </h4>
                <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/85 leading-relaxed font-medium">
                  In 2015, Southwest DeKalb's home field was permanently renamed William "Buck" Godfrey Stadium, ensuring that generations of athletes would continue to walk in the shadow of his legacy.
                </p>
                <div className="font-tech-mono text-[9px] sm:text-[10px] text-[#0A1B36]/60 uppercase tracking-wider pt-1">
                  Decatur, Georgia • DeKalb County Athletics
                </div>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="space-y-5 sm:space-y-6 pt-4 border-t border-[#0A1B36]/10">
              <span className="font-tech-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#C5A253] uppercase block">
                Chronology // Career Milestones
              </span>
              <div className="space-y-4 sm:space-y-5 border-l border-[#0A1B36]/20 pl-4 sm:pl-6 ml-2">
                {MILESTONES.map((m, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 w-2.5 h-2.5 bg-[#C5A253]" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-1">
                      <span className="font-tech-mono text-[11px] sm:text-xs font-bold tracking-widest text-[#C5A253]">
                        {m.year}
                      </span>
                      <h5 className="font-display-title text-sm sm:text-base md:text-lg text-[#0A1B36] font-bold tracking-tight">
                        {m.title}
                      </h5>
                    </div>
                    <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/85 leading-relaxed font-medium">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coach's Famous Writing & Creed */}
            <div className="p-4 sm:p-6 bg-[#ffffff] border-l-4 border-[#C5A253] border border-[#0A1B36]/10">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <BookOpen className="w-4 h-4 text-[#C5A253] shrink-0" />
                <span className="font-tech-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#0A1B36] uppercase">
                  The Literary Coach
                </span>
              </div>
              <p className="font-display-title text-sm sm:text-base md:text-lg text-[#0A1B36] font-bold leading-relaxed mb-2 sm:mb-3">
                "We run not only to score points against our opponents, but to outrun ignorance, outrun poverty, and outrun the low expectations others might have set for us."
              </p>
              <p className="font-tech-mono text-[9px] sm:text-[10px] text-[#0A1B36]/70 uppercase tracking-widest">
                — Coach Godfrey's Essays &amp; Speeches
              </p>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
