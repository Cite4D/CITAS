import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Important Dates', href: '#dates' },
    { label: 'Submission', href: '#submission' },
    { label: 'Objectives', href: '#objectives' },
    { label: 'Program Schedule', href: '#program' },
    { label: 'Call for Papers', href: '#scope' },
    { label: 'Registration Fees', href: '#registration' },
    { label: 'Venue', href: '#venue' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-300">
      {/* Top University Institutional Bar */}
      <div className="bg-dlsu-800 text-white px-4 py-2 text-xs sm:text-sm font-sans font-bold tracking-wider uppercase border-b border-dlsu-900">
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

      {/* Compact SIBR-Style Academic Navigation Links (No background, No borders, Plain text) */}
      <div className="max-w-6xl mx-auto px-4 font-sans">
        <nav className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-2 py-2.5">
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
        <div className="md:hidden flex items-center justify-between py-2.5">
          <span className="text-xs font-bold uppercase text-slate-700">CITAS 2027 Menu</span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-xs font-bold text-dlsu-900 hover:underline"
          >
            {mobileMenuOpen ? 'Hide Menu ▲' : 'Show Menu ▼'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-2 border-t border-slate-200 divide-y divide-slate-200">
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
    </header>
  );
};
