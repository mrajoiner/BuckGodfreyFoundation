import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';
import { FadeInView } from './FadeInView';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Endowment & Major Giving',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 bg-white border-t border-[#1B365D]/10">
      <div className="max-w-4xl mx-auto">
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block mb-2">
              COMMUNICATIONS // INQUIRIES
            </span>
            <h2 className="font-display-title text-3xl sm:text-5xl text-[#1B365D] font-bold uppercase tracking-tight">
              Contact The Foundation
            </h2>
            <p className="font-body-text text-sm sm:text-base text-[#1B365D]/75 mt-3">
              Reach out regarding major gifts, scholar nominations, or alumni community initiatives.
            </p>
          </div>
        </FadeInView>

        <FadeInView direction="up" delay={0.2}>
          <div className="bg-white border border-[#1B365D]/15 p-6 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-[#F8FAFC] border border-[#C5A253] mx-auto flex items-center justify-center text-[#C5A253]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display-title text-2xl text-[#1B365D] font-bold uppercase">
                  Message Dispatched, {formData.firstName}!
                </h3>
                <p className="font-body-text text-sm text-[#1B365D]/80 max-w-sm mx-auto">
                  Thank you for reaching out. A representative from the Godfrey Foundation will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-3 px-6 uppercase hover:bg-[#C5A253] hover:text-[#1B365D] transition-colors cursor-pointer"
                >
                  SEND ANOTHER MESSAGE
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
                      className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
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
                      className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
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
                      className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
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
                      className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
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
                    className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden cursor-pointer"
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
                    className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full font-body-text text-xs font-bold tracking-[0.2em] bg-[#1B365D] text-white py-3.5 px-6 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4 text-[#C5A253]" />
                    SEND INQUIRY
                  </button>
                </div>
              </form>
            )}
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
