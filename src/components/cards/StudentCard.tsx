import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { StudentProfile } from '../../types';

interface StudentCardProps {
  student: StudentProfile;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="academic-card p-5 text-center flex flex-col justify-between items-center group hover:border-academic-primary transition-all">
      <div className="w-full flex flex-col items-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-academic-border group-hover:border-academic-primary transition-colors shadow-xs mb-3">
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Student Name */}
        <h4 className="font-serif font-bold text-sm text-academic-dark group-hover:text-academic-primary transition-colors line-clamp-1">
          {student.name}
        </h4>

        {/* Registration */}
        <p className="text-[11px] text-academic-text-muted mt-1 font-mono">
          Registration No.
        </p>
        <p className="text-xs font-semibold text-academic-primary tracking-wider">
          {student.registrationNo}
        </p>

        {/* Contact details matching PDF page 3 */}
        <div className="mt-3 w-full pt-2 border-t border-academic-border/60 text-[11px] text-academic-text-muted space-y-1">
          <div className="flex items-center justify-center space-x-1.5 truncate">
            <Phone className="w-3 h-3 text-academic-primary flex-shrink-0" />
            <span className="truncate">{student.phone}</span>
          </div>
          <div className="flex items-center justify-center space-x-1.5 truncate">
            <Mail className="w-3 h-3 text-academic-primary flex-shrink-0" />
            <span className="truncate">{student.email}</span>
          </div>
        </div>
      </div>

      {/* Profile Button */}
      <Link
        to={`/batch/${student.batchSession}/student/${student.id}`}
        className="mt-4 w-full py-1.5 px-3 bg-academic-bg hover:bg-academic-primary text-academic-dark hover:text-white rounded text-xs font-medium transition-colors border border-academic-border inline-flex items-center justify-center space-x-1"
      >
        <span>View Full Profile</span>
        <ExternalLink className="w-3 h-3" />
      </Link>
    </div>
  );
};
