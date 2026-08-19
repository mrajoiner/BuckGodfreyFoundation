import React, { useState } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Endowment & Major Giving',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1B365D]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="contact-modal-card"
        className="bg-white border border-[#1B365D]/20 w-full max-w-xl flex flex-col shadow-2xl relative my-auto text-[#1B365D]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 border-b border-[#1B365D]/10 flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <span className="font-tech-mono text-[10px] font-bold tracking-[0.2em] text-[#C5A253] uppercase block mb-1">
              COMMUNICATIONS // INQUIRY
            </span>
            <h3 className="font-display-title text-2xl sm:text-3xl text-[#1B365D] font-bold uppercase tracking-tight">
              Contact The Foundation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1B365D]/50 hover:text-[#1B365D] hover:bg-[#1B365D]/10 transition-colors cursor-pointer"
            aria-label="Close contact dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-[#F8FAFC] border border-[#C5A253] mx-auto flex items-center justify-center text-[#C5A253]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display-title text-2xl text-[#1B365D] font-bold uppercase">Message Dispatched</h4>
              <p className="font-body-text text-sm text-[#1B365D]/75 max-w-sm mx-auto font-normal">
                Thank you for reaching out, {formData.firstName}. A representative from the Godfrey Family &amp; Selection Board will respond promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-3 px-6 uppercase hover:bg-[#C5A253] hover:text-[#1B365D] transition-colors mt-4 cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    placeholder="(404) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                  INQUIRY TYPE
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden cursor-pointer"
                >
                  <option value="Endowment & Major Giving">Endowment &amp; Major Planned Giving</option>
                  <option value="Scholar Nomination Question">Scholar Nomination Question</option>
                  <option value="Southwest DeKalb Alumni Tribute">Southwest DeKalb Alumni Tribute</option>
                  <option value="Press & Media Inquiry">Press &amp; Media Inquiry</option>
                </select>
              </div>

              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                  MESSAGE *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full font-body-text text-xs font-bold tracking-[0.2em] bg-[#1B365D] text-white py-3.5 px-6 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4 text-[#C5A253]" />
                  SEND INQUIRY
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
