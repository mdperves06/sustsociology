import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Compass,
  Users,
  CheckCircle,
  Globe,
  Search,
  Plus,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Send,
  Building,
  ExternalLink,
  ChevronRight,
  X,
  Sparkles,
  Tag
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { JobCard } from '../components/cards/JobCard';
import { SidebarNav } from '../components/layout/SidebarNav';
import { CAREER_ROLES } from '../data/careers';
import { dataService } from '../services/dataService';
import { JobOpportunity } from '../types';

export const JobsPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'live' | 'sectors'>('live');

  // Live Jobs State
  const [liveJobs, setLiveJobs] = useState<JobOpportunity[]>([]);
  const [selectedLiveType, setSelectedLiveType] = useState<string>('All');
  const [selectedLiveCategory, setSelectedLiveCategory] = useState<string>('All');
  const [liveSearchQuery, setLiveSearchQuery] = useState<string>('');

  // Selected Job Detail Modal
  const [activeJobDetail, setActiveJobDetail] = useState<JobOpportunity | null>(null);
  const [applicationSent, setApplicationSent] = useState(false);

  // Post Job Modal State
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [postJobSuccess, setPostJobSuccess] = useState(false);
  const [newJobData, setNewJobData] = useState<Partial<JobOpportunity>>({
    title: '',
    organization: '',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    deadline: 'November 30, 2026',
    contactEmail: '',
    category: 'NGO & Multilateral',
    salaryOrStipend: 'Competitive / Negotiable',
    description: '',
    requirements: ['BSS or MSS in Sociology', 'Strong analytical and communication skills']
  });
  const [requirementsInput, setRequirementsInput] = useState('BSS or MSS in Sociology\nStrong research or field experience\nBilingual communication skills');

  // Sector View State (PDF page 6)
  const [selectedSectorCategory, setSelectedSectorCategory] = useState<string>('All');
  const [sectorSearchQuery, setSectorSearchQuery] = useState<string>('');

  useEffect(() => {
    setLiveJobs(dataService.getJobs());
  }, []);

  const jobTypes = ['All', 'Full-time', 'Internship', 'Research Fellowship', 'Contract'];
  const jobCategories = ['All', 'NGO & Multilateral', 'Academia & Research', 'Corporate & HR', 'Tech & Data'];
  const sectorCategories = ['All', 'Tech Giants', 'Global Multilateral', 'Media & Journalism', 'Industry & Finance'];

  // Filtered Live Jobs
  const filteredLiveJobs = liveJobs.filter((job) => {
    const matchesType = selectedLiveType === 'All' || job.type === selectedLiveType;
    const matchesCat = selectedLiveCategory === 'All' || job.category === selectedLiveCategory;
    const q = liveSearchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.organization.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q);

    return matchesType && matchesCat && matchesQuery;
  });

  // Filtered Sector Cards (PDF page 6)
  const filteredSectors = CAREER_ROLES.filter((job) => {
    const matchesCategory =
      selectedSectorCategory === 'All' || job.category === selectedSectorCategory;
    const q = sectorSearchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      job.organization.toLowerCase().includes(q) ||
      job.roles.some((r) => r.toLowerCase().includes(q)) ||
      job.description.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobData.title || !newJobData.organization || !newJobData.contactEmail) return;

    const reqs = requirementsInput
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    dataService.addJob({
      title: newJobData.title,
      organization: newJobData.organization,
      type: (newJobData.type as any) || 'Full-time',
      location: newJobData.location || 'Bangladesh',
      deadline: newJobData.deadline || 'November 30, 2026',
      contactEmail: newJobData.contactEmail,
      category: (newJobData.category as any) || 'NGO & Multilateral',
      salaryOrStipend: newJobData.salaryOrStipend || 'Competitive',
      description: newJobData.description || 'Exciting career opportunity posted by SUST Sociology Alumni network.',
      requirements: reqs.length > 0 ? reqs : ['BSS/MSS degree', 'Relevant experience'],
      postedByAlumniName: 'SUST Sociology Alumnus',
      featured: false
    });

    setLiveJobs(dataService.getJobs());
    setPostJobSuccess(true);
    setTimeout(() => {
      setPostJobSuccess(false);
      setIsPostJobOpen(false);
      setNewJobData({
        title: '',
        organization: '',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        deadline: 'November 30, 2026',
        contactEmail: '',
        category: 'NGO & Multilateral',
        salaryOrStipend: 'Competitive / Negotiable',
        description: ''
      });
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Career Horizons & Placement Hub"
            title="Jobs & Opportunities in Sociology"
            subtitle="Understand People. Solve Problems. Change the World. Explore live alumni vacancies, fellowships, and career mappings across global multilateral bodies, tech giants, and NGOs."
          />

          {/* Inspirational Career Manifesto Card */}
          <div className="academic-card p-6 md:p-8 bg-academic-bg border-l-4 border-academic-primary mb-8 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-academic-dark mb-2">
              Why the World Needs Sociologists Now More Than Ever
            </h3>
            <p className="text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify mb-4">
              Sociology is an indispensable analytical superpower in the age of algorithmic systems, climate disruption,
              and geopolitical reconfigurations. From Silicon Valley UX laboratories to United Nations humanitarian missions
              and the World Bank's social safeguards, SUST sociology graduates bring indispensable critical tools to understand
              collective behavior, institutional equity, and human-centered design.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-academic-border/60 text-xs">
              <div className="flex items-center space-x-2 text-academic-dark font-medium">
                <CheckCircle className="w-4 h-4 text-academic-primary flex-shrink-0" />
                <span>Empirical Qualitative Fieldwork</span>
              </div>
              <div className="flex items-center space-x-2 text-academic-dark font-medium">
                <CheckCircle className="w-4 h-4 text-academic-primary flex-shrink-0" />
                <span>Computational & Survey Data Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-academic-dark font-medium">
                <CheckCircle className="w-4 h-4 text-academic-primary flex-shrink-0" />
                <span>Policy Evaluation & Impact Metrics</span>
              </div>
            </div>
          </div>

          {/* Dual View Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-academic-border pb-4 mb-8">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveView('live')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                  activeView === 'live'
                    ? 'bg-academic-primary text-white shadow-xs'
                    : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Live Openings & Fellowships ({liveJobs.length})</span>
              </button>

              <button
                onClick={() => setActiveView('sectors')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                  activeView === 'sectors'
                    ? 'bg-academic-primary text-white shadow-xs'
                    : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Global Career Sectors (PDF Page 6)</span>
              </button>
            </div>

            {activeView === 'live' && (
              <button
                onClick={() => setIsPostJobOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 bg-academic-primary hover:bg-academic-primary-dark text-white rounded-md text-xs font-semibold transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post an Opportunity</span>
              </button>
            )}
          </div>

          {/* ========================================================================= */}
          {/* VIEW 1: LIVE ALUMNI JOB & INTERNSHIP OPENINGS */}
          {/* ========================================================================= */}
          {activeView === 'live' && (
            <div className="space-y-6">
              {/* Filter Controls */}
              <div className="bg-white rounded-lg p-5 border border-academic-border shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={liveSearchQuery}
                      onChange={(e) => setLiveSearchQuery(e.target.value)}
                      placeholder="Search title, organization (e.g. BRAC, World Bank), or location..."
                      className="w-full pl-9 pr-4 py-2.5 bg-academic-bg rounded-md border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary shadow-xs"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-academic-text-muted">Type:</span>
                    {jobTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedLiveType(type)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                          selectedLiveType === type
                            ? 'bg-academic-primary text-white font-semibold shadow-xs'
                            : 'bg-academic-bg hover:bg-academic-surface text-academic-dark border border-academic-border/60'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-academic-border/60">
                  <span className="text-xs font-semibold text-academic-text-muted">Sector:</span>
                  {jobCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedLiveCategory(cat)}
                      className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                        selectedLiveCategory === cat
                          ? 'bg-academic-dark text-white font-semibold'
                          : 'bg-academic-bg hover:bg-academic-surface text-academic-text-muted border border-academic-border/60'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jobs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLiveJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`academic-card p-6 bg-white border hover:border-academic-primary transition-all shadow-xs flex flex-col justify-between ${
                      job.featured ? 'border-academic-gold/60 ring-1 ring-academic-gold/20' : 'border-academic-border'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-academic-surface text-academic-primary border border-academic-border">
                          {job.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-academic-bg text-academic-dark border border-academic-border/60">
                          {job.type}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="font-serif font-bold text-base text-academic-dark group-hover:text-academic-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs font-semibold text-academic-primary mt-1 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" />
                        <span>{job.organization}</span>
                      </p>

                      {/* Location & Salary */}
                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-academic-text-muted mt-3 pt-3 border-t border-academic-border/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-academic-primary" />
                          {job.location}
                        </span>
                        {job.salaryOrStipend && (
                          <span className="flex items-center gap-1 text-academic-dark font-medium">
                            <DollarSign className="w-3 h-3 text-green-600" />
                            {job.salaryOrStipend}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-academic-dark/80 mt-2.5 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Posted By Alumnus Badge */}
                      {job.postedByAlumniName && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-academic-primary bg-academic-surface px-2 py-0.5 rounded border border-academic-gold/30">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Shared by: {job.postedByAlumniName}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="mt-5 pt-3 border-t border-academic-border/60 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-academic-text-muted text-[11px]">
                        <Clock className="w-3 h-3 text-red-500" />
                        <span>Deadline: {job.deadline}</span>
                      </span>

                      <button
                        onClick={() => setActiveJobDetail(job)}
                        className="flex items-center space-x-1 font-semibold text-academic-primary hover:text-academic-primary-dark transition-colors"
                      >
                        <span>View & Apply</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredLiveJobs.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg border border-academic-border">
                  <Briefcase className="w-12 h-12 text-academic-text-muted mx-auto mb-3" />
                  <p className="text-sm font-semibold text-academic-dark">No live opportunities match your filters.</p>
                  <p className="text-xs text-academic-text-muted mt-1">Try resetting the type or category filters.</p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 2: GLOBAL CAREER SECTORS (PDF PAGE 6) */}
          {/* ========================================================================= */}
          {activeView === 'sectors' && (
            <div>
              {/* Sector Filter & Search */}
              <div className="bg-academic-surface rounded-lg p-5 border border-academic-border mb-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {sectorCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedSectorCategory(cat)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        selectedSectorCategory === cat
                          ? 'bg-academic-primary text-white shadow-xs'
                          : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={sectorSearchQuery}
                    onChange={(e) => setSectorSearchQuery(e.target.value)}
                    placeholder="Search company or role (e.g. UX)..."
                    className="w-full pl-9 pr-4 py-2 bg-white rounded-md border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary shadow-xs"
                  />
                </div>
              </div>

              {/* Jobs Grid matching PDF Page 6 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSectors.map((job, idx) => (
                  <JobCard key={`${job.organization}-${idx}`} job={job} />
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* JOB DETAIL & APPLICATION MODAL */}
          {/* ========================================================================= */}
          {activeJobDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-academic-dark/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-xl border border-academic-border shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => {
                    setActiveJobDetail(null);
                    setApplicationSent(false);
                  }}
                  className="absolute top-5 right-5 text-academic-text-muted hover:text-academic-dark"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-academic-surface text-academic-primary border border-academic-border">
                    {activeJobDetail.category} • {activeJobDetail.type}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-academic-dark mt-2">
                    {activeJobDetail.title}
                  </h3>
                  <p className="text-xs font-semibold text-academic-primary mt-0.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{activeJobDetail.organization}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-academic-bg rounded-lg border border-academic-border/60 text-xs mb-5">
                  <div>
                    <span className="text-[10px] text-academic-text-muted uppercase font-bold block">Location</span>
                    <span className="font-semibold text-academic-dark">{activeJobDetail.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-academic-text-muted uppercase font-bold block">Deadline</span>
                    <span className="font-semibold text-red-600">{activeJobDetail.deadline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-academic-text-muted uppercase font-bold block">Compensation</span>
                    <span className="font-semibold text-academic-primary">{activeJobDetail.salaryOrStipend || 'Competitive'}</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-academic-dark/90 leading-relaxed">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-academic-dark mb-1">Role Description</h4>
                    <p>{activeJobDetail.description}</p>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-academic-dark mb-1">Requirements & Qualifications</h4>
                    <ul className="space-y-1 list-disc pl-5 text-academic-dark/80">
                      {activeJobDetail.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {activeJobDetail.postedByAlumniName && (
                    <div className="p-3 rounded bg-academic-surface border border-academic-gold/40 text-[11px]">
                      <span className="font-semibold text-academic-primary">Alumni Referral Available: </span>
                      <span>
                        Posted by {activeJobDetail.postedByAlumniName}. SUST Sociology scholars are encouraged to mention
                        their batch session in their application email.
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-academic-border flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[11px] text-academic-text-muted">
                    Contact: <span className="font-mono text-academic-dark">{activeJobDetail.contactEmail}</span>
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {activeJobDetail.applicationLink && (
                      <a
                        href={activeJobDetail.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2 bg-white border border-academic-border rounded text-xs font-semibold text-academic-dark hover:bg-academic-bg transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Official Portal</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${activeJobDetail.contactEmail}?subject=Application for ${encodeURIComponent(
                        activeJobDetail.title
                      )} - SUST Sociology Graduate`}
                      className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-5 py-2 bg-academic-primary hover:bg-academic-primary-dark text-white rounded text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Resume / Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* POST AN OPPORTUNITY MODAL */}
          {/* ========================================================================= */}
          {isPostJobOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-academic-dark/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-xl border border-academic-border shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setIsPostJobOpen(false)}
                  className="absolute top-4 right-4 text-academic-text-muted hover:text-academic-dark"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="font-serif font-bold text-lg text-academic-dark mb-1">
                  Post a Job or Internship for SUST Scholars
                </h3>
                <p className="text-xs text-academic-text-muted mb-5">
                  Share career vacancies, research grants, or graduate trainee openings with the departmental network.
                </p>

                {postJobSuccess ? (
                  <div className="p-6 text-center bg-academic-surface rounded-lg border border-academic-gold/40">
                    <CheckCircle className="w-10 h-10 text-academic-primary mx-auto mb-2" />
                    <h4 className="font-serif font-bold text-base text-academic-dark">Vacancy Published!</h4>
                    <p className="text-xs text-academic-dark/90 mt-1">
                      Your opportunity is now visible on the live alumni jobs board.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePostJobSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-academic-dark mb-1">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={newJobData.title}
                        onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                        placeholder="e.g. Research Assistant / UX Researcher"
                        className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Organization *</label>
                        <input
                          type="text"
                          required
                          value={newJobData.organization}
                          onChange={(e) => setNewJobData({ ...newJobData, organization: e.target.value })}
                          placeholder="e.g. BRAC / ActionAid"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Opportunity Type *</label>
                        <select
                          value={newJobData.type}
                          onChange={(e) => setNewJobData({ ...newJobData, type: e.target.value as any })}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Internship">Internship</option>
                          <option value="Research Fellowship">Research Fellowship</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Location *</label>
                        <input
                          type="text"
                          value={newJobData.location}
                          onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
                          placeholder="e.g. Dhaka or Remote"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Application Deadline</label>
                        <input
                          type="text"
                          value={newJobData.deadline}
                          onChange={(e) => setNewJobData({ ...newJobData, deadline: e.target.value })}
                          placeholder="e.g. November 30, 2026"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Contact Email *</label>
                        <input
                          type="email"
                          required
                          value={newJobData.contactEmail}
                          onChange={(e) => setNewJobData({ ...newJobData, contactEmail: e.target.value })}
                          placeholder="careers@organization.org"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Salary / Stipend</label>
                        <input
                          type="text"
                          value={newJobData.salaryOrStipend}
                          onChange={(e) => setNewJobData({ ...newJobData, salaryOrStipend: e.target.value })}
                          placeholder="e.g. BDT 45,000 / month"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-academic-dark mb-1">Job Description</label>
                      <textarea
                        rows={3}
                        value={newJobData.description}
                        onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
                        placeholder="Key responsibilities and day-to-day focus of the role..."
                        className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-academic-dark mb-1">
                        Requirements (One requirement per line)
                      </label>
                      <textarea
                        rows={3}
                        value={requirementsInput}
                        onChange={(e) => setRequirementsInput(e.target.value)}
                        className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsPostJobOpen(false)}
                        className="px-4 py-2 border border-academic-border rounded text-xs font-semibold text-academic-dark hover:bg-academic-bg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-academic-primary hover:bg-academic-primary-dark text-white rounded text-xs font-semibold transition-colors shadow-xs"
                      >
                        Publish Vacancy
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
