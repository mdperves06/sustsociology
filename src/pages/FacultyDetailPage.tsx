import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  Layers,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { FacultyMember } from '../types';
import { AcademicNotice } from '../components/common/AcademicNotice';
import { SidebarNav } from '../components/layout/SidebarNav';

export const FacultyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState<FacultyMember | null>(null);

  useEffect(() => {
    if (id) {
      const found = dataService.getFacultyById(id);
      if (found) {
        setFaculty(found);
      }
    }
  }, [id]);

  if (!faculty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-serif font-bold text-academic-dark">Faculty Member Not Found</h2>
        <p className="text-xs text-academic-text-muted mt-2">The requested academic profile does not exist.</p>
        <Link
          to="/faculty"
          className="mt-4 inline-flex items-center space-x-1.5 text-xs font-semibold text-academic-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Faculty Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-academic-primary hover:text-academic-primary-hover mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Faculty Directory</span>
          </button>

          {/* Profile Header Card */}
          <div className="academic-card p-6 md:p-8 mb-8 bg-white">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <img
                  src={faculty.avatarUrl}
                  alt={faculty.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg object-cover border-2 border-academic-border shadow-md"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-academic-primary uppercase tracking-widest bg-academic-accent-soft px-2.5 py-0.5 rounded border border-academic-border">
                    {faculty.designation}
                  </span>
                  <span className="text-xs text-academic-text-muted">
                    Joined Session {faculty.joinedYear}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-academic-dark">
                  {faculty.name}
                </h1>

                <p className="text-xs sm:text-sm text-academic-text-muted font-medium mt-1">
                  {faculty.qualification}
                </p>

                {faculty.isDemo && (
                  <div className="mt-3">
                    <AcademicNotice type="demo" text="Sample Academic Profile — Update via Admin CMS" />
                  </div>
                )}

                {/* Contact Strip */}
                <div className="mt-4 pt-4 border-t border-academic-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-academic-dark">
                  <div className="flex items-center space-x-2 truncate">
                    <Mail className="w-4 h-4 text-academic-primary flex-shrink-0" />
                    <a href={`mailto:${faculty.email}`} className="truncate hover:underline">
                      {faculty.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 truncate">
                    <Phone className="w-4 h-4 text-academic-primary flex-shrink-0" />
                    <span>{faculty.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 truncate">
                    <MapPin className="w-4 h-4 text-academic-primary flex-shrink-0" />
                    <span className="truncate">{faculty.room}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Biography */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-3 pb-2 border-b border-academic-border">
              Scholarly Biography & Academic Profile
            </h3>
            <p className="text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify">
              {faculty.bio}
            </p>
          </div>

          {/* Education & Qualifications */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <div className="flex items-center space-x-2 text-academic-primary mb-4 pb-2 border-b border-academic-border">
              <GraduationCap className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg text-academic-dark">
                Educational Background & Degrees
              </h3>
            </div>
            <div className="space-y-4">
              {faculty.education.map((edu, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-3 bg-academic-bg rounded border border-academic-border">
                  <div className="w-12 text-center text-xs font-bold font-mono text-academic-primary flex-shrink-0 pt-0.5">
                    {edu.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-academic-dark">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-academic-text-muted mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Specializations & Publications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Specializations */}
            <div className="academic-card p-6">
              <h3 className="font-serif font-bold text-base text-academic-dark mb-3 pb-2 border-b border-academic-border">
                Research Fields & Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {faculty.specialization.map((spec, i) => (
                  <span
                    key={i}
                    className="text-xs bg-academic-accent-soft text-academic-primary font-medium px-3 py-1 rounded-full border border-academic-border"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Courses Taught */}
            <div className="academic-card p-6">
              <h3 className="font-serif font-bold text-base text-academic-dark mb-3 pb-2 border-b border-academic-border">
                Courses Taught at SUST
              </h3>
              <ul className="space-y-2 text-xs text-academic-dark/90">
                {faculty.coursesTaught.map((course, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Publications */}
          <div className="academic-card p-6 md:p-8">
            <div className="flex items-center space-x-2 text-academic-primary mb-4 pb-2 border-b border-academic-border">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg text-academic-dark">
                Selected Scholarly Publications
              </h3>
            </div>
            <ul className="space-y-3">
              {faculty.publications.map((pub, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-academic-bg rounded border border-academic-border text-xs text-academic-dark leading-relaxed font-sans"
                >
                  <span className="font-bold text-academic-primary mr-2 font-mono">[{idx + 1}]</span>
                  {pub}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};
