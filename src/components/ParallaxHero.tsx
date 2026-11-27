import React, { useEffect, useRef, useState } from 'react';
import { useConference } from '../context/ConferenceContext';
import manilaSkylineImg from '../assets/manila-skyline.jpg';

export const ParallaxHero: React.FC = () => {
  const { config } = useConference();
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = 0;
    const updateParallax = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Shift image downward slower than scroll speed for true parallax depth
      const offset = Math.max(-80, Math.min(140, -rect.top * 0.32));
      setParallaxOffset(offset);
      rafId = 0;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dates"
      aria-label="Conference overview, important dates, and paper submission"
      className="relative w-full overflow-hidden border-b-2 border-slate-300 bg-[#002f22]"
    >
      {/* Parallax Background Image Layer (Unsplash Manila Skyline) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 -top-24 -bottom-24 will-change-transform"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.06)`,
        }}
      >
        <img
          src={manilaSkylineImg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Institutional DLSU Green Overlay Scrim for High Readability (>= 7:1 contrast) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0, 42, 30, 0.84) 0%, rgba(0, 56, 41, 0.68) 55%, rgba(0, 36, 26, 0.82) 100%)',
        }}
      />

      {/* Foreground Content: First Viewport Priorities */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-6">
        {/* Conference Header Lockup */}
        <div className="space-y-1.5 text-white border-b border-white/25 pb-5">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {config.acronym}
          </h1>
          <p className="text-lg sm:text-xl font-bold text-white leading-snug max-w-[65ch]">
            {config.fullName}
          </p>
          <p className="text-sm sm:text-base text-emerald-100 pt-1">
            <strong>Dates:</strong> {config.datesText} &nbsp;|&nbsp; <strong>Venue:</strong> {config.venueBrief}
          </p>
        </div>

        {/* Side-by-Side Primary Blocks: Important Dates + Paper Submission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Important Dates Table Panel */}
          <div className="lg:col-span-7 bg-white border border-slate-400">
            <div className="bg-dlsu-800 text-white px-4 py-2.5 font-sans font-bold text-sm uppercase tracking-wider">
              Important Dates
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-400">
                    <th className="px-3 py-2 border-r border-slate-400 font-bold text-slate-900 w-1/2">
                      Event / Milestone
                    </th>
                    <th className="px-3 py-2 font-bold text-slate-900">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {config.importantDates.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 border-r border-slate-300 text-slate-900 font-normal">
                        {item.title}
                      </td>
                      <td className="px-3 py-2 text-slate-900 font-normal">
                        {item.dateStr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paper Submission Panel */}
          <div className="lg:col-span-5 bg-white border border-slate-400 font-sans">
            <div className="bg-slate-800 text-white px-4 py-2.5 font-bold text-sm uppercase tracking-wider">
              Paper Submission
            </div>
            <div className="p-4 sm:p-5 space-y-4 text-sm sm:text-base text-slate-900 font-serif">
              <p className="leading-relaxed">
                <strong>Format:</strong> {config.submissionGuidelines.formatName},{' '}
                {config.submissionGuidelines.pageLimit.toLowerCase()}.
              </p>

              <div className="space-y-1.5 border-t border-slate-200 pt-3">
                <div className="font-bold text-slate-900 font-sans text-xs uppercase tracking-wider">
                  Online Submission Form
                </div>
                <div>
                  <a
                    href={config.submissionGuidelines.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-dlsu-900 hover:text-black underline inline-block"
                  >
                    &rarr; Submit Paper (Google Form)
                  </a>
                </div>
                <div className="text-xs font-mono text-slate-700 break-all">
                  {config.submissionGuidelines.portalUrl}
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-200 pt-3">
                <div className="font-bold text-slate-900 font-sans text-xs uppercase tracking-wider">
                  Formatting Templates
                </div>
                <div>
                  <a
                    href={config.submissionGuidelines.templateLatexUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dlsu-900 font-bold underline hover:text-black block"
                  >
                    &bull; LaTeX Style Files (GitHub)
                  </a>
                </div>
                <div>
                  <a
                    href={config.submissionGuidelines.templateDocxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dlsu-900 font-bold underline hover:text-black block"
                  >
                    &bull; Word Template (.docx)
                  </a>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 font-sans text-xs sm:text-sm">
                <a
                  href="#submission"
                  className="text-slate-800 font-bold underline hover:text-dlsu-900"
                >
                  &rarr; View Review Policy &amp; Full Guidelines
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
