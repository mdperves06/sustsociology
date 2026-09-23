import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  User,
  Home,
  Users,
  Layers,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  Mail,
  Library,
  Bell
} from 'lucide-react';

interface SidebarNavProps {
  className?: string;
  activeStudentId?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ className = '', activeStudentId }) => {
  const navItems = [
    {
      label: 'Profile',
      path: activeStudentId ? `/batch/2024-2025/student/${activeStudentId}` : '/batch/2024-2025/student/student-borhan-rudro',
      icon: User,
    },
    { label: 'Home', path: '/', icon: Home },
    { label: 'Faculty', path: '/faculty', icon: Users },
    { label: 'Batch', path: '/batch', icon: Layers },
    { label: 'Research', path: '/research', icon: FileText },
    { label: 'Seminar Library', path: '/library', icon: Library },
    { label: 'Student Success Story', path: '/student-success-story', icon: Award },
    { label: 'Jobs In Sociology', path: '/jobs', icon: Briefcase },
    { label: 'Alumni Association', path: '/alumni', icon: GraduationCap },
    { label: 'Notices & Events', path: '/notices', icon: Bell },
    { label: 'Sociology Society', path: '/sociology-society', icon: Sparkles },
    { label: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <aside className={`w-64 flex-shrink-0 hidden lg:block ${className}`}>
      <div className="sticky top-28 bg-white/80 backdrop-blur-sm rounded-lg border border-academic-border p-4 shadow-academic-sm">
        <div className="pb-3 mb-3 border-b border-academic-border">
          <span className="text-[11px] font-bold text-academic-primary uppercase tracking-widest block">
            Navigation Index
          </span>
          <span className="text-xs text-academic-text-muted">
            SUST Academic Portal
          </span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-academic-accent-soft text-academic-primary font-semibold border-l-4 border-academic-primary'
                      : 'text-academic-dark/80 hover:text-academic-primary hover:bg-academic-bg'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 text-academic-primary" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
