import React from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LegacySection } from './components/LegacySection';
import { VisionSection } from './components/VisionSection';
import { ScholarCriteriaSection } from './components/ScholarCriteriaSection';
import { DonationSection } from './components/DonationSection';
import { FamilyQuoteSection } from './components/FamilyQuoteSection';
import { ContactSection } from './components/ContactSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { PersistentDonateButton } from './components/PersistentDonateButton';

export default function App() {
  return (
    <div id="wbg-app-root" className="min-h-screen bg-[#ffffff] text-[#0A1B36] font-['Raleway',sans-serif] flex flex-col selection:bg-[#C5A253] selection:text-[#0A1B36] overflow-x-hidden relative">
      {/* Sticky Editorial Navigation */}
      <Navigation />

      {/* Persistent Flashing Donate Button */}
      <PersistentDonateButton
        onDonateClick={() => {
          const donateSection = document.getElementById('donate');
          if (donateSection) {
            donateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />

      {/* Main Content Sections (Completely Inline - Zero Popups) */}
      <main id="main-content" className="grow overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Legacy Section with Inline Bio & Milestones */}
        <LegacySection />

        {/* Vision / HBCU Impact Pillars */}
        <VisionSection />

        {/* 7 Criteria: The Scholar We Seek */}
        <ScholarCriteriaSection />

        {/* Dedicated Persuasive Donation & PayPal Console */}
        <DonationSection />

        {/* Godfrey Family Quote & Photo */}
        <FamilyQuoteSection />

        {/* Inline Contact & Inquiry Section */}
        <ContactSection />

        {/* Final Dark Navy Support Banner */}
        <CtaSection />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
