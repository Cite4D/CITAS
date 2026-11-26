import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { FileText, CheckCircle, CreditCard, Edit3, Calendar, Award } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { config } = useConference();

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'check':
        return <CheckCircle className="w-5 h-5" />;
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'pencil':
        return <Edit3 className="w-5 h-5" />;
      case 'award':
        return <Award className="w-5 h-5" />;
      case 'calendar':
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-700" />
            Active Deadline
          </span>
        );
      case 'highlighted':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-400">
            Key Milestone
          </span>
        );
      case 'passed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300">
            Upcoming
          </span>
        );
    }
  };

  return (
    <section id="timeline" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dlsu-900 tracking-tight mb-4 text-balance">
            Important Dates
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-pretty max-w-[68ch] mx-auto">
            Please mark these key deadlines in your calendar. All submission deadlines are 23:59 AoE (Anywhere on Earth) unless noted otherwise.
          </p>
        </div>

        {/* Desktop Connected Timeline View */}
        <div className="hidden lg:block relative mb-16">
          <div className="absolute top-10 left-12 right-12 h-1 bg-slate-200 -z-0" />

          <div className="grid grid-cols-7 gap-3 relative z-10">
            {config.importantDates.map((item, idx) => {
              const isHighlight = item.status === 'highlighted' || item.status === 'active';
              return (
                <div key={item.id} className="flex flex-col items-center text-center group">
                  <div
                    className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
                      item.status === 'active'
                        ? 'bg-dlsu-800 text-white ring-4 ring-emerald-300 scale-105'
                        : item.status === 'highlighted'
                        ? 'bg-amber-700 text-white ring-4 ring-amber-200'
                        : 'bg-white text-slate-800 border-2 border-slate-300 group-hover:border-dlsu-600'
                    }`}
                  >
                    <div className="mb-1">{getIcon(item.iconType)}</div>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Step {idx + 1}
                    </span>
                  </div>

                  <div className="mt-4 px-1">
                    <span
                      className={`block font-bold text-xs uppercase tracking-wider mb-1.5 ${
                        isHighlight ? 'text-dlsu-900 font-extrabold' : 'text-slate-700'
                      }`}
                    >
                      {item.dateStr}
                    </span>
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2">
                      {item.title}
                    </h3>
                    <div className="flex justify-center mb-2">
                      {getStatusBadge(item.status)}
                    </div>
                    {item.description && (
                      <p className="text-xs text-slate-600 leading-normal">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline Cards */}
        <div className="lg:hidden space-y-4">
          {config.importantDates.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                item.status === 'active'
                  ? 'bg-emerald-50/70 border-emerald-400 shadow-md'
                  : item.status === 'highlighted'
                  ? 'bg-amber-50/70 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    item.status === 'active'
                      ? 'bg-dlsu-800 text-white'
                      : item.status === 'highlighted'
                      ? 'bg-amber-700 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {getIcon(item.iconType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-dlsu-900 uppercase tracking-wide">
                      {item.dateStr}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout box for Camera-Ready & Presentation */}
        <div className="mt-12 p-6 rounded-2xl bg-dlsu-50 border border-dlsu-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-dlsu-900 text-base">
              Ready to submit your manuscript?
            </h3>
            <p className="text-sm text-slate-700 text-pretty max-w-[60ch]">
              The EasyChair portal is accepting initial draft submissions in ACL format until November 20, 2026.
            </p>
          </div>
          <a
            href={config.submission.submissionPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg bg-dlsu-800 hover:bg-dlsu-900 text-white text-sm font-semibold flex-shrink-0 shadow-sm transition-colors"
          >
            Go to EasyChair &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
