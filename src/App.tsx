import React from 'react';
import { ConferenceProvider } from './context/ConferenceContext';
import { Navbar } from './components/Navbar';
import { ConferenceMain } from './components/ConferenceMain';
import { ConferenceSidebar } from './components/ConferenceSidebar';
import { Footer } from './components/Footer';
import { AdminModal } from './components/admin/AdminModal';

const ConferencePortal: React.FC = () => {
  return (
    <div id="home" className="min-h-screen flex flex-col bg-[#fafbf9] text-slate-800">
      {/* Top Academic Navigation & Institutional Masthead */}
      <Navbar />

      {/* Main 2-Column Academic Content Body (Standard IEEE / SIBR Layout) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Full Academic Details, CFP, Guidelines, Fees & Venue */}
          <div className="lg:col-span-8">
            <ConferenceMain />
          </div>

          {/* Right Column: Important Dates, Submission Link, Inquiries, Admin Trigger */}
          <div className="lg:col-span-4 lg:sticky lg:top-4">
            <ConferenceSidebar />
          </div>
        </div>
      </main>

      {/* Academic Footer */}
      <Footer />

      {/* Live Admin CMS Modal */}
      <AdminModal />
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
