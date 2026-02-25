import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import {
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiArrowRight,
  FiFilter,
  FiX,
} from "react-icons/fi";

const events = [
  {
    _id: 1,
    title: "Hackathon 2026",
    description: "24-hour coding challenge for developers. Build fast, think faster.",
    date: "March 15, 2026",
    location: "Main Auditorium",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    _id: 2,
    title: "AI & ML Workshop",
    description: "Hands-on session covering practical AI applications and real-world use cases.",
    date: "March 20, 2026",
    location: "Seminar Hall",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
  },
  {
    _id: 3,
    title: "Cultural Night 2026",
    description: "Music, dance and campus-wide celebration. One night, endless memories.",
    date: "April 5, 2026",
    location: "Open Ground",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    _id: 4,
    title: "Startup Pitch Fest",
    description: "Pitch your startup idea to industry mentors and investors.",
    date: "April 12, 2026",
    location: "Innovation Hub",
    category: "Entrepreneurship",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
  },
  {
    _id: 5,
    title: "Robotics Championship",
    description: "Compete with autonomous bots on a live arena course.",
    date: "April 20, 2026",
    location: "Tech Lab",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    _id: 6,
    title: "Photography Walk",
    description: "Capture campus life through your lens with expert guidance.",
    date: "May 1, 2026",
    location: "Campus Grounds",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
  },
];

const CATEGORIES = ["All", "Technical", "Workshop", "Cultural", "Entrepreneurship"];

const SORT_OPTIONS = [
  { value: "default", label: "Sort By" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

const DATE_OPTIONS = [
  { value: "any", label: "Any Date" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "next", label: "Next Month" },
];

export default function Events() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [dateFilter, setDateFilter] = useState("any");
  const [showFilters, setShowFilters] = useState(false);

  const featured = events[0];

  const filtered = events.slice(1).filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || e.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 pt-16">

        {/* ── HERO HEADER ── */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase mb-2">
                Campus Events
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Discover Events
              </h1>
              <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-xl">
                Workshops, hackathons, fests and more — all happening around you.
              </p>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-7 relative max-w-2xl"
            >
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, topics, locations..."
                className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  <FiX size={15} />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 sm:p-5"
          >
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between sm:hidden mb-3">
              <span className="text-sm font-medium text-slate-700">Filters</span>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 text-sm text-sky-600 font-medium"
              >
                <FiFilter size={14} />
                {showFilters ? "Hide" : "Show"}
              </button>
            </div>

            <div className={`${showFilters ? "flex" : "hidden"} sm:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}>
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-sky-600 text-white shadow-sm shadow-sky-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dropdowns */}
              <div className="flex gap-3 flex-wrap">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  {DATE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── FEATURED EVENT ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="relative lg:w-[45%] h-56 sm:h-72 lg:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />

                {/* Mobile title overlay */}
                <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Featured</span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{featured.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-center lg:py-10">
                <span className="hidden lg:inline-block text-xs font-semibold tracking-widest text-sky-500 uppercase mb-3">
                  ✦ Featured Event
                </span>
                <h2 className="hidden lg:block text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-500 mt-3 text-sm leading-relaxed max-w-lg">
                  {featured.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-5 text-slate-600 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center">
                      <FiCalendar size={13} className="text-sky-600" />
                    </div>
                    <span>{featured.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center">
                      <FiMapPin size={13} className="text-sky-600" />
                    </div>
                    <span>{featured.location}</span>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2 group shadow-sm shadow-sky-200">
                    Register Now
                    <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── UPCOMING EVENTS GRID ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Upcoming Events</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <button className="text-sky-600 text-sm font-semibold hover:text-sky-800 transition flex items-center gap-1 group">
              View All
              <FiArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((event, i) => (
                  <EventCard key={event._id} event={event} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-slate-500 font-medium">No events found</p>
                <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search query</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="mt-5 text-sky-600 text-sm font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}