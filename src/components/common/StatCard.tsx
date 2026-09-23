import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  subtext?: string;
  icon?: LucideIcon;
  variant?: 'cream' | 'white' | 'dark';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix = '',
  subtext,
  icon: Icon,
  variant = 'cream'
}) => {
  const getBgStyle = () => {
    switch (variant) {
      case 'dark':
        return 'bg-academic-dark text-white border-academic-primary/40';
      case 'white':
        return 'bg-white text-academic-dark border-academic-border';
      case 'cream':
      default:
        return 'bg-academic-surface/80 text-academic-dark border-academic-border';
    }
  };

  return (
    <div
      className={`rounded-lg p-5 border text-center transition-all duration-300 hover:shadow-academic-sm hover:-translate-y-0.5 ${getBgStyle()}`}
    >
      {Icon && (
        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-academic-primary/10 flex items-center justify-center text-academic-primary">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-academic-primary">
        {value}
        {suffix && <span className="text-xl sm:text-2xl ml-0.5">{suffix}</span>}
      </div>
      <div className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-academic-dark/90">
        {label}
      </div>
      {subtext && (
        <div className="mt-1 text-[11px] text-academic-text-muted">
          {subtext}
        </div>
      )}
    </div>
  );
};
