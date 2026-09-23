import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Users,
  Globe,
  MapPin,
  Heart,
  Send,
  CheckCircle,
  Search,
  Filter,
  Download,
  Linkedin,
  Mail,
  Phone,
  Briefcase,
  Sparkles,
  HelpCircle,
  X,
  Droplet,
  Calendar,
  CreditCard,
  QrCode,
  Printer,
  Award,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Building,
  Clock
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SidebarNav } from '../components/layout/SidebarNav';
import { dataService } from '../services/dataService';
import { AlumniMember, IndustryType, MentorshipBooking, DonationPledge } from '../types';

export const AlumniPage: React.FC = () => {
  const [alumniList, setAlumniList] = useState<AlumniMember[]>([]);
  const [activeTab, setActiveTab] = useState<'directory' | 'blood' | 'register' | 'mentorship' | 'giving' | 'idcard'>('directory');
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [mentorshipOnly, setMentorshipOnly] = useState(false);

  // Blood Donor Search States
  const [bloodGroupFilter, setBloodGroupFilter] = useState<string>('All');
  const [bloodCityFilter, setBloodCityFilter] = useState<string>('All');

  // Registration Modal & State
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [newAlumnusName, setNewAlumnusName] = useState('');

  // Mentorship Booking Modal State
  const [selectedMentor, setSelectedMentor] = useState<AlumniMember | null>(null);
  const [bookingTopic, setBookingTopic] = useState('Career Guidance & Industry Transition');
  const [bookingMode, setBookingMode] = useState<'Zoom' | 'Google Meet' | 'Phone Call' | 'In-person (SUST)'>('Google Meet');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentBatch, setStudentBatch] = useState('2023-2024');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Giving Fund State
  const [pledges, setPledges] = useState<DonationPledge[]>([]);
  const [donorName, setDonorName] = useState('');
  const [donorBatch, setDonorBatch] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorAmount, setDonorAmount] = useState('5000');
  const [donorCause, setDonorCause] = useState<'Needy Student Scholarship' | 'Emergency Medical Aid' | 'Seminar Library Fund' | 'Silver Jubilee Reunion'>('Needy Student Scholarship');
  const [donorMethod, setDonorMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Bank Wire/SWIFT'>('bKash');
  const [donorTrx, setDonorTrx] = useState('');
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);

  // Digital ID Card State
  const [selectedIdAlumnus, setSelectedIdAlumnus] = useState<AlumniMember | null>(null);
  const idCardRef = useRef<HTMLDivElement>(null);

  // Form Data for Registration
  const [formData, setFormData] = useState<Partial<AlumniMember>>({
    name: '',
    batchSession: '2016-2017',
    graduationYear: 2021,
    degree: 'BSS',
    registrationNo: '',
    currentRole: '',
    organization: '',
    industry: 'Civil Service & Govt',
    country: 'Bangladesh',
    city: 'Sylhet',
    email: '',
    phone: '',
    linkedIn: '',
    bloodGroup: 'B+',
    isAvailableForBloodDonation: true,
    chapter: 'Sylhet',
    openToMentorship: true,
    mentorshipTopics: ['Career Guidance', 'BCS Prep'],
    bio: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const list = dataService.getAlumni();
    setAlumniList(list);
    setPledges(dataService.getDonationPledges());
    if (list.length > 0 && !selectedIdAlumnus) {
      setSelectedIdAlumnus(list[0]);
    }
  };

  const industries = [
    'All',
    'Civil Service & Govt',
    'Academia & Research',
    'Tech & Data',
    'NGO & Multilateral',
    'Banking & Finance',
    'Media & Journalism',
    'Corporate'
  ];

  const countries = ['All', 'Bangladesh', 'United Kingdom', 'United States', 'Switzerland', 'Hong Kong'];
  const chapters = ['All', 'Sylhet', 'Dhaka', 'Chittagong', 'North America', 'Europe & UK', 'Australia', 'Other International'];
  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Directory Filter
  const filteredAlumni = alumniList.filter((a) => {
    const matchesIndustry = selectedIndustry === 'All' || a.industry === selectedIndustry;
    const matchesCountry = selectedCountry === 'All' || a.country === selectedCountry;
    const matchesChapter = selectedChapter === 'All' || a.chapter === selectedChapter;
    const matchesMentorship = !mentorshipOnly || a.openToMentorship;

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.organization.toLowerCase().includes(q) ||
      a.currentRole.toLowerCase().includes(q) ||
      a.batchSession.includes(q) ||
      a.city.toLowerCase().includes(q) ||
      (a.bloodGroup && a.bloodGroup.toLowerCase() === q) ||
      (a.mentorshipTopics && a.mentorshipTopics.some((t) => t.toLowerCase().includes(q)));

    return matchesIndustry && matchesCountry && matchesChapter && matchesMentorship && matchesQuery;
  });

  // Blood Network Filter
  const bloodDonors = alumniList.filter((a) => {
    const hasBlood = !!a.bloodGroup;
    const matchesGroup = bloodGroupFilter === 'All' || a.bloodGroup === bloodGroupFilter;
    const matchesCity = bloodCityFilter === 'All' || a.city.toLowerCase().includes(bloodCityFilter.toLowerCase());
    return hasBlood && matchesGroup && matchesCity;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newMember = dataService.addAlumni({
      name: formData.name,
      batchSession: formData.batchSession || '2016-2017',
      graduationYear: Number(formData.graduationYear) || 2021,
      degree: (formData.degree as any) || 'BSS',
      registrationNo: formData.registrationNo || `2016234${Math.floor(100 + Math.random() * 900)}`,
      currentRole: formData.currentRole || 'Professional',
      organization: formData.organization || 'Organization',
      industry: (formData.industry as IndustryType) || 'Corporate',
      country: formData.country || 'Bangladesh',
      city: formData.city || 'Sylhet',
      email: formData.email,
      phone: formData.phone || '',
      linkedIn: formData.linkedIn || '',
      avatarUrl:
        formData.avatarUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      openToMentorship: formData.openToMentorship ?? true,
      mentorshipTopics:
        typeof formData.mentorshipTopics === 'string'
          ? (formData.mentorshipTopics as string).split(',').map((s) => s.trim())
          : formData.mentorshipTopics || ['Career Advice'],
      bio: formData.bio || 'Proud alumnus of the Department of Sociology, SUST.',
      bloodGroup: formData.bloodGroup || 'B+',
      isAvailableForBloodDonation: formData.isAvailableForBloodDonation ?? true,
      chapter: formData.chapter || 'Sylhet',
      approved: true
    });

    setNewAlumnusName(newMember.name);
    loadData();
    setSelectedIdAlumnus(newMember);
    setRegisteredSuccess(true);
  };

  const handleMentorshipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !studentName || !studentEmail) return;

    dataService.createMentorshipBooking({
      studentName,
      studentEmail,
      studentBatch,
      alumniId: selectedMentor.id,
      alumniName: selectedMentor.name,
      topic: bookingTopic,
      preferredMode: bookingMode,
      message: bookingMessage
    });

    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedMentor(null);
      setBookingMessage('');
    }, 3500);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail || !donorAmount) return;

    dataService.submitDonationPledge({
      donorName,
      donorBatch: donorBatch || undefined,
      donorEmail,
      amount: Number(donorAmount),
      currency: 'BDT',
      cause: donorCause,
      paymentMethod: donorMethod,
      transactionRef: donorTrx || `TRX-${Date.now().toString().slice(-6)}`,
      message: 'Donation pledge committed to SUST Sociology Alumni Welfare Fund.'
    });

    setPledges(dataService.getDonationPledges());
    setPledgeSubmitted(true);
    setTimeout(() => {
      setPledgeSubmitted(false);
      setDonorTrx('');
    }, 4000);
  };

  const handleExportCSV = () => {
    const csv = dataService.exportAlumniCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sust_sociology_alumni_directory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintCard = () => {
    window.print();
  };

  // Fund Metrics
  const totalRaised = pledges.reduce((acc, p) => acc + p.amount, 0);
  const targetFund = 1500000;
  const progressPercent = Math.min(100, Math.round((totalRaised / targetFund) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Lifelong Fellowship & Global Network"
            title="SUST Sociology Alumni Association"
            subtitle="Connecting over 1,315 graduates across 20+ batches worldwide since 1992. Engage in the directory, access the emergency blood lifeline, book 1-on-1 mentorship, and support departmental endowments."
          />

          {/* Metrics Banner */}
          <div className="bg-academic-surface rounded-lg p-6 border border-academic-border mb-8 shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-academic-border">
              <div className="p-2">
                <span className="text-xs uppercase font-bold text-academic-text-muted">Total Alumni</span>
                <div className="text-3xl font-serif font-bold text-academic-primary mt-1">1,315+</div>
                <p className="text-[11px] text-academic-text-muted mt-0.5">20 Batches (1992–2024)</p>
              </div>

              <div className="p-2 pt-4 md:pt-2">
                <span className="text-xs uppercase font-bold text-academic-text-muted">Global Reach</span>
                <div className="text-3xl font-serif font-bold text-academic-dark mt-1">28+</div>
                <p className="text-[11px] text-academic-text-muted mt-0.5">Countries Across 5 Continents</p>
              </div>

              <div className="p-2 pt-4 md:pt-2">
                <span className="text-xs uppercase font-bold text-academic-text-muted">Active Mentors</span>
                <div className="text-3xl font-serif font-bold text-academic-primary mt-1">
                  {alumniList.filter((a) => a.openToMentorship).length}+
                </div>
                <p className="text-[11px] text-academic-text-muted mt-0.5">BCS, Higher Studies, UN & Tech</p>
              </div>

              <div className="p-2 pt-4 md:pt-2">
                <span className="text-xs uppercase font-bold text-academic-text-muted">Blood Donors</span>
                <div className="text-3xl font-serif font-bold text-red-600 mt-1">
                  {alumniList.filter((a) => a.isAvailableForBloodDonation).length}+
                </div>
                <p className="text-[11px] text-academic-text-muted mt-0.5">Emergency Lifeline Network</p>
              </div>
            </div>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-academic-border pb-4 mb-8">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'directory'
                  ? 'bg-academic-primary text-white shadow-xs'
                  : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Alumni Directory ({alumniList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('blood')}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'blood'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white hover:bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              <Droplet className="w-3.5 h-3.5 fill-current" />
              <span>Emergency Blood Lifeline</span>
            </button>

            <button
              onClick={() => setActiveTab('register')}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'register'
                  ? 'bg-academic-primary text-white shadow-xs'
                  : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Register as Alumni</span>
            </button>

            <button
              onClick={() => setActiveTab('giving')}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'giving'
                  ? 'bg-academic-primary text-white shadow-xs'
                  : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-red-500" />
              <span>Endowment & Giving Fund</span>
            </button>

            <button
              onClick={() => setActiveTab('idcard')}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'idcard'
                  ? 'bg-academic-primary text-white shadow-xs'
                  : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Virtual Alumni Card</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: ALUMNI DIRECTORY */}
          {/* ========================================================================= */}
          {activeTab === 'directory' && (
            <div>
              {/* Filter & Search Bar */}
              <div className="bg-white rounded-lg p-5 border border-academic-border mb-8 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, company, batch, blood group, city or skill..."
                      className="w-full pl-9 pr-4 py-2.5 bg-academic-bg rounded-md border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary shadow-xs"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-academic-bg border border-academic-border rounded-md text-xs font-semibold text-academic-dark transition-colors"
                      title="Download alumni directory as CSV"
                    >
                      <Download className="w-3.5 h-3.5 text-academic-primary" />
                      <span>Export CSV</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('register')}
                      className="flex items-center space-x-1.5 px-4 py-2 bg-academic-primary hover:bg-academic-primary-dark text-white rounded-md text-xs font-semibold transition-colors shadow-xs"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Join Directory</span>
                    </button>
                  </div>
                </div>

                {/* Dropdown Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-academic-border/60">
                  <div>
                    <label className="block text-[11px] font-semibold text-academic-text-muted uppercase mb-1">
                      Sector / Industry
                    </label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full px-3 py-1.5 bg-academic-bg rounded-md border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                    >
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-academic-text-muted uppercase mb-1">
                      Alumni Chapter
                    </label>
                    <select
                      value={selectedChapter}
                      onChange={(e) => setSelectedChapter(e.target.value)}
                      className="w-full px-3 py-1.5 bg-academic-bg rounded-md border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                    >
                      {chapters.map((chap) => (
                        <option key={chap} value={chap}>
                          {chap}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center sm:pt-4">
                    <label className="flex items-center space-x-2 text-xs text-academic-dark font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mentorshipOnly}
                        onChange={(e) => setMentorshipOnly(e.target.checked)}
                        className="rounded border-academic-border text-academic-primary focus:ring-academic-primary h-4 w-4"
                      />
                      <span>Only Show Open to Mentorship</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Alumni Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlumni.map((alumnus) => (
                  <div
                    key={alumnus.id}
                    className="academic-card p-6 flex flex-col justify-between hover:border-academic-primary transition-all duration-200 group"
                  >
                    <div>
                      {/* Header Strip */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <img
                          src={alumnus.avatarUrl}
                          alt={alumnus.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-academic-gold/40 shadow-xs flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-academic-surface text-academic-primary border border-academic-border">
                            {alumnus.batchSession}
                          </span>
                          {alumnus.bloodGroup && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 flex items-center gap-0.5">
                              <Droplet className="w-2.5 h-2.5 fill-current" />
                              {alumnus.bloodGroup}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Name & Role */}
                      <h3 className="font-serif font-bold text-base text-academic-dark group-hover:text-academic-primary transition-colors">
                        {alumnus.name}
                      </h3>
                      <p className="text-xs font-semibold text-academic-primary mt-0.5">{alumnus.currentRole}</p>
                      <p className="text-xs text-academic-text-muted mt-0.5 flex items-center gap-1">
                        <Building className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{alumnus.organization}</span>
                      </p>

                      {/* Location & Degree */}
                      <div className="flex items-center gap-3 text-[11px] text-academic-text-muted mt-3 pt-3 border-t border-academic-border/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-academic-primary" />
                          {alumnus.city}, {alumnus.country}
                        </span>
                        <span>•</span>
                        <span>
                          {alumnus.degree} ('{alumnus.graduationYear.toString().slice(-2)})
                        </span>
                      </div>

                      {/* Bio */}
                      {alumnus.bio && (
                        <p className="text-xs text-academic-dark/80 mt-2.5 line-clamp-2 leading-relaxed">
                          {alumnus.bio}
                        </p>
                      )}

                      {/* Mentorship Topics */}
                      {alumnus.mentorshipTopics && alumnus.mentorshipTopics.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {alumnus.mentorshipTopics.map((topic, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-academic-bg text-academic-text-muted border border-academic-border/60"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions Strip */}
                    <div className="mt-5 pt-3 border-t border-academic-border/60 flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        {alumnus.email && (
                          <a
                            href={`mailto:${alumnus.email}`}
                            className="p-1.5 rounded bg-academic-bg hover:bg-academic-surface text-academic-dark hover:text-academic-primary transition-colors"
                            title={`Email ${alumnus.name}`}
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {alumnus.phone && (
                          <a
                            href={`tel:${alumnus.phone}`}
                            className="p-1.5 rounded bg-academic-bg hover:bg-academic-surface text-academic-dark hover:text-academic-primary transition-colors"
                            title={`Call ${alumnus.phone}`}
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {alumnus.linkedIn && (
                          <a
                            href={alumnus.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded bg-academic-bg hover:bg-academic-surface text-academic-dark hover:text-academic-primary transition-colors"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {alumnus.openToMentorship && (
                        <button
                          onClick={() => {
                            setSelectedMentor(alumnus);
                            setBookingTopic(
                              alumnus.mentorshipTopics && alumnus.mentorshipTopics.length > 0
                                ? alumnus.mentorshipTopics[0]
                                : 'Career Guidance'
                            );
                          }}
                          className="flex items-center space-x-1 text-xs font-semibold text-academic-primary hover:text-academic-primary-dark transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Book Mentor</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredAlumni.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg border border-academic-border">
                  <GraduationCap className="w-12 h-12 text-academic-text-muted mx-auto mb-3 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-academic-dark">No alumni match your criteria.</p>
                  <p className="text-xs text-academic-text-muted mt-1">
                    Try adjusting your search keywords, sector, or chapter filter.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: EMERGENCY BLOOD LIFELINE */}
          {/* ========================================================================= */}
          {activeTab === 'blood' && (
            <div className="space-y-6">
              {/* Emergency Banner */}
              <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-full text-red-600 flex-shrink-0">
                    <Droplet className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-red-950">
                      SUST Sociology Alumni Emergency Blood Lifeline
                    </h3>
                    <p className="text-xs text-red-900/90 leading-relaxed mt-1">
                      A humanitarian community initiative. When current students, faculty, or alumni family members
                      require emergency blood units at Sylhet MAG Osmani Medical College, Mount Adora, Jalalabad Ragib-Rabeya,
                      or Dhaka hospitals, connect directly with registered donors below.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-semibold text-red-800">
                      <span>• Verified Contact Numbers</span>
                      <span>• Fast WhatsApp Connect</span>
                      <span>• Direct Batch Coordination</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blood Group Filters */}
              <div className="bg-white rounded-lg p-5 border border-academic-border shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-academic-dark mr-2">Blood Group:</span>
                  {bloodGroups.map((grp) => (
                    <button
                      key={grp}
                      onClick={() => setBloodGroupFilter(grp)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        bloodGroupFilter === grp
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-white hover:bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {grp}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-academic-dark whitespace-nowrap">City:</span>
                  <input
                    type="text"
                    value={bloodCityFilter === 'All' ? '' : bloodCityFilter}
                    onChange={(e) => setBloodCityFilter(e.target.value || 'All')}
                    placeholder="Filter by city (e.g. Sylhet, Dhaka)..."
                    className="w-full md:w-56 px-3 py-1.5 bg-academic-bg rounded-md border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Donor Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bloodDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="academic-card p-6 border-red-100 hover:border-red-400 bg-white transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={donor.avatarUrl}
                            alt={donor.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-red-200"
                          />
                          <div>
                            <h4 className="font-serif font-bold text-sm text-academic-dark">{donor.name}</h4>
                            <p className="text-[11px] text-academic-text-muted">Batch {donor.batchSession}</p>
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-red-600 text-white font-serif font-bold text-base shadow-xs flex flex-col items-center">
                          <span>{donor.bloodGroup}</span>
                          <span className="text-[8px] uppercase tracking-wider">Group</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-academic-dark/90 mt-2">
                        <p className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
                          <span className="truncate">{donor.currentRole} • {donor.organization}</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-academic-text-muted">
                          <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                          <span>{donor.city}, {donor.country}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-academic-border/60 flex items-center gap-2">
                      {donor.phone ? (
                        <>
                          <a
                            href={`tel:${donor.phone}`}
                            className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition-colors shadow-xs"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call {donor.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/${donor.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                            title="WhatsApp Chat"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </>
                      ) : (
                        <a
                          href={`mailto:${donor.email}`}
                          className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-academic-bg hover:bg-academic-surface border border-academic-border text-academic-dark rounded text-xs font-semibold"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email Donor</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {bloodDonors.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg border border-academic-border">
                  <Droplet className="w-12 h-12 text-red-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-academic-dark">No donors match this blood group in the selected city.</p>
                  <p className="text-xs text-academic-text-muted mt-1">
                    Try selecting "All" or contact the SUST Sociology Association hotline at +880 1711-234567.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: REGISTER AS ALUMNI */}
          {/* ========================================================================= */}
          {activeTab === 'register' && (
            <div className="bg-white rounded-xl border border-academic-border p-6 md:p-8 shadow-xs">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-academic-primary/10 text-academic-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-academic-dark">
                    Official Alumni Registration & Verification
                  </h3>
                  <p className="text-xs sm:text-sm text-academic-text-muted mt-1 leading-relaxed">
                    Graduates from BSS, MSS, M.Phil., and Ph.D. programs are invited to register. Your profile enables fellow
                    alumni to connect, students to seek guidance, and emergency blood networks to coordinate.
                  </p>
                </div>

                {registeredSuccess ? (
                  <div className="p-8 text-center bg-academic-surface rounded-lg border border-academic-gold/40 animate-in fade-in">
                    <CheckCircle className="w-12 h-12 text-academic-primary mx-auto mb-3" />
                    <h4 className="font-serif font-bold text-xl text-academic-dark">
                      Welcome Home, {newAlumnusName}!
                    </h4>
                    <p className="text-xs text-academic-dark/90 mt-2 max-w-md mx-auto leading-relaxed">
                      Your alumni profile has been registered and verified in the live directory. You can now generate your
                      official Virtual Alumni Card or view your entry in the directory.
                    </p>
                    <div className="flex justify-center gap-3 mt-6">
                      <button
                        onClick={() => setActiveTab('idcard')}
                        className="px-5 py-2.5 bg-academic-primary text-white text-xs font-semibold rounded shadow-xs hover:bg-academic-primary-dark transition-colors"
                      >
                        View Virtual Alumni Card
                      </button>
                      <button
                        onClick={() => setActiveTab('directory')}
                        className="px-5 py-2.5 bg-white border border-academic-border text-academic-dark text-xs font-semibold rounded hover:bg-academic-bg transition-colors"
                      >
                        Go to Directory
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Dr. A. H. M. Belal Hossain"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Registration Number
                        </label>
                        <input
                          type="text"
                          value={formData.registrationNo}
                          onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                          placeholder="e.g. 2016234012"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Batch Session *
                        </label>
                        <select
                          value={formData.batchSession}
                          onChange={(e) => setFormData({ ...formData, batchSession: e.target.value })}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        >
                          <option value="1992-1993">1992-1993 (1st Batch)</option>
                          <option value="1994-1995">1994-1995</option>
                          <option value="1996-1997">1996-1997</option>
                          <option value="1998-1999">1998-1999</option>
                          <option value="2000-2001">2000-2001</option>
                          <option value="2004-2005">2004-2005</option>
                          <option value="2008-2009">2008-2009</option>
                          <option value="2012-2013">2012-2013</option>
                          <option value="2016-2017">2016-2017</option>
                          <option value="2018-2019">2018-2019</option>
                          <option value="2020-2021">2020-2021</option>
                          <option value="2022-2023">2022-2023</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Degree Earned *
                        </label>
                        <select
                          value={formData.degree}
                          onChange={(e) => setFormData({ ...formData, degree: e.target.value as any })}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        >
                          <option value="BSS">BSS (Honours)</option>
                          <option value="MSS">MSS (Masters)</option>
                          <option value="M.Phil.">M.Phil.</option>
                          <option value="Ph.D.">Ph.D.</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Passing Year *
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.graduationYear}
                          onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Current Designation / Role *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.currentRole}
                          onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                          placeholder="e.g. Senior Social Safeguards Specialist"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Organization / Company *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="e.g. The World Bank / ActionAid"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Industry Sector *
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value as any })}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        >
                          {industries.filter((i) => i !== 'All').map((ind) => (
                            <option key={ind} value={ind}>
                              {ind}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Blood Group *
                        </label>
                        <select
                          value={formData.bloodGroup}
                          onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value as any })}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Alumni Chapter
                        </label>
                        <select
                          value={formData.chapter}
                          onChange={(e) => setFormData({ ...formData, chapter: e.target.value as any })}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        >
                          {chapters.filter((c) => c !== 'All').map((chap) => (
                            <option key={chap} value={chap}>
                              {chap}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Country of Residence *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="e.g. Bangladesh"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Sylhet or Dhaka"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Official / Personal Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@domain.com"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Phone Number (Blood/Mentorship)
                        </label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 1711-000000"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          LinkedIn Profile URL
                        </label>
                        <input
                          type="url"
                          value={formData.linkedIn}
                          onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="flex items-center space-x-2 text-xs font-semibold text-academic-dark cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isAvailableForBloodDonation}
                          onChange={(e) =>
                            setFormData({ ...formData, isAvailableForBloodDonation: e.target.checked })
                          }
                          className="rounded border-academic-border text-red-600 focus:ring-red-500 h-4 w-4"
                        />
                        <span className="text-red-800">
                          Enlist me in the Emergency Blood Donor Network (my phone will be visible to students in need)
                        </span>
                      </label>

                      <label className="flex items-center space-x-2 text-xs font-semibold text-academic-dark cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.openToMentorship}
                          onChange={(e) => setFormData({ ...formData, openToMentorship: e.target.checked })}
                          className="rounded border-academic-border text-academic-primary focus:ring-academic-primary h-4 w-4"
                        />
                        <span>Open to providing career mentorship / higher study guidance to junior scholars</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-academic-dark mb-1">
                        Short Professional Bio
                      </label>
                      <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Tell current students and peers about your journey since leaving SUST..."
                        className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                      />
                    </div>

                    <div className="pt-4 border-t border-academic-border">
                      <button
                        type="submit"
                        className="w-full py-3 bg-academic-primary hover:bg-academic-primary-dark text-white rounded font-serif font-bold text-sm tracking-wide transition-colors shadow-xs"
                      >
                        Submit Alumni Registration
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: GIVING & SCHOLARSHIP ENDOWMENT FUND */}
          {/* ========================================================================= */}
          {activeTab === 'giving' && (
            <div className="space-y-8">
              {/* Endowment Header Card */}
              <div className="academic-card p-6 md:p-8 bg-academic-surface border-l-4 border-academic-primary shadow-xs">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <span className="text-xs uppercase font-bold text-academic-primary tracking-wider">
                      Department of Sociology Welfare & Excellence Endowment
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-academic-dark mt-1">
                      Giving Back to the Next Generation
                    </h3>
                    <p className="text-xs sm:text-sm text-academic-text-muted mt-2 max-w-2xl leading-relaxed">
                      Established to ensure no deserving Sociology scholar leaves SUST due to financial hardship.
                      Funds directly support undergraduate tuition stipends, seminar library digitization, emergency medical
                      aid, and field research grants.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-academic-border shadow-xs text-center min-w-[200px]">
                    <span className="text-[11px] font-semibold text-academic-text-muted uppercase">
                      Current Campaign Raised
                    </span>
                    <div className="text-2xl font-serif font-bold text-academic-primary mt-1">
                      BDT {totalRaised.toLocaleString()}
                    </div>
                    <div className="w-full bg-academic-bg rounded-full h-2 mt-2 overflow-hidden border border-academic-border">
                      <div
                        className="bg-academic-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-academic-text-muted mt-1 font-semibold">
                      {progressPercent}% of BDT {targetFund.toLocaleString()} Goal
                    </p>
                  </div>
                </div>
              </div>

              {/* Channels & Payment Methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="academic-card p-6 bg-white border border-academic-border">
                  <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center mb-3">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-academic-dark">bKash Merchant / Personal</h4>
                  <p className="text-xs text-academic-text-muted mt-1">Direct instant mobile transfers across Bangladesh</p>
                  <div className="mt-4 p-3 bg-academic-bg rounded border border-academic-border/60">
                    <span className="text-[10px] uppercase font-bold text-academic-text-muted block">Account Number:</span>
                    <span className="text-sm font-mono font-bold text-academic-dark">+880 1711-234567</span>
                    <span className="text-[10px] text-pink-700 block mt-0.5">Reference: 'SUST-SOC-ALUM'</span>
                  </div>
                </div>

                <div className="academic-card p-6 bg-white border border-academic-border">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-3">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-academic-dark">Nagad & Rocket</h4>
                  <p className="text-xs text-academic-text-muted mt-1">Official Alumni Association mobile wallet</p>
                  <div className="mt-4 p-3 bg-academic-bg rounded border border-academic-border/60">
                    <span className="text-[10px] uppercase font-bold text-academic-text-muted block">Account Number:</span>
                    <span className="text-sm font-mono font-bold text-academic-dark">+880 1819-445566</span>
                    <span className="text-[10px] text-orange-700 block mt-0.5">Personal / Merchant Wallet</span>
                  </div>
                </div>

                <div className="academic-card p-6 bg-white border border-academic-border">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-academic-dark">International Bank Wire / SWIFT</h4>
                  <p className="text-xs text-academic-text-muted mt-1">For diaspora alumni in USA, UK, EU, Canada & Australia</p>
                  <div className="mt-4 p-3 bg-academic-bg rounded border border-academic-border/60 text-xs">
                    <p className="text-[11px] font-mono font-semibold text-academic-dark">Sonali Bank, SUST Branch</p>
                    <p className="text-[10px] text-academic-text-muted">SWIFT: BSONBDDH001</p>
                    <p className="text-[10px] font-mono text-academic-primary mt-0.5">A/C: 0123456789 (Dept Sociology SUST)</p>
                  </div>
                </div>
              </div>

              {/* Pledge Form & Donor Wall */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pledge Form */}
                <div className="academic-card p-6 bg-white border border-academic-border">
                  <h4 className="font-serif font-bold text-lg text-academic-dark mb-1">
                    Record a Donation Pledge
                  </h4>
                  <p className="text-xs text-academic-text-muted mb-5">
                    Record your contribution to update the official transparency ledger and inspire fellow alumni.
                  </p>

                  {pledgeSubmitted ? (
                    <div className="p-6 text-center bg-academic-surface rounded border border-academic-gold/40 animate-in fade-in">
                      <CheckCircle className="w-10 h-10 text-academic-primary mx-auto mb-2" />
                      <h5 className="font-serif font-bold text-base text-academic-dark">Pledge Received!</h5>
                      <p className="text-xs text-academic-text-muted mt-1">
                        Thank you for honoring the department and standing with future sociologists.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleDonationSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">
                          Donor Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="e.g. Syed Kamrul Hasan"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-academic-dark mb-1">
                            Batch / Session
                          </label>
                          <input
                            type="text"
                            value={donorBatch}
                            onChange={(e) => setDonorBatch(e.target.value)}
                            placeholder="e.g. 1994-1995"
                            className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-academic-dark mb-1">
                            Amount (BDT) *
                          </label>
                          <input
                            type="number"
                            required
                            value={donorAmount}
                            onChange={(e) => setDonorAmount(e.target.value)}
                            className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-academic-dark mb-1">
                            Cause / Fund *
                          </label>
                          <select
                            value={donorCause}
                            onChange={(e) => setDonorCause(e.target.value as any)}
                            className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                          >
                            <option value="Needy Student Scholarship">Needy Student Scholarship</option>
                            <option value="Emergency Medical Aid">Emergency Medical Aid</option>
                            <option value="Seminar Library Fund">Seminar Library Fund</option>
                            <option value="Silver Jubilee Reunion">Silver Jubilee Reunion</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-academic-dark mb-1">
                            Channel Used *
                          </label>
                          <select
                            value={donorMethod}
                            onChange={(e) => setDonorMethod(e.target.value as any)}
                            className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                          >
                            <option value="bKash">bKash</option>
                            <option value="Nagad">Nagad</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Bank Wire/SWIFT">Bank Wire/SWIFT</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-academic-dark mb-1">
                            Email (for Receipt) *
                          </label>
                          <input
                            type="email"
                            required
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="donor@domain.com"
                            className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-academic-dark mb-1">
                            Transaction Reference
                          </label>
                          <input
                            type="text"
                            value={donorTrx}
                            onChange={(e) => setDonorTrx(e.target.value)}
                            placeholder="e.g. BK-987654"
                            className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-academic-primary hover:bg-academic-primary-dark text-white rounded font-serif font-bold text-xs tracking-wide transition-colors shadow-xs"
                      >
                        Confirm Pledge & Record on Ledger
                      </button>
                    </form>
                  )}
                </div>

                {/* Donor Wall / Honor Roll */}
                <div className="academic-card p-6 bg-white border border-academic-border flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-serif font-bold text-lg text-academic-dark flex items-center gap-2">
                        <Award className="w-5 h-5 text-academic-primary" />
                        <span>Alumni Honor Roll</span>
                      </h4>
                      <span className="text-[11px] font-semibold text-academic-text-muted">
                        {pledges.length} Pledges Recorded
                      </span>
                    </div>

                    <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                      {pledges.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 rounded-lg bg-academic-bg border border-academic-border/60 flex items-start justify-between gap-3 text-xs"
                        >
                          <div>
                            <span className="font-serif font-bold text-academic-dark block">{p.donorName}</span>
                            <span className="text-[11px] text-academic-text-muted">
                              {p.donorBatch ? `Batch ${p.donorBatch} • ` : ''}
                              {p.cause}
                            </span>
                            {p.message && (
                              <p className="text-[11px] text-academic-dark/80 italic mt-1">"{p.message}"</p>
                            )}
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="font-mono font-bold text-academic-primary block">
                              BDT {p.amount.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-academic-text-muted uppercase">{p.paymentMethod}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-academic-border/60 text-[11px] text-academic-text-muted flex items-center justify-between">
                    <span>Administered under GSC & Alumni Welfare Committee</span>
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: VIRTUAL ALUMNI ID CARD */}
          {/* ========================================================================= */}
          {activeTab === 'idcard' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-5 border border-academic-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-base text-academic-dark">
                    SUST Sociology Lifetime Alumni Membership Card
                  </h4>
                  <p className="text-xs text-academic-text-muted mt-0.5">
                    Official digital credential for university campus access, library privileges, and alumni discounts.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={selectedIdAlumnus?.id || ''}
                    onChange={(e) => {
                      const found = alumniList.find((a) => a.id === e.target.value);
                      if (found) setSelectedIdAlumnus(found);
                    }}
                    className="px-3 py-1.5 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                  >
                    {alumniList.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.batchSession})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handlePrintCard}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-academic-primary text-white rounded text-xs font-semibold hover:bg-academic-primary-dark transition-colors shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Card</span>
                  </button>
                </div>
              </div>

              {/* High-Resolution Virtual Card */}
              {selectedIdAlumnus && (
                <div className="flex justify-center py-6">
                  <div
                    ref={idCardRef}
                    className="w-full max-w-lg bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-academic-gold/60 relative overflow-hidden"
                  >
                    {/* Background Seal Watermark */}
                    <div className="absolute right-[-30px] bottom-[-30px] opacity-10 pointer-events-none">
                      <GraduationCap className="w-64 h-64 text-academic-gold" />
                    </div>

                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-academic-gold/30 pb-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-academic-primary/80 border border-academic-gold flex items-center justify-center font-serif font-bold text-white text-base">
                          SUST
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-xs sm:text-sm tracking-wider uppercase text-academic-gold">
                            Shahjalal University of Science & Technology
                          </h4>
                          <p className="text-[10px] text-gray-300 font-sans tracking-wide">
                            Department of Sociology • Lifetime Alumni Member
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] font-mono tracking-widest text-academic-gold uppercase block">
                          Card ID
                        </span>
                        <span className="text-[10px] font-mono text-gray-300">
                          {selectedIdAlumnus.registrationNo || `SOC-${selectedIdAlumnus.graduationYear}-09`}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex items-center gap-5 sm:gap-6">
                      <img
                        src={selectedIdAlumnus.avatarUrl}
                        alt={selectedIdAlumnus.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-academic-gold shadow-md flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-white truncate">
                          {selectedIdAlumnus.name}
                        </h3>
                        <p className="text-xs text-academic-gold font-medium mt-0.5 truncate">
                          {selectedIdAlumnus.currentRole}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {selectedIdAlumnus.organization}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[10px] mt-3 pt-2 border-t border-white/10 font-mono">
                          <div>
                            <span className="text-gray-400 block">SESSION:</span>
                            <span className="text-white font-bold">{selectedIdAlumnus.batchSession}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block">BLOOD GROUP:</span>
                            <span className="text-red-400 font-bold">{selectedIdAlumnus.bloodGroup || 'O+'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-academic-gold/30 flex items-center justify-between text-[9px] text-gray-400 font-mono">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-academic-gold" />
                        <span>VERIFIED ALUMNUS • SUST SOCIOLOGY</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <QrCode className="w-6 h-6 text-white" />
                        <span className="text-[8px] leading-tight">SCAN TO<br />VERIFY</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MENTORSHIP BOOKING MODAL */}
          {/* ========================================================================= */}
          {selectedMentor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-academic-dark/60 backdrop-blur-sm animate-in fade-in duration-150">
              <div className="bg-white rounded-xl border border-academic-border shadow-2xl max-w-lg w-full p-6 relative">
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="absolute top-4 right-4 text-academic-text-muted hover:text-academic-dark"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={selectedMentor.avatarUrl}
                    alt={selectedMentor.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-academic-gold/40"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-academic-primary">Book 1-on-1 Mentorship</span>
                    <h3 className="font-serif font-bold text-base text-academic-dark">{selectedMentor.name}</h3>
                    <p className="text-xs text-academic-text-muted">
                      {selectedMentor.currentRole} • {selectedMentor.organization}
                    </p>
                  </div>
                </div>

                {bookingConfirmed ? (
                  <div className="p-6 text-center bg-academic-surface rounded-lg border border-academic-gold/40">
                    <CheckCircle className="w-10 h-10 text-academic-primary mx-auto mb-2" />
                    <h4 className="font-serif font-bold text-lg text-academic-dark">Mentorship Session Requested!</h4>
                    <p className="text-xs text-academic-dark/90 mt-1">
                      A meeting notification has been sent to {selectedMentor.name}. You will receive a {bookingMode} invite
                      at {studentEmail} once confirmed.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleMentorshipSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Borhan Rudro"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Your Batch *</label>
                        <input
                          type="text"
                          required
                          value={studentBatch}
                          onChange={(e) => setStudentBatch(e.target.value)}
                          placeholder="e.g. 2024-2025"
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-academic-dark mb-1">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="your.email@sust.edu"
                        className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Discussion Topic *</label>
                        <select
                          value={bookingTopic}
                          onChange={(e) => setBookingTopic(e.target.value)}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        >
                          <option value="Higher Studies Abroad & Scholarships">Higher Studies & Scholarships</option>
                          <option value="BCS & Bangladesh Civil Service Prep">BCS & Civil Service Prep</option>
                          <option value="Development Sector & UN Career">Development Sector & UN Career</option>
                          <option value="Sociology to Tech / UX Transition">Sociology to Tech / UX</option>
                          <option value="Undergraduate Fieldwork & Thesis Guidance">Undergraduate Thesis Guidance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-academic-dark mb-1">Preferred Mode *</label>
                        <select
                          value={bookingMode}
                          onChange={(e) => setBookingMode(e.target.value as any)}
                          className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                        >
                          <option value="Google Meet">Google Meet</option>
                          <option value="Zoom">Zoom</option>
                          <option value="Phone Call">Phone Call</option>
                          <option value="In-person (SUST)">In-person (SUST Campus)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-academic-dark mb-1">
                        Brief Note / Questions for Mentor
                      </label>
                      <textarea
                        rows={3}
                        value={bookingMessage}
                        onChange={(e) => setBookingMessage(e.target.value)}
                        placeholder="Specify what advice or questions you'd like to explore in this 30-minute session..."
                        className="w-full px-3 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark focus:outline-none focus:border-academic-primary"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMentor(null)}
                        className="px-4 py-2 border border-academic-border rounded text-xs font-semibold text-academic-dark hover:bg-academic-bg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-academic-primary hover:bg-academic-primary-dark text-white rounded text-xs font-semibold transition-colors shadow-xs flex items-center space-x-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Mentorship Request</span>
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
