import React, { useState } from 'react';
import { useConference } from '../context/ConferenceContext';
import { FileText, Download, ExternalLink, Check, Copy, ShieldCheck, BookOpen } from 'lucide-react';

export const SubmissionSection: React.FC = () => {
  const { config } = useConference();
  const [copiedLink, setCopiedLink] = useState(false);

  const copySubmissionLink = () => {
    navigator.clipboard.writeText(config.submission.submissionPortalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="submission" className="py-16 sm:py-24 bg-[#fafbf9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dlsu-900 tracking-tight mb-4 text-balance">
            Paper Submission Guidelines
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-pretty max-w-[68ch] mx-auto">
            All submissions will undergo rigorous double-blind peer review by an international technical committee. Follow the specifications below to prepare your camera-ready manuscript.
          </p>
        </div>

        {/* 4 Core Pillars at a Glance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-dlsu-100 text-dlsu-900 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1">
              Page Limit
            </span>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Max 6 Pages</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Excluding bibliographic references and supplementary appendices.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-dlsu-100 text-dlsu-900 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1">
              Formatting Style
            </span>
            <h3 className="font-bold text-slate-900 text-lg mb-1">ACL Two-Column</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Standard A4 paper size, strict adherence to ACL style guidelines.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-dlsu-100 text-dlsu-900 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1">
              Review Policy
            </span>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Double-Blind</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Author names, affiliations, and identifying citations must be omitted.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-dlsu-100 text-dlsu-900 flex items-center justify-center mb-3">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-1">
              Presentation
            </span>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Oral & Posters</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Accepted manuscripts published in the official conference proceedings.
            </p>
          </div>
        </div>

        {/* Templates & Formatting Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Download Official Templates */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-dlsu-900 mb-2">
              Official Manuscript Templates
            </h3>
            <p className="text-sm text-slate-700 mb-6 leading-relaxed text-pretty max-w-[60ch]">
              Authors must use the official two-column template files below. Please note that CITAS is not an ACL-sponsored event; the ACL style is adopted solely for academic formatting uniformity.
            </p>

            <div className="divide-y divide-slate-200">
              <div className="py-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs">
                    LaTeX
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">LaTeX Style Package</h4>
                    <p className="text-xs text-slate-600">Official GitHub repository (A4 format)</p>
                  </div>
                </div>
                <a
                  href={config.submission.templateLatexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-bold hover:bg-slate-100 hover:border-slate-400 transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-700" />
                  <span>GitHub Repository</span>
                </a>
              </div>

              <div className="py-4 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs">
                    DOCX
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Microsoft Word Template</h4>
                    <p className="text-xs text-slate-600">Pre-formatted .docx style guide</p>
                  </div>
                </div>
                <a
                  href={config.submission.templateDocxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-bold hover:bg-slate-100 hover:border-slate-400 transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-700" />
                  <span>Download .docx</span>
                </a>
              </div>
            </div>
          </div>

          {/* Blind Review & Submission Checklist */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-dlsu-900 mb-2">
              Submission Criteria & Blind Review
            </h3>
            <p className="text-sm text-slate-700 mb-6 leading-relaxed text-pretty max-w-[60ch]">
              Submissions will be evaluated by multiple independent reviewers based on technical strength, novelty, empirical rigor, and societal significance.
            </p>

            <ul className="space-y-3.5 text-sm text-slate-800">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Anonymity:</strong> Do not include author names, affiliations, contact info, or grant acknowledgments in the submitted PDF.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>No Page Numbers:</strong> Page numbers must not appear on any page of the draft manuscript.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Originality:</strong> Submissions must describe unpublished, original research not currently under review elsewhere.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Language:</strong> All manuscripts must be written in grammatically sound English.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* EasyChair Direct Submission Action Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-dlsu-900 via-dlsu-800 to-dlsu-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded bg-white/20 text-emerald-100 text-xs font-bold tracking-wider uppercase mb-1">
              EasyChair Portal Active
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white text-balance">
              Submit Your Paper on EasyChair
            </h3>
            <p className="text-sm sm:text-base text-dlsu-100 max-w-xl text-pretty">
              Papers must be uploaded through the EasyChair Conference System under the CITAS track.
            </p>
            <div className="text-xs text-dlsu-200 font-mono break-all pt-1">
              Target: {config.submission.submissionPortalUrl}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={copySubmissionLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <a
              href={config.submission.submissionPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-sm font-bold shadow-lg transition-all hover:scale-105"
            >
              <span>Open EasyChair</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
