import React, { useState, useEffect } from 'react';
import { Search, FileText, Filter, BookOpen } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ResearchCard } from '../components/cards/ResearchCard';
import { CitationModal } from '../components/common/CitationModal';
import { SidebarNav } from '../components/layout/SidebarNav';
import { dataService } from '../services/dataService';
import { ResearchPaper } from '../types';

export const ResearchPortalPage: React.FC = () => {
  const [researchList, setResearchList] = useState<ResearchPaper[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [citationPaper, setCitationPaper] = useState<ResearchPaper | null>(null);

  useEffect(() => {
    setResearchList(dataService.getResearch());
  }, []);

  // Collect all unique tags
  const allTags = ['All', 'environmental', 'socioeconomic impacts', 'river geomorphology', 'gravel mining', 'gender studies', 'urban sociology', 'digital sociology'];

  const filteredPapers = researchList.filter((paper) => {
    const matchesTag =
      selectedTag === 'All' ||
      paper.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      paper.title.toLowerCase().includes(q) ||
      paper.authors.some((a) => a.toLowerCase().includes(q)) ||
      paper.abstract.toLowerCase().includes(q) ||
      paper.tags.some((t) => t.toLowerCase().includes(q));

    return matchesTag && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Scholarly Publications"
            title="Research"
            subtitle="Explore the research activities, publications, and projects driving the Department of Sociology forward."
          />

          {/* Research Metrics & Search Header matching PDF Page 4 */}
          <div className="bg-academic-surface rounded-lg p-6 border border-academic-border mb-8 shadow-xs">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-academic-primary text-white flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-academic-text-muted uppercase font-semibold">
                    Academic Output
                  </span>
                  <div className="text-3xl font-serif font-bold text-academic-primary">
                    Total Research: {researchList.length}
                  </div>
                  <p className="text-[11px] text-academic-text-muted">
                    Peer-reviewed journals, policy monographs & conference proceedings
                  </p>
                </div>
              </div>

              {/* Search input matching PDF Page 4 */}
              <div className="relative w-full md:w-80">
                <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                  Search Name / Keyword:
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, topic..."
                    className="w-full pl-9 pr-4 py-2 bg-white rounded-md border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="mt-6 pt-4 border-t border-academic-border/60">
              <span className="text-[11px] font-bold text-academic-text-muted uppercase tracking-wider block mb-2">
                Filter by Research Domain:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-academic-primary text-white border-academic-primary'
                        : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Research Articles List */}
          {filteredPapers.length === 0 ? (
            <div className="academic-card p-12 text-center text-academic-text-muted">
              <BookOpen className="w-10 h-10 text-academic-primary/40 mx-auto mb-2" />
              <p className="text-sm font-semibold text-academic-dark">No publications matched your criteria</p>
              <p className="text-xs mt-1">Try resetting the tag filter or search terms.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPapers.map((paper) => (
                <ResearchCard
                  key={paper.id}
                  paper={paper}
                  onCite={(p) => setCitationPaper(p)}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls matching PDF Page 4: < 1 2 3 > */}
          <div className="mt-10 flex justify-center items-center space-x-2 text-xs font-semibold">
            <button className="px-3 py-1.5 rounded border border-academic-border bg-white text-academic-text-muted hover:text-academic-dark disabled:opacity-50">
              &lt;
            </button>
            <button className="px-3.5 py-1.5 rounded border border-academic-primary bg-academic-primary text-white">
              1
            </button>
            <button className="px-3.5 py-1.5 rounded border border-academic-border bg-white text-academic-dark hover:bg-academic-bg">
              2
            </button>
            <button className="px-3.5 py-1.5 rounded border border-academic-border bg-white text-academic-dark hover:bg-academic-bg">
              3
            </button>
            <button className="px-3 py-1.5 rounded border border-academic-border bg-white text-academic-dark hover:bg-academic-bg">
              &gt;
            </button>
          </div>
        </main>
      </div>

      {/* Citation Modal */}
      <CitationModal
        paper={citationPaper}
        isOpen={!!citationPaper}
        onClose={() => setCitationPaper(null)}
      />
    </div>
  );
};
