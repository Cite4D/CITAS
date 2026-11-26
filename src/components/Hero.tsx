import React, { useState, useEffect } from 'react';
import { useConference } from '../context/ConferenceContext';
import { Calendar, MapPin, ExternalLink, FileText, ChevronRight, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  const { config } = useConference();

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-11-20T23:59:59+08:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative bg-dlsu-dark text-white overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
      {/* Heritage Architectural Background Visual */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <svg className="w-full h-full object-cover" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect width="1440" height="800" fill="#00563F" />
          <path d="M0 120 H1440 V150 H0 Z" fill="#ffffff" opacity="0.15" />
          <path d="M0 160 H1440 V175 H0 Z" fill="#ffffff" opacity="0.1" />
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 85 + 20}, 175)`}>
              <rect x="0" y="0" width="55" height="480" fill="#ffffff" opacity="0.08" rx="2" />
              <rect x="-6" y="-12" width="67" height="12" fill="#ffffff" opacity="0.15" />
              <rect x="-8" y="480" width="71" height="20" fill="#ffffff" opacity="0.15" />
              <line x1="12" y1="5" x2="12" y2="475" stroke="#000000" strokeWidth="2" opacity="0.2" />
              <line x1="27" y1="5" x2="27" y2="475" stroke="#000000" strokeWidth="2" opacity="0.2" />
              <line x1="42" y1="5" x2="42" y2="475" stroke="#000000" strokeWidth="2" opacity="0.2" />
            </g>
          ))}
          <circle cx="720" cy="400" r="320" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 6" opacity="0.1" />
        </svg>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-dlsu-dark/80 via-dlsu-900/90 to-dlsu-dark pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dlsu-800/90 border border-dlsu-600/60 text-dlsu-100 text-xs sm:text-sm font-medium mb-6 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-dlsu-400" />
            <span>De La Salle University &bull; CITE4D &bull; AdRIC</span>
          </div>

          {/* Conference Acronym */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 text-balance">
            {config.acronym}
          </h1>

          {/* Full Name */}
          <p className="text-lg sm:text-2xl md:text-3xl font-medium text-dlsu-100 max-w-3xl mx-auto leading-relaxed mb-6 text-balance">
            {config.fullName}
          </p>

          {/* Dates & Venue Badge Bar */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 text-sm sm:text-base font-medium mb-8">
            <div className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 text-dlsu-300 flex-shrink-0" />
              <span>{config.datesText}</span>
            </div>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5 text-dlsu-300 flex-shrink-0" />
              <span>{config.venueBrief}</span>
            </div>
          </div>

          {/* Main Conference Tag */}
          <div className="mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 text-xs sm:text-sm font-semibold tracking-wide">
              Main Conference: {config.mainConferenceDate}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href={config.submission.submissionPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-base shadow-lg transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400"
            >
              <span>Submit via EasyChair</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="#scope"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore 30 Research Topics</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#submission"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-dlsu-100 font-medium text-base border border-white/10 transition-all hover:text-white"
            >
              <FileText className="w-4 h-4" />
              <span>Author Guidelines</span>
            </a>
          </div>

          {/* Countdown Box */}
          <div className="bg-black/40 border border-white/15 rounded-2xl p-5 sm:p-6 backdrop-blur-md max-w-2xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-200 font-semibold uppercase tracking-wider mb-3">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Initial Paper Submission Deadline &bull; Nov 20, 2026</span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 border border-white/10">
                <span className="block font-mono text-xl sm:text-3xl font-bold text-white tabular-nums">
                  {timeLeft.days}
                </span>
                <span className="text-xs text-slate-300 uppercase font-medium">Days</span>
              </div>
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 border border-white/10">
                <span className="block font-mono text-xl sm:text-3xl font-bold text-white tabular-nums">
                  {timeLeft.hours}
                </span>
                <span className="text-xs text-slate-300 uppercase font-medium">Hours</span>
              </div>
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 border border-white/10">
                <span className="block font-mono text-xl sm:text-3xl font-bold text-white tabular-nums">
                  {timeLeft.minutes}
                </span>
                <span className="text-xs text-slate-300 uppercase font-medium">Mins</span>
              </div>
              <div className="bg-white/10 rounded-lg p-2 sm:p-3 border border-white/10">
                <span className="block font-mono text-xl sm:text-3xl font-bold text-white tabular-nums">
                  {timeLeft.seconds}
                </span>
                <span className="text-xs text-slate-300 uppercase font-medium">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
