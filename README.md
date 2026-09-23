# Department of Sociology — Shahjalal University of Science & Technology (SUST)

> *"Understanding Society. Inspiring Change."*

A production-grade, responsive academic web application and Content Management System (CMS) architecture designed and built for the **Department of Sociology, Shahjalal University of Science and Technology (SUST), Sylhet, Bangladesh**.

---

## 🏛️ Institutional Grounding & Architecture

Established in the **1992–93 session** with ~30 undergraduate scholars, the Department of Sociology is one of the oldest and most prestigious academic units at SUST. To date, the department has conferred Bachelor's and Master's degrees to over **1,315 graduates across 20 batches**, playing pivotal roles in global research, international development bodies, national public administration, and technology companies.

This application translates the institutional heritage, academic rigor, and layout specification of `SOCIOLOGY.pdf` into a responsive, accessible, and high-performance digital web application.

---

## 🎨 Design System & Aesthetic Identity

- **Visual Direction:** Oxford University & London School of Economics (LSE) editorial depth harmonized with SUST's regional academic ethos.
- **Palette Tokens:**
  - `primary`: `#8E651E` / `#A3752A` (Deep Academic Earth / Bronze-Gold)
  - `primary-dark`: `#1C1917` (Rich Charcoal-Wood)
  - `accent`: `#DECF9E` / `#F4EEDA` (Warm Heritage Amber)
  - `background-neutral`: `#FAF7EE` / `#FDFBF7` (Editorial Warm Off-White)
  - `surface-card`: `#F8F3DC` / `#FFFFFF` (Subtle Cream-Sand)
  - `border`: `#E8DCB1` (1px Micro-borders)
- **Typography:**
  - Headings: *Playfair Display* (Editorial Serif)
  - Body & UI: *Inter* (Crisp, modern Sans)

---

## 🧭 Route Hierarchy & Features

| Route | View | Description |
|---|---|---|
| `/` | **Homepage** | Hero, institutional metrics, welcome message, curricula pillars, featured research, faculty highlights, facilities, and global career teaser. |
| `/about` | **About Department** | Full chronicle from 1992-93 founding, degrees under Graduate Studies Committee (GSC), Head of Department welcome address, and facility profiles. |
| `/faculty` | **Faculty Directory** | Filterable by academic ranks (Professors, Associate Professors, Assistant Professors, Lecturers) with live keyword search. |
| `/faculty/:id` | **Faculty Profile** | Detailed academic dossiers with bio, qualifications timeline, research interests, courses taught, and publications. |
| `/batch` | **Batch Directory** | Session selector (e.g., 2024-2025, 2023-2024), gender ratio counters, cohort photos, and student directory cards with bulk CSV import. |
| `/batch/:batchId/student/:studentId` | **Student Profile** | Pixel-accurate reproduction of PDF Page 2 (Kazi Borhan Uddin Rudro) with printable academic CV trigger, degrees, skills, research, and experience. |
| `/alumni` | **Alumni Association Portal** | Complete community suite: Global Directory, Emergency Blood Lifeline, Alumni Self-Registration, 1-on-1 Mentorship Booking, Giving Fund & Virtual Alumni ID Card. |
| `/jobs` | **Jobs & Career Board** | Dual view: Live Alumni Jobs & Internships board with direct application modal & opportunity posting form, plus 18 global sector mappings from PDF Page 6. |
| `/notices` & `/events` | **Notice Board & Events** | Department circulars with urgent alerts, reunion RSVPs, and syllabus/curriculum download center. |
| `/library` | **Library & Thesis Archive** | Search over 30 years of undergraduate monographs, graduate dissertations, and doctoral theses in Academic Building D. |
| `/research` | **Research Portal** | Filterable by thematic tags (`environmental`, `river geomorphology`, `gravel mining`) with instant citation generator (APA, Chicago, Harvard, BibTeX). |
| `/research/:id` | **Publication Reader** | Full abstract, methodology, authors, affiliations, DOI, and PDF download handler. |
| `/student-success-story` | **Success Stories** | Spotlighting student and alumni breakthroughs (e.g. UN Biosecurity Fellowship, Asian Youngest 100 Scientist, Google UX, World Bank). |
| `/student-success-story/:id` | **Story Reader** | Long-form editorial narrative with pull quotes and career milestones. |
| `/sociology-society` | **Sociology Society** | Department club, annual sociology summits, *Samajchitra* wall magazine, debate fest, and executive committee. |
| `/contact` | **Contact & Map** | Official office hours, validated inquiry form with local persistence, and interactive SUST campus map embed. |
| `/admin` | **Admin CMS** | PIN-protected dashboard (`1992`) with full control over stats, faculty, bulk CSV student/alumni imports, notices, jobs, and backup restore. |

---

## 🛠️ Technology Stack

- **Core:** React 18, TypeScript (Strict Mode)
- **Tooling:** Vite 6, PostCSS, Autoprefixer
- **Styling:** Tailwind CSS v3 with custom institutional tokens
- **Icons:** `lucide-react`
- **Routing:** `react-router-dom` v6
- **Data Layer:** Decoupled Data Services Architecture (`src/data/*` and `src/services/dataService.ts`) with persistent `localStorage` synchronization and JSON export/import.

---

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mdperves06/sustsociology.git
   cd sustsociology
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🔐 Admin CMS Access

- Navigate to `/admin` or click **Admin CMS** in the top navigation bar.
- Default Security PIN: `1992` (honoring the department's founding session).
- Features: Live statistic modifications, faculty additions/removals, research publishing, success stories editing, submitted inquiry management, and JSON backup export/import.

---

## 📜 Ethical Academic Data Notice

In adherence to academic integrity guidelines, mock duplicate entries from preliminary drafts are badged with `"Sample Academic Profile — Update via Admin"` or `"Demo Dataset"`. Real faculty private emails and contact numbers are preserved as institutional directory extensions.

---

*Shahjalal University of Science and Technology (SUST), Kumargaon, Sylhet-3114, Bangladesh.*
