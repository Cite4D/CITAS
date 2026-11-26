import React from 'react';
import { useConference } from '../context/ConferenceContext';

export const Footer: React.FC = () => {
  const { config, setIsAdminOpen } = useConference();

  return (
    <footer className="w-full bg-slate-100 border-t-2 border-slate-300 py-8 text-xs sm:text-sm text-slate-700 font-sans mt-16">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-300 pb-4">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 text-sm sm:text-base">
              {config.acronym} &mdash; {config.fullName}
            </div>
            <p className="text-slate-600">
              De La Salle University &bull; Center for ICT for Development (CITe4D) &bull; AdRIC
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="px-3 py-1.5 bg-white border border-slate-400 hover:bg-slate-50 text-slate-800 font-bold text-xs"
            >
              Admin / Edit Details
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-slate-600">
          <div>
            &copy; {new Date().getFullYear()} CITAS 2027. De La Salle University, 2401 Taft Avenue, Malate, Manila, Philippines.
          </div>
          <div>
            <strong>URL: </strong>
            <span className="font-mono text-slate-800">cite4d.com/citas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
