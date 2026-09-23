import React, { useState } from 'react';
import { X, Check, Copy, BookOpen } from 'lucide-react';
import { ResearchPaper } from '../../types';

interface CitationModalProps {
  paper: ResearchPaper | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ paper, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'APA' | 'Chicago' | 'Harvard' | 'BibTeX'>('APA');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !paper) return null;

  const authorsString = paper.authors.join(', ');
  const yearMatch = paper.publishedDate.match(/\b(20\d\d)\b/);
  const year = yearMatch ? yearMatch[1] : '2026';

  const citations = {
    APA: `${authorsString} (${year}). ${paper.title}. ${paper.journal}, ${paper.volume}(${paper.issue}). ${paper.doi ? `https://doi.org/${paper.doi}` : ''}`,
    Chicago: `${authorsString}. "${paper.title}." ${paper.journal} ${paper.volume}, no. ${paper.issue} (${year}). ${paper.doi ? `doi:${paper.doi}.` : ''}`,
    Harvard: `${authorsString}, ${year}. ${paper.title}. ${paper.journal}, ${paper.volume}(${paper.issue}).`,
    BibTeX: `@article{sust_soc_${paper.id.replace(/[^a-zA-Z0-9]/g, '_')},
  title = {${paper.title}},
  author = {${paper.authors.join(' and ')}},
  journal = {${paper.journal}},
  volume = {${paper.volume}},
  number = {${paper.issue}},
  year = {${year}},
  institution = {Department of Sociology, SUST}
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(citations[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-academic-dark/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg border border-academic-border shadow-academic-lg max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-academic-text-muted hover:text-academic-dark p-1 rounded-full hover:bg-academic-bg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-academic-primary mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Cite This Publication</span>
        </div>

        <h3 className="font-serif text-lg font-bold text-academic-dark mb-4 line-clamp-2">
          {paper.title}
        </h3>

        {/* Style Selection Tabs */}
        <div className="flex space-x-2 border-b border-academic-border mb-4">
          {(['APA', 'Chicago', 'Harvard', 'BibTeX'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-3 text-xs font-semibold transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-academic-primary text-academic-primary'
                  : 'border-transparent text-academic-text-muted hover:text-academic-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Citation Output Box */}
        <div className="bg-academic-bg p-4 rounded-md border border-academic-border text-xs text-academic-dark font-mono leading-relaxed select-all overflow-x-auto max-h-48">
          <pre className="whitespace-pre-wrap font-sans">{citations[activeTab]}</pre>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex justify-between items-center">
          <span className="text-[11px] text-academic-text-muted">
            Format: {activeTab} 7th / Academic Standard
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-academic-primary hover:bg-academic-primary-hover text-white rounded text-xs font-semibold transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Citation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
