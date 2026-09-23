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
