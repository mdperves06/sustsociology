import React, { useState } from 'react';
import { Briefcase, Compass, Users, CheckCircle, Globe, Search } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { JobCard } from '../components/cards/JobCard';
import { SidebarNav } from '../components/layout/SidebarNav';
import { CAREER_ROLES } from '../data/careers';

export const JobsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Tech Giants', 'Global Multilateral', 'Media & Journalism', 'Industry & Finance'];

  const filteredJobs = CAREER_ROLES.filter((job) => {
    const matchesCategory =
      selectedCategory === 'All' || job.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      job.organization.toLowerCase().includes(q) ||
      job.roles.some((r) => r.toLowerCase().includes(q)) ||
      job.description.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          {/* Header matching PDF Page 6 */}
          <SectionHeader
            badge="Career Horizons & Global Impact"
            title="Jobs In Sociology"
            subtitle="Understand People. Solve Problems. Change the World."
          />

          {/* Inspirational Career Manifesto Card */}
          <div className="academic-card p-6 md:p-8 bg-academic-bg border-l-4 border-academic-primary mb-8 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-academic-dark mb-2">
              Why the World Needs Sociologists Now More Than Ever
            </h3>
            <p className="text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify mb-4">
              Sociology is not merely an academic discipline; it is an analytical superpower in the age of algorithmic systems, climate disruption, and geopolitical reconfigurations. From Silicon Valley user experience laboratories to United Nations humanitarian missions and the World Bank's social safeguards, SUST sociology graduates bring indispensable critical tools to understand collective behavior, institutional equity, and human-centered design.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-academic-border/60 text-xs">
              <div className="flex items-center space-x-2 text-academic-dark font-medium">
                <CheckCircle className="w-4 h-4 text-academic-primary flex-shrink-0" />
                <span>Empirical Qualitative Fieldwork</span>
              </div>
              <div className="flex items-center space-x-2 text-academic-dark font-medium">
                <CheckCircle className="w-4 h-4 text-academic-primary flex-shrink-0" />
                <span>Computational & SPSS Data Analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-academic-dark font-medium">
                <CheckCircle className="w-4 h-4 text-academic-primary flex-shrink-0" />
                <span>Policy Evaluation & Impact Metrics</span>
              </div>
            </div>
          </div>

          {/* Sector Filter & Search */}
          <div className="bg-academic-surface rounded-lg p-5 border border-academic-border mb-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-academic-primary text-white shadow-xs'
                      : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search company or role (e.g. UX)..."
                className="w-full pl-9 pr-4 py-2 bg-white rounded-md border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary shadow-xs"
              />
            </div>
          </div>

          {/* Jobs Grid matching PDF Page 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, idx) => (
              <JobCard key={idx} job={job} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
