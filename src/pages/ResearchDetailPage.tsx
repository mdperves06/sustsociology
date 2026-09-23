import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Quote,
  Download,
  Calendar,
  BookOpen,
  Share2,
  Check,
  Tag,
  Building2,
  ExternalLink
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { ResearchPaper } from '../types';
import { CitationModal } from '../components/common/CitationModal';
import { SidebarNav } from '../components/layout/SidebarNav';

export const ResearchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [paper, setPaper] = useState<ResearchPaper | null>(null);
  const [citationModalOpen, setCitationModalOpen] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (id) {
      const found = dataService.getResearchById(id);
      if (found) {
        setPaper(found);
      }
    }
  }, [id]);

  if (!paper) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-serif font-bold text-academic-dark">Publication Not Found</h2>
        <p className="text-xs text-academic-text-muted mt-2">The requested research paper could not be found.</p>
        <Link
          to="/research"
          className="mt-4 inline-flex items-center space-x-1.5 text-xs font-semibold text-academic-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Portal</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: paper.title,
        text: paper.abstract,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-academic-primary hover:text-academic-primary-hover mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Portal</span>
          </button>

          {/* Article Header Card */}
          <div className="academic-card p-6 md:p-8 mb-8 bg-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-academic-primary bg-academic-accent-soft px-3 py-1 rounded border border-academic-border">
                {paper.journal}
              </span>
              <span className="text-xs text-academic-text-muted font-medium">
                {paper.volume}, {paper.issue}
              </span>
              <span className="text-xs text-academic-text-muted">•</span>
              <span className="text-xs text-academic-text-muted font-mono">
                Published: {paper.publishedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-academic-dark leading-tight">
              {paper.title}
            </h1>

            {/* Authors & Institutional Affiliation */}
            <div className="mt-4 pt-4 border-t border-academic-border/60">
              <span className="text-xs font-semibold text-academic-text-muted block uppercase tracking-wider">
                Authors & Investigators:
              </span>
              <div className="mt-1 flex flex-wrap gap-2 text-sm font-bold text-academic-dark">
                {paper.authors.map((author, i) => (
                  <span key={i} className="inline-flex items-center">
                    {author}
                    {i < paper.authors.length - 1 && <span className="text-academic-primary mx-1.5">•</span>}
                  </span>
                ))}
              </div>
              <p className="text-xs text-academic-text-muted mt-1">
                Department of Sociology, Shahjalal University of Science and Technology (SUST), Sylhet, Bangladesh
              </p>
            </div>

            {/* DOI and Action Bar */}
            <div className="mt-6 pt-4 border-t border-academic-border flex flex-wrap justify-between items-center gap-4">
              <div className="text-xs font-mono text-academic-text-muted">
                {paper.doi && <span>DOI: <strong className="text-academic-dark">{paper.doi}</strong></span>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCitationModalOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-academic-surface hover:bg-academic-accent-soft text-academic-primary rounded text-xs font-semibold border border-academic-border transition-colors shadow-xs"
                >
                  <Quote className="w-3.5 h-3.5" />
                  <span>Cite Article</span>
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-academic-bg text-academic-dark rounded text-xs font-semibold border border-academic-border transition-colors shadow-xs"
                >
                  {shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{shared ? 'Link Copied' : 'Share'}</span>
                </button>

                <a
                  href="#download-placeholder"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Official repository download triggered: " + paper.title);
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-academic-primary hover:bg-academic-primary-hover text-white rounded text-xs font-semibold transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Abstract Section */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <h2 className="font-serif font-bold text-xl text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-academic-primary" />
              <span>Abstract</span>
            </h2>
            <p className="text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify">
              {paper.abstract}
            </p>
          </div>

          {/* Methodology & Fieldwork Section */}
          {paper.methodology && (
            <div className="academic-card p-6 md:p-8 mb-8">
              <h2 className="font-serif font-bold text-xl text-academic-dark mb-4 pb-2 border-b border-academic-border">
                Methodological Framework & Empirical Data
              </h2>
              <p className="text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify">
                {paper.methodology}
              </p>
            </div>
          )}

          {/* Keywords & Subject Headings */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <h3 className="font-serif font-bold text-base text-academic-dark mb-3 flex items-center space-x-2">
              <Tag className="w-4 h-4 text-academic-primary" />
              <span>Keywords & Subject Terms</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {paper.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-academic-bg text-academic-dark text-xs font-medium rounded-full border border-academic-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>

      <CitationModal
        paper={paper}
        isOpen={citationModalOpen}
        onClose={() => setCitationModalOpen(false)}
      />
    </div>
  );
};
