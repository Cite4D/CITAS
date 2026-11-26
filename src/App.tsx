import React from 'react';
import { ConferenceProvider } from './context/ConferenceContext';
import { Navbar } from './components/Navbar';
import { ConferenceMain } from './components/ConferenceMain';
import { ConferenceSidebar } from './components/ConferenceSidebar';
import { Footer } from './components/Footer';
import { AdminModal } from './components/admin/AdminModal';

const ConferencePortal: React.FC = () => {
  return (
    <div id="home" className="min-h-screen flex flex-col bg-white text-[#1a1a1a]">
      {/* Top Academic Navigation & Masthead */}
      <Navbar />

      {/* Main 2-Column Content Layout (SIBR / IEEE Academic Conference Standard) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="md:col-span-8 lg:col-span-9">
            <ConferenceMain />
          </div>

          {/* Sidebar Area */}
          <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-4">
            <ConferenceSidebar />
          </div>
        </div>
      </main>

      {/* Academic Footer */}
      <Footer />

      {/* Admin CMS Modal */}
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
