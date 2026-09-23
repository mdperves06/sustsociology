import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { SidebarNav } from '../components/layout/SidebarNav';
import { DEPARTMENT_INFO } from '../data/department';
import { dataService } from '../services/dataService';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    try {
      dataService.submitContactMessage({
        fullName: formData.fullName,
        email: formData.email,
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
      });

      setSubmitted(true);
      setError(null);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch {
      setError('An error occurred while saving your inquiry. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        <SidebarNav />

        <main className="flex-1 min-w-0">
          <SectionHeader
            badge="Institutional Liaison"
            title="Contact Us"
            subtitle="We're here to connect with you. Have questions about our programs, admissions, research, or partnerships? Reach out to us, we'd love to hear from you."
          />

          {/* Response Promise Strip matching PDF Page 10 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-academic-surface rounded-lg border border-academic-border flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-academic-accent-soft flex items-center justify-center text-academic-primary flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-academic-dark">We Respond</h4>
                <p className="text-xs text-academic-text-muted mt-0.5">
                  Our academic office typically responds within 1–2 business days.
                </p>
              </div>
            </div>

            <div className="p-4 bg-academic-surface rounded-lg border border-academic-border flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-academic-accent-soft flex items-center justify-center text-academic-primary flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-academic-dark">Visit Us</h4>
                <p className="text-xs text-academic-text-muted mt-0.5">
                  You are always welcome to visit our department during working hours.
                </p>
              </div>
            </div>
          </div>

          {/* 2-Column: Contact Details & Send Us a Message Form matching PDF Page 10 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Left: Department Contact Details Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="academic-card p-6 space-y-5 bg-white">
                <div>
                  <span className="text-[11px] font-bold text-academic-primary uppercase tracking-widest block">
                    Institutional Location
                  </span>
                  <h3 className="font-serif font-bold text-lg text-academic-dark mt-0.5">
                    Department of Sociology
                  </h3>
                  <p className="text-xs text-academic-text-muted mt-1 leading-relaxed">
                    {DEPARTMENT_INFO.contact.address}
                  </p>
                </div>

                <div className="pt-3 border-t border-academic-border/60">
                  <span className="text-[11px] font-bold text-academic-text-muted uppercase tracking-wider block mb-1">
                    Official Email:
                  </span>
                  <div className="text-xs space-y-1">
                    <p className="text-academic-primary font-medium">{DEPARTMENT_INFO.contact.email}</p>
                    <p className="text-academic-text-muted">{DEPARTMENT_INFO.contact.generalInquiryEmail} (General inquiries)</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-academic-border/60">
                  <span className="text-[11px] font-bold text-academic-text-muted uppercase tracking-wider block mb-1">
                    Office Hours:
                  </span>
                  <div className="text-xs space-y-1 text-academic-dark/90">
                    <p>{DEPARTMENT_INFO.contact.officeHoursWeekdays}</p>
                    <p>{DEPARTMENT_INFO.contact.officeHoursFriday}</p>
                    <p className="text-[11px] text-academic-text-muted italic">{DEPARTMENT_INFO.contact.closedNotice}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-academic-border/60">
                  <span className="text-[11px] font-bold text-academic-text-muted uppercase tracking-wider block mb-1">
                    Telephone:
                  </span>
                  <div className="text-xs space-y-1">
                    <p className="text-academic-dark font-mono">{DEPARTMENT_INFO.contact.phoneOffice} (Office)</p>
                    <p className="text-academic-dark font-mono">+880 1712-345678 (Department Head)</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-academic-border/60">
                  <span className="text-[11px] font-bold text-academic-text-muted uppercase tracking-wider block mb-1">
                    University Web Portal:
                  </span>
                  <a
                    href="https://www.sust.edu"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-academic-primary hover:underline flex items-center gap-1"
                  >
                    <span>www.sust.edu</span>
                    <Globe className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: "Send Us a Message" Form matching PDF Page 10 */}
            <div className="lg:col-span-7">
              <div className="academic-card p-6 md:p-8 bg-academic-bg border border-academic-border">
                <h3 className="font-serif font-bold text-xl text-academic-dark mb-1">
                  Send Us a Message
                </h3>
                <p className="text-xs text-academic-text-muted mb-6">
                  Fill out the form below and we'll get back to you promptly.
                </p>

                {submitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                    <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-serif font-bold text-base text-emerald-900">
                      Message Transmitted Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 mt-1">
                      Thank you for contacting the Department of Sociology, SUST. Your inquiry has been forwarded to the administrative desk.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-4 py-1.5 bg-emerald-700 text-white rounded text-xs font-semibold hover:bg-emerald-800 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter Your Full Name"
                        className="w-full px-3.5 py-2.5 bg-white rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter Your Email Address"
                        className="w-full px-3.5 py-2.5 bg-white rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Enter Your Subject"
                        className="w-full px-3.5 py-2.5 bg-white rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-academic-dark uppercase tracking-wider mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Enter Your Message here"
                        className="w-full px-3.5 py-2.5 bg-white rounded border border-academic-border text-xs focus:outline-none focus:border-academic-primary shadow-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-academic-primary hover:bg-academic-primary-hover text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-academic flex items-center justify-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Location Map Section matching PDF Page 10 */}
          <div className="academic-card p-6 md:p-8 bg-white">
            <h3 className="font-serif font-bold text-xl text-academic-dark mb-4 pb-2 border-b border-academic-border flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-academic-primary" />
              <span>Our Location & Campus Direction</span>
            </h3>
            <p className="text-xs text-academic-text-muted mb-4">
              Shahjalal University of Science and Technology campus is located in Kumargaon, Sylhet, along the Sylhet–Sunamganj highway.
            </p>

            {/* Responsive Map Embed Container */}
            <div className="w-full h-80 rounded-lg overflow-hidden border border-academic-border relative">
              <iframe
                title="SUST Department of Sociology Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.6651717329587!2d91.83151241500366!3d24.921319784024844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750552bc71c99bd%3A0x6e7e834661858564!2sShahjalal%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
