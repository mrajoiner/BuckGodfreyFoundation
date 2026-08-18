import React from 'react';
import { X, Building2, BookCheck } from 'lucide-react';

interface HbcuExcellenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HbcuExcellenceModal: React.FC<HbcuExcellenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="hbcu-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1B365D]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="hbcu-modal-card"
        className="bg-white border border-[#1B365D]/20 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto text-[#1B365D]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 border-b border-[#1B365D]/10 flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <span className="font-tech-mono text-[10px] font-bold tracking-[0.2em] text-[#C5A253] uppercase block mb-1">
              INSTITUTIONAL HERITAGE
            </span>
            <h3 className="font-display-title text-2xl sm:text-3xl text-[#1B365D] font-black uppercase tracking-tight">
              HBCU Excellence Tradition
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

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="font-body-text text-sm sm:text-base text-[#1B365D]/75 leading-relaxed font-normal">
            Historically Black Colleges and Universities (HBCUs) have cultivated America's foremost thinkers, civil rights titans, innovators, and cultural architects. Coach Godfrey himself excelled at Delaware State University, grounding his worldview in the transformative power of these historic institutions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#F8FAFC] border border-[#1B365D]/10">
              <Building2 className="w-5 h-5 text-[#C5A253] mb-2" />
              <h4 className="font-display-title text-base sm:text-lg text-[#1B365D] font-bold uppercase">Supported Institutions</h4>
              <p className="font-body-text text-xs text-[#1B365D]/70 mt-1 leading-normal font-normal">
                Any accredited four-year HBCU, including Delaware State, Morehouse, Spelman, Howard, Florida A&amp;M, North Carolina A&amp;T, Clark Atlanta, Hampton, and Tuskegee.
              </p>
            </div>

            <div className="p-5 bg-[#F8FAFC] border border-[#1B365D]/10">
              <BookCheck className="w-5 h-5 text-[#C5A253] mb-2" />
              <h4 className="font-display-title text-base sm:text-lg text-[#1B365D] font-bold uppercase">Direct Disbursement</h4>
              <p className="font-body-text text-xs text-[#1B365D]/70 mt-1 leading-normal font-normal">
                Scholarship funds are directly transferred to institutional bursar accounts to guarantee uninterrupted matriculation and semester book allotments.
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#F8FAFC] border-l-4 border-[#C5A253]">
            <h5 className="font-tech-mono text-[10px] font-bold uppercase tracking-widest text-[#C5A253] mb-1">
              THE GODFREY LEGACY PROMISE
            </h5>
            <p className="font-display-title text-base text-[#1B365D] font-bold">
              "WHEN YOU EDUCATE AN HBCU SCHOLAR, YOU STRENGTHEN THE BEDROCK OF OUR COMMUNITIES AND FUTURE."
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-3.5 px-6 uppercase hover:bg-[#C5A253] hover:text-[#1B365D] transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
