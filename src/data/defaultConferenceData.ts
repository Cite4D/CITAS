import { ConferenceConfig } from '../types/conference';

export const defaultConferenceData: ConferenceConfig = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  acronym: 'CITAS 2027',
  edition: '2027',
  fullName: 'Conference on Innovation, Technology, and Analytics for Society',
  tagline: 'Bridging Intelligent Technologies, Data Analytics, and Societal Transformation',
  datesText: 'February 16 to 18, 2027',
  mainConferenceDate: 'Wednesday, February 17, 2027',
  venueBrief: 'De La Salle University, Manila, Philippines',
  noticeBanner: {
    enabled: true,
    text: 'Call for Papers is now open! Initial submissions are due on November 20, 2026 via EasyChair.',
    type: 'info'
  },
  introductionParagraphs: [
    '(CITAS 2027) will be held on February 16-18, 2027, at De La Salle University, Manila, Philippines, with the main conference on Wednesday, February 17, 2027. CITAS 2027 is organized by Center for ICT for Development (CITE4D), and The Advanced Research Institute for Informatics, Computing, and Networking (AdRIC), De La Salle University.'
  ],
  aimsParagraphs: [
    'The aim of the conference is to enhance international academic exchange on intelligent technologies and their emerging applications, and to provide a chance for communication among academics, scientists, engineers, and practitioners.',
    'Researchers from around the globe are invited to present original contributions, share pioneering research, and engage in high-impact interdisciplinary discussions on computing and analytics for societal progress.'
  ],
  organizers: [
    {
      id: 'cite4d',
      name: 'Center for ICT for Development (CITE4D)',
      role: 'Lead Co-Organizer',
      institution: 'De La Salle University',
      websiteUrl: 'https://cite4d.com'
    },
    {
      id: 'adric',
      name: 'The Advanced Research Institute for Informatics, Computing, and Networking (AdRIC)',
      role: 'Lead Co-Organizer',
      institution: 'De La Salle University',
      websiteUrl: 'https://www.dlsu.edu.ph/research/research-centers/adric/'
    },
    {
      id: 'dlsu-ccs',
      name: 'College of Computer Studies',
      role: 'Host Institution',
      institution: 'De La Salle University',
      websiteUrl: 'https://www.dlsu.edu.ph/colleges/ccs/'
    }
  ],
  importantDates: [
    {
      id: 'd1',
      dateStr: 'November 20, 2026',
      title: 'Submission Deadline',
      description: 'Initial manuscript submission via EasyChair system.',
      status: 'active',
      iconType: 'document'
    },
    {
      id: 'd2',
      dateStr: 'December 7, 2026',
      title: 'Notification of Acceptance',
      description: 'Review outcome notices and reviewer feedback released to authors.',
      status: 'upcoming',
      iconType: 'check'
    },
    {
      id: 'd3',
      dateStr: 'January 4, 2027',
      title: 'Registration Deadline',
      description: 'Early bird and author conference registration closes.',
      status: 'upcoming',
      iconType: 'card'
    },
    {
      id: 'd4',
      dateStr: 'January 4, 2027',
      title: 'Full Paper Final Submission (Camera-Ready)',
      description: 'Camera-ready copies incorporating reviewer revisions due.',
      status: 'highlighted',
      iconType: 'pencil'
    },
    {
      id: 'd5',
      dateStr: 'February 16, 2027',
      title: 'Pre-Conference Workshops',
      description: 'Doctoral consortium, technical tutorials, and campus reception.',
      status: 'upcoming',
      iconType: 'calendar'
    },
    {
      id: 'd6',
      dateStr: 'February 17, 2027',
      title: 'Main Conference Day (DLSU)',
      description: 'Keynote addresses, oral parallel paper tracks, and poster sessions.',
      status: 'highlighted',
      iconType: 'calendar'
    },
    {
      id: 'd7',
      dateStr: 'February 18, 2027',
      title: 'Special Sessions & Awards',
      description: 'Industry colloquium, best paper awards, and closing banquet.',
      status: 'upcoming',
      iconType: 'award'
    }
  ],
  scopeCategories: [
    {
      id: 'ai-core',
      name: 'Artificial Intelligence & Intelligent Systems',
      description: 'Core theories, machine learning models, neuro-fuzzy systems, and intelligent reasoning architectures.',
      topics: [
        'Artificial Intelligence and Expert Systems',
        'Machine Learning and Deep Learning',
        'Neural Networks',
        'Hybrid Intelligent Systems',
        'Knowledge-Based Systems',
        'Knowledge Discovery and Data Mining',
        'Learning Systems',
        'Fuzzy Systems and Rough Sets',
        'Fuzzy Optimization and Decision Making',
        'Human-Machine Learning'
      ]
    },
    {
      id: 'analytics-decision',
      name: 'Big Data, Analytics & Optimization',
      description: 'Data architectures, process discovery, mathematical optimization, and advanced decision intelligence.',
      topics: [
        'Big Data Analytics and Applications',
        'Decision Support Systems',
        'Information Theory and Applications',
        'Intelligent Information Systems',
        'Process Mining and Process Analytics',
        'Optimization Techniques',
        'Optimal, Adaptive, Predictive Control'
      ]
    },
    {
      id: 'cyberphysical-iot',
      name: 'Cyber-Physical, IoT & Smart Energy',
      description: 'Sensors, robotics, autonomous control, industrial automation, and sustainable energy grids.',
      topics: [
        'Intelligent Systems for IoT',
        'Smart Manufacturing and IoT',
        'Electric Vehicles and Smart Energy Systems',
        'Power Systems',
        'Real-Time Systems',
        'Fault Detection',
        'Robotics and Motion Control'
      ]
    },
    {
      id: 'applications-society',
      name: 'Societal Applications, Mobility & Cloud',
      description: 'Translating computing innovations into societal impact, mobility solutions, and connected infrastructure.',
      topics: [
        'Image and Speech Signal Processing',
        'Guidance and Navigation Systems',
        'Transportation Control and Applications',
        'Transportation Information Engineering',
        'Web Services and Cloud Computing',
        'Human Science for Intelligent Systems'
      ]
    }
  ],
  submission: {
    submissionPortalName: 'EasyChair Conference System',
    submissionPortalUrl: 'https://easychair.org/conferences/?conf=ailric2027',
    formatName: 'ACL Two-Column Format (A4 Size)',
    pageLimit: 'Up to six (6) pages of content, excluding references and appendices',
    guidelinesSummary: 'Submissions should describe unpublished completed original work. Authors intending to submit should follow the two-column ACL format. Please note that CITAS is not an ACL event; the ACL template is adopted solely for formatting consistency.',
    templateLatexUrl: 'https://github.com/acl-org/acl-style-files',
    templateDocxUrl: 'https://2023.aclweb.org/calls/style_and_formatting/',
    blindReviewNotes: 'No page number should appear in the paper. Submissions will be judged based on relevance, technical strength, significance, opportunities, and interest to the attendees. As the reviewing will be double-blind, authors must NOT indicate their names and affiliations in the submitted papers.',
    presentationNotes: 'Accepted papers will be presented orally or as posters as determined by the committee. Oral papers and abstracts of poster papers will be included in the official proceedings.'
  },
  registrationTiers: [
    {
      id: 'local-author',
      name: 'Philippine Author (Regular)',
      category: 'Local (PHP)',
      earlyBirdRate: 'PHP 8,500',
      regularRate: 'PHP 10,000',
      perks: [
        'Full access to all 3-day tracks and keynotes',
        'Publication of 1 accepted paper in proceedings',
        'Official conference kit & printed program',
        'Lunch, morning & afternoon coffee breaks',
        'Certificate of Oral/Poster Presentation'
      ],
      isPopular: true
    },
    {
      id: 'local-student',
      name: 'Philippine Student Author',
      category: 'Local (PHP)',
      earlyBirdRate: 'PHP 6,000',
      regularRate: 'PHP 7,500',
      perks: [
        'Requires valid student ID / verification',
        'Full access to all technical sessions',
        'Publication of 1 student-authored paper',
        'Conference kit & certificates',
        'Meals and refreshments included'
      ]
    },
    {
      id: 'intl-author',
      name: 'International Author',
      category: 'International (USD)',
      earlyBirdRate: 'USD 350',
      regularRate: 'USD 420',
      perks: [
        'Full access to all technical & keynote sessions',
        'Publication of 1 paper in official proceedings',
        'Gala banquet dinner invitation',
        'Conference delegate kit & certificate',
        'Campus tour of historic DLSU St. La Salle Hall'
      ],
      isPopular: true
    },
    {
      id: 'non-author',
      name: 'General Attendee / Observer',
      category: 'Local (PHP)',
      earlyBirdRate: 'PHP 4,500',
      regularRate: 'PHP 5,500',
      perks: [
        'Access to all open oral presentations and exhibitions',
        'Conference badge & delegate folder',
        'Daily snacks and networking coffee sessions',
        'Certificate of Attendance'
      ]
    }
  ],
  venueFull: {
    campus: 'De La Salle University (Manila Campus)',
    building: 'St. La Salle Hall / Henry Sy Sr. Hall',
    address: '2401 Taft Avenue, Malate',
    city: 'Manila 1004, Philippines',
    coordinates: {
      lat: 14.5647,
      lng: 120.9932
    },
    directionsGuide: {
      airport: 'From Ninoy Aquino International Airport (NAIA Terminals 1, 2, 3), DLSU Manila is approximately 8 km north (25–40 minutes via NAIA Expressway / Metro Manila Skyway to Quirino or Buendia exit). Metered and Grab taxis are readily available at airport arrivals.',
      transit: 'DLSU is directly accessible via the LRT-1 (Light Rail Transit Line 1). Alight at Vito Cruz Station, which is situated directly in front of the university entrance along Taft Avenue.',
      landmarks: 'Situated along Taft Avenue, directly across from University Mall and adjacent to the Rizal Memorial Sports Complex.'
    },
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.3409176378453!2d120.99066617618035!3d14.564687077609277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c97800000001%3A0x6b8ec434460f38b0!2sDe%20La%20Salle%20University!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph'
  },
  contactEmail: 'cite4d@dlsu.edu.ph',
  emergencyContact: '+63 (2) 8524-4611 loc. 300'
};
