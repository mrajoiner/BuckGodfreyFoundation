import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ExternalLink,
  BookOpen,
  FileText,
  Maximize2,
  Minimize2,
  Sparkles,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { MEMORIAL_DOCUMENTS, MemorialDocument, triggerSingleDownload } from '../utils/downloadDocuments';
import { DOCUMENT_TRANSCRIPTS } from '../data/documentTranscripts';

interface MemorialDocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDocId?: 'program' | 'obituary';
}

export const MemorialDocumentViewerModal: React.FC<MemorialDocumentViewerModalProps> = ({
  isOpen,
  onClose,
  initialDocId = 'program',
}) => {
  const [activeDocId, setActiveDocId] = useState<'program' | 'obituary'>(initialDocId);
  const [viewMode, setViewMode] = useState<'pdf' | 'reader'>('pdf');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (initialDocId) {
      setActiveDocId(initialDocId);
    }
  }, [initialDocId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDoc = MEMORIAL_DOCUMENTS.find((d) => d.id === activeDocId) || MEMORIAL_DOCUMENTS[0];
  const currentTranscript = DOCUMENT_TRANSCRIPTS[activeDocId];

  return (
    <div
      id="memorial-document-viewer-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${currentDoc.title} Viewer`}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0A1B36]/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className={`bg-[#ffffff] border-2 border-[#C5A253] flex flex-col shadow-2xl transition-all duration-300 overflow-hidden ${
          isFullscreen
            ? 'w-full h-full max-w-none'
            : 'w-full max-w-5xl h-[92vh] max-h-[950px]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="bg-[#0A1B36] text-white px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between border-b-2 border-[#C5A253] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-none bg-[#C5A253] text-[#0A1B36] flex items-center justify-center font-display-title font-black text-sm shrink-0">
              {activeDocId === 'program' ? 'P' : 'O'}
            </div>
            <div className="min-w-0">
              <span className="font-tech-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#C5A253] block truncate">
                THE WILLIAM “BUCK” GODFREY ARCHIVES
              </span>
              <h3 className="font-display-title text-sm sm:text-base md:text-lg font-black tracking-wide text-white uppercase truncate">
                {currentDoc.title}
              </h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href={currentDoc.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open document in new browser tab"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-tech-mono font-bold text-white/80 hover:text-[#C5A253] bg-white/10 hover:bg-white/15 px-2.5 py-1.5 transition-colors border border-white/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>NEW TAB</span>
            </a>

            <button
              onClick={() => triggerSingleDownload(currentDoc)}
              title="Download this PDF document"
              className="inline-flex items-center gap-1 text-[11px] font-tech-mono font-bold text-[#0A1B36] bg-[#C5A253] hover:bg-white px-2.5 sm:px-3 py-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">DOWNLOAD PDF</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit full screen' : 'Expand full screen'}
              className="hidden md:inline-flex p-1.5 text-white/70 hover:text-[#C5A253] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle full screen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              title="Close viewer"
              aria-label="Close viewer"
              className="p-1.5 text-white hover:text-[#C5A253] hover:bg-white/10 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary Document Switcher & View Mode Selector */}
        <div className="bg-[#f7f6f2] border-b border-[#0A1B36]/15 px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
          {/* Document Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {MEMORIAL_DOCUMENTS.map((doc) => {
              const isActive = doc.id === activeDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveDocId(doc.id as 'program' | 'obituary')}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-display-title uppercase tracking-wider font-bold transition-all cursor-pointer border-b-2 ${
                    isActive
                      ? 'bg-[#0A1B36] text-white border-[#C5A253]'
                      : 'bg-white text-[#0A1B36]/80 hover:bg-[#0A1B36]/10 border-transparent'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#C5A253]" />
                  <span>{doc.title}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle (PDF Embed vs Formatted Text Reader) */}
          <div className="flex items-center gap-1 bg-white border border-[#0A1B36]/20 p-0.5">
            <button
              onClick={() => setViewMode('pdf')}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer ${
                viewMode === 'pdf'
                  ? 'bg-[#0A1B36] text-white'
                  : 'text-[#0A1B36]/70 hover:text-[#0A1B36]'
              }`}
            >
              <span>Embedded PDF</span>
            </button>
            <button
              onClick={() => setViewMode('reader')}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer ${
                viewMode === 'reader'
                  ? 'bg-[#0A1B36] text-white'
                  : 'text-[#0A1B36]/70 hover:text-[#0A1B36]'
              }`}
            >
              <BookOpen className="w-3 h-3 text-[#C5A253]" />
              <span>Reader View</span>
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="grow overflow-hidden relative bg-[#404040]">
          {viewMode === 'pdf' ? (
            <div className="w-full h-full relative">
              {/* Native PDF Object with Iframe Fallback */}
              <object
                data={`${currentDoc.viewUrl}#toolbar=1&navpanes=0`}
                type="application/pdf"
                className="w-full h-full border-0"
                aria-label={`PDF view of ${currentDoc.title}`}
              >
                <iframe
                  src={`${currentDoc.viewUrl}#toolbar=1&navpanes=0`}
                  className="w-full h-full border-0"
                  title={currentDoc.title}
                >
                  <div className="p-8 text-center text-white bg-[#0A1B36]">
                    <p className="mb-4">Your browser does not support inline PDF rendering.</p>
                    <a
                      href={currentDoc.downloadUrl}
                      className="inline-block bg-[#C5A253] text-[#0A1B36] font-bold px-4 py-2"
                    >
                      Download {currentDoc.title}
                    </a>
                  </div>
                </iframe>
              </object>

              {/* Mobile notice banner encouraging reader view if preferred */}
              <div className="absolute bottom-2 right-2 sm:hidden z-10">
                <button
                  onClick={() => setViewMode('reader')}
                  className="bg-[#0A1B36] text-[#C5A253] border border-[#C5A253] px-2.5 py-1 text-[10px] font-tech-mono shadow-lg cursor-pointer"
                >
                  Switch to Reader View
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Formatted Reader View */
            <div className="w-full h-full overflow-y-auto p-4 sm:p-8 md:p-12 bg-[#faf9f5] text-[#0A1B36]">
              <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 shadow-lg border border-[#0A1B36]/15">
                {/* Reader Header */}
                <div className="text-center pb-6 mb-8 border-b-2 border-[#C5A253]">
                  <span className="font-tech-mono text-xs uppercase tracking-widest text-[#C5A253] font-bold block mb-1">
                    {currentTranscript.meta}
                  </span>
                  <h2 className="font-display-title text-2xl sm:text-3xl md:text-4xl font-black text-[#0A1B36] uppercase tracking-wide">
                    {currentTranscript.title}
                  </h2>
                  <p className="font-body-text text-sm sm:text-base text-[#0A1B36]/80 italic mt-2">
                    {currentTranscript.subtitle}
                  </p>
                  {currentTranscript.dateAndLocation && (
                    <div className="mt-3 inline-block bg-[#0A1B36]/5 px-3 py-1 font-tech-mono text-xs text-[#0A1B36] font-bold">
                      {currentTranscript.dateAndLocation}
                    </div>
                  )}
                </div>

                {/* Sections */}
                <div className="space-y-8">
                  {currentTranscript.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-4">
                      {sec.quarter && (
                        <div className="bg-[#0A1B36] text-white p-3 border-l-4 border-[#C5A253]">
                          <span className="font-display-title text-sm sm:text-base font-black tracking-wider uppercase">
                            {sec.quarter}
                          </span>
                        </div>
                      )}

                      {sec.title && !sec.quarter && (
                        <h4 className="font-display-title text-lg sm:text-xl font-bold text-[#0A1B36] uppercase tracking-wider pb-1 border-b border-[#0A1B36]/20">
                          {sec.title}
                        </h4>
                      )}

                      {sec.quote && (
                        <blockquote className="bg-[#0A1B36]/5 border-l-4 border-[#C5A253] p-4 my-4">
                          <p className="font-body-text text-base sm:text-lg italic text-[#0A1B36] leading-relaxed">
                            {sec.quote.text}
                          </p>
                          <footer className="font-tech-mono text-xs text-[#C5A253] font-bold mt-2">
                            {sec.quote.author}
                          </footer>
                        </blockquote>
                      )}

                      {sec.items && (
                        <div className="space-y-2.5">
                          {sec.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="p-3 bg-[#faf9f5] border border-[#0A1B36]/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                            >
                              <span className="font-display-title text-sm font-bold text-[#0A1B36]">
                                {item.role}
                              </span>
                              <div className="text-right sm:text-right">
                                <span className="font-body-text text-sm font-bold text-[#C5A253]">
                                  {item.name}
                                </span>
                                {item.detail && (
                                  <span className="block text-xs text-[#0A1B36]/70">
                                    {item.detail}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {sec.paragraphs && (
                        <div className="space-y-3 font-body-text text-base leading-relaxed text-[#0A1B36]/90">
                          {sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Reader Footer Notice */}
                <div className="mt-12 pt-6 border-t-2 border-[#C5A253] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0A1B36]/70 font-tech-mono">
                  <span>The William Buck Godfrey Legacy Scholarship Foundation</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setViewMode('pdf')}
                      className="text-[#0A1B36] font-bold hover:text-[#C5A253] underline cursor-pointer"
                    >
                      View Original PDF Layout
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => triggerSingleDownload(currentDoc)}
                      className="text-[#0A1B36] font-bold hover:text-[#C5A253] underline cursor-pointer"
                    >
                      Save PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="bg-[#f0eee6] px-4 py-2 sm:px-6 border-t border-[#0A1B36]/20 flex items-center justify-between text-[11px] font-tech-mono text-[#0A1B36]/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{currentDoc.filename} ({currentDoc.size})</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-[#0A1B36]/60">Press ESC to close</span>
            <button
              onClick={onClose}
              className="font-bold text-[#0A1B36] hover:text-[#C5A253] cursor-pointer"
            >
              CLOSE VIEWER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
