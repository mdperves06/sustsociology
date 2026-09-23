import { FacultyMember } from '../types';

export const INITIAL_FACULTY: FacultyMember[] = [
  // PROFESSORS (4)
  {
    id: "fac-prof-1",
    name: "Dr. A. K. M. Mahbubuzzaman",
    designation: "Professor",
    qualification: "Ph.D. in Social Anthropology (Sussex), MSS & BSS in Sociology (DU)",
    specialization: ["Agrarian Sociology", "Environmental Sociology", "Rural Transformation", "Peasant Studies"],
    email: "mahbub-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 241)",
    room: "Room 102, Academic Building D",
    bio: "Dr. Mahbubuzzaman has over 28 years of academic teaching and research experience in rural sociodynamics, agrarian transformation in the Sylhet basin, and post-disaster social adaptation.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    joinedYear: 1995,
    education: [
      { degree: "Ph.D. in Social Anthropology", institution: "University of Sussex, UK", year: "2004" },
      { degree: "Master of Social Science (MSS) in Sociology", institution: "University of Dhaka", year: "1992" },
      { degree: "Bachelor of Social Science (BSS) in Sociology", institution: "University of Dhaka", year: "1990" }
    ],
    researchInterests: ["Agrarian Political Economy", "Haor Ecology & Community Livelihoods", "Disaster Resilience"],
    publications: [
      "Agrarian Restructuring and Land Tenure Transitions in Northeast Bangladesh (Journal of Peasant Studies, 2021)",
      "Vulnerability and Resilience: Livelihood Strategies of Fisherfolk in Hakaluki Haor (Asian Journal of Social Science, 2018)",
      "Rural Elites and Local Power Structure in Surma Valley (SUST Journal of Social Sciences, 2015)"
    ],
    coursesTaught: ["Advanced Sociological Theory", "Sociology of Development", "Agrarian Social Structure"],
    isDemo: true
  },
  {
    id: "fac-prof-2",
    name: "Dr. Nazma Sultana Begum",
    designation: "Professor",
    qualification: "Ph.D. in Gender & Development (Durham), MSS (SUST)",
    specialization: ["Feminist Theory", "Gender & Labor Migration", "Care Economy", "Qualitative Methods"],
    email: "nazma-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 242)",
    room: "Room 104, Academic Building D",
    bio: "A leading scholar on gendered migration in the transnational Sylheti diaspora, Dr. Begum has directed multiple collaborative ethnographies examining female remittances and domestic labor relations.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    joinedYear: 1998,
    education: [
      { degree: "Ph.D. in Gender & Migration", institution: "Durham University, UK", year: "2008" },
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "1996" },
      { degree: "BSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "1995" }
    ],
    researchInterests: ["Transnational Migration & Remittances", "Gendered Labor in Tea Plantations", "Qualitative Feminist Methodologies"],
    publications: [
      "Gendering the Diaspora: Women Left Behind in Transnational Sylheti Households (Global Networks, 2022)",
      "Unpaid Care Work and Female Well-being in Rural Bangladesh (Feminist Economics, 2019)",
      "Intersectionality of Ethnicity and Gender Among Sylhet Tea Garden Workers (South Asia Multidisciplinary Journal, 2016)"
    ],
    coursesTaught: ["Gender and Society", "Feminist Methodologies", "Sociology of Migration"],
    isDemo: true
  },
  {
    id: "fac-prof-3",
    name: "Dr. Faruk Ahmed Chowdhury",
    designation: "Professor",
    qualification: "Ph.D. in Political Sociology (ANU), MSS (DU)",
    specialization: ["Political Sociology", "State Formation", "Social Movements", "Civil Society"],
    email: "faruk-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 243)",
    room: "Room 106, Academic Building D",
    bio: "Dr. Faruk Ahmed Chowdhury investigates democratic institutions, patronage politics, and collective mobilization in South Asia with particular focus on student and peasant activism.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    joinedYear: 1999,
    education: [
      { degree: "Ph.D. in Political Sociology", institution: "Australian National University (ANU)", year: "2009" },
      { degree: "MSS in Sociology", institution: "University of Dhaka", year: "1994" },
      { degree: "BSS in Sociology", institution: "University of Dhaka", year: "1992" }
    ],
    researchInterests: ["Patron-Client Networks", "Democratization in South Asia", "Historical Sociology"],
    publications: [
      "The Dynamics of Student Politics and Democratic Struggles in Post-1990 Bangladesh (Contemporary South Asia, 2020)",
      "Civil Society and State Hegemony: The Case of Environmental Movements in Surma Basin (Social Movement Studies, 2017)"
    ],
    coursesTaught: ["Political Sociology", "Classical Sociological Theories", "Sociology of South Asia"],
    isDemo: true
  },
  {
    id: "fac-prof-4",
    name: "Dr. Md. Sadiul Alam",
    designation: "Professor",
    qualification: "Ph.D. in Environmental Sociology (Heidelberg), MSS & BSS (SUST)",
    specialization: ["Environmental Sociology", "River Geomorphology & Society", "Resource Extraction", "Climate Adaptation"],
    email: "sadiul-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 244)",
    room: "Room 108, Academic Building D",
    bio: "Lead author of pioneering regional studies on Lubha River gravel extraction, Dr. Alam focuses on socio-ecological transitions and environmental justice along international transboundary river networks.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2002,
    education: [
      { degree: "Ph.D. in Environmental Sociology", institution: "Heidelberg University, Germany", year: "2012" },
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "1998" },
      { degree: "BSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "1997" }
    ],
    researchInterests: ["Gravel and Sand Mining Social Impacts", "Transboundary Water Governance", "Climate Displaced Settlements"],
    publications: [
      "From Geomorphic and social transformations of gravel mining, Lubha River, Northeast Bangladesh (Environmental Sociology, 2026)",
      "Flash Floods and Vulnerability Cycles in Sunamganj Haor Basin (Disasters, 2023)",
      "Mining Economies, Informal Labor, and Ecological Precarity in Jaflong (Geoforum, 2021)"
    ],
    coursesTaught: ["Environmental Sociology", "Quantitative Research Methods", "Sociology of Disasters"],
    isDemo: true
  },

  // ASSOCIATE PROFESSORS (5)
  {
    id: "fac-assoc-1",
    name: "Dr. Shahina Parveen",
    designation: "Associate Professor",
    qualification: "Ph.D. in Medical Sociology (Uppsala), MSS (DU)",
    specialization: ["Medical Sociology", "Public Health Inequality", "Disability Studies"],
    email: "shahina-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 245)",
    room: "Room 201, Academic Building D",
    bio: "Focuses on health-seeking behavior among marginalized tea estate workers, primary healthcare delivery in remote wetlands, and sociological epidemiology.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2007,
    education: [
      { degree: "Ph.D. in Medical Sociology", institution: "Uppsala University, Sweden", year: "2016" },
      { degree: "MSS in Sociology", institution: "University of Dhaka", year: "2002" }
    ],
    researchInterests: ["Healthcare Systems", "Social Epidemiology", "Indigenous Health Practices"],
    publications: [
      "Structural Barriers to Maternal Healthcare in Tea Estates of Sylhet (Social Science & Medicine, 2022)",
      "Cultural Perceptions of Illness and Treatment Trajectories in Haor Villages (Global Public Health, 2019)"
    ],
    coursesTaught: ["Medical Sociology", "Sociology of Health and Illness", "Social Demography"],
    isDemo: true
  },
  {
    id: "fac-assoc-2",
    name: "Dr. Tanvir Hasan",
    designation: "Associate Professor",
    qualification: "Ph.D. in Urban Sociology (NUS), MSS (SUST)",
    specialization: ["Urban Sociology", "Informal Settlements", "Urban Governance", "Spatial Segregation"],
    email: "tanvir-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 246)",
    room: "Room 203, Academic Building D",
    bio: "Conducts empirical inquiries into secondary city rapid urbanization, informal economies, and civic infrastructure equity in Sylhet metropolitan region.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2008,
    education: [
      { degree: "Ph.D. in Urban Sociology", institution: "National University of Singapore (NUS)", year: "2017" },
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2004" }
    ],
    researchInterests: ["Secondary Cities Urbanization", "Informal Housing Markets", "Urban Spatial Politics"],
    publications: [
      "The Making of a Diaspora City: Remittance Urbanism in Sylhet (Urban Studies, 2023)",
      "Informal Waste Pickers and Spatial Marginality in Secondary Cities (Cities, 2020)"
    ],
    coursesTaught: ["Urban Sociology", "Sociology of Space and Architecture", "Social Research Design"],
    isDemo: true
  },
  {
    id: "fac-assoc-3",
    name: "Dr. Rokeya Khandakar",
    designation: "Associate Professor",
    qualification: "Ph.D. in Sociology of Education (Monash), MSS (DU)",
    specialization: ["Sociology of Education", "Social Stratification", "Digital Divide"],
    email: "rokeya-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 247)",
    room: "Room 205, Academic Building D",
    bio: "Investigates social reproduction of educational inequality, youth transition into knowledge markets, and digital divide barriers in higher education.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2010,
    education: [
      { degree: "Ph.D. in Education & Society", institution: "Monash University, Australia", year: "2018" },
      { degree: "MSS in Sociology", institution: "University of Dhaka", year: "2005" }
    ],
    researchInterests: ["Higher Education Inequality", "Digital Pedagogies & Access", "Youth Aspirations"],
    publications: [
      "First-Generation University Students in Public Universities of Bangladesh (Higher Education, 2022)",
      "Online Learning Inequalities During Crisis: A Class Analysis (British Journal of Sociology of Education, 2021)"
    ],
    coursesTaught: ["Sociology of Education", "Social Stratification and Inequality", "Contemporary Social Problems"],
    isDemo: true
  },
  {
    id: "fac-assoc-4",
    name: "Dr. Kazi Mostafa Kamal",
    designation: "Associate Professor",
    qualification: "Ph.D. in Economic Sociology (Leiden), MSS (SUST)",
    specialization: ["Economic Sociology", "Microfinance & Rural Debt", "Informal Markets"],
    email: "mostafa-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 248)",
    room: "Room 207, Academic Building D",
    bio: "Examines the embeddedness of microcredit relations, debt traps, and local credit unions in marginal agricultural communities across North-East Bangladesh.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2011,
    education: [
      { degree: "Ph.D. in Development Sociology", institution: "Leiden University, Netherlands", year: "2019" },
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2006" }
    ],
    researchInterests: ["Sociology of Money & Credit", "Informal Labor Contracts", "Rural Financialization"],
    publications: [
      "Multiple Borrowing and the Social Fabric of Debt in Sunamganj Haor (Development and Change, 2023)",
      "Trust and Informal Financial Institutions in Sylheti Remittance Corridors (Economic & Political Weekly, 2020)"
    ],
    coursesTaught: ["Economic Sociology", "Rural Sociology", "Sociology of Work and Organizations"],
    isDemo: true
  },
  {
    id: "fac-assoc-5",
    name: "Dr. Ananya Roy",
    designation: "Associate Professor",
    qualification: "Ph.D. in Cultural Sociology (JNU, New Delhi), MSS (DU)",
    specialization: ["Cultural Sociology", "Folklore & Oral History", "Ethnic Minorities in Sylhet"],
    email: "ananya-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 249)",
    room: "Room 209, Academic Building D",
    bio: "Expert in ethnic identities and cultural heritage of indigenous communities (Khasia, Manipuri, Garo) in the greater Surma and Kushiara valleys.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2012,
    education: [
      { degree: "Ph.D. in Sociology", institution: "Jawaharlal Nehru University (JNU), India", year: "2018" },
      { degree: "MSS in Sociology", institution: "University of Dhaka", year: "2006" }
    ],
    researchInterests: ["Ethnic Minority Rights", "Matrilineal Kinship Systems", "Oral Sociological Archives"],
    publications: [
      "Land Dispossession and Cultural Preservation Among the Khasia Community (Asian Ethnicity, 2021)",
      "Weaving Identity: Manipuri Women Artisans in Sylhet (Contributions to Indian Sociology, 2019)"
    ],
    coursesTaught: ["Cultural Sociology", "Sociology of Religion and Culture", "Qualitative Fieldwork"],
    isDemo: true
  },

  // ASSISTANT PROFESSORS (6)
  {
    id: "fac-asst-1",
    name: "Md. Nayeemur Rahman",
    designation: "Assistant Professor",
    qualification: "M.Phil. in Sociology (SUST), MSS (SUST, First Class 1st)",
    specialization: ["Youth Sociology", "Social Media & Digital Culture", "Quantitative Data Analysis"],
    email: "nayeem-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 250)",
    room: "Room 301, Academic Building D",
    bio: "Pioneering digital sociological inquiries in Bangladesh, exploring how algorithmic platforms reshape youth social capital, political socialization, and civic activism.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2015,
    education: [
      { degree: "M.Phil. in Sociology", institution: "Shahjalal University of Science & Technology", year: "2020" },
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2013" }
    ],
    researchInterests: ["Algorithmic Societies", "Youth Digital Cultures", "Survey Experiments in Social Science"],
    publications: [
      "Virtual Spaces, Real Bonds: Social Media Habits of University Students in Sylhet (Sociological Inquiry, 2024)",
      "Digital Divides in Remote Wetland Schools (Journal of Information Society, 2021)"
    ],
    coursesTaught: ["Digital Sociology", "Computer Applications in Social Sciences (SPSS)", "Social Statistics"],
    isDemo: true
  },
  {
    id: "fac-asst-2",
    name: "Sadia Tahsin",
    designation: "Assistant Professor",
    qualification: "M.Sc. in Social Policy (LSE), MSS (DU)",
    specialization: ["Social Policy", "Poverty & Social Protection", "Child Welfare"],
    email: "sadia-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 251)",
    room: "Room 303, Academic Building D",
    bio: "LSE Commonwealth scholar analyzing safety net programs, cash transfers, and childhood deprivation in vulnerability hotspots across northeastern Bangladesh.",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2016,
    education: [
      { degree: "M.Sc. in Social Policy and Development", institution: "London School of Economics (LSE), UK", year: "2019" },
      { degree: "MSS in Sociology", institution: "University of Dhaka", year: "2014" }
    ],
    researchInterests: ["Universal Basic Income Feasibility", "Child Labor in Informal Mining", "Evaluation of Safety Nets"],
    publications: [
      "Targeting Errors in Haor Social Safety Nets: An Empirical Appraisal (World Development Perspectives, 2023)",
      "Maternal Health Vouchers in Remote Sub-districts (Journal of Social Policy, 2021)"
    ],
    coursesTaught: ["Social Policy and Planning", "Sociology of Poverty", "Social Welfare Administration"],
    isDemo: true
  },
  {
    id: "fac-asst-3",
    name: "Md. Zubair Hasan",
    designation: "Assistant Professor",
    qualification: "M.A. in Criminology & Criminal Justice (Edinburgh), MSS (SUST)",
    specialization: ["Criminology", "Penology", "Juvenile Justice", "Deviance"],
    email: "zubair-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 252)",
    room: "Room 305, Academic Building D",
    bio: "Examines correctional justice policies, youth delinquency patterns in border districts, and restorative community rehabilitation frameworks.",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2017,
    education: [
      { degree: "M.A. in Criminology", institution: "University of Edinburgh, UK", year: "2021" },
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2014" }
    ],
    researchInterests: ["Borderland Crime and Cross-Border Smuggling", "Prison Reform in Bangladesh", "Community Policing"],
    publications: [
      "Reintegration Challenges of Ex-Offenders in Sylhet District (Asian Journal of Criminology, 2023)",
      "Juvenile Delinquency Patterns in Rapidly Growing Towns (International Annals of Criminology, 2020)"
    ],
    coursesTaught: ["Criminology and Penology", "Sociology of Law", "Social Deviance"],
    isDemo: true
  },
  {
    id: "fac-asst-4",
    name: "Taslima Akter",
    designation: "Assistant Professor",
    qualification: "MSS & BSS in Sociology (SUST, Chancellor Gold Medalist)",
    specialization: ["Demography", "Population Dynamics", "Aging & Gerontology"],
    email: "taslima-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 253)",
    room: "Room 307, Academic Building D",
    bio: "Investigates demographic transitions in Bangladesh, fertility trends, and the socio-emotional vulnerability of the elderly in rural households.",
    avatarUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2018,
    education: [
      { degree: "MSS in Sociology (Chancellor Gold Medal)", institution: "Shahjalal University of Science & Technology", year: "2016" },
      { degree: "BSS in Sociology (Dean's Honor Award)", institution: "Shahjalal University of Science & Technology", year: "2015" }
    ],
    researchInterests: ["Gerontology in South Asia", "Demographic Dividend Realities", "Fertility Transitions"],
    publications: [
      "Left-Behind Elders in Migration-Heavy Upazilas of Sylhet (Ageing & Society, 2023)",
      "Fertility Decline and Contraceptive Practices in Tea Worker Communities (Population and Environment, 2021)"
    ],
    coursesTaught: ["Social Demography", "Sociology of Aging", "Research Methodology"],
    isDemo: true
  },
  {
    id: "fac-asst-5",
    name: "Kazi Ashraful Islam",
    designation: "Assistant Professor",
    qualification: "M.Res. in Social Research (Manchester), MSS (DU)",
    specialization: ["Sociology of Work", "Labor Unions", "Informal Sector Precarity"],
    email: "ashraf-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 254)",
    room: "Room 309, Academic Building D",
    bio: "Focuses on the labor market dynamics of stone-crushing workers in Bholaganj and Jaflong, occupational health hazards, and collective bargaining rights.",
    avatarUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2019,
    education: [
      { degree: "Master of Research (M.Res.)", institution: "University of Manchester, UK", year: "2022" },
      { degree: "MSS in Sociology", institution: "University of Dhaka", year: "2015" }
    ],
    researchInterests: ["Stone Quarry Labor Health", "Informal Work Contracts", "Labor Law Compliance in Bangladesh"],
    publications: [
      "Silicosis and Survival: Voices of Stone Quarry Laborers in Sylhet (Work, Employment and Society, 2024)",
      "Contractual Insecurity in Borderland Extraction Sites (Labor History, 2022)"
    ],
    coursesTaught: ["Sociology of Work and Industry", "Sociology of Organizations", "Social Stratification"],
    isDemo: true
  },
  {
    id: "fac-asst-6",
    name: "Shamima Nasrin",
    designation: "Assistant Professor",
    qualification: "MSS & BSS in Sociology (SUST)",
    specialization: ["Sociology of Family", "Marriage & Kinship", "Childhood Studies"],
    email: "shamima-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 255)",
    room: "Room 311, Academic Building D",
    bio: "Examines evolving patterns of marital breakdown, modern companionate marriage ideals, and parental investment in children's human capital.",
    avatarUrl: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2020,
    education: [
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2017" },
      { degree: "BSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2016" }
    ],
    researchInterests: ["Changing Kinship Systems", "Early Marriage Interventions", "Family Law & Practice"],
    publications: [
      "Rising Divorce Rates and Middle-Class Transformation in Urban Bangladesh (Journal of Comparative Family Studies, 2023)",
      "Childhood in Wetland Fishing Communities (Childhood, 2022)"
    ],
    coursesTaught: ["Sociology of Family and Kinship", "Gender and Development", "Introductory Sociology"],
    isDemo: true
  },

  // LECTURERS (4)
  {
    id: "fac-lect-1",
    name: "Mohammad Sajjad Hossain",
    designation: "Lecturer",
    qualification: "MSS & BSS in Sociology (SUST, First Class)",
    specialization: ["Sociology of Religion", "Secularism & Society", "Social Movements"],
    email: "sajjad-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 256)",
    room: "Room 401, Academic Building D",
    bio: "Studies the social dynamics of religious shrines (Mazar culture in Sylhet), syncretism, and social cohesion across diverse faiths in the region.",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2022,
    education: [
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2020" },
      { degree: "BSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2019" }
    ],
    researchInterests: ["Sufism and Social Harmony", "Communal Coexistence", "Socio-Religious Festivals"],
    publications: [
      "Mazar Culture and Trans-Communal Solidarity in Sylhet (South Asian History and Culture, 2024)"
    ],
    coursesTaught: ["Sociology of Religion", "Introduction to Sociology", "Social History of Bengal"],
    isDemo: true
  },
  {
    id: "fac-lect-2",
    name: "Nusrat Jahan Chowdhury",
    designation: "Lecturer",
    qualification: "MSS & BSS in Sociology (DU, First Class)",
    specialization: ["Environmental Justice", "Indigenous Peoples", "Ecological Dispossession"],
    email: "nusrat-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 257)",
    room: "Room 403, Academic Building D",
    bio: "Passionate about participatory rural ethnography, forest conservation conflicts, and eco-feminist movements in northeastern hill tracts.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2022,
    education: [
      { degree: "MSS in Sociology", institution: "University of Dhaka", year: "2020" },
      { degree: "BSS in Sociology", institution: "University of Dhaka", year: "2019" }
    ],
    researchInterests: ["Ecocriticism in Sociology", "Betel Leaf Cultivation Communities", "Indigenous Land Rights"],
    publications: [
      "Poverty and Resource Enclosure in Madhabkunda Forest Reserve (Ecology & Society Bangladesh, 2023)"
    ],
    coursesTaught: ["Environmental Sociology", "Social Anthropology", "Participatory Research"],
    isDemo: true
  },
  {
    id: "fac-lect-3",
    name: "Arifur Rahman Rony",
    designation: "Lecturer",
    qualification: "MSS & BSS in Sociology (SUST)",
    specialization: ["Social Networks Analysis", "Computational Social Science", "Survey Analytics"],
    email: "arif-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 258)",
    room: "Room 405, Academic Building D",
    bio: "Specializes in quantitative modeling, statistical methods in R and Python, and computational sociology for analyzing large-scale social surveys.",
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2023,
    education: [
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2021" },
      { degree: "BSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2020" }
    ],
    researchInterests: ["Social Network Analysis", "Data Science for Social Good", "Quantitative Survey Experiments"],
    publications: [
      "Mapping Friendship and Academic Support Networks in Public Universities (PLOS ONE, 2024)"
    ],
    coursesTaught: ["Social Statistics", "Computer Laboratory for Sociological Research", "Quantitative Methods"],
    isDemo: true
  },
  {
    id: "fac-lect-4",
    name: "Humaira Tasnim",
    designation: "Lecturer",
    qualification: "MSS & BSS in Sociology (SUST, Gold Medalist)",
    specialization: ["Youth and Subcultures", "Urban Everyday Life", "Sociology of Consumption"],
    email: "humaira-soc@sust.edu",
    phone: "+880 821-713491 (Ext. 259)",
    room: "Room 407, Academic Building D",
    bio: "Investigates consumer culture, coffee shop public spheres, and young women's everyday spatial negotiations in provincial cities.",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    joinedYear: 2024,
    education: [
      { degree: "MSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2022" },
      { degree: "BSS in Sociology", institution: "Shahjalal University of Science & Technology", year: "2021" }
    ],
    researchInterests: ["Leisure and Urban Spaces", "Fashion and Identity", "Youth Subcultures"],
    publications: [
      "Café Culture and Emerging Third Spaces in Sylhet (City, Culture and Society, 2024)"
    ],
    coursesTaught: ["Sociology of Everyday Life", "Introduction to Sociology", "Qualitative Methods Lab"],
    isDemo: true
  }
];
