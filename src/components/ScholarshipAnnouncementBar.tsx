import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

interface ScholarshipAnnouncementBarProps {
  onApplyClick?: () => void;
}

interface TimeLeft {
  isExpired: boolean;
  months: number;
  days: number;
}

// Target: March 1, 2027 at 12:00 AM (00:00:00)
const TARGET_DATE = new Date(2027, 2, 1, 0, 0, 0);

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  if (now.getTime() >= TARGET_DATE.getTime()) {
    return { isExpired: true, months: 0, days: 0 };
  }

  // Calculate full calendar months
  let months = (TARGET_DATE.getFullYear() - now.getFullYear()) * 12 + (TARGET_DATE.getMonth() - now.getMonth());

  let anchor = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
  if (anchor.getTime() > TARGET_DATE.getTime()) {
    months--;
    anchor = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
  }

  const diffMs = TARGET_DATE.getTime() - anchor.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    isExpired: false,
    months: Math.max(0, months),
    days: Math.max(0, days),
  };
}

export const ScholarshipAnnouncementBar: React.FC<ScholarshipAnnouncementBarProps> = ({ onApplyClick }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Updated every minute since we only display months and days

    return () => clearInterval(timer);
  }, []);

  const handleApply = () => {
    if (onApplyClick) {
      onApplyClick();
    } else {
      const el = document.getElementById('scholar') || document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div
      id="scholarship-announcement-bar"
      className="w-full bg-[#B8923F]/45 backdrop-blur-md border-t border-b border-[#A6802C]/60 text-[#0A1B36] py-2 sm:py-2.5 px-3 sm:px-6 md:px-10 shadow-sm select-none transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        {timeLeft.isExpired ? (
          /* Expired State: Replaced with prominent Apply Now CTA */
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="bg-white p-1 sm:p-1.5 border-2 border-[#0A1B36]/20 shadow-xs flex items-center justify-center text-[#0A1B36] shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A253] shrink-0 animate-pulse" />
              </div>
              <span className="font-display-title text-[11px] xs:text-xs sm:text-sm font-bold tracking-wide uppercase text-[#0A1B36]">
                Applications Are Now Open for the WBG Legacy Scholarship!
              </span>
            </div>
            <button
              id="announcement-apply-now-btn"
              onClick={handleApply}
              className="font-display-title text-xs sm:text-sm font-bold tracking-[0.18em] bg-[#0A1B36] text-white hover:bg-white hover:text-[#0A1B36] py-1.5 sm:py-2 px-5 sm:px-8 uppercase transition-all duration-200 shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 min-h-[38px] border-2 border-[#0A1B36] w-full sm:w-auto"
            >
              <span>APPLY NOW</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#C5A253]" />
            </button>
          </div>
        ) : (
          /* Active Countdown State */
          <>
            {/* Announcement Message (Blue verbiage contrasting transparent gold) */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 xs:gap-2 sm:gap-2.5 text-center sm:text-left">
              <div className="bg-white p-1 sm:p-1.5 border-2 border-[#0A1B36]/25 shadow-xs flex items-center justify-center text-[#0A1B36] shrink-0">
                <Clock className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#0A1B36]" />
              </div>
              <p className="font-display-title text-[10.5px] xs:text-xs sm:text-sm font-bold tracking-tight xs:tracking-normal sm:tracking-wide text-[#0A1B36] leading-tight">
                Want to apply for the scholarship?{' '}
                <span className="font-extrabold underline decoration-[#0A1B36]/35 underline-offset-2 inline-block">
                  Applications open in March 2027.
                </span>
              </p>
            </div>

            {/* Live Countdown: Months and Days in Bold White Contrast Boxes */}
            <div
              id="scholarship-countdown-timer"
              className="flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0"
              aria-label={`${timeLeft.months} Months and ${timeLeft.days} Days until applications open`}
            >
              {/* Months Box */}
              <div className="flex items-center gap-1 sm:gap-1.5 bg-white border-2 border-[#0A1B36]/30 px-2 xs:px-2.5 sm:px-3 py-0.5 sm:py-1 shadow-xs">
                <span className="font-display-title font-black text-xs xs:text-sm sm:text-base text-[#0A1B36] leading-none">
                  {timeLeft.months}
                </span>
                <span className="font-display-title font-bold text-[9px] xs:text-[10px] sm:text-xs text-[#0A1B36] tracking-wider uppercase">
                  MONTHS
                </span>
              </div>

              {/* Days Box */}
              <div className="flex items-center gap-1 sm:gap-1.5 bg-white border-2 border-[#0A1B36]/30 px-2 xs:px-2.5 sm:px-3 py-0.5 sm:py-1 shadow-xs">
                <span className="font-display-title font-black text-xs xs:text-sm sm:text-base text-[#0A1B36] leading-none">
                  {timeLeft.days}
                </span>
                <span className="font-display-title font-bold text-[9px] xs:text-[10px] sm:text-xs text-[#0A1B36] tracking-wider uppercase">
                  DAYS
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
