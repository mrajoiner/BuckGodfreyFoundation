import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  Copy, 
  Check, 
  Code, 
  CreditCard,
  Building2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface DonationSectionProps {
  onOpenSupportModal?: () => void;
}

interface GivingTier {
  amount: number;
  label: string;
  impact: string;
  badge?: string;
}

const GIVING_TIERS: GivingTier[] = [
  {
    amount: 25,
    label: 'Course Materials Supporter',
    impact: 'Provides essential textbooks and course software licenses for one academic term.',
  },
  {
    amount: 50,
    label: 'Campus Technology Fund',
    impact: 'Funds high-speed wireless campus data access and engineering lab supplies.',
  },
  {
    amount: 100,
    label: 'Monthly Scholar Sustainer',
    impact: 'Provides essential living and nutritional stipends for student-athletes.',
    badge: 'MOST POPULAR',
  },
  {
    amount: 250,
    label: 'STEM & Academic Grant',
    impact: 'Covers specialized engineering hardware, laptop accessories, and exam prep fees.',
  },
  {
    amount: 500,
    label: 'Semester Book & Lab Fellow',
    impact: 'Completely eliminates out-of-pocket textbook and laboratory fees for an entire semester.',
    badge: 'HIGH IMPACT',
  },
  {
    amount: 1000,
    label: 'Champion Scholar Endower',
    impact: 'Funds a semester living stipend plus year-round executive mentorship and career placement.',
  },
  {
    amount: 2500,
    label: 'Full Semester HBCU Tuition',
    impact: 'Directly pays one full semester of comprehensive undergraduate tuition at an accredited HBCU.',
    badge: 'LEGACY PILLAR',
  },
];

