import {
  DepartmentStats,
  FacultyMember,
  BatchSummary,
  StudentProfile,
  ResearchPaper,
  SuccessStory,
  ContactMessage,
  AlumniMember,
  NoticeItem,
  EventItem,
  LibraryThesisItem,
  JobOpportunity,
  MentorshipBooking,
  DonationPledge
} from '../types';
import { DEPARTMENT_STATS } from '../data/department';
import { INITIAL_FACULTY } from '../data/faculty';
import { INITIAL_BATCHES } from '../data/batches';
import { INITIAL_RESEARCH } from '../data/research';
import { INITIAL_STORIES } from '../data/stories';
import { INITIAL_ALUMNI } from '../data/alumni';
import { INITIAL_NOTICES } from '../data/notices';
import { INITIAL_EVENTS } from '../data/events';
import { INITIAL_LIBRARY_THESES } from '../data/library';
import { INITIAL_JOB_POSTINGS } from '../data/jobPostings';

const STORAGE_KEYS = {
  STATS: 'sust_soc_stats',
  FACULTY: 'sust_soc_faculty',
  BATCHES: 'sust_soc_batches',
  RESEARCH: 'sust_soc_research',
  STORIES: 'sust_soc_stories',
  MESSAGES: 'sust_soc_messages',
  AUTH_PIN: 'sust_soc_admin_pin',
  ALUMNI: 'sust_soc_alumni',
  NOTICES: 'sust_soc_notices',
  EVENTS: 'sust_soc_events',
  LIBRARY: 'sust_soc_library',
  JOBS: 'sust_soc_jobs',
  BOOKINGS: 'sust_soc_mentor_bookings',
  PLEDGES: 'sust_soc_donation_pledges'
};

const DEFAULT_ADMIN_PIN = "1992";

