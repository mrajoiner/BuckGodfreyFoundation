import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="privacy-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1B365D]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="privacy-modal-card"
        className="bg-white border border-[#1B365D]/20 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto text-[#1B365D]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 border-b border-[#1B365D]/10 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#C5A253]" />
            <h3 className="font-display-title text-2xl text-[#1B365D] font-black uppercase tracking-tight">
              Privacy Policy &amp; Data Security
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1B365D]/50 hover:text-[#1B365D] hover:bg-[#1B365D]/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 font-body-text text-xs sm:text-sm text-[#1B365D]/75 leading-relaxed font-normal">
          <p>
            The William Buck Godfrey Legacy Scholarship ("The Foundation", "we", "our") is deeply committed to safeguarding the privacy and confidential personal data of our donors, scholar applicants, nominators, and community supporters.
          </p>
          <h4 className="font-display-title font-bold text-[#1B365D] uppercase tracking-wider text-xs pt-2">
            1. Donor Privacy
          </h4>
          <p>
            We do not sell, rent, lease, or trade donor contact information with any external commercial third parties. All financial processing adheres to strict PCI-DSS and encrypted SSL standards.
          </p>
          <h4 className="font-display-title font-bold text-[#1B365D] uppercase tracking-wider text-xs pt-2">
            2. Student &amp; Academic Records
          </h4>
          <p>
            Academic transcripts, GPA submissions, and letters of recommendation provided during the scholar nomination workflow are strictly restricted to members of the Selection Board and family advisory panel for evaluation purposes only.
          </p>
          <h4 className="font-display-title font-bold text-[#1B365D] uppercase tracking-wider text-xs pt-2">
            3. Inquiries &amp; Communications
          </h4>
          <p>
            You may request to be removed from our newsletter or annual report updates at any time by contacting info@wbglegacy.org.
          </p>
          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-3 px-6 uppercase hover:bg-[#C5A253] hover:text-[#1B365D] transition-all cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
