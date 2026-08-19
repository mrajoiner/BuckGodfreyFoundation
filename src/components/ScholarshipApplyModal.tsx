import React, { useState } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';

interface ScholarshipApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScholarshipApplyModal: React.FC<ScholarshipApplyModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="scholarship-apply-modal-overlay"
      className="fixed inset-0 z-50 bg-[#1B365D]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="scholarship-apply-card"
        className="bg-white border border-[#1B365D]/20 w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto text-[#1B365D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#1B365D]/10 flex items-center justify-between bg-[#F8FAFC]">
          <div>
            <span className="font-tech-mono text-[10px] font-bold tracking-[0.2em] text-[#C5A253] uppercase block mb-1">
              4-YEAR HBCU ENDOWMENT &amp; STIPENDS
            </span>
            <h3 className="font-display-title text-2xl sm:text-3xl text-[#1B365D] font-bold uppercase tracking-tight">
              Scholar Application &amp; Nomination
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#1B365D]/50 hover:text-[#1B365D] hover:bg-[#1B365D]/10 transition-colors cursor-pointer"
            aria-label="Close application dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-6 animate-in fade-in">
              <div className="w-16 h-16 bg-[#F8FAFC] border border-[#C5A253] mx-auto flex items-center justify-center text-[#C5A253]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="font-tech-mono text-xs font-bold tracking-widest text-[#C5A253] uppercase">
                  APPLICATION SUBMITTED
                </span>
                <h4 className="font-display-title text-3xl text-[#1B365D] uppercase tracking-tight font-bold">
                  Submission Received, {formData.firstName} {formData.lastName}!
                </h4>
                <p className="font-body-text text-sm sm:text-base text-[#1B365D]/75 max-w-md mx-auto leading-relaxed font-normal">
                  We have dispatched complete instructions to <strong>{formData.email}</strong>. Our Selection Committee reviews candidates on a rolling basis.
                </p>
              </div>

              <div className="p-5 bg-[#F8FAFC] border border-[#1B365D]/10 text-left max-w-lg mx-auto space-y-2 font-tech-mono text-xs text-[#1B365D]/75">
                <div className="font-bold text-[#1B365D] border-b border-[#1B365D]/10 pb-2 flex items-center justify-between">
                  <span>REQUIRED MATERIALS:</span>
                  <span className="text-[#C5A253] uppercase">ACTION REQUIRED</span>
                </div>
                <p>1. Official High School Transcript submission.</p>
                <p>2. Two Letters of Recommendation (Educator / Coach / Community Leader).</p>
                <p>3. Proof of acceptance or enrollment at an accredited HBCU.</p>
                <p>4. 500-word Personal Essay on Coach Godfrey's 7 Selection Criteria.</p>
              </div>

              <button
                onClick={handleReset}
                className="font-body-text text-xs font-bold tracking-widest bg-[#1B365D] text-white py-3.5 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase cursor-pointer"
              >
                CLOSE PORTAL
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Applicant / Nominator Toggle */}
              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-2">
                  SUBMISSION TYPE
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setApplicantType('student')}
                    className={`py-3 px-4 font-body-text text-xs font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                      applicantType === 'student'
                        ? 'bg-[#1B365D] text-white border-[#1B365D]'
                        : 'bg-[#F8FAFC] text-[#1B365D]/70 border-[#1B365D]/15 hover:border-[#1B365D]/40'
                    }`}
                  >
                    Prospective Scholar (Senior)
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplicantType('nominator')}
                    className={`py-3 px-4 font-body-text text-xs font-bold tracking-wider uppercase transition-all border cursor-pointer ${
                      applicantType === 'nominator'
                        ? 'bg-[#1B365D] text-white border-[#1B365D]'
                        : 'bg-[#F8FAFC] text-[#1B365D]/70 border-[#1B365D]/15 hover:border-[#1B365D]/40'
                    }`}
                  >
                    Educator / Coach Nominator
                  </button>
                </div>
              </div>

              {/* Separate First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    {applicantType === 'student' ? 'STUDENT FIRST NAME *' : 'NOMINEE FIRST NAME *'}
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
                    {applicantType === 'student' ? 'STUDENT LAST NAME *' : 'NOMINEE LAST NAME *'}
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

              {/* Email & Phone */}
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
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
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
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Academic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    CURRENT HIGH SCHOOL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Southwest DeKalb High"
                    value={formData.highSchool}
                    onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
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
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                    TARGET HBCU *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Morehouse, Howard, Spelman..."
                    value={formData.targetHbcu}
                    onChange={(e) => setFormData({ ...formData, targetHbcu: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Intended Major */}
              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                  INTENDED FIELD OF STUDY / MAJOR
                </label>
                <input
                  type="text"
                  placeholder="Computer Science, Education, Pre-Med, Sports Management..."
                  value={formData.intendedMajor}
                  onChange={(e) => setFormData({ ...formData, intendedMajor: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                />
              </div>

              {/* Brief Statement */}
              <div>
                <label className="font-tech-mono text-[10px] font-bold tracking-widest text-[#1B365D]/70 uppercase block mb-1">
                  STATEMENT ON SCHOLAR CRITERIA &amp; HBCU ASPIRATIONS
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe demonstrated character and integrity, leadership, ambition and drive, academic commitment, perseverance, service to others, and a desire to pursue greatness..."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#1B365D]/15 p-3 font-body-text text-sm text-[#1B365D] focus:border-[#C5A253] focus:outline-hidden"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full font-body-text text-xs sm:text-sm font-bold tracking-[0.2em] bg-[#1B365D] text-white py-4 px-8 hover:bg-[#C5A253] hover:text-[#1B365D] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4 text-[#C5A253]" />
                  SUBMIT APPLICATION
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
