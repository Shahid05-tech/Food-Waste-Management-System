import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Navbar() {
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [notificationCount, setNotificationCount] =
    useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user?.token) return;

        const { data } = await api.get(
          "/notifications",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setNotificationCount(data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;

    return `
      relative shrink-0
      px-4 py-2
      rounded-xl
      text-sm
      font-medium
      whitespace-nowrap
      transition-all duration-200
      ${
        isActive
          ? "bg-green-50 text-green-700 shadow-sm border border-green-100"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
      }
    `;
  };

  const getRoleClass = (role) => {
    if (role === "admin") {
      return "bg-red-50 text-red-700 border border-red-100";
    }

    if (role === "collector") {
      return "bg-blue-50 text-blue-700 border border-blue-100";
    }

    return "bg-emerald-50 text-emerald-700 border border-emerald-100";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-[86px] flex items-center justify-between gap-6">

          {/* Left: Brand */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/dashboard"
              className="flex items-center gap-3"
            >
              <div
                className="
                  h-11 w-11 rounded-2xl
                  bg-gradient-to-br from-green-600 to-emerald-500
                  text-white font-bold text-lg
                  flex items-center justify-center
                  shadow-lg shadow-green-200
                "
              >
                F
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  FoodWise
                </h1>
                <p className="text-xs text-slate-500">
                  Food Waste Management Platform
                </p>
              </div>
            </Link>

            {user?.role && (
              <span
                className={`
                  hidden xl:inline-flex
                  px-3 py-1.5 rounded-full text-xs font-semibold capitalize
                  ${getRoleClass(user.role)}
                `}
              >
                {user.role}
              </span>
            )}
          </div>

          {/* Center: Nav */}
          <div className="flex-1 min-w-0">
            <nav
              className="
                flex items-center gap-2
                overflow-x-auto scrollbar-hide
                whitespace-nowrap
              "
            >
              <Link
                to="/dashboard"
                className={navLinkClass("/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                to="/leaderboard"
                className={navLinkClass("/leaderboard")}
              >
                Leaderboard
              </Link>

              <Link
                to="/map"
                className={navLinkClass("/map")}
              >
                Waste Map
              </Link>

              <Link
                to="/notifications"
                className={navLinkClass("/notifications")}
              >
                <span className="flex items-center gap-2">
                  Notifications

                  {notificationCount > 0 && (
                    <span
                      className="
                        min-w-[22px]
                        h-[22px]
                        px-2
                        rounded-full
                        bg-slate-900
                        text-white
                        text-[11px]
                        font-semibold
                        flex items-center justify-center
                      "
                    >
                      {notificationCount}
                    </span>
                  )}
                </span>
              </Link>

              {user?.role === "citizen" && (
                <>
                  <Link
                    to="/create-report"
                    className={navLinkClass("/create-report")}
                  >
                    Create Report
                  </Link>

                  <Link
                    to="/my-reports"
                    className={navLinkClass("/my-reports")}
                  >
                    My Reports
                  </Link>
                </>
              )}

              {user?.role === "collector" && (
                <Link
                  to="/collector"
                  className={navLinkClass("/collector")}
                >
                  Collector Panel
                </Link>
              )}

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className={navLinkClass("/admin")}
                >
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>

          {/* Right: User + Logout */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="
                hidden md:flex
                items-center gap-3
                rounded-2xl
                border border-slate-200
                bg-slate-50
                px-4 py-2.5
              "
            >
              <div
                className="
                  h-10 w-10 rounded-full
                  bg-gradient-to-br from-slate-900 to-slate-700
                  text-white font-semibold
                  flex items-center justify-center
                "
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user?.role || "Account"}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="
                px-4 py-2.5 rounded-xl
                bg-slate-900 text-white
                text-sm font-medium
                hover:bg-slate-800
                transition shadow-sm
              "
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;