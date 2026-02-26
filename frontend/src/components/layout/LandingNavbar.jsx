import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingNavbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <h1 className="text-xl font-bold">CampusEventHub</h1>

        <nav className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LandingNavbar;
