import React, { useState } from 'react';
import { useConference } from '../context/ConferenceContext';
import { Settings, Menu, X, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config, setIsAdminOpen, saveNotice } = useConference();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Call for Papers', href: '#scope' },
    { label: 'Important Dates', href: '#dates' },
    { label: 'Submission Guidelines', href: '#submission' },
    { label: 'Registration Fees', href: '#registration' },
    { label: 'Venue & Transit', href: '#venue' },
    { label: 'Committee', href: '#committee' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-300">
      {/* Top Institutional Header Bar (DLSU Green) */}
      <div className="bg-dlsu-800 text-white px-4 py-2 text-xs sm:text-sm font-semibold border-b border-dlsu-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wide uppercase">De La Salle University</span>
            <span className="text-emerald-300 hidden sm:inline">&bull;</span>
            <span className="text-emerald-100 hidden sm:inline font-normal">
              Center for ICT for Development (CITE4D) &bull; AdRIC
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded bg-dlsu-900/80 hover:bg-dlsu-900 text-emerald-200 border border-emerald-400/30 transition-colors"
              title="Edit conference details live"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin / Edit Details</span>
              {saveNotice && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Conference Masthead Banner (Classic Academic Conference Header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-dlsu-800 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                DLSU
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-dlsu-900 tracking-tight leading-tight">
                  {config.acronym}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-700">
                  {config.fullName}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium pt-1">
              {config.datesText} &bull; {config.venueBrief}
            </p>
          </div>

          {/* Direct Academic Actions */}
          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <a
              href={config.submission.submissionPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-dlsu-800 text-white text-xs sm:text-sm font-semibold hover:bg-dlsu-900 shadow-2xs"
            >
              <span>Submit via EasyChair</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="#dates"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50"
            >
              <span>Deadlines (Nov 20)</span>
            </a>
          </div>
        </div>

        {/* Clean Academic Navigation Menu Bar */}
        <div className="pt-3 flex items-center justify-between">
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-dlsu-800 hover:bg-slate-100 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="lg:hidden w-full flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:text-dlsu-800 rounded border border-slate-300"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-1.5 bg-slate-50 p-3 rounded">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-dlsu-800 hover:bg-white rounded"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Optional Announcement Banner */}
      {config.noticeBanner?.enabled && (
        <div className="bg-amber-50 border-y border-amber-200 px-4 py-2 text-xs text-amber-900">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-amber-800">[Announcement]</span>
            <span>{config.noticeBanner.text}</span>
          </div>
        </div>
      )}
    </header>
  );
};
