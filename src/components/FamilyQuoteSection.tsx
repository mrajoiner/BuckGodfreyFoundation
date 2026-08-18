import React from 'react';
import { Quote } from 'lucide-react';

export const FamilyQuoteSection: React.FC = () => {
  return (
    <section
      id="family-quote"
      className="py-24 sm:py-32 md:py-36 bg-[#FAFAFA] border-t border-[#1B365D]/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Family Message */}
        <div className="md:col-span-7 md:col-start-1 order-2 md:order-1">
          <div className="border-l-2 border-[#C5A253] pl-8 sm:pl-12 py-2">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block mb-4">
              A MESSAGE FROM THE FAMILY
            </span>

            <Quote className="w-8 h-8 text-[#C5A253] mb-6 opacity-80" />

            <blockquote
              id="family-quote-text"
              className="font-display-title text-2xl sm:text-4xl md:text-[40px] leading-[1.05] text-[#1B365D] mb-8 font-black uppercase tracking-[-0.03em]"
            >
              "This scholarship is more than financial support. It is a continuation of Coach Godfrey's life's work. Every contribution helps ensure that future generations have the opportunity to learn, lead, and leave their own lasting legacy."
            </blockquote>

            <p
              id="family-quote-attribution"
              className="font-tech-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[#C5A253] uppercase"
            >
              — THE GODFREY FAMILY
            </p>
          </div>
        </div>

        {/* Right Photo Frame */}
        <div className="md:col-span-5 md:col-start-8 order-1 md:order-2 flex justify-center md:justify-end">
          <div
            id="family-photo-card"
            className="relative w-full max-w-md aspect-square border border-[#1B365D]/15 p-3 bg-white shadow-xl group"
          >
            <div className="relative w-full h-full overflow-hidden bg-slate-200">
              <img
                id="family-celebration-img"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                alt="Warm candid photo of Coach Godfrey smiling with family and friends in a gymnasium, celebrating, vintage feel."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbHVJNPuOGjDB181AZS259WfjjeG_zdZ9voH0hk_gnsaOus59bgdilFuPyp0Zfzq0f5avk2cwrsT0_J5Tzz23Vm_VCsu-8fk_bD51QDiMujzjxd_koHXDN2j6XoBJ3fH4RtmsOXjGggHMM2OhPuKHEbPFpJsSREyhAp2j2GO0gZWgF7DkU2wql2V_hgaZSnOfnAXdtDZjXovN8wIL271L5WEiTOpo1i573D-gDHhYr_xbTviSzl7FW51djxVCzt9aIhQ"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 text-right font-tech-mono text-[10px] tracking-widest text-[#1B365D]/60 uppercase">
              COACH GODFREY &amp; DEKALB COMMUNITY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
