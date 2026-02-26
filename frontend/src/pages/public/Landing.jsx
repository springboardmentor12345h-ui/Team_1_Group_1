import { motion } from "framer-motion";
import LandingNavbar from "../../components/layout/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white text-gray-900">
      <LandingNavbar />

      {/* HERO */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Manage Inter-College Events
            <span className="block text-indigo-600">
              in One Unified Platform
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover events, register seamlessly, and empower colleges with
            powerful event management tools — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex justify-center gap-4 flex-wrap"
          >
            <Link to="/register">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>

            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Explore Events",
              desc: "Browse hackathons, sports, cultural fests, and workshops across colleges.",
            },
            {
              title: "Simple Registration",
              desc: "Register instantly and track approvals with ease.",
            },
            {
              title: "Powerful Admin Tools",
              desc: "Create events, manage participants, and analyze feedback.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CampusEventHub. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
