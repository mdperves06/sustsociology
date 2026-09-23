import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-academic-accent-soft flex items-center justify-center text-academic-primary mb-4 font-serif text-3xl font-bold border border-academic-border">
        404
      </div>
      <h1 className="font-serif font-bold text-3xl text-academic-dark">
        Page Not Found
      </h1>
      <p className="mt-3 text-xs sm:text-sm text-academic-text-muted leading-relaxed">
        The academic page or document you are seeking could not be located in the Department of Sociology directory archive.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold rounded uppercase tracking-wider shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/faculty"
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-white hover:bg-academic-bg text-academic-dark border border-academic-border text-xs font-semibold rounded uppercase tracking-wider shadow-xs transition-colors"
        >
          <span>Faculty Directory</span>
        </Link>
      </div>
    </div>
  );
};
