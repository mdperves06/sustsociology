import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Users, FileText, Award, Layers, ChevronRight } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { FacultyMember, ResearchPaper, SuccessStory, StudentProfile } from '../../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [research, setResearch] = useState<ResearchPaper[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [students, setStudents] = useState<StudentProfile[]>([]);

  useEffect(() => {
    if (isOpen) {
      setFaculty(dataService.getFaculty());
      setResearch(dataService.getResearch());
      setStories(dataService.getStories());

      const allStudents: StudentProfile[] = [];
      dataService.getBatches().forEach((b) => allStudents.push(...b.students));
      setStudents(allStudents);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredFaculty = q
    ? faculty.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.designation.toLowerCase().includes(q) ||
          f.specialization.some((s) => s.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const filteredResearch = q
    ? research.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.authors.some((a) => a.toLowerCase().includes(q)) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const filteredStories = q
    ? stories.filter(
        (s) =>
          s.studentName.toLowerCase().includes(q) ||
          s.headline.toLowerCase().includes(q) ||
          s.organization.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const filteredStudents = q
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.registrationNo.includes(q) ||
          s.batchSession.includes(q)
      ).slice(0, 3)
    : [];

  const totalResults =
    filteredFaculty.length +
    filteredResearch.length +
    filteredStories.length +
    filteredStudents.length;

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-academic-dark/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-xl border border-academic-border shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-academic-border bg-academic-bg">
          <Search className="w-5 h-5 text-academic-primary mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search faculty, research papers, students, stories (e.g., Lubha, Noman, Professor)..."
            className="w-full bg-transparent text-sm text-academic-dark placeholder:text-academic-text-muted focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-academic-text-muted hover:text-academic-dark mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-academic-text-muted hover:text-academic-dark hover:bg-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="text-center py-8 text-academic-text-muted text-xs">
              <p className="font-medium text-academic-dark mb-1">Quick Academic Directory Search</p>
              <p>Type keywords to discover scholarly research, faculty profiles, and student records.</p>
              <div className="flex justify-center gap-2 mt-4 text-[11px]">
                <span className="bg-academic-bg px-2 py-1 rounded border border-academic-border">Lubha River</span>
                <span className="bg-academic-bg px-2 py-1 rounded border border-academic-border">Borhan Rudro</span>
                <span className="bg-academic-bg px-2 py-1 rounded border border-academic-border">UN Fellowship</span>
                <span className="bg-academic-bg px-2 py-1 rounded border border-academic-border">Environmental</span>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-academic-text-muted text-xs">
              No matching records found for <span className="font-semibold text-academic-dark">"{query}"</span>.
            </div>
          ) : (
            <>
              {/* Faculty Group */}
              {filteredFaculty.length > 0 && (
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-academic-primary uppercase tracking-wider mb-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>Faculty Members ({filteredFaculty.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredFaculty.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => handleSelect(`/faculty/${f.id}`)}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-academic-accent-soft/60 cursor-pointer transition-colors border border-transparent hover:border-academic-border"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={f.avatarUrl}
                            alt={f.name}
                            className="w-8 h-8 rounded-full object-cover border border-academic-border"
                          />
                          <div>
                            <p className="text-xs font-bold text-academic-dark">{f.name}</p>
                            <p className="text-[11px] text-academic-primary font-medium">{f.designation}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-academic-text-muted" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Group */}
              {filteredResearch.length > 0 && (
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-academic-primary uppercase tracking-wider mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Research Publications ({filteredResearch.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredResearch.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => handleSelect(`/research/${r.id}`)}
                        className="p-2 rounded-md hover:bg-academic-accent-soft/60 cursor-pointer transition-colors border border-transparent hover:border-academic-border"
                      >
                        <p className="text-xs font-bold text-academic-dark line-clamp-1">{r.title}</p>
                        <p className="text-[11px] text-academic-text-muted">{r.journal} • {r.publishedDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Stories Group */}
              {filteredStories.length > 0 && (
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-academic-primary uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Success Stories ({filteredStories.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredStories.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect(`/student-success-story/${s.id}`)}
                        className="p-2 rounded-md hover:bg-academic-accent-soft/60 cursor-pointer transition-colors border border-transparent hover:border-academic-border flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-academic-dark">{s.studentName} — {s.organization}</p>
                          <p className="text-[11px] text-academic-text-muted line-clamp-1">{s.headline}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-academic-text-muted flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Students Group */}
              {filteredStudents.length > 0 && (
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-academic-primary uppercase tracking-wider mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Students & Batches ({filteredStudents.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredStudents.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => handleSelect(`/batch/${st.batchSession}/student/${st.id}`)}
                        className="p-2 rounded-md hover:bg-academic-accent-soft/60 cursor-pointer transition-colors border border-transparent hover:border-academic-border flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-academic-dark">{st.name}</p>
                          <p className="text-[11px] text-academic-text-muted">Reg: {st.registrationNo} • Session {st.batchSession}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-academic-text-muted flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 bg-academic-bg border-t border-academic-border flex justify-between items-center text-[11px] text-academic-text-muted">
          <span>Navigate with mouse or click</span>
          <span className="font-mono">Esc to close</span>
        </div>
      </div>
    </div>
  );
};
