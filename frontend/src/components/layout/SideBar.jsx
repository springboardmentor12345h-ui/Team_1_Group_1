import { Link } from "react-router-dom";
import { Home, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ close }) => {
  const { user } = useAuth();

  const basePath =
    user?.role === "student"
      ? "/student"
      : user?.role === "college_admin"
      ? "/admin"
      : "/super";

  return (
    <aside className="h-full w-64 bg-white border-r p-4 space-y-4">
      <h2 className="text-xl font-bold">CampusEventHub</h2>

      <nav className="space-y-2">
        <Link
          to={basePath}
          onClick={close}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
        >
          <Home size={18} /> Dashboard
        </Link>

        <Link
          to={`${basePath}/events`}
          onClick={close}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted"
        >
          <Calendar size={18} /> Events
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
