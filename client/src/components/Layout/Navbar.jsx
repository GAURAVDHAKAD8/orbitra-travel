import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Plane, LayoutDashboard, Upload, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <Plane className="w-6 h-6" />
          <span>Orbitra</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className={`flex items-center gap-1.5 text-sm transition-colors ${isActive("/dashboard")}`}>
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/upload" className={`flex items-center gap-1.5 text-sm transition-colors ${isActive("/upload")}`}>
            <Upload className="w-4 h-4" />
            New Trip
          </Link>
        </div>

        {/* User + logout */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden sm:block">
            Hi, <span className="font-medium text-gray-800">{user?.name?.split(" ")[0]}</span>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