export const DonationSection: React.FC<DonationSectionProps> = ({ onOpenSupportModal }) => {
  const [frequency, setFrequency] = useState<'monthly' | 'once'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [designation, setDesignation] = useState<string>('Four-Year HBCU Tuition Fund');
  const [dedication, setDedication] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [showDevCode, setShowDevCode] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState<boolean>(false);

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const currentImpactDescription = () => {
    if (customAmount) {
      const val = parseFloat(customAmount) || 0;
      if (val >= 2500) return 'Directly provides full-semester HBCU tuition grants, eliminating debt completely.';
      if (val >= 1000) return 'Funds comprehensive semester stipends, technology packages, and alumni mentorship.';
      if (val >= 500) return 'Covers semester-long STEM lab fees, books, and student-athlete nutritional stipends.';
      if (val >= 100) return 'Supplies monthly study aids, tech licenses, and emergency travel support.';
      return 'Every single dollar directly supports our collegiate HBCU scholar cohorts.';
    }
    const found = GIVING_TIERS.find((t) => t.amount === selectedAmount);
    return found ? found.impact : 'Directly empowers our next generation of HBCU leaders.';
  };

  const handleSimulatedPayPal = (method: 'paypal' | 'card') => {
    if (onOpenSupportModal) {
      onOpenSupportModal();
    } else {
      setIsCompletedModalOpen(true);
    }
  };

  const handleCopyCodeSnippet = () => {
    const snippet = `<!-- PayPal Donation Button Container -->
<div id="paypal-donate-button-container"></div>
<script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" charset="UTF-8"></script>
<script>
  PayPal.Donation.Button({
    env: 'production',
    hosted_button_id: 'YOUR_PAYPAL_HOSTED_BUTTON_ID',
    image: {
      src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
      alt: 'Donate with PayPal button',
      title: 'PayPal - The safer, easier way to pay online!',
    }
  }).render('#paypal-donate-button-container');
</script>`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section
      id="donate"
      className="py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-20 bg-[#F8FAFC] border-t border-b border-[#1B365D]/10 relative text-[#1B365D]"
    >
      {/* Massive Background Typography Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="bg-text-massive opacity-5">
          DONATE
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#1B365D]/15 bg-white mb-6 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A253] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A253]"></span>
            </span>
            <span className="font-tech-mono text-[10px] font-bold tracking-[0.25em] text-[#C5A253] uppercase">
              501(C)(3) TAX-DEDUCTIBLE FOUNDATION
            </span>
          </div>

          <h2
            id="donation-section-heading"
            className="font-display-title text-3xl sm:text-5xl md:text-6xl text-[#1B365D] font-black uppercase tracking-tight leading-[0.95] mb-6"
          >
            INVEST IN GENERATIONAL EXCELLENCE.{' '}
            <span className="text-[#C5A253]">DONATE TODAY.</span>
          </h2>

          <p className="font-body-text text-base sm:text-lg md:text-xl text-[#1B365D]/80 leading-relaxed font-normal">
            Your philanthropic gift directly removes financial barriers for brilliant student-athletes attending 
            Historically Black Colleges and Universities (HBCUs). By investing in the William Buck Godfrey Legacy Scholarship, 
            you help build a pipeline of doctors, engineers, educators, and community champions who graduate debt-free.
          </p>
        </div>

        {/* 2-Column Grid: Persuasive Benefits & PayPal Interactive Giving Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: 6 Compelling Persuasive Reasons to Donate */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-white border border-[#1B365D]/12 p-6 sm:p-8 shadow-xs">
              <span className="font-tech-mono text-[10px] font-bold tracking-widest text-[#C5A253] uppercase block mb-2">
                TRANSFORMATIVE PHILANTHROPY
              </span>
              <h3 className="font-display-title text-xl sm:text-2xl text-[#1B365D] font-black uppercase tracking-tight mb-4">
                Why Your Contribution Matters
              </h3>
              <p className="font-body-text text-sm text-[#1B365D]/75 leading-relaxed">
                Coach William 'Buck' Godfrey believed that athletic discipline must always be matched with academic mastery. 
                Today, rising college costs threaten to derail our most promising young scholars. Your tax-deductible contribution 
                ensures talent is never held back by tuition.
              </p>

              {/* Persuasive Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-[#1B365D]/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#1B365D]">
                    <div className="w-8 h-8 rounded bg-[#F8FAFC] border border-[#1B365D]/15 flex items-center justify-center text-[#C5A253]">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h4 className="font-display-title text-xs font-bold uppercase tracking-wider">
                      Eliminate Debt
                    </h4>
                  </div>
                  <p className="font-body-text text-xs text-[#1B365D]/70 leading-relaxed">
                    Over 70% of HBCU students borrow heavily. We fund full scholarships so graduates enter the workforce financially unburdened.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#1B365D]">
                    <div className="w-8 h-8 rounded bg-[#F8FAFC] border border-[#1B365D]/15 flex items-center justify-center text-[#C5A253]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="font-display-title text-xs font-bold uppercase tracking-wider">
                      100% Direct Allocation
                    </h4>
                  </div>
                  <p className="font-body-text text-xs text-[#1B365D]/70 leading-relaxed">
                    Every donated dollar goes directly toward student tuition, books, STEM hardware, and collegiate living stipends.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#1B365D]">
                    <div className="w-8 h-8 rounded bg-[#F8FAFC] border border-[#1B365D]/15 flex items-center justify-center text-[#C5A253]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-display-title text-xs font-bold uppercase tracking-wider">
                      501(c)(3) Tax Benefits
                    </h4>
                  </div>
                  <p className="font-body-text text-xs text-[#1B365D]/70 leading-relaxed">
                    Enjoy the highest federal and state charitable tax deductions. Instant electronic receipts issued immediately.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#1B365D]">
                    <div className="w-8 h-8 rounded bg-[#F8FAFC] border border-[#1B365D]/15 flex items-center justify-center text-[#C5A253]">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h4 className="font-display-title text-xs font-bold uppercase tracking-wider">
                      Corporate Matching
                    </h4>
                  </div>
                  <p className="font-body-text text-xs text-[#1B365D]/70 leading-relaxed">
                    Double or triple your impact. Our foundation is fully registered for corporate matching gift programs nationwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Metric Proofs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-[#1B365D]/12 p-4 text-center">
                <span className="font-display-title text-2xl sm:text-3xl font-black text-[#1B365D] block">
                  100%
                </span>
                <span className="font-tech-mono text-[9px] text-[#C5A253] font-bold uppercase tracking-wider">
                  Direct Student Aid
                </span>
              </div>
              <div className="bg-white border border-[#1B365D]/12 p-4 text-center">
                <span className="font-display-title text-2xl sm:text-3xl font-black text-[#1B365D] block">
                  4-YEAR
                </span>
                <span className="font-tech-mono text-[9px] text-[#C5A253] font-bold uppercase tracking-wider">
                  Degree Support
                </span>
              </div>
              <div className="bg-white border border-[#1B365D]/12 p-4 text-center">
                <span className="font-display-title text-2xl sm:text-3xl font-black text-[#1B365D] block">
                  $0
                </span>
                <span className="font-tech-mono text-[9px] text-[#C5A253] font-bold uppercase tracking-wider">
                  Scholar Debt Goal
                </span>
              </div>
            </div>

            {/* Endorsement Quote */}
            <div className="bg-[#1B365D] text-white p-6 sm:p-7 border border-[#C5A253]/30 shadow-md">
              <p className="font-body-text text-sm sm:text-base italic text-white/90 leading-relaxed mb-3">
                "When you educate and elevate a scholar-athlete at an HBCU, you don't just change a student's life — you alter the trajectory of their entire family for generations."
              </p>
              <div className="flex items-center justify-between text-xs font-tech-mono text-[#C5A253] uppercase tracking-wider font-bold">
                <span>The William Buck Godfrey Legacy Foundation</span>
                <span>Atlanta, Georgia</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Donation & PayPal Integration Console */}
          <div className="lg:col-span-6">
            <div
              id="donation-card-container"
              className="bg-white border-2 border-[#1B365D]/20 p-6 sm:p-8 shadow-xl relative"
            >
              {/* Header Ribbon */}
              <div className="flex items-center justify-between border-b border-[#1B365D]/10 pb-5 mb-6">
                <div>
                  <span className="font-tech-mono text-[10px] font-bold tracking-widest text-[#C5A253] uppercase block">
                    MAKE A SECURE CONTRIBUTION
                  </span>
                  <h3 className="font-display-title text-2xl text-[#1B365D] font-black uppercase tracking-tight">
                    Donate to the Scholarship
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-tech-mono font-semibold text-[#1B365D]/60 uppercase bg-[#F8FAFC] px-2.5 py-1 border border-[#1B365D]/10">
                  <Lock className="w-3 h-3 text-[#C5A253]" />
                  <span>256-Bit SSL</span>
                </div>
              </div>

              {/* Giving Frequency Selector */}
              <div className="mb-6">
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-2">
                  CHOOSE GIVING FREQUENCY
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-3 px-4 font-body-text text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-sm'
                        : 'bg-[#F8FAFC] text-[#1B365D]/70 border-[#1B365D]/15 hover:border-[#1B365D]/40'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A253]" />
                    MONTHLY SUSTAINER
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('once')}
                    className={`py-3 px-4 font-body-text text-xs font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                      frequency === 'once'
                        ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-sm'
                        : 'bg-[#F8FAFC] text-[#1B365D]/70 border-[#1B365D]/15 hover:border-[#1B365D]/40'
                    }`}
                  >
                    ONE-TIME GIFT
                  </button>
                </div>
              </div>

              {/* Amount Selection Grid */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase">
                    SELECT CONTRIBUTION AMOUNT
                  </label>
                  <span className="font-tech-mono text-[10px] text-[#C5A253] font-bold uppercase">
                    USD ($)
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {GIVING_TIERS.map((tier) => {
                    const isSelected = selectedAmount === tier.amount && !customAmount;
                    return (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(tier.amount);
                          setCustomAmount('');
                        }}
                        className={`p-3 text-left border transition-all flex flex-col justify-between cursor-pointer relative ${
                          isSelected
                            ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-md ring-2 ring-[#C5A253]/50'
                            : 'bg-[#F8FAFC] text-[#1B365D] border-[#1B365D]/15 hover:border-[#1B365D]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-display-title text-xl font-bold">${tier.amount}</span>
                          {tier.badge && (
                            <span
                              className={`text-[8px] font-tech-mono font-black uppercase tracking-wider px-1.5 py-0.5 ${
                                isSelected
                                  ? 'bg-[#C5A253] text-[#1B365D]'
                                  : 'bg-[#1B365D]/10 text-[#1B365D]'
                              }`}
                            >
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <span
                          className={`font-body-text text-[10px] mt-1.5 truncate ${
                            isSelected ? 'text-[#C5A253] font-semibold' : 'text-[#1B365D]/60'
                          }`}
                        >
                          {tier.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* Custom Amount Field */}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="CUSTOM $"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full h-full min-h-[64px] bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-display-title text-base sm:text-lg text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden placeholder:font-tech-mono placeholder:text-[10px] placeholder:uppercase placeholder:text-[#1B365D]/40"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Real-Time Impact Preview Banner */}
              <div className="mb-6 p-4 bg-[#F8FAFC] border-l-4 border-[#C5A253] border-y border-r border-[#1B365D]/10">
                <div className="flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-[#C5A253] shrink-0 mt-0.5 fill-[#C5A253]/20" />
                  <div>
                    <span className="font-tech-mono text-[10px] font-bold text-[#C5A253] uppercase tracking-wider block">
                      IMPACT OF ${activeAmount} {frequency === 'monthly' ? 'PER MONTH' : 'GIFT'}:
                    </span>
                    <p className="font-body-text text-xs text-[#1B365D]/80 mt-0.5 leading-snug">
                      {currentImpactDescription()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fund Designation Selector */}
              <div className="mb-5">
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1.5">
                  DESIGNATE SCHOLARSHIP FUND
                </label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-xs sm:text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden cursor-pointer"
                >
                  <option value="Four-Year HBCU Tuition Fund">Four-Year HBCU Tuition Fund (Highest Need)</option>
                  <option value="STEM & Technology Stipends">STEM, Computer &amp; Laboratory Stipends</option>
                  <option value="Student-Athlete Nutrition & Living">Student-Athlete Living &amp; Book Grants</option>
                  <option value="Executive Mentorship Program">Executive Mentorship &amp; Leadership Initiative</option>
                  <option value="General Legacy Endowment">General Legacy Endowment (Where Needed Most)</option>
                </select>
              </div>

              {/* Dedication or Tribute */}
              <div className="mb-6">
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1.5">
                  TRIBUTE OR MEMORIAL NOTE (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="In honor of Coach Godfrey / Southwest DeKalb Class of '93..."
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-xs text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                />
              </div>

              {/* PAYPAL CHECKOUT AREA */}
              <div className="space-y-3 pt-2">
                <div className="text-center mb-2">
                  <span className="font-tech-mono text-[10px] font-bold uppercase tracking-widest text-[#1B365D]/60">
                    COMPLETE SECURE DONATION VIA PAYPAL
                  </span>
                </div>

                {/* Primary PayPal Gold Button */}
                <button
                  id="paypal-primary-donate-btn"
                  onClick={() => handleSimulatedPayPal('paypal')}
                  className="w-full bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-bold py-4 px-6 transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer group"
                >
                  <svg className="h-5 w-auto" viewBox="0 0 100 32" fill="none">
                    {/* Official PayPal Logo Styling Vector */}
                    <path
                      d="M12.4 4.5h6.7c3.7 0 6.6.8 8.1 2.3 1.3 1.3 1.8 3.1 1.4 5.3-.8 4.6-3.8 7.3-8.8 7.3h-3.6l-1.8 11.5H8.7l4.7-26.4h-1zm5.2 9.5h2.8c2.4 0 4.1-.9 4.7-2.8.4-1.2.2-2.1-.5-2.8-.7-.7-2-1-3.8-1h-2.1l-1.1 6.6z"
                      fill="#003087"
                    />
                    <path
                      d="M32.8 12.3h5.4l-.7 4.1h-.2c.8-1.3 2.3-2.1 4.1-2.1 3.2 0 5.4 2.4 4.8 6.1-.8 4.6-4.1 8-8.2 8-1.8 0-3.1-.7-3.7-1.9h-.2l-1.4 7.6h-5.4l5.4-21.8zm6.5 10.6c1.8 0 3.3-1.4 3.7-3.4.3-2-.7-3.4-2.5-3.4-1.8 0-3.3 1.4-3.7 3.4-.4 2 .7 3.4 2.5 3.4z"
                      fill="#0079C1"
                    />
                    <path
                      d="M48.8 12.3h5.4l-3.3 15.6h-5.4l3.3-15.6z"
                      fill="#0079C1"
                    />
                    <path
                      d="M60.8 12.3h5.4l-.7 4.1h-.2c.8-1.3 2.3-2.1 4.1-2.1 3.2 0 5.4 2.4 4.8 6.1-.8 4.6-4.1 8-8.2 8-1.8 0-3.1-.7-3.7-1.9h-.2l-1.4 7.6h-5.4l5.4-21.8zm6.5 10.6c1.8 0 3.3-1.4 3.7-3.4.3-2-.7-3.4-2.5-3.4-1.8 0-3.3 1.4-3.7 3.4-.4 2 .7 3.4 2.5 3.4z"
                      fill="#0079C1"
                    />
                  </svg>
                  <span className="font-body-text text-sm font-black uppercase tracking-wider text-[#003087]">
                    DONATE ${activeAmount} WITH PAYPAL
                  </span>
                </button>

                {/* Secondary Debit or Credit Card Button */}
                <button
                  id="paypal-card-donate-btn"
                  onClick={() => handleSimulatedPayPal('card')}
                  className="w-full bg-[#1B365D] hover:bg-[#C5A253] text-white hover:text-[#1B365D] font-body-text text-xs sm:text-sm font-bold tracking-[0.2em] py-3.5 px-6 transition-all duration-200 flex items-center justify-center gap-2 uppercase cursor-pointer shadow-md"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>DONATE WITH DEBIT OR CREDIT CARD</span>
                </button>

                {/* Tax & Security Verification Footer */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between text-[10px] font-tech-mono text-[#1B365D]/60 gap-2 border-t border-[#1B365D]/10">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A253]" />
                    <span>Official 501(c)(3) Receipt Issued</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A253]" />
                    <span>Cancel Recurring Gifts Anytime</span>
                  </div>
                </div>

                {/* Developer / Admin PayPal Code Snippet Helper */}
                <div className="mt-6 pt-4 border-t border-dashed border-[#1B365D]/20">
                  <button
                    type="button"
                    onClick={() => setShowDevCode(!showDevCode)}
                    className="text-[11px] font-tech-mono text-[#1B365D]/70 hover:text-[#C5A253] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>{showDevCode ? 'Hide PayPal Code Embed Guide' : 'PayPal Code Embed Instructions (For Webmaster)'}</span>
                  </button>

                  {showDevCode && (
                    <div className="mt-3 p-4 bg-[#F1F5F9] border border-[#1B365D]/15 text-left text-xs font-tech-mono space-y-3 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#1B365D]">PayPal Integration Snippet</span>
                        <button
                          onClick={handleCopyCodeSnippet}
                          className="flex items-center gap-1 text-[10px] bg-white border border-[#1B365D]/20 px-2 py-1 hover:border-[#C5A253] cursor-pointer"
                        >
                          {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-[#1B365D]/70 leading-relaxed font-body-text">
                        When you generate your custom Donate button from your PayPal.com Business account (under <em>PayPal Buttons → Donate</em>), 
                        you can place your <strong>hosted_button_id</strong> or full embed snippet directly in this container.
                      </p>
                      <pre className="p-2.5 bg-[#1B365D] text-white text-[10px] overflow-x-auto leading-relaxed">
{`<div id="paypal-donate-button-container"></div>
<script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" charset="UTF-8"></script>
<script>
  PayPal.Donation.Button({
    env: 'production',
    hosted_button_id: 'YOUR_PAYPAL_BUTTON_ID'
  }).render('#paypal-donate-button-container');
</script>`}
                      </pre>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Confirmation Modal for Quick PayPal Mock Click */}
      {isCompletedModalOpen && (
        <div
          id="donation-completed-dialog"
          className="fixed inset-0 z-50 bg-[#1B365D]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            className="bg-white border-2 border-[#C5A253] max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 text-center text-[#1B365D]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-[#F8FAFC] border border-[#C5A253] mx-auto flex items-center justify-center text-[#C5A253]">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="font-tech-mono text-xs font-bold tracking-widest text-[#C5A253] uppercase">
                PAYPAL CHECKOUT INITIATED
              </span>
              <h4 className="font-display-title text-2xl font-black uppercase tracking-tight">
                Thank You for Supporting the Legacy!
              </h4>
              <p className="font-body-text text-sm text-[#1B365D]/75 leading-relaxed">
                You selected a commitment of{' '}
                <strong className="text-[#1B365D]">
                  ${activeAmount} {frequency === 'monthly' ? '/ month' : 'one-time'}
                </strong>{' '}
                allocated to the <span className="text-[#C5A253] font-bold">{designation}</span>.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#1B365D]/10 text-left text-xs font-tech-mono space-y-1.5 text-[#1B365D]/75">
              <div className="flex justify-between">
                <span>Selected Amount:</span>
                <span className="font-bold text-[#1B365D]">${activeAmount}.00 USD</span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span className="font-bold text-[#1B365D] uppercase">{frequency === 'monthly' ? 'Monthly Sustainer' : 'One-Time'}</span>
              </div>
              <div className="flex justify-between">
                <span>Charity Tax ID:</span>
                <span className="font-bold text-[#1B365D]">501(c)(3) Exempt</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => setIsCompletedModalOpen(false)}
                className="w-full font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-3.5 px-6 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase cursor-pointer"
              >
                RETURN TO FOUNDATION PAGE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
