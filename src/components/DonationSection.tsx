import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake,
  AlertCircle,
  RefreshCw,
  Lock
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';

// ============================================================================
// PAYPAL HOSTED BUTTON CONFIGURATION
// To update or replace the PayPal hosted button in the future:
// 1. Replace the PAYPAL_HOSTED_BUTTON_ID with your new Hosted Button ID from PayPal.
// 2. Ensure the client-id and currency in PAYPAL_SDK_URL match your PayPal account.
// ============================================================================
const PAYPAL_HOSTED_BUTTON_ID = 'TTQHDUE3H6G5G';
const PAYPAL_CLIENT_ID = 'BAAC2eSKrOyLlkK6hZzifFcXmWBhYKxNdu2r19GxaIFs78rFQ3ZXy9CQgH3MLCNbh0GPImjXGyMPlM5Jbg';
const PAYPAL_SDK_URL = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-buttons&enable-funding=venmo&currency=USD`;

// Global type declaration for PayPal HostedButtons SDK
declare global {
  interface Window {
    paypal?: {
      HostedButtons?: (options: { hostedButtonId: string }) => {
        render: (selectorOrElement: string | HTMLElement) => Promise<void>;
      };
    };
  }
}

interface SuggestedTier {
  amount: number;
  label: string;
  impact: string;
  badge?: string;
}

const SUGGESTED_TIERS: SuggestedTier[] = [
  {
    amount: 25,
    label: 'Course Materials',
    impact: 'Provides essential textbooks, digital access codes, and course study materials for one scholar.',
  },
  {
    amount: 50,
    label: 'Campus Technology',
    impact: 'Funds high-speed wireless campus connectivity and specialized engineering lab supplies.',
  },
  {
    amount: 100,
    label: 'Scholar Sustainer',
    impact: 'Provides essential living and nutritional stipends for student-athletes and HBCU scholars.',
    badge: 'MOST POPULAR',
  },
  {
    amount: 250,
    label: 'STEM & Academic Grant',
    impact: 'Covers specialized hardware, laptop accessories, and graduate/professional exam prep fees.',
  },
  {
    amount: 500,
    label: 'Semester Fellow',
    impact: 'Completely eliminates out-of-pocket textbook and laboratory fees for an entire semester.',
    badge: 'HIGH IMPACT',
  },
];

export const DonationSection: React.FC = () => {
  // Donation selection state
  const [selectedPreset, setSelectedPreset] = useState<number | 'other'>(100);
  const [customAmountInput, setCustomAmountInput] = useState<string>('');
  const [customAmountError, setCustomAmountError] = useState<string | null>(null);

  // PayPal SDK loading & rendering state
  const [sdkStatus, setSdkStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [sdkErrorMessage, setSdkErrorMessage] = useState<string>('');

  const containerRef = useRef<HTMLElement>(null);
  const paypalHostRef = useRef<HTMLDivElement>(null);
  const isRenderedRef = useRef<boolean>(false);

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

  // Validate custom amount
  const handleCustomAmountChange = (value: string) => {
    // Strip dollar sign or spaces if pasted
    const cleanValue = value.replace(/^\$/, '').trim();
    setCustomAmountInput(cleanValue);

    if (cleanValue === '') {
      setCustomAmountError('Please enter a valid contribution amount.');
      return;
    }

    // Must be a valid positive number
    const num = Number(cleanValue);
    if (isNaN(num)) {
      setCustomAmountError('Please enter numbers only (e.g. 150).');
    } else if (num <= 0) {
      setCustomAmountError('Donation amount must be greater than $0.');
    } else if (!/^\d+(\.\d{1,2})?$/.test(cleanValue)) {
      setCustomAmountError('Please enter a valid dollar amount (up to 2 decimal places).');
    } else {
      setCustomAmountError(null);
    }
  };

  // Compute active effective dollar amount
  const effectiveAmount: number | null = 
    selectedPreset === 'other'
      ? customAmountError || !customAmountInput
        ? null
        : parseFloat(customAmountInput)
      : selectedPreset;

  // Impact narrative based on current amount
  const getImpactNarrative = (): string => {
    if (selectedPreset === 'other') {
      if (!effectiveAmount) {
        return 'Enter a custom amount to empower promising student-athletes and scholars.';
      }
      if (effectiveAmount >= 2500) {
        return 'Directly provides full-semester HBCU tuition grants, eliminating debt completely.';
      }
      if (effectiveAmount >= 1000) {
        return 'Funds comprehensive semester stipends, technology packages, and alumni mentorship.';
      }
      if (effectiveAmount >= 500) {
        return 'Covers semester-long STEM lab fees, books, and student-athlete nutritional stipends.';
      }
      if (effectiveAmount >= 100) {
        return 'Supplies monthly study aids, tech licenses, and emergency travel support.';
      }
      return 'Every single dollar directly supports our collegiate HBCU scholar cohorts.';
    }

    const tier = SUGGESTED_TIERS.find((t) => t.amount === selectedPreset);
    return tier ? tier.impact : 'Directly empowers our next generation of HBCU leaders.';
  };

  // ==========================================================================
  // SAFE PAYPAL SDK LOADER & RENDERER
  // Loads the official PayPal SDK once and renders the HostedButton container.
  // ==========================================================================
  const loadAndRenderPayPal = () => {
    setSdkStatus('loading');
    setSdkErrorMessage('');
    isRenderedRef.current = false;

    const renderButton = () => {
      try {
        if (!window.paypal?.HostedButtons) {
          throw new Error('PayPal HostedButtons SDK not found on window object.');
        }

        const hostEl = paypalHostRef.current;
        if (!hostEl) return;

        // Clear existing child elements to prevent duplicate button rendering
        hostEl.innerHTML = '';

        window.paypal
          .HostedButtons({
            hostedButtonId: PAYPAL_HOSTED_BUTTON_ID,
          })
          .render(hostEl)
          .then(() => {
            isRenderedRef.current = true;
            setSdkStatus('ready');
          })
          .catch((err: Error) => {
            console.error('PayPal HostedButtons render error:', err);
            setSdkErrorMessage(err.message || 'Unable to render PayPal payment button.');
            setSdkStatus('error');
          });
      } catch (err: unknown) {
        const error = err as Error;
        console.error('PayPal HostedButtons execution error:', error);
        setSdkErrorMessage(error.message || 'Failed to initialize PayPal checkout.');
        setSdkStatus('error');
      }
    };

    // If SDK is already loaded on window
    if (window.paypal?.HostedButtons) {
      renderButton();
      return;
    }

    // Check if script tag already exists in document
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src*="hostedButtonId"], script[src*="hosted-buttons"]`
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => renderButton(), { once: true });
      existingScript.addEventListener(
        'error',
        () => {
          setSdkErrorMessage('Could not load PayPal SDK. Please check your network connection.');
          setSdkStatus('error');
        },
        { once: true }
      );
      return;
    }

    // Dynamically inject official PayPal SDK script
    const script = document.createElement('script');
    script.id = 'paypal-sdk-hosted-buttons';
    script.src = PAYPAL_SDK_URL;
    script.async = true;
    script.onload = () => {
      renderButton();
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
      // Cleanup rendered contents when unmounting
      if (paypalHostRef.current) {
        paypalHostRef.current.innerHTML = '';
      }
      isRenderedRef.current = false;
    };
  }, []);

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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-15 sm:opacity-25 select-none transform-gpu"
        aria-hidden="true"
      >
        ENDOW
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
              501(C)(3) ENDOWMENT FUND
            </span>
            <h2
              id="donation-section-title"
              className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36]"
            >
              Invest in the Next Generation
            </h2>
            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 leading-relaxed max-w-2xl mx-auto font-medium">
              Your contribution helps carry Coach William Buck Godfrey’s legacy forward by investing in the next generation of scholars, student-athletes, and leaders attending Historically Black Colleges &amp; Universities.
            </p>
          </div>
        </FadeInView>

        {/* Centered Native Donation Module */}
        <FadeInView direction="up" delay={0.2}>
          <div
            id="donation-checkout-card"
            className="bg-[#ffffff] border-2 border-[#0A1B36] p-6 sm:p-8 md:p-10 shadow-2xl space-y-8 relative"
          >
            {/* Header / Sub-banner */}
            <div className="border-b border-[#0A1B36]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-tech-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A253] block mb-1">
                  OFFICIAL SCHOLARSHIP CONTRIBUTION
                </span>
                <h3 className="font-display-title text-xl sm:text-2xl font-bold uppercase text-[#0A1B36]">
                  Select Donation Amount
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-tech-mono text-[#0A1B36]/80 self-start sm:self-auto bg-[#0A1B36]/5 px-3 py-1.5 border border-[#0A1B36]/10">
                <Lock className="w-3.5 h-3.5 text-[#C5A253]" />
                <span>SSL Encrypted Checkout</span>
              </div>
            </div>

            {/* Suggested Amounts Grid */}
            <div className="space-y-3" role="group" aria-label="Suggested donation amounts">
              <label 
                id="amount-selection-label"
                className="font-tech-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block"
              >
                GIFT AMOUNT (USD)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SUGGESTED_TIERS.map((tier) => {
                  const isSelected = selectedPreset === tier.amount;
                  return (
                    <button
                      key={tier.amount}
                      id={`preset-btn-${tier.amount}`}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedPreset(tier.amount);
                        setCustomAmountError(null);
                      }}
                      className={`p-3.5 sm:p-4 text-center border-2 transition-all cursor-pointer flex flex-col justify-center items-center relative focus:outline-none focus:ring-2 focus:ring-[#C5A253] min-h-[72px] ${
                        isSelected
                          ? 'border-[#C5A253] bg-[#0A1B36]/5 text-[#0A1B36] shadow-sm font-bold'
                          : 'border-[#0A1B36]/15 bg-[#ffffff] text-[#0A1B36]/90 hover:border-[#0A1B36]/50'
                      }`}
                    >
                      {tier.badge && (
                        <span className="absolute -top-2.5 right-2 bg-[#C5A253] text-[#0A1B36] text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 shadow-xs">
                          {tier.badge}
                        </span>
                      )}
                      <span className="font-display-title text-xl sm:text-2xl font-bold">
                        ${tier.amount}
                      </span>
                      <span className="font-tech-mono text-[9px] text-[#0A1B36]/70 uppercase tracking-tight mt-0.5 font-medium">
                        {tier.label}
                      </span>
                    </button>
                  );
                })}

                {/* Other Amount Button */}
                <button
                  id="preset-btn-other"
                  type="button"
                  aria-pressed={selectedPreset === 'other'}
                  onClick={() => {
                    setSelectedPreset('other');
                    if (!customAmountInput) {
                      setCustomAmountInput('150');
                      setCustomAmountError(null);
                    }
                  }}
                  className={`p-3.5 sm:p-4 text-center border-2 transition-all cursor-pointer flex flex-col justify-center items-center relative focus:outline-none focus:ring-2 focus:ring-[#C5A253] min-h-[72px] ${
                    selectedPreset === 'other'
                      ? 'border-[#C5A253] bg-[#0A1B36]/5 text-[#0A1B36] shadow-sm font-bold'
                      : 'border-[#0A1B36]/15 bg-[#ffffff] text-[#0A1B36]/90 hover:border-[#0A1B36]/50'
                  }`}
                >
                  <span className="font-display-title text-lg sm:text-xl font-bold uppercase">
                    Other Amount
                  </span>
                  <span className="font-tech-mono text-[9px] text-[#0A1B36]/70 uppercase tracking-tight mt-0.5 font-medium">
                    Custom Gift
                  </span>
                </button>
              </div>
            </div>

            {/* Custom Amount Input Field (Shown when 'Other Amount' is active) */}
            {selectedPreset === 'other' && (
              <div className="space-y-2 animate-in fade-in duration-200 bg-[#0A1B36]/5 p-4 border border-[#0A1B36]/15">
                <label 
                  htmlFor="custom-donation-amount-input"
                  className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36] uppercase block"
                >
                  ENTER YOUR CUSTOM AMOUNT (USD)
                </label>
                <div className="relative">
                  <span 
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 font-tech-mono text-base text-[#0A1B36] font-bold"
                    aria-hidden="true"
                  >
                    $
                  </span>
                  <input
                    id="custom-donation-amount-input"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="e.g. 150.00"
                    value={customAmountInput}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    aria-invalid={!!customAmountError}
                    aria-describedby={customAmountError ? 'custom-amount-error-msg' : undefined}
                    className={`w-full bg-[#ffffff] border-2 pl-9 pr-4 py-3 font-tech-mono text-base text-[#0A1B36] focus:outline-none focus:ring-2 focus:ring-[#C5A253] font-bold ${
                      customAmountError ? 'border-red-600' : 'border-[#0A1B36]/30 focus:border-[#C5A253]'
                    }`}
                  />
                </div>

                {customAmountError && (
                  <p 
                    id="custom-amount-error-msg" 
                    role="alert"
                    className="font-tech-mono text-xs text-red-700 font-bold flex items-center gap-1.5 pt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{customAmountError}</span>
                  </p>
                )}
              </div>
            )}

            {/* Dynamic Impact Callout Tile */}
            <div className="p-4 bg-[#ffffff] border-l-4 border-[#C5A253] border border-[#0A1B36]/15 flex items-start gap-3 shadow-xs">
              <Sparkles className="w-5 h-5 text-[#C5A253] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <span className="font-tech-mono text-[10px] font-bold text-[#0A1B36] uppercase tracking-wider block">
                  YOUR IMPACT {effectiveAmount ? `($${effectiveAmount.toLocaleString()} USD)` : ''}
                </span>
                <p className="font-body-text text-xs sm:text-sm text-[#0A1B36]/90 leading-relaxed font-medium">
                  {getImpactNarrative()}
                </p>
              </div>
            </div>

            {/* ============================================================== */}
            {/* PAYPAL CHECKOUT INTEGRATION CONTAINER                          */}
            {/* ============================================================== */}
            <div className="space-y-4 pt-2 border-t border-[#0A1B36]/10">
              <div className="flex items-center justify-between">
                <span className="font-tech-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A253]">
                  COMPLETE PAYMENT SECURELY
                </span>
                {effectiveAmount && (
                  <span className="font-tech-mono text-xs font-bold text-[#0A1B36] bg-[#0A1B36]/10 px-2 py-0.5">
                    Selected: ${effectiveAmount.toLocaleString()} USD
                  </span>
                )}
              </div>

              {/* Notice regarding custom amount / customer-set price flow */}
              <p className="font-body-text text-xs text-[#0A1B36]/75 leading-relaxed font-medium">
                Select your payment method below. PayPal supports <strong>PayPal, Venmo, Debit / Credit Cards, Apple Pay, and Pay Later</strong>.
                {selectedPreset === 'other' && effectiveAmount && (
                  <span className="block mt-1 text-[#0A1B36] font-semibold">
                    Note: Enter your designated gift of ${effectiveAmount} during the secure PayPal customer-set price checkout.
                  </span>
                )}
              </p>

              {/* Prevent checkout if custom amount is invalid */}
              {selectedPreset === 'other' && customAmountError ? (
                <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-tech-mono text-center">
                  Please provide a valid custom donation amount above to enable PayPal checkout.
                </div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center min-h-[140px] bg-[#ffffff] p-2">
                  {/* Loading State Spinner */}
                  {sdkStatus === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-6 space-y-3">
                      <RefreshCw className="w-6 h-6 text-[#C5A253] animate-spin" />
                      <span className="font-tech-mono text-xs text-[#0A1B36]/70 uppercase tracking-wider">
                        Connecting to Secure PayPal Checkout...
                      </span>
                    </div>
                  )}

                  {/* Error State with Retry Button */}
                  {sdkStatus === 'error' && (
                    <div className="w-full p-4 bg-red-50 border border-red-200 text-center space-y-3">
                      <div className="flex items-center justify-center gap-2 text-red-700 font-bold text-xs font-tech-mono">
                        <AlertCircle className="w-4 h-4" />
                        <span>{sdkErrorMessage || 'Unable to load PayPal checkout buttons.'}</span>
                      </div>
                      <p className="font-body-text text-xs text-red-600">
                        Please check your network connection or ad blocker and try again.
                      </p>
                      <button
                        type="button"
                        onClick={loadAndRenderPayPal}
                        className="font-body-text text-xs font-bold tracking-wider bg-[#0A1B36] text-white py-2 px-6 hover:bg-[#C5A253] hover:text-[#0A1B36] uppercase transition-all cursor-pointer shadow-xs"
                      >
                        RETRY PAYPAL CONNECTION
                      </button>
                    </div>
                  )}

                  {/* Official PayPal Hosted-Button Mount Container */}
                  <div className="w-full max-w-md mx-auto">
                    <div
                      id={`paypal-container-${PAYPAL_HOSTED_BUTTON_ID}`}
                      ref={paypalHostRef}
                      className={`w-full ${sdkStatus === 'ready' ? 'block' : 'hidden'}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Post-Checkout Information & Policy */}
            <div className="p-4 bg-[#0A1B36]/5 border border-[#0A1B36]/10 space-y-2 text-xs font-body-text text-[#0A1B36]/80 leading-relaxed font-medium">
              <div className="flex items-center gap-2 font-tech-mono text-[10px] font-bold text-[#0A1B36] uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-[#C5A253]" />
                <span>Thank You for Investing in Their Future</span>
              </div>
              <p>
                Your contribution helps carry Coach William Buck Godfrey’s legacy forward by investing in the next generation. Your payment is processed securely by PayPal. Please check your PayPal confirmation email for official transaction details and your tax receipt.
              </p>
            </div>

            {/* Tax Verification & Security Badges */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] font-tech-mono text-[#0A1B36]/70 gap-2 border-t border-[#0A1B36]/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A253]" />
                <span>Official 501(c)(3) Charitable Endowment</span>
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
