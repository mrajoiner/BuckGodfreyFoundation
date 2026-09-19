import React from 'react';
import { Download } from 'lucide-react';
import { downloadBothDocuments } from '../utils/downloadDocuments';

export const PersistentDownloadButton: React.FC = () => {
  const handleDownloadBoth = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadBothDocuments();
  };

  return (
    <div
      id="persistent-document-download-container"
      className="fixed bottom-20 left-3 sm:bottom-6 sm:left-6 z-40 flex items-center pointer-events-auto select-none max-w-[calc(100vw-24px)]"
    >
      <a
        href="/api/documents/obituary"
        id="persistent-download-documents-btn"
        onClick={handleDownloadBoth}
        aria-label="Download Program and Obituary"
        className="group flex items-center gap-2 sm:gap-2.5 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] border-2 border-[#0A1B36] py-2.5 px-3.5 sm:py-3 sm:px-5 shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer rounded-none min-h-[44px] no-underline"
      >
        <Download className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A253] group-hover:text-[#0A1B36] transition-colors shrink-0" />
        <span className="font-display-title text-xs sm:text-sm font-bold tracking-wide text-white group-hover:text-[#0A1B36]">
          Download Program and Obituary
        </span>
      </a>
    </div>
  );
};
