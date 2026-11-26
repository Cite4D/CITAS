import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { Settings, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, setIsAdminOpen } = useConference();

  return (
    <footer className="bg-slate-100 border-t border-slate-300 py-8 text-xs text-slate-600 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-slate-800 text-sm">
              {config.acronym} &bull; {config.fullName}
            </div>
            <p className="text-slate-500">
              De La Salle University &bull; Center for ICT for Development (CITE4D) &bull; AdRIC
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-2xs"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin / Edit Conference Details</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} CITAS 2027. De La Salle University, 2401 Taft Avenue, Malate, Manila, Philippines.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-600 font-medium">cite4d.com/citas</span>
            <span>&bull;</span>
            <a
              href={config.submission.submissionPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dlsu-800 font-medium underline flex items-center gap-1"
            >
              <span>EasyChair Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
