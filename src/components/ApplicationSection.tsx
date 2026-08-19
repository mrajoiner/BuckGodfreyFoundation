import React, { useState } from 'react';
import { CheckCircle2, Send, Sparkles } from 'lucide-react';
import { FadeInView } from './FadeInView';

export const ApplicationSection: React.FC = () => {
  const [applicantType, setApplicantType] = useState<'student' | 'nominator'>('student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    highSchool: '',
    gpa: '',
    targetHbcu: '',
    intendedMajor: '',
    statement: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) return;
    setIsSubmitted(true);
  };

  return (
    <section id="apply" className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 bg-white border-t border-[#1B365D]/10">
      <div className="max-w-4xl mx-auto">
        <FadeInView direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A253] font-bold block mb-2">
              SCHOLARSHIP PORTAL // 4-YEAR HBCU ENDOWMENT
            </span>
            <h2 className="font-display-title text-3xl sm:text-5xl text-[#1B365D] font-bold uppercase tracking-tight">
              Scholar Application &amp; Nomination
            </h2>
            <p className="font-body-text text-sm sm:text-base text-[#1B365D]/75 mt-3">
              Submit your candidate details for the William Buck Godfrey Legacy Scholarship cohort.
            </p>
          </div>
        </FadeInView>

        <FadeInView direction="up" delay={0.2}>
          <div className="bg-white border border-[#1B365D]/15 p-6 sm:p-10 shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 bg-[#F8FAFC] border border-[#C5A253] mx-auto flex items-center justify-center text-[#C5A253]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display-title text-2xl sm:text-3xl text-[#1B365D] font-bold uppercase">
                  Application Received, {formData.firstName} {formData.lastName}!
                </h3>
                <p className="font-body-text text-sm sm:text-base text-[#1B365D]/80 max-w-md mx-auto">
                  We have dispatched packet instructions to <strong>{formData.email}</strong>. Our Selection Committee reviews candidates on a rolling basis.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-3 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] uppercase transition-all cursor-pointer"
                >
                  SUBMIT ANOTHER FORM
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-2">
                    SUBMISSION TYPE
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setApplicantType('student')}
                      className={`py-3 px-4 font-body-text text-xs font-bold uppercase border transition-all cursor-pointer ${
                        applicantType === 'student'
                          ? 'bg-[#1B365D] text-white border-[#1B365D]'
                          : 'bg-white text-[#1B365D]/70 border-[#1B365D]/20 hover:border-[#1B365D]'
                      }`}
                    >
                      Prospective Scholar
                    </button>
                    <button
                      type="button"
                      onClick={() => setApplicantType('nominator')}
                      className={`py-3 px-4 font-body-text text-xs font-bold uppercase border transition-all cursor-pointer ${
                        applicantType === 'nominator'
                          ? 'bg-[#1B365D] text-white border-[#1B365D]'
                          : 'bg-white text-[#1B365D]/70 border-[#1B365D]/20 hover:border-[#1B365D]'
                      }`}
                    >
                      Educator / Nominator
                    </button>
                  </div>
                </div>

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
                      PRIMARY EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@school.edu"
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
                      placeholder="(404) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                      CURRENT HIGH SCHOOL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="High School"
                      value={formData.highSchool}
                      onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
                      className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                      UNWEIGHTED GPA *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="3.65"
                      value={formData.gpa}
                      onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                      className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                      TARGET HBCU *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Target HBCU"
                      value={formData.targetHbcu}
                      onChange={(e) => setFormData({ ...formData, targetHbcu: e.target.value })}
                      className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    INTENDED FIELD OF STUDY / MAJOR
                  </label>
                  <input
                    type="text"
                    placeholder="Field of Study / Major"
                    value={formData.intendedMajor}
                    onChange={(e) => setFormData({ ...formData, intendedMajor: e.target.value })}
                    className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    PERSONAL ESSAY / SCHOLAR STATEMENT
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe demonstrated character and integrity, leadership, ambition and drive, academic commitment, perseverance, service to others, and a desire to pursue greatness..."
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full bg-white border border-[#1B365D]/20 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-body-text text-xs sm:text-sm font-bold tracking-[0.2em] bg-[#1B365D] text-white py-4 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 text-[#C5A253]" />
                  SUBMIT APPLICATION
                </button>
              </form>
            )}
          </div>
        </FadeInView>
      </div>
    </section>
  );
};
