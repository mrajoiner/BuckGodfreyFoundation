import React, { useState } from 'react';
import {
  Download,
  ExternalLink,
  Layers,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';
import {
  MEMORIAL_DOCUMENTS,
  MemorialDocument,
  triggerSingleDownload,
} from '../utils/downloadDocuments';
import { FadeInView } from './FadeInView';

interface MemorialDocumentsSectionProps {
  onOpenViewerModal?: (docId: 'program' | 'obituary') => void;
}

interface SingleDocumentViewerCardProps {
  doc: MemorialDocument;
  documentNumber: number;
  label: string;
}

export const SingleDocumentViewerCard: React.FC<SingleDocumentViewerCardProps> = ({
  doc,
  documentNumber,
  label,
}) => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'image' | 'all-pages'>('image');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentPage = doc.jpegPages[activePageIndex] || doc.jpegPages[0];

  const handlePrevPage = () => {
    setActivePageIndex((prev) => (prev > 0 ? prev - 1 : doc.jpegPages.length - 1));
  };

  const handleNextPage = () => {
    setActivePageIndex((prev) => (prev < doc.jpegPages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      id={`document-card-${doc.id}`}
      className="bg-white border-2 border-[#0A1B36] shadow-xl flex flex-col h-full overflow-hidden transition-all duration-200 hover:border-[#C5A253]"
    >
      {/* Card Header Bar */}
      <div className="bg-[#0A1B36] text-white p-3.5 sm:p-4 border-b-2 border-[#C5A253] flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-[#C5A253] text-[#0A1B36] font-display-title font-black text-xs px-2 py-0.5 uppercase tracking-wider shrink-0">
              DOCUMENT {documentNumber}
            </span>
            <span className="font-tech-mono text-[10px] sm:text-xs text-[#C5A253] tracking-wider uppercase truncate">
              {label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick External Tab Link */}
            <a
              href={currentPage.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full-resolution image in new tab"
              className="text-white/70 hover:text-[#C5A253] p-1 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h3 className="font-display-title text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-wide truncate">
            {doc.title}
          </h3>
          <span className="font-tech-mono text-xs text-white/70 shrink-0">
            {doc.pages}
          </span>
        </div>
      </div>

      {/* Page Navigation & Display Controls Bar */}
      <div className="bg-[#FAF9F5] px-3 py-2 sm:px-4 border-b border-[#0A1B36]/15 flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Page Switcher Tabs */}
        <div className="flex items-center gap-1 bg-white border border-[#0A1B36]/20 p-0.5">
          {doc.jpegPages.map((p, idx) => (
            <button
              key={p.pageNumber}
              onClick={() => {
                setActivePageIndex(idx);
                setViewMode('image');
              }}
              className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer ${
                viewMode === 'image' && activePageIndex === idx
                  ? 'bg-[#0A1B36] text-white'
                  : 'text-[#0A1B36]/70 hover:text-[#0A1B36] hover:bg-[#0A1B36]/5'
              }`}
            >
              Page {p.pageNumber}
            </button>
          ))}

          <button
            onClick={() => setViewMode('all-pages')}
            className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer ${
              viewMode === 'all-pages'
                ? 'bg-[#0A1B36] text-white'
                : 'text-[#0A1B36]/70 hover:text-[#0A1B36] hover:bg-[#0A1B36]/5'
            }`}
          >
            All Pages
          </button>

        </div>

        {/* View / Download Actions */}
        <div className="flex items-center gap-2">
          {viewMode === 'image' && doc.jpegPages.length > 1 && (
            <div className="flex items-center gap-1 mr-1">
              <button
                onClick={handlePrevPage}
                title="Previous page"
                className="p-1 text-[#0A1B36]/80 hover:text-[#C5A253] border border-[#0A1B36]/20 bg-white hover:bg-[#0A1B36]/5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-tech-mono font-bold px-1 text-[#0A1B36]">
                {activePageIndex + 1}/{doc.jpegPages.length}
              </span>
              <button
                onClick={handleNextPage}
                title="Next page"
                className="p-1 text-[#0A1B36]/80 hover:text-[#C5A253] border border-[#0A1B36]/20 bg-white hover:bg-[#0A1B36]/5 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={() => setLightboxImage(currentPage.url)}
            title="Enlarge page to fullscreen zoom"
            className="hidden xs:inline-flex items-center gap-1 text-[#0A1B36]/80 hover:text-[#C5A253] bg-white border border-[#0A1B36]/20 px-2 py-1 text-[11px] font-tech-mono font-bold transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#C5A253]" />
            <span>ZOOM</span>
          </button>

          {/* Individual PDF download */}
          <a
            href={doc.downloadUrl}
            download={doc.filename}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              triggerSingleDownload(doc);
            }}
            title={`Download ${doc.title} PDF`}
            className="inline-flex items-center gap-1 bg-[#0A1B36] hover:bg-[#C5A253] text-white hover:text-[#0A1B36] text-[11px] font-tech-mono font-bold px-2.5 py-1 transition-colors cursor-pointer no-underline"
          >
            <Download className="w-3 h-3 text-[#C5A253]" />
            <span>{doc.id === 'program' ? 'Download Program' : 'Download Obituary'}</span>
          </a>
        </div>
      </div>

      {/* Embedded Document View Area (Guaranteed Native Image Rendering) */}
      <div className="relative grow bg-[#1a2332] p-2 sm:p-4 overflow-y-auto max-h-[720px] min-h-[560px] flex items-center justify-center">
        {viewMode === 'image' && (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Embedded High-Resolution JPEG */}
            <div
              className="relative group cursor-zoom-in max-w-full overflow-hidden shadow-2xl border border-white/10"
              onClick={() => setLightboxImage(currentPage.url)}
              title="Click to zoom in full resolution"
            >
              <img
                src={currentPage.url}
                alt={`${doc.title} - ${currentPage.title}`}
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[660px] object-contain mx-auto transition-transform duration-200 group-hover:scale-[1.01]"
              />

              {/* Hover overlay hint */}
              <div className="absolute bottom-3 right-3 bg-[#0A1B36]/90 text-white text-[10px] font-tech-mono font-bold px-2.5 py-1 border border-[#C5A253] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-lg pointer-events-none">
                <ZoomIn className="w-3 h-3 text-[#C5A253]" />
                <span>CLICK TO ENLARGE</span>
              </div>
            </div>

            <div className="mt-2 text-center text-white/70 font-tech-mono text-[11px]">
              <span>{currentPage.title}</span>
            </div>
          </div>
        )}

        {viewMode === 'all-pages' && (
          <div className="w-full space-y-6 py-2">
            {doc.jpegPages.map((p) => (
              <div
                key={p.pageNumber}
                className="bg-white/5 p-2 border border-white/10 shadow-lg text-center"
              >
                <div className="mb-2 text-left font-tech-mono text-[11px] text-[#C5A253] font-bold px-1">
                  PAGE {p.pageNumber}: {p.title}
                </div>
                <img
                  src={p.url}
                  alt={`${doc.title} - ${p.title}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[750px] object-contain mx-auto shadow-md cursor-zoom-in"
                  onClick={() => setLightboxImage(p.url)}
                  title="Click to enlarge"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Bar */}
      <div className="bg-[#FAF9F5] p-3 border-t border-[#0A1B36]/15 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-xs font-tech-mono text-[#0A1B36]/80 truncate">
          <span className="font-bold text-[#0A1B36]">{doc.title}</span>
          <span>•</span>
          <span>{doc.pages}</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={doc.downloadUrl}
            download={doc.filename}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              triggerSingleDownload(doc);
            }}
            className="font-display-title text-xs font-bold uppercase text-[#0A1B36] hover:text-[#C5A253] underline cursor-pointer"
          >
            {doc.id === 'program' ? 'Download Program' : 'Download Obituary'}
          </a>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-label="Image Zoom Lightbox"
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-2 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setLightboxImage(null)}
              className="bg-white/20 hover:bg-white text-white hover:text-black p-1.5 text-xs font-tech-mono font-bold transition-colors cursor-pointer"
            >
              CLOSE ✕
            </button>
          </div>

          <div
            className="max-w-5xl max-h-[92vh] overflow-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="High resolution document zoom"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl border-2 border-[#C5A253]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const MemorialDocumentsSection: React.FC<MemorialDocumentsSectionProps> = () => {
  const programDoc = MEMORIAL_DOCUMENTS.find((d) => d.id === 'program') || MEMORIAL_DOCUMENTS[1];
  const obituaryDoc = MEMORIAL_DOCUMENTS.find((d) => d.id === 'obituary') || MEMORIAL_DOCUMENTS[0];

  return (
    <section
      id="documents"
      className="py-16 sm:py-24 bg-[#FAF9F5] border-t-2 border-b-2 border-[#0A1B36]/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInView>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0A1B36] text-white px-3 py-1 font-tech-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold mb-4">
              <Layers className="w-3.5 h-3.5 text-[#C5A253]" />
              <span>OFFICIAL COMMEMORATIVE ARCHIVES</span>
            </div>
            <h2 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1B36] tracking-tight uppercase leading-none">
              Program & Obituary
            </h2>
            <div className="w-20 h-1 bg-[#C5A253] mx-auto my-4"></div>
            <p className="font-body-text text-base sm:text-lg text-[#0A1B36]/80 leading-relaxed">
              View and download the official memorial program and obituary honoring the life and legacy of Coach William “Buck” Godfrey.
            </p>
          </div>
        </FadeInView>

        {/* Individual Side-by-Side Embeds: Visible Immediately Without Clicking Anything */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Document 1: Celebration Program Embed */}
          <FadeInView delay={0.1}>
            <SingleDocumentViewerCard
              doc={programDoc}
              documentNumber={1}
              label="CELEBRATION ORDER OF SERVICE"
            />
          </FadeInView>

          {/* Document 2: Obituary & Life Story Embed */}
          <FadeInView delay={0.15}>
            <SingleDocumentViewerCard
              doc={obituaryDoc}
              documentNumber={2}
              label="OBITUARY & LIFE STORY"
            />
          </FadeInView>
        </div>

      </div>
    </section>
  );
};
