import { BatchSummary, StudentProfile } from '../types';

// The benchmark student from PDF Page 2
export const BORHAN_RUDRO: StudentProfile = {
  id: "student-borhan-rudro",
  name: "Kazi Borhan Uddin Rudro",
  registrationNo: "2024232001",
  batchSession: "2024-2025",
  email: "bu68337@gmail.com",
  phone: "+880 1903-121970",
  address: "Taligati, KUET, Khulna",
  website: "https://www.borhan.com",
  quote: "Life is a succession of lessons which must be lived to be understood.",
  aboutMe:
    "I am an undergraduate student in the Department of Sociology at SUST. My academic and research interests include socio-economic inequality, gender and development, youth studies, and qualitative research methods. I enjoy fieldwork, data analysis, and writing that explores real-life social issues.",
  avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
  gender: "Male",
  education: [
    {
      degree: "Secondary School Certificate (SSC)",
      institute: "Kazipur Thana Sadar Business Mgt. College",
      boardOrDept: "Dhaka",
      session: "2017-2018",
      group: "Computer & Information Technology",
      passingYear: "2019",
      result: "GPA 4.42 out of 5.00"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institute: "Kazipur Thana Sadar Business Mgt. College",
      boardOrDept: "Dhaka",
      session: "2017-2018",
      group: "Computer & Information Technology",
      passingYear: "2019",
      result: "GPA 4.42 out of 5.00"
    },
    {
      degree: "Bachelor of Social Science (BSS) in Sociology",
      institute: "Shahjalal University of Science and Technology",
      boardOrDept: "Department of Sociology",
      session: "2024-2025",
      passingYear: "In Progress (2028)",
      result: "CGPA 3.65 (Enrolled)"
    },
    {
      degree: "Master of Social Science (MSS) in Sociology",
      institute: "Shahjalal University of Science and Technology",
      boardOrDept: "Graduate Studies Committee",
      session: "2028-2029 (Projected)",
      passingYear: "Prospective",
      result: "General / Thesis Track"
    }
  ],
  researchWorks: [
    {
      id: "res-rudro-1",
      title: "A Study on Social Media Use and Its Impact on Youth Social Interaction",
      description: "This research explores how social media influences face-to-face social interaction and mental well-being among university students in Sylhet metropolitan.",
      startedDate: "Feb 2024",
      status: "Ongoing"
    },
    {
      id: "res-rudro-2",
      title: "Informal Labor Dynamics Among Tea Garden Youth",
      description: "Fieldwork investigation analyzing alternative educational pathways and migration aspirations of tea estate youths in Moulvibazar.",
      startedDate: "Aug 2024",
      status: "Ongoing"
    },
    {
      id: "res-rudro-3",
      title: "Digital Payment Adoption in Rural Haor Communities",
      description: "Qualitative assessment of bKash and Nagad mobile financial penetration among rural fisherfolk in Sunamganj.",
      startedDate: "Jan 2025",
      status: "Ongoing"
    }
  ],
  skills: [
    "Qualitative Research",
    "Data Analysis",
    "Interviewing",
    "Report Writing",
    "Microsoft Office",
    "Fieldwork",
    "Time Management",
    "SPSS Basic"
  ],
  experiences: [
    {
      role: "Research Assistant (Voluntary)",
      organization: "Department of Sociology, SUST",
      period: "Feb 2024 – Present",
      responsibilities: [
        "Assisting faculty in data collection and qualitative fieldwork in Sylhet district",
        "Transcribing audio interviews and organizing qualitative coding matrices",
        "Preparing reports and academic literature reviews for conference drafts"
      ]
    },
    {
      role: "Fieldwork Coordinator",
      organization: "Sociology Students Survey Forum",
      period: "May 2024 – Nov 2024",
      responsibilities: [
        "Led a team of 8 student surveyors during a 5-day field camp in Sreemangal",
        "Cleaned and sanitized raw questionnaire responses before entry into SPSS"
      ]
    },
    {
      role: "Editorial Member",
      organization: "SUST Sociology Wall Magazine (Samajchitra)",
      period: "Oct 2024 – Present",
      responsibilities: [
        "Curated sociological essays and student field photography for departmental bulletin"
      ]
    }
  ],
  achievements: [
    {
      title: "Research Methodology Workshop Certification",
      organizer: "Department of Sociology, SUST",
      date: "16 Feb 2024",
      badge: "Certificate of Completion",
      description: "Successfully completed hands-on qualitative and quantitative workshop."
    },
    {
      title: "SPSS for Social Science Research Training",
      organizer: "Department of Sociology, SUST",
      date: "16 Feb 2024",
      badge: "Skill Credential",
      description: "Intensive 3-day data analytics and regression analysis workshop."
    },
    {
      title: "Best Fieldwork Report — Team Category",
      organizer: "Annual Sociology Departmental Exhibition",
      date: "24 Nov 2024",
      badge: "Honor Award",
      description: "Recognized for exemplary ethnographic documentation of river erosion communities."
    },
    {
      title: "SUST Debating Society Inter-Dept Runner Up",
      organizer: "SUST SDS",
      date: "12 Dec 2024",
      badge: "Debate Trophy",
      description: "Spoke on socio-political reforms and democratic decentralization."
    }
  ],
  isDemo: true
};

