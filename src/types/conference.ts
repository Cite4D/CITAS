export interface ImportantDate {
  id: string;
  dateStr: string;
  title: string;
  notes?: string;
  isHighlight?: boolean;
}

export interface ProgramItem {
  time: string;
  description: string;
  details?: string[];
}

export interface ProgramDay {
  dayTitle: string;
  dateStr: string;
  items: ProgramItem[];
}

export interface CommitteePerson {
  role: string;
  name: string;
  affiliation: string;
}

export interface RegistrationFee {
  participantType: string;
  amount: string;
  notes?: string;
}

export interface ConferenceConfig {
  version: number;
  lastUpdated: string;
  acronym: string;
  fullName: string;
  datesText: string;
  venueBrief: string;
  venueDetailed: string;
  backgroundText: string[];
  objectives: string[];
  publicationNote: string;
  importantDates: ImportantDate[];
  programSchedule: ProgramDay[];
  invitedSpeakers: {
    name: string;
    affiliation: string;
    topicOrRole?: string;
  }[];
  invitedPartners: string[];
  committeeLeadership: CommitteePerson[];
  committeeMembers: {
    name: string;
    affiliation: string;
  }[];
  topics: string[];
  registrationFees: RegistrationFee[];
  registrationNote: string;
  submissionGuidelines: {
    formatName: string;
    pageLimit: string;
    summary: string;
    templateLatexUrl: string;
    templateDocxUrl: string;
    portalUrl: string;
    blindReviewRules: string[];
  };
  contactPerson: {
    name: string;
    title: string;
    department: string;
    institution: string;
    phone: string;
    email: string;
  };
}
