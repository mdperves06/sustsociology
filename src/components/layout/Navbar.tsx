import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bell,
  Lock,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Users,
  Compass,
  Briefcase,
  Award,
  Globe
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Faculty', path: '/faculty' },
    { label: 'Batch', path: '/batch' },
    { label: 'Research', path: '/research' },
    { label: 'Success Story', path: '/student-success-story' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Alumni', path: '/alumni' },
    { label: 'Society', path: '/sociology-society' },
    { label: 'Contact', path: '/contact' },
  ];

  const announcements = [
    {
      title: "Admission Open: MSS in Sociology (Session 2024–25)",
      date: "Sep 2026",
      urgent: true
    },
    {
      title: "Fieldwork Report Submission for BSS 4th Year Cohort",
      date: "Aug 2026",
      urgent: false
    },
    {
      title: "Guest Lecture: 'Agrarian Political Economy in the Haor Basin'",
      date: "Jul 2026",
      urgent: false
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-academic-border shadow-sm">
      {/* Top Academic Strip */}
      <div className="bg-academic-dark text-[#FAF7EE] text-xs py-1.5 px-4 hidden sm:block border-b border-[#332E2B]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="text-academic-accent font-medium">Shahjalal University of Science & Technology</span>
            <span className="text-gray-400 hidden md:inline">Sylhet-3114, Bangladesh</span>
            <span className="text-gray-400 hidden lg:inline">Est. Session 1992–93</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-academic-accent/80 italic font-serif">"Understanding Society. Inspiring Change."</span>
            <Link
              to="/admin"
              className="inline-flex items-center space-x-1 text-gray-300 hover:text-white bg-white/10 px-2 py-0.5 rounded text-[11px] transition-colors"
            >
              <Lock className="w-3 h-3 text-academic-accent" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            <div className="w-12 h-12 rounded-full bg-academic-bg border-2 border-academic-primary flex items-center justify-center shadow-academic-sm p-1 transition-transform group-hover:scale-105">
              {/* SUST Emblem SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-academic-primary fill-current">
                <circle cx="50" cy="50" r="46" fill="#FAF7EE" stroke="#8E651E" strokeWidth="4"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="#8E651E" strokeWidth="1.5" strokeDasharray="3 2"/>
                <path d="M50 18 L53 32 L66 32 L55 41 L59 55 L50 46 L41 55 L45 41 L34 32 L47 32 Z" fill="#8E651E"/>
                <text x="50" y="74" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#1C1917" textAnchor="middle">SUST</text>
                <text x="50" y="84" fontFamily="sans-serif" fontSize="7" fill="#78716C" textAnchor="middle">1991</text>
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs tracking-wider uppercase font-semibold text-academic-primary">Department of</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-academic-dark leading-tight tracking-tight">
                Sociology
              </h1>
              <p className="text-[11px] text-academic-text-muted hidden md:block">
                Shahjalal University of Science & Technology
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                    active
                      ? 'text-academic-primary bg-academic-accent-soft font-semibold shadow-xs'
                      : 'text-academic-dark hover:text-academic-primary hover:bg-academic-bg'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-academic-dark hover:text-academic-primary hover:bg-academic-bg rounded-full border border-academic-border transition-colors flex items-center space-x-1 text-xs"
              title="Search faculty, papers, students (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-academic-primary" />
              <span className="hidden md:inline text-academic-text-muted pl-0.5">Search</span>
              <kbd className="hidden lg:inline-block bg-academic-bg px-1.5 py-0.5 text-[10px] text-academic-text-muted rounded border border-academic-border">⌘K</kbd>
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-academic-dark hover:text-academic-primary hover:bg-academic-bg rounded-full border border-academic-border transition-colors relative"
                title="Department Notices"
              >
                <Bell className="w-4 h-4 text-academic-primary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-academic-primary rounded-full animate-pulse"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-academic-lg border border-academic-border p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-academic-border">
                    <span className="text-xs font-bold text-academic-dark uppercase tracking-wider">Notice Board</span>
                    <span className="text-[10px] text-academic-text-muted">Live Announcements</span>
                  </div>
                  <div className="space-y-2">
                    {announcements.map((note, i) => (
                      <div key={i} className="p-2 bg-academic-bg rounded border border-academic-border/60 hover:border-academic-primary transition-colors text-xs">
                        <div className="flex justify-between text-[10px] text-academic-text-muted mb-1">
                          <span>{note.date}</span>
                          {note.urgent && <span className="text-academic-primary font-semibold">Urgent</span>}
                        </div>
                        <p className="text-academic-dark font-medium leading-snug">{note.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 text-center border-t border-academic-border">
                    <Link
                      to="/contact"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-academic-primary hover:underline font-medium"
                    >
                      Inquire with Academic Office →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-academic-dark hover:text-academic-primary hover:bg-academic-bg rounded-md border border-academic-border transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-academic-bg-pure border-b border-academic-border px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-academic-border">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    active
                      ? 'bg-academic-accent-soft text-academic-primary font-semibold border border-academic-border'
                      : 'text-academic-dark hover:bg-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex justify-between items-center pt-2">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-academic-primary bg-white px-3 py-1.5 rounded border border-academic-border shadow-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin CMS Portal</span>
            </Link>
            <span className="text-[11px] text-academic-text-muted">SUST Sociology</span>
          </div>
        </div>
      )}
    </header>
  );
};
