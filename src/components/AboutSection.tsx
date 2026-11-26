import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { Globe, Users, Cpu, Building2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { config } = useConference();

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Introduction & Aims */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dlsu-900 tracking-tight text-balance">
              Conference Introduction
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-800 leading-relaxed max-w-[62ch] text-pretty">
              {config.introductionParagraphs.map((para, i) => (
                <p key={i} className="font-medium max-w-[60ch]">
                  {para}
                </p>
              ))}

              {config.aimsParagraphs.map((para, i) => (
                <p key={i} className="text-slate-700 max-w-[60ch]">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Pillars - Inline icons in flow without template box containers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-dlsu-800">
                  <Globe className="w-5 h-5 flex-shrink-0" />
                  <h3 className="font-bold text-dlsu-900 text-base">Global Exchange</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed text-pretty">
                  Connecting researchers, scientists, and practitioners across the globe.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-dlsu-800">
                  <Cpu className="w-5 h-5 flex-shrink-0" />
                  <h3 className="font-bold text-dlsu-900 text-base">Emerging Tech</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed text-pretty">
                  Advancing AI, IoT, neural architectures, and intelligent data systems.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-dlsu-800">
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <h3 className="font-bold text-dlsu-900 text-base">Societal Impact</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed text-pretty">
                  Empowering human well-being, sustainability, and technological equity for all communities.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Host Showcase */}
          <div className="lg:col-span-5 bg-gradient-to-br from-dlsu-900 to-dlsu-dark text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <Building2 className="w-56 h-56 text-white" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="border-b border-dlsu-700/80 pb-4">
                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                  Organizing Institutions
                </h3>
                <p className="text-sm text-dlsu-200">
                  Under the auspices of De La Salle University, Manila
                </p>
              </div>

              <div className="divide-y divide-dlsu-700/60">
                {config.organizers.map((org) => (
                  <div key={org.id} className="py-4 first:pt-0 last:pb-0 space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 block">
                      {org.role}
                    </span>
                    <h4 className="font-bold text-white text-base">
                      {org.name}
                    </h4>
                    <p className="text-sm text-dlsu-200">
                      {org.institution}
                    </p>
                    {org.websiteUrl && (
                      <a
                        href={org.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-200 hover:text-white pt-1 font-medium"
                      >
                        <span>Visit Institute Page</span>
                        <span>&rarr;</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-dlsu-200/90 italic">
                CITAS 2027 brings together leading minds at De La Salle University’s historic Manila campus.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
