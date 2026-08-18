import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { PledgeTier } from '../types';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLEDGE_TIERS: PledgeTier[] = [
  {
    id: 'supporter',
    amount: 50,
    label: 'Book & Tech Supporter',
    impact: 'Covers essential course textbooks and software access for 1 month.',
  },
  {
    id: 'stipend',
    amount: 150,
    label: 'Semester Sustainer',
    impact: 'Funds monthly living stipends for a collegiate student-athlete.',
    isPopular: true,
  },
  {
    id: 'semester',
    amount: 500,
    label: 'Academic Fellow',
    impact: 'Covers full lab fees, board, and specialized hardware.',
  },
  {
    id: 'champion',
    amount: 1000,
    label: 'Champion Sponsor',
    impact: 'Funds an entire semester academic stipend plus executive mentorship.',
  },
  {
    id: 'endower',
    amount: 2500,
    label: 'Legacy Endower',
    impact: 'Funds one full semester of comprehensive HBCU tuition.',
  },
];

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');
  const [selectedTier, setSelectedTier] = useState<number>(150);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [fundDesignation, setFundDesignation] = useState<string>('Four-Year Tuition Fund');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [dedication, setDedication] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedTier;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="support-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1B365D]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="support-modal-card"
        className="bg-white border border-[#1B365D]/20 w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto text-[#1B365D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#1B365D]/10 flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <span className="font-tech-mono text-[10px] font-bold tracking-[0.2em] text-[#C5A253] uppercase block mb-1">
              TAX-DEDUCTIBLE DONATION // 501(C)(3)
            </span>
            <h3 className="font-display-title text-2xl sm:text-3xl text-[#1B365D] font-black uppercase tracking-tight">
              Support The Godfrey Legacy
            </h3>
          </div>
          <button
            id="close-support-modal-btn"
            onClick={onClose}
            className="p-2 text-[#1B365D]/50 hover:text-[#1B365D] hover:bg-[#1B365D]/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-[#F8FAFC] border border-[#C5A253] mx-auto flex items-center justify-center text-[#C5A253]">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="font-tech-mono text-xs font-bold tracking-widest text-[#C5A253] uppercase">
                  PLEDGE CONFIRMED // ACTIVE
                </span>
                <h4 className="font-display-title text-3xl text-[#1B365D] uppercase tracking-tight font-black">
                  Thank You, {donorName || 'Champion Supporter'}!
                </h4>
                <p className="font-body-text text-sm sm:text-base text-[#1B365D]/75 max-w-md mx-auto leading-relaxed font-normal">
                  Your generous commitment of{' '}
                  <strong className="text-[#1B365D] font-bold">
                    ${currentAmount} {frequency === 'monthly' ? '/ month' : 'one-time'}
                  </strong>{' '}
                  to the <span className="text-[#C5A253] font-bold">{fundDesignation}</span> will directly empower our next HBCU cohort.
                </p>
              </div>

              <div className="p-5 bg-[#F8FAFC] border border-[#1B365D]/10 text-left max-w-md mx-auto space-y-2 font-tech-mono text-xs text-[#1B365D]/75">
                <div className="flex justify-between border-b border-[#1B365D]/10 pb-2">
                  <span className="text-[#1B365D]/50 uppercase">Donor:</span>
                  <span className="font-bold text-[#1B365D]">{donorName}</span>
                </div>
                <div className="flex justify-between border-b border-[#1B365D]/10 pb-2">
                  <span className="text-[#1B365D]/50 uppercase">Receipt Email:</span>
                  <span className="font-bold text-[#1B365D]">{donorEmail}</span>
                </div>
                {dedication && (
                  <div className="flex justify-between border-b border-[#1B365D]/10 pb-2">
                    <span className="text-[#1B365D]/50 uppercase">Dedication:</span>
                    <span className="text-[#C5A253]">"{dedication}"</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-[#1B365D]/50 uppercase">Tax ID:</span>
                  <span className="text-[#1B365D]">WBG-2024-88421</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-3.5 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase cursor-pointer"
              >
                RETURN TO SCHOLARSHIP SITE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Frequency Toggle */}
              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-2">
                  GIVING FREQUENCY
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-3 px-4 font-body-text text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-[#1B365D] text-white border-[#1B365D]'
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
                        ? 'bg-[#1B365D] text-white border-[#1B365D]'
                        : 'bg-[#F8FAFC] text-[#1B365D]/70 border-[#1B365D]/15 hover:border-[#1B365D]/40'
                    }`}
                  >
                    ONE-TIME GIFT
                  </button>
                </div>
              </div>

              {/* Tiers Grid */}
              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-2">
                  SELECT CONTRIBUTION AMOUNT
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PLEDGE_TIERS.map((tier) => {
                    const active = selectedTier === tier.amount && !customAmount;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => {
                          setSelectedTier(tier.amount);
                          setCustomAmount('');
                        }}
                        className={`p-3 text-left border transition-all flex flex-col justify-between cursor-pointer ${
                          active
                            ? 'bg-white text-[#1B365D] border-[#C5A253] shadow-md'
                            : 'bg-[#F8FAFC] text-[#1B365D]/75 border-[#1B365D]/10 hover:border-[#1B365D]/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display-title text-xl font-bold">${tier.amount}</span>
                          {tier.isPopular && (
                            <span className="text-[9px] font-tech-mono font-bold uppercase tracking-wider bg-[#C5A253] text-[#1B365D] px-1.5 py-0.5">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <span
                          className={`font-body-text text-[11px] mt-1 line-clamp-1 ${
                            active ? 'text-[#C5A253] font-bold' : 'text-[#1B365D]/60'
                          }`}
                        >
                          {tier.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* Custom Amount */}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="CUSTOM $"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full h-full min-h-[64px] bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-display-title text-lg text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden placeholder:font-tech-mono placeholder:text-[10px] placeholder:uppercase placeholder:text-[#1B365D]/40"
                    />
                  </div>
                </div>
              </div>

              {/* Fund Allocation */}
              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-2">
                  ALLOCATE TO INITIATIVE
                </label>
                <select
                  value={fundDesignation}
                  onChange={(e) => setFundDesignation(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden cursor-pointer"
                >
                  <option value="Four-Year Tuition Fund">Four-Year HBCU Tuition Fund</option>
                  <option value="Semester Stipends & Books">Semester Technology &amp; Book Stipend</option>
                  <option value="Executive Mentorship Program">Executive Mentorship &amp; Leadership Development</option>
                  <option value="General Legacy Endowment">General Legacy Endowment (Where Needed Most)</option>
                </select>
              </div>

              {/* Donor Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Dedication Note */}
              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                  DEDICATION OR TRIBUTE NOTE (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="In honor of Coach Godfrey / Southwest DeKalb Class of '95..."
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full font-body-text text-xs sm:text-sm font-bold tracking-[0.2em] bg-[#1B365D] text-white py-4 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Heart className="w-4 h-4 text-[#C5A253]" />
                  CONFIRM PLEDGE OF ${currentAmount} {frequency === 'monthly' ? '/ MONTH' : 'GIFT'}
                </button>
                <p className="text-center font-tech-mono text-[10px] text-[#1B365D]/60 mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A253]" />
                  SECURE 256-BIT ENCRYPTED TRANSACTION. TAX RECEIPT EMAILED INSTANTLY.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
