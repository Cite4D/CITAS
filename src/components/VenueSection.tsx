import React from 'react';
import { useConference } from '../context/ConferenceContext';
import { MapPin, Plane, Train, Compass, ExternalLink, Building } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const { config } = useConference();
  const venue = config.venueFull;

  return (
    <section id="venue" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dlsu-900 tracking-tight mb-4 text-balance">
            Conference Venue
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-pretty max-w-[68ch] mx-auto">
            CITAS 2027 will convene on the historic main campus of De La Salle University in Manila, Philippines, combining century-old neoclassical heritage with state-of-the-art computing facilities.
          </p>
        </div>

        {/* Venue Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Campus Overview & Directions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-dlsu-50 border border-dlsu-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-dlsu-900 text-xs font-bold uppercase tracking-wider">
                <Building className="w-5 h-5 text-dlsu-800" />
                <span>Host Campus & Building</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-dlsu-900">
                {venue.campus}
              </h3>
              <p className="text-sm sm:text-base text-slate-800 font-medium">
                {venue.building}
              </p>
              <div className="flex items-start gap-2 text-sm text-slate-700 pt-2 border-t border-dlsu-200">
                <MapPin className="w-4 h-4 text-dlsu-800 flex-shrink-0 mt-0.5" />
                <span>{venue.address}, {venue.city}</span>
              </div>
            </div>

            {/* Travel Directions Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-dlsu-100 text-dlsu-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">From Airport (NAIA)</h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-pretty max-w-[60ch]">
                      {venue.directionsGuide.airport}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-dlsu-100 text-dlsu-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Public Transit & LRT-1</h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-pretty max-w-[60ch]">
                      {venue.directionsGuide.transit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-dlsu-100 text-dlsu-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Neighborhood & Landmarks</h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-pretty max-w-[60ch]">
                      {venue.directionsGuide.landmarks}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Embed */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 h-[380px] sm:h-[420px] relative">
              <iframe
                title="De La Salle University Manila Campus Map"
                src={venue.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-mono text-slate-600 font-semibold">
                GPS: {venue.coordinates.lat}&deg; N, {venue.coordinates.lng}&deg; E
              </span>
              <a
                href={`https://maps.google.com/?q=${venue.coordinates.lat},${venue.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-dlsu-800 hover:text-dlsu-900"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
