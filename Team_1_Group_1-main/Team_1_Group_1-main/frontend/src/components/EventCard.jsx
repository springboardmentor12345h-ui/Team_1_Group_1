import { motion } from "framer-motion";

export default function EventCard({ event, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="group bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-44 w-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-semibold text-blue-700 shadow">
          {event.date}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg tracking-tight mb-1 group-hover:text-blue-600 transition">
          {event.title}
        </h3>

        <p className="text-sm text-slate-500">{event.college}</p>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-100" />

        {/* Action */}
        <button className="text-sm font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
          View Details →
        </button>
      </div>
    </motion.div>
  );
}
