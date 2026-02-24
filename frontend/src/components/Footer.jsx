import { Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
        {/* Brand */}
        <div>
          <h4 className="font-semibold text-blue-700 mb-3">
            CampusEventHub
          </h4>
          <p className="text-slate-500">
            A modern platform for discovering, managing, and participating in
            inter-college events.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-slate-500">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">Events</li>
            <li className="hover:text-blue-600 cursor-pointer">Register</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="flex gap-3 text-slate-500">
            <Mail className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
            <Github className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 pb-6">
        © {new Date().getFullYear()} CampusEventHub. All rights reserved.
      </div>
    </footer>
  );
}