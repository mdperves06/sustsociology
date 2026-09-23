import { EventItem } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "ev-01",
    title: "SUST Sociology Grand Alumni Reunion & Fellowship 2026",
    date: "18 December 2026",
    time: "09:00 AM – 09:00 PM BST",
    venue: "SUST Central Auditorium & Academic Building D Lawn, Sylhet",
    category: "Reunion",
    description: "Bringing together 33 years of graduates from the founding 1992-93 batch to the latest 2024 cohort for an unforgettable day of camaraderie, memory sharing, and student mentorship.",
    speakers: ["Prof. Dr. A. K. M. Mahbubuzzaman", "Syed Kamrul Hasan", "Dr. Sultana Raziya", "Salman F. Rahman"],
    rsvpCount: 420,
    featured: true
  },
  {
    id: "ev-02",
    title: "International Symposium on Fluvial Geomorphology & Social Transition",
    date: "14–15 November 2026",
    time: "10:00 AM – 05:00 PM BST",
    venue: "Conference Room, Central Library, SUST",
    category: "Conference",
    description: "Keynote symposium addressing the Lubha River gravel mining research, ecological thresholds, and regional riverine community livelihood security.",
    speakers: ["Dr. Md. Sadiul Alam", "Prof. Jim Best", "Dr. A. K. M. Mahbubuzzaman"],
    rsvpCount: 185,
    featured: true
  },
  {
    id: "ev-03",
    title: "Masterclass: Computational Social Science & Qualitative Coding in NVivo",
    date: "25 October 2026",
    time: "02:30 PM – 06:00 PM BST",
    venue: "Department Computer & Data Lab, Academic Building D",
    category: "Workshop",
    description: "Hands-on data workshop on extracting themes from field interviews, survey analytics, and computational text processing for social research.",
    speakers: ["Md. Nayeemur Rahman", "Arifur Rahman Rony"],
    rsvpCount: 95,
    featured: false
  }
];