export const dataService = {
  // Stats
  getStats(): DepartmentStats {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      return stored ? JSON.parse(stored) : DEPARTMENT_STATS;
    } catch {
      return DEPARTMENT_STATS;
    }
  },

  updateStats(newStats: DepartmentStats): void {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
  },

  // Faculty
  getFaculty(): FacultyMember[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FACULTY);
      return stored ? JSON.parse(stored) : INITIAL_FACULTY;
    } catch {
      return INITIAL_FACULTY;
    }
  },

  getFacultyById(id: string): FacultyMember | undefined {
    return this.getFaculty().find(f => f.id === id);
  },

  saveFaculty(faculty: FacultyMember[]): void {
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
  },

  addFacultyMember(member: Omit<FacultyMember, 'id'>): FacultyMember {
    const list = this.getFaculty();
    const newMember: FacultyMember = {
      ...member,
      id: `fac-${Date.now()}`
    };
    list.unshift(newMember);
    this.saveFaculty(list);
    return newMember;
  },

  updateFacultyMember(id: string, updated: Partial<FacultyMember>): boolean {
    const list = this.getFaculty();
    const index = list.findIndex(f => f.id === id);
    if (index === -1) return false;
    list[index] = { ...list[index], ...updated };
    this.saveFaculty(list);
    return true;
  },

  deleteFacultyMember(id: string): boolean {
    const list = this.getFaculty();
    const filtered = list.filter(f => f.id !== id);
    if (filtered.length === list.length) return false;
    this.saveFaculty(filtered);
    return true;
  },

  // Batches & Students
  getBatches(): BatchSummary[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BATCHES);
      return stored ? JSON.parse(stored) : INITIAL_BATCHES;
    } catch {
      return INITIAL_BATCHES;
    }
  },

  getBatchBySession(session: string): BatchSummary | undefined {
    return this.getBatches().find(b => b.session === session);
  },

  saveBatches(batches: BatchSummary[]): void {
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(batches));
  },

  getStudentById(studentId: string): { student: StudentProfile; batchSession: string } | undefined {
    const batches = this.getBatches();
    for (const batch of batches) {
      const student = batch.students.find(s => s.id === studentId);
      if (student) {
        return { student, batchSession: batch.session };
      }
    }
    return undefined;
  },

  addStudentToBatch(session: string, studentData: Omit<StudentProfile, 'id' | 'batchSession'>): StudentProfile | null {
    const batches = this.getBatches();
    const batchIndex = batches.findIndex(b => b.session === session);
    if (batchIndex === -1) return null;

    const newStudent: StudentProfile = {
      ...studentData,
      id: `student-${Date.now()}`,
      batchSession: session
    };

    batches[batchIndex].students.push(newStudent);
    batches[batchIndex].totalStudents = batches[batchIndex].students.length;
    batches[batchIndex].maleStudents = batches[batchIndex].students.filter(s => s.gender === 'Male').length;
    batches[batchIndex].femaleStudents = batches[batchIndex].students.filter(s => s.gender === 'Female').length;

    this.saveBatches(batches);
    return newStudent;
  },

  updateStudent(studentId: string, updated: Partial<StudentProfile>): boolean {
    const batches = this.getBatches();
    let found = false;

    for (const batch of batches) {
      const studentIndex = batch.students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
        batch.students[studentIndex] = { ...batch.students[studentIndex], ...updated };
        batch.maleStudents = batch.students.filter(s => s.gender === 'Male').length;
        batch.femaleStudents = batch.students.filter(s => s.gender === 'Female').length;
        found = true;
        break;
      }
    }

    if (found) {
      this.saveBatches(batches);
    }
    return found;
  },

  deleteStudent(studentId: string): boolean {
    const batches = this.getBatches();
    let found = false;

    for (const batch of batches) {
      const initialLen = batch.students.length;
      batch.students = batch.students.filter(s => s.id !== studentId);
      if (batch.students.length !== initialLen) {
        batch.totalStudents = batch.students.length;
        batch.maleStudents = batch.students.filter(s => s.gender === 'Male').length;
        batch.femaleStudents = batch.students.filter(s => s.gender === 'Female').length;
        found = true;
        break;
      }
    }

    if (found) {
      this.saveBatches(batches);
    }
    return found;
  },

  generateStudentCSVTemplate(): string {
    return `name,registrationNo,batchSession,email,phone,address,gender,quote,skills
Abdullah Al Noman,2024232001,2024-2025,noman.sust24@sust.edu,+880 1712-345678,Akhalia Sylhet,Male,"Understanding society begins with listening to the marginalized","Qualitative Research; Data Analysis; Fieldwork"
Sumaiya Binte Rahman,2024232002,2024-2025,sumaiya.sust24@sust.edu,+880 1712-345679,Zindabazar Sylhet,Female,"Education is the lever of social mobility","Report Writing; SPSS; Interviewing"`;
  },

  importStudentsFromCSV(csvText: string): { successCount: number; errors: string[] } {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const errors: string[] = [];
    if (lines.length < 2) {
      return { successCount: 0, errors: ["CSV file is empty or missing data rows."] };
    }

    // Helper to parse CSV line respecting quotes
    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    };

    const header = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const nameIdx = header.findIndex(h => h.includes('name'));
    const regIdx = header.findIndex(h => h.includes('reg'));
    const sessionIdx = header.findIndex(h => h.includes('session') || h.includes('batch'));
    const emailIdx = header.findIndex(h => h.includes('email'));
    const phoneIdx = header.findIndex(h => h.includes('phone') || h.includes('mobile'));
    const addrIdx = header.findIndex(h => h.includes('address') || h.includes('location'));
    const genderIdx = header.findIndex(h => h.includes('gender'));
    const quoteIdx = header.findIndex(h => h.includes('quote') || h.includes('motto'));
    const skillsIdx = header.findIndex(h => h.includes('skill'));

    if (nameIdx === -1 || regIdx === -1) {
      return { successCount: 0, errors: ["Missing required header columns: 'name' and 'registrationNo'."] };
    }

    const batches = this.getBatches();
    let imported = 0;

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i]);
      if (cols.length < 2 || !cols[nameIdx]) continue;

      const name = cols[nameIdx];
      const reg = cols[regIdx] || `REG-${Date.now()}-${i}`;
      const session = (sessionIdx !== -1 && cols[sessionIdx]) ? cols[sessionIdx] : '2024-2025';
      const email = (emailIdx !== -1 && cols[emailIdx]) ? cols[emailIdx] : `${reg.toLowerCase()}@sust.edu`;
      const phone = (phoneIdx !== -1 && cols[phoneIdx]) ? cols[phoneIdx] : '+880 1712-000000';
      const address = (addrIdx !== -1 && cols[addrIdx]) ? cols[addrIdx] : 'SUST Campus, Sylhet';
      const rawGender = (genderIdx !== -1 && cols[genderIdx]) ? cols[genderIdx].toLowerCase() : 'male';
      const gender: 'Male' | 'Female' = rawGender.includes('f') ? 'Female' : 'Male';
      const quote = (quoteIdx !== -1 && cols[quoteIdx]) ? cols[quoteIdx] : 'Understanding Society. Inspiring Change.';
      const rawSkills = (skillsIdx !== -1 && cols[skillsIdx]) ? cols[skillsIdx] : 'Sociological Research; Fieldwork';
      const skills = rawSkills.split(/[;,]/).map(s => s.trim()).filter(Boolean);

      let batch = batches.find(b => b.session === session);
      if (!batch) {
        batch = {
          session,
          totalStudents: 0,
          maleStudents: 0,
          femaleStudents: 0,
          classRepresentative: name,
          photoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
          students: []
        };
        batches.unshift(batch);
      }

      // Check if student already exists by reg
      const existingIdx = batch.students.findIndex(s => s.registrationNo === reg);
      const studentObj: StudentProfile = {
        id: `student-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name,
        registrationNo: reg,
        batchSession: session,
        email,
        phone,
        address,
        gender,
        quote,
        aboutMe: `Undergraduate student in the Department of Sociology at SUST (Session ${session}). Interested in sociological inquiry, empirical research, and community engagement.`,
        avatarUrl: gender === 'Female'
          ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        education: [
          { degree: "BSS in Sociology", institute: "Shahjalal University of Science & Technology", session, passingYear: "In Progress", result: "Enrolled" }
        ],
        researchWorks: [],
        skills: skills.length > 0 ? skills : ['Social Theory', 'Fieldwork'],
        experiences: [],
        achievements: [],
        isDemo: false
      };

      if (existingIdx !== -1) {
        batch.students[existingIdx] = studentObj;
      } else {
        batch.students.push(studentObj);
      }

      batch.totalStudents = batch.students.length;
      batch.maleStudents = batch.students.filter(s => s.gender === 'Male').length;
      batch.femaleStudents = batch.students.filter(s => s.gender === 'Female').length;
      imported++;
    }

    this.saveBatches(batches);
    return { successCount: imported, errors };
  },

  // Research
  getResearch(): ResearchPaper[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESEARCH);
      return stored ? JSON.parse(stored) : INITIAL_RESEARCH;
    } catch {
      return INITIAL_RESEARCH;
    }
  },

  getResearchById(id: string): ResearchPaper | undefined {
    return this.getResearch().find(r => r.id === id);
  },

  saveResearch(research: ResearchPaper[]): void {
    localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify(research));
  },

  addResearch(paper: Omit<ResearchPaper, 'id'>): ResearchPaper {
    const list = this.getResearch();
    const newPaper: ResearchPaper = {
      ...paper,
      id: `res-${Date.now()}`
    };
    list.unshift(newPaper);
    this.saveResearch(list);
    return newPaper;
  },

  updateResearch(id: string, updated: Partial<ResearchPaper>): boolean {
    const list = this.getResearch();
    const index = list.findIndex(r => r.id === id);
    if (index === -1) return false;
    list[index] = { ...list[index], ...updated };
    this.saveResearch(list);
    return true;
  },

  deleteResearch(id: string): boolean {
    const list = this.getResearch();
    const filtered = list.filter(r => r.id !== id);
    if (filtered.length === list.length) return false;
    this.saveResearch(filtered);
    return true;
  },

  // Success Stories
  getStories(): SuccessStory[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STORIES);
      return stored ? JSON.parse(stored) : INITIAL_STORIES;
    } catch {
      return INITIAL_STORIES;
    }
  },

  getStoryById(id: string): SuccessStory | undefined {
    return this.getStories().find(s => s.id === id);
  },

  saveStories(stories: SuccessStory[]): void {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  },

  addStory(story: Omit<SuccessStory, 'id'>): SuccessStory {
    const list = this.getStories();
    const newStory: SuccessStory = {
      ...story,
      id: `story-${Date.now()}`
    };
    list.unshift(newStory);
    this.saveStories(list);
    return newStory;
  },

  updateStory(id: string, updated: Partial<SuccessStory>): boolean {
    const list = this.getStories();
    const index = list.findIndex(s => s.id === id);
    if (index === -1) return false;
    list[index] = { ...list[index], ...updated };
    this.saveStories(list);
    return true;
  },

  deleteStory(id: string): boolean {
    const list = this.getStories();
    const filtered = list.filter(s => s.id !== id);
    if (filtered.length === list.length) return false;
    this.saveStories(filtered);
    return true;
  },

  // Contact Inquiries
  getContactMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  submitContactMessage(msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'read'>): ContactMessage {
    const messages = this.getContactMessages();
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      read: false
    };
    messages.unshift(newMessage);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    return newMessage;
  },

  markMessageRead(id: string): void {
    const messages = this.getContactMessages();
    const index = messages.findIndex(m => m.id === id);
    if (index !== -1) {
      messages[index].read = true;
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
  },

  // Alumni Operations
  getAlumni(): AlumniMember[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ALUMNI);
      return stored ? JSON.parse(stored) : INITIAL_ALUMNI;
    } catch {
      return INITIAL_ALUMNI;
    }
  },

  saveAlumni(list: AlumniMember[]): void {
    localStorage.setItem(STORAGE_KEYS.ALUMNI, JSON.stringify(list));
  },

  addAlumni(member: Omit<AlumniMember, 'id'>): AlumniMember {
    const list = this.getAlumni();
    const newMember: AlumniMember = {
      ...member,
      id: `alum-${Date.now()}`
    };
    list.unshift(newMember);
    this.saveAlumni(list);
    return newMember;
  },

  deleteAlumni(id: string): boolean {
    const list = this.getAlumni();
    const filtered = list.filter(a => a.id !== id);
    if (filtered.length === list.length) return false;
    this.saveAlumni(filtered);
    return true;
  },

  // Notices Operations
  getNotices(): NoticeItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTICES);
      return stored ? JSON.parse(stored) : INITIAL_NOTICES;
    } catch {
      return INITIAL_NOTICES;
    }
  },

  saveNotices(notices: NoticeItem[]): void {
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
  },

  addNotice(notice: Omit<NoticeItem, 'id'>): NoticeItem {
    const list = this.getNotices();
    const newNotice: NoticeItem = {
      ...notice,
      id: `not-${Date.now()}`
    };
    list.unshift(newNotice);
    this.saveNotices(list);
    return newNotice;
  },

  deleteNotice(id: string): boolean {
    const list = this.getNotices();
    const filtered = list.filter(n => n.id !== id);
    if (filtered.length === list.length) return false;
    this.saveNotices(filtered);
    return true;
  },

  // Events Operations
  getEvents(): EventItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return stored ? JSON.parse(stored) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  },

  saveEvents(events: EventItem[]): void {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  },

  addEvent(event: Omit<EventItem, 'id' | 'rsvpCount'>): EventItem {
    const list = this.getEvents();
    const newEvent: EventItem = {
      ...event,
      id: `ev-${Date.now()}`,
      rsvpCount: 1
    };
    list.unshift(newEvent);
    this.saveEvents(list);
    return newEvent;
  },

  rsvpEvent(id: string): boolean {
    const list = this.getEvents();
    const event = list.find(e => e.id === id);
    if (event) {
      event.rsvpCount += 1;
      this.saveEvents(list);
      return true;
    }
    return false;
  },

  // Library & Theses Operations
  getLibraryTheses(): LibraryThesisItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LIBRARY);
      return stored ? JSON.parse(stored) : INITIAL_LIBRARY_THESES;
    } catch {
      return INITIAL_LIBRARY_THESES;
    }
  },

  saveLibraryTheses(theses: LibraryThesisItem[]): void {
    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(theses));
  },

  addLibraryThesis(thesis: Omit<LibraryThesisItem, 'id'>): LibraryThesisItem {
    const list = this.getLibraryTheses();
    const newItem: LibraryThesisItem = {
      ...thesis,
      id: `lib-${Date.now()}`
    };
    list.unshift(newItem);
    this.saveLibraryTheses(list);
    return newItem;
  },

  // Jobs & Opportunities
  getJobs(): JobOpportunity[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.JOBS);
      return stored ? JSON.parse(stored) : INITIAL_JOB_POSTINGS;
    } catch {
      return INITIAL_JOB_POSTINGS;
    }
  },

  saveJobs(jobs: JobOpportunity[]): void {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  },

  addJob(job: Omit<JobOpportunity, 'id'>): JobOpportunity {
    const list = this.getJobs();
    const newJob: JobOpportunity = {
      ...job,
      id: `job-${Date.now()}`
    };
    list.unshift(newJob);
    this.saveJobs(list);
    return newJob;
  },

  deleteJob(id: string): boolean {
    const list = this.getJobs();
    const filtered = list.filter(j => j.id !== id);
    if (filtered.length === list.length) return false;
    this.saveJobs(filtered);
    return true;
  },

  // Mentorship Bookings
  getMentorshipBookings(): MentorshipBooking[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  createMentorshipBooking(booking: Omit<MentorshipBooking, 'id' | 'createdAt' | 'status'>): MentorshipBooking {
    const list = this.getMentorshipBookings();
    const newBooking: MentorshipBooking = {
      ...booking,
      id: `book-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    list.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
    return newBooking;
  },

  // Donation Pledges & Giving Fund
  getDonationPledges(): DonationPledge[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PLEDGES);
      return stored ? JSON.parse(stored) : [
        {
          id: 'pledge-01',
          donorName: 'Dr. A. H. M. Belal Hossain',
          donorBatch: '1992-1993',
          donorEmail: 'belal.hossain@mopa.gov.bd',
          amount: 50000,
          currency: 'BDT',
          cause: 'Needy Student Scholarship',
          paymentMethod: 'bKash',
          transactionRef: 'BK-8829141',
          pledgedAt: '2026-08-15T10:30:00Z',
          message: 'For undergraduate scholars needing tuition and residential support.'
        },
        {
          id: 'pledge-02',
          donorName: 'Syed Kamrul Hasan',
          donorBatch: '1994-1995',
          donorEmail: 'kamrul.hasan@sylhetcci.org',
          amount: 100000,
          currency: 'BDT',
          cause: 'Silver Jubilee Reunion',
          paymentMethod: 'Bank Wire/SWIFT',
          transactionRef: 'SW-998811',
          pledgedAt: '2026-09-01T14:20:00Z',
          message: 'Department alumni fellowship sponsorship.'
        },
        {
          id: 'pledge-03',
          donorName: 'Salman F. Rahman',
          donorBatch: '2015-2016',
          donorEmail: 'salman.ux@google.com',
          amount: 75000,
          currency: 'BDT',
          cause: 'Seminar Library Fund',
          paymentMethod: 'Bank Wire/SWIFT',
          transactionRef: 'SW-223415',
          pledgedAt: '2026-09-10T16:45:00Z',
          message: 'Digitization and journal subscriptions for Sociology Seminar Library.'
        }
      ];
    } catch {
      return [];
    }
  },

  submitDonationPledge(pledge: Omit<DonationPledge, 'id' | 'pledgedAt'>): DonationPledge {
    const list = this.getDonationPledges();
    const newPledge: DonationPledge = {
      ...pledge,
      id: `pledge-${Date.now()}`,
      pledgedAt: new Date().toISOString()
    };
    list.unshift(newPledge);
    localStorage.setItem(STORAGE_KEYS.PLEDGES, JSON.stringify(list));
    return newPledge;
  },

  // CSV Exporters & Importers
  exportStudentsCSV(batchSession?: string): string {
    const batches = this.getBatches();
    const studentsToExport: StudentProfile[] = [];
    batches.forEach(b => {
      if (!batchSession || b.session === batchSession) {
        studentsToExport.push(...b.students);
      }
    });

    const header = ['name', 'registrationNo', 'batchSession', 'email', 'phone', 'address', 'gender', 'quote', 'skills'];
    const rows = studentsToExport.map(s => [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.registrationNo}"`,
      `"${s.batchSession}"`,
      `"${s.email}"`,
      `"${s.phone}"`,
      `"${s.address.replace(/"/g, '""')}"`,
      `"${s.gender}"`,
      `"${(s.quote || '').replace(/"/g, '""')}"`,
      `"${s.skills.join('; ')}"`
    ].join(','));

    return [header.join(','), ...rows].join('\n');
  },

  exportAlumniCSV(): string {
    const alumni = this.getAlumni();
    const header = ['name', 'registrationNo', 'batchSession', 'graduationYear', 'degree', 'currentRole', 'organization', 'industry', 'country', 'city', 'email', 'phone', 'bloodGroup', 'chapter', 'openToMentorship'];
    const rows = alumni.map(a => [
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.registrationNo || ''}"`,
      `"${a.batchSession}"`,
      a.graduationYear,
      `"${a.degree}"`,
      `"${a.currentRole.replace(/"/g, '""')}"`,
      `"${a.organization.replace(/"/g, '""')}"`,
      `"${a.industry}"`,
      `"${a.country}"`,
      `"${a.city}"`,
      `"${a.email}"`,
      `"${a.phone || ''}"`,
      `"${a.bloodGroup || 'O+'}"`,
      `"${a.chapter || 'Sylhet'}"`,
      a.openToMentorship ? 'Yes' : 'No'
    ].join(','));

    return [header.join(','), ...rows].join('\n');
  },

  generateAlumniCSVTemplate(): string {
    const header = ['name', 'registrationNo', 'batchSession', 'graduationYear', 'degree', 'currentRole', 'organization', 'industry', 'country', 'city', 'email', 'phone', 'bloodGroup', 'chapter', 'openToMentorship'];
    const samples = [
      ['"Khandaker Mofazzal Hossain"', '"2004234011"', '"2004-2005"', '2009', '"MSS"', '"Director of Programs"', '"Save the Children"', '"NGO & Multilateral"', '"Bangladesh"', '"Sylhet"', '"khandaker.alumni@sust.edu"', '"+8801712000000"', '"A+"', '"Sylhet"', '"Yes"'],
      ['"Tahmina Begum"', '"2007234022"', '"2007-2008"', '2012', '"BSS"', '"Assistant Commissioner (Tax)"', '"National Board of Revenue"', '"Civil Service & Govt"', '"Bangladesh"', '"Dhaka"', '"tahmina.nbr@gov.bd"', '"+8801819000000"', '"B+"', '"Dhaka"', '"Yes"'],
      ['"Arifur Rahman"', '"2012234033"', '"2012-2013"', '2017', '"MSS"', '"Senior UX Lead"', '"Careem / Uber Middle East"', '"Tech & Data"', '"United Arab Emirates"', '"Dubai"', '"arif.ux@careem.com"', '"+971501234567"', '"O+"', '"Other International"', '"No"']
    ];

    return [header.join(','), ...samples.map(s => s.join(','))].join('\n');
  },

  importAlumniFromCSV(csvText: string): { imported: number; errors: string[] } {
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) {
      return { imported: 0, errors: ['CSV file is empty or contains only header row.'] };
    }

    const currentAlumni = this.getAlumni();
    let imported = 0;
    const errors: string[] = [];

    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' || char === "'") {
          if (inQuotes && line[i + 1] === char) {
            current += char;
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const header = parseLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const getIndex = (name: string) => header.findIndex(h => h.includes(name));

    const nameIdx = getIndex('name');
    const batchIdx = getIndex('batch');
    const gradIdx = getIndex('grad');
    const degreeIdx = getIndex('degree');
    const roleIdx = getIndex('role');
    const orgIdx = getIndex('org');
    const industryIdx = getIndex('industry');
    const countryIdx = getIndex('country');
    const cityIdx = getIndex('city');
    const emailIdx = getIndex('email');
    const phoneIdx = getIndex('phone');
    const bloodIdx = getIndex('blood');
    const mentorIdx = getIndex('mentor');
    const regIdx = getIndex('reg');

    for (let i = 1; i < lines.length; i++) {
      try {
        const cols = parseLine(lines[i]);
        const name = nameIdx !== -1 ? cols[nameIdx] : cols[0];
        const email = emailIdx !== -1 ? cols[emailIdx] : (cols[9] || '');

        if (!name || name.length < 2) {
          errors.push(`Row ${i + 1}: Skipped - missing alumnus name.`);
          continue;
        }

        const batchSession = batchIdx !== -1 && cols[batchIdx] ? cols[batchIdx] : '2016-2017';
        const graduationYear = gradIdx !== -1 && !isNaN(Number(cols[gradIdx])) ? Number(cols[gradIdx]) : 2021;
        const currentRole = roleIdx !== -1 && cols[roleIdx] ? cols[roleIdx] : 'Alumnus / Professional';
        const organization = orgIdx !== -1 && cols[orgIdx] ? cols[orgIdx] : 'Professional Organization';
        const bloodGroup = bloodIdx !== -1 && cols[bloodIdx] ? (cols[bloodIdx] as any) : 'B+';
        const openToMentorship = mentorIdx !== -1 ? (cols[mentorIdx].toLowerCase().includes('y') || cols[mentorIdx] === 'true') : true;

        const newAlumnus: AlumniMember = {
          id: `alum-csv-${Date.now()}-${i}`,
          name: name.replace(/^["']|["']$/g, ''),
          batchSession,
          graduationYear,
          degree: (degreeIdx !== -1 && cols[degreeIdx] ? cols[degreeIdx] as any : 'BSS'),
          registrationNo: regIdx !== -1 ? cols[regIdx] : undefined,
          currentRole,
          organization,
          industry: (industryIdx !== -1 && cols[industryIdx] ? cols[industryIdx] as any : 'Corporate'),
          country: countryIdx !== -1 && cols[countryIdx] ? cols[countryIdx] : 'Bangladesh',
          city: cityIdx !== -1 && cols[cityIdx] ? cols[cityIdx] : 'Sylhet',
          email: email || `alumni.${Date.now()}.${i}@sust.edu`,
          phone: phoneIdx !== -1 ? cols[phoneIdx] : undefined,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          openToMentorship,
          mentorshipTopics: ['Higher Studies', 'Career Consultation', 'Alumni Fellowship'],
          bio: 'Proud alumnus of the Department of Sociology, SUST.',
          bloodGroup,
          isAvailableForBloodDonation: true,
          approved: true
        };

        currentAlumni.unshift(newAlumnus);
        imported++;
      } catch (err: any) {
        errors.push(`Row ${i + 1}: ${err.message || 'Formatting error'}`);
      }
    }

    if (imported > 0) {
      this.saveAlumni(currentAlumni);
    }

    return { imported, errors };
  },

  // Admin Security
  verifyAdminPin(enteredPin: string): boolean {
    const storedPin = localStorage.getItem(STORAGE_KEYS.AUTH_PIN) || DEFAULT_ADMIN_PIN;
    return enteredPin === storedPin;
  },

  changeAdminPin(newPin: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_PIN, newPin);
  },

  // Reset & Backup
  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.FACULTY);
    localStorage.removeItem(STORAGE_KEYS.BATCHES);
    localStorage.removeItem(STORAGE_KEYS.RESEARCH);
    localStorage.removeItem(STORAGE_KEYS.STORIES);
    localStorage.removeItem(STORAGE_KEYS.ALUMNI);
    localStorage.removeItem(STORAGE_KEYS.NOTICES);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.LIBRARY);
    localStorage.removeItem(STORAGE_KEYS.JOBS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.PLEDGES);
  },

  exportAllData(): string {
    return JSON.stringify({
      stats: this.getStats(),
      faculty: this.getFaculty(),
      batches: this.getBatches(),
      research: this.getResearch(),
      stories: this.getStories(),
      alumni: this.getAlumni(),
      notices: this.getNotices(),
      events: this.getEvents(),
      library: this.getLibraryTheses(),
      jobs: this.getJobs(),
      pledges: this.getDonationPledges(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.stats) this.updateStats(data.stats);
      if (data.faculty) this.saveFaculty(data.faculty);
      if (data.batches) this.saveBatches(data.batches);
      if (data.research) this.saveResearch(data.research);
      if (data.stories) this.saveStories(data.stories);
      if (data.alumni) this.saveAlumni(data.alumni);
      if (data.notices) this.saveNotices(data.notices);
      if (data.events) this.saveEvents(data.events);
      if (data.library) this.saveLibraryTheses(data.library);
      if (data.jobs) this.saveJobs(data.jobs);
      return true;
    } catch {
      return false;
    }
  }
};


