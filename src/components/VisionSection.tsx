import React from 'react';
import { BookOpen, GraduationCap, Award, Compass } from 'lucide-react';

interface VisionSectionProps {
  onOpenSupport: () => void;
  onOpenApply: () => void;
}

export const VisionSection: React.FC<VisionSectionProps> = ({
  onOpenSupport,
  onOpenApply,
}) => {
  return (
    <section
      id="vision"
      className="py-24 sm:py-32 md:py-36 px-6 sm:px-10 md:px-16 lg:px-20 bg-white border-y border-[#1B365D]/10 relative"
    >
      <div className="max-w-5xl mx-auto text-center">
        <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block mb-4">
          ENDURING COMMITMENT // HBCU ADVANCEMENT
        </span>

        <h2
          id="vision-main-title"
          className="font-display-title text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.92] text-[#1B365D] mb-8 uppercase tracking-[-0.04em] font-black"
        >
          OUR <span className="text-[#C5A253]">VISION</span>
        </h2>

        <div className="p-8 sm:p-12 bg-[#F8FAFC] border border-[#1B365D]/15 mb-14 text-left relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A253] rounded-full blur-[80px] opacity-15 pointer-events-none"></div>
          <p
            id="vision-statement"
            className="font-display-title text-xl sm:text-2xl md:text-3xl text-[#1B365D] font-bold leading-relaxed tracking-tight"
          >
            "The William Buck Godfrey Legacy Scholarship will annually award a deserving student attending a Historically Black College or University with a full four-year scholarship, including semester stipends to support educational and personal success."
          </p>
        </div>

        {/* 2-Column Core Scholarship Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left mb-16">
          <div className="bg-[#F8FAFC] border border-[#1B365D]/10 p-8 sm:p-10 flex flex-col justify-between group hover:border-[#C5A253] transition-colors relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A253] rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-tech-mono text-[10px] font-bold tracking-[0.2em] text-[#C5A253] uppercase">
                  COMPONENT I // 4-YEAR TUITION
                </span>
                <GraduationCap className="w-5 h-5 text-[#1B365D]/40 group-hover:text-[#C5A253] transition-colors" />
              </div>
              <h3 className="font-display-title text-xl sm:text-2xl text-[#1B365D] mb-4 uppercase tracking-tight font-black">
                FULL FOUR-YEAR SCHOLARSHIP
              </h3>
              <p className="font-body-text text-sm sm:text-base text-[#1B365D]/75 leading-relaxed font-normal">
                Comprehensive financial award covering four complete academic years at an accredited Historically Black College or University (HBCU), empowering the scholar to graduate debt-free.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#1B365D]/10 font-tech-mono text-[10px] text-[#1B365D]/60 tracking-[0.15em] uppercase">
              RENEWABLE 4-YEAR UNDERGRADUATE COMMITMENT
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#1B365D]/10 p-8 sm:p-10 flex flex-col justify-between group hover:border-[#C5A253] transition-colors relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A253] rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-tech-mono text-[10px] font-bold tracking-[0.2em] text-[#C5A253] uppercase">
                  COMPONENT II // LIVING &amp; ACADEMICS
                </span>
                <BookOpen className="w-5 h-5 text-[#1B365D]/40 group-hover:text-[#C5A253] transition-colors" />
              </div>
              <h3 className="font-display-title text-xl sm:text-2xl text-[#1B365D] mb-4 uppercase tracking-tight font-black">
                SEMESTER STIPENDS
              </h3>
              <p className="font-body-text text-sm sm:text-base text-[#1B365D]/75 leading-relaxed font-normal">
                Direct semester stipends allocated to support educational materials, textbooks, essential technology, and personal living needs to foster holistic scholastic success.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#1B365D]/10 font-tech-mono text-[10px] text-[#1B365D]/60 tracking-[0.15em] uppercase">
              SEMESTER DISBURSEMENTS &amp; STUDENT SUPPORT
            </div>
          </div>
        </div>

        {/* Micro-metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1B365D]/10 border border-[#1B365D]/10">
          <div className="bg-white p-6 flex flex-col gap-1 text-left">
            <span className="font-tech-mono text-[10px] uppercase tracking-widest text-[#1B365D]/50">DURATION</span>
            <div className="font-display-title text-2xl sm:text-3xl font-bold text-[#1B365D]">4 YEARS</div>
            <p className="font-tech-mono text-[10px] text-[#1B365D]/50 uppercase tracking-wider mt-1">FULL TUITION AWARD</p>
          </div>

          <div className="bg-white p-6 flex flex-col gap-1 text-left">
            <span className="font-tech-mono text-[10px] uppercase tracking-widest text-[#C5A253] font-bold">INSTITUTION</span>
            <div className="font-display-title text-2xl sm:text-3xl font-bold text-[#1B365D]">HBCU</div>
            <p className="font-tech-mono text-[10px] text-[#1B365D]/50 uppercase tracking-wider mt-1">NATIONWIDE ACCESS</p>
          </div>

          <div className="bg-white p-6 flex flex-col gap-1 text-left">
            <span className="font-tech-mono text-[10px] uppercase tracking-widest text-[#1B365D]/50">STIPENDS</span>
            <div className="font-display-title text-2xl sm:text-3xl font-bold text-[#1B365D]">SEMESTER</div>
            <p className="font-tech-mono text-[10px] text-[#1B365D]/50 uppercase tracking-wider mt-1">BOOKS &amp; LIVING AID</p>
          </div>

          <div className="bg-white p-6 flex flex-col gap-1 text-left">
            <span className="font-tech-mono text-[10px] uppercase tracking-widest text-[#C5A253] font-bold">FREQUENCY</span>
            <div className="font-display-title text-2xl sm:text-3xl font-bold text-[#1B365D]">ANNUAL</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A253]"></div>
              <span className="font-tech-mono text-[10px] text-[#1B365D]/60 uppercase font-semibold">ENDOWED SCHOLARS</span>
            </div>
          </div>
        </div>

        {/* Interactive Vision CTA */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            id="vision-btn-support"
            onClick={onOpenSupport}
            className="w-full sm:w-auto font-body-text text-[11px] font-bold tracking-[0.2em] bg-[#1B365D] text-white py-4 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase cursor-pointer shadow-md"
          >
            SUPPORT THE VISION
          </button>
          <button
            id="vision-btn-apply"
            onClick={onOpenApply}
            className="w-full sm:w-auto font-body-text text-[11px] font-bold tracking-[0.2em] border border-[#1B365D]/30 text-[#1B365D] py-4 px-8 hover:bg-[#1B365D] hover:text-white transition-all uppercase cursor-pointer"
          >
            REVIEW SCHOLAR APPLICATION
          </button>
        </div>
      </div>
    </section>
  );
};
