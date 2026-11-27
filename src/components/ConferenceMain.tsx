import React from 'react';
import { useConference } from '../context/ConferenceContext';

export const ConferenceMain: React.FC = () => {
  const { config } = useConference();

  return (
    <article className="space-y-12 max-w-4xl mx-auto py-6">
      {/* I. PAPER SUBMISSION GUIDELINES */}
      <section id="submission" className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dlsu-900 border-b-2 border-dlsu-800 pb-2 uppercase tracking-wide">
          Paper Submission Guidelines
        </h2>

        <div className="space-y-4 text-slate-900 text-base sm:text-lg leading-relaxed max-w-[65ch] text-pretty">
          <p>{config.submissionGuidelines.summary}</p>

          <p>
            <strong>Formatting Format: </strong>
            Authors intending to submit should follow the <strong>two-column ACL format (A4 size)</strong> and may consist of <strong>up to six (6) pages of content</strong>, excluding references and appendices.
          </p>

          <div className="p-4 bg-slate-50 border border-slate-300 space-y-2 text-sm sm:text-base">
            <div className="font-bold text-slate-900">Official Manuscript Templates:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-800">
              <li>
                <strong>LaTeX Template: </strong>
                <a
                  href={config.submissionGuidelines.templateLatexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dlsu-800 font-bold underline hover:text-dlsu-900 break-all"
                >
                  {config.submissionGuidelines.templateLatexUrl}
                </a>
              </li>
              <li>
                <strong>Microsoft Word (.docx) Template: </strong>
                <a
                  href={config.submissionGuidelines.templateDocxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dlsu-800 font-bold underline hover:text-dlsu-900 break-all"
                >
                  {config.submissionGuidelines.templateDocxUrl}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Review Policy:</h3>
            <ul className="list-disc list-outside ml-6 space-y-1.5 text-slate-900 text-base leading-relaxed text-pretty">
              {config.submissionGuidelines.blindReviewRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 border border-slate-300 bg-slate-50 space-y-2 max-w-[68ch]">
            <h3 className="text-lg font-bold text-slate-900">Online Submission Form:</h3>
            <p className="text-base text-slate-900">
              Papers must be submitted online through the official conference submission form:
            </p>
            <div className="pt-1">
              <a
                href={config.submissionGuidelines.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-dlsu-900 hover:text-black underline inline-block"
              >
                &rarr; Submit Paper (Google Form)
              </a>
            </div>
            <div className="text-xs font-mono text-slate-600 break-all pt-1">
              Direct Link: {config.submissionGuidelines.portalUrl}
            </div>
          </div>
        </div>
      </section>

      {/* II. EVENT BACKGROUND & OBJECTIVES */}
      <section id="objectives" className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dlsu-900 border-b-2 border-dlsu-800 pb-2 uppercase tracking-wide">
          Event Background & Objectives
        </h2>

        <div className="space-y-4 text-slate-900 leading-relaxed text-base sm:text-lg max-w-[58ch] text-pretty">
          {config.backgroundText.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="space-y-3 pt-2 max-w-[58ch]">
          <h3 className="text-xl font-bold text-slate-900">
            Conference Objectives:
          </h3>
          <ol className="list-decimal list-outside ml-6 space-y-2 text-slate-900 text-base sm:text-lg leading-relaxed text-pretty">
            {config.objectives.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ol>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-300 text-sm sm:text-base text-slate-900 leading-relaxed max-w-[58ch] text-pretty">
          <strong>Publication Note: </strong>
          {config.publicationNote}
        </div>
      </section>

      {/* III. PROGRAM SCHEDULE (Days 1, 2, 3 from PDF) */}
      <section id="program" className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dlsu-900 border-b-2 border-dlsu-800 pb-2 uppercase tracking-wide">
          Program Schedule of Activities
        </h2>

        <div className="space-y-8 max-w-[68ch]">
          {config.programSchedule.map((day, dIdx) => (
            <div key={dIdx} className="space-y-3">
              <h3 className="text-xl font-bold text-dlsu-900 border-b border-slate-300 pb-1">
                {day.dayTitle} &mdash; <span>{day.dateStr}</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-400 text-sm sm:text-base">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-400">
                      <th className="p-2.5 border-r border-slate-400 font-bold text-slate-900 w-36 sm:w-48">
                        Time
                      </th>
                      <th className="p-2.5 font-bold text-slate-900">
                        Activity / Program Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {day.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-slate-50">
                        <td className="p-2.5 border-r border-slate-300 font-bold text-slate-900 align-top">
                          {item.time}
                        </td>
                        <td className="p-2.5 text-slate-900 align-top space-y-1">
                          <div className="font-semibold">{item.description}</div>
                          {item.details && (
                            <ul className="list-disc list-inside space-y-0.5 text-slate-800 text-sm pl-1">
                              {item.details.map((det, detIdx) => (
                                <li key={detIdx}>{det}</li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IV. CALL FOR PAPERS & TOPICS OF INTEREST */}
      <section id="scope" className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dlsu-900 border-b-2 border-dlsu-800 pb-2 uppercase tracking-wide">
          Topics of Interest
        </h2>

        <p className="text-slate-900 text-base sm:text-lg leading-relaxed max-w-[65ch] text-pretty">
          CITAS 2027 invites researchers, educators, and industry professionals to share original work. Topics of interest include, but are not limited to:
        </p>

        <div className="border border-slate-300 p-5 bg-slate-50 max-w-[68ch]">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-base text-slate-900">
            {config.topics.map((t, idx) => (
              <li key={idx} className="leading-snug">
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VI. REGISTRATION FEES (Official PDF Table) */}
      <section id="registration" className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dlsu-900 border-b-2 border-dlsu-800 pb-2 uppercase tracking-wide">
          Proposed Registration Fees
        </h2>

        <div className="overflow-x-auto max-w-[68ch]">
          <table className="w-full text-left border-collapse border border-slate-400 text-base sm:text-lg">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-400">
                <th className="p-3 border-r border-slate-400 font-bold text-slate-900">
                  Participant Type
                </th>
                <th className="p-3 border-r border-slate-400 font-bold text-slate-900 w-44">
                  Amount
                </th>
                <th className="p-3 font-bold text-slate-900">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {config.registrationFees.map((fee, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 border-r border-slate-300 font-bold text-slate-900">
                    {fee.participantType}
                  </td>
                  <td className="p-3 border-r border-slate-300 font-bold text-dlsu-900 font-mono">
                    {fee.amount}
                  </td>
                  <td className="p-3 text-slate-700 text-sm">
                    {fee.notes || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-300 text-sm sm:text-base text-slate-900 max-w-[68ch]">
          <strong>Note: </strong>
          {config.registrationNote}
        </div>
      </section>

      {/* VII. INVITED GUESTS & PARTNER INSTITUTIONS */}
      <section id="partners" className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dlsu-900 border-b-2 border-dlsu-800 pb-2 uppercase tracking-wide">
          Invited Guests & Partner Institutions
        </h2>

        <div className="space-y-4 max-w-[68ch]">
          <h3 className="text-xl font-bold text-slate-900">
            Invited Keynote Speakers:
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-400 text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-400">
                  <th className="p-2.5 border-r border-slate-400 font-bold text-slate-900">Speaker</th>
                  <th className="p-2.5 border-r border-slate-400 font-bold text-slate-900">Institution / Organization</th>
                  <th className="p-2.5 font-bold text-slate-900">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {config.invitedSpeakers.map((spk, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 border-r border-slate-300 font-bold text-slate-900">
                      {spk.name}
                    </td>
                    <td className="p-2.5 border-r border-slate-300 text-slate-800">
                      {spk.affiliation}
                    </td>
                    <td className="p-2.5 text-slate-700">
                      {spk.topicOrRole || 'Keynote Speaker'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3 pt-2 max-w-[68ch]">
          <h3 className="text-xl font-bold text-slate-900">
            Invited Partner Organizations:
          </h3>
          <ol className="list-decimal list-outside ml-6 space-y-1 text-slate-900 text-base leading-relaxed">
            {config.invitedPartners.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* VIII. VENUE */}
      <section id="venue" className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-dlsu-900 border-b-2 border-dlsu-800 pb-2 uppercase tracking-wide">
          Venue
        </h2>

        <p className="text-slate-900 text-base sm:text-lg leading-relaxed max-w-[65ch]">
          {config.venueDetailed}
        </p>
      </section>

      {/* X. INQUIRIES & CONTACT PERSON */}
      <section id="contact" className="space-y-4 border-t-2 border-slate-300 pt-6">
        <h2 className="text-xl font-bold text-slate-900 uppercase">
          Conference Inquiries & Secretariat
        </h2>

        <div className="text-slate-900 text-base leading-relaxed space-y-1 max-w-[65ch]">
          <p><strong>Contact Person: </strong>{config.contactPerson.name}</p>
          <p>{config.contactPerson.title}</p>
          <p>{config.contactPerson.department}</p>
          <p>{config.contactPerson.institution}</p>
          <p>
            <strong>Contact Number: </strong>{config.contactPerson.phone} &nbsp;|&nbsp;
            <strong> Email: </strong>
            <a href={`mailto:${config.contactPerson.email}`} className="text-dlsu-800 underline font-bold">
              {config.contactPerson.email}
            </a>
          </p>
        </div>
      </section>
    </article>
  );
};
