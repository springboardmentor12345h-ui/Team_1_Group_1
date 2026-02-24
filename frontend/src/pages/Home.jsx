import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ArrowRight,
  Users,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const features = [
    {
      title: "Inter-college Discovery",
      desc: "Find exciting events happening across multiple campuses.",
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      title: "Easy Registration",
      desc: "Register for events quickly with a smooth workflow.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Real-time Tracking",
      desc: "Track participation, approvals, and event updates easily.",
      icon: <BarChart3 className="w-8 h-8" />,
    },
  ];

  const dummyEvents = [
    {
      title: "Hackathon 2026",
      date: "Mar 12",
      college: "NBKRIST",
      category: "Technical",
      image: "https://engineering.tamu.edu/news/2020/02/_news-images/CSCE-news-TAMUhack-25Feb2020.jpg",
    },
    {
      title: "Cultural Fest",
      date: "Apr 05",
      college: "SVU",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200",
    },
    {
      title: "Sports Meet",
      date: "May 20",
      college: "JNTU",
      category: "Sports",
      image: "https://ca-times.brightspotcdn.com/dims4/default/bbe2afb/2147483647/strip/true/crop/4165x2776%2B0%2B0/resize/2000x1333%21/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F9b%2Fcb%2F033cc9834de7923c3a721f8b2a58%2Fparis-olympics-artistic-gymnastics-85191.jpg",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white text-slate-800">

      {/* ── SHARED NAVBAR in guest mode ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — TEXT */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
            >
              Discover Campus Events Effortlessly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0"
            >
              A unified platform to explore, manage, and participate in
              inter-college events seamlessly.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate("/register")}
                className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-200 flex items-center gap-2 transition"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate("/events")}
                className="px-7 py-3 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 font-semibold transition"
              >
                Explore Events
              </button>
            </motion.div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-6 sm:gap-8 text-sm text-slate-500 justify-center lg:justify-start">
              <span><strong className="text-blue-600">50+</strong> Events</span>
              <span><strong className="text-blue-600">10+</strong> Colleges</span>
              <span><strong className="text-blue-600">1000+</strong> Students</span>
            </div>
          </div>

          {/* RIGHT — ANIMATED CARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end w-full"
          >
            <div className="relative w-[85%] max-w-[520px]">
              {/* Glow */}
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full scale-110 animate-pulse" />

              {/* Back cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute -top-[4%] -left-[4%] w-full h-[90%] bg-white rounded-2xl shadow-lg border border-blue-100 rotate-[-4deg] sm:rotate-[-6deg]"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 7 }}
                className="absolute top-[6%] left-[6%] w-full h-[94%] bg-white rounded-2xl shadow-xl border border-blue-100 rotate-[4deg] sm:rotate-[6deg]"
              />

              {/* Main card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="relative w-full h-[180px] sm:h-[240px] lg:h-[300px] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200"
                  alt="Live Event"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-4 sm:p-5 text-white">
                  <p className="text-[10px] sm:text-xs opacity-80 tracking-wide">Mar 12 • NBKRIST</p>
                  <h3 className="font-semibold text-base sm:text-lg lg:text-xl leading-tight">Hackathon 2026</h3>
                  <button className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 text-[11px] sm:text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition">
                    Register Now
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Background glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-blue-200/40 blur-[140px] -translate-x-1/2 rounded-full" />
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-indigo-200/40 blur-[140px] rounded-full" />
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section className="px-4 sm:px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-56 rounded-2xl bg-slate-200 animate-pulse" />
              ))
            : dummyEvents.map((event, i) => (
                <EventCard key={i} event={event} index={i} />
              ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            How CampusEventHub Works
          </motion.h2>

          <div className="relative grid md:grid-cols-3 gap-10">
            <div className="hidden md:block absolute left-0 right-0 top-6 h-[2px] bg-blue-100 z-0" />

            {[
              {
                title: "Create Account",
                desc: "Sign up in seconds and join your campus community.",
                icon: <Users className="w-8 h-8" />,
              },
              {
                title: "Browse or Host Events",
                desc: "Explore exciting events or create your own in minutes.",
                icon: <Sparkles className="w-8 h-8" />,
              },
              {
                title: "Register & Participate",
                desc: "Secure your spot and stay updated in real-time.",
                icon: <ArrowRight className="w-8 h-8" />,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition text-center"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg z-10">
                  {i + 1}
                </div>
                <div className="flex justify-center mt-6 text-blue-600">{step.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-4 sm:px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful features for campus communities
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="bg-white border border-blue-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex justify-center mb-3 text-blue-600">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
              <p className="text-slate-500 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-4 sm:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-10 shadow-lg"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            Ready to explore campus opportunities?
          </h3>
          <p className="mb-6 opacity-90">
            Join CampusEventHub today and never miss an event again.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow hover:scale-105 transition"
          >
            Join Now
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}