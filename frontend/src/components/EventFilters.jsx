// components/EventFilters.jsx
import {
  FiSliders,
  FiChevronDown,
  FiGrid,
  FiList,
  FiClock,
  FiX,
} from "react-icons/fi";

const CATEGORIES = ["All", "Tech", "Cultural", "Sports", "Workshop"];

const CAT_STYLES = {
  Tech:     { active: "bg-blue-600 text-white border-blue-600",     inactive: "" },
  Cultural: { active: "bg-purple-600 text-white border-purple-600", inactive: "" },
  Sports:   { active: "bg-green-600 text-white border-green-600",   inactive: "" },
  Workshop: { active: "bg-amber-500 text-white border-amber-500",   inactive: "" },
  All:      { active: "bg-blue-600 text-white border-blue-600",     inactive: "" },
};

/**
 * EventFilters
 *
 * Props:
 *   activeCategory    string         — selected category pill
 *   setActiveCategory fn(string)
 *   sortBy            string         — current sort key
 *   setSortBy         fn(string)
 *   viewMode          "grid"|"list"
 *   setViewMode       fn(string)
 *   statusFilter      string
 *   setStatusFilter   fn(string)
 *   timeFrom          string         — HH:MM or ""
 *   setTimeFrom       fn(string)
 *   timeTo            string         — HH:MM or ""
 *   setTimeTo         fn(string)
 *   dateFrom          string         — YYYY-MM-DD or ""
 *   setDateFrom       fn(string)
 *   dateTo            string         — YYYY-MM-DD or ""
 *   setDateTo         fn(string)
 *   search            string
 *   clearAllFilters   fn()
 *   showAdvanced      bool
 *   setShowAdvanced   fn(bool)
 *   hasAdvancedFilters bool
 */
export default function EventFilters({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  statusFilter,
  setStatusFilter,
  timeFrom,
  setTimeFrom,
  timeTo,
  setTimeTo,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  search,
  clearAllFilters,
  showAdvanced,
  setShowAdvanced,
  hasAdvancedFilters,
}) {
  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">

      {/* ── Row 1: categories + controls ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-2 flex items-center gap-3">

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

        {/* Advanced filters toggle */}
        <button
          onClick={() => setShowAdvanced((p) => !p)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            showAdvanced || hasAdvancedFilters
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-blue-600 hover:text-blue-600"
          }`}
        >
          <FiSliders size={12} />
          Filters
          {hasAdvancedFilters && (
            <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />
          )}
        </button>

        {/* Sort dropdown */}
        <div className="relative flex-shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-3 pr-7 py-1.5 text-xs font-semibold border border-gray-200 rounded-full bg-white text-gray-600 outline-none focus:border-blue-600 cursor-pointer hover:border-blue-400 transition-colors"
          >
            <optgroup label="By Date">
              <option value="date-asc">Date ↑ (Earliest)</option>
              <option value="date-desc">Date ↓ (Latest)</option>
            </optgroup>
            <optgroup label="By Time">
              <option value="time-asc">Time ↑ (Morning first)</option>
              <option value="time-desc">Time ↓ (Evening first)</option>
            </optgroup>
            <optgroup label="By Name">
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
            </optgroup>
          </select>
          <FiChevronDown
            size={11}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 flex-shrink-0 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FiGrid size={14} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FiList size={14} />
          </button>
        </div>

        {/* Clear all */}
        {(search || activeCategory !== "All" || hasAdvancedFilters) && (
          <button
            onClick={clearAllFilters}
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors border border-gray-200 rounded-full px-3 py-1.5"
          >
            <FiX size={11} /> Clear
          </button>
        )}
      </div>

      {/* ── Row 2: advanced filters (collapsible) ── */}
      {showAdvanced && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 flex flex-wrap items-end gap-4 border-t border-gray-100 pt-3">

          {/* Status filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Status
            </label>
            <div className="flex gap-1.5">
              {["All", "Upcoming", "Ongoing", "Past"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    statusFilter === s
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Time range filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <FiClock size={10} /> Start Time Range
            </label>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400">From</span>
                <input
                  type="time"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-600 bg-white text-gray-700 cursor-pointer w-32"
                />
              </div>
              <span className="text-gray-300 text-sm mt-4">–</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400">To</span>
                <input
                  type="time"
                  value={timeTo}
                  min={timeFrom}
                  onChange={(e) => setTimeTo(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-600 bg-white text-gray-700 cursor-pointer w-32"
                />
              </div>
              {(timeFrom || timeTo) && (
                <button
                  onClick={() => { setTimeFrom(""); setTimeTo(""); }}
                  className="mt-4 text-gray-400 hover:text-red-400 transition-colors"
                  title="Clear time range"
                >
                  <FiX size={13} />
                </button>
              )}
            </div>
            {(timeFrom || timeTo) && (
              <p className="text-[10px] text-blue-500 mt-1">
                Filtering events starting{" "}
                {timeFrom ? `after ${timeFrom}` : ""}
                {timeFrom && timeTo ? " and " : ""}
                {timeTo ? `before ${timeTo}` : ""}
              </p>
            )}
          </div>

          {/* Date from */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              From Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-600 bg-white text-gray-700 cursor-pointer"
            />
          </div>

          {/* Date to */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              To Date
            </label>
            <input
              type="date"
              value={dateTo}
              min={dateFrom}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-600 bg-white text-gray-700 cursor-pointer"
            />
          </div>

          {/* Reset advanced */}
          {hasAdvancedFilters && (
            <button
              onClick={() => {
                setStatusFilter("All");
                setDateFrom("");
                setDateTo("");
                setTimeFrom("");
                setTimeTo("");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-600 border border-red-100 hover:border-red-300 rounded-lg transition-colors self-end"
            >
              <FiX size={11} /> Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}