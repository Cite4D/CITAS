import React, { useState } from 'react';
import { useConference } from '../context/ConferenceContext';

export const Navbar: React.FC = () => {
  const { config } = useConference();
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
        <div className="border-b border-slate-300 pb-5">
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
        </div>

        {/* SIBR-Style Academic Navigation Links (No background, No borders, Plain text) */}
        <div className="pt-3 font-sans">
          <nav className="hidden md:flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-slate-300 pb-3">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.href}>
                <a
                  href={link.href}
                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-dlsu-900 hover:underline transition-colors"
                >
                  {link.label}
                </a>
                {idx < navLinks.length - 1 && (
                  <span className="text-slate-400 select-none" aria-hidden="true">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Mobile Navigation Toggle (Plain text, No button background/borders) */}
          <div className="md:hidden flex items-center justify-between py-2 border-b border-slate-300">
            <span className="text-xs font-bold uppercase text-slate-700">Conference Menu</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xs font-bold text-dlsu-900 hover:underline"
            >
              {mobileMenuOpen ? 'Hide Menu ▲' : 'Show Menu ▼'}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-2 divide-y divide-slate-200">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-bold text-slate-900 hover:text-dlsu-900 hover:underline"
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
