import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ExternalLink,
  BookOpen,
  FileText,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import {
  MEMORIAL_DOCUMENTS,
  MemorialDocument,
  triggerSingleDownload,
  triggerSingleDownloadByUrl,
} from '../utils/downloadDocuments';
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
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'image' | 'reader' | 'all-pages'>('image');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(1);

  useEffect(() => {
    if (initialDocId) {
      setActiveDocId(initialDocId);
      setActivePageIndex(0);
      setZoomScale(1);
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
  const currentPage = currentDoc.jpegPages[activePageIndex] || currentDoc.jpegPages[0];

  const handlePrevPage = () => {
    setActivePageIndex((prev) => (prev > 0 ? prev - 1 : currentDoc.jpegPages.length - 1));
  };

  const handleNextPage = () => {
    setActivePageIndex((prev) => (prev < currentDoc.jpegPages.length - 1 ? prev + 1 : 0));
  };

  const zoomIn = () => setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  const zoomOut = () => setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  const resetZoom = () => setZoomScale(1);

  return (
    <div
      id="memorial-document-viewer-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${currentDoc.title} Viewer`}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0A1B36]/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className={`bg-[#ffffff] border-2 border-[#C5A253] flex flex-col shadow-2xl transition-all duration-300 overflow-hidden ${
          isFullscreen
            ? 'w-full h-full max-w-none'
            : 'w-full max-w-6xl h-[94vh] max-h-[980px]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="bg-[#0A1B36] text-white px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between border-b-2 border-[#C5A253] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 bg-[#C5A253] text-[#0A1B36] flex items-center justify-center font-display-title font-black text-sm shrink-0">
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
              href={currentPage.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full resolution in new browser tab"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-tech-mono font-bold text-white/80 hover:text-[#C5A253] bg-white/10 hover:bg-white/15 px-2.5 py-1.5 transition-colors border border-white/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>NEW TAB</span>
            </a>

            <a
              href={currentDoc.downloadUrl}
              download={currentDoc.filename}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                triggerSingleDownload(currentDoc);
              }}
              title="Download this PDF document"
              className="inline-flex items-center gap-1 text-[11px] font-tech-mono font-bold text-[#0A1B36] bg-[#C5A253] hover:bg-white px-2.5 sm:px-3 py-1.5 transition-colors cursor-pointer no-underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">DOWNLOAD PDF</span>
            </a>

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

        {/* Secondary Document Switcher & Page Controls */}
        <div className="bg-[#f7f6f2] border-b border-[#0A1B36]/15 px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
          {/* Document Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {MEMORIAL_DOCUMENTS.map((doc) => {
              const isActive = doc.id === activeDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    setActiveDocId(doc.id as 'program' | 'obituary');
                    setActivePageIndex(0);
                    setZoomScale(1);
                  }}
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

          {/* View Modes & Zoom Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-white border border-[#0A1B36]/20 p-0.5">
              <button
                onClick={() => setViewMode('image')}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer ${
                  viewMode === 'image'
                    ? 'bg-[#0A1B36] text-white'
                    : 'text-[#0A1B36]/70 hover:text-[#0A1B36]'
                }`}
              >
                <ImageIcon className="w-3 h-3 text-[#C5A253]" />
                <span>Single Page</span>
              </button>
              <button
                onClick={() => setViewMode('all-pages')}
                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer ${
                  viewMode === 'all-pages'
                    ? 'bg-[#0A1B36] text-white'
                    : 'text-[#0A1B36]/70 hover:text-[#0A1B36]'
                }`}
              >
                <span>All Pages</span>
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
                <span>Text</span>
              </button>
            </div>

            {/* Zoom Controls */}
            {viewMode === 'image' && (
              <div className="hidden sm:flex items-center gap-1 bg-white border border-[#0A1B36]/20 p-0.5">
                <button
                  onClick={zoomOut}
                  title="Zoom Out"
                  className="p-1 text-[#0A1B36] hover:text-[#C5A253] cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={resetZoom}
                  title="Reset Zoom"
                  className="text-[10px] font-tech-mono font-bold px-1.5 text-[#0A1B36] hover:text-[#C5A253] cursor-pointer"
                >
                  {Math.round(zoomScale * 100)}%
                </button>
                <button
                  onClick={zoomIn}
                  title="Zoom In"
                  className="p-1 text-[#0A1B36] hover:text-[#C5A253] cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="grow overflow-auto relative bg-[#1c2430] p-4 sm:p-6 flex items-center justify-center">
          {viewMode === 'image' && (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Page Navigator Floating Bar */}
              {currentDoc.jpegPages.length > 1 && (
                <div className="absolute top-2 z-20 flex items-center gap-2 bg-[#0A1B36]/90 text-white px-3 py-1.5 border border-[#C5A253] shadow-lg">
                  <button
                    onClick={handlePrevPage}
                    className="p-1 hover:text-[#C5A253] cursor-pointer"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-tech-mono text-xs font-bold text-[#C5A253]">
                    Page {activePageIndex + 1} of {currentDoc.jpegPages.length}
                  </span>
                  <button
                    onClick={handleNextPage}
                    className="p-1 hover:text-[#C5A253] cursor-pointer"
                    title="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Native JPEG Image Element (Guaranteed Never Blocked) */}
              <div
                className="overflow-auto max-w-full max-h-full flex items-center justify-center p-2"
                style={{ cursor: zoomScale > 1 ? 'grab' : 'default' }}
              >
                <img
                  src={currentPage.url}
                  alt={`${currentDoc.title} - ${currentPage.title}`}
                  referrerPolicy="no-referrer"
                  style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center top' }}
                  className="max-h-[75vh] w-auto object-contain shadow-2xl transition-transform duration-150 border-2 border-white/10"
                />
              </div>

              <div className="mt-2 text-center text-white/70 font-tech-mono text-xs flex items-center gap-3">
                <span>{currentPage.title}</span>
                <span>•</span>
                <button
                  onClick={() => triggerSingleDownloadByUrl(currentPage.url, currentPage.filename)}
                  className="text-[#C5A253] hover:underline cursor-pointer font-bold"
                >
                  Save This Page (.jpeg)
                </button>
              </div>
            </div>
          )}

          {viewMode === 'all-pages' && (
            <div className="w-full max-w-3xl space-y-8 py-4">
              {currentDoc.jpegPages.map((p) => (
                <div key={p.pageNumber} className="bg-white/5 p-3 border border-white/15 shadow-2xl text-center">
                  <div className="text-left font-tech-mono text-xs text-[#C5A253] font-bold mb-2">
                    PAGE {p.pageNumber}: {p.title}
                  </div>
                  <img
                    src={p.url}
                    alt={`${currentDoc.title} - ${p.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[85vh] object-contain mx-auto shadow-lg"
                  />
                  <div className="mt-2 text-right">
                    <button
                      onClick={() => triggerSingleDownloadByUrl(p.url, p.filename)}
                      className="text-xs font-tech-mono text-[#C5A253] hover:underline cursor-pointer"
                    >
                      Download Page {p.pageNumber} (.jpeg)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'reader' && (
            /* Interactive Formatted Reader View */
            <div className="w-full h-full overflow-y-auto p-4 sm:p-8 md:p-12 bg-[#faf9f5] text-[#0A1B36]">
              <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 shadow-lg border border-[#0A1B36]/15">
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
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="bg-[#f0eee6] px-4 py-2 sm:px-6 border-t border-[#0A1B36]/20 flex items-center justify-between text-[11px] font-tech-mono text-[#0A1B36]/80 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Native JPEG Image Embed • 100% Browser Compatible</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={currentDoc.downloadUrl}
              download={currentDoc.filename}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                triggerSingleDownload(currentDoc);
              }}
              className="font-bold text-[#0A1B36] hover:text-[#C5A253] underline cursor-pointer"
            >
              Download PDF ({currentDoc.size})
            </a>
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
