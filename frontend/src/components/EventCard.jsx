import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";

const categoryColors = {
  Technical:      { bg: "bg-sky-50",    text: "text-sky-700",    dot: "bg-sky-500" },
  Workshop:       { bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-500" },
  Cultural:       { bg: "bg-rose-50",   text: "text-rose-700",   dot: "bg-rose-500" },
  Entrepreneurship:{ bg: "bg-emerald-50",text: "text-emerald-700",dot: "bg-emerald-500" },
  Sports:         { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500" },
};

export default function EventCard({ event, index = 0 }) {
  const navigate = useNavigate();
  const colors = categoryColors[event.category] || categoryColors["Technical"];

  const handleNavigate = () => {
    if (event._id) navigate(`/events/${event._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleNavigate}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} shadow-sm backdrop-blur-sm`}>
          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-base text-slate-900 tracking-tight mb-3 group-hover:text-sky-700 transition-colors duration-200 line-clamp-2">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto space-y-1.5">
          {event.date && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FiCalendar size={12} className="text-slate-400 flex-shrink-0" />
              <span>{event.date}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FiMapPin size={12} className="text-slate-400 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          {event.college && !event.location && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FiMapPin size={12} className="text-slate-400 flex-shrink-0" />
              <span className="truncate">{event.college}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-100" />

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
          className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors group/btn w-fit"
        >
          View Details
          <FiArrowRight
            size={14}
            className="translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200"
          />
        </button>
      </div>
    </motion.div>
  );
}