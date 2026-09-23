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
