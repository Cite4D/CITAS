import { ConferenceConfig } from '../types/conference';

export const defaultConferenceData: ConferenceConfig = {
  version: 5,
  lastUpdated: new Date().toISOString(),
  acronym: 'CITAS 2027',
  fullName: 'International Conference on Innovation, Technology, and Analytics for Society',
  datesText: 'February 16 to 18, 2027',
  venueBrief: 'De La Salle University',
  venueDetailed: 'De La Salle University, 2401 Taft Avenue, Malate, Manila 1004, Philippines',
  backgroundText: [
    'The International Conference on Innovation, Technology and Analytics for Society (CITAS) 2027 is a three-day academic conference to be held on February 16 to 18, 2027 at De La Salle University, Manila, Philippines.',
    'The conference will gather faculty, researchers, students, and representatives of partner institutions to share work on innovation, technology, and analytics and their application specifically to society. It will also serve as a venue for students and aspiring researchers to present their research and capstone projects to an external audience.'
  ],
  objectives: [
    'Provide a forum for the presentation and discussion of research and applied work in innovation, technology, and analytics.',
    'Strengthen linkages with local and international academic, government, and industry partners.',
    'Give students, particularly BSIT / BSIS / MSIT capstone and research teams, the opportunity to present before invited guests and professionals.',
    'Host visiting guests through a welcome dinner and a technical workshop.'
  ],
  publicationNote: 'This conference will handle full papers, extended abstracts, and posters with possible publication at the Philippine Computing Journal in cooperation with editor Mr. Nathaniel Oco.',
  importantDates: [
    {
      id: 'd1',
      dateStr: 'December 18, 2026 (Friday)',
      title: 'Deadline for Paper Submission',
      notes: 'Initial manuscript submission via online form.',
      isHighlight: true
    },
    {
      id: 'd2',
      dateStr: 'January 08, 2027 (Friday)',
      title: 'Notification of Acceptance',
      notes: 'Review outcomes and reviewers feedback released to authors.'
    },
    {
      id: 'd3',
      dateStr: 'January 15, 2027 (Friday)',
      title: 'Deadline for Registration',
      notes: 'Author and participant registration deadline.'
    },
    {
      id: 'd4',
      dateStr: 'January 29, 2027 (Friday)',
      title: 'Full Paper Final Submission (Camera-Ready)',
      notes: 'Final camera-ready copies incorporating reviewer revisions due.',
      isHighlight: true
    },
    {
      id: 'd5',
      dateStr: 'February 16, 2027 (Tuesday)',
      title: 'Day 1: Welcome Remarks & International Dinner',
      notes: '5:30 PM — Welcome remarks and dinner with international guests.'
    },
    {
      id: 'd6',
      dateStr: 'February 17, 2027 (Wednesday)',
      title: 'Day 2: Main Conference Paper & Poster Presentations',
      notes: 'Whole day oral parallel sessions, keynote lectures, student posters, and awarding.',
      isHighlight: true
    },
    {
      id: 'd7',
      dateStr: 'February 18, 2027 (Thursday)',
      title: 'Day 3: Technical Workshop & Cultural Tour',
      notes: 'Technical visit to Philippine Port Authority and cultural tour at Intramuros.'
    }
  ],
  programSchedule: [
    {
      dayTitle: 'Day 1: Welcome Dinner',
      dateStr: 'February 16, 2027 (Tuesday)',
      items: [
        {
          time: '5:30 PM',
          description: 'Welcome Program and Networking Dinner'
        }
      ]
    },
    {
      dayTitle: 'Day 2: Main Conference Proper (Whole Day)',
      dateStr: 'February 17, 2027 (Wednesday)',
      items: [
        {
          time: '08:00 - 09:00 AM',
          description: 'Registration & Morning Coffee'
        },
        {
          time: '09:00 - 10:00 AM',
          description: 'Opening Program & Keynotes'
        },
        {
          time: '10:00 - 11:30 AM',
          description: 'Oral Presentations for Full Papers (Parallel Sessions)'
        },
        {
          time: '11:30 - 12:00 NN',
          description: 'Keynote Address'
        },
        {
          time: '12:00 - 1:00 PM',
          description: 'Lunch Break & Networking'
        },
        {
          time: '1:00 - 2:00 PM',
          description: 'Afternoon Keynotes'
        },
        {
          time: '2:00 - 3:30 PM',
          description: 'Oral Presentations for Full Papers and Extended Abstracts (Parallel Sessions)'
        },
        {
          time: '3:30 - 5:00 PM',
          description: 'Poster Presentations for Ongoing Student Research'
        },
        {
          time: '5:00 - 6:00 PM',
          description: 'Closing Remarks & Awarding Ceremony'
        },
        {
          time: '6:00 PM',
          description: 'Conference Dinner'
        }
      ]
    },
    {
      dayTitle: 'Day 3: Technical Visit & Cultural Tour',
      dateStr: 'February 18, 2027 (Thursday)',
      items: [
        {
          time: '9:00 - 11:30 AM',
          description: 'Technical Visit to Philippine Port Authority (PMO NCR North)'
        },
        {
          time: '11:30 - 1:30 PM',
          description: 'Lunch and Cultural Tour at Historic Intramuros for International Guests'
        }
      ]
    }
  ],
  invitedSpeakers: [
    {
      name: 'TBA',
      affiliation: 'Changwon National University, South Korea',
      topicOrRole: 'Invited Keynote Speaker'
    },
    {
      name: 'TBA',
      affiliation: 'CQUniversity, Australia',
      topicOrRole: 'Invited Keynote Speaker'
    },
    {
      name: 'TBA',
      affiliation: 'Advanced Science and Technology Institute, Department of Science and Technology',
      topicOrRole: 'Government Technology Keynote'
    },
    {
      name: 'TBA',
      affiliation: 'Universiti Tenaga Nasional (UNITEN), Malaysia',
      topicOrRole: 'Invited Keynote Speaker'
    },
    {
      name: 'TBA',
      affiliation: 'CEO and Co-Founder, Quantum Frontiers PH',
      topicOrRole: 'Industry Keynote Speaker'
    }
  ],
  invitedPartners: [
    'Changwon National University, South Korea',
    'Universiti Tenaga Nasional (UNITEN), Malaysia',
    'CQUniversity, Australia',
    'Cybersec Clinic PH / The Asia Foundation',
    'DOST - Advanced Science and Technology Institute (ASTI)',
    'Bangko Sentral ng Pilipinas (BSP)',
    'Quantum Frontiers PH',
    'Philippine Port Authority (PPA)',
    'Philippine Society of Information Technology Educators (PSITE)'
  ],
  committeeLeadership: [
    {
      role: 'Program and Operation Chair',
      name: 'Dr. Raphael Gonda',
      affiliation: 'De La Salle University, Philippines'
    },
    {
      role: 'General Chair',
      name: 'Dr. Ryan Ebardo',
      affiliation: 'De La Salle University, Philippines'
    },
    {
      role: 'Co-Chair',
      name: 'Dr. Jaehun Park',
      affiliation: 'Changwon National University, South Korea'
    },
    {
      role: 'Co-Chair',
      name: 'Dr. Santoso Wibowo',
      affiliation: 'CQUniversity, Australia'
    }
  ],
  committeeMembers: [
    { name: 'Dr. Si-Il Sung', affiliation: 'Kyonggi University, South Korea' },
    { name: 'Dr. Norshuhani Zamin', affiliation: 'UNITEN, Malaysia' },
    { name: 'Dr. Marnel Peradilla', affiliation: 'De La Salle University, Philippines' },
    { name: 'Dylan Josh Lopez', affiliation: 'Chung Hua University, Taiwan' },
    { name: 'Roger Luis Uy', affiliation: 'De La Salle University, Philippines' },
    { name: 'John Byron Tuazon', affiliation: 'De La Salle University, Philippines' },
    { name: 'Oliver Malabanan', affiliation: 'De La Salle University, Philippines' }
  ],
  topics: [
    'Artificial intelligence and expert systems',
    'Big data analytics and applications',
    'Decision support systems',
    'Electric vehicles and smart energy systems',
    'Fault detection',
    'Fuzzy systems and rough sets',
    'Fuzzy optimization and decision making',
    'Guidance and navigation systems',
    'Human-machine learning',
    'Human science for intelligent systems',
    'Hybrid intelligent systems',
    'Image and speech signal processing',
    'Information theory and applications',
    'Intelligent information systems',
    'Intelligent systems for IoT',
    'Knowledge-based systems',
    'Knowledge discovery and data mining',
    'Learning systems',
    'Machine learning and deep learning',
    'Neural networks',
    'Optimal, adaptive, predictive control',
    'Optimization techniques',
    'Power systems',
    'Process mining and process analytics',
    'Quantum computing and applications',
    'Real-time systems',
    'Robotics and motion control',
    'Signal and image processing',
    'Smart manufacturing and IoT',
    'Transportation control and applications',
    'Transportation information engineering',
    'Web services and cloud computing'
  ],
  registrationFees: [
    {
      participantType: 'Local participant - paper / poster presenter (student)',
      amount: 'PHP 2,500.00',
      notes: 'Requires valid student ID / verification'
    },
    {
      participantType: 'Local participant - paper / poster presenter (professional)',
      amount: 'PHP 5,000.00',
      notes: 'Faculty, industry practitioners, and researchers'
    },
    {
      participantType: 'International participant - paper / poster presenter (students / professors)',
      amount: 'USD 150.00',
      notes: 'Foreign delegates and authors'
    }
  ],
  registrationNote: 'DLSU student participants who are not paper or poster presenters can participate in the event free of charge.',
  submissionGuidelines: {
    formatName: 'Two-Column ACL Format (A4 Size)',
    pageLimit: 'Up to six (6) pages of content, excluding references and appendices',
    summary: 'Submissions should describe unpublished completed original work. Authors intending to submit should follow the two-column ACL format. Please note that CITAS is not an ACL event; the ACL template is adopted solely for formatting consistency.',
    templateLatexUrl: 'https://github.com/acl-org/acl-style-files',
    templateDocxUrl: 'https://2023.aclweb.org/calls/style_and_formatting/',
    portalUrl: 'https://forms.gle/zcJwr1Lb78QzjysG8',
    blindReviewRules: [
      'No page number should appear in the paper.',
      'Submissions will be judged based on relevance, technical strength, significance, opportunities, and interest to attendees.',
      'As reviewing will be double-blind, authors must not indicate their names and affiliations in the submitted papers.',
      'Accepted papers will be presented orally or as posters as determined by the committee. Oral papers and abstracts of poster papers will be included in the proceedings.'
    ]
  },
  contactPerson: {
    name: 'Raphael Wilwayco Gonda, PhD',
    title: 'Research Head, Center for ICT for Development (CITE4D) & Assistant Professor',
    department: 'Department of Information Technology, College of Computer Studies',
    institution: 'De La Salle University - Manila',
    phone: '+63962-045-3891',
    email: 'cite4d@dlsu.edu.ph'
  }
};
