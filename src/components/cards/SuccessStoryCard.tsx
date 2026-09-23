import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Calendar, ArrowRight, Award } from 'lucide-react';
import { SuccessStory } from '../../types';

interface SuccessStoryCardProps {
  story: SuccessStory;
}

export const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ story }) => {
  return (
    <div className="academic-card p-6 flex flex-col md:flex-row gap-6 items-start group hover:border-academic-primary transition-all">
      {/* Student Meta Column (matching PDF layout) */}
      <div className="w-full md:w-44 flex-shrink-0 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-academic-border pb-4 md:pb-0 md:pr-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-academic-border group-hover:border-academic-primary transition-colors shadow-xs mb-3">
          <img
            src={story.avatarUrl}
            alt={story.studentName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <h4 className="font-serif font-bold text-sm text-academic-dark">
          {story.studentName}
        </h4>
        <span className="text-xs font-semibold text-academic-primary">
          Batch {story.batch}
        </span>

        <div className="mt-2 text-[11px] text-academic-text-muted space-y-0.5 w-full">
          <p className="truncate">{story.phone}</p>
          <p className="truncate">{story.email}</p>
        </div>
      </div>

      {/* Story Content Column */}
      <div className="flex-1 min-w-0">
        {/* Badges strip matching PDF: Category | Date | Organization */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-academic-primary text-white px-2.5 py-0.5 rounded">
            {story.category}
          </span>
          <span className="text-xs text-academic-text-muted font-mono flex items-center gap-1">
            <Calendar className="w-3 h-3 text-academic-primary" />
            {story.date}
          </span>
          <span className="text-xs font-bold text-academic-dark bg-academic-surface px-2.5 py-0.5 rounded border border-academic-border">
            {story.organization}
          </span>
          <span className="text-[10px] font-medium text-academic-primary bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            News Feature
          </span>
        </div>

        {/* Headline */}
        <Link to={`/student-success-story/${story.id}`}>
          <h3 className="font-serif font-bold text-lg text-academic-dark group-hover:text-academic-primary transition-colors leading-snug">
            {story.headline}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mt-3 text-xs sm:text-sm text-academic-text-muted leading-relaxed line-clamp-3">
          {story.shortSummary}
        </p>

        {/* Quote if available */}
        {story.quote && (
          <blockquote className="mt-3 p-2.5 bg-academic-bg border-l-2 border-academic-primary rounded-r text-xs italic text-academic-dark/90 font-serif">
            "{story.quote}"
          </blockquote>
        )}

        {/* Card Footer Link */}
        <div className="mt-4 pt-3 border-t border-academic-border/60 flex justify-between items-center">
          <span className="text-xs text-academic-text-muted flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-academic-primary" />
            Global Alumni & Scholar Network
          </span>
          <Link
            to={`/student-success-story/${story.id}`}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-academic-primary hover:text-academic-primary-hover group-hover:translate-x-1 transition-all"
          >
            <span>Read Full Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
