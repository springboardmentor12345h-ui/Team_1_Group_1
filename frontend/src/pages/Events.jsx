import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiArrowRight,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiRefreshCw,
  FiGrid,
  FiList,
  FiClock,
  FiTag,
} from "react-icons/fi";

const BASE_URL = "http://localhost:5000";
const EVENTS_PER_PAGE = 6;
const CATEGORIES = ["All", "Tech", "Cultural", "Sports", "Workshop"];

/* ── Category styling ── */
const CAT_STYLES = {
  Tech:     { active: "bg-blue-600 text-white border-blue-600",     badge: "bg-blue-100 text-blue-700 border-blue-200",     dot: "bg-blue-500" },
  Cultural: { active: "bg-purple-600 text-white border-purple-600", badge: "bg-purple-100 text-purple-700 border-purple-200", dot: "bg-purple-500" },
  Sports:   { active: "bg-green-600 text-white border-green-600",   badge: "bg-green-100 text-green-700 border-green-200",   dot: "bg-green-500" },
  Workshop: { active: "bg-amber-500 text-white border-amber-500",   badge: "bg-amber-100 text-amber-700 border-amber-200",   dot: "bg-amber-500" },
  All:      { active: "bg-blue-600 text-white border-blue-600",  badge: "bg-blue-50 text-blue-600",                     dot: "bg-blue-600" },
};

const STATUS_STYLES = {
  Upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  Ongoing:  "bg-green-50 text-green-700 border-green-200",
  Past:     "bg-gray-100 text-gray-500 border-gray-200",
};

/* ── Helpers ── */
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function getStatus(startDate, endDate) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (now < start) return "Upcoming";
  if (now >= start && now <= end) return "Ongoing";
  return "Past";
}

