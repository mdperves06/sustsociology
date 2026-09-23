import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Award,
  ArrowRight,
  Library,
  Monitor,
  Compass,
  FileText,
  Briefcase,
  Layers,
  Sparkles,
  ChevronRight,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';
import { FacultyCard } from '../components/cards/FacultyCard';
import { ResearchCard } from '../components/cards/ResearchCard';
import { CitationModal } from '../components/common/CitationModal';
import { DEPARTMENT_INFO } from '../data/department';
import { dataService } from '../services/dataService';
import { DepartmentStats, FacultyMember, ResearchPaper } from '../types';

export const HomePage: React.FC = () => {
  const [stats, setStats] = useState<DepartmentStats>(dataService.getStats());
  const [featuredFaculty, setFeaturedFaculty] = useState<FacultyMember[]>([]);
  const [featuredResearch, setFeaturedResearch] = useState<ResearchPaper[]>([]);
  const [citationPaper, setCitationPaper] = useState<ResearchPaper | null>(null);

  useEffect(() => {
    setStats(dataService.getStats());
    setFeaturedFaculty(dataService.getFaculty().slice(0, 3));
    setFeaturedResearch(dataService.getResearch().slice(0, 2));
  }, []);

  const quickNavPills = [
    { label: "Batch", path: "/batch" },
    { label: "Research", path: "/research" },
    { label: "Student Success Story", path: "/student-success-story" },
    { label: "Jobs In Sociology", path: "/jobs" },
    { label: "Faculty", path: "/faculty" },
    { label: "Alumni Association", path: "/alumni" },
    { label: "Sociology Society", path: "/sociology-society" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4EEDA]/40 via-academic-bg to-academic-bg py-16 sm:py-24 border-b border-academic-border">
        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-academic-accent/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-widest text-academic-primary bg-academic-accent-soft rounded-full border border-academic-border shadow-xs">
              Shahjalal University of Science & Technology
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-academic-dark tracking-tight leading-[1.15]">
              Department of Sociology
            </h1>

            <p className="mt-4 text-2xl sm:text-3xl font-serif italic text-academic-primary font-medium">
              "Understanding Society. Inspiring Change."
            </p>

            <p className="mt-5 text-base sm:text-lg text-academic-text-muted leading-relaxed font-sans">
              The Department of Sociology at SUST is dedicated to teaching, research, and community engagement to understand social realities and build a better society.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/about"
                className="px-6 py-3 bg-academic-primary hover:bg-academic-primary-hover text-white text-sm font-semibold rounded-md shadow-academic transition-all flex items-center space-x-2"
              >
                <span>Department History & Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/research"
                className="px-6 py-3 bg-white hover:bg-academic-accent-soft text-academic-dark text-sm font-semibold rounded-md border border-academic-border shadow-xs transition-all flex items-center space-x-2"
              >
                <span>Explore Research Portal</span>
              </Link>
            </div>
          </div>

          {/* Stats Bar matching PDF Page 1 */}
          <div className="mt-14 pt-8 border-t border-academic-border">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard
                label="Faculty Members"
                value={stats.facultyCount}
                subtext="Scholars & Researchers"
                icon={Users}
              />
              <StatCard
                label="Students"
                value={stats.studentCount}
                suffix="+"
                subtext="Undergrad & Postgrad"
                icon={GraduationCap}
              />
              <StatCard
                label="Publications"
                value={stats.publicationsCount}
                suffix="+"
                subtext="Peer-Reviewed Articles"
                icon={BookOpen}
              />
              <StatCard
                label="Research"
                value={stats.researchProjectsCount}
                suffix="+"
                subtext="Fieldwork Projects"
                icon={FlaskConical}
              />
              <StatCard
                label="Years of Excellence"
                value={stats.yearsOfExcellence}
                subtext="Founded 1992–93"
                icon={Award}
                variant="cream"
              />
            </div>
          </div>

          {/* Quick Jump Directory Pills matching PDF Page 1 */}
          <div className="mt-10 pt-6 flex flex-wrap justify-center sm:justify-start gap-2">
            {quickNavPills.map((pill) => (
              <Link
                key={pill.label}
                to={pill.path}
                className="px-4 py-2 bg-academic-surface hover:bg-academic-primary text-academic-dark hover:text-white rounded-md text-xs font-semibold tracking-wide border border-academic-border shadow-xs transition-all"
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome to Department & Academic History Section */}
      <section className="py-16 sm:py-20 bg-academic-bg-pure">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-widest text-academic-primary">
                Institutional Genesis & Trajectory
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-academic-dark mt-2 mb-4">
                Welcome to the Department of Sociology
              </h2>
              <div className="bronze-rule w-24 mb-6" />

              <div className="space-y-4 text-academic-dark/90 text-sm sm:text-base leading-relaxed text-justify">
                {DEPARTMENT_INFO.historyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-8 p-5 bg-academic-surface rounded-lg border border-academic-border flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-academic-primary text-white flex items-center justify-center flex-shrink-0 font-serif font-bold text-lg">
                  GSC
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-academic-dark">
                    Degrees Under Graduate Studies Committee (GSC)
                  </h4>
                  <p className="text-xs sm:text-sm text-academic-text-muted mt-1">
                    Bachelor of Social Science (BSS Hons.), Master of Social Science (MSS General & Thesis), Master of Philosophy (M.Phil.), and Doctor of Philosophy (Ph.D.).
                  </p>
                </div>
              </div>
            </div>

            {/* Side Card: Mission & Vision */}
            <div className="lg:col-span-4 space-y-6">
              {/* Mission Card */}
              <div className="academic-card p-6 bg-white border-l-4 border-l-academic-primary">
                <div className="w-10 h-10 rounded-full bg-academic-accent-soft flex items-center justify-center text-academic-primary mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-xl text-academic-dark mb-2">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-academic-text-muted leading-relaxed">
                  {DEPARTMENT_INFO.mission}
                </p>
              </div>

              {/* Vision Card */}
              <div className="academic-card p-6 bg-white border-l-4 border-l-academic-primary-light">
                <div className="w-10 h-10 rounded-full bg-academic-accent-soft flex items-center justify-center text-academic-primary mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-xl text-academic-dark mb-2">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-academic-text-muted leading-relaxed">
                  {DEPARTMENT_INFO.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Academic Curricula Pillars */}
      <section className="py-16 bg-academic-bg border-y border-academic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Theoretical & Methodological Rigor"
            title="Curriculum Pillars & Scholarly Domains"
            subtitle="Bridging classical theory with empirical field investigations in Northeast Bangladesh and global sociopolitical structures."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENT_INFO.academicPillars.map((pillar, idx) => (
              <div key={idx} className="academic-card p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold font-mono text-academic-primary">
                    DOMAIN 0{idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-academic-dark mt-1 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-academic-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-academic-border/60 flex items-center text-xs text-academic-primary font-semibold">
                  <span>Undergraduate & Graduate Syllabus</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <SectionHeader
              badge="Scholarly Contributions"
              title="Recent Research & Faculty Publications"
              subtitle="Addressing critical societal transformations, river geomorphology, climate precarity, and inequality."
              className="mb-0"
            />
            <Link
              to="/research"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-bold text-academic-primary hover:underline uppercase tracking-wider"
            >
              <span>View All Publications ({stats.publicationsCount}+)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredResearch.map((paper) => (
              <ResearchCard
                key={paper.id}
                paper={paper}
                onCite={(p) => setCitationPaper(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Directory Snapshot */}
      <section className="py-16 bg-academic-bg border-t border-academic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <SectionHeader
              badge="Academic Leadership"
              title="Distinguished Faculty Members"
              subtitle="Mentors trained at leading international and national universities guiding undergraduate and doctoral research."
              className="mb-0"
            />
            <Link
              to="/faculty"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs font-bold text-academic-primary hover:underline uppercase tracking-wider"
            >
              <span>Explore Faculty Directory ({stats.facultyCount})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFaculty.map((member) => (
              <FacultyCard key={member.id} faculty={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Department Facilities Strip */}
      <section className="py-16 bg-white border-t border-academic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Infrastructure & Learning"
            title="Department Facilities & Research Infrastructure"
            subtitle="Supporting rigorous qualitative ethnography, large-scale survey analytics, and academic dissertation preparation."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEPARTMENT_INFO.facilities.map((fac, idx) => (
              <div key={idx} className="academic-card p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-academic-accent-soft flex items-center justify-center text-academic-primary mb-3">
                  {idx === 0 && <Library className="w-6 h-6" />}
                  {idx === 1 && <Monitor className="w-6 h-6" />}
                  {idx === 2 && <Compass className="w-6 h-6" />}
                  {idx === 3 && <GraduationCap className="w-6 h-6" />}
                </div>
                <h4 className="font-serif font-bold text-base text-academic-dark mb-2">
                  {fac.title}
                </h4>
                <p className="text-xs text-academic-text-muted leading-relaxed">
                  {fac.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action: Careers & Community */}
      <section className="py-16 bg-gradient-to-r from-academic-dark to-[#2E2823] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-academic-accent">
            Career Horizons & Sociological Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2 mb-4 text-white">
            "Understand People. Solve Problems. Change the World."
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            Our graduates excel globally across the United Nations, World Bank, Google, CNN, national civil service, and leading doctoral programs worldwide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/jobs"
              className="px-6 py-3 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold uppercase tracking-wider rounded shadow-md transition-colors"
            >
              Explore Global Careers in Sociology
            </Link>
            <Link
              to="/student-success-story"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded border border-white/20 transition-colors"
            >
              Read Student Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Citation Modal */}
      <CitationModal
        paper={citationPaper}
        isOpen={!!citationPaper}
        onClose={() => setCitationPaper(null)}
      />
    </div>
  );
};
