import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  CreditCard
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { FadeInView } from './FadeInView';

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

export const DonationSection: React.FC = () => {
  const [frequency, setFrequency] = useState<'monthly' | 'once'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [dedication, setDedication] = useState<string>('');
  const [completedDonation, setCompletedDonation] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<{ firstName: string; lastName: string; phone: string; email: string }>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const containerRef = useRef<HTMLElement>(null);

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

  const handleSimulatedPayPal = () => {
    setCompletedDonation(true);
  };

  return (
    <section
      ref={containerRef}
      id="donate"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 overflow-hidden bg-[#ffffff] border-t border-[#0A1B36]/10"
    >
      {/* Background Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-text-massive pointer-events-none opacity-15 sm:opacity-25 select-none transform-gpu"
      >
        ENDOW
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-tech-mono text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block">
              501(C)(3) ENDOWMENT
            </span>
            <h2
              id="donation-section-title"
              className="font-display-title text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#0A1B36]"
            >
              INVEST IN TOMORROW'S LEADERS
            </h2>
            <p className="font-body-text text-sm sm:text-base md:text-lg text-[#0A1B36]/90 leading-relaxed max-w-2xl mx-auto font-medium">
              Coach Godfrey believed in giving back and creating pathways to higher education. Your gift empowers promising student-scholars to thrive at historically Black colleges and universities.
            </p>
          </div>
        </FadeInView>

        {/* Centered Donation Form Console */}
        <FadeInView direction="up" delay={0.2}>
          <div
            id="donation-checkout-card"
            className="bg-[#ffffff] border-2 border-[#0A1B36] p-6 sm:p-8 md:p-10 shadow-2xl space-y-6 sm:space-y-8 relative"
          >
            {completedDonation ? (
              /* Inline Confirmation Card */
              <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#ffffff] border-2 border-[#C5A253] mx-auto flex items-center justify-center text-[#C5A253]">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="font-tech-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#C5A253] uppercase">
                    CONTRIBUTION RECORDED
                  </span>
                  <h3 className="font-display-title text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0A1B36]">
                    Thank You For Fueling The Legacy!
                  </h3>
                  <p className="font-body-text text-sm text-[#0A1B36]/90 max-w-md mx-auto font-medium">
                    Your commitment of <strong>${activeAmount} {frequency === 'monthly' ? '/ month' : 'one-time'}</strong> directly powers our HBCU Scholar cohorts.
                  </p>
                </div>

                <div className="p-4 bg-[#ffffff] border border-[#0A1B36]/15 text-left text-xs font-tech-mono space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span>Pledge Amount:</span>
                    <strong className="text-[#0A1B36]">${activeAmount}.00 USD</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <strong className="text-[#0A1B36] uppercase">{frequency === 'monthly' ? 'Monthly Sustainer' : 'One-Time'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Status:</span>
                    <strong className="text-[#0A1B36]">Official 501(c)(3) Receipt Issued</strong>
                  </div>
                </div>

                <button
                  onClick={() => setCompletedDonation(false)}
                  className="font-body-text text-xs font-bold tracking-widest bg-[#0A1B36] text-white py-3 px-8 hover:bg-[#C5A253] hover:text-[#0A1B36] uppercase transition-all cursor-pointer"
                >
                  MAKE ANOTHER CONTRIBUTION
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0A1B36]/10 pb-4">
                  <div>
                    <span className="font-tech-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A253] block mb-1">
                      SELECT CONTRIBUTION FREQUENCY
                    </span>
                    <h3 className="font-display-title text-xl sm:text-2xl font-bold uppercase text-[#0A1B36]">
                      Pledge Your Support
                    </h3>
                  </div>

                  {/* Frequency Toggle */}
                  <div className="inline-flex bg-[#ffffff] border border-[#0A1B36]/20 p-1 self-start sm:self-auto">
                    <button
                      id="freq-btn-monthly"
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`font-body-text text-xs font-bold tracking-wider py-2 px-3.5 sm:px-4 uppercase transition-all cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-[#0A1B36] text-white shadow-xs'
                          : 'text-[#0A1B36]/80 hover:text-[#0A1B36]'
                      }`}
                    >
                      MONTHLY
                    </button>
                    <button
                      id="freq-btn-once"
                      type="button"
                      onClick={() => setFrequency('once')}
                      className={`font-body-text text-xs font-bold tracking-wider py-2 px-3.5 sm:px-4 uppercase transition-all cursor-pointer ${
                        frequency === 'once'
                          ? 'bg-[#0A1B36] text-white shadow-xs'
                          : 'text-[#0A1B36]/80 hover:text-[#0A1B36]'
                      }`}
                    >
                      ONE-TIME
                    </button>
                  </div>
                </div>

                {/* Preset Amount Grid */}
                <div className="space-y-3">
                  <label className="font-tech-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block">
                    GIFT AMOUNT (USD)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                    {GIVING_TIERS.slice(0, 4).map((tier) => {
                      const isSelected = selectedAmount === tier.amount && !customAmount;
                      return (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(tier.amount);
                            setCustomAmount('');
                          }}
                          className={`p-3 sm:p-4 text-center border-2 transition-all cursor-pointer flex flex-col justify-center items-center relative ${
                            isSelected
                              ? 'border-[#C5A253] bg-[#ffffff] text-[#0A1B36] shadow-sm'
                              : 'border-[#0A1B36]/15 bg-[#ffffff] text-[#0A1B36]/90 hover:border-[#0A1B36]/50'
                          }`}
                        >
                          {tier.badge && (
                            <span className="absolute -top-2.5 right-2 bg-[#C5A253] text-[#0A1B36] text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5">
                              {tier.badge}
                            </span>
                          )}
                          <span className="font-display-title text-xl sm:text-2xl font-bold">
                            ${tier.amount}
                          </span>
                          <span className="font-tech-mono text-[9px] text-[#0A1B36]/70 uppercase tracking-tight mt-0.5 font-medium">
                            {frequency === 'monthly' ? '/ month' : 'gift'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Higher Tiers */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                    {GIVING_TIERS.slice(4).map((tier) => {
                      const isSelected = selectedAmount === tier.amount && !customAmount;
                      return (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(tier.amount);
                            setCustomAmount('');
                          }}
                          className={`p-2.5 sm:p-3 text-center border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C5A253] bg-[#ffffff] text-[#0A1B36] font-bold'
                              : 'border-[#0A1B36]/15 bg-[#ffffff] text-[#0A1B36]/80 hover:border-[#0A1B36]/50'
                          }`}
                        >
                          <span className="font-display-title text-base sm:text-lg font-bold block">${tier.amount}</span>
                          <span className="font-tech-mono text-[8px] text-[#0A1B36]/70 uppercase">{tier.label.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount Input */}
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block mb-1.5">
                    OR ENTER CUSTOM AMOUNT ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-tech-mono text-sm text-[#0A1B36]/70 font-bold">$</span>
                    <input
                      type="number"
                      min="5"
                      placeholder="e.g. 500"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 pl-8 pr-4 py-3 font-tech-mono text-sm text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden font-bold"
                    />
                  </div>
                </div>

                {/* Donor Details: First Name, Last Name, Phone, Email */}
                <div className="space-y-3 pt-1 border-t border-[#0A1B36]/10">
                  <span className="font-tech-mono text-[10px] font-bold tracking-widest text-[#C5A253] uppercase block">
                    DONOR INFORMATION (FOR RECEIPT)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={donorName.firstName}
                      onChange={(e) => setDonorName({ ...donorName, firstName: e.target.value })}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-2.5 font-body-text text-xs text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={donorName.lastName}
                      onChange={(e) => setDonorName({ ...donorName, lastName: e.target.value })}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-2.5 font-body-text text-xs text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={donorName.email}
                      onChange={(e) => setDonorName({ ...donorName, email: e.target.value })}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-2.5 font-body-text text-xs text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={donorName.phone}
                      onChange={(e) => setDonorName({ ...donorName, phone: e.target.value })}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-2.5 font-body-text text-xs text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Tribute Note */}
                <div>
                  <label className="font-tech-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block mb-1">
                    TRIBUTE OR MEMORIAL NOTE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="In honor of Coach Godfrey / Southwest DeKalb Class of '93..."
                    value={dedication}
                    onChange={(e) => setDedication(e.target.value)}
                    className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-2.5 font-body-text text-xs text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>

                {/* Dynamic Impact Summary Callout */}
                <div className="p-3.5 bg-[#ffffff] border-l-4 border-[#C5A253] border border-[#0A1B36]/10 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#C5A253] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-tech-mono text-[10px] font-bold text-[#0A1B36] uppercase block">
                      YOUR IMPACT (${activeAmount} {frequency === 'monthly' ? '/ MO' : 'GIFT'})
                    </span>
                    <p className="font-body-text text-xs text-[#0A1B36]/90 mt-0.5 leading-relaxed font-medium">
                      {currentImpactDescription()}
                    </p>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-3 pt-1">
                  {/* PayPal Button */}
                  <button
                    id="paypal-primary-donate-btn"
                    onClick={handleSimulatedPayPal}
                    className="w-full bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-bold py-4 px-6 transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer group min-h-[48px]"
                  >
                    <span className="font-body-text text-xs sm:text-sm font-black uppercase tracking-wider text-[#003087]">
                      DONATE ${activeAmount} WITH PAYPAL
                    </span>
                  </button>

                  {/* Card Button */}
                  <button
                    id="paypal-card-donate-btn"
                    onClick={handleSimulatedPayPal}
                    className="w-full bg-[#0A1B36] hover:bg-[#C5A253] text-white hover:text-[#0A1B36] font-body-text text-xs sm:text-sm font-bold tracking-[0.2em] py-3.5 px-5 transition-all duration-200 flex items-center justify-center gap-2 uppercase cursor-pointer shadow-md min-h-[48px]"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>DONATE WITH DEBIT OR CREDIT CARD</span>
                  </button>
                </div>

                {/* Tax verification */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] font-tech-mono text-[#0A1B36]/70 gap-2 border-t border-[#0A1B36]/10">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A253]" />
                    <span>Official 501(c)(3) Receipt Issued</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A253]" />
                    <span>Cancel Recurring Gifts Anytime</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
