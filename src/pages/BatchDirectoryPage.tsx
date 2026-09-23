import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, Users, Search, ChevronDown, UserCheck } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { StudentCard } from '../components/cards/StudentCard';
import { SidebarNav } from '../components/layout/SidebarNav';
import { dataService } from '../services/dataService';
import { BatchSummary, StudentProfile } from '../types';

export const BatchDirectoryPage: React.FC = () => {
  const { batchId } = useParams<{ batchId?: string }>();
  const [batches, setBatches] = useState<BatchSummary[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>(batchId || '2024-2025');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const list = dataService.getBatches();
    setBatches(list);
    if (batchId && list.some(b => b.session === batchId)) {
      setSelectedSession(batchId);
    } else if (list.length > 0 && !batchId) {
      setSelectedSession(list[0].session);
    }
  }, [batchId]);

  const currentBatch = batches.find((b) => b.session === selectedSession) || batches[0];

  const filteredStudents = currentBatch?.students.filter((st) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      st.name.toLowerCase().includes(q) ||
      st.registrationNo.includes(q) ||
      st.email.toLowerCase().includes(q) ||
      st.phone.includes(q)
    );
  }) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          {/* Header & Session Selector Dropdown matching PDF Page 3 */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
            <SectionHeader
              badge="Cohort Records"
              title="Batch Directory"
              subtitle="Browse students of a specific academic batch."
              className="mb-0"
            />

            <div className="w-full sm:w-64">
              <label className="block text-[11px] font-bold text-academic-primary uppercase tracking-wider mb-1">
                Select Academic Batch Session:
              </label>
              <div className="relative">
                <select
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  className="w-full appearance-none bg-white border border-academic-border rounded-md px-3.5 py-2 pr-8 text-xs font-semibold text-academic-dark focus:outline-none focus:border-academic-primary shadow-xs cursor-pointer"
                >
                  {batches.map((b) => (
                    <option key={b.session} value={b.session}>
                      Session {b.session}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-academic-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Current Batch Information Box matching PDF Page 3 */}
          {currentBatch && (
            <div className="bg-academic-surface rounded-lg p-6 border border-academic-border mb-8 shadow-xs">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-academic-accent-soft border border-academic-border flex items-center justify-center text-academic-primary flex-shrink-0">
                    <Layers className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-academic-primary uppercase tracking-widest">
                      Undergraduate Session
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-academic-dark">
                      Batch: {currentBatch.session}
                    </h3>
                    <p className="text-xs text-academic-text-muted mt-0.5">
                      Department of Sociology • Shahjalal University of Science & Technology
                    </p>
                  </div>
                </div>

                {/* Counters: Total Students | Female | Male */}
                <div className="flex items-center space-x-6 bg-white px-5 py-3 rounded-md border border-academic-border w-full md:w-auto justify-around">
                  <div className="text-center">
                    <span className="text-[11px] text-academic-text-muted uppercase font-bold block">
                      Total Students
                    </span>
                    <span className="text-2xl font-serif font-bold text-academic-primary">
                      {currentBatch.totalStudents}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-academic-border"></div>
                  <div className="text-center">
                    <span className="text-[11px] text-academic-text-muted uppercase font-bold block">
                      Female
                    </span>
                    <span className="text-2xl font-serif font-bold text-academic-dark">
                      {currentBatch.femaleStudents}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-academic-border"></div>
                  <div className="text-center">
                    <span className="text-[11px] text-academic-text-muted uppercase font-bold block">
                      Male
                    </span>
                    <span className="text-2xl font-serif font-bold text-academic-dark">
                      {currentBatch.maleStudents}
                    </span>
                  </div>
                </div>
              </div>

              {/* Batch Representative & Photo Banner */}
              {currentBatch.photoUrl && (
                <div className="mt-6 rounded-lg overflow-hidden border border-academic-border max-h-64 relative group">
                  <img
                    src={currentBatch.photoUrl}
                    alt={`Batch ${currentBatch.session}`}
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-academic-dark/80 via-transparent to-transparent flex items-end p-4 text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-academic-accent">
                        Official Cohort Photograph
                      </p>
                      <p className="text-sm font-serif font-bold">
                        Department of Sociology — Session {currentBatch.session}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Search bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students by name or reg no..."
                className="w-full pl-9 pr-4 py-2 bg-white rounded-md border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary shadow-xs"
              />
            </div>
            <span className="text-xs text-academic-text-muted hidden sm:inline">
              Showing {filteredStudents.length} of {currentBatch?.totalStudents || 0} students
            </span>
          </div>

          {/* Students Grid */}
          {filteredStudents.length === 0 ? (
            <div className="academic-card p-12 text-center text-academic-text-muted">
              <Users className="w-10 h-10 text-academic-primary/40 mx-auto mb-2" />
              <p className="text-sm font-semibold text-academic-dark">No students found for this session</p>
              <p className="text-xs mt-1">Select another session or add records via the Admin CMS.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
