import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { Mail, Phone, ExternalLink } from 'lucide-react';

export const OrganizersSection: React.FC = () => {
  const { config } = useConference();

  return (
    <section id="organizers" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dlsu-900 tracking-tight mb-4 text-balance">
            Organizing Committee
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-pretty max-w-[68ch] mx-auto">
            CITAS 2027 is spearheaded by research units and academic faculties of De La Salle University dedicated to ICT research for public good.
          </p>
        </div>

        {/* Co-Organizing Entities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {config.organizers.map((org) => (
            <div
              key={org.id}
              className="p-8 rounded-2xl bg-[#fafbf9] border border-slate-200 shadow-xs flex flex-col justify-between hover:border-dlsu-400 transition-colors"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-dlsu-100 text-dlsu-900 mb-4 border border-dlsu-200">
                  {org.role}
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  {org.name}
                </h3>
                <p className="text-xs font-bold text-dlsu-800 uppercase tracking-wide mb-3">
                  {org.institution}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed text-pretty">
                  Advancing research excellence, technology transfer, and collaborative national and international computing innovations.
                </p>
              </div>

              {org.websiteUrl && (
                <div className="pt-6 border-t border-slate-200 mt-6">
                  <a
                    href={org.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-dlsu-800 hover:text-dlsu-900"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact and Secretariat Helpdesk */}
        <div className="rounded-2xl bg-gradient-to-br from-dlsu-900 to-dlsu-dark text-white p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white text-balance">
              Contact Conference Secretariat
            </h3>
            <p className="text-sm sm:text-base text-dlsu-100 max-w-xl leading-relaxed text-pretty">
              Have questions regarding paper submissions, presentation formats, invitations for international travel visas, or sponsorship opportunities?
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-sm text-dlsu-100">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href={`mailto:${config.contactEmail}`} className="underline underline-offset-2 hover:text-white font-medium">
                  {config.contactEmail}
                </a>
              </div>
              {config.emergencyContact && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">{config.emergencyContact}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            <a
              href={`mailto:${config.contactEmail}?subject=CITAS%202027%20Inquiry`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm shadow-md transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
