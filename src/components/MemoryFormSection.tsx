import React, { useEffect, useRef, useState } from 'react';
import { MessageSquareHeart, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { FadeInView } from './FadeInView';

export const MemoryFormSection: React.FC = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // JotForm auto-resize listener for seamless iframe integration
  useEffect(() => {
    const handleJotformMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string') return;
      
      const args = e.data.split(':');
      if (args.length > 0 && args[0] === 'setHeight' && iframeRef.current) {
        const height = parseInt(args[1], 10);
        if (!isNaN(height) && height > 200) {
          iframeRef.current.style.height = `${height + 20}px`;
        }
      }
    };

    window.addEventListener('message', handleJotformMessage);
    return () => {
      window.removeEventListener('message', handleJotformMessage);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="memories"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden bg-[#ffffff] border-t border-[#0A1B36]/10"
    >
      <div className="relative z-10 max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#ffffff] px-4 py-1.5 border border-[#C5A253]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A253]" />
              <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold">
                COMMUNITY TRIBUTES &amp; REFLECTIONS
              </span>
            </div>

            <h2 className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36]">
              Share Your Memories with Coach Godfrey
            </h2>

            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 leading-relaxed font-medium pt-2">
              Whether you were one of his championship student-athletes at Southwest DeKalb, a student in his classroom, a fellow educator, an athletic peer, or a friend blessed by his wisdom — we invite you to share your memories, reflections, and photographs below to honor his life and enduring impact.
            </p>
          </div>
        </FadeInView>

        {/* Embedded JotForm Container */}
        <FadeInView direction="up" delay={0.2}>
          <div className="bg-[#ffffff] border-2 border-[#0A1B36] shadow-2xl p-4 sm:p-8 md:p-10 relative">
            {/* Top Frame Accents */}
            <div className="flex items-center justify-between border-b border-[#0A1B36]/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-[#C5A253]" />
                <span className="font-tech-mono text-xs font-bold uppercase tracking-wider text-[#0A1B36]">
                  Official Memorial Tribute Book
                </span>
              </div>
              
              <a
                href="https://form.jotform.com/262364039457159"
                target="_blank"
                rel="noopener noreferrer"
                className="font-tech-mono text-[11px] font-bold text-[#C5A253] hover:text-[#0A1B36] transition-colors inline-flex items-center gap-1 uppercase"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Loading Indicator */}
            {!iframeLoaded && (
              <div className="w-full flex flex-col items-center justify-center py-16 space-y-3 bg-[#ffffff]">
                <RefreshCw className="w-7 h-7 text-[#C5A253] animate-spin" />
                <span className="font-tech-mono text-xs text-[#0A1B36]/70 uppercase tracking-wider">
                  Loading Memory Submission Form...
                </span>
              </div>
            )}

            {/* JotForm Embed Frame */}
            <div className="w-full overflow-hidden bg-[#ffffff] min-h-[600px]">
              <iframe
                id="JotFormIFrame-262364039457159"
                ref={iframeRef}
                title="Share Your Memories with Coach Godfrey"
                src="https://form.jotform.com/262364039457159"
                onLoad={() => setIframeLoaded(true)}
                allow="geolocation; microphone; camera; fullscreen"
                style={{
                  width: '100%',
                  minWidth: '100%',
                  minHeight: '680px',
                  border: 'none',
                  display: iframeLoaded ? 'block' : 'block',
                }}
                className="w-full bg-[#ffffff] transition-opacity duration-300"
              />
            </div>

            {/* Form Footer Note */}
            <div className="mt-6 pt-4 border-t border-[#0A1B36]/10 flex flex-col sm:flex-row items-center justify-between text-xs font-tech-mono text-[#0A1B36]/70 gap-2">
              <span>Submitted tributes will be preserved with the Godfrey Family Archive.</span>
              <span className="text-[#C5A253] font-bold">WILLIAM BUCK GODFREY LEGACY</span>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
