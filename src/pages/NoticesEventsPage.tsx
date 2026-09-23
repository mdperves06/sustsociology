import React, { useState, useEffect } from 'react';
import {
  Bell,
  Calendar,
  Download,
  Clock,
  MapPin,
  CheckCircle,
  FileText,
  AlertCircle,
  Users,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SidebarNav } from '../components/layout/SidebarNav';
import { dataService } from '../services/dataService';
import { NoticeItem, EventItem } from '../types';

export const NoticesEventsPage: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState<'notices' | 'events' | 'downloads'>('notices');
  const [noticeCategory, setNoticeCategory] = useState<string>('All');
  const [rsvpdEventId, setRsvpdEventId] = useState<string | null>(null);

  useEffect(() => {
    setNotices(dataService.getNotices());
    setEvents(dataService.getEvents());
  }, []);

  const handleRSVP = (eventId: string) => {
    dataService.rsvpEvent(eventId);
    setEvents(dataService.getEvents());
    setRsvpdEventId(eventId);
    setTimeout(() => setRsvpdEventId(null), 3000);
  };

  const categories = ['All', 'Academic', 'GSC & Research', 'Event', 'Scholarship'];

  const filteredNotices = notices.filter((n) => {
    if (noticeCategory === 'All') return true;
    return n.category === noticeCategory;
  });

  const academicDownloads = [
    {
      title: "BSS (Hons.) in Sociology 4-Year Syllabus & Curriculum (GSC)",
      description: "Complete course descriptions, credit breakdown, and reading lists for Semesters 1 through 8.",
      size: "2.4 MB • PDF",
      code: "SYLL-BSS-2024"
    },
    {
      title: "Master of Social Science (MSS) General & Thesis Guidelines",
      description: "Dissertation formatting requirements, defense protocols, and graduation prerequisites.",
      size: "1.8 MB • PDF",
      code: "GUIDE-MSS-2024"
    },
    {
      title: "Undergraduate Residential Field Camp & Ethics Handbook",
      description: "Fieldwork safety protocols, survey consent forms, and participatory rural appraisal guide.",
      size: "3.1 MB • PDF",
      code: "ETHICS-CAMP-2024"
    },
    {
      title: "M.Phil. and Ph.D. Dissertation Proposal Submission Template",
      description: "Official Graduate Studies Committee template for prospective doctoral scholars.",
      size: "850 KB • DOCX",
      code: "FORM-GSC-PHD"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Official Institutional Despatch"
            title="Notice Board & Department Events"
            subtitle="Stay informed on academic schedules, Graduate Studies Committee defenses, upcoming reunions, and downloadable curricula."
          />

          {/* Sub Navigation Bar */}
          <div className="flex space-x-2 border-b border-academic-border pb-4 mb-8">
            <button
              onClick={() => setActiveTab('notices')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'notices'
                  ? 'bg-academic-primary text-white shadow-xs'
                  : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Official Notices ({notices.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'events'
                  ? 'bg-academic-primary text-white shadow-xs'
                  : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Events & Reunions ({events.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('downloads')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'downloads'
                  ? 'bg-academic-primary text-white shadow-xs'
                  : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Curriculum Downloads</span>
            </button>
          </div>

          {/* NOTICES TAB */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNoticeCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      noticeCategory === cat
                        ? 'bg-academic-primary text-white border-academic-primary'
                        : 'bg-white hover:bg-academic-bg text-academic-dark border border-academic-border'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className={`academic-card p-5 ${
                      notice.urgent ? 'border-l-4 border-l-rose-600 bg-rose-50/20' : 'bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-academic-accent-soft text-academic-primary border border-academic-border">
                          {notice.category}
                        </span>
                        {notice.urgent && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
                            Urgent Notice
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-academic-text-muted font-mono">
                        {notice.publishedDate}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-academic-dark">
                      {notice.title}
                    </h3>

                    <p className="text-xs text-academic-text-muted mt-2 leading-relaxed">
                      {notice.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-academic-border/60 flex justify-between items-center text-xs">
                      <span className="text-[11px] text-academic-text-muted">
                        Department of Sociology • Academic Office
                      </span>
                      <a
                        href="#download"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Official Circular Download: " + notice.title);
                        }}
                        className="inline-flex items-center space-x-1 text-academic-primary font-semibold hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Notice Circular</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="academic-card p-6 bg-white border border-academic-border">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 mb-4 border-b border-academic-border">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-academic-primary text-white">
                          {event.category}
                        </span>
                        {event.featured && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                            Flagship Gathering
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-xl text-academic-dark">
                        {event.title}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <span className="text-xl font-bold font-serif text-academic-primary block">
                          {event.rsvpCount}
                        </span>
                        <span className="text-[10px] uppercase text-academic-text-muted font-semibold">
                          Confirmed RSVPs
                        </span>
                      </div>
                      <button
                        onClick={() => handleRSVP(event.id)}
                        className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs ${
                          rsvpdEventId === event.id
                            ? 'bg-emerald-700 text-white'
                            : 'bg-academic-primary hover:bg-academic-primary-hover text-white'
                        }`}
                      >
                        {rsvpdEventId === event.id ? 'RSVP Confirmed ✓' : 'Register / RSVP'}
                      </button>
                    </div>
                  </div>

                  {/* Date, Time, Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-academic-bg rounded border border-academic-border text-xs mb-4">
                    <div className="flex items-center space-x-2 text-academic-dark">
                      <Calendar className="w-4 h-4 text-academic-primary flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-academic-dark">
                      <Clock className="w-4 h-4 text-academic-primary flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-academic-dark">
                      <MapPin className="w-4 h-4 text-academic-primary flex-shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-academic-text-muted leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {event.speakers && event.speakers.length > 0 && (
                    <div className="pt-3 border-t border-academic-border/60">
                      <span className="text-[11px] font-bold text-academic-dark uppercase tracking-wider block mb-1.5">
                        Keynote Speakers & Guests:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {event.speakers.map((spk, i) => (
                          <span
                            key={i}
                            className="text-xs bg-academic-surface text-academic-dark px-2.5 py-1 rounded border border-academic-border"
                          >
                            {spk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CURRICULUM DOWNLOADS TAB */}
          {activeTab === 'downloads' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {academicDownloads.map((doc, idx) => (
                <div key={idx} className="academic-card p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono font-bold text-academic-primary bg-academic-accent-soft px-2 py-0.5 rounded border border-academic-border">
                        {doc.code}
                      </span>
                      <span className="text-[11px] text-academic-text-muted">
                        {doc.size}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-academic-dark mt-1">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-academic-text-muted mt-2 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-academic-border/60">
                    <button
                      onClick={() => alert(`Downloading official document: ${doc.title}`)}
                      className="w-full py-2 bg-academic-bg hover:bg-academic-primary hover:text-white text-academic-dark rounded text-xs font-semibold border border-academic-border transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Official PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
