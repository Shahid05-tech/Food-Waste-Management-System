import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiPlus,
  FiList,
  FiMap,
  FiBell,
  FiUsers,
  FiTrophy,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiSettings,
} from "react-icons/fi";

const Layout = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = {
    citizen: [
      { path: "/dashboard", icon: FiHome, label: "Dashboard" },
      { path: "/create-report", icon: FiPlus, label: "Report Waste" },
      { path: "/myreports", icon: FiList, label: "My Reports" },
      { path: "/map", icon: FiMap, label: "Waste Map" },
      { path: "/leaderboard", icon: FiTrophy, label: "Leaderboard" },
      { path: "/notifications", icon: FiBell, label: "Notifications" },
    ],
    collector: [
      { path: "/collector", icon: FiHome, label: "Dashboard" },
      { path: "/map", icon: FiMap, label: "Waste Map" },
      { path: "/leaderboard", icon: FiTrophy, label: "Leaderboard" },
      { path: "/notifications", icon: FiBell, label: "Notifications" },
    ],
    admin: [
      { path: "/admin", icon: FiHome, label: "Dashboard" },
      { path: "/map", icon: FiMap, label: "Waste Map" },
      { path: "/users", icon: FiUsers, label: "Users" },
      { path: "/notifications", icon: FiBell, label: "Notifications" },
    ],
  };

  const items = navItems[role] || navItems.citizen;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">🌱</span>
              <span className="text-xl font-bold text-green-600 hidden sm:block">FoodWise</span>
            </Link>
          </div>

          {/* Center section - Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            <Link to="/notifications" className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm font-medium hidden md:block">
                {user?.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 p-4">
            <div className="space-y-2">
              {items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-green-50 text-green-600"
                      : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-gray-200 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:translate-x-0 lg:w-20"
        }`}
      >
        <div className="h-full flex flex-col">
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group ${
                  location.pathname === item.path
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`w-5 h-5 ${
                  location.pathname === item.path ? "text-green-600" : "group-hover:text-green-500"
                }`} />
                <span className={`${
                  !isSidebarOpen && "lg:hidden"
                } font-medium text-sm`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex items-center justify-center w-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FiMenu className="w-5 h-5" />
              <span className={`ml-2 text-sm ${!isSidebarOpen && "hidden"}`}>
                Collapse
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;