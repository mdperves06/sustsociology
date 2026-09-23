import React, { useState, useEffect } from 'react';
import {
  Library,
  BookOpen,
  Search,
  Filter,
  GraduationCap,
  Calendar,
  User,
  Tag,
  Bookmark,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SidebarNav } from '../components/layout/SidebarNav';
import { dataService } from '../services/dataService';
import { LibraryThesisItem } from '../types';

export const LibraryPage: React.FC = () => {
  const [theses, setTheses] = useState<LibraryThesisItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  useEffect(() => {
    setTheses(dataService.getLibraryTheses());
  }, []);

  const types = ['All', 'BSS Monograph', 'MSS Thesis', 'M.Phil Dissertation', 'Ph.D. Dissertation'];

  const filteredTheses = theses.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.supervisor.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q)) ||
      item.callNumber.toLowerCase().includes(q);

    return matchesType && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Scholarly Repository & Seminar Library"
            title="Sociology Seminar Library & Thesis Archive"
            subtitle="Search over three decades of undergraduate monographs, graduate dissertations, and doctoral treatises archived in Academic Building D."
          />

          {/* Library Overview Strip */}
          <div className="bg-academic-surface rounded-lg p-6 border border-academic-border mb-8 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-academic-border">
              <div className="p-2 sm:pr-4">
                <span className="text-xs uppercase font-bold text-academic-text-muted">
                  Physical Collection
                </span>
                <div className="text-3xl font-serif font-bold text-academic-primary mt-0.5">
                  4,500+
                </div>
                <p className="text-[11px] text-academic-text-muted mt-0.5">
                  Monographs, books & international journals
                </p>
              </div>

              <div className="p-2 pt-3 sm:pt-2 sm:px-4">
                <span className="text-xs uppercase font-bold text-academic-text-muted">
                  Dissertations Cataloged
                </span>
                <div className="text-3xl font-serif font-bold text-academic-dark mt-0.5">
                  1,200+
                </div>
                <p className="text-[11px] text-academic-text-muted mt-0.5">
                  BSS, MSS, M.Phil. & Ph.D. dissertations
                </p>
              </div>

              <div className="p-2 pt-3 sm:pt-2 sm:pl-4">
                <span className="text-xs uppercase font-bold text-academic-text-muted">
                  Reading Room Hours
                </span>
                <div className="text-sm font-bold text-academic-dark mt-1">
                  Sun – Thu: 9:00 AM – 5:00 PM
                </div>
                <p className="text-[11px] text-academic-primary mt-0.5 font-semibold">
                  Open to all SUST students & researchers
                </p>
              </div>
            </div>
          </div>

          {/* Search & Type Filter */}
          <div className="bg-white rounded-lg p-5 border border-academic-border mb-8 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive by dissertation title, author, supervisor, or topic..."
                className="w-full pl-9 pr-4 py-2 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-academic-border/60">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedType === t
                      ? 'bg-academic-primary text-white border-academic-primary'
                      : 'bg-academic-bg hover:bg-white text-academic-dark border border-academic-border'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Theses Catalog List */}
          <div className="space-y-4 mb-10">
            {filteredTheses.length === 0 ? (
              <div className="academic-card p-12 text-center text-academic-text-muted">
                <BookOpen className="w-10 h-10 text-academic-primary/40 mx-auto mb-2" />
                <p className="text-sm font-semibold text-academic-dark">No dissertations found</p>
                <p className="text-xs mt-1">Try broadening your search term or selecting 'All'.</p>
              </div>
            ) : (
              filteredTheses.map((item) => (
                <div key={item.id} className="academic-card p-5 bg-white border border-academic-border hover:border-academic-primary transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-academic-accent-soft text-academic-primary border border-academic-border">
                        {item.type}
                      </span>
                      <span className="text-xs font-mono font-semibold text-academic-dark">
                        Call #: {item.callNumber}
                      </span>
                    </div>
                    <span className="text-xs text-academic-text-muted font-mono">
                      Year: {item.year}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-academic-dark leading-snug">
                    {item.title}
                  </h3>

                  <div className="mt-2 text-xs text-academic-dark space-y-0.5">
                    <p><span className="text-academic-text-muted">Author / Scholar:</span> <strong>{item.author}</strong></p>
                    <p><span className="text-academic-text-muted">Supervisor:</span> {item.supervisor}</p>
                  </div>

                  {item.abstract && (
                    <p className="mt-2.5 text-xs text-academic-text-muted leading-relaxed line-clamp-2">
                      {item.abstract}
                    </p>
                  )}

                  <div className="mt-3 pt-3 border-t border-academic-border/60 flex flex-wrap justify-between items-center gap-2">
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((kw, i) => (
                        <span key={i} className="text-[10px] bg-academic-bg px-2 py-0.5 rounded text-academic-text-muted border border-academic-border/60">
                          {kw}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] text-academic-primary font-semibold flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5" />
                      Available in Seminar Reading Room
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
