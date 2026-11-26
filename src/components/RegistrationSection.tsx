import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { Check } from 'lucide-react';

export const RegistrationSection: React.FC = () => {
  const { config } = useConference();

  return (
    <section id="registration" className="py-16 sm:py-24 bg-[#f8faf8] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dlsu-900 tracking-tight mb-4 text-balance">
            Registration & Fees
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-pretty max-w-[68ch] mx-auto">
            All presented papers require at least one author registered under the regular or student author rate. Early bird rates apply until January 4, 2027.
          </p>
        </div>

        {/* Pricing Cards Grid - Flattened without nested card containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {config.registrationTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between relative bg-white border ${
                tier.isPopular
                  ? 'border-dlsu-600 shadow-md ring-2 ring-dlsu-600/20'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-dlsu-800 text-white text-xs font-bold uppercase tracking-wider shadow">
                  Author Standard
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  {tier.category}
                </span>
                <h3 className="font-bold text-slate-900 text-lg mb-4">
                  {tier.name}
                </h3>

                {/* Price Display without inner card nesting */}
                <div className="py-3 border-y border-slate-200 mb-6 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-600 font-medium">Early Bird</span>
                    <span className="text-xl font-extrabold text-dlsu-900 font-mono">
                      {tier.earlyBirdRate}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs text-slate-500 font-medium">Regular</span>
                    <span className="text-sm font-semibold text-slate-700 font-mono">
                      {tier.regularRate}
                    </span>
                  </div>
                </div>

                {/* Perks Checklist */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
                  {tier.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  href={config.submission.submissionPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-xs font-bold transition-all ${
                    tier.isPopular
                      ? 'bg-dlsu-800 text-white hover:bg-dlsu-900 shadow-sm'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  Register via Portal
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Inclusions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-base">
              Need assistance with payment vouchers or official receipts?
            </h3>
            <p className="text-sm text-slate-700 text-pretty max-w-[62ch]">
              Official DLSU official receipts (OR) and certificates of presentation will be issued upon check-in at the registration desk.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${config.contactEmail}?subject=CITAS%202027%20Registration%20Inquiry`}
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-bold"
            >
              Inquire Registration
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
