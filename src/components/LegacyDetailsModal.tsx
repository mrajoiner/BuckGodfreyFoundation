import React from 'react';
import { X, BookOpen, MapPin } from 'lucide-react';
import { CareerMilestone } from '../types';

interface LegacyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSupport: () => void;
}

const MILESTONES: CareerMilestone[] = [
  {
    year: '1960S',
    title: 'HBCU Collegiate Roots at Delaware State',
    description: 'A standout multi-sport collegiate student-athlete, earning his degree with distinction in English and Physical Education.',
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
    description: 'Guided the Panthers to an undefeated season and state title while graduating 100% of seniors with college or vocational placement.',
    category: 'honor',
  },
  {
    year: '1983–2012',
    title: '30-Year Dynasty & 273 Victories',
    description: 'Amassed 273 career victories, sending more than 250 student-athletes to collegiate football on scholarship, including numerous NFL standouts.',
    category: 'coaching',
  },
  {
    year: '2014',
    title: 'Georgia Athletic Coaches Hall of Fame',
    description: 'Inducted into the Georgia Athletic Coaches Association Hall of Fame and Atlanta Sports Hall of Fame.',
    category: 'honor',
  },
  {
    year: '2022',
    title: 'William Buck Godfrey Stadium Dedication',
    description: 'DeKalb County officially rededicated Panthersville Stadium as William Buck Godfrey Stadium to honor his monumental civic contribution.',
    category: 'honor',
  },
];

export const LegacyDetailsModal: React.FC<LegacyDetailsModalProps> = ({
  isOpen,
  onClose,
  onOpenSupport,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="legacy-details-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1B365D]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="legacy-details-card"
        className="bg-white border border-[#1B365D]/20 w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto text-[#1B365D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[#1B365D]/10 flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <span className="font-tech-mono text-[10px] font-bold tracking-[0.2em] text-[#C5A253] uppercase block mb-1">
              ARCHIVE &amp; HISTORICAL RECORD
            </span>
            <h3 className="font-display-title text-2xl sm:text-4xl text-[#1B365D] font-black uppercase tracking-tight">
              Coach William 'Buck' Godfrey
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1B365D]/50 hover:text-[#1B365D] hover:bg-[#1B365D]/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-10">
          {/* Top Overview with Photos */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <div className="border border-[#1B365D]/15 p-2 bg-[#F8FAFC]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKjLJPx0bWhTcZfH2Oq7mqtwVyAo6AFwOc5EeauzLywQbr2JIvsFoh_HNDvClIXcdzzplgGmywAUu6SZG8j92p8AHkK4CJPvaAPAfKBRJgh-7RusInmibzCH5WJQgKtb6HspgZO79JTFZOulAlRfdLiKazY7S5E_sDaIiydxuzqZXw_pvsKueILm27H9ODTAZQNPgaO3cMvsO3KpSLFD0UpzJYuygzgqZqLh-l2MNW-QnV1sk-bBOib-sZjBlrjFi9dw"
                  alt="Coach William Buck Godfrey portrait"
                  className="w-full aspect-[4/5] object-cover grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <span className="font-tech-mono text-xs font-bold tracking-widest text-[#C5A253] uppercase">
                EDUCATOR • POET • HALL OF FAME COACH
              </span>
              <h4 className="font-display-title text-2xl sm:text-3xl text-[#1B365D] font-black uppercase tracking-tight leading-snug">
                "The measure of our season is not our trophy case, but where our young men stand twenty years from today."
              </h4>
              <p className="font-body-text text-sm sm:text-base text-[#1B365D]/75 leading-relaxed font-normal">
                Coach Godfrey was far more than an athletic icon; he was a master educator. As an English teacher and published poet, he insisted that intellect, articulate communication, and civic consciousness were the true hallmarks of a champion.
              </p>
              <div className="flex items-center gap-2 font-tech-mono text-xs text-[#1B365D]/60 pt-2">
                <MapPin className="w-4 h-4 text-[#C5A253]" />
                <span>SOUTHWEST DEKALB HIGH SCHOOL // DECATUR, GA</span>
              </div>
            </div>
          </div>

          {/* Key Career Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1B365D]/10 border border-[#1B365D]/10 text-center">
            <div className="bg-white p-6">
              <div className="font-display-title text-3xl font-black text-[#1B365D]">273+</div>
              <div className="font-tech-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A253] mt-1">
                VICTORIES
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="font-display-title text-3xl font-black text-[#1B365D]">250+</div>
              <div className="font-tech-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A253] mt-1">
                SCHOLARSHIPS
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="font-display-title text-3xl font-black text-[#1B365D]">30 YRS</div>
              <div className="font-tech-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A253] mt-1">
                DYNASTY
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="font-display-title text-3xl font-black text-[#1B365D]">100%</div>
              <div className="font-tech-mono text-[10px] font-bold uppercase tracking-wider text-[#C5A253] mt-1">
                CHARACTER
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <span className="font-tech-mono text-xs font-bold tracking-[0.25em] text-[#C5A253] uppercase block">
              CHRONOLOGY // MILESTONES
            </span>
            <div className="space-y-4 border-l border-[#1B365D]/20 pl-6 ml-2">
              {MILESTONES.map((m, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-[#C5A253] group-hover:scale-125 transition-transform" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                    <span className="font-tech-mono text-xs font-bold tracking-widest text-[#C5A253] uppercase">
                      {m.year}
                    </span>
                    <h5 className="font-display-title text-base sm:text-lg text-[#1B365D] font-bold uppercase tracking-tight">{m.title}</h5>
                  </div>
                  <p className="font-body-text text-sm text-[#1B365D]/75 leading-relaxed font-normal">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Coach's Famous Writing & Creed */}
          <div className="p-6 bg-[#F8FAFC] border-l-4 border-[#C5A253]">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#C5A253]" />
              <span className="font-tech-mono text-xs font-bold tracking-widest text-[#1B365D] uppercase">
                THE LITERARY COACH
              </span>
            </div>
            <p className="font-display-title text-base sm:text-lg text-[#1B365D]/90 font-bold leading-relaxed mb-3">
              "WE RUN NOT ONLY TO SCORE POINTS AGAINST OUR OPPONENTS, BUT TO OUTRUN IGNORANCE, OUTRUN POVERTY, AND OUTRUN THE LOW EXPECTATIONS OTHERS MIGHT HAVE SET FOR US."
            </p>
            <p className="font-tech-mono text-[10px] text-[#1B365D]/50 uppercase tracking-widest">
              — COACH GODFREY'S ESSAYS &amp; SPEECHES
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#1B365D]/10 bg-[#F8FAFC] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-tech-mono text-xs text-[#1B365D]/60 uppercase">
            HONOR HIS LEGACY WITH A 4-YEAR SCHOLARSHIP.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="font-body-text text-xs font-semibold tracking-wider text-[#1B365D]/70 hover:text-[#1B365D] py-2.5 px-5 uppercase cursor-pointer"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenSupport();
              }}
              className="font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-2.5 px-6 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase cursor-pointer"
            >
              SUPPORT THE LEGACY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
