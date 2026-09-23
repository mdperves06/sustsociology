import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Compass,
  CheckCircle,
  Building,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SidebarNav } from '../components/layout/SidebarNav';
import { DEPARTMENT_INFO } from '../data/department';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        {/* Lateral Sidebar Navigation matching PDF */}
        <SidebarNav />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Institutional Archive & Overview"
            title="About the Department of Sociology"
            subtitle="Pioneering sociological scholarship, humanistic inquiry, and empirical field research in Bangladesh since 1992."
          />

          {/* Department Head Welcome Note */}
          <div className="academic-card p-6 md:p-8 bg-academic-bg border-l-4 border-academic-primary mb-10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-academic-border shadow-xs flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Head of Department"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-academic-primary uppercase tracking-wider block">
                  Message from the Department Head
                </span>
                <h3 className="font-serif font-bold text-xl text-academic-dark mt-1">
                  Prof. Dr. A. K. M. Mahbubuzzaman
                </h3>
                <p className="text-xs text-academic-text-muted mb-3">
                  Professor & Head, Department of Sociology, SUST
                </p>
                <p className="text-xs sm:text-sm text-academic-dark/90 leading-relaxed italic font-serif">
                  "Sociology is the compass with which we navigate human institutions, collective dilemmas, and equitable futures. At SUST, we challenge our students to transcend superficial commentary and undertake rigorous, empirically verified social research that serves the common good."
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Historical Chronicle */}
          <div className="academic-card p-6 md:p-8 mb-10">
            <h3 className="font-serif font-bold text-2xl text-academic-dark mb-4 pb-2 border-b border-academic-border">
              Historical Evolution & Foundation
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify">
              <p>
                The Department of Sociology at Shahjalal University of Science and Technology (SUST) began its academic journey in the <strong>1992–93 session</strong> by admitting approximately <strong>30 undergraduate students</strong>. Its primary objective was to disseminate humanistic and scientific knowledge about human beings and their social worlds. Since its inception, the Department has evolved into one of the oldest and most reputed academic units of SUST.
              </p>
              <p>
                To date, the Department has successfully awarded Bachelor’s and Master’s degrees to around <strong>1,315 students across twenty batches</strong>. Many of these graduates have produced excellent theses that contribute significantly to the Department’s vision and mission. Over the years, numerous alumni have pursued higher studies at prestigious universities around the world, while many others have established themselves in diverse professional sectors—including academia, public administration, finance, industry, health, NGOs, and other areas—playing crucial roles in national development.
              </p>
              <p>
                Beyond academics, students actively participate in sports, cultural, and extracurricular activities, fostering a holistic learning environment. With the commitment and academic excellence of its faculty members, the Department strives to equip students with critical sociological insight and applied analytical skills, enabling them to engage effectively with diverse societies and professional domains.
              </p>
            </div>

            {/* Historical Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-academic-border">
              <div className="p-4 bg-academic-bg rounded border border-academic-border text-center">
                <span className="text-2xl font-bold font-serif text-academic-primary">1992–93</span>
                <p className="text-xs font-semibold text-academic-dark mt-1">Foundation Session</p>
                <p className="text-[11px] text-academic-text-muted mt-0.5">Admitted first 30 scholars</p>
              </div>
              <div className="p-4 bg-academic-bg rounded border border-academic-border text-center">
                <span className="text-2xl font-bold font-serif text-academic-primary">1,315+</span>
                <p className="text-xs font-semibold text-academic-dark mt-1">Graduates Conferred</p>
                <p className="text-[11px] text-academic-text-muted mt-0.5">Across 20 historical batches</p>
              </div>
              <div className="p-4 bg-academic-bg rounded border border-academic-border text-center">
                <span className="text-2xl font-bold font-serif text-academic-primary">4 Degree</span>
                <p className="text-xs font-semibold text-academic-dark mt-1">Academic Programs</p>
                <p className="text-[11px] text-academic-text-muted mt-0.5">BSS, MSS, M.Phil., Ph.D.</p>
              </div>
            </div>
          </div>

          {/* Academic Degrees & GSC Curriculum */}
          <div className="academic-card p-6 md:p-8 mb-10">
            <h3 className="font-serif font-bold text-2xl text-academic-dark mb-2">
              Academic Degrees & Graduate Studies Committee (GSC)
            </h3>
            <p className="text-xs sm:text-sm text-academic-text-muted mb-6">
              Our curriculum blends theoretical mastery with field research practicums, supervised by the Graduate Studies Committee.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-academic-bg rounded-lg border border-academic-border">
                <div className="flex items-center space-x-2 text-academic-primary mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-base text-academic-dark">
                    Bachelor of Social Science (BSS Hons.)
                  </h4>
                </div>
                <p className="text-xs text-academic-text-muted mb-3">
                  Four-year comprehensive undergraduate program providing rigorous grounding in classical theory, social demography, research methods, and statistics.
                </p>
                <ul className="text-xs space-y-1 text-academic-dark/90">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>8 Semesters • 140+ Credit Hours</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>Mandatory Residential Field Camp & SPSS Lab</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>Undergraduate Research Monograph</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-academic-bg rounded-lg border border-academic-border">
                <div className="flex items-center space-x-2 text-academic-primary mb-2">
                  <BookOpen className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-base text-academic-dark">
                    Master of Social Science (MSS)
                  </h4>
                </div>
                <p className="text-xs text-academic-text-muted mb-3">
                  Offered in General and Thesis tracks, focusing on specialized sub-disciplines including environmental sociology, development, and gender.
                </p>
                <ul className="text-xs space-y-1 text-academic-dark/90">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>Thesis Track (Supervised Empirical Dissertation)</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>General Track (Applied Policy & Internship)</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>Seminar Defense and Peer Review</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-academic-bg rounded-lg border border-academic-border">
                <div className="flex items-center space-x-2 text-academic-primary mb-2">
                  <Award className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-base text-academic-dark">
                    Master of Philosophy (M.Phil.)
                  </h4>
                </div>
                <p className="text-xs text-academic-text-muted mb-3">
                  Two-year advanced research degree designed for scholars pursuing university academic careers and institutional social research.
                </p>
                <ul className="text-xs space-y-1 text-academic-dark/90">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>Coursework in Advanced Epistemology</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>Independent Fieldwork Dissertation</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-academic-bg rounded-lg border border-academic-border">
                <div className="flex items-center space-x-2 text-academic-primary mb-2">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-base text-academic-dark">
                    Doctor of Philosophy (Ph.D.)
                  </h4>
                </div>
                <p className="text-xs text-academic-text-muted mb-3">
                  Terminal doctoral research program producing original, peer-reviewed contributions to the global discipline of sociology.
                </p>
                <ul className="text-xs space-y-1 text-academic-dark/90">
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>External International Evaluation</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-academic-primary" />
                    <span>Mandatory Scopus/Web of Science Publication</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Facilities Detail */}
          <div className="academic-card p-6 md:p-8">
            <h3 className="font-serif font-bold text-2xl text-academic-dark mb-4 pb-2 border-b border-academic-border">
              Department Facilities & Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DEPARTMENT_INFO.facilities.map((fac, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 bg-academic-bg rounded border border-academic-border">
                  <div className="w-8 h-8 rounded bg-academic-primary text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-academic-dark">
                      {fac.title}
                    </h4>
                    <p className="text-xs text-academic-text-muted mt-1 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
