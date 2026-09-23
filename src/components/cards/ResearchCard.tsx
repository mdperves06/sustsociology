import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Quote, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { ResearchPaper } from '../../types';

interface ResearchCardProps {
  paper: ResearchPaper;
  onCite: (paper: ResearchPaper) => void;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ paper, onCite }) => {
  return (
    <div className="academic-card p-6 flex flex-col md:flex-row gap-6 items-start group hover:border-academic-primary transition-all">
      {/* Contributor / Academic Icon Box */}
      <div className="w-16 h-16 rounded-full bg-academic-accent-soft border border-academic-border flex-shrink-0 flex items-center justify-center text-academic-primary group-hover:scale-105 transition-transform shadow-xs">
        <BookOpen className="w-8 h-8" />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-academic-primary">
            {paper.journal}
          </span>
          <span className="text-xs text-academic-text-muted">•</span>
          <span className="text-xs text-academic-text-muted font-medium">
            {paper.volume}, {paper.issue}
          </span>
        </div>

        <Link to={`/research/${paper.id}`} className="group-hover:text-academic-primary transition-colors">
          <h3 className="font-serif font-bold text-lg text-academic-dark leading-snug">
            {paper.title}
          </h3>
        </Link>

        {/* Authors */}
        <p className="text-xs text-academic-dark/90 font-medium mt-2">
          <span className="text-academic-text-muted">Authors: </span>
          {paper.authors.join(', ')}
        </p>

        {/* Date & Abstract preview */}
        <div className="flex items-center space-x-2 text-xs text-academic-text-muted mt-1.5">
          <Calendar className="w-3.5 h-3.5 text-academic-primary" />
          <span>Published online: {paper.publishedDate}</span>
          {paper.doi && (
            <>
              <span>•</span>
              <span className="font-mono text-[11px] truncate">DOI: {paper.doi}</span>
            </>
          )}
        </div>

        <p className="text-xs text-academic-text-muted mt-3 line-clamp-2 leading-relaxed">
          {paper.abstract}
        </p>

        {/* Tags matching PDF: environmental, socioeconomic impacts, river geomorphology, gravel mining */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {paper.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-academic-bg text-academic-dark/80 px-2.5 py-0.5 rounded-full border border-academic-border/70 hover:border-academic-primary transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto justify-end md:justify-start flex-shrink-0 pt-2 border-t md:border-t-0 md:border-l border-academic-border md:pl-4">
        <button
          onClick={() => onCite(paper)}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-academic-bg hover:bg-academic-accent-soft text-academic-primary rounded text-xs font-semibold border border-academic-border transition-colors shadow-xs"
          title="Export citation in APA, Chicago, BibTeX format"
        >
          <Quote className="w-3.5 h-3.5" />
          <span>Cite</span>
        </button>

        <Link
          to={`/research/${paper.id}`}
          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-academic-primary hover:bg-academic-primary-hover text-white rounded text-xs font-semibold transition-colors shadow-xs"
        >
          <span>Read Paper</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
