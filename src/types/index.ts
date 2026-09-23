export type Designation = 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'Lecturer';

export interface FacultyMember {
  id: string;
  name: string;
  designation: Designation;
  qualification: string;
  specialization: string[];
  email: string;
  phone: string;
  room: string;
  bio: string;
  avatarUrl: string;
  joinedYear: number;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  researchInterests: string[];
  publications: string[];
  coursesTaught: string[];
  isDemo?: boolean;
}

export interface EducationItem {
  degree: string;
  institute: string;
  boardOrDept?: string;
  session: string;
  passingYear: string;
  result: string;
  group?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  startedDate: string;
  status: 'Ongoing' | 'Completed' | 'Published';
  link?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  responsibilities: string[];
}

export interface AchievementItem {
  title: string;
  organizer: string;
  date: string;
  badge?: string;
  description?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  registrationNo: string;
  batchSession: string; // e.g. "2024-2025"
  email: string;
  phone: string;
  address: string;
  website?: string;
  quote?: string;
  aboutMe: string;
  avatarUrl: string;
  gender: 'Male' | 'Female';
  education: EducationItem[];
  researchWorks: ResearchItem[];
  skills: string[];
  experiences: ExperienceItem[];
  achievements: AchievementItem[];
  isDemo?: boolean;
}

export interface BatchSummary {
  session: string; // e.g. "2024-2025"
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
  classRepresentative?: string;
  photoUrl?: string;
  students: StudentProfile[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  issue: string;
  publishedDate: string;
  doi?: string;
  tags: string[];
  abstract: string;
  methodology?: string;
  pdfUrl?: string;
  citationCount: number;
  featured?: boolean;
}

export interface SuccessStory {
  id: string;
  studentName: string;
  batch: string;
  email: string;
  phone: string;
  avatarUrl: string;
  headline: string;
  category: 'Scientist' | 'Community Impact' | 'Scholarship' | 'Corporate' | 'Leadership';
  date: string;
  organization: string;
  shortSummary: string;
  fullStory: string;
  quote?: string;
  achievementsList: string[];
}

export interface CareerRole {
  organization: string;
  logoUrl?: string;
  category: 'Tech Giants' | 'Global Multilateral' | 'Media & Journalism' | 'Industry & Finance';
  roles: string[];
  description: string;
}

export interface DepartmentStats {
  facultyCount: number;
  studentCount: number;
  publicationsCount: number;
  researchProjectsCount: number;
  yearsOfExcellence: number;
  alumniCount: number;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

export type IndustryType =
  | 'Academia & Research'
  | 'Civil Service & Govt'
  | 'Tech & Data'
  | 'Banking & Finance'
  | 'NGO & Multilateral'
  | 'Media & Journalism'
  | 'Corporate';

export interface AlumniMember {
  id: string;
  name: string;
  batchSession: string; // e.g. "1996-1997"
  graduationYear: number;
  degree: 'BSS' | 'MSS' | 'M.Phil.' | 'Ph.D.';
  currentRole: string;
  organization: string;
  industry: IndustryType;
  country: string;
  city: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  avatarUrl: string;
  openToMentorship: boolean;
  mentorshipTopics?: string[];
  bio?: string;
  approved?: boolean;
  registrationNo?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  isAvailableForBloodDonation?: boolean;
  chapter?: 'Sylhet' | 'Dhaka' | 'Chittagong' | 'North America' | 'Europe & UK' | 'Australia' | 'Other International';
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'Academic' | 'Exam & Results' | 'GSC & Research' | 'Event' | 'Scholarship';
  publishedDate: string;
  urgent: boolean;
  fileUrl?: string;
  description: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Reunion' | 'Conference' | 'Webinar' | 'Workshop' | 'Cultural';
  description: string;
  speakers?: string[];
  rsvpCount: number;
  featured?: boolean;
}

export interface LibraryThesisItem {
  id: string;
  title: string;
  author: string;
  type: 'BSS Monograph' | 'MSS Thesis' | 'M.Phil Dissertation' | 'Ph.D. Dissertation';
  year: string;
  supervisor: string;
  keywords: string[];
  callNumber: string;
  abstract?: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Research Fellowship' | 'Contract';
  location: string;
  deadline: string;
  postedByAlumniName?: string;
  postedByBatch?: string;
  contactEmail: string;
  applicationLink?: string;
  description: string;
  requirements: string[];
  salaryOrStipend?: string;
  category: 'NGO & Multilateral' | 'Academia & Research' | 'Corporate & HR' | 'Tech & Data' | 'Govt & Civil Service';
  featured?: boolean;
}

export interface MentorshipBooking {
  id: string;
  studentName: string;
  studentEmail: string;
  studentBatch: string;
  alumniId: string;
  alumniName: string;
  topic: string;
  preferredMode: 'Zoom' | 'Google Meet' | 'Phone Call' | 'In-person (SUST)';
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface DonationPledge {
  id: string;
  donorName: string;
  donorBatch?: string;
  donorEmail: string;
  amount: number;
  currency: 'BDT' | 'USD' | 'GBP';
  cause: 'Needy Student Scholarship' | 'Emergency Medical Aid' | 'Seminar Library Fund' | 'Silver Jubilee Reunion';
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Bank Wire/SWIFT';
  transactionRef?: string;
  pledgedAt: string;
  message?: string;
}


