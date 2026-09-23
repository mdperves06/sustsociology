import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Award,
  Building2,
  Mail,
  Phone,
  Quote,
  CheckCircle2,
  Share2,
  Check
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { SuccessStory } from '../types';
import { SidebarNav } from '../components/layout/SidebarNav';

export const SuccessStoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (id) {
      const found = dataService.getStoryById(id);
      if (found) {
        setStory(found);
      }
    }
  }, [id]);

  if (!story) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-serif font-bold text-academic-dark">Story Not Found</h2>
        <p className="text-xs text-academic-text-muted mt-2">The requested student success story could not be found.</p>
        <Link
          to="/student-success-story"
          className="mt-4 inline-flex items-center space-x-1.5 text-xs font-semibold text-academic-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Success Stories</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.headline,
        text: story.shortSummary,
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
            <span>Back to Success Stories</span>
          </button>

          {/* Header Card */}
          <div className="academic-card p-6 md:p-8 mb-8 bg-white">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-academic-primary text-white px-3 py-1 rounded">
                {story.category}
              </span>
              <span className="text-xs font-bold text-academic-dark bg-academic-surface px-3 py-1 rounded border border-academic-border">
                {story.organization}
              </span>
              <span className="text-xs text-academic-text-muted font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-academic-primary" />
                {story.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-academic-dark leading-tight">
              {story.headline}
            </h1>

            {/* Author / Student meta strip */}
            <div className="mt-6 pt-6 border-t border-academic-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <img
                  src={story.avatarUrl}
                  alt={story.studentName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-academic-border shadow-xs"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-academic-dark">
                    {story.studentName}
                  </h3>
                  <p className="text-xs text-academic-primary font-semibold">
                    Batch {story.batch} • SUST Department of Sociology
                  </p>
                  <p className="text-[11px] text-academic-text-muted">
                    {story.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-academic-bg hover:bg-academic-accent-soft text-academic-dark rounded text-xs font-semibold border border-academic-border transition-colors shadow-xs"
              >
                {shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{shared ? 'Link Copied' : 'Share Article'}</span>
              </button>
            </div>
          </div>

          {/* Inspirational Pull Quote */}
          {story.quote && (
            <div className="p-6 bg-academic-surface rounded-lg border-l-4 border-academic-primary mb-8 shadow-xs">
              <Quote className="w-6 h-6 text-academic-primary mb-2" />
              <p className="font-serif italic text-base sm:text-lg text-academic-dark leading-relaxed">
                "{story.quote}"
              </p>
              <span className="text-xs font-semibold text-academic-primary mt-2 block">
                — {story.studentName}
              </span>
            </div>
          )}

          {/* Full Narrative */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <h2 className="font-serif font-bold text-xl text-academic-dark mb-4 pb-2 border-b border-academic-border">
              The Journey & Global Impact
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify whitespace-pre-line font-sans">
              {story.fullStory}
            </div>
          </div>

          {/* Milestones & Laurels */}
          <div className="academic-card p-6 md:p-8">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
              <Award className="w-5 h-5 text-academic-primary" />
              <span>Key Career Milestones & Honors</span>
            </h3>
            <ul className="space-y-2.5">
              {story.achievementsList.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-academic-dark">
                  <CheckCircle2 className="w-4 h-4 text-academic-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};
