import {
  DepartmentStats,
  FacultyMember,
  BatchSummary,
  StudentProfile,
  ResearchPaper,
  SuccessStory,
  ContactMessage
} from '../types';
import { DEPARTMENT_STATS } from '../data/department';
import { INITIAL_FACULTY } from '../data/faculty';
import { INITIAL_BATCHES } from '../data/batches';
import { INITIAL_RESEARCH } from '../data/research';
import { INITIAL_STORIES } from '../data/stories';

const STORAGE_KEYS = {
  STATS: 'sust_soc_stats',
  FACULTY: 'sust_soc_faculty',
  BATCHES: 'sust_soc_batches',
  RESEARCH: 'sust_soc_research',
  STORIES: 'sust_soc_stories',
  MESSAGES: 'sust_soc_messages',
  AUTH_PIN: 'sust_soc_admin_pin'
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
  },

  exportAllData(): string {
    return JSON.stringify({
      stats: this.getStats(),
      faculty: this.getFaculty(),
      batches: this.getBatches(),
      research: this.getResearch(),
      stories: this.getStories(),
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
      return true;
    } catch {
      return false;
    }
  }
};
