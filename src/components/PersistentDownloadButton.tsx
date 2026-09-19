import React from 'react';
import { Download, Eye } from 'lucide-react';
import { downloadBothDocuments } from '../utils/downloadDocuments';

interface PersistentDownloadButtonProps {
  onViewClick?: (docId?: 'program' | 'obituary') => void;
}

export const PersistentDownloadButton: React.FC<PersistentDownloadButtonProps> = ({
  onViewClick,
}) => {
  const handleDownloadBoth = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadBothDocuments();
  };

  const handleView = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewClick) {
      onViewClick('program');
    } else {
      const el = document.getElementById('documents');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div
      id="persistent-document-download-container"
      className="fixed bottom-20 left-3 sm:bottom-6 sm:left-6 z-40 flex items-center gap-1.5 pointer-events-auto select-none max-w-[calc(100vw-24px)]"
    >
      {/* Primary Download Link */}
      <a
        href="/documents/William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf"
        id="persistent-download-documents-btn"
        download="William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleDownloadBoth}
        aria-label="Download Program and Obituary"
        className="group flex items-center gap-2 sm:gap-2.5 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] border-2 border-[#0A1B36] py-2.5 px-3.5 sm:py-3 sm:px-5 shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer rounded-none min-h-[44px] no-underline"
      >
        <Download className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A253] group-hover:text-[#0A1B36] transition-colors shrink-0" />
        <span className="font-display-title text-xs sm:text-sm font-bold tracking-wide text-white group-hover:text-[#0A1B36]">
          Download Program and Obituary
        </span>
      </a>

      {/* Companion View Link to view inline */}
      <button
        id="persistent-view-documents-btn"
        onClick={handleView}
        aria-label="View Program and Obituary inline on website"
        title="View Program and Obituary inline on website"
        className="group flex items-center gap-1.5 bg-[#ffffff] text-[#0A1B36] hover:bg-[#C5A253] hover:text-[#0A1B36] border-2 border-[#0A1B36] py-2.5 px-3 sm:py-3 sm:px-3.5 shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer rounded-none min-h-[44px]"
      >
        <Eye className="w-4 h-4 text-[#0A1B36]" />
        <span className="font-display-title text-xs sm:text-sm font-bold tracking-wide">
          View
        </span>
      </button>
    </div>
  );
};
