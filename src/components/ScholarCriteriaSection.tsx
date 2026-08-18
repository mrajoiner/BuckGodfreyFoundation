import React, { useState } from 'react';
import { Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ScholarCriterion } from '../types';

interface ScholarCriteriaSectionProps {
  onOpenApply: () => void;
}

const CRITERIA_DATA: ScholarCriterion[] = [
  {
    number: '01',
    title: 'Character and integrity',
    description: 'Uncompromising moral grounding, honesty in word and action, and deep respect for all peers, educators, and community members.',
    detailedRubric: 'Demonstrated ethical judgment, accountability under adversity, and proven trustworthiness affirmed by personal and academic recommendations.',
  },
  {
    number: '02',
    title: 'Leadership',
    description: 'The demonstrated capacity to uplift, motivate, and guide others toward collective achievement in student organizations, athletics, or civic life.',
    detailedRubric: 'Proven record of serving as a team captain, club officer, mentor, or youth leader who commands respect through positive example.',
  },
  {
    number: '03',
    title: 'Ambition and drive',
    description: 'Relentless intellectual curiosity, visionary personal aspirations, and a proactive hunger to pioneer change in chosen fields of study.',
    detailedRubric: 'Defined career vision, enthusiasm for rigorous coursework, and self-directed initiatives showcasing intrinsic motivation.',
  },
  {
    number: '04',
    title: 'Academic commitment',
    description: 'Discipline in the classroom, scholastic rigor, consistent study habits, and devotion to intellectual curiosity and excellence.',
    detailedRubric: 'Consistent GPA standing, dedication to academic mastery, active classroom participation, and strong teacher endorsements.',
  },
  {
    number: '05',
    title: 'Perseverance',
    description: 'Grit and resilience when facing challenges, fortitude to overcome hardships, and staying committed through adversity.',
    detailedRubric: 'Documented resilience in navigating personal or economic challenges while maintaining academic focus and character.',
  },
  {
    number: '06',
    title: 'Service to others',
    description: 'A genuine heart for community impact, voluntary contribution to those in need, and paying forward opportunities and knowledge.',
    detailedRubric: 'Active community service, volunteer involvement, and a demonstrated ethos of lifting others as one climbs.',
  },
  {
    number: '07',
    title: 'A desire to pursue greatness',
    description: 'An unwavering hunger to maximize one’s full potential and strive for extraordinary standards in all collegiate and life pursuits.',
    detailedRubric: 'A transformative mindset committed to high standards, continuous self-improvement, and building a meaningful, lasting legacy.',
  },
];

export const ScholarCriteriaSection: React.FC<ScholarCriteriaSectionProps> = ({
  onOpenApply,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section
      id="scholar"
      className="py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-20 bg-white border-t border-[#1B365D]/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[#1B365D]/10 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A253]" />
              <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold">
                SELECTION MATRIX // SCHOLAR TRAITS
              </span>
            </div>
            <h2
              id="criteria-headline"
              className="font-display-title text-4xl sm:text-6xl md:text-7xl leading-[0.88] text-[#1B365D] uppercase tracking-[-0.04em] font-black"
            >
              THE SCHOLAR <br />
              <span className="text-[#C5A253]">WE SEEK</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-body-text text-sm sm:text-base text-[#1B365D]/80 leading-relaxed font-normal mb-4">
              We identify and invest in exceptional young scholars attending Historically Black Colleges &amp; Universities who embody Coach Godfrey’s foundational standards.
            </p>
            <div className="font-tech-mono text-[11px] text-[#1B365D]/60 uppercase tracking-wider flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C5A253]"></span>
              SELECT ANY PILLAR TO VIEW SELECTION CRITERIA
            </div>
          </div>
        </div>

        {/* 7 Traits Grid */}
        <div
          id="scholar-criteria-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CRITERIA_DATA.map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={item.number}
                id={`criterion-card-${item.number}`}
                onClick={() => toggleExpand(idx)}
                className={`transition-all duration-300 p-8 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                  isExpanded
                    ? 'border border-[#C5A253] shadow-xl bg-white'
                    : 'bg-[#F8FAFC] border border-[#1B365D]/10 hover:border-[#C5A253]'
                }`}
              >
                {/* Accent glow on hover/active */}
                <div
                  className={`absolute top-0 right-0 w-28 h-28 bg-[#C5A253] rounded-full blur-[50px] transition-opacity pointer-events-none ${
                    isExpanded ? 'opacity-25' : 'opacity-0 group-hover:opacity-15'
                  }`}
                ></div>

                <div>
                  {/* Top Row: Number & Label */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display-title text-4xl sm:text-5xl font-black text-[#1B365D]/25 group-hover:text-[#C5A253] transition-colors">
                      {item.number}
                    </span>
                    <span className="font-tech-mono text-[10px] tracking-widest text-[#1B365D]/60 uppercase px-2.5 py-1 border border-[#1B365D]/15">
                      TRAIT {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display-title text-xl sm:text-2xl text-[#1B365D] mb-3 uppercase tracking-tight font-black group-hover:text-[#C5A253] transition-colors">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-body-text text-sm text-[#1B365D]/75 leading-relaxed font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Rubric Expandable Tray */}
                <div className="pt-4 border-t border-[#1B365D]/10">
                  {isExpanded ? (
                    <div className="space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 font-tech-mono text-[10px] font-bold text-[#C5A253] uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        EVALUATION RUBRIC
                      </div>
                      <p className="font-body-text text-xs text-[#1B365D]/85 leading-relaxed bg-[#F1F5F9] p-3 border border-[#1B365D]/10 font-normal">
                        {item.detailedRubric}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenApply();
                        }}
                        className="w-full font-body-text text-[10px] font-bold tracking-[0.2em] bg-[#1B365D] text-white py-2.5 px-3 uppercase hover:bg-[#C5A253] hover:text-[#1B365D] transition-colors cursor-pointer"
                      >
                        APPLY FOR THIS AWARD
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between font-tech-mono text-[10px] text-[#1B365D]/60 group-hover:text-[#1B365D] uppercase tracking-widest transition-colors font-medium">
                      <span>VIEW RUBRIC</span>
                      <ChevronDown className="w-4 h-4 text-[#C5A253] transition-transform group-hover:translate-y-0.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Track Application CTA */}
        <div className="mt-14 p-8 bg-[#F8FAFC] border border-[#1B365D]/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display-title text-xl text-[#1B365D] uppercase tracking-tight font-black">
              KNOW A STUDENT WHO EMBODIES THESE TRAITS?
            </h4>
            <p className="font-body-text text-sm text-[#1B365D]/70 font-normal">
              Nominations and direct scholar applications are currently being evaluated by the Selection Board.
            </p>
          </div>
          <button
            onClick={onOpenApply}
            className="shrink-0 font-body-text text-[11px] font-bold tracking-[0.2em] bg-[#1B365D] text-white py-3.5 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase cursor-pointer shadow-sm"
          >
            START APPLICATION / NOMINATION
          </button>
        </div>
      </div>
    </section>
  );
};
