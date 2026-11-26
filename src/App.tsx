import React from 'react';
import { ConferenceProvider, useConference } from './context/ConferenceContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ScopeSection } from './components/ScopeSection';
import { TimelineSection } from './components/TimelineSection';
import { SubmissionSection } from './components/SubmissionSection';
import { VenueSection } from './components/VenueSection';
import { RegistrationSection } from './components/RegistrationSection';
import { OrganizersSection } from './components/OrganizersSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/admin/AdminModal';
import { Settings, Shield } from 'lucide-react';

const ConferencePortal: React.FC = () => {
  const { setIsAdminOpen } = useConference();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbf9] text-slate-800">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ScopeSection />
        <TimelineSection />
        <SubmissionSection />
        <VenueSection />
        <RegistrationSection />
        <OrganizersSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Admin CMS Modal */}
      <AdminModal />

      {/* Floating Quick Admin Edit Pill Button */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105 group"
          title="Open Admin CMS to edit conference details live"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <Settings className="w-3.5 h-3.5 text-emerald-400" />
          <span>Edit Details (Admin)</span>
        </button>
      </div>
    </div>
  );
};

export function App() {
  return (
    <ConferenceProvider>
      <ConferencePortal />
    </ConferenceProvider>
  );
}

export default App;
