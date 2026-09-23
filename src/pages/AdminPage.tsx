import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Save,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Users,
  BookOpen,
  Layers,
  Award,
  BarChart,
  MessageSquare
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { dataService } from '../services/dataService';
import {
  DepartmentStats,
  FacultyMember,
  BatchSummary,
  ResearchPaper,
  SuccessStory,
  ContactMessage,
  Designation
} from '../types';

export const AdminPage: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<'stats' | 'faculty' | 'batches' | 'research' | 'stories' | 'inquiries' | 'backup'>('stats');

  // Local State
  const [stats, setStats] = useState<DepartmentStats>(dataService.getStats());
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [batches, setBatches] = useState<BatchSummary[]>([]);
  const [selectedAdminBatch, setSelectedAdminBatch] = useState<string>('2024-2025');
  const [research, setResearch] = useState<ResearchPaper[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for creating new items
  const [newFaculty, setNewFaculty] = useState<Partial<FacultyMember>>({
    name: '',
    designation: 'Lecturer',
    qualification: '',
    email: '',
    phone: '',
    room: '',
    bio: '',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinedYear: 2026,
    specialization: ['Sociological Theory'],
    coursesTaught: ['Introductory Sociology'],
    publications: ['Sample Research Article (SUST Journal, 2026)']
  });

  const [newResearch, setNewResearch] = useState<Partial<ResearchPaper>>({
    title: '',
    authors: ['Dr. Scholar Name'],
    journal: 'SUST Journal of Social Sciences',
    volume: 'Vol. 10',
    issue: 'Issue 1',
    publishedDate: '2026',
    tags: ['environmental', 'sociology'],
    abstract: '',
    citationCount: 0
  });

  const [newStory, setNewStory] = useState<Partial<SuccessStory>>({
    studentName: '',
    batch: '2024-2025',
    email: '',
    phone: '',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    headline: '',
    category: 'Scholarship',
    date: '2026-09-01',
    organization: '',
    shortSummary: '',
    fullStory: '',
    quote: '',
    achievementsList: ['Academic Excellence Honor']
  });

  useEffect(() => {
    // Check if session pin already validated in memory or storage
    const remembered = sessionStorage.getItem('sust_soc_auth');
    if (remembered === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const loadAllData = () => {
    setStats(dataService.getStats());
    setFaculty(dataService.getFaculty());
    setBatches(dataService.getBatches());
    setResearch(dataService.getResearch());
    setStories(dataService.getStories());
    setMessages(dataService.getContactMessages());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataService.verifyAdminPin(pin)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sust_soc_auth', 'true');
      setAuthError(false);
      loadAllData();
      showToast("Admin session authenticated. Welcome!");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sust_soc_auth');
    setPin('');
  };

  // Stats Save
  const handleSaveStats = () => {
    dataService.updateStats(stats);
    showToast("Department statistics updated successfully.");
  };

  // Faculty Actions
  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.designation) return;

    dataService.addFacultyMember({
      name: newFaculty.name,
      designation: newFaculty.designation as Designation,
      qualification: newFaculty.qualification || 'MSS & BSS in Sociology (SUST)',
      specialization: newFaculty.specialization || ['Sociology'],
      email: newFaculty.email || 'faculty@sust.edu',
      phone: newFaculty.phone || '+880 1712-000000',
      room: newFaculty.room || 'Academic Building D',
      bio: newFaculty.bio || 'Faculty profile at SUST Sociology.',
      avatarUrl: newFaculty.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      joinedYear: Number(newFaculty.joinedYear) || 2026,
      education: [
        { degree: "MSS in Sociology", institution: "SUST", year: "2024" },
        { degree: "BSS in Sociology", institution: "SUST", year: "2023" }
      ],
      researchInterests: ['Social Theory', 'Fieldwork'],
      publications: newFaculty.publications || [],
      coursesTaught: newFaculty.coursesTaught || ['Introduction to Sociology'],
      isDemo: true
    });

    setFaculty(dataService.getFaculty());
    setNewFaculty({ name: '', designation: 'Lecturer', qualification: '', email: '', phone: '', room: '', bio: '' });
    showToast("New faculty member added.");
  };

  const handleDeleteFaculty = (id: string) => {
    if (confirm("Are you sure you want to delete this faculty member?")) {
      dataService.deleteFacultyMember(id);
      setFaculty(dataService.getFaculty());
      showToast("Faculty member removed.");
    }
  };

  // Research Actions
  const handleAddResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResearch.title) return;

    dataService.addResearch({
      title: newResearch.title,
      authors: newResearch.authors || ['SUST Scholar'],
      journal: newResearch.journal || 'SUST Journal of Social Sciences',
      volume: newResearch.volume || 'Vol. 1',
      issue: newResearch.issue || 'Issue 1',
      publishedDate: newResearch.publishedDate || '2026',
      doi: '10.1016/sust.soc.' + Date.now(),
      tags: typeof newResearch.tags === 'string' ? (newResearch.tags as string).split(',').map(s => s.trim()) : (newResearch.tags || ['sociology']),
      abstract: newResearch.abstract || 'Academic abstract describing empirical methodology and findings.',
      citationCount: 0,
      featured: false
    });

    setResearch(dataService.getResearch());
    setNewResearch({ title: '', abstract: '' });
    showToast("Research publication recorded.");
  };

  const handleDeleteResearch = (id: string) => {
    if (confirm("Delete this publication?")) {
      dataService.deleteResearch(id);
      setResearch(dataService.getResearch());
      showToast("Publication removed.");
    }
  };

  // Success Story Actions
  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.studentName || !newStory.headline) return;

    dataService.addStory({
      studentName: newStory.studentName,
      batch: newStory.batch || '2024-2025',
      email: newStory.email || 'alumni@sust.edu',
      phone: newStory.phone || '+880 1712-345678',
      avatarUrl: newStory.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      headline: newStory.headline,
      category: newStory.category as any || 'Scholarship',
      date: newStory.date || '2026-09-01',
      organization: newStory.organization || 'Global Institution',
      shortSummary: newStory.shortSummary || '',
      fullStory: newStory.fullStory || newStory.shortSummary || '',
      quote: newStory.quote || '',
      achievementsList: ['Department Recognition']
    });

    setStories(dataService.getStories());
    setNewStory({ studentName: '', headline: '', organization: '', shortSummary: '' });
    showToast("Success story published.");
  };

  const handleDeleteStory = (id: string) => {
    if (confirm("Delete this success story?")) {
      dataService.deleteStory(id);
      setStories(dataService.getStories());
      showToast("Story deleted.");
    }
  };

  // Reset & Backup
  const handleResetDefaults = () => {
    if (confirm("Reset all portal data back to factory defaults? Any custom edits will be cleared.")) {
      dataService.resetToDefaults();
      loadAllData();
      showToast("Data restored to factory defaults.");
    }
  };

  const handleExportJSON = () => {
    const json = dataService.exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sust_sociology_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast("Backup JSON file exported.");
  };

  const handleDownloadCSVTemplate = () => {
    const csvContent = dataService.generateStudentCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sust_students_import_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Sample CSV Template downloaded.");
  };

  const handleUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const res = dataService.importStudentsFromCSV(text);
      if (res.successCount > 0) {
        loadAllData();
        showToast(`Successfully imported ${res.successCount} student(s) into batches!`);
      } else {
        alert("Failed to import CSV: " + (res.errors.join(', ') || "Unknown format"));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm("Delete this student record?")) {
      dataService.deleteStudent(studentId);
      loadAllData();
      showToast("Student record removed.");
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (dataService.importData(text)) {
        loadAllData();
        showToast("Backup JSON successfully restored.");
      } else {
        alert("Invalid JSON structure.");
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 academic-card bg-white border border-academic-border shadow-academic-lg">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-academic-accent-soft flex items-center justify-center text-academic-primary border border-academic-border">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-academic-dark">
            Admin CMS Authentication
          </h2>
          <p className="text-xs text-academic-text-muted mt-1">
            Department of Sociology • SUST Sylhet
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-academic-dark mb-1">
              Security PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN (Default: 1992)"
              className="w-full px-4 py-2.5 bg-academic-bg rounded border border-academic-border text-center font-mono text-lg tracking-widest focus:outline-none focus:border-academic-primary"
              autoFocus
            />
            <p className="text-[11px] text-academic-text-muted mt-1 text-center">
              Hint: Founding session year <strong>1992</strong>
            </p>
          </div>

          {authError && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs text-center flex items-center justify-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Incorrect security PIN. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-xs"
          >
            Authenticate Session
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-academic-dark text-white px-4 py-3 rounded-lg shadow-xl border border-academic-primary flex items-center space-x-2 text-xs animate-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-academic-accent" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Logout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-academic-border">
        <div>
          <span className="text-xs font-bold text-academic-primary uppercase tracking-widest">
            Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-academic-dark mt-0.5">
            Department CMS Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white text-academic-dark hover:bg-academic-bg rounded border border-academic-border text-xs font-medium"
            title="Reset to default mock data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-academic-primary" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-academic-dark text-white hover:bg-black rounded text-xs font-medium"
          >
            <Unlock className="w-3.5 h-3.5 text-academic-accent" />
            <span>Lock Dashboard</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-academic-border pb-4 mb-8">
        {[
          { key: 'stats', label: 'Department Stats', icon: BarChart },
          { key: 'faculty', label: `Faculty (${faculty.length})`, icon: Users },
          { key: 'batches', label: `Students & CSV Import (${batches.reduce((acc, b) => acc + b.totalStudents, 0)})`, icon: Layers },
          { key: 'research', label: `Research (${research.length})`, icon: BookOpen },
          { key: 'stories', label: `Success Stories (${stories.length})`, icon: Award },
          { key: 'inquiries', label: `Inquiries (${messages.length})`, icon: MessageSquare },
          { key: 'backup', label: 'Backup & Restore', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-academic-primary text-white shadow-xs'
                  : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DEPARTMENT STATS */}
      {activeTab === 'stats' && (
        <div className="academic-card p-6 md:p-8 max-w-3xl">
          <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border">
            Homepage Statistics & Counters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-academic-dark uppercase tracking-wider mb-1">
                Faculty Members Count
              </label>
              <input
                type="number"
                value={stats.facultyCount}
                onChange={(e) => setStats({ ...stats, facultyCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-academic-bg rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-academic-dark uppercase tracking-wider mb-1">
                Current Students Count
              </label>
              <input
                type="number"
                value={stats.studentCount}
                onChange={(e) => setStats({ ...stats, studentCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-academic-bg rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-academic-dark uppercase tracking-wider mb-1">
                Publications Count
              </label>
              <input
                type="number"
                value={stats.publicationsCount}
                onChange={(e) => setStats({ ...stats, publicationsCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-academic-bg rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-academic-dark uppercase tracking-wider mb-1">
                Research Projects Count
              </label>
              <input
                type="number"
                value={stats.researchProjectsCount}
                onChange={(e) => setStats({ ...stats, researchProjectsCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-academic-bg rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-academic-dark uppercase tracking-wider mb-1">
                Years of Excellence
              </label>
              <input
                type="number"
                value={stats.yearsOfExcellence}
                onChange={(e) => setStats({ ...stats, yearsOfExcellence: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-academic-bg rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-academic-dark uppercase tracking-wider mb-1">
                Historical Alumni Count
              </label>
              <input
                type="number"
                value={stats.alumniCount}
                onChange={(e) => setStats({ ...stats, alumniCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-academic-bg rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-academic-border">
            <button
              onClick={handleSaveStats}
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Statistics Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: FACULTY MANAGEMENT */}
      {activeTab === 'faculty' && (
        <div className="space-y-8">
          {/* Add Faculty Form */}
          <div className="academic-card p-6 md:p-8 bg-academic-bg border border-academic-border">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
              <Plus className="w-5 h-5 text-academic-primary" />
              <span>Add New Faculty Member</span>
            </h3>

            <form onSubmit={handleAddFaculty} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  placeholder="e.g. Dr. Jane Doe"
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Designation *
                </label>
                <select
                  value={newFaculty.designation}
                  onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value as Designation })}
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs font-medium"
                >
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  value={newFaculty.qualification}
                  onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                  placeholder="Ph.D. in Sociology (Sussex)"
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={newFaculty.email}
                  onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                  placeholder="name-soc@sust.edu"
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Phone / Extension
                </label>
                <input
                  type="text"
                  value={newFaculty.phone}
                  onChange={(e) => setNewFaculty({ ...newFaculty, phone: e.target.value })}
                  placeholder="+880 821-713491 (Ext. 260)"
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Office Room
                </label>
                <input
                  type="text"
                  value={newFaculty.room}
                  onChange={(e) => setNewFaculty({ ...newFaculty, room: e.target.value })}
                  placeholder="Room 210, Academic Building D"
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Biography & Scholarly Profile
                </label>
                <textarea
                  rows={2}
                  value={newFaculty.bio}
                  onChange={(e) => setNewFaculty({ ...newFaculty, bio: e.target.value })}
                  placeholder="Academic interests, research areas, and mentorship..."
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <button
                  type="submit"
                  className="px-5 py-2 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold rounded uppercase tracking-wider shadow-xs"
                >
                  Create Faculty Member
                </button>
              </div>
            </form>
          </div>

          {/* Existing Faculty Roster */}
          <div className="academic-card p-6">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border">
              Current Faculty Members Roster ({faculty.length})
            </h3>
            <div className="divide-y divide-academic-border/60">
              {faculty.map((f) => (
                <div key={f.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={f.avatarUrl}
                      alt={f.name}
                      className="w-10 h-10 rounded-full object-cover border border-academic-border"
                    />
                    <div>
                      <p className="text-xs font-bold text-academic-dark">{f.name}</p>
                      <p className="text-[11px] text-academic-primary font-medium">{f.designation} • {f.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteFaculty(f.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors text-xs"
                    title="Delete member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: BATCHES & CSV STUDENT IMPORT */}
      {activeTab === 'batches' && (
        <div className="space-y-8">
          {/* CSV Import Banner Card */}
          <div className="academic-card p-6 md:p-8 bg-academic-bg border border-academic-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-3 border-b border-academic-border">
              <div>
                <span className="text-xs font-bold text-academic-primary uppercase tracking-widest block">
                  Bulk Registration
                </span>
                <h3 className="font-serif font-bold text-xl text-academic-dark">
                  Import Students Directly via CSV File
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleDownloadCSVTemplate}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-academic-accent-soft text-academic-dark rounded text-xs font-semibold border border-academic-border transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 text-academic-primary" />
                  <span>Download Sample CSV</span>
                </button>

                <label className="inline-flex items-center space-x-1.5 px-4 py-2 bg-academic-primary hover:bg-academic-primary-hover text-white rounded text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>Upload & Import CSV</span>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleUploadCSV}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <p className="text-xs text-academic-text-muted leading-relaxed">
              You can collect student information via Google Forms or spreadsheets, export as a <strong>.CSV</strong> file, and upload directly here. The system will automatically map the fields, calculate cohort gender ratios, and populate their directories.
            </p>

            <div className="mt-4 p-3 bg-white rounded border border-academic-border text-[11px] font-mono text-academic-text-muted overflow-x-auto">
              <span className="font-bold text-academic-primary font-sans block mb-1">Supported CSV Columns:</span>
              <code>name, registrationNo, batchSession, email, phone, address, gender, quote, skills</code>
            </div>
          </div>

          {/* Current Batch View */}
          <div className="academic-card p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-3 border-b border-academic-border">
              <div>
                <h3 className="font-serif font-bold text-lg text-academic-dark">
                  Batch Roster Management
                </h3>
                <p className="text-xs text-academic-text-muted">
                  View and manage student profiles per academic session.
                </p>
              </div>

              <div className="w-full sm:w-56">
                <select
                  value={selectedAdminBatch}
                  onChange={(e) => setSelectedAdminBatch(e.target.value)}
                  className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs font-semibold text-academic-dark focus:outline-none focus:border-academic-primary cursor-pointer"
                >
                  {batches.map((b) => (
                    <option key={b.session} value={b.session}>
                      Session {b.session} ({b.totalStudents} students)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Students List in Selected Batch */}
            {(() => {
              const currentBatch = batches.find(b => b.session === selectedAdminBatch) || batches[0];
              if (!currentBatch || currentBatch.students.length === 0) {
                return (
                  <div className="py-8 text-center text-xs text-academic-text-muted">
                    No students currently registered in Session {selectedAdminBatch}. Use the CSV import above to upload students in bulk!
                  </div>
                );
              }

              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-academic-border text-academic-text-muted uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Student</th>
                        <th className="py-2.5 px-3">Registration No</th>
                        <th className="py-2.5 px-3">Gender</th>
                        <th className="py-2.5 px-3">Contact</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-academic-border/60">
                      {currentBatch.students.map((st) => (
                        <tr key={st.id} className="hover:bg-academic-bg/50">
                          <td className="py-3 px-3">
                            <div className="flex items-center space-x-2.5">
                              <img
                                src={st.avatarUrl}
                                alt={st.name}
                                className="w-8 h-8 rounded-full object-cover border border-academic-border"
                              />
                              <div>
                                <p className="font-bold text-academic-dark">{st.name}</p>
                                <p className="text-[11px] text-academic-text-muted truncate max-w-xs">{st.quote || 'Student'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono font-medium text-academic-primary">
                            {st.registrationNo}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                              st.gender === 'Female' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {st.gender}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-[11px] text-academic-text-muted">
                            <p>{st.email}</p>
                            <p>{st.phone}</p>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => handleDeleteStudent(st.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors text-xs"
                              title="Delete student"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 3: RESEARCH MANAGEMENT */}
      {activeTab === 'research' && (
        <div className="space-y-8">
          <div className="academic-card p-6 md:p-8 bg-academic-bg border border-academic-border">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
              <Plus className="w-5 h-5 text-academic-primary" />
              <span>Record New Publication</span>
            </h3>

            <form onSubmit={handleAddResearch} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={newResearch.title}
                  onChange={(e) => setNewResearch({ ...newResearch, title: e.target.value })}
                  placeholder="e.g. From Geomorphic and social transformations of gravel mining..."
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                    Journal
                  </label>
                  <input
                    type="text"
                    value={newResearch.journal}
                    onChange={(e) => setNewResearch({ ...newResearch, journal: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                    Volume & Issue
                  </label>
                  <input
                    type="text"
                    value={newResearch.volume}
                    onChange={(e) => setNewResearch({ ...newResearch, volume: e.target.value })}
                    placeholder="Vol. 3, Issue 1"
                    className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={newResearch.publishedDate}
                    onChange={(e) => setNewResearch({ ...newResearch, publishedDate: e.target.value })}
                    placeholder="January 5, 2026"
                    className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Abstract *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newResearch.abstract}
                  onChange={(e) => setNewResearch({ ...newResearch, abstract: e.target.value })}
                  placeholder="Detailed summary of methodology and empirical findings..."
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold rounded uppercase tracking-wider shadow-xs"
              >
                Publish Research Entry
              </button>
            </form>
          </div>

          <div className="academic-card p-6">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border">
              Published Articles ({research.length})
            </h3>
            <div className="divide-y divide-academic-border/60">
              {research.map((r) => (
                <div key={r.id} className="py-3 flex justify-between items-center gap-4">
                  <div>
                    <p className="text-xs font-bold text-academic-dark">{r.title}</p>
                    <p className="text-[11px] text-academic-text-muted">{r.journal} • {r.publishedDate}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteResearch(r.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STORIES MANAGEMENT */}
      {activeTab === 'stories' && (
        <div className="space-y-8">
          <div className="academic-card p-6 md:p-8 bg-academic-bg border border-academic-border">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
              <Plus className="w-5 h-5 text-academic-primary" />
              <span>Add Success Story</span>
            </h3>

            <form onSubmit={handleAddStory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                    Student / Scholar Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStory.studentName}
                    onChange={(e) => setNewStory({ ...newStory, studentName: e.target.value })}
                    placeholder="e.g. Marjana Akter"
                    className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                    Organization / Fellowship *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStory.organization}
                    onChange={(e) => setNewStory({ ...newStory, organization: e.target.value })}
                    placeholder="e.g. United Nations / Google"
                    className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={newStory.headline}
                  onChange={(e) => setNewStory({ ...newStory, headline: e.target.value })}
                  placeholder="e.g. First Bangladeshi Woman Selected for UN Fellowship..."
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-academic-dark uppercase mb-1">
                  Summary Narrative
                </label>
                <textarea
                  rows={3}
                  value={newStory.shortSummary}
                  onChange={(e) => setNewStory({ ...newStory, shortSummary: e.target.value })}
                  placeholder="Key milestones and impact..."
                  className="w-full px-3 py-2 bg-white rounded border border-academic-border text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold rounded uppercase tracking-wider shadow-xs"
              >
                Publish Success Story
              </button>
            </form>
          </div>

          <div className="academic-card p-6">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border">
              Published Success Stories ({stories.length})
            </h3>
            <div className="divide-y divide-academic-border/60">
              {stories.map((s) => (
                <div key={s.id} className="py-3 flex justify-between items-center gap-4">
                  <div>
                    <p className="text-xs font-bold text-academic-dark">{s.studentName} — {s.organization}</p>
                    <p className="text-[11px] text-academic-text-muted">{s.headline}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteStory(s.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="academic-card p-6">
          <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border">
            Submitted Inquiries & Messages ({messages.length})
          </h3>

          {messages.length === 0 ? (
            <p className="text-xs text-academic-text-muted text-center py-8">
              No inquiries received yet. Visitors can submit messages via the /contact route.
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="p-4 bg-academic-bg rounded border border-academic-border text-xs">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-academic-dark">{m.fullName} ({m.email})</span>
                    <span className="text-[10px] text-academic-text-muted font-mono">{new Date(m.submittedAt).toLocaleString()}</span>
                  </div>
                  <p className="font-semibold text-academic-primary mb-1">Subject: {m.subject}</p>
                  <p className="text-academic-dark/90 whitespace-pre-wrap">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <div className="academic-card p-6 md:p-8 max-w-2xl">
          <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border">
            Backup & Migration Operations
          </h3>
          <p className="text-xs text-academic-text-muted mb-6">
            Export all client-side edited data as a single JSON file, or restore a previously saved state.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold uppercase rounded transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export Portal JSON</span>
            </button>

            <label className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white hover:bg-academic-bg text-academic-dark border border-academic-border text-xs font-semibold uppercase rounded cursor-pointer transition-colors shadow-xs">
              <Upload className="w-4 h-4 text-academic-primary" />
              <span>Import Portal JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
