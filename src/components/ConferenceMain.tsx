import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { ExternalLink, Building, MapPin, Mail } from 'lucide-react';

export const ConferenceMain: React.FC = () => {
  const { config } = useConference();
  const venue = config.venueFull;

  return (
    <article className="space-y-12">
      {/* 1. Conference Introduction */}
      <section id="about" className="space-y-4">
        <div className="border-b-2 border-dlsu-800 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-dlsu-900 tracking-tight">
            Conference Introduction
          </h2>
        </div>

        <div className="space-y-3.5 text-sm sm:text-base text-slate-800 leading-relaxed text-pretty max-w-[70ch]">
          {config.introductionParagraphs.map((para, i) => (
            <p key={i} className="font-normal">
              {para}
            </p>
          ))}

          {config.aimsParagraphs.map((para, i) => (
            <p key={i} className="text-slate-700">
              {para}
            </p>
          ))}
        </div>

        {/* Institutional Host Note */}
        <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs sm:text-sm text-slate-700 space-y-1 max-w-[70ch]">
          <div className="font-semibold text-dlsu-900">Organized by:</div>
          <ul className="list-disc list-inside space-y-0.5 text-slate-800">
            {config.organizers.map((org) => (
              <li key={org.id}>
                <strong>{org.name}</strong>, {org.institution}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Call for Papers & Scope (Classic Multi-Column Academic Topic Lists) */}
      <section id="scope" className="space-y-6">
        <div className="border-b-2 border-dlsu-800 pb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-dlsu-900 tracking-tight">
            Call for Papers & Scope
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            30 Research Topics Across 4 Multidisciplinary Tracks
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed text-pretty max-w-[70ch]">
          CITAS 2027 invites authors to submit original completed research papers on innovation, technology, and analytics for society. The scope of the conference includes, but is not limited to, the following technical research tracks:
        </p>

        <div className="space-y-6">
          {config.scopeCategories.map((cat, idx) => (
            <div key={cat.id} className="border border-slate-200 rounded p-4 bg-white space-y-3">
              <h3 className="font-bold text-base text-dlsu-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-dlsu-800 text-white text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{cat.name}</span>
              </h3>
              <p className="text-xs text-slate-600 italic max-w-[70ch]">
                {cat.description}
              </p>

              {/* Multi-column bullet points (exact IEEE CFP format) */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-sm text-slate-800 list-disc list-inside pt-1">
                {cat.topics.map((t, tIdx) => (
                  <li key={tIdx} className="leading-snug">
                    <span className="font-normal">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Important Dates (Academic Table) */}
      <section id="dates" className="space-y-4">
        <div className="border-b-2 border-dlsu-800 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-dlsu-900 tracking-tight">
            Important Dates
          </h2>
        </div>

        <p className="text-sm text-slate-700 max-w-[70ch]">
          Authors are requested to observe the following critical conference milestones. All deadlines are 23:59 Anywhere on Earth (AoE).
        </p>

        <div className="overflow-x-auto border border-slate-300 rounded">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 font-bold">
                <th className="py-2.5 px-4 w-1/3">Milestone Event</th>
                <th className="py-2.5 px-4 w-1/3">Date</th>
                <th className="py-2.5 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {config.importantDates.map((item) => {
                const isHighlight = item.status === 'highlighted';
                const isActive = item.status === 'active';
                return (
                  <tr
                    key={item.id}
                    className={
                      isHighlight
                        ? 'bg-amber-50/60 font-semibold'
                        : isActive
                        ? 'bg-emerald-50/50'
                        : 'hover:bg-slate-50'
                    }
                  >
                    <td className="py-2.5 px-4 text-slate-900 font-medium">
                      {item.title}
                    </td>
                    <td
                      className={`py-2.5 px-4 ${
                        isHighlight
                          ? 'text-red-700 font-bold'
                          : isActive
                          ? 'text-dlsu-800 font-bold'
                          : 'text-slate-800'
                      }`}
                    >
                      {item.dateStr}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 text-xs">
                      {item.description || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Paper Submission Guidelines */}
      <section id="submission" className="space-y-5">
        <div className="border-b-2 border-dlsu-800 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-dlsu-900 tracking-tight">
            Paper Submission Guidelines
          </h2>
        </div>

        <div className="space-y-3 text-sm sm:text-base text-slate-800 leading-relaxed text-pretty max-w-[70ch]">
          <p>
            Submissions should describe unpublished completed original work. Authors intending to submit should follow the two-column ACL format and may consist of up to six (6) pages of content, excluding references and appendices.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 italic">
            Please note that CITAS is not an ACL-sponsored event; the ACL template is adopted solely for formatting consistency.
          </p>
        </div>

        {/* Template Download Links */}
        <div className="bg-slate-50 border border-slate-300 rounded p-4 space-y-2 text-xs sm:text-sm max-w-[70ch]">
          <div className="font-bold text-slate-900">Required Manuscript Templates (A4 Size):</div>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            <li>
              <span>LaTeX Template Repository: </span>
              <a
                href={config.submission.templateLatexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dlsu-800 font-semibold underline hover:text-dlsu-900 break-all"
              >
                {config.submission.templateLatexUrl}
              </a>
            </li>
            <li>
              <span>Microsoft Word (.docx) Format: </span>
              <a
                href={config.submission.templateDocxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dlsu-800 font-semibold underline hover:text-dlsu-900 break-all"
              >
                {config.submission.templateDocxUrl}
              </a>
            </li>
          </ul>
        </div>

        {/* Blind Review & Policy */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-800 max-w-[70ch]">
          <h3 className="font-bold text-base text-slate-900">Review Policy & Instructions</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 leading-relaxed">
            <li>
              <strong>No Page Numbers:</strong> No page numbers should appear in the submitted draft manuscript.
            </li>
            <li>
              <strong>Double-Blind Review:</strong> As the reviewing will be blind, authors must not indicate their names and affiliations in the submitted papers.
            </li>
            <li>
              <strong>Evaluation Criteria:</strong> Submissions will be judged based on relevance, technical strength, significance, opportunities, and interest to attendees.
            </li>
            <li>
              <strong>Presentation & Proceedings:</strong> Accepted papers will be presented orally or as posters as determined by the committee. Oral papers and abstracts of poster papers will be included in the proceedings.
            </li>
          </ul>
        </div>

        {/* EasyChair Link Box */}
        <div className="bg-dlsu-50 border border-dlsu-300 rounded p-4 text-xs sm:text-sm text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-[70ch]">
          <div>
            <span className="font-bold text-dlsu-900">Submission Portal: </span>
            <span>Papers must be submitted online through the EasyChair Conference System:</span>
            <div className="text-xs font-mono text-slate-600 break-all pt-0.5">
              {config.submission.submissionPortalUrl}
            </div>
          </div>
          <a
            href={config.submission.submissionPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-dlsu-800 hover:bg-dlsu-900 text-white font-bold text-xs flex-shrink-0 flex items-center gap-1.5 shadow-2xs"
          >
            <span>Submit via EasyChair</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 5. Registration Fees (IEEE Style Academic Table) */}
      <section id="registration" className="space-y-4">
        <div className="border-b-2 border-dlsu-800 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-dlsu-900 tracking-tight">
            Registration Fees
          </h2>
        </div>

        <p className="text-sm text-slate-700 max-w-[70ch]">
          At least one author of each accepted paper must complete author registration by January 4, 2027 in order for the paper to be included in the conference proceedings.
        </p>

        <div className="overflow-x-auto border border-slate-300 rounded">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 font-bold">
                <th className="py-2.5 px-4">Registration Category</th>
                <th className="py-2.5 px-4">Early Bird Rate (by Jan 4, 2027)</th>
                <th className="py-2.5 px-4">Regular Rate</th>
                <th className="py-2.5 px-4">Included Inclusions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {config.registrationTiers.map((tier) => (
                <tr key={tier.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{tier.name}</div>
                    <span className="text-xs font-medium text-slate-600 uppercase">
                      {tier.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-dlsu-900 font-mono">
                    {tier.earlyBirdRate}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700 font-mono">
                    {tier.regularRate}
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600">
                    <ul className="list-disc list-inside space-y-0.5">
                      {tier.perks.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Venue & Transit Guide */}
      <section id="venue" className="space-y-4">
        <div className="border-b-2 border-dlsu-800 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-dlsu-900 tracking-tight">
            Conference Venue & Location
          </h2>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-2 text-xs sm:text-sm text-slate-800 max-w-[70ch]">
          <div className="flex items-center gap-2 font-bold text-base text-dlsu-900">
            <Building className="w-4 h-4 text-dlsu-800" />
            <span>{venue.campus}</span>
          </div>
          <p className="font-medium text-slate-700">{venue.building}</p>
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-dlsu-800 flex-shrink-0" />
            <span>{venue.address}, {venue.city}</span>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-800 max-w-[70ch]">
          <h3 className="font-bold text-base text-slate-900">Getting to the Venue</h3>
          <div className="space-y-2">
            <div>
              <strong>From Airport (NAIA): </strong>
              <span className="text-slate-700">{venue.directionsGuide.airport}</span>
            </div>
            <div>
              <strong>By Public Transit (LRT-1): </strong>
              <span className="text-slate-700">{venue.directionsGuide.transit}</span>
            </div>
            <div>
              <strong>Landmarks: </strong>
              <span className="text-slate-700">{venue.directionsGuide.landmarks}</span>
            </div>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="rounded border border-slate-300 overflow-hidden h-[300px] w-full max-w-[70ch]">
          <iframe
            title="DLSU Manila Campus Map"
            src={venue.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* 7. Committees & Contact */}
      <section id="committee" className="space-y-4">
        <div className="border-b-2 border-dlsu-800 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-dlsu-900 tracking-tight">
            Committees & Secretariat Inquiries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm max-w-[70ch]">
          <div className="border border-slate-200 rounded p-4 bg-white space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">Organizing Units</h3>
            <p className="text-slate-700">
              Center for ICT for Development (CITE4D)<br />
              The Advanced Research Institute for Informatics, Computing, and Networking (AdRIC)<br />
              De La Salle University, Manila
            </p>
          </div>

          <div className="border border-slate-200 rounded p-4 bg-white space-y-1.5">
            <h3 className="font-bold text-slate-900 text-sm">Conference Secretariat</h3>
            <p className="text-slate-700">
              For general inquiries, submissions, visa invitation letters, and registrations:
            </p>
            <div className="pt-1 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-dlsu-800" />
              <a
                href={`mailto:${config.contactEmail}?subject=CITAS%202027%20Inquiry`}
                className="text-dlsu-800 font-bold underline hover:text-dlsu-900"
              >
                {config.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
