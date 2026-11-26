import React, { useMemo } from 'react';
import { useConference } from '../context/ConferenceContext';
import { isLocalhost } from '../utils/isLocalhost';

export const ConferenceSidebar: React.FC = () => {
  const { config, setIsAdminOpen } = useConference();
  const showAdmin = useMemo(() => isLocalhost(), []);

  return (
    <aside className="space-y-6 font-sans">
      {/* 1. Quick Important Dates Box */}
      <div className="border border-slate-400 bg-white">
        <div className="bg-dlsu-800 text-white px-3 py-2 font-bold text-sm uppercase tracking-wider">
          Important Deadlines
        </div>
        <div className="p-3 divide-y divide-slate-200 text-xs sm:text-sm">
          {config.importantDates.map((item) => (
            <div key={item.id} className="py-2 first:pt-0 last:pb-0 space-y-0.5">
              <div className="text-slate-900">
                {item.isHighlight ? (
                  <strong className="text-dlsu-800">{item.dateStr}</strong>
                ) : (
                  <strong>{item.dateStr}</strong>
                )}
              </div>
              <div className="text-slate-700">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Paper Submission & Templates Box */}
      <div className="border border-slate-400 bg-white">
        <div className="bg-slate-800 text-white px-3 py-2 font-bold text-sm uppercase tracking-wider">
          Online Submission
        </div>
        <div className="p-3 space-y-3 text-xs sm:text-sm text-slate-800">
          <p className="leading-snug">
            Submissions must follow the two-column ACL format (max 6 pages).
          </p>

          <div>
            <a
              href={config.submissionGuidelines.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm text-dlsu-900 hover:text-black underline block"
            >
              &rarr; Submit via EasyChair
            </a>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">Download Templates:</div>
            <div>
              <a
                href={config.submissionGuidelines.templateLatexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dlsu-800 font-bold underline hover:text-dlsu-900 block"
              >
                &bull; LaTeX Style Files (GitHub)
              </a>
            </div>
            <div>
              <a
                href={config.submissionGuidelines.templateDocxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dlsu-800 font-bold underline hover:text-dlsu-900 block"
              >
                &bull; Word Template (.docx)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Inquiries Box */}
      <div className="border border-slate-400 bg-white">
        <div className="bg-slate-100 border-b border-slate-300 px-3 py-2 font-bold text-xs uppercase tracking-wider text-slate-800">
          Contact Secretariat
        </div>
        <div className="p-3 space-y-1.5 text-xs text-slate-800">
          <div className="font-bold">{config.contactPerson.name}</div>
          <div>{config.contactPerson.department}</div>
          <div className="pt-1">
            <strong>Email: </strong>
            <a
              href={`mailto:${config.contactPerson.email}`}
              className="text-dlsu-800 font-bold underline"
            >
              {config.contactPerson.email}
            </a>
          </div>
          <div>
            <strong>Phone: </strong>{config.contactPerson.phone}
          </div>
        </div>
      </div>

      {/* 4. Quick Admin CMS Box (Only shown when viewing via localhost) */}
      {showAdmin && (
        <div className="border border-slate-300 bg-slate-50 p-3 space-y-2 text-xs">
          <div className="font-bold text-slate-800 uppercase">
            Organizer Admin (Localhost)
          </div>
          <p className="text-slate-600">
            Update dates, scope topics, schedule, fees, and details live.
          </p>
          <div>
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="text-dlsu-900 hover:text-black font-bold underline text-xs block text-left"
            >
              &rarr; Open Admin CMS
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
