import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      {/* Mobile menu */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </Button>

      <h1 className="font-semibold hidden md:block">
        Welcome, {user?.name}
      </h1>

      <Button variant="outline" onClick={logout}>
        Logout
      </Button>
    </header>
  );
};

export default Navbar;
