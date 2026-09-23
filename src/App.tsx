import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickSearchModal } from './components/common/QuickSearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FacultyDirectoryPage } from './pages/FacultyDirectoryPage';
import { FacultyDetailPage } from './pages/FacultyDetailPage';
import { BatchDirectoryPage } from './pages/BatchDirectoryPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { ResearchPortalPage } from './pages/ResearchPortalPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';
import { SuccessStoryPage } from './pages/SuccessStoryPage';
import { SuccessStoryDetailPage } from './pages/SuccessStoryDetailPage';
import { JobsPage } from './pages/JobsPage';
import { AlumniPage } from './pages/AlumniPage';
import { SociologySocietyPage } from './pages/SociologySocietyPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { LibraryPage } from './pages/LibraryPage';
import { NoticesEventsPage } from './pages/NoticesEventsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-academic-bg text-academic-text">
      <ScrollToTop />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faculty" element={<FacultyDirectoryPage />} />
          <Route path="/faculty/:id" element={<FacultyDetailPage />} />
          <Route path="/batch" element={<BatchDirectoryPage />} />
          <Route path="/batch/:batchId" element={<BatchDirectoryPage />} />
          <Route path="/batch/:batchId/student/:studentId" element={<StudentProfilePage />} />
          <Route path="/research" element={<ResearchPortalPage />} />
          <Route path="/research/:id" element={<ResearchDetailPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/student-success-story" element={<SuccessStoryPage />} />
          <Route path="/student-success-story/:id" element={<SuccessStoryDetailPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/notices" element={<NoticesEventsPage />} />
          <Route path="/events" element={<NoticesEventsPage />} />
          <Route path="/sociology-society" element={<SociologySocietyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Quick Search Modal (Cmd+K / Ctrl+K) */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
};

export default App;
