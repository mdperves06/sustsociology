import React from 'react';
import {
  Sparkles,
  Calendar,
  Camera,
  BookOpen,
  Users,
  Award,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SidebarNav } from '../components/layout/SidebarNav';

export const SociologySocietyPage: React.FC = () => {
  const events = [
    {
      title: "Annual Sociological Summit & Youth Colloquium 2026",
      date: "14–15 March 2026",
      description: "Undergraduate research presentations, keynote panels on ecological transition, and inter-university policy debrief.",
      badge: "Flagship Event"
    },
    {
      title: "Publication of 'Samajchitra' Vol. XII",
      date: "20 January 2026",
      description: "Annual sociological wall magazine and printed journal featuring ethnographic essays and field photography.",
      badge: "Editorial Bulletin"
    },
    {
      title: "Haor Basin Environmental Study Tour & Relief Camp",
      date: "5–8 November 2025",
      description: "Four-day immersive fieldwork expedition in Tanguar Haor documenting flood adaptation and distributing health supplies.",
      badge: "Field Practicum"
    },
    {
      title: "National Social Science Debate Fest",
      date: "18 September 2025",
      description: "Hosting 32 universities nationwide debating democratic reforms and socio-economic equality.",
      badge: "Debate & Oratory"
    }
  ];

  const executiveCommittee = [
    { name: "Prof. Dr. A. K. M. Mahbubuzzaman", role: "Chief Patron & Department Head", session: "Faculty Advisor" },
    { name: "Md. Nayeemur Rahman", role: "Moderator (Assistant Professor)", session: "Faculty Advisor" },
    { name: "Kazi Borhan Uddin Rudro", role: "President (Student Body)", session: "Session 2024–25" },
    { name: "Sumaiya Binte Rahman", role: "General Secretary", session: "Session 2024–25" },
    { name: "Alamin Hamid", role: "Research & Publication Secretary", session: "Session 2023–24" },
    { name: "Fariha Tabassum Sneha", role: "Cultural & Fieldwork Coordinator", session: "Session 2024–25" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Student Extracurricular Body"
            title="Sociology Society"
            subtitle="Browse Sociology Society members, academic summits, and cultural initiatives of the Department of Sociology."
          />

          {/* Society Manifesto Card */}
          <div className="academic-card p-6 md:p-8 bg-academic-bg border-l-4 border-academic-primary mb-8 shadow-xs">
            <div className="flex items-center space-x-3 mb-2">
              <Sparkles className="w-6 h-6 text-academic-primary" />
              <h3 className="font-serif font-bold text-xl text-academic-dark">
                Cultivating Intellectual Curiosity & Social Responsibility
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-academic-dark/90 leading-relaxed text-justify">
              The SUST Sociology Society is the vibrant student-led engine that bridges rigorous classroom theory with extracurricular action, debate, cultural expression, and community service. Founded in 1993 alongside the department's inaugural batch, the Society cultivates leadership and civic conscience through annual summits, field expeditions, wall magazines, and student welfare programs.
            </p>
          </div>

          {/* Key Annual Initiatives */}
          <div className="mb-10">
            <h3 className="font-serif font-bold text-xl text-academic-dark mb-4 pb-2 border-b border-academic-border">
              Flagship Programs & Activities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((ev, idx) => (
                <div key={idx} className="academic-card p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-academic-accent-soft text-academic-primary border border-academic-border">
                      {ev.badge}
                    </span>
                    <span className="text-xs text-academic-text-muted font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-academic-primary" />
                      {ev.date}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-academic-dark mt-1">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-academic-text-muted mt-2 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Committee Roster */}
          <div className="academic-card p-6 md:p-8">
            <h3 className="font-serif font-bold text-xl text-academic-dark mb-4 pb-2 border-b border-academic-border">
              Executive Committee (Current Session)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {executiveCommittee.map((exec, idx) => (
                <div key={idx} className="p-3.5 bg-academic-bg rounded border border-academic-border text-xs">
                  <p className="font-bold text-academic-dark font-serif text-sm">{exec.name}</p>
                  <p className="text-academic-primary font-semibold mt-0.5">{exec.role}</p>
                  <p className="text-[11px] text-academic-text-muted mt-0.5 font-mono">{exec.session}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
