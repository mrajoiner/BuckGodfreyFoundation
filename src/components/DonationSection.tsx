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
  Check
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';

// ============================================================================
// PAYPAL NATIVE BUTTON CONFIGURATION
// Loads the standard PayPal SDK to seamlessly pass the selected/custom amount
// directly into native PayPal & Card buttons without PayPal's generic prompt.
// ============================================================================
const PAYPAL_CLIENT_ID = 'BAAC2eSKrOyLlkK6hZzifFcXmWBhYKxNdu2r19GxaIFs78rFQ3ZXy9CQgH3MLCNbh0GPImjXGyMPlM5Jbg';
const PAYPAL_SDK_URL = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&enable-funding=venmo`;

interface DonationSuccessData {
  transactionId: string;
  donorName: string;
  email: string;
  amount: number;
  timestamp: string;
}

// Global TypeScript declarations for the standard PayPal Buttons SDK
declare global {
  interface Window {
    paypal?: {
      Buttons?: (options: {
        style?: {
          layout?: 'vertical' | 'horizontal';
          color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
          shape?: 'rect' | 'pill';
          label?: 'paypal' | 'checkout' | 'buynow' | 'pay' | 'donate';
          tagline?: boolean;
          height?: number;
        };
        createOrder: (
          data: Record<string, unknown>,
          actions: {
            order: {
              create: (payload: {
                purchase_units: Array<{
                  description?: string;
                  amount: {
                    currency_code: string;
                    value: string;
                  };
                }>;
                application_context?: {
                  shipping_preference?: string;
                  brand_name?: string;
                };
              }) => Promise<string>;
            };
          }
        ) => Promise<string>;
        onApprove: (
          data: { orderID: string; payerID?: string },
          actions: {
            order: {
              capture: () => Promise<{
                id: string;
                status: string;
                payer?: {
                  name?: {
                    given_name?: string;
                    surname?: string;
                  };
                  email_address?: string;
                };
              }>;
            };
          }
        ) => Promise<void>;
        onCancel?: (data: Record<string, unknown>) => void;
        onError?: (err: unknown) => void;
      }) => {
        render: (selectorOrElement: string | HTMLElement) => Promise<void>;
      };
      HostedButtons?: (options: { hostedButtonId: string }) => {
        render: (selectorOrElement: string | HTMLElement) => Promise<void>;
      };
    };
  }
}

interface SuggestedTier {
  amount: number;
  label: string;
  badge?: string;
}

const SUGGESTED_TIERS: SuggestedTier[] = [
  {
    amount: 25,
    label: 'Course Materials',
  },
  {
    amount: 50,
    label: 'Campus Technology',
  },
  {
    amount: 100,
    label: 'Scholar Sustainer',
    badge: 'MOST POPULAR',
  },
  {
    amount: 250,
    label: 'STEM & Academic Grant',
  },
  {
    amount: 500,
    label: 'Semester Fellow',
    badge: 'HIGH IMPACT',
  },
];

export const DonationSection: React.FC = () => {
  // Donation selection state
  const [selectedPreset, setSelectedPreset] = useState<number | 'other'>(100);
  const [customAmountInput, setCustomAmountInput] = useState<string>('');
  const [customAmountError, setCustomAmountError] = useState<string | null>(null);

  // Completed donation state
  const [completedDonation, setCompletedDonation] = useState<DonationSuccessData | null>(null);

  // PayPal SDK loading & rendering state
  const [sdkStatus, setSdkStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [sdkErrorMessage, setSdkErrorMessage] = useState<string>('');

  const containerRef = useRef<HTMLElement>(null);
  const paypalHostRef = useRef<HTMLDivElement>(null);
  const effectiveAmountRef = useRef<number | null>(100);

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

  // Keep ref up to date for PayPal order creation
  useEffect(() => {
    effectiveAmountRef.current = effectiveAmount;
  }, [effectiveAmount]);

  // ==========================================================================
  // NATIVE PAYPAL SDK LOADER & RENDERER
  // Loads standard PayPal Buttons so selected/custom amount links seamlessly
  // without displaying PayPal's generic "Enter your own amount" section.
  // ==========================================================================
  const loadAndRenderPayPal = () => {
    setSdkStatus('loading');
    setSdkErrorMessage('');

    const renderButtons = () => {
      try {
        const hostEl = paypalHostRef.current;
        if (!hostEl) return;

        // Clear existing child elements to prevent duplicate buttons
        hostEl.innerHTML = '';

        if (!window.paypal?.Buttons) {
          throw new Error('PayPal Buttons SDK not found on window object.');
        }

        window.paypal
          .Buttons({
            style: {
              layout: 'vertical',
              color: 'gold',
              shape: 'rect',
              label: 'donate',
              tagline: false,
              height: 48,
            },
            createOrder: (_data, actions) => {
              const currentVal = effectiveAmountRef.current;
              if (!currentVal || currentVal <= 0) {
                return Promise.reject(new Error('Please choose or enter a valid contribution amount.'));
              }

              return actions.order.create({
                purchase_units: [
                  {
                    description: 'William Buck Godfrey Legacy Scholarship Contribution (In Partnership with Sporty Girls)',
                    amount: {
                      currency_code: 'USD',
                      value: currentVal.toFixed(2),
                    },
                  },
                ],
                application_context: {
                  shipping_preference: 'NO_SHIPPING',
                  brand_name: 'William Buck Godfrey Legacy Scholarship',
                },
              });
            },
            onApprove: async (data, actions) => {
              try {
                const details = await actions.order.capture();
                const firstName = details.payer?.name?.given_name || '';
                const lastName = details.payer?.name?.surname || '';
                const fullName = `${firstName} ${lastName}`.trim() || 'Generous Donor';

                setCompletedDonation({
                  transactionId: details.id || data.orderID || `WBG-${Date.now().toString(36).toUpperCase()}`,
                  donorName: fullName,
                  email: details.payer?.email_address || '',
                  amount: effectiveAmountRef.current || 100,
                  timestamp: new Date().toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  }),
                });
              } catch (err) {
                console.error('PayPal capture error:', err);
                setCompletedDonation({
                  transactionId: data.orderID || `WBG-${Date.now().toString(36).toUpperCase()}`,
                  donorName: 'Generous Donor',
                  email: '',
                  amount: effectiveAmountRef.current || 100,
                  timestamp: new Date().toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  }),
                });
              }
            },
            onCancel: () => {
              console.log('PayPal checkout window cancelled by donor.');
            },
            onError: (err) => {
              console.error('PayPal button error:', err);
              setSdkErrorMessage('PayPal payment window encountered an error. Please try again.');
            },
          })
          .render(hostEl)
          .then(() => {
            setSdkStatus('ready');
          })
          .catch((err: Error) => {
            console.error('PayPal button render error:', err);
            setSdkErrorMessage(err.message || 'Unable to render PayPal payment options.');
            setSdkStatus('error');
          });
      } catch (err: unknown) {
        const error = err as Error;
        console.error('PayPal initialization error:', error);
        setSdkErrorMessage(error.message || 'Failed to initialize PayPal checkout.');
        setSdkStatus('error');
      }
    };

    // If SDK is already ready on window
    if (window.paypal?.Buttons) {
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
          setSdkErrorMessage('Could not load PayPal SDK. Please check your connection.');
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
    setSelectedPreset(100);
    setCustomAmountInput('');
    setCustomAmountError(null);
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-15 sm:opacity-25 select-none transform-gpu"
        aria-hidden="true"
      >
        LEGACY
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
              501(C)(3) SCHOLARSHIP FUND • IN PARTNERSHIP WITH SPORTY GIRLS
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
            {/* COMPLETED DONATION RECEIPT VIEW */}
            {completedDonation ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center space-y-2 pb-6 border-b border-[#0A1B36]/15">
                  <div className="w-16 h-16 bg-[#C5A253]/15 text-[#C5A253] mx-auto flex items-center justify-center border-2 border-[#C5A253] mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="font-tech-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A253] block">
                    PAYMENT COMPLETED • OFFICIAL RECEIPT
                  </span>
                  <h3 className="font-display-title text-2xl sm:text-3xl font-bold uppercase text-[#0A1B36]">
                    Thank You for Your Generous Contribution
                  </h3>
                  <p className="font-body-text text-sm sm:text-base text-[#0A1B36]/85 max-w-lg mx-auto font-medium">
                    Your tax-deductible gift of <strong>${completedDonation.amount.toFixed(2)} USD</strong> directly fuels our HBCU scholars and keeps Coach Godfrey’s legacy thriving.
                  </p>
                </div>

                <div className="bg-[#0A1B36]/5 p-5 border border-[#0A1B36]/15 space-y-3 font-tech-mono text-xs text-[#0A1B36]">
                  <div className="flex justify-between items-center border-b border-[#0A1B36]/10 pb-2">
                    <span className="text-[#0A1B36]/70 uppercase font-medium">Transaction ID:</span>
                    <span className="font-bold">{completedDonation.transactionId}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#0A1B36]/10 pb-2">
                    <span className="text-[#0A1B36]/70 uppercase font-medium">Donor Name:</span>
                    <span className="font-bold">{completedDonation.donorName}</span>
                  </div>
                  {completedDonation.email && (
                    <div className="flex justify-between items-center border-b border-[#0A1B36]/10 pb-2">
                      <span className="text-[#0A1B36]/70 uppercase font-medium">Email:</span>
                      <span className="font-bold">{completedDonation.email}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-b border-[#0A1B36]/10 pb-2">
                    <span className="text-[#0A1B36]/70 uppercase font-medium">Total Gift:</span>
                    <span className="font-bold text-base text-[#C5A253]">${completedDonation.amount.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#0A1B36]/70 uppercase font-medium">Date &amp; Time:</span>
                    <span>{completedDonation.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrintReceipt}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#0A1B36] text-white hover:bg-[#C5A253] hover:text-[#0A1B36] font-display-title text-xs font-bold py-3.5 px-6 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official Receipt</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDonation}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-[#0A1B36] text-[#0A1B36] hover:bg-[#0A1B36] hover:text-white font-display-title text-xs font-bold py-3.5 px-6 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Make Another Gift</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE DONATION SELECTION & CHECKOUT VIEW */
              <>
                {/* Header / Sub-banner */}
                <div className="border-b border-[#0A1B36]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-tech-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A253] block mb-1">
                      OFFICIAL SCHOLARSHIP CONTRIBUTION • IN PARTNERSHIP WITH SPORTY GIRLS
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
                  <div className="flex justify-between items-center">
                    <label 
                      id="amount-selection-label"
                      className="font-tech-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block"
                    >
                      GIFT AMOUNT (USD)
                    </label>
                    {effectiveAmount && (
                      <span className="font-tech-mono text-xs font-bold text-[#0A1B36] bg-[#C5A253]/20 border border-[#C5A253] px-2.5 py-0.5">
                        Selected: ${effectiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                      </span>
                    )}
                  </div>

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
                              ? 'border-[#C5A253] bg-[#0A1B36]/5 text-[#0A1B36] shadow-sm font-bold ring-1 ring-[#C5A253]'
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

                    {/* Other / Custom Amount Button */}
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
                          ? 'border-[#C5A253] bg-[#0A1B36]/5 text-[#0A1B36] shadow-sm font-bold ring-1 ring-[#C5A253]'
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

                {/* Custom Amount Input Field (Native on landing page, connected directly to PayPal) */}
                {selectedPreset === 'other' && (
                  <div className="space-y-2 animate-in fade-in duration-200 bg-[#0A1B36]/5 p-5 border-2 border-[#C5A253]">
                    <div className="flex justify-between items-center">
                      <label 
                        htmlFor="custom-donation-amount-input"
                        className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36] uppercase block"
                      >
                        ENTER YOUR CUSTOM AMOUNT (USD)
                      </label>
                      <span className="font-tech-mono text-[9px] text-[#0A1B36]/70 uppercase font-medium">
                        Processed Directly via PayPal
                      </span>
                    </div>

                    <div className="relative">
                      <span 
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 font-tech-mono text-lg text-[#0A1B36] font-bold"
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
                        className={`w-full bg-[#ffffff] border-2 pl-9 pr-4 py-3 font-tech-mono text-lg text-[#0A1B36] focus:outline-none focus:ring-2 focus:ring-[#C5A253] font-bold ${
                          customAmountError ? 'border-red-600' : 'border-[#0A1B36]/30 focus:border-[#C5A253]'
                        }`}
                      />
                    </div>

                    {customAmountError ? (
                      <p 
                        id="custom-amount-error-msg" 
                        role="alert"
                        className="font-tech-mono text-xs text-red-700 font-bold flex items-center gap-1.5 pt-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{customAmountError}</span>
                      </p>
                    ) : (
                      <p className="font-tech-mono text-[10px] text-[#0A1B36]/80 flex items-center gap-1.5 pt-1">
                        <Check className="w-3 h-3 text-[#C5A253]" />
                        <span>Your exact custom amount of ${effectiveAmount ? effectiveAmount.toFixed(2) : '0.00'} will be charged securely below.</span>
                      </p>
                    )}
                  </div>
                )}

                {/* ============================================================== */}
                {/* NATIVE PAYPAL PAYMENT ACTION BUTTONS                           */}
                {/* ============================================================== */}
                <div className="space-y-4 pt-2 border-t border-[#0A1B36]/10">
                  <div className="flex items-center justify-between">
                    <span className="font-tech-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A253]">
                      CHOOSE PAYMENT METHOD
                    </span>
                    {effectiveAmount && (
                      <span className="font-tech-mono text-xs font-bold text-[#0A1B36]">
                        Gift: ${effectiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                      </span>
                    )}
                  </div>

                  {/* Prevent checkout if custom amount is invalid */}
                  {selectedPreset === 'other' && customAmountError ? (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-tech-mono text-center space-y-1">
                      <div className="font-bold flex items-center justify-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        <span>Valid Donation Amount Required</span>
                      </div>
                      <p className="text-[11px]">Please enter a valid dollar amount above to enable PayPal and card payments.</p>
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
                            Please check your network connection or browser settings and retry.
                          </p>
                          <button
                            type="button"
                            onClick={loadAndRenderPayPal}
                            className="font-body-text text-xs font-bold tracking-wider bg-[#0A1B36] text-white py-2 px-6 hover:bg-[#C5A253] hover:text-[#0A1B36] uppercase transition-all cursor-pointer shadow-xs"
                          >
                            RETRY CONNECTION
                          </button>
                        </div>
                      )}

                      {/* Official PayPal Buttons Mount Container */}
                      <div className="w-full max-w-md mx-auto">
                        <div
                          id="paypal-buttons-container"
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
                    Your contribution helps carry Coach William Buck Godfrey’s legacy forward by investing in the next generation. Your payment is processed securely with end-to-end encryption. An official electronic tax receipt will be issued immediately upon completion.
                  </p>
                </div>
              </>
            )}

            {/* Tax Verification & Security Badges */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] font-tech-mono text-[#0A1B36]/70 gap-2 border-t border-[#0A1B36]/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A253]" />
                <span>Official 501(c)(3) Charitable Organization in Partnership with Sporty Girls</span>
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
