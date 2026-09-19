import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Maximize2,
  Sparkles,
  Award,
  Calendar,
  Layers,
} from 'lucide-react';
import { MEMORIAL_DOCUMENTS, downloadBothDocuments, triggerSingleDownload } from '../utils/downloadDocuments';
import { DOCUMENT_TRANSCRIPTS } from '../data/documentTranscripts';
import { FadeInView } from './FadeInView';

interface MemorialDocumentsSectionProps {
  onOpenViewerModal?: (docId: 'program' | 'obituary') => void;
}

export const MemorialDocumentsSection: React.FC<MemorialDocumentsSectionProps> = ({
  onOpenViewerModal,
}) => {
  const [activeTab, setActiveTab] = useState<'program' | 'obituary'>('program');
  const [viewMode, setViewMode] = useState<'pdf' | 'reader'>('pdf');

  const activeDoc = MEMORIAL_DOCUMENTS.find((d) => d.id === activeTab) || MEMORIAL_DOCUMENTS[0];
  const activeTranscript = DOCUMENT_TRANSCRIPTS[activeTab];

  return (
    <section
      id="documents"
      className="py-16 sm:py-24 bg-[#FAF9F5] border-t-2 border-b-2 border-[#0A1B36]/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInView>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0A1B36] text-white px-3 py-1 font-tech-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold mb-4">
              <Layers className="w-3.5 h-3.5 text-[#C5A253]" />
              <span>OFFICIAL COMMEMORATIVE ARCHIVES</span>
            </div>
            <h2 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1B36] tracking-tight uppercase leading-none">
              Program & Obituary
            </h2>
            <div className="w-20 h-1 bg-[#C5A253] mx-auto my-4"></div>
            <p className="font-body-text text-base sm:text-lg text-[#0A1B36]/80 leading-relaxed">
              Read the complete 4-Quarter Celebration Order of Service and Coach Godfrey’s official biography written by Gavin Godfrey. View them inline below or save them to your device.
            </p>
          </div>
        </FadeInView>

        {/* Embedded Document Console */}
        <FadeInView delay={0.1}>
          <div
            id="inline-document-viewer-container"
            className="bg-white border-2 border-[#0A1B36] shadow-2xl overflow-hidden"
          >
            {/* Top Document Switcher Bar */}
            <div className="bg-[#0A1B36] text-white p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#C5A253]">
              {/* Document Selector Tabs */}
              <div className="flex items-center gap-2">
                {MEMORIAL_DOCUMENTS.map((doc) => {
                  const isActive = doc.id === activeTab;
                  return (
                    <button
                      key={doc.id}
                      id={`tab-btn-${doc.id}`}
                      onClick={() => setActiveTab(doc.id as 'program' | 'obituary')}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-display-title font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                        isActive
                          ? 'bg-[#C5A253] text-[#0A1B36] border-white shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/20 border-transparent'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{doc.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                {/* View Mode Switcher */}
                <div className="flex items-center bg-white/10 p-0.5 border border-white/20">
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`px-2.5 py-1 text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer ${
                      viewMode === 'pdf'
                        ? 'bg-[#C5A253] text-[#0A1B36]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    PDF View
                  </button>
                  <button
                    onClick={() => setViewMode('reader')}
                    className={`px-2.5 py-1 text-[11px] font-tech-mono font-bold uppercase transition-colors cursor-pointer ${
                      viewMode === 'reader'
                        ? 'bg-[#C5A253] text-[#0A1B36]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Reader View
                  </button>
                </div>

                {/* Open in Modal / Fullscreen */}
                <button
                  onClick={() => onOpenViewerModal?.(activeTab)}
                  title="Expand to full screen viewer"
                  className="hidden sm:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs font-tech-mono font-bold px-3 py-1.5 border border-white/20 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#C5A253]" />
                  <span>EXPAND</span>
                </button>

                {/* Direct Download Active */}
                <button
                  onClick={() => triggerSingleDownload(activeDoc)}
                  title={`Download ${activeDoc.title} PDF`}
                  className="inline-flex items-center gap-1.5 bg-[#C5A253] hover:bg-white text-[#0A1B36] text-xs font-tech-mono font-bold px-3 py-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">SAVE THIS PDF</span>
                </button>
              </div>
            </div>

            {/* Document Info Sub-strip */}
            <div className="bg-[#FAF9F5] px-4 py-2.5 sm:px-6 border-b border-[#0A1B36]/15 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-[#0A1B36]/80 font-tech-mono">
                <span className="font-bold text-[#0A1B36] uppercase">{activeDoc.title}</span>
                <span>•</span>
                <span>{activeDoc.pages}</span>
                <span>•</span>
                <span>{activeDoc.size}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeDoc.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tech-mono text-xs text-[#0A1B36] hover:text-[#C5A253] inline-flex items-center gap-1 font-bold underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open in separate tab</span>
                </a>
              </div>
            </div>

            {/* Embedded Container Frame */}
            <div className="w-full h-[600px] sm:h-[750px] md:h-[820px] bg-[#3a3a3a] relative overflow-hidden">
              {viewMode === 'pdf' ? (
                <div className="w-full h-full relative">
                  <object
                    data={`${activeDoc.viewUrl}#toolbar=1&navpanes=0`}
                    type="application/pdf"
                    className="w-full h-full border-0"
                    aria-label={`Inline PDF embed of ${activeDoc.title}`}
                  >
                    <iframe
                      src={`${activeDoc.viewUrl}#toolbar=1&navpanes=0`}
                      className="w-full h-full border-0"
                      title={activeDoc.title}
                    >
                      <div className="p-10 text-center text-white bg-[#0A1B36] flex flex-col items-center justify-center h-full">
                        <p className="mb-4 font-body-text text-lg">
                          Viewing this document requires a PDF-compatible browser.
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setViewMode('reader')}
                            className="bg-[#C5A253] text-[#0A1B36] font-bold px-4 py-2 uppercase text-xs"
                          >
                            Switch to Reader View
                          </button>
                          <a
                            href={activeDoc.downloadUrl}
                            className="bg-white text-[#0A1B36] font-bold px-4 py-2 uppercase text-xs"
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </iframe>
                  </object>
                </div>
              ) : (
                /* Reader Transcript View */
                <div className="w-full h-full overflow-y-auto p-4 sm:p-8 md:p-12 bg-[#faf9f5] text-[#0A1B36]">
                  <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 shadow-md border border-[#0A1B36]/15">
                    <div className="text-center pb-6 mb-8 border-b-2 border-[#C5A253]">
                      <span className="font-tech-mono text-xs uppercase tracking-widest text-[#C5A253] font-bold block mb-1">
                        {activeTranscript.meta}
                      </span>
                      <h3 className="font-display-title text-2xl sm:text-3xl md:text-4xl font-black text-[#0A1B36] uppercase tracking-wide">
                        {activeTranscript.title}
                      </h3>
                      <p className="font-body-text text-sm sm:text-base text-[#0A1B36]/80 italic mt-2">
                        {activeTranscript.subtitle}
                      </p>
                      {activeTranscript.dateAndLocation && (
                        <div className="mt-3 inline-block bg-[#0A1B36]/5 px-3 py-1 font-tech-mono text-xs text-[#0A1B36] font-bold">
                          {activeTranscript.dateAndLocation}
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      {activeTranscript.sections.map((sec, idx) => (
                        <div key={idx} className="space-y-3">
                          {sec.quarter && (
                            <div className="bg-[#0A1B36] text-white p-3 border-l-4 border-[#C5A253]">
                              <span className="font-display-title text-sm sm:text-base font-black tracking-wider uppercase">
                                {sec.quarter}
                              </span>
                            </div>
                          )}

                          {sec.title && !sec.quarter && (
                            <h4 className="font-display-title text-base sm:text-lg font-bold text-[#0A1B36] uppercase tracking-wider pb-1 border-b border-[#0A1B36]/20">
                              {sec.title}
                            </h4>
                          )}

                          {sec.quote && (
                            <blockquote className="bg-[#0A1B36]/5 border-l-4 border-[#C5A253] p-4 my-4">
                              <p className="font-body-text text-base italic text-[#0A1B36] leading-relaxed">
                                {sec.quote.text}
                              </p>
                              <footer className="font-tech-mono text-xs text-[#C5A253] font-bold mt-2">
                                {sec.quote.author}
                              </footer>
                            </blockquote>
                          )}

                          {sec.items && (
                            <div className="space-y-2">
                              {sec.items.map((item, itemIdx) => (
                                <div
                                  key={itemIdx}
                                  className="p-2.5 bg-[#faf9f5] border border-[#0A1B36]/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                                >
                                  <span className="font-display-title text-xs sm:text-sm font-bold text-[#0A1B36]">
                                    {item.role}
                                  </span>
                                  <div className="text-left sm:text-right">
                                    <span className="font-body-text text-xs sm:text-sm font-bold text-[#C5A253]">
                                      {item.name}
                                    </span>
                                    {item.detail && (
                                      <span className="block text-[11px] text-[#0A1B36]/70">
                                        {item.detail}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {sec.paragraphs && (
                            <div className="space-y-3 font-body-text text-sm sm:text-base leading-relaxed text-[#0A1B36]/90">
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

            {/* Bottom Callout Bar */}
            <div className="bg-[#0A1B36] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#C5A253] shrink-0" />
                <p className="font-body-text text-xs sm:text-sm text-white/90 text-center sm:text-left">
                  Preserve these historic documents for your personal archives and family.
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={() => downloadBothDocuments()}
                  className="flex items-center gap-2 bg-[#C5A253] hover:bg-white text-[#0A1B36] px-4 py-2.5 font-display-title text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#0A1B36]" />
                  <span>Download Program and Obituary</span>
                </button>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
