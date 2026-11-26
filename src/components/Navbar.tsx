import React, { useState } from 'react';
import { useConference } from '../context/ConferenceContext';

export const Navbar: React.FC = () => {
  const { config, setIsAdminOpen } = useConference();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Objectives', href: '#objectives' },
    { label: 'Call for Papers', href: '#scope' },
    { label: 'Important Dates', href: '#dates' },
    { label: 'Program Schedule', href: '#program' },
    { label: 'Submission', href: '#submission' },
    { label: 'Registration Fees', href: '#registration' },
    { label: 'Committees', href: '#committee' },
    { label: 'Venue', href: '#venue' },
  ];

  return (
    <header className="w-full bg-white border-b-2 border-slate-300">
      {/* Top University Institutional Bar */}
      <div className="bg-dlsu-800 text-white px-4 py-2.5 text-xs sm:text-sm font-sans font-bold tracking-wider uppercase border-b border-dlsu-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span>DE LA SALLE UNIVERSITY</span>
            <span className="mx-2 hidden sm:inline">&bull;</span>
            <span className="font-normal text-emerald-100 hidden sm:inline">COLLEGE OF COMPUTER STUDIES</span>
          </div>
          <div className="text-emerald-200 font-normal text-xs">
            Center for ICT for Development (CITe4D) &bull; AdRIC
          </div>
        </div>
      </div>

      {/* Main Conference Masthead (SIBR & IEEE Classical Academic Header) */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-300 pb-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-dlsu-900 tracking-tight leading-tight">
              {config.acronym}
            </h1>
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {config.fullName}
            </p>
            <p className="text-base text-slate-800 font-semibold pt-1">
              <strong>Dates:</strong> {config.datesText} &nbsp;|&nbsp; <strong>Venue:</strong> {config.venueBrief}
            </p>
          </div>

          {/* Direct Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={config.submissionGuidelines.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-dlsu-800 hover:bg-dlsu-900 text-white text-sm font-sans font-bold border border-dlsu-900 transition-colors"
            >
              Online Submission (EasyChair) &rarr;
            </a>
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-sans font-bold border border-slate-400"
            >
              Admin / Edit Details
            </button>
          </div>
        </div>

        {/* SIBR-Style Rectangular Tab Navigation Bar */}
        <div className="pt-3 font-sans">
          <nav className="hidden md:flex flex-wrap items-center gap-1 border-b border-slate-300 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-dlsu-800 hover:text-white border border-slate-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center justify-between py-1">
            <span className="text-xs font-bold uppercase text-slate-700">Conference Menu</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300"
            >
              {mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-2 border border-slate-300 divide-y divide-slate-200 bg-slate-50">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
