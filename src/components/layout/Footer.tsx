import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-academic-dark text-[#FAF7EE] border-t-4 border-academic-primary mt-20">
      {/* Secondary Quick Nav Bar matching PDF */}
      <div className="border-b border-[#332E2B] py-4 bg-[#141210]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-academic-accent">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>•</span>
            <Link to="/faculty" className="hover:text-white transition-colors">Faculty</Link>
            <span>•</span>
            <Link to="/batch" className="hover:text-white transition-colors">Batch</Link>
            <span>•</span>
            <Link to="/alumni" className="hover:text-white transition-colors">Alumni</Link>
            <span>•</span>
            <Link to="/sociology-society" className="hover:text-white transition-colors">Society</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Social Icons matching PDF */}
          <div className="flex items-center space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SUST Facebook"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-academic-primary transition-colors text-xs font-bold"
            >
              f
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SUST LinkedIn"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-academic-primary transition-colors text-xs font-bold"
            >
              in
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SUST Instagram"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-academic-primary transition-colors text-xs font-bold"
            >
              ig
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SUST YouTube"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-academic-primary transition-colors text-xs font-bold"
            >
              yt
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Layout from PDF */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About Us */}
          <div>
            <h4 className="text-sm font-bold text-academic-accent uppercase tracking-wider mb-4 border-l-2 border-academic-primary pl-2">
              About Us
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">Overview & History</Link></li>
              <li><a href="https://www.sust.edu" target="_blank" rel="noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">University Facts & Acts <ExternalLink className="w-2.5 h-2.5 opacity-60" /></a></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Vision & Mission</Link></li>
              <li><span className="text-gray-400">Health Insurance & Student Welfare</span></li>
              <li><Link to="/student-success-story" className="hover:text-white transition-colors">Achievements & Laurels</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Location, Maps and Direction</Link></li>
              <li><a href="https://www.sust.edu" target="_blank" rel="noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">Visit SUST Campus <ExternalLink className="w-2.5 h-2.5 opacity-60" /></a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 2: Academics */}
          <div>
            <h4 className="text-sm font-bold text-academic-accent uppercase tracking-wider mb-4 border-l-2 border-academic-primary pl-2">
              Academics
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="https://www.sust.edu/schools" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">School of Social Sciences</a></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Curriculum Areas (GSC)</Link></li>
              <li><Link to="/batch" className="hover:text-white transition-colors">Batch Sessions & Registry</Link></li>
              <li><span className="text-gray-400">Central Library & Digital Archives</span></li>
              <li><span className="text-gray-400">Transcript and Certificates</span></li>
              <li><Link to="/research" className="hover:text-white transition-colors">Funded Field Projects</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Career Pathways in Sociology</Link></li>
            </ul>
          </div>

          {/* Col 3: Research */}
          <div>
            <h4 className="text-sm font-bold text-academic-accent uppercase tracking-wider mb-4 border-l-2 border-academic-primary pl-2">
              Research & Outreach
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/research" className="hover:text-white transition-colors">SUST Social Science Journals</Link></li>
              <li><Link to="/research" className="hover:text-white transition-colors">Annual Sociological Conference</Link></li>
              <li><Link to="/research" className="hover:text-white transition-colors">Online Journal Repository</Link></li>
              <li><span className="text-gray-400">Center for Research & Consultancy (CRTC)</span></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Advanced Computer & Data Lab</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Sociology Seminar Library</Link></li>
            </ul>
          </div>

          {/* Col 4: Crest & Institutional Brand */}
          <div className="flex flex-col items-start lg:items-end text-left lg:text-right">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-academic-accent/40 flex items-center justify-center p-2 mb-3">
              <svg viewBox="0 0 100 100" className="w-full h-full text-academic-accent fill-current">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#DECF9E" strokeWidth="4"/>
                <circle cx="50" cy="50" r="38" fill="none" stroke="#DECF9E" strokeWidth="1.5" strokeDasharray="3 2"/>
                <path d="M50 18 L53 32 L66 32 L55 41 L59 55 L50 46 L41 55 L45 41 L34 32 L47 32 Z" fill="#DECF9E"/>
                <text x="50" y="74" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#FAF7EE" textAnchor="middle">SUST</text>
              </svg>
            </div>
            <h3 className="font-serif text-lg font-bold text-white tracking-wide">
              SUST Department of Sociology
            </h3>
            <p className="text-xs text-academic-accent mt-1 italic font-serif">
              "Understanding Society. Inspiring Change."
            </p>
            <p className="text-[11px] text-gray-400 mt-3 max-w-xs">
              Pioneering critical social analysis, field ethnography, and public policy impact in Bangladesh since 1992.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 w-full text-[11px] text-gray-400 flex flex-col items-start lg:items-end">
              <span>Academic Building D, Kumargaon, Sylhet-3114</span>
              <span className="text-academic-accent/80 font-mono mt-0.5">sociology@sust.edu</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#292524] flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Department of Sociology, Shahjalal University of Science and Technology. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 text-[11px]">
            Engineered to Academic Excellence Standard • Sylhet, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};
