import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { FadeInView } from './FadeInView';

export const CtaSection: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#0A1B36] text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <FadeInView direction="up" delay={0.1}>
          <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
            HONOR THE LEGACY • IN PARTNERSHIP WITH SPORTY GIRLS
          </span>
          <h2 className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight mt-3 text-white">
            HELP SHAPE THE NEXT GENERATION
          </h2>
          <p className="font-body-text text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mt-4 font-medium">
            Your support ensures Coach Godfrey’s enduring values of discipline, academic commitment, and service continue to transform lives for decades to come.
          </p>
        </FadeInView>

        <FadeInView direction="up" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('donate')}
              className="font-body-text text-xs sm:text-sm font-bold tracking-[0.2em] bg-[#C5A253] text-[#0A1B36] py-4 px-10 hover:bg-white hover:text-[#0A1B36] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto"
            >
              <span>SUPPORT THE LEGACY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </FadeInView>

        <FadeInView direction="up" delay={0.3}>
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-tech-mono text-white/70">
            <ShieldCheck className="w-4 h-4 text-[#C5A253]" />
            <span>Official 501(c)(3) Charitable Organization in Partnership with Sporty Girls • All Contributions Tax-Deductible</span>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
