import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  centered = false,
  className = ''
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-2.5 text-xs font-semibold uppercase tracking-widest text-academic-primary bg-academic-accent-soft rounded-full border border-academic-border">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-academic-dark tracking-tight">
        {title}
      </h2>
      <div className={`mt-3 ${centered ? 'mx-auto' : ''} ${centered ? 'bronze-rule-center w-24' : 'bronze-rule w-20'}`} />
      {subtitle && (
        <p className={`mt-3 text-sm sm:text-base text-academic-text-muted max-w-3xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
