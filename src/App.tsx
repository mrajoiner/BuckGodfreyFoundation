import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LegacySection } from './components/LegacySection';
import { VisionSection } from './components/VisionSection';
import { ScholarCriteriaSection } from './components/ScholarCriteriaSection';
import { DonationSection } from './components/DonationSection';
import { FamilyQuoteSection } from './components/FamilyQuoteSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { PersistentDonateButton } from './components/PersistentDonateButton';
import { SupportModal } from './components/SupportModal';
import { LegacyDetailsModal } from './components/LegacyDetailsModal';
import { ScholarshipApplyModal } from './components/ScholarshipApplyModal';
import { ContactModal } from './components/ContactModal';
import { HbcuExcellenceModal } from './components/HbcuExcellenceModal';
import { PrivacyModal } from './components/PrivacyModal';

export default function App() {
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [legacyModalOpen, setLegacyModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [hbcuModalOpen, setHbcuModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <div id="wbg-app-root" className="min-h-screen bg-white text-[#1B365D] font-['Space_Grotesk',sans-serif] flex flex-col selection:bg-[#C5A253] selection:text-[#1B365D]">
      {/* Sticky Editorial Navigation */}
      <Navigation
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenApply={() => setApplyModalOpen(true)}
      />

      {/* Persistent Flashing Donate Button */}
      <PersistentDonateButton
        onDonateClick={() => setSupportModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="grow">
        {/* Hero Section */}
        <HeroSection
          onOpenSupport={() => setSupportModalOpen(true)}
          onOpenLegacyModal={() => setLegacyModalOpen(true)}
        />

        {/* Legacy Section */}
        <LegacySection
          onOpenLegacyModal={() => setLegacyModalOpen(true)}
        />

        {/* Vision / Impact Pillars */}
        <VisionSection
          onOpenSupport={() => setSupportModalOpen(true)}
          onOpenApply={() => setApplyModalOpen(true)}
        />

        {/* 6 Criteria: The Scholar We Seek */}
        <ScholarCriteriaSection
          onOpenApply={() => setApplyModalOpen(true)}
        />

        {/* Dedicated Persuasive Donation & PayPal Section */}
        <DonationSection
          onOpenSupportModal={() => setSupportModalOpen(true)}
        />

        {/* Godfrey Family Quote & Candid Photo */}
        <FamilyQuoteSection />

        {/* Final Dark Navy Support Banner */}
        <CtaSection
          onOpenSupport={() => setSupportModalOpen(true)}
        />
      </main>

      {/* Editorial Footer */}
      <Footer
        onOpenContact={() => setContactModalOpen(true)}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenHbcuInfo={() => setHbcuModalOpen(true)}
      />

      {/* Interactive Modals */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />

      <LegacyDetailsModal
        isOpen={legacyModalOpen}
        onClose={() => setLegacyModalOpen(false)}
        onOpenSupport={() => setSupportModalOpen(true)}
      />

      <ScholarshipApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      <HbcuExcellenceModal
        isOpen={hbcuModalOpen}
        onClose={() => setHbcuModalOpen(false)}
      />

      {/* Privacy Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
