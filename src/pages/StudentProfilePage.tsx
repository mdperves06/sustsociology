import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Quote,
  GraduationCap,
  Sparkles,
  Briefcase,
  FlaskConical,
  Award,
  Calendar,
  Layers,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SidebarNav } from '../components/layout/SidebarNav';
import { AcademicNotice } from '../components/common/AcademicNotice';
import { dataService } from '../services/dataService';
import { StudentProfile } from '../types';
import { BORHAN_RUDRO } from '../data/batches';

export const StudentProfilePage: React.FC = () => {
  const { studentId, batchId } = useParams<{ studentId?: string; batchId?: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentProfile>(BORHAN_RUDRO);

  useEffect(() => {
    if (studentId) {
      const result = dataService.getStudentById(studentId);
      if (result) {
        setStudent(result.student);
      }
    }
  }, [studentId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav activeStudentId={student.id} />

        <main className="flex-1 min-w-0">
          {/* Breadcrumb / Back button */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-academic-primary hover:text-academic-primary-hover"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Batch Directory</span>
            </button>
            <span className="text-xs text-academic-text-muted">
              Batch Session: <strong className="text-academic-dark">{student.batchSession}</strong>
            </span>
          </div>

          {/* Top Profile Card matching PDF Page 2 */}
          <div className="academic-card p-6 md:p-8 mb-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Avatar Column */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-academic-border shadow-md">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs font-bold font-mono text-academic-primary block">
                    Reg: {student.registrationNo}
                  </span>
                  <span className="text-[11px] text-academic-text-muted">
                    Session {student.batchSession}
                  </span>
                </div>
              </div>

              {/* Name & Contact Info Column */}
              <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-academic-border pt-4 md:pt-0 md:pl-6">
                <h1 className="text-2xl font-serif font-bold text-academic-dark">
                  {student.name}
                </h1>
                <p className="text-xs font-semibold text-academic-primary mt-0.5">
                  Department of Sociology
                </p>
                <p className="text-[11px] text-academic-text-muted">
                  Shahjalal University of Science and Technology
                </p>

                {/* Contact Information Box matching PDF */}
                <div className="mt-4 pt-3 border-t border-academic-border/60 space-y-1.5 text-xs text-academic-dark">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-academic-text-muted block">
                    Contact Information:
                  </span>
                  <div className="flex items-center space-x-2 text-academic-text-muted">
                    <MapPin className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
                    <span>{student.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-academic-text-muted">
                    <Mail className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
                    <a href={`mailto:${student.email}`} className="text-academic-dark hover:underline">
                      {student.email}
                    </a>
                  </div>
                  {student.website && (
                    <div className="flex items-center space-x-2 text-academic-text-muted">
                      <Globe className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
                      <a href={student.website} target="_blank" rel="noreferrer" className="text-academic-dark hover:underline">
                        {student.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-academic-text-muted">
                    <Phone className="w-3.5 h-3.5 text-academic-primary flex-shrink-0" />
                    <span>{student.phone}</span>
                  </div>
                </div>
              </div>

              {/* Quote Card on Right Column matching PDF */}
              <div className="md:col-span-4 bg-academic-surface/60 rounded-lg p-5 border border-academic-border flex flex-col justify-center h-full">
                <Quote className="w-6 h-6 text-academic-primary/50 mb-2" />
                <p className="font-serif italic text-xs sm:text-sm text-academic-dark leading-relaxed">
                  "{student.quote || 'Life is a succession of lessons which must be lived to be understood.'}"
                </p>
                <span className="mt-3 text-[11px] font-semibold text-academic-primary text-right block">
                  — Scholar Motto
                </span>
              </div>
            </div>

            {/* Subtle Demo Notice */}
            {student.isDemo && (
              <div className="mt-6 pt-4 border-t border-academic-border/60">
                <AcademicNotice type="demo" text="Sample Student Profile — Matching PDF Page 2 specification." />
              </div>
            )}
          </div>

          {/* Metric Stats Counters Row matching PDF Page 2 */}
          <div className="bg-academic-surface rounded-lg p-4 border border-academic-border mb-8 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center divide-y sm:divide-y-0 sm:divide-x divide-academic-border">
              <div className="p-2">
                <GraduationCap className="w-5 h-5 text-academic-primary mx-auto mb-1" />
                <span className="text-2xl font-serif font-bold text-academic-dark block">
                  {student.education.length}
                </span>
                <span className="text-[11px] font-semibold uppercase text-academic-text-muted">
                  Degrees
                </span>
              </div>

              <div className="p-2 pt-3 sm:pt-2">
                <Sparkles className="w-5 h-5 text-academic-primary mx-auto mb-1" />
                <span className="text-2xl font-serif font-bold text-academic-dark block">
                  {student.skills.length}
                </span>
                <span className="text-[11px] font-semibold uppercase text-academic-text-muted">
                  Skills
                </span>
              </div>

              <div className="p-2 pt-3 sm:pt-2">
                <Briefcase className="w-5 h-5 text-academic-primary mx-auto mb-1" />
                <span className="text-2xl font-serif font-bold text-academic-dark block">
                  {student.experiences.length}
                </span>
                <span className="text-[11px] font-semibold uppercase text-academic-text-muted">
                  Experience
                </span>
              </div>

              <div className="p-2 pt-3 sm:pt-2">
                <FlaskConical className="w-5 h-5 text-academic-primary mx-auto mb-1" />
                <span className="text-2xl font-serif font-bold text-academic-dark block">
                  {student.researchWorks.length}
                </span>
                <span className="text-[11px] font-semibold uppercase text-academic-text-muted">
                  Research Work
                </span>
              </div>

              <div className="p-2 pt-3 sm:pt-2">
                <Award className="w-5 h-5 text-academic-primary mx-auto mb-1" />
                <span className="text-2xl font-serif font-bold text-academic-dark block">
                  {student.achievements.length}
                </span>
                <span className="text-[11px] font-semibold uppercase text-academic-text-muted">
                  Achievements
                </span>
              </div>
            </div>
          </div>

          {/* Section: About Me */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-3 pb-2 border-b border-academic-border">
              About Me
            </h3>
            <p className="text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify">
              {student.aboutMe}
            </p>
          </div>

          {/* Section: Education matching PDF 2x2 Grid */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-academic-primary" />
              <span>Education</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {student.education.map((edu, idx) => (
                <div key={idx} className="p-4 bg-academic-bg rounded-lg border border-academic-border">
                  <h4 className="font-serif font-bold text-sm text-academic-dark">
                    {edu.degree}
                  </h4>
                  <div className="mt-2 text-xs space-y-1 text-academic-dark/90 font-mono">
                    <p><span className="text-academic-text-muted">Institute:</span> {edu.institute}</p>
                    {edu.boardOrDept && <p><span className="text-academic-text-muted">Board/Dept:</span> {edu.boardOrDept}</p>}
                    {edu.session && <p><span className="text-academic-text-muted">Session:</span> {edu.session}</p>}
                    {edu.group && <p><span className="text-academic-text-muted">Group:</span> {edu.group}</p>}
                    <p><span className="text-academic-text-muted">Passing Year:</span> {edu.passingYear}</p>
                    <p><span className="text-academic-text-muted">Result:</span> <strong className="text-academic-primary">{edu.result}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Research Works */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-academic-border">
              <h3 className="font-serif font-bold text-lg text-academic-dark flex items-center space-x-2">
                <FlaskConical className="w-5 h-5 text-academic-primary" />
                <span>Research Works</span>
              </h3>
              <span className="text-xs font-semibold text-academic-primary">
                Total: {student.researchWorks.length}
              </span>
            </div>

            <div className="space-y-4">
              {student.researchWorks.map((res, idx) => (
                <div key={res.id || idx} className="p-4 bg-academic-bg rounded-lg border border-academic-border">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-serif font-bold text-sm text-academic-dark leading-snug">
                      {idx + 1}. {res.title}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-academic-accent-soft text-academic-primary border border-academic-border flex-shrink-0">
                      {res.status}
                    </span>
                  </div>
                  <p className="text-xs text-academic-text-muted mt-2 leading-relaxed">
                    {res.description}
                  </p>
                  <p className="text-[11px] text-academic-text-muted mt-2 font-mono">
                    Started: {res.startedDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Skills matching PDF Pills */}
          <div className="academic-card p-6 md:p-8 mb-8">
            <h3 className="font-serif font-bold text-lg text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-academic-primary" />
              <span>Skills</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 bg-academic-surface text-academic-dark text-xs font-semibold rounded-md border border-academic-border shadow-2xs hover:border-academic-primary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Experience & Achievements 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience */}
            <div className="academic-card p-6">
              <h3 className="font-serif font-bold text-base text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-academic-primary" />
                <span>Experience</span>
              </h3>
              <div className="space-y-4">
                {student.experiences.map((exp, idx) => (
                  <div key={idx} className="p-3 bg-academic-bg rounded border border-academic-border text-xs">
                    <h4 className="font-bold text-academic-dark">{exp.role}</h4>
                    <p className="text-academic-primary font-semibold text-[11px]">{exp.organization}</p>
                    <p className="text-[10px] text-academic-text-muted font-mono mb-2">{exp.period}</p>
                    <ul className="space-y-1 text-academic-dark/90">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-academic-primary font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="academic-card p-6">
              <h3 className="font-serif font-bold text-base text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
                <Award className="w-4 h-4 text-academic-primary" />
                <span>Achievements & Workshops</span>
              </h3>
              <div className="space-y-4">
                {student.achievements.map((ach, idx) => (
                  <div key={idx} className="p-3 bg-academic-bg rounded border border-academic-border text-xs">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-academic-dark">{ach.title}</h4>
                      {ach.badge && (
                        <span className="text-[10px] bg-academic-accent-soft text-academic-primary px-2 py-0.5 rounded font-mono flex-shrink-0">
                          {ach.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-academic-primary mt-1">
                      Organized by: {ach.organizer}
                    </p>
                    <p className="text-[10px] text-academic-text-muted font-mono mt-0.5">
                      {ach.date}
                    </p>
                    {ach.description && (
                      <p className="text-academic-text-muted mt-1 text-[11px]">
                        {ach.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
