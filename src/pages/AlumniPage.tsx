import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Globe,
  MapPin,
  Heart,
  Send,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SidebarNav } from '../components/layout/SidebarNav';

export const AlumniPage: React.FC = () => {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    batchSession: '2015-2016',
    email: '',
    currentOrg: '',
    role: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  const alumniChapters = [
    {
      city: "Sylhet Chapter (Headquarters)",
      members: "600+ Members",
      coordinator: "Syed Kamrul Hasan (Batch 1996–97)",
      venue: "Academic Building D, SUST Campus",
      contact: "alumni.sylhet@sust.edu"
    },
    {
      city: "Dhaka Regional Chapter",
      members: "450+ Members",
      coordinator: "Dr. Farhana Yasmin (Batch 2002–03)",
      venue: "Dhanmondi Club / Gulshan Club, Dhaka",
      contact: "alumni.dhaka@sust.edu"
    },
    {
      city: "UK & European Diaspora Chapter",
      members: "180+ Members",
      coordinator: "Tanvir Ahmed (Batch 1999–2000)",
      venue: "London & Birmingham, United Kingdom",
      contact: "alumni.uk@sust.edu"
    },
    {
      city: "North America (USA & Canada)",
      members: "120+ Members",
      coordinator: "Dr. Rashedul Islam (Batch 2005–06)",
      venue: "New York & Toronto",
      contact: "alumni.na@sust.edu"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Lifelong Fellowship"
            title="Alumni Association"
            subtitle="Browse Alumni Association members and regional chapters of the Department of Sociology."
          />

          {/* Alumni Metrics Banner matching PDF Page 8 */}
          <div className="bg-academic-surface rounded-lg p-6 border border-academic-border mb-8 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-academic-border">
              <div className="p-2">
                <span className="text-3xl font-serif font-bold text-academic-primary block">
                  1,315+
                </span>
                <span className="text-xs uppercase font-semibold text-academic-dark">
                  Historical Graduates
                </span>
                <span className="text-[11px] text-academic-text-muted block mt-0.5">
                  Across 20 Batches
                </span>
              </div>

              <div className="p-2 pt-3 sm:pt-2">
                <span className="text-3xl font-serif font-bold text-academic-dark block">
                  4
                </span>
                <span className="text-xs uppercase font-semibold text-academic-dark">
                  Global Chapters
                </span>
                <span className="text-[11px] text-academic-text-muted block mt-0.5">
                  Sylhet, Dhaka, UK, USA
                </span>
              </div>

              <div className="p-2 pt-3 sm:pt-2">
                <span className="text-3xl font-serif font-bold text-academic-dark block">
                  100+
                </span>
                <span className="text-xs uppercase font-semibold text-academic-dark">
                  PhD & Postdocs
                </span>
                <span className="text-[11px] text-academic-text-muted block mt-0.5">
                  In Global Academia
                </span>
              </div>

              <div className="p-2 pt-3 sm:pt-2">
                <span className="text-3xl font-serif font-bold text-academic-primary block">
                  33
                </span>
                <span className="text-xs uppercase font-semibold text-academic-dark">
                  Years of Brotherhood
                </span>
                <span className="text-[11px] text-academic-text-muted block mt-0.5">
                  Since 1992–93
                </span>
              </div>
            </div>
          </div>

          {/* Regional Chapters */}
          <div className="mb-10">
            <h3 className="font-serif font-bold text-xl text-academic-dark mb-4 pb-2 border-b border-academic-border">
              Active Regional & International Chapters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alumniChapters.map((ch, idx) => (
                <div key={idx} className="academic-card p-5">
                  <div className="flex items-center space-x-2 text-academic-primary mb-2">
                    <Globe className="w-4 h-4" />
                    <h4 className="font-serif font-bold text-base text-academic-dark">
                      {ch.city}
                    </h4>
                  </div>
                  <p className="text-xs text-academic-primary font-semibold">{ch.members}</p>
                  <p className="text-xs text-academic-text-muted mt-2">
                    Coordinator: <strong className="text-academic-dark">{ch.coordinator}</strong>
                  </p>
                  <p className="text-xs text-academic-text-muted mt-1">
                    Hub: {ch.venue}
                  </p>
                  <p className="text-[11px] font-mono text-academic-primary mt-2">
                    {ch.contact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Alumni Registration Form */}
          <div className="academic-card p-6 md:p-8 bg-academic-bg border border-academic-border">
            <h3 className="font-serif font-bold text-xl text-academic-dark mb-2">
              Join the SUST Sociology Alumni Network
            </h3>
            <p className="text-xs sm:text-sm text-academic-text-muted mb-6">
              Update your contact information, mentor current undergraduates, or contribute to departmental initiatives.
            </p>

            {registered ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-serif font-bold text-base text-emerald-900">
                  Welcome Back to the Fellowship!
                </h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Your alumni details have been recorded. The executive committee will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2 bg-white rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                    Graduating Batch / Session *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.batchSession}
                    onChange={(e) => setFormData({ ...formData, batchSession: e.target.value })}
                    placeholder="e.g. 2014-2015"
                    className="w-full px-3.5 py-2 bg-white rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3.5 py-2 bg-white rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                    Current Organization & Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Senior Researcher, World Bank"
                    className="w-full px-3.5 py-2 bg-white rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-xs"
                  >
                    Submit Alumni Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
