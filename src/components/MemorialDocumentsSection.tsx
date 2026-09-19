import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Maximize2,
  Sparkles,
  Layers,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import {
  MEMORIAL_DOCUMENTS,
  MemorialDocument,
  COMBINED_MEMORIAL_DOCUMENT,
  downloadBothDocuments,
  triggerSingleDownload,
  triggerSingleDownloadByUrl,
} from '../utils/downloadDocuments';
import { DOCUMENT_TRANSCRIPTS } from '../data/documentTranscripts';
import { FadeInView } from './FadeInView';

interface MemorialDocumentsSectionProps {
  onOpenViewerModal?: (docId: 'program' | 'obituary') => void;
}

interface SingleDocumentViewerCardProps {
  doc: MemorialDocument;
  documentNumber: number;
  label: string;
  onOpenModal?: (docId: 'program' | 'obituary') => void;
}

export const SingleDocumentViewerCard: React.FC<SingleDocumentViewerCardProps> = ({
  doc,
  documentNumber,
  label,
  onOpenModal,
}) => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'image' | 'reader' | 'all-pages'>('image');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const transcript = DOCUMENT_TRANSCRIPTS[doc.id as 'program' | 'obituary'];
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

          <button
            onClick={() => setViewMode('reader')}
            className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 ${
              viewMode === 'reader'
                ? 'bg-[#0A1B36] text-white'
                : 'text-[#0A1B36]/70 hover:text-[#0A1B36] hover:bg-[#0A1B36]/5'
            }`}
          >
            <BookOpen className="w-3 h-3 text-[#C5A253]" />
            <span className="hidden sm:inline">Text</span>
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
            <span>PDF</span>
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

            <div className="mt-2 text-center text-white/70 font-tech-mono text-[11px] flex items-center gap-2">
              <span>{currentPage.title}</span>
              <span>•</span>
              <button
                onClick={() => triggerSingleDownloadByUrl(currentPage.url, currentPage.filename)}
                className="text-[#C5A253] hover:underline cursor-pointer font-bold"
              >
                Save Page Image (.jpeg)
              </button>
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
                <div className="mt-2 text-right px-1">
                  <button
                    onClick={() => triggerSingleDownloadByUrl(p.url, p.filename)}
                    className="text-[11px] font-tech-mono text-[#C5A253] hover:underline cursor-pointer"
                  >
                    Download Page {p.pageNumber} (.jpeg)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'reader' && (
          /* Reader Transcript Accessible Fallback View */
          <div className="w-full h-full overflow-y-auto p-4 sm:p-6 bg-[#FAF9F5] text-[#0A1B36]">
            <div className="bg-white p-5 sm:p-8 border border-[#0A1B36]/15 shadow-sm max-w-2xl mx-auto">
              <div className="text-center pb-4 mb-6 border-b-2 border-[#C5A253]">
                <span className="font-tech-mono text-[10px] uppercase tracking-widest text-[#C5A253] font-bold block mb-1">
                  {transcript.meta}
                </span>
                <h4 className="font-display-title text-xl sm:text-2xl font-black text-[#0A1B36] uppercase tracking-wide">
                  {transcript.title}
                </h4>
                <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/80 italic mt-1">
                  {transcript.subtitle}
                </p>
                {transcript.dateAndLocation && (
                  <div className="mt-2 inline-block bg-[#0A1B36]/5 px-2.5 py-0.5 font-tech-mono text-[11px] text-[#0A1B36] font-bold">
                    {transcript.dateAndLocation}
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {transcript.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2.5">
                    {sec.quarter && (
                      <div className="bg-[#0A1B36] text-white p-2.5 border-l-4 border-[#C5A253]">
                        <span className="font-display-title text-xs sm:text-sm font-black tracking-wider uppercase">
                          {sec.quarter}
                        </span>
                      </div>
                    )}

                    {sec.title && !sec.quarter && (
                      <h5 className="font-display-title text-sm sm:text-base font-bold text-[#0A1B36] uppercase tracking-wider pb-1 border-b border-[#0A1B36]/20">
                        {sec.title}
                      </h5>
                    )}

                    {sec.quote && (
                      <blockquote className="bg-[#0A1B36]/5 border-l-4 border-[#C5A253] p-3 my-3">
                        <p className="font-body-text text-sm italic text-[#0A1B36] leading-relaxed">
                          {sec.quote.text}
                        </p>
                        <footer className="font-tech-mono text-[11px] text-[#C5A253] font-bold mt-1">
                          {sec.quote.author}
                        </footer>
                      </blockquote>
                    )}

                    {sec.items && (
                      <div className="space-y-1.5">
                        {sec.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="p-2 bg-[#faf9f5] border border-[#0A1B36]/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5"
                          >
                            <span className="font-display-title text-xs font-bold text-[#0A1B36]">
                              {item.role}
                            </span>
                            <div className="text-left sm:text-right">
                              <span className="font-body-text text-xs font-bold text-[#C5A253]">
                                {item.name}
                              </span>
                              {item.detail && (
                                <span className="block text-[10px] text-[#0A1B36]/70">
                                  {item.detail}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {sec.paragraphs && (
                      <div className="space-y-2 font-body-text text-xs sm:text-sm leading-relaxed text-[#0A1B36]/90">
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

      {/* Card Footer Bar */}
      <div className="bg-[#FAF9F5] p-3 border-t border-[#0A1B36]/15 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 text-xs font-tech-mono text-[#0A1B36]/80 truncate">
          <span className="font-bold text-[#0A1B36]">{doc.title}</span>
          <span>•</span>
          <span>{doc.pages}</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={currentPage.url}
            download={currentPage.filename}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              triggerSingleDownloadByUrl(currentPage.url, currentPage.filename);
            }}
            className="text-[11px] font-tech-mono font-bold text-[#0A1B36] hover:text-[#C5A253] underline cursor-pointer"
          >
            Save JPEG
          </a>
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
            Download Full PDF
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
              onClick={(e) => {
                e.stopPropagation();
                triggerSingleDownloadByUrl(lightboxImage, 'William_Buck_Godfrey_Archive.jpeg');
              }}
              className="bg-[#C5A253] hover:bg-white text-[#0A1B36] font-tech-mono text-xs font-bold px-3 py-1.5 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD HIGH-RES</span>
            </button>
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

export const MemorialDocumentsSection: React.FC<MemorialDocumentsSectionProps> = ({
  onOpenViewerModal,
}) => {
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

        {/* Primary Unified Link Connected to Both Documents */}
        <FadeInView delay={0.05}>
          <div className="bg-[#0A1B36] border-2 border-[#C5A253] shadow-2xl p-5 sm:p-7 mb-10 relative overflow-hidden">
            {/* Background graphic */}
            <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
              <Download className="w-48 h-48 text-[#C5A253]" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A253] animate-ping"></span>
                  <span className="font-tech-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#C5A253] font-bold">
                    CONNECTED COMMEMORATIVE DOWNLOAD
                  </span>
                </div>
                <h3 className="font-display-title text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
                  Download Both Memorial Documents
                </h3>
                <p className="font-body-text text-xs sm:text-sm text-white/80 leading-relaxed">
                  One click delivers both official memorial documents: the <strong>Celebration Program (Order of Service)</strong> and Coach Godfrey’s complete <strong>Obituary & Life Story</strong>.
                </p>
              </div>

              {/* Primary Connected Download Action */}
              <div className="shrink-0 flex flex-col items-center md:items-end gap-2">
                <a
                  href="/documents/William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf"
                  id="section-download-both-documents-link"
                  download="William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    downloadBothDocuments();
                  }}
                  aria-label="Download Program and Obituary (both in 1 complete PDF)"
                  className="group flex items-center gap-2.5 bg-[#C5A253] hover:bg-white text-[#0A1B36] font-display-title text-sm sm:text-base font-black px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-[#C5A253] hover:border-white shadow-2xl transition-all duration-200 cursor-pointer uppercase tracking-wider active:scale-95 no-underline"
                >
                  <Download className="w-5 h-5 text-[#0A1B36] group-hover:scale-110 transition-transform" />
                  <span>Download Program and Obituary</span>
                </a>
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-[11px] font-tech-mono text-[#C5A253]">
                  <a
                    href="/documents/William_Buck_Godfrey_Celebration_Order_of_Service.pdf"
                    download="William_Buck_Godfrey_Celebration_Order_of_Service.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    Program PDF
                  </a>
                  <span>•</span>
                  <a
                    href="/documents/William_Buck_Godfrey_Obituary_and_Life_Story.pdf"
                    download="William_Buck_Godfrey_Obituary_and_Life_Story.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    Obituary PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Visual connector lines leading to both documents below */}
            <div className="hidden lg:flex items-center justify-between mt-6 pt-4 border-t border-white/15 text-[11px] font-tech-mono text-[#C5A253]">
              <div className="flex items-center gap-2">
                <ArrowDown className="w-3.5 h-3.5 text-[#C5A253] animate-bounce" />
                <span>DOCUMENT 1: CELEBRATION PROGRAM (BELOW LEFT)</span>
              </div>
              <span className="text-white/40">• VIEW OR DOWNLOAD EACH DOCUMENT BELOW •</span>
              <div className="flex items-center gap-2">
                <span>DOCUMENT 2: OBITUARY & LIFE STORY (BELOW RIGHT)</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#C5A253] animate-bounce" />
              </div>
            </div>
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
              onOpenModal={onOpenViewerModal}
            />
          </FadeInView>

          {/* Document 2: Obituary & Life Story Embed */}
          <FadeInView delay={0.15}>
            <SingleDocumentViewerCard
              doc={obituaryDoc}
              documentNumber={2}
              label="OBITUARY & LIFE STORY"
              onOpenModal={onOpenViewerModal}
            />
          </FadeInView>
        </div>

        {/* Bottom Connected Summary Banner */}
        <FadeInView delay={0.2}>
          <div className="mt-10 bg-white border-2 border-[#0A1B36] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#C5A253] shrink-0" />
              <div className="text-center sm:text-left">
                <h4 className="font-display-title text-sm sm:text-base font-bold text-[#0A1B36] uppercase">
                  Connected to Both Archives
                </h4>
                <p className="font-body-text text-xs text-[#0A1B36]/80">
                  View each document below or download both memorial documents together.
                </p>
              </div>
            </div>

            <a
              href="/documents/William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf"
              download="William_Buck_Godfrey_Memorial_Program_and_Obituary.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                downloadBothDocuments();
              }}
              className="flex items-center gap-2 bg-[#0A1B36] hover:bg-[#C5A253] text-white hover:text-[#0A1B36] px-5 py-2.5 font-display-title text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 no-underline"
            >
              <Download className="w-4 h-4 text-[#C5A253] group-hover:text-[#0A1B36]" />
              <span>Download Program and Obituary</span>
            </a>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
