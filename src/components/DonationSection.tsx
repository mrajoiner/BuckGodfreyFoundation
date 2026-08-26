import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake,
  AlertCircle,
  RefreshCw,
  Lock,
  Printer,
  RotateCcw,
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';

// ============================================================================
// OFFICIAL PAYPAL HOSTED DONATION BUTTON CONFIGURATION
// Embedded PayPal Payment: https://www.paypal.com/ncp/payment/TTQHDUE3H6G5G
// Button ID: TTQHDUE3H6G5G
// ============================================================================
const PAYPAL_DIRECT_PAYMENT_URL = 'https://www.paypal.com/ncp/payment/TTQHDUE3H6G5G';
const PAYPAL_CLIENT_ID = 'BAAC2eSKrOyLlkK6hZzifFcXmWBhYKxNdu2r19GxaIFs78rFQ3ZXy9CQgH3MLCNbh0GPImjXGyMPlM5Jbg';
const PAYPAL_HOSTED_BUTTON_ID = 'TTQHDUE3H6G5G';
const PAYPAL_SDK_URL = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-buttons&enable-funding=venmo&currency=USD`;

interface DonationSuccessData {
  transactionId: string;
  donorName: string;
  email: string;
  amount: number;
  timestamp: string;
}

// Global TypeScript declarations for the PayPal HostedButtons SDK
declare global {
  interface Window {
    paypal?: {
      HostedButtons?: (options: { 
        hostedButtonId: string;
        onApprove?: (data: { orderID: string; payerID?: string }) => void;
      }) => {
        render: (selectorOrElement: string | HTMLElement) => Promise<void>;
      };
      Buttons?: (options: unknown) => {
        render: (selectorOrElement: string | HTMLElement) => Promise<void>;
      };
    };
  }
}

export const DonationSection: React.FC = () => {
  // Completed donation state (if captured)
  const [completedDonation, setCompletedDonation] = useState<DonationSuccessData | null>(null);

  // PayPal SDK loading & rendering state
  const [sdkStatus, setSdkStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [sdkErrorMessage, setSdkErrorMessage] = useState<string>('');

  const containerRef = useRef<HTMLElement>(null);
  const paypalHostRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const watermarkY = useTransform(smoothProgress, [0, 1], ['-15%', '25%']);

  // ==========================================================================
  // PAYPAL HOSTED BUTTONS LOADER & RENDERER
  // Loads the official PayPal HostedButtons SDK so donors can complete payments
  // directly through PayPal.
  // ==========================================================================
  const loadAndRenderPayPal = () => {
    setSdkStatus('loading');
    setSdkErrorMessage('');

    const renderButtons = () => {
      try {
        const hostEl = paypalHostRef.current;
        if (!hostEl) return;

        // Clear existing child elements before mounting
        hostEl.innerHTML = '';

        if (!window.paypal?.HostedButtons) {
          throw new Error('PayPal HostedButtons SDK not initialized.');
        }

        window.paypal
          .HostedButtons({
            hostedButtonId: PAYPAL_HOSTED_BUTTON_ID,
          })
          .render(hostEl)
          .then(() => {
            setSdkStatus('ready');
          })
          .catch((err: Error) => {
            console.error('PayPal HostedButtons render error:', err);
            setSdkErrorMessage(err.message || 'Unable to load PayPal donation console.');
            setSdkStatus('error');
          });
      } catch (err: unknown) {
        const error = err as Error;
        console.error('PayPal initialization error:', error);
        setSdkErrorMessage(error.message || 'Failed to initialize PayPal donation console.');
        setSdkStatus('error');
      }
    };

    // If SDK is already ready on window
    if (window.paypal?.HostedButtons) {
      renderButtons();
      return;
    }

    // Check if script tag already exists in document
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src*="client-id=${PAYPAL_CLIENT_ID}"]`
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => renderButtons(), { once: true });
      existingScript.addEventListener(
        'error',
        () => {
          setSdkErrorMessage('Could not load PayPal SDK. Please check your internet connection.');
          setSdkStatus('error');
        },
        { once: true }
      );
      return;
    }

    // Dynamically inject official PayPal SDK script
    const script = document.createElement('script');
    script.id = 'paypal-sdk-script';
    script.src = PAYPAL_SDK_URL;
    script.async = true;
    script.onload = () => {
      renderButtons();
    };
    script.onerror = () => {
      setSdkErrorMessage('Unable to connect to PayPal. Please check your connection and try again.');
      setSdkStatus('error');
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    loadAndRenderPayPal();

    return () => {
      if (paypalHostRef.current) {
        paypalHostRef.current.innerHTML = '';
      }
    };
  }, []);

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleResetDonation = () => {
    setCompletedDonation(null);
    setTimeout(() => {
      loadAndRenderPayPal();
    }, 100);
  };

  return (
    <section
      ref={containerRef}
      id="donate"
      aria-labelledby="donation-section-title"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden bg-[#ffffff] border-t border-[#0A1B36]/10"
    >
      {/* Editorial Background Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-[0.025] sm:opacity-[0.035] select-none transform-gpu"
        aria-hidden="true"
      >
        LEGACY
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
              501(C)(3) SCHOLARSHIP FUND • IN PARTNERSHIP WITH SPORTY GIRLS, INC.
            </span>
            <h2
              id="donation-section-title"
              className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36]"
            >
              Support the Scholarship Fund
            </h2>
            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 leading-relaxed max-w-2xl mx-auto font-medium">
              Your contribution directly funds scholarships for students attending Historically Black Colleges and Universities, continuing Coach Godfrey’s legacy of educational opportunity.
            </p>
          </div>
        </FadeInView>

        {/* Centered Native Donation Module */}
        <FadeInView direction="up" delay={0.2}>
          <div
            id="donation-checkout-card"
            className="bg-[#ffffff] border-2 border-[#0A1B36] p-4 xs:p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 sm:space-y-8 relative"
          >
            {/* COMPLETED DONATION RECEIPT VIEW */}
            {completedDonation ? (
              <div className="space-y-5 sm:space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center space-y-2 pb-5 sm:pb-6 border-b border-[#0A1B36]/15">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C5A253]/15 text-[#C5A253] mx-auto flex items-center justify-center border-2 border-[#C5A253] mb-3">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <span className="font-tech-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A253] block">
                    PAYMENT COMPLETED • OFFICIAL RECEIPT
                  </span>
                  <h3 className="font-display-title text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#0A1B36]">
                    Thank You for Your Generous Contribution
                  </h3>
                  <p className="font-body-text text-xs sm:text-sm md:text-base text-[#0A1B36]/85 max-w-lg mx-auto font-medium">
                    Your tax-deductible gift of <strong>${completedDonation.amount.toFixed(2)} USD</strong> directly fuels our HBCU scholars and keeps Coach Godfrey’s legacy thriving.
                  </p>
                </div>

                <div className="bg-[#ffffff] p-3.5 sm:p-5 border border-[#0A1B36]/15 space-y-2.5 sm:space-y-3 font-tech-mono text-xs text-[#0A1B36]">
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center border-b border-[#0A1B36]/10 pb-2 gap-0.5">
                    <span className="text-[#0A1B36]/70 uppercase font-medium">Transaction ID:</span>
                    <span className="font-bold break-all">{completedDonation.transactionId}</span>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center border-b border-[#0A1B36]/10 pb-2 gap-0.5">
                    <span className="text-[#0A1B36]/70 uppercase font-medium">Donor Name:</span>
                    <span className="font-bold">{completedDonation.donorName}</span>
                  </div>
                  {completedDonation.email && (
                    <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center border-b border-[#0A1B36]/10 pb-2 gap-0.5">
                      <span className="text-[#0A1B36]/70 uppercase font-medium">Email:</span>
                      <span className="font-bold break-all">{completedDonation.email}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-b border-[#0A1B36]/10 pb-2">
                    <span className="text-[#0A1B36]/70 uppercase font-medium">Total Gift:</span>
                    <span className="font-bold text-base text-[#C5A253]">${completedDonation.amount.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#0A1B36]/70 uppercase font-medium">Date &amp; Time:</span>
                    <span className="text-[11px] sm:text-xs">{completedDonation.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrintReceipt}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] font-display-title text-xs font-bold py-3.5 px-6 uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official Receipt</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDonation}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-[#0A1B36] text-[#0A1B36] hover:bg-[#0A1B36] hover:text-white font-display-title text-xs font-bold py-3.5 px-6 uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Make Another Gift</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE PAYPAL DONATION VIEW */
              <>
                {/* Header / Sub-banner */}
                <div className="border-b border-[#0A1B36]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-tech-mono text-[9px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#C5A253] block mb-1">
                      OFFICIAL SCHOLARSHIP CONTRIBUTION • IN PARTNERSHIP WITH SPORTY GIRLS, INC.
                    </span>
                    <h3 className="font-display-title text-lg sm:text-2xl font-bold uppercase text-[#0A1B36]">
                      Make a Contribution
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-tech-mono text-[#0A1B36]/80 self-start sm:self-auto bg-[#ffffff] px-2.5 sm:px-3 py-1.5 border border-[#0A1B36]/15">
                    <Lock className="w-3.5 h-3.5 text-[#C5A253] shrink-0" />
                    <span>SSL Encrypted Checkout</span>
                  </div>
                </div>

                {/* Introductory Narrative */}
                <p className="font-body-text text-xs sm:text-sm md:text-base text-[#0A1B36]/85 leading-relaxed font-medium">
                  Complete your contribution securely through PayPal&apos;s donation gateway below. You can contribute using a PayPal account, Venmo, Apple Pay, or any major debit/credit card.
                </p>

                {/* Direct Action Link / Embedded PayPal Button Console */}
                <div className="w-full flex flex-col items-center justify-center min-h-[120px] bg-[#ffffff] p-1 sm:p-2 space-y-4">
                  {/* Direct PayPal Checkout Button */}
                  <div className="w-full max-w-md mx-auto text-center space-y-3">
                    <a
                      href={PAYPAL_DIRECT_PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] font-display-title text-xs sm:text-sm font-bold py-3.5 sm:py-4 px-4 sm:px-6 uppercase tracking-[0.12em] sm:tracking-[0.15em] transition-all shadow-md active:scale-[0.98] cursor-pointer min-h-[48px] text-center"
                    >
                      <CreditCard className="w-4 h-4 shrink-0" />
                      <span>Proceed to Secure PayPal Checkout</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                    <p className="font-tech-mono text-[9px] sm:text-[10px] text-[#0A1B36]/70 uppercase tracking-wider">
                      Opens official PayPal payment gateway (Button ID: TTQHDUE3H6G5G)
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full max-w-md flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-[#0A1B36]/15" />
                    <span className="font-tech-mono text-[10px] uppercase tracking-widest text-[#0A1B36]/60 font-semibold">
                      OR PAY IN-LINE
                    </span>
                    <div className="flex-1 h-px bg-[#0A1B36]/15" />
                  </div>

                  {/* Loading State Spinner */}
                  {sdkStatus === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-4 space-y-2">
                      <RefreshCw className="w-5 h-5 text-[#C5A253] animate-spin" />
                      <span className="font-tech-mono text-xs text-[#0A1B36]/70 uppercase tracking-wider">
                        Loading In-Line PayPal Console...
                      </span>
                    </div>
                  )}

                  {/* Error State with Fallback */}
                  {sdkStatus === 'error' && (
                    <div className="w-full max-w-md p-4 bg-amber-50 border border-amber-200 text-center space-y-3">
                      <div className="flex items-center justify-center gap-2 text-[#0A1B36] font-bold text-xs font-tech-mono">
                        <AlertCircle className="w-4 h-4 text-[#C5A253]" />
                        <span>In-line widget blocked by browser privacy settings.</span>
                      </div>
                      <p className="font-body-text text-xs text-[#0A1B36]/80">
                        Please use the secure direct link above to complete your donation on PayPal.
                      </p>
                      <a
                        href={PAYPAL_DIRECT_PAYMENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 font-body-text text-xs font-bold tracking-wider bg-[#0A1B36] text-white py-2.5 px-6 hover:bg-[#C5A253] hover:text-[#0A1B36] uppercase transition-all shadow-xs"
                      >
                        <span>Open PayPal Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Official PayPal Hosted Buttons Mount Target */}
                  <div className="w-full max-w-md mx-auto">
                    <div
                      id="paypal-container-TTQHDUE3H6G5G"
                      ref={paypalHostRef}
                      className={`w-full ${sdkStatus === 'ready' ? 'block' : 'hidden'}`}
                    />
                  </div>
                </div>

                {/* Post-Checkout Information & Policy */}
                <div className="p-4 bg-[#ffffff] border border-[#0A1B36]/15 space-y-2 text-xs font-body-text text-[#0A1B36]/80 leading-relaxed font-medium">
                  <div className="flex items-center gap-2 font-tech-mono text-[10px] font-bold text-[#0A1B36] uppercase tracking-wider">
                    <HeartHandshake className="w-4 h-4 text-[#C5A253]" />
                    <span>Thank You for Investing in Their Future</span>
                  </div>
                  <p>
                    Your contribution helps carry Coach William Buck Godfrey’s legacy forward by investing in the next generation. Your payment is processed securely with end-to-end encryption. All contributions are 100% tax-deductible.
                  </p>
                  <div className="pt-2 border-t border-[#0A1B36]/10 text-center">
                    <a
                      href="/thank-you"
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          window.history.pushState(null, '', '/thank-you');
                          window.dispatchEvent(new PopStateEvent('popstate'));
                        } catch {
                          window.location.hash = 'thank-you';
                        }
                      }}
                      className="font-tech-mono text-[11px] uppercase tracking-wider text-[#0A1B36] hover:text-[#C5A253] font-bold underline transition-colors"
                    >
                      Already completed your donation? View Official Thank You &amp; Acknowledgment Page &rarr;
                    </a>
                  </div>
                </div>
              </>
            )}

            {/* Tax Verification & Security Badges */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] font-tech-mono text-[#0A1B36]/70 gap-2 border-t border-[#0A1B36]/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A253]" />
                <span>Official 501(c)(3) Charitable Organization in Partnership with Sporty Girls, Inc.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A253]" />
                <span>100% Tax-Deductible Contribution</span>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};

