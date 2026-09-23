import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, BookOpen } from 'lucide-react';
import { FacultyMember } from '../../types';
import { AcademicNotice } from '../common/AcademicNotice';

interface FacultyCardProps {
  faculty: FacultyMember;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
  return (
    <div className="academic-card p-5 flex flex-col justify-between group hover:border-academic-primary transition-all">
      <div>
        {/* Avatar & Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <img
              src={faculty.avatarUrl}
              alt={faculty.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-academic-border group-hover:border-academic-primary transition-colors shadow-xs"
              loading="lazy"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Active Faculty"></span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-base text-academic-dark group-hover:text-academic-primary transition-colors truncate">
              {faculty.name}
            </h3>
            <p className="text-xs font-semibold text-academic-primary mt-0.5">
              {faculty.designation}
            </p>
            <p className="text-[11px] text-academic-text-muted truncate mt-0.5">
              {faculty.qualification}
            </p>
          </div>
        </div>

        {/* Demo Notice if applicable */}
        {faculty.isDemo && (
          <div className="mb-3">
            <AcademicNotice type="demo" text="Sample Academic Profile" />
          </div>
        )}

        {/* Contact Info from PDF style */}
        <div className="space-y-1.5 py-2 border-t border-academic-border/60 text-xs text-academic-dark">
          <div className="flex items-center space-x-2 text-academic-text-muted hover:text-academic-dark truncate">
            <Mail className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
            <a href={`mailto:${faculty.email}`} className="truncate hover:underline">
              {faculty.email}
            </a>
          </div>
          <div className="flex items-center space-x-2 text-academic-text-muted hover:text-academic-dark truncate">
            <Phone className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
            <span>{faculty.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-academic-text-muted truncate">
            <MapPin className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
            <span className="truncate">{faculty.room}</span>
          </div>
        </div>

        {/* Specialization Tags */}
        <div className="mt-3 pt-2 border-t border-academic-border/40 flex flex-wrap gap-1">
          {faculty.specialization.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              className="text-[10px] font-medium bg-academic-bg px-2 py-0.5 rounded text-academic-dark/80 border border-academic-border/60"
            >
              {spec}
            </span>
          ))}
          {faculty.specialization.length > 3 && (
            <span className="text-[10px] text-academic-text-muted self-center">
              +{faculty.specialization.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Link */}
      <div className="mt-4 pt-3 border-t border-academic-border flex justify-between items-center">
        <span className="text-[11px] text-academic-text-muted">
          Joined {faculty.joinedYear}
        </span>
        <Link
          to={`/faculty/${faculty.id}`}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-academic-primary hover:text-academic-primary-hover group-hover:translate-x-0.5 transition-all"
        >
          <span>View Profile</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
