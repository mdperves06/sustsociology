import React, { useState, useEffect } from 'react';
import { Users, Search, Filter } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { FacultyCard } from '../components/cards/FacultyCard';
import { SidebarNav } from '../components/layout/SidebarNav';
import { dataService } from '../services/dataService';
import { FacultyMember, Designation } from '../types';

export const FacultyDirectoryPage: React.FC = () => {
  const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setFacultyList(dataService.getFaculty());
  }, []);

  const counts = {
    All: facultyList.length,
    Professors: facultyList.filter((f) => f.designation === 'Professor').length,
    'Associate Professors': facultyList.filter((f) => f.designation === 'Associate Professor').length,
    'Assistant Professors': facultyList.filter((f) => f.designation === 'Assistant Professor').length,
    Lecturers: facultyList.filter((f) => f.designation === 'Lecturer').length,
  };

  const filteredFaculty = facultyList.filter((f) => {
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Professors' && f.designation === 'Professor') ||
      (activeTab === 'Associate Professors' && f.designation === 'Associate Professor') ||
      (activeTab === 'Assistant Professors' && f.designation === 'Assistant Professor') ||
      (activeTab === 'Lecturers' && f.designation === 'Lecturer');

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      f.name.toLowerCase().includes(q) ||
      f.qualification.toLowerCase().includes(q) ||
      f.specialization.some((s) => s.toLowerCase().includes(q));

    return matchesTab && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Scholarly Leadership"
            title="Faculty Directory"
            subtitle="Browse faculty members of the Department of Sociology."
          />

          {/* Designation Summary Counter Banner matching PDF Page 7 */}
          <div className="bg-academic-surface rounded-lg p-5 border border-academic-border mb-8 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-academic-border">
              <div className="text-center sm:text-left sm:pr-4">
                <span className="text-xs text-academic-text-muted uppercase font-semibold">
                  Total Faculty
                </span>
                <div className="text-3xl font-serif font-bold text-academic-primary mt-0.5">
                  {counts.All}
                </div>
                <span className="text-[11px] text-academic-text-muted">Members</span>
              </div>

              <div className="text-center pt-2 sm:pt-0 sm:px-4">
                <span className="text-xs text-academic-text-muted uppercase font-semibold">
                  Professors
                </span>
                <div className="text-2xl font-serif font-bold text-academic-dark mt-0.5">
                  {counts.Professors}
                </div>
              </div>

              <div className="text-center pt-2 sm:pt-0 sm:px-4">
                <span className="text-xs text-academic-text-muted uppercase font-semibold">
                  Associate Prof.
                </span>
                <div className="text-2xl font-serif font-bold text-academic-dark mt-0.5">
                  {counts['Associate Professors']}
                </div>
              </div>

              <div className="text-center pt-2 sm:pt-0 sm:px-4">
                <span className="text-xs text-academic-text-muted uppercase font-semibold">
                  Assistant Prof.
                </span>
                <div className="text-2xl font-serif font-bold text-academic-dark mt-0.5">
                  {counts['Assistant Professors']}
                </div>
              </div>

              <div className="text-center pt-2 sm:pt-0 sm:pl-4">
                <span className="text-xs text-academic-text-muted uppercase font-semibold">
                  Lecturers
                </span>
                <div className="text-2xl font-serif font-bold text-academic-dark mt-0.5">
                  {counts.Lecturers}
                </div>
              </div>
            </div>
          </div>

          {/* Search & Designation Filter Tabs */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {(['All', 'Professors', 'Associate Professors', 'Assistant Professors', 'Lecturers'] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-academic-primary text-white shadow-xs'
                        : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search faculty by name or field..."
                className="w-full pl-9 pr-4 py-2 bg-white rounded-md border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary shadow-xs"
              />
            </div>
          </div>

          {/* Results Grid */}
          {filteredFaculty.length === 0 ? (
            <div className="academic-card p-12 text-center text-academic-text-muted">
              <p className="text-sm font-semibold text-academic-dark">No faculty members found</p>
              <p className="text-xs mt-1">Try adjusting your search query or designation filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.map((member) => (
                <FacultyCard key={member.id} faculty={member} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
