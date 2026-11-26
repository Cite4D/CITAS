import React, { useState, useEffect } from 'react';
import { useConference } from '../context/ConferenceContext';
import { Settings, Menu, X, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config, setIsAdminOpen, saveNotice } = useConference();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Scope & Tracks', href: '#scope' },
    { label: 'Important Dates', href: '#timeline' },
    { label: 'Paper Submission', href: '#submission' },
    { label: 'Venue', href: '#venue' },
    { label: 'Registration', href: '#registration' },
    { label: 'Organizers', href: '#organizers' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notice Bar */}
      {config.noticeBanner?.enabled && (
        <div className="bg-dlsu-900 text-white px-4 py-2 text-xs sm:text-sm font-medium border-b border-dlsu-700/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <p className="truncate text-white">
                <span className="font-semibold text-emerald-200 mr-1.5">[Notice]</span>
                {config.noticeBanner.text}
              </p>
            </div>
            <a
              href="#submission"
              className="hidden sm:inline-flex items-center gap-1 text-emerald-200 hover:text-white underline underline-offset-2 flex-shrink-0 text-xs font-semibold"
            >
              Learn more &rarr;
            </a>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200/80 py-3'
            : 'bg-white border-slate-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & DLSU Affiliation */}
            <a href="#home" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-dlsu-800 rounded-md">
              <div className="w-10 h-10 rounded-lg bg-dlsu-800 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="20,4 23,14 34,14 25,20 28,31 20,24 12,31 15,20 6,14 17,14" fill="#ffffff" />
                  <path d="M12 28L20 35L28 28" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-lg sm:text-xl text-dlsu-900 tracking-tight">
                    {config.acronym}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-dlsu-100 text-dlsu-900 border border-dlsu-300">
                    DLSU Manila
                  </span>
                </div>
                <span className="text-xs text-slate-600 font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  CITE4D &bull; AdRIC
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-dlsu-800 hover:bg-dlsu-50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Actions: Admin CMS & EasyChair CTA */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:text-dlsu-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dlsu-800"
                title="Open Admin CMS to edit conference dates, scope, and text"
              >
                <Settings className="w-3.5 h-3.5 text-slate-600" />
                <span>Admin CMS</span>
                {saveNotice && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                )}
              </button>

              <a
                href={config.submission.submissionPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md bg-dlsu-800 text-white hover:bg-dlsu-900 shadow-sm transition-all hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dlsu-800"
              >
                <span>Submit Paper</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="p-2 text-slate-700 hover:text-dlsu-800 rounded-md bg-slate-100 border border-slate-200"
                aria-label="Open Admin"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-dlsu-800 hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-dlsu-800"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-dlsu-50 hover:text-dlsu-800 rounded-md"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={config.submission.submissionPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-dlsu-800 text-white font-semibold text-sm"
              >
                <span>Submit Paper via EasyChair</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-slate-100 text-slate-800 font-medium text-sm hover:bg-slate-200"
              >
                <Settings className="w-4 h-4 text-slate-600" />
                <span>Open Admin Portal</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Save Indicator Toast */}
      {saveNotice && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2 border border-slate-700 animate-fadeIn">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>{saveNotice}</span>
        </div>
      )}
    </header>
  );
};
