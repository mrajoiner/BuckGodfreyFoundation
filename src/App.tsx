import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LegacySection } from './components/LegacySection';
import { VisionSection } from './components/VisionSection';
import { ScholarCriteriaSection } from './components/ScholarCriteriaSection';
import { DonationSection } from './components/DonationSection';
import { FamilyQuoteSection } from './components/FamilyQuoteSection';
import { MemoryFormSection } from './components/MemoryFormSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { PersistentDonateButton } from './components/PersistentDonateButton';
import { ThankYouPage } from './components/ThankYouPage';

type ViewMode = 'home' | 'thank-you';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('thank-you') || hash.includes('thank-you') || search.includes('thank-you')) {
      return 'thank-you';
    }
    return 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path.includes('thank-you') || hash.includes('thank-you') || search.includes('thank-you')) {
        setCurrentView('thank-you');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (view: ViewMode, targetSection?: string) => {
    if (view === 'thank-you') {
      try {
        window.history.pushState(null, '', '/thank-you');
      } catch {
        window.location.hash = 'thank-you';
      }
      setCurrentView('thank-you');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      try {
        window.history.pushState(null, '', '/');
      } catch {
        window.location.hash = '';
      }
      setCurrentView('home');

      if (targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="wbg-app-root" className="min-h-screen bg-[#ffffff] text-[#0A1B36] font-['Raleway',sans-serif] flex flex-col selection:bg-[#C5A253] selection:text-[#0A1B36] overflow-x-hidden relative">
      {/* Sticky Editorial Navigation */}
      <Navigation
        isThankYouPage={currentView === 'thank-you'}
        onNavigateSection={(sectionId) => {
          if (currentView === 'thank-you') {
            navigateTo('home', sectionId);
          } else {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
      />

      {/* Persistent Floating 'Share a Memory' Button */}
      <PersistentDonateButton
        onMemoryClick={() => {
          if (currentView === 'thank-you') {
            navigateTo('home', 'memories');
          } else {
            const memorySection = document.getElementById('memories');
            if (memorySection) {
              memorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
      />

      {/* Main Content View Switcher */}
      <main id="main-content" className="grow overflow-x-hidden">
        {currentView === 'thank-you' ? (
          <ThankYouPage onNavigateHome={() => navigateTo('home')} />
        ) : (
          <>
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

            {/* Official Memorial Tribute & JotForm Embed Section */}
            <MemoryFormSection />

            {/* Final Dark Navy Support Banner */}
            <CtaSection />
          </>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigateSection={(sectionId) => {
          if (currentView === 'thank-you') {
            navigateTo('home', sectionId);
          } else {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
      />
    </div>
  );
}
