import React, { useState, useEffect } from 'react';
import {
  Heart,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Printer,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  BookOpen,
  Mail,
  Award,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { FadeInView } from './FadeInView';

interface ThankYouPageProps {
  onNavigateHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onNavigateHome }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Generate public shareable URL
    if (typeof window !== 'undefined') {
      const publicUrl = `${window.location.origin}/thank-you`;
      setShareUrl(publicUrl);
    }
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCopyLink = () => {
    if (navigator.clipboard && shareUrl) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const shareText = "I just supported the William Buck Godfrey Legacy Scholarship in partnership with Sporty Girls, Inc. to empower students attending HBCUs. Join me in carrying Coach Godfrey's legacy forward:";

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl || window.location.origin)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl || window.location.origin)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl || window.location.origin)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent("Join me in supporting the William Buck Godfrey Legacy Scholarship");
    const body = encodeURIComponent(
      `Hello,\n\nI just contributed to the William Buck Godfrey Legacy Scholarship Fund in partnership with Sporty Girls, Inc. Coach Godfrey spent four decades shaping young lives, sending hundreds of students to college, and building a legendary championship standard at Southwest DeKalb High School.\n\nYour support helps fund scholarships for students attending Historically Black Colleges and Universities (HBCUs).\n\nLearn more and contribute here:\n${shareUrl || window.location.origin}\n\nThank you!`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div id="thank-you-page-container" className="min-h-screen bg-[#ffffff] pt-28 sm:pt-36 md:pt-40 pb-20 px-4 sm:px-8 md:px-14 lg:px-20 text-[#0A1B36]">
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Top Navigation / Breadcrumb */}
        <FadeInView direction="down" delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0A1B36]/10 pb-4">
            <button
              id="back-to-home-top-btn"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 font-tech-mono text-xs uppercase tracking-[0.2em] text-[#0A1B36] hover:text-[#C5A253] font-bold transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>RETURN TO MEMORIAL SITE</span>
            </button>

            <div className="inline-flex items-center gap-2 bg-[#0A1B36]/5 px-3 py-1 text-[#0A1B36] font-tech-mono text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A253]" />
              <span>OFFICIAL 501(C)(3) CONTRIBUTION</span>
            </div>
          </div>
        </FadeInView>

        {/* Hero Gratitude Banner */}
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center space-y-5 sm:space-y-6">
            {/* Animated Celebration Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#0A1B36] text-[#C5A253] border-2 border-[#C5A253] shadow-lg">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-[#C5A253]" />
            </div>

            <div className="space-y-2">
              <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
                DONATION ACKNOWLEDGMENT &amp; GRATITUDE
              </span>
              <h1 className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36] leading-tight">
                THANK YOU FOR HONORING COACH GODFREY
              </h1>
            </div>

            <p className="font-body-text text-base sm:text-lg md:text-xl text-[#0A1B36]/90 max-w-2xl mx-auto font-medium leading-relaxed">
              Your generous contribution directly fuels scholarships for students attending Historically Black Colleges &amp; Universities, carrying forward Coach William &apos;Buck&apos; Godfrey&apos;s enduring legacy of academic excellence, discipline, and community service.
            </p>
          </div>
        </FadeInView>

        {/* Shareable Public URL Box */}
        <FadeInView direction="up" delay={0.15}>
          <div className="border-2 border-[#0A1B36] bg-[#0A1B36]/5 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C5A253] font-bold block">
                  PUBLIC SHAREABLE PAGE
                </span>
                <h3 className="font-display-title text-lg sm:text-xl font-bold text-[#0A1B36] uppercase tracking-tight">
                  Share Your Support &amp; Inspire Others
                </h3>
              </div>

              {/* Copy URL Button */}
              <button
                id="copy-public-url-btn"
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-2 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] px-5 py-2.5 font-tech-mono text-xs uppercase font-bold tracking-wider transition-all cursor-pointer shadow-xs active:scale-[0.98] shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>LINK COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY PUBLIC URL</span>
                  </>
                )}
              </button>
            </div>

            {/* Readonly Display of URL */}
            <div className="flex items-center gap-2 bg-white border border-[#0A1B36]/20 px-3.5 py-2 font-tech-mono text-xs text-[#0A1B36]/80 overflow-x-auto select-all">
              <span className="text-[#C5A253] font-bold">URL:</span>
              <span className="truncate">{shareUrl || 'https://buckgodfreyscholarship.org/thank-you'}</span>
            </div>

            {/* Social Share Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-tech-mono text-[11px] uppercase tracking-wider text-[#0A1B36]/70 font-semibold mr-1">
                SPREAD THE WORD:
              </span>
              <button
                onClick={handleShareTwitter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#0A1B36]/20 hover:border-[#0A1B36] text-xs font-tech-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#0A1B36]" />
                <span>X / Twitter</span>
              </button>
              <button
                onClick={handleShareFacebook}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#0A1B36]/20 hover:border-[#0A1B36] text-xs font-tech-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#0A1B36]" />
                <span>Facebook</span>
              </button>
              <button
                onClick={handleShareLinkedIn}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#0A1B36]/20 hover:border-[#0A1B36] text-xs font-tech-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#0A1B36]" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={handleShareEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#0A1B36]/20 hover:border-[#0A1B36] text-xs font-tech-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#0A1B36]" />
                <span>Email</span>
              </button>
            </div>
          </div>
        </FadeInView>

        {/* 3 Pillars of Impact */}
        <FadeInView direction="up" delay={0.2}>
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C5A253] font-bold">
                HOW YOUR GIFT TRANSFORMS LIVES
              </span>
              <h2 className="font-display-title text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0A1B36]">
                THE DIRECT IMPACT OF YOUR DONATION
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 border border-[#0A1B36]/15 bg-white space-y-3 relative hover:border-[#C5A253] transition-colors">
                <div className="w-10 h-10 bg-[#0A1B36] text-[#C5A253] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-display-title text-base sm:text-lg font-bold uppercase text-[#0A1B36]">
                  HBCU Tuition &amp; Books
                </h3>
                <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/80 leading-relaxed font-medium">
                  Direct grant funding providing critical relief for collegiate tuition, textbooks, and essential academic expenses for freshmen and continuing scholars.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 border border-[#0A1B36]/15 bg-white space-y-3 relative hover:border-[#C5A253] transition-colors">
                <div className="w-10 h-10 bg-[#0A1B36] text-[#C5A253] flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-display-title text-base sm:text-lg font-bold uppercase text-[#0A1B36]">
                  Academic &amp; Character Standards
                </h3>
                <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/80 leading-relaxed font-medium">
                  Carrying forward Coach Godfrey&apos;s English literature classroom standards—where rigorous discipline and scholastic achievement come first.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 border border-[#0A1B36]/15 bg-white space-y-3 relative hover:border-[#C5A253] transition-colors">
                <div className="w-10 h-10 bg-[#0A1B36] text-[#C5A253] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-display-title text-base sm:text-lg font-bold uppercase text-[#0A1B36]">
                  Mentorship &amp; Community
                </h3>
                <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/80 leading-relaxed font-medium">
                  Ongoing guidance and civic leadership in partnership with Sporty Girls, Inc., ensuring recipients have a support network to graduate and lead.
                </p>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Official Receipt & Tax Information */}
        <FadeInView direction="up" delay={0.25}>
          <div className="p-6 sm:p-8 bg-[#ffffff] border border-[#0A1B36]/20 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0A1B36]/10 pb-4">
              <div className="space-y-1">
                <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C5A253] font-bold block">
                  TAX &amp; RECEIPT DOCUMENTATION
                </span>
                <h3 className="font-display-title text-lg sm:text-xl font-bold uppercase text-[#0A1B36]">
                  Official 501(c)(3) Charitable Record
                </h3>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#0A1B36] text-xs font-tech-mono uppercase font-bold tracking-wider hover:bg-[#0A1B36] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT CONFIRMATION</span>
              </button>
            </div>

            <div className="space-y-3 font-body-text text-xs sm:text-sm text-[#0A1B36]/85 leading-relaxed">
              <p>
                <strong>Receipt Delivery:</strong> An official electronic transaction receipt has been automatically sent to the email address you entered during PayPal checkout.
              </p>
              <p>
                <strong>Charitable Status:</strong> The William Buck Godfrey Legacy Scholarship is administered in partnership with <strong>Sporty Girls, Inc.</strong>, a recognized 501(c)(3) public charity. Contributions are tax-deductible within the limits prescribed by law. No goods or services were provided in exchange for this contribution.
              </p>
              <p className="font-tech-mono text-[11px] text-[#0A1B36]/70 pt-1">
                For corporate matching gifts, donor-advised fund (DAF) verification, or endowment inquiries, contact: <a href="mailto:info@rashanali.com" className="text-[#C5A253] font-bold underline">info@rashanali.com</a>
              </p>
            </div>
          </div>
        </FadeInView>

        {/* Secondary Call to Action: Share a Memory */}
        <FadeInView direction="up" delay={0.3}>
          <div className="p-8 bg-[#0A1B36] text-white text-center space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#C5A253] text-[#0A1B36] px-3.5 py-1 font-tech-mono text-[10px] sm:text-xs uppercase font-bold tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HAVE A STORY TO SHARE?</span>
            </div>

            <h3 className="font-display-title text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              SHARE YOUR MEMORIES OF COACH GODFREY
            </h3>

            <p className="font-body-text text-xs sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
              If you haven&apos;t yet submitted a story, tribute message, or photograph from your time with Coach Godfrey at Southwest DeKalb, we welcome you to leave your memory for his family and the community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  onNavigateHome();
                  setTimeout(() => {
                    const el = document.getElementById('memories');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#C5A253] text-[#0A1B36] hover:bg-white hover:text-[#0A1B36] font-body-text text-xs sm:text-sm font-bold py-3.5 px-8 uppercase tracking-[0.15em] transition-all cursor-pointer shadow-md"
              >
                <span>LEAVE A MEMORY OR TRIBUTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateHome}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:border-white font-body-text text-xs sm:text-sm font-bold py-3.5 px-8 uppercase tracking-[0.15em] transition-all cursor-pointer"
              >
                <span>RETURN TO HOME</span>
              </button>
            </div>
          </div>
        </FadeInView>

      </div>
    </div>
  );
};
