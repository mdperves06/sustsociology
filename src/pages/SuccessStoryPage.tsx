import React, { useState, useEffect } from 'react';
import { Award, Search, ChevronDown, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SuccessStoryCard } from '../components/cards/SuccessStoryCard';
import { SidebarNav } from '../components/layout/SidebarNav';
import { dataService } from '../services/dataService';
import { SuccessStory } from '../types';

export const SuccessStoryPage: React.FC = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setStories(dataService.getStories());
  }, []);

  const categories = ['All', 'Scientist', 'Corporate', 'Leadership', 'Scholarship', 'Community Impact'];

  const filteredStories = stories.filter((story) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      story.category.toLowerCase() === selectedCategory.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      story.studentName.toLowerCase().includes(q) ||
      story.headline.toLowerCase().includes(q) ||
      story.organization.toLowerCase().includes(q) ||
      story.shortSummary.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Alumni & Student Laurels"
            title="Student Success Story"
            subtitle="Celebrating the achievements and journeys of our students."
          />

          {/* Controls Bar matching PDF Page 5: Search & Batch / Category */}
          <div className="bg-academic-surface rounded-lg p-6 border border-academic-border mb-8 shadow-xs">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Category Pills */}
              <div className="flex-1">
                <span className="text-[11px] font-bold text-academic-text-muted uppercase tracking-wider block mb-2">
                  Achievement Domain:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedCategory === cat
                          ? 'bg-academic-primary text-white border-academic-primary'
                          : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search input matching PDF Page 5 */}
              <div className="relative w-full md:w-72">
                <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                  Search Name / Keyword:
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-academic-primary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, institution..."
                    className="w-full pl-9 pr-4 py-2 bg-white rounded-md border border-academic-border text-xs text-academic-dark placeholder:text-academic-text-muted focus:outline-none focus:border-academic-primary shadow-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stories List */}
          {filteredStories.length === 0 ? (
            <div className="academic-card p-12 text-center text-academic-text-muted">
              <Award className="w-10 h-10 text-academic-primary/40 mx-auto mb-2" />
              <p className="text-sm font-semibold text-academic-dark">No success stories found</p>
              <p className="text-xs mt-1">Try selecting another category or clearing search terms.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredStories.map((story) => (
                <SuccessStoryCard key={story.id} story={story} />
              ))}
            </div>
          )}

          {/* Pagination Controls matching PDF: < 1 2 3 > */}
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
            <button className="px-3.5 py-1.5 rounded border border-academic-border bg-white text-academic-dark hover:bg-academic-bg">
              &gt;
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
