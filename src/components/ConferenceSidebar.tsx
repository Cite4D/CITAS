import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { Calendar, Download, ExternalLink, Mail, Settings, FileText, CheckCircle } from 'lucide-react';

export const ConferenceSidebar: React.FC = () => {
  const { config, setIsAdminOpen } = useConference();

  return (
    <aside className="space-y-6">
      {/* 1. Important Dates Box (Classic IEEE/SIBR Sidebar) */}
      <div className="bg-white border border-slate-300 rounded shadow-2xs overflow-hidden">
        <div className="bg-dlsu-800 text-white px-4 py-2.5 flex items-center justify-between">
          <h2 className="font-bold text-sm tracking-wide uppercase flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span>Important Dates</span>
          </h2>
        </div>

        <div className="p-4 divide-y divide-slate-150 text-xs">
          {config.importantDates.map((item) => {
            const isCameraReady = item.status === 'highlighted';
            const isActive = item.status === 'active';
            return (
              <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-bold ${
                      isCameraReady
                        ? 'text-red-700 font-extrabold'
                        : isActive
                        ? 'text-dlsu-800'
                        : 'text-slate-900'
                    }`}
                  >
                    {item.dateStr}
                  </span>
                  {isCameraReady && (
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300">
                      Final
                    </span>
                  )}
                  {isActive && (
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-slate-700 font-medium">{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Paper Submission & Templates Box */}
      <div className="bg-white border border-slate-300 rounded shadow-2xs overflow-hidden">
        <div className="bg-slate-800 text-white px-4 py-2.5">
          <h2 className="font-bold text-sm tracking-wide uppercase flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-300" />
            <span>Paper Submission</span>
          </h2>
        </div>

        <div className="p-4 space-y-3.5 text-xs text-slate-700">
          <p className="leading-relaxed">
            All manuscripts must follow the two-column ACL formatting style (A4 size, max 6 pages) and be submitted via EasyChair.
          </p>

          <a
            href={config.submission.submissionPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded bg-dlsu-800 text-white font-bold text-xs hover:bg-dlsu-900 shadow-2xs"
          >
            <span>EasyChair Submission Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="font-semibold text-slate-900">Format Templates:</div>
            <div className="space-y-1.5">
              <a
                href={config.submission.templateLatexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800"
              >
                <span className="font-medium">LaTeX Template (GitHub)</span>
                <Download className="w-3.5 h-3.5 text-slate-500" />
              </a>
              <a
                href={config.submission.templateDocxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-800"
              >
                <span className="font-medium">Word Template (.docx)</span>
                <Download className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Conference Secretariat & Inquiries */}
      <div className="bg-white border border-slate-300 rounded shadow-2xs overflow-hidden">
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
          Secretariat & Inquiries
        </div>
        <div className="p-4 space-y-2 text-xs text-slate-700">
          <p className="font-medium text-slate-900">
            Center for ICT for Development (CITE4D)
          </p>
          <p>De La Salle University, 2401 Taft Ave, Manila, Philippines</p>
          <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-dlsu-800 flex-shrink-0" />
            <a
              href={`mailto:${config.contactEmail}`}
              className="text-dlsu-800 font-semibold underline hover:text-dlsu-900 truncate"
            >
              {config.contactEmail}
            </a>
          </div>
        </div>
      </div>

      {/* 4. Quick Admin Edit Box */}
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded p-3 text-xs text-slate-600 space-y-2">
        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5 text-slate-500" />
          <span>Conference Organizer Admin</span>
        </div>
        <p className="text-xs leading-normal text-slate-600 text-pretty">
          Modify dates, scope topics, templates, fees, and text anytime without editing raw code.
        </p>
        <button
          type="button"
          onClick={() => setIsAdminOpen(true)}
          className="w-full py-1.5 px-3 rounded bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs text-center"
        >
          Open Admin Editor
        </button>
      </div>
    </aside>
  );
};
