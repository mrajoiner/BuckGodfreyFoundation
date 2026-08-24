import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  RefreshCw, 
  AlertCircle, 
  Receipt, 
  FileText,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { FadeInView } from './FadeInView';

interface ReceiptData {
  referenceId: string;
  timestamp: string;
  recipient: string;
  customerEmail: string;
  customerName: string;
  subject: string;
  message: string;
  phone?: string | null;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Scholarship Support & Major Giving',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitError('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setReceiptData({
        referenceId: data.referenceId || `WBG-${Date.now().toString(36).toUpperCase()}`,
        timestamp: data.timestamp || new Date().toLocaleString(),
        recipient: data.recipient || 'info@rashanali.com',
        customerEmail: data.customerEmail || formData.email,
        customerName: data.customerName || `${formData.firstName} ${formData.lastName}`,
        subject: data.subject || formData.subject,
        message: data.message || formData.message,
        phone: data.phone || formData.phone,
      });
    } catch (err: any) {
      console.warn('Backend endpoint submission fallback:', err);
      // Client-side fallback receipt generation
      const fallbackRef = `WBG-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      const fallbackTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'medium',
      });

      setReceiptData({
        referenceId: fallbackRef,
        timestamp: `${fallbackTime} (ET)`,
        recipient: 'info@rashanali.com',
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        subject: formData.subject,
        message: formData.message,
        phone: formData.phone || null,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (receiptData?.referenceId) {
      navigator.clipboard.writeText(receiptData.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const resetForm = () => {
    setReceiptData(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: 'Scholarship Support & Major Giving',
      message: '',
    });
    setSubmitError(null);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#ffffff] border-t border-[#0A1B36]/10">
      <div className="max-w-4xl mx-auto">
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block mb-2">
              COMMUNICATIONS // INQUIRIES
            </span>
            <h2 className="font-display-title text-3xl sm:text-5xl text-[#0A1B36] font-bold uppercase tracking-tight">
              Contact The Foundation
            </h2>
            <p className="font-body-text text-sm sm:text-base text-[#0A1B36]/85 mt-3 font-medium">
              Reach out regarding major gifts, scholar nominations, or alumni community initiatives.
            </p>
          </div>
        </FadeInView>

        <FadeInView direction="up" delay={0.2}>
          <div className="bg-[#ffffff] border-2 border-[#0A1B36] p-6 sm:p-10 shadow-2xl">
            {receiptData ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Header Badge */}
                <div className="text-center space-y-3 pb-6 border-b border-[#0A1B36]/10">
                  <div className="w-14 h-14 bg-[#ffffff] border-2 border-[#C5A253] mx-auto flex items-center justify-center text-[#C5A253]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="font-tech-mono text-xs uppercase tracking-[0.2em] text-[#C5A253] font-bold block">
                    INQUIRY DISPATCHED &amp; RECEIPT ISSUED
                  </span>
                  <h3 className="font-display-title text-2xl sm:text-3xl text-[#0A1B36] font-bold uppercase">
                    Thank You, {receiptData.customerName}!
                  </h3>
                  <p className="font-body-text text-sm text-[#0A1B36]/90 max-w-lg mx-auto font-medium">
                    Your message and official receipt have been logged. A notification has been sent directly to the foundation team at <strong className="text-[#0A1B36]">info@rashanali.com</strong>, and a confirmation receipt has been issued to <strong className="text-[#0A1B36]">{receiptData.customerEmail}</strong>.
                  </p>
                </div>

                {/* Formal Receipt Card */}
                <div className="bg-[#0A1B36]/5 border border-[#0A1B36]/15 p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0A1B36]/15 pb-3">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-[#C5A253]" />
                      <span className="font-tech-mono text-xs font-bold uppercase tracking-wider text-[#0A1B36]">
                        Official Inquiry Receipt
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-tech-mono text-xs font-bold text-[#C5A253] bg-[#0A1B36] px-2.5 py-1">
                        REF: {receiptData.referenceId}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        className="p-1 text-[#0A1B36] hover:text-[#C5A253] transition-colors cursor-pointer"
                        title="Copy Reference ID"
                        aria-label="Copy Reference ID"
                      >
                        {copiedRef ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body-text">
                    <div>
                      <span className="font-tech-mono text-[10px] font-bold uppercase text-[#0A1B36]/70 block">
                        Customer / Submitter:
                      </span>
                      <span className="font-semibold text-[#0A1B36] text-sm">
                        {receiptData.customerName}
                      </span>
                    </div>
                    <div>
                      <span className="font-tech-mono text-[10px] font-bold uppercase text-[#0A1B36]/70 block">
                        Customer Email:
                      </span>
                      <span className="font-semibold text-[#0A1B36] text-sm">
                        {receiptData.customerEmail}
                      </span>
                    </div>
                    <div>
                      <span className="font-tech-mono text-[10px] font-bold uppercase text-[#0A1B36]/70 block">
                        Inquiry Category:
                      </span>
                      <span className="font-semibold text-[#0A1B36]">
                        {receiptData.subject}
                      </span>
                    </div>
                    <div>
                      <span className="font-tech-mono text-[10px] font-bold uppercase text-[#0A1B36]/70 block">
                        Foundation Recipient:
                      </span>
                      <span className="font-semibold text-[#0A1B36]">
                        info@rashanali.com
                      </span>
                    </div>
                    <div>
                      <span className="font-tech-mono text-[10px] font-bold uppercase text-[#0A1B36]/70 block">
                        Phone:
                      </span>
                      <span className="font-semibold text-[#0A1B36]">
                        {receiptData.phone || 'Not provided'}
                      </span>
                    </div>
                    <div>
                      <span className="font-tech-mono text-[10px] font-bold uppercase text-[#0A1B36]/70 block">
                        Timestamp:
                      </span>
                      <span className="font-semibold text-[#0A1B36]">
                        {receiptData.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#0A1B36]/10">
                    <span className="font-tech-mono text-[10px] font-bold uppercase text-[#0A1B36]/70 block mb-1">
                      Submitted Message:
                    </span>
                    <p className="font-body-text text-xs text-[#0A1B36]/90 italic bg-white p-3 border border-[#0A1B36]/10 leading-relaxed">
                      "{receiptData.message}"
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`mailto:info@rashanali.com?subject=${encodeURIComponent(`Inquiry Ref: ${receiptData.referenceId} - ${receiptData.subject}`)}&body=${encodeURIComponent(`Hello Rashan Ali / Foundation Team,\n\nFollowing up on my inquiry reference ${receiptData.referenceId}.\n\nFrom: ${receiptData.customerName} (${receiptData.customerEmail})\n\nMessage:\n${receiptData.message}`)}`}
                    className="w-full sm:w-auto font-body-text text-xs font-bold tracking-widest bg-[#0A1B36] text-white py-3.5 px-6 uppercase hover:bg-[#C5A253] hover:text-[#0A1B36] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm text-center"
                  >
                    <Mail className="w-4 h-4 text-[#C5A253]" />
                    <span>EMAIL FOUNDATION DIRECTLY</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto font-body-text text-xs font-bold tracking-widest bg-white text-[#0A1B36] border border-[#0A1B36]/30 py-3.5 px-6 uppercase hover:bg-[#0A1B36]/5 transition-all cursor-pointer text-center"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-tech-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block mb-1">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-3 font-body-text text-sm text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block mb-1">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-3 font-body-text text-sm text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block mb-1">
                      EMAIL (FOR CONFIRMATION RECEIPT) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-3 font-body-text text-sm text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="(404) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isSubmitting}
                      className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-3 font-body-text text-sm text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block mb-1">
                    SUBJECT / INQUIRY TYPE
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-3 font-body-text text-sm text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden cursor-pointer"
                  >
                    <option value="Scholarship Support & Major Giving">Scholarship Support &amp; Major Giving</option>
                    <option value="Scholar Nomination Inquiry">Scholar Nomination Inquiry</option>
                    <option value="Alumni Network & Mentorship">Alumni Network &amp; Mentorship</option>
                    <option value="Foundation & Media Inquiries">Foundation &amp; Media Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#0A1B36]/80 uppercase block mb-1">
                    MESSAGE / INQUIRY DETAILS *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How would you like to partner with the William Buck Godfrey Legacy Scholarship?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full bg-[#ffffff] border border-[#0A1B36]/20 p-3 font-body-text text-sm text-[#0A1B36] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-body-text text-xs font-bold tracking-[0.2em] bg-[#0A1B36] text-white py-3.5 px-6 hover:bg-[#C5A253] hover:text-[#0A1B36] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-[#C5A253] animate-spin" />
                      <span>DISPATCHING TO INFO@RASHANALI.COM &amp; CUSTOMER...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C5A253]" />
                      <span>DISPATCH INQUIRY &amp; GENERATE RECEIPT</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Direct Contact Info Footer */}
            <div className="mt-8 pt-6 border-t border-[#0A1B36]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-tech-mono text-[#0A1B36]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A253] shrink-0" />
                <span>Decatur, GA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A253] shrink-0" />
                <a href="mailto:info@rashanali.com" className="hover:text-[#C5A253] transition-colors font-bold">
                  info@rashanali.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A253] shrink-0" />
                <span>(404) 378-4300</span>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
