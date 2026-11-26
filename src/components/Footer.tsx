import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { Settings, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, setIsAdminOpen } = useConference();

  return (
    <footer className="bg-dlsu-dark text-slate-300 border-t border-dlsu-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-dlsu-900/80">
          {/* Brand & Overview */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-dlsu-800 flex items-center justify-center text-white font-serif font-bold text-lg border border-dlsu-700">
                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="20,4 23,14 34,14 25,20 28,31 20,24 12,31 15,20 6,14 17,14" fill="#ffffff" />
                  <path d="M12 28L20 35L28 28" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="font-serif font-bold text-white text-lg block leading-tight">
                  {config.acronym}
                </span>
                <span className="text-xs text-dlsu-200">
                  De La Salle University, Manila
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {config.fullName}. Organized by Center for ICT for Development (CITE4D) & The Advanced Research Institute for Informatics, Computing, and Networking (AdRIC).
            </p>
            <div className="text-xs text-dlsu-400 font-mono">
              Official Portal: cite4d.com/citas
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Conference Introduction
                </a>
              </li>
              <li>
                <a href="#scope" className="hover:text-white transition-colors">
                  Research Scope & Topics
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-white transition-colors">
                  Important Dates
                </a>
              </li>
              <li>
                <a href="#submission" className="hover:text-white transition-colors">
                  Paper Submission & EasyChair
                </a>
              </li>
              <li>
                <a href="#venue" className="hover:text-white transition-colors">
                  Venue & Transit Guide
                </a>
              </li>
              <li>
                <a href="#registration" className="hover:text-white transition-colors">
                  Registration & Fees
                </a>
              </li>
            </ul>
          </div>

          {/* Guidelines & Admin Access */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Conference Management
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conference details and deadlines are dynamically managed by the organizing committee.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dlsu-800 hover:bg-dlsu-700 text-white text-xs font-semibold border border-dlsu-700 transition-colors shadow-sm"
              >
                <Settings className="w-3.5 h-3.5 text-dlsu-200" />
                <span>Open Admin Portal (CMS)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>
            &copy; {new Date().getFullYear()} CITAS 2027 &bull; De La Salle University, 2401 Taft Ave, Manila, Philippines. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={config.submission.submissionPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white flex items-center gap-1 font-medium"
            >
              <span>EasyChair System</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>&bull;</span>
            <span className="text-slate-300 font-medium">Green & White Pride</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