function toCardProps(event) {
  const start = formatDate(event.startDate);
  const end = formatDate(event.endDate);
  return {
    ...event,
    _id: event._id,
    dateStr: start === end ? start : `${start} – ${end}`,
    college: event.createdBy?.college || event.createdBy?.name || "Campus",
    imageUrl: event.image
      ? `${BASE_URL}/${event.image}`
      : `https://placehold.co/800x500/e8edf7/2563eb?text=${encodeURIComponent(event.title)}`,
    status: getStatus(event.startDate, event.endDate),
  };
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function Events() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  /* ── Fetch ── */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`${BASE_URL}/api/events`);
      setAllEvents(data);
    } catch {
      setError("Unable to load events. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);
  useEffect(() => { setPage(1); }, [search, activeCategory]);

  /* ── Filter ── */
  const filtered = allEvents.filter((ev) => {
    const q = search.toLowerCase();
    const matchSearch =
      ev.title.toLowerCase().includes(q) ||
      ev.description?.toLowerCase().includes(q) ||
      ev.location?.toLowerCase().includes(q) ||
      ev.createdBy?.college?.toLowerCase().includes(q);
    const matchCat = activeCategory === "All" || ev.category === activeCategory;
    return matchSearch && matchCat;
  });

  /* ── Pagination ── */
  const featured = filtered[0] ? toCardProps(filtered[0]) : null;
  const rest = filtered.slice(1).map(toCardProps);
  const totalPages = Math.max(1, Math.ceil(rest.length / EVENTS_PER_PAGE));
  const paginated = rest.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE);

  /* ── Stats ── */
  const upcomingCount = allEvents.filter((e) => new Date(e.startDate) > new Date()).length;
  const uniqueCategories = [...new Set(allEvents.map((e) => e.category))].length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-16">

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Glow blobs */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-px bg-blue-300" />
                <span className="text-blue-200 text-xs font-bold tracking-[0.2em] uppercase">
                  CampusEventHub
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Campus Events,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                  All in One Place
                </span>
              </h1>

              <p className="text-blue-200 mt-4 text-sm sm:text-base max-w-lg leading-relaxed">
                Discover hackathons, cultural fests, workshops, and sports events happening across every campus.
              </p>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-8 max-w-2xl relative"
            >
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base z-10" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by event name, location, or keyword..."
                className="w-full pl-11 pr-12 py-3.5 bg-white rounded-xl text-sm text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                >
                  <FiX size={15} />
                </button>
              )}
            </motion.div>

            {/* Stats */}
            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-6 mt-8"
              >
                <HeroStat value={allEvents.length} label="Total Events" />
                <div className="w-px h-7 bg-white/20" />
                <HeroStat value={upcomingCount} label="Upcoming" />
                <div className="w-px h-7 bg-white/20" />
                <HeroStat value={uniqueCategories} label="Categories" />
              </motion.div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════
            FILTER / CONTROLS BAR
        ══════════════════════════════ */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
              {CATEGORIES.map((cat) => {
                const styles = CAT_STYLES[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      isActive
                        ? styles.active
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-600 hover:text-blue-600"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 flex-shrink-0 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FiGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
                  viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FiList size={14} />
              </button>
            </div>

            {/* Clear filters */}
            {(search || activeCategory !== "All") && (
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors border border-gray-200 rounded-full px-3 py-1.5"
              >
                <FiX size={11} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* ══════════════════════════════
            BODY
        ══════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          {/* Loading */}
          {loading && <LoadingSkeleton viewMode={viewMode} />}

          {/* Error */}
          {!loading && error && <ErrorState message={error} onRetry={fetchEvents} />}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <EmptyState onClear={() => { setSearch(""); setActiveCategory("All"); }} />
          )}

          {/* Content */}
          {!loading && !error && filtered.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${search}-${page}-${viewMode}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Featured event (first result, page 1 only) ── */}
                {featured && page === 1 && (
                  <div className="mb-12">
                    <SectionLabel icon="✦" text="Featured Event" />
                    <FeaturedCard event={featured} />
                  </div>
                )}

                {/* ── Event grid / list ── */}
                {paginated.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-5">
                      <SectionLabel
                        icon={<FiGrid size={13} />}
                        text={
                          activeCategory === "All"
                            ? `All Events`
                            : `${activeCategory} Events`
                        }
                        count={rest.length}
                      />
                    </div>

                    {viewMode === "grid" ? (
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {paginated.map((event, i) => (
                          <GridCard key={event._id} event={event} index={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {paginated.map((event, i) => (
                          <ListCard key={event._id} event={event} index={i} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                          page === p
                            ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                            : "bg-white border border-gray-200 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronRight size={16} />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ══════════════════════════════════════════════
   FEATURED CARD
══════════════════════════════════════════════ */
function FeaturedCard({ event }) {
  const navigate = useNavigate();
  const catStyle = CAT_STYLES[event.category] || CAT_STYLES.All;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg shadow-gray-200/60 hover:shadow-xl hover:shadow-blue-100/40 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row min-h-[300px]">

        {/* Image */}
        <div className="relative lg:w-[50%] h-56 sm:h-72 lg:h-auto flex-shrink-0 overflow-hidden bg-gray-100">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${catStyle.badge}`}>
              {event.category}
            </span>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${STATUS_STYLES[event.status]}`}>
              {event.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] uppercase text-blue-600 mb-3 flex items-center gap-1.5">
              <span className="w-4 h-px bg-blue-600" /> Featured Event
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {event.title}
            </h2>

            {event.description && (
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                {event.description}
              </p>
            )}

            <div className="flex flex-col gap-2.5 mb-7">
              <MetaRow icon={<FiCalendar size={13} />} text={event.dateStr} />
              {event.location && <MetaRow icon={<FiMapPin size={13} />} text={event.location} />}
              {event.college && <MetaRow icon={<FiTag size={13} />} text={event.college} />}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/events/${event._id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md shadow-blue-900/20 group/btn"
            >
              Register Now
              <FiArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate(`/events/${event._id}`)}
              className="border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-white"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   GRID CARD
══════════════════════════════════════════════ */
function GridCard({ event, index }) {
  const navigate = useNavigate();
  const catStyle = CAT_STYLES[event.category] || CAT_STYLES.All;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => navigate(`/events/${event._id}`)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle.badge}`}>
            {event.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[event.status]}`}>
            {event.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-1.5 mb-4">
          <MetaRow icon={<FiCalendar size={11} />} text={event.dateStr} small />
          {event.location && <MetaRow icon={<FiMapPin size={11} />} text={event.location} small />}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {event.college && (
            <span className="text-xs text-gray-400 font-medium truncate mr-2">{event.college}</span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/events/${event._id}`); }}
            className="flex-shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group/link"
          >
            Register <FiArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   LIST CARD
══════════════════════════════════════════════ */
function ListCard({ event, index }) {
  const navigate = useNavigate();
  const catStyle = CAT_STYLES[event.category] || CAT_STYLES.All;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onClick={() => navigate(`/events/${event._id}`)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-blue-100/30 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="flex gap-0">
        {/* Image (thumbnail) */}
        <div className="relative w-40 sm:w-52 flex-shrink-0 overflow-hidden bg-gray-100 hidden sm:block">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catStyle.badge}`}>
                {event.category}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[event.status]}`}>
                {event.status}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5 group-hover:text-blue-600 transition-colors truncate">
              {event.title}
            </h3>

            {event.description && (
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
                {event.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <MetaRow icon={<FiCalendar size={11} />} text={event.dateStr} small />
              {event.location && <MetaRow icon={<FiMapPin size={11} />} text={event.location} small />}
              {event.college && <MetaRow icon={<FiTag size={11} />} text={event.college} small />}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/events/${event._id}`); }}
              className="flex-shrink-0 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              Register <FiArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   HELPERS / MICRO-COMPONENTS
══════════════════════════════════════════════ */
function MetaRow({ icon, text, small }) {
  return (
    <div className={`flex items-center gap-1.5 text-gray-500 ${small ? "text-xs" : "text-sm"}`}>
      <span className="text-blue-600 flex-shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}

function HeroStat({ value, label }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-2xl font-extrabold text-white tabular-nums">{value}</span>
      <span className="text-xs text-blue-200 font-medium">{label}</span>
    </div>
  );
}

function SectionLabel({ icon, text, count }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-blue-600 text-xs">{icon}</span>
      <p className="text-xs font-extrabold tracking-[0.15em] uppercase text-gray-400">
        {text}
        {count !== undefined && (
          <span className="ml-2 text-gray-400 font-normal normal-case tracking-normal">
            ({count} event{count !== 1 ? "s" : ""})
          </span>
        )}
      </p>
    </div>
  );
}

/* ── Loading Skeleton ── */
function LoadingSkeleton({ viewMode }) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse h-28 flex">
            <div className="w-52 bg-gray-100 flex-shrink-0 hidden sm:block" />
            <div className="flex-1 p-5 space-y-3">
              <div className="h-3 bg-gray-100 rounded w-1/4" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Featured skeleton */}
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 animate-pulse mb-12 h-64 lg:h-72" />

      {/* Grid skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse shadow-sm">
            <div className="h-44 bg-gray-100" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
              <div className="h-px bg-gray-100 my-2" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Error State ── */
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5 shadow-sm">
        <FiAlertCircle size={28} className="text-red-400" />
      </div>
      <p className="text-gray-800 font-bold text-base mb-1">{message}</p>
      <p className="text-gray-400 text-sm mb-7">Check your connection and try again.</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-900/20"
      >
        <FiRefreshCw size={13} /> Try Again
      </button>
    </div>
  );
}

/* ── Empty State ── */
function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 text-4xl">
        🗓️
      </div>
      <p className="text-gray-900 font-extrabold text-xl mb-1">No events found</p>
      <p className="text-gray-400 text-sm mb-7 max-w-xs">
        Try a different keyword or browse all categories.
      </p>
      <button
        onClick={onClear}
        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-900/20"
      >
        Clear Filters
      </button>
    </div>
  );
}