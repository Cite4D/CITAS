export interface Organizer {
  id: string;
  name: string;
  role: string;
  institution: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export interface ImportantDate {
  id: string;
  dateStr: string;
  title: string;
  description?: string;
  status: 'upcoming' | 'active' | 'passed' | 'highlighted';
  iconType: 'document' | 'check' | 'card' | 'pencil' | 'calendar' | 'award';
}

export interface ScopeCategory {
  id: string;
  name: string;
  description: string;
  topics: string[];
}

export interface SubmissionDetails {
  submissionPortalName: string;
  submissionPortalUrl: string;
  formatName: string;
  pageLimit: string;
  guidelinesSummary: string;
  templateLatexUrl: string;
  templateDocxUrl: string;
  blindReviewNotes: string;
  presentationNotes: string;
}

export interface RegistrationTier {
  id: string;
  name: string;
  category: 'Local (PHP)' | 'International (USD)';
  earlyBirdRate: string;
  regularRate: string;
  perks: string[];
  isPopular?: boolean;
}

export interface VenueInfo {
  campus: string;
  building: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  directionsGuide: {
    airport: string;
    transit: string;
    landmarks: string;
  };
  mapEmbedUrl: string;
}

export interface ConferenceConfig {
  version: number;
  lastUpdated: string;
  acronym: string;
  edition: string;
  fullName: string;
  tagline: string;
  datesText: string;
  mainConferenceDate: string;
  venueBrief: string;
  venueFull: VenueInfo;
  introductionParagraphs: string[];
  aimsParagraphs: string[];
  organizers: Organizer[];
  importantDates: ImportantDate[];
  scopeCategories: ScopeCategory[];
  submission: SubmissionDetails;
  registrationTiers: RegistrationTier[];
  contactEmail: string;
  emergencyContact?: string;
  noticeBanner?: {
    enabled: boolean;
    text: string;
    type: 'info' | 'warning' | 'success';
  };
}
