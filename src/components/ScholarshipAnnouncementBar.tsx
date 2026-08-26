import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

interface ScholarshipAnnouncementBarProps {
  onApplyClick?: () => void;
}

interface TimeLeft {
  isExpired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Target: March 1, 2027 at 12:00 AM (00:00:00)
const TARGET_DATE = new Date(2027, 2, 1, 0, 0, 0).getTime();

function calculateTimeLeft(): TimeLeft {
  const difference = TARGET_DATE - Date.now();
  if (difference <= 0) {
    return { isExpired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    isExpired: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export const ScholarshipAnnouncementBar: React.FC<ScholarshipAnnouncementBarProps> = ({ onApplyClick }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

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
      className="w-full bg-[#0A1B36] border-t border-b border-[#C5A253]/30 text-white py-2 sm:py-2.5 px-3 sm:px-6 md:px-10 shadow-md select-none transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-3 text-center md:text-left">
        {timeLeft.isExpired ? (
          /* Expired State: Replaced with prominent Apply Now CTA */
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A253] shrink-0 animate-pulse" />
              <span className="font-display-title text-xs sm:text-sm font-bold tracking-wide uppercase text-white">
                Applications Are Now Open for the WBG Legacy Scholarship!
              </span>
            </div>
            <button
              id="announcement-apply-now-btn"
              onClick={handleApply}
              className="font-display-title text-xs sm:text-sm font-bold tracking-[0.18em] bg-[#C5A253] text-[#0A1B36] hover:bg-white hover:text-[#0A1B36] py-1.5 sm:py-2 px-6 sm:px-8 uppercase transition-all duration-200 shadow-md active:scale-95 cursor-pointer flex items-center gap-2 min-h-[38px]"
            >
              <span>APPLY NOW</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        ) : (
          /* Active Countdown State */
          <>
            {/* Announcement Message */}
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap text-center md:text-left">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A253] shrink-0" />
              <p className="font-display-title text-[11px] xs:text-xs sm:text-sm font-semibold tracking-wide text-white leading-tight">
                Want to apply for the scholarship?{' '}
                <span className="text-[#C5A253] font-bold">Applications open in March 2027.</span>
              </p>
            </div>

            {/* Live Countdown Timer */}
            <div
              id="scholarship-countdown-timer"
              className="flex items-center justify-center gap-1 sm:gap-1.5 font-tech-mono text-[10px] sm:text-xs"
              aria-label={`Countdown: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until applications open`}
            >
              <span className="text-[#C5A253] text-[9px] uppercase tracking-wider font-bold mr-1 hidden lg:inline">
                COUNTDOWN:
              </span>

              {/* Days */}
              <div className="flex items-baseline gap-0.5 bg-[#ffffff]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 border border-[#C5A253]/30 min-w-[42px] sm:min-w-[48px] justify-center">
                <span className="font-bold text-white text-xs sm:text-sm">{timeLeft.days}</span>
                <span className="text-[#C5A253] text-[8px] sm:text-[9px] uppercase font-bold">d</span>
              </div>
              <span className="text-[#C5A253] font-bold text-xs">:</span>

              {/* Hours */}
              <div className="flex items-baseline gap-0.5 bg-[#ffffff]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 border border-[#C5A253]/30 min-w-[36px] sm:min-w-[42px] justify-center">
                <span className="font-bold text-white text-xs sm:text-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[#C5A253] text-[8px] sm:text-[9px] uppercase font-bold">h</span>
              </div>
              <span className="text-[#C5A253] font-bold text-xs">:</span>

              {/* Minutes */}
              <div className="flex items-baseline gap-0.5 bg-[#ffffff]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 border border-[#C5A253]/30 min-w-[36px] sm:min-w-[42px] justify-center">
                <span className="font-bold text-white text-xs sm:text-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[#C5A253] text-[8px] sm:text-[9px] uppercase font-bold">m</span>
              </div>
              <span className="text-[#C5A253] font-bold text-xs">:</span>

              {/* Seconds */}
              <div className="flex items-baseline gap-0.5 bg-[#ffffff]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 border border-[#C5A253]/30 min-w-[36px] sm:min-w-[42px] justify-center">
                <span className="font-bold text-[#C5A253] text-xs sm:text-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[#C5A253] text-[8px] sm:text-[9px] uppercase font-bold">s</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
