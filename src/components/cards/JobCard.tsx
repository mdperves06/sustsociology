import React from 'react';
import { Briefcase, CheckCircle2, Building2 } from 'lucide-react';
import { CareerRole } from '../../types';

interface JobCardProps {
  job: CareerRole;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="academic-card p-6 flex flex-col justify-between group hover:border-academic-primary transition-all">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-academic-border">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-lg bg-academic-accent-soft border border-academic-border flex items-center justify-center text-academic-primary font-bold font-serif text-lg group-hover:scale-105 transition-transform shadow-xs">
              {job.organization.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-academic-dark group-hover:text-academic-primary transition-colors">
                {job.organization}
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider text-academic-text-muted">
                {job.category}
              </span>
            </div>
          </div>
          <Building2 className="w-4 h-4 text-academic-primary/60" />
        </div>

        {/* Short Description */}
        <p className="text-xs text-academic-text-muted mb-4 italic">
          {job.description}
        </p>

        {/* Roles List matching PDF bullets */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-academic-dark block">
            Sociological Roles & Practice:
          </span>
          <ul className="space-y-1.5 text-xs text-academic-dark/90">
            {job.roles.map((role, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-academic-primary font-bold mt-0.5">•</span>
                <span className="leading-snug">{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-academic-border/60 flex justify-between items-center text-[11px] text-academic-text-muted">
        <span className="flex items-center gap-1 text-academic-primary font-medium">
          <CheckCircle2 className="w-3 h-3 text-academic-primary" />
          Alumni Placement Sector
        </span>
        <span className="font-mono">SUST Career Horizons</span>
      </div>
    </div>
  );
};