export const INITIAL_BATCHES: BatchSummary[] = [
  {
    session: "2024-2025",
    totalStudents: 10,
    maleStudents: 4,
    femaleStudents: 6,
    classRepresentative: "Kazi Borhan Uddin Rudro",
    photoUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    students: [
      BORHAN_RUDRO,
      {
        id: "student-24-02",
        name: "Abdullah Al Noman",
        registrationNo: "2024232002",
        batchSession: "2024-2025",
        email: "noman.sust24@sust.edu",
        phone: "+880 1712-345678",
        address: "Akhalia, Sylhet",
        quote: "Understanding society begins with listening to the marginalized.",
        aboutMe: "Sociology undergraduate passionate about environmental policy and community resilience.",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        gender: "Male",
        education: [
          { degree: "HSC", institute: "Sylhet Govt. College", passingYear: "2023", session: "2021-2022", result: "GPA 5.00" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.70" }
        ],
        researchWorks: [
          { id: "res-nom-1", title: "Plastic Waste Culture in Surma River Environs", description: "Urban waste behavior survey", startedDate: "May 2024", status: "Ongoing" }
        ],
        skills: ["Quantitative Survey", "SPSS", "Report Writing"],
        experiences: [{ role: "Class Co-Representative", organization: "SUST Sociology 2024-25", period: "2024–Present", responsibilities: ["Student liaison"] }],
        achievements: [{ title: "SUST Merit Scholarship", organizer: "SUST", date: "Jan 2025" }],
        isDemo: true
      },
      {
        id: "student-24-03",
        name: "Sumaiya Binte Rahman",
        registrationNo: "2024232003",
        batchSession: "2024-2025",
        email: "sumaiya.sust24@sust.edu",
        phone: "+880 1712-345679",
        address: "Zindabazar, Sylhet",
        quote: "Education is the most potent lever of social mobility.",
        aboutMe: "Undergraduate researcher investigating female enrollment in STEM disciplines across Bangladesh.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        gender: "Female",
        education: [
          { degree: "HSC", institute: "Govt. Women's College, Sylhet", passingYear: "2023", session: "2021-2022", result: "GPA 5.00" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.82" }
        ],
        researchWorks: [
          { id: "res-sum-1", title: "Gendered Aspirations in Higher Education", description: "Perceptions of female students", startedDate: "Jun 2024", status: "Ongoing" }
        ],
        skills: ["Content Analysis", "Qualitative Coding", "Public Speaking"],
        experiences: [{ role: "Volunteer", organization: "SUST Women Welfare Cell", period: "2024–Present", responsibilities: ["Advocacy campaigns"] }],
        achievements: [{ title: "National English Essay First Prize", organizer: "BLLF", date: "Oct 2023" }],
        isDemo: true
      },
      {
        id: "student-24-04",
        name: "Tanvir Anjum Shuvo",
        registrationNo: "2024232004",
        batchSession: "2024-2025",
        email: "tanvir.shuvo@sust.edu",
        phone: "+880 1712-345680",
        address: "Amberkhana, Sylhet",
        quote: "Social science without empathy is merely arithmetic.",
        aboutMe: "Focusing on urban sociology, transport equity, and public park access in Sylhet city.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        gender: "Male",
        education: [
          { degree: "HSC", institute: "Dhaka City College", passingYear: "2023", session: "2021-2022", result: "GPA 4.90" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.55" }
        ],
        researchWorks: [],
        skills: ["Field Survey", "GIS Mapping", "Photography"],
        experiences: [],
        achievements: [{ title: "Inter-College Photography Award", organizer: "DCC Photo Club", date: "2023" }],
        isDemo: true
      },
      {
        id: "student-24-05",
        name: "Fariha Tabassum Sneha",
        registrationNo: "2024232005",
        batchSession: "2024-2025",
        email: "fariha.sneha@sust.edu",
        phone: "+880 1712-345681",
        address: "Shibganj, Sylhet",
        quote: "Culture is not static; it lives through memory and ritual.",
        aboutMe: "Cultural sociology enthusiast studying oral folk ballads and indigenous wedding traditions.",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        gender: "Female",
        education: [
          { degree: "HSC", institute: "Blue Bird High School & College", passingYear: "2023", session: "2021-2022", result: "GPA 5.00" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.75" }
        ],
        researchWorks: [],
        skills: ["Oral History", "Audio Archiving", "Creative Writing"],
        experiences: [],
        achievements: [{ title: "Folkloric Documentation Grant", organizer: "Sylhet Heritage Trust", date: "2024" }],
        isDemo: true
      },
      {
        id: "student-24-06",
        name: "Sadman Sakib",
        registrationNo: "2024232006",
        batchSession: "2024-2025",
        email: "sadman.sakib@sust.edu",
        phone: "+880 1712-345682",
        address: "Pathantula, Sylhet",
        quote: "Data reveals patterns; compassion reveals human beings.",
        aboutMe: "Interested in health sociology and rural access to emergency maternal care.",
        avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
        gender: "Male",
        education: [
          { degree: "HSC", institute: "Notre Dame College, Dhaka", passingYear: "2023", session: "2021-2022", result: "GPA 5.00" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.68" }
        ],
        researchWorks: [],
        skills: ["Survey Design", "Statistical Literacy", "Community Outreach"],
        experiences: [],
        achievements: [],
        isDemo: true
      },
      {
        id: "student-24-07",
        name: "Nafisa Anjum",
        registrationNo: "2024232007",
        batchSession: "2024-2025",
        email: "nafisa.anjum@sust.edu",
        phone: "+880 1712-345683",
        address: "Tilagarh, Sylhet",
        quote: "Every silent community has a rich, unrecorded history.",
        aboutMe: "Investigating ethnic kinship among Khasia punjis in Jaintiapur.",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        gender: "Female",
        education: [
          { degree: "HSC", institute: "Sylhet Cadet College", passingYear: "2023", session: "2021-2022", result: "GPA 5.00" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.90" }
        ],
        researchWorks: [],
        skills: ["Ethnography", "Bilingual Translation", "Qualitative Coding"],
        experiences: [],
        achievements: [{ title: "Dean's First Year Commendation", organizer: "School of Social Sciences, SUST", date: "2024" }],
        isDemo: true
      },
      {
        id: "student-24-08",
        name: "Tasnia Mostafa",
        registrationNo: "2024232008",
        batchSession: "2024-2025",
        email: "tasnia.mostafa@sust.edu",
        phone: "+880 1712-345684",
        address: "Subidbazar, Sylhet",
        quote: "Change is deliberate, rooted in critical sociological insight.",
        aboutMe: "Exploring social media consumption patterns among adolescents.",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        gender: "Female",
        education: [
          { degree: "HSC", institute: "Govt. Agragami Girls' High School & College", passingYear: "2023", session: "2021-2022", result: "GPA 4.95" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.60" }
        ],
        researchWorks: [],
        skills: ["Literature Review", "Social Media Analytics", "Proofreading"],
        experiences: [],
        achievements: [],
        isDemo: true
      },
      {
        id: "student-24-09",
        name: "Mehnaz Parvin",
        registrationNo: "2024232009",
        batchSession: "2024-2025",
        email: "mehnaz.parvin@sust.edu",
        phone: "+880 1712-345685",
        address: "Lama Bazar, Sylhet",
        quote: "To study society is to commit oneself to social justice.",
        aboutMe: "Active in human rights advocacy and child labor reduction programs.",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        gender: "Female",
        education: [
          { degree: "HSC", institute: "Sylhet MC College", passingYear: "2023", session: "2021-2022", result: "GPA 5.00" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.77" }
        ],
        researchWorks: [],
        skills: ["Community Dialogue", "Campaign Coordination", "Policy Review"],
        experiences: [],
        achievements: [{ title: "Red Crescent Volunteer of the Year", organizer: "BDRCS Sylhet", date: "2023" }],
        isDemo: true
      },
      {
        id: "student-24-10",
        name: "Jannatun Nayeem",
        registrationNo: "2024232010",
        batchSession: "2024-2025",
        email: "jannatun.nayeem@sust.edu",
        phone: "+880 1712-345686",
        address: "Chhatak, Sunamganj",
        quote: "Resilience is born when communities share vulnerability.",
        aboutMe: "Haor basin native conducting field documentation of seasonal flood migration.",
        avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
        gender: "Female",
        education: [
          { degree: "HSC", institute: "Chhatak Degree College", passingYear: "2023", session: "2021-2022", result: "GPA 4.85" },
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2024-2025", result: "CGPA 3.72" }
        ],
        researchWorks: [],
        skills: ["Fieldwork", "Audio Transcription", "Qualitative Mapping"],
        experiences: [],
        achievements: [],
        isDemo: true
      }
    ]
  },
  {
    session: "2023-2024",
    totalStudents: 12,
    maleStudents: 6,
    femaleStudents: 6,
    classRepresentative: "Marjana Akter",
    photoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    students: [
      {
        id: "student-23-01",
        name: "Marjana Akter",
        registrationNo: "2023232001",
        batchSession: "2023-2024",
        email: "marjana.akter@sust.edu",
        phone: "+880 1712-345678",
        address: "Modina Market, Sylhet",
        quote: "Scientific inquiry and sociological empathy together can transform global policy.",
        aboutMe: "Honored with the United Nations Young Women for Biosecurity Fellowship and ranked 7th in Asian Youngest 100 Scientists.",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        gender: "Female",
        education: [
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2023-2024", result: "CGPA 3.96" }
        ],
        researchWorks: [
          { id: "res-marj-1", title: "Social Determinants of Biosecurity in South Asia", description: "UN policy evaluation", startedDate: "Jan 2024", status: "Ongoing" }
        ],
        skills: ["Global Policy Analysis", "Multilateral Negotiations", "Bioethics", "Public Health Sociology"],
        experiences: [
          { role: "Youth Fellow", organization: "United Nations Office for Disarmament Affairs", period: "2025", responsibilities: ["Biosecurity policy draft"] }
        ],
        achievements: [
          { title: "UN Young Women for Biosecurity Fellowship 2025", organizer: "United Nations", date: "2025", badge: "UN Global Fellow" },
          { title: "Asian Youngest 100 Scientist (Rank #7)", organizer: "Asian Science Council", date: "2026", badge: "International Honor" }
        ],
        isDemo: true
      },
      {
        id: "student-23-02",
        name: "Alamin Hamid",
        registrationNo: "2023232002",
        batchSession: "2023-2024",
        email: "alamin.hamid@sust.edu",
        phone: "+880 1712-345687",
        address: "Surma Tower, Sylhet",
        quote: "Rivers are the arteries of both geography and social kinship.",
        aboutMe: "Co-investigator in the Lubha River gravel mining and socio-ecological transformations study.",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        gender: "Male",
        education: [
          { degree: "BSS in Sociology", institute: "SUST", passingYear: "Enrolled", session: "2023-2024", result: "CGPA 3.88" }
        ],
        researchWorks: [
          { id: "res-ala-1", title: "From Geomorphic and social transformations of gravel mining, Lubha River", description: "Published co-authored paper in Environmental Sociology", startedDate: "Jan 2024", status: "Published" }
        ],
        skills: ["Riverine Ethnography", "SPSS", "Spatial Geomorphology"],
        experiences: [
          { role: "Research Associate", organization: "SUST Environmental Sociology Group", period: "2023–Present", responsibilities: ["Field data collection in Lubha river"] }
        ],
        achievements: [
          { title: "Co-Author, Environmental Sociology Publication (Vol. 3 Issue 1)", organizer: "Academic Press", date: "Jan 2026" }
        ],
        isDemo: true
      }
    ]
  },
  {
    session: "2022-2023",
    totalStudents: 14,
    maleStudents: 7,
    femaleStudents: 7,
    classRepresentative: "Mahir Faysal",
    photoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    students: []
  },
  {
    session: "2021-2022",
    totalStudents: 15,
    maleStudents: 8,
    femaleStudents: 7,
    classRepresentative: "Sadia Afrin",
    photoUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    students: []
  },
  {
    session: "2020-2021",
    totalStudents: 16,
    maleStudents: 9,
    femaleStudents: 7,
    classRepresentative: "Rahat Chowdhury",
    photoUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    students: []
  }
];
