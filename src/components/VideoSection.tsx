import React from 'react';
import { Play } from 'lucide-react';
import { FadeInView } from './FadeInView';

export const VideoSection: React.FC = () => {
  return (
    <section
      id="tribute-video"
      className="py-12 sm:py-16 md:py-20 bg-[#ffffff] border-t border-[#0A1B36]/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-14 lg:px-20">
        <FadeInView direction="up" delay={0.1}>
          <div className="w-full">
            {/* Subtle Eyebrow & Title */}
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#0A1B36] text-white px-3 py-1 font-tech-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold mb-2">
                  <Play className="w-3 h-3 text-[#C5A253] fill-[#C5A253]" />
                  <span>MEMORIAL TRIBUTE VIDEO</span>
                </div>
                <h2 className="font-display-title text-xl sm:text-2xl md:text-3xl font-black text-[#0A1B36] uppercase tracking-wide">
                  Celebrating Coach William "Buck" Godfrey
                </h2>
              </div>
              <span className="font-tech-mono text-xs sm:text-sm text-[#0A1B36]/60 tracking-wider uppercase">
                Click Play to Watch
              </span>
            </div>

            {/* Video Frame Spanning Full Site Width */}
            <div className="w-full relative bg-[#0A1B36] border-2 border-[#0A1B36] shadow-2xl overflow-hidden aspect-video">
              <iframe
                src="https://www.youtube.com/embed/0X2QSGyqRcY?rel=0&modestbranding=1"
                title="William Godfrey Memorial Tribute Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0 absolute inset-0"
              />
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
