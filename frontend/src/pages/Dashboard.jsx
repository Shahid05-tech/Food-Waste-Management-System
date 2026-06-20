import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import api from "../api/axios";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [reportCount, setReportCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { data } = await api.get(
          "/reports/my/count",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setReportCount(data.count);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading) {
    return (
      <div className="app-shell">
        <Navbar />
        <Loader />
      </div>
    );
  }

  const quickActions = [];

  if (user?.role === "citizen") {
    quickActions.push(
      {
        title: "Create Report",
        description:
          "Submit a new food waste report with image and location details.",
        link: "/create-report",
        tone:
          "from-green-600 to-emerald-500",
      },
      {
        title: "My Reports",
        description:
          "Track submitted reports, current status, and collection progress.",
        link: "/my-reports",
        tone:
          "from-blue-600 to-cyan-500",
      }
    );
  }

  if (user?.role === "collector") {
    quickActions.push({
      title: "Collector Panel",
      description:
        "View available reports, accept tasks, and mark collections completed.",
      link: "/collector",
      tone:
        "from-blue-600 to-indigo-500",
    });
  }

  if (user?.role === "admin") {
    quickActions.push({
      title: "Admin Panel",
      description:
        "Monitor system activity, report trends, and contributor performance.",
      link: "/admin",
      tone:
        "from-slate-900 to-slate-700",
    });
  }

  quickActions.push(
    {
      title: "Leaderboard",
      description:
        "See top contributors and community participation performance.",
      link: "/leaderboard",
      tone:
        "from-amber-500 to-orange-500",
    },
    {
      title: "Waste Map",
      description:
        "Visualize reported and collected waste locations on the live map.",
      link: "/map",
      tone:
        "from-violet-600 to-purple-500",
    }
  );

  const activityItems = [
    {
      label: "Reports Submitted",
      value: reportCount,
      style:
        "bg-green-50 text-green-700 border-green-100",
    },
    {
      label: "Reward Points",
      value: user?.points || 0,
      style:
        "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      label: "Current Badge",
      value: user?.badge || "Beginner",
      style:
        "bg-purple-50 text-purple-700 border-purple-100",
    },
  ];

  return (
    <div className="app-shell min-h-screen">
      <Navbar />

      <main className="page-container max-w-7xl">
        {/* HERO */}
        <section
          className="
            relative overflow-hidden
            rounded-[28px]
            border border-slate-200/70
            bg-gradient-to-br from-slate-950 via-slate-900 to-green-900
            text-white
            shadow-[0_30px_80px_rgba(15,23,42,0.28)]
            mb-8
          "
        >
          <div
            className="
              absolute -top-16 -right-10 h-56 w-56 rounded-full
              bg-white/10 blur-3xl
            "
          />
          <div
            className="
              absolute bottom-0 left-0 h-44 w-44 rounded-full
              bg-emerald-400/10 blur-3xl
            "
          />

          <div className="relative p-8 md:p-10 lg:p-12">
            <div className="max-w-3xl">
              <span
                className="
                  inline-flex items-center rounded-full
                  border border-white/15 bg-white/10
                  px-4 py-1.5 text-sm font-medium text-white/90
                "
              >
                Food Waste Management Dashboard
              </span>

              <h1
                className="
                  mt-5 text-3xl md:text-5xl
                  font-bold tracking-tight
                "
              >
                Welcome back, {user?.name}
              </h1>

              <p className="mt-4 max-w-2xl text-sm md:text-base text-slate-200 leading-7">
                Manage reports, monitor collection activity, track your
                contribution points, and navigate the platform from a single
                dashboard designed for daily workflow.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className="
                    inline-flex items-center rounded-full
                    bg-white/10 px-4 py-2 text-sm font-medium
                    text-white/90 border border-white/10 capitalize
                  "
                >
                  Role: {user?.role}
                </span>

                <span
                  className="
                    inline-flex items-center rounded-full
                    bg-emerald-400/15 px-4 py-2 text-sm font-medium
                    text-emerald-100 border border-emerald-300/10
                  "
                >
                  Badge: {user?.badge || "Beginner"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TOP STATS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card">
            <p className="stat-label">
              Reports Submitted
            </p>
            <p className="stat-value stat-value-accent">
              {reportCount}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Total reports created from your account.
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-label">
              Reward Points
            </p>
            <p className="stat-value stat-value-primary">
              {user?.points || 0}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Points earned through successful waste reporting.
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-label">
              Contribution Badge
            </p>
            <p className="stat-value text-purple-600">
              {user?.badge || "Beginner"}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Your current recognition level on the platform.
            </p>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="xl:col-span-2 space-y-6">
            {/* QUICK ACTIONS */}
            <div className="app-card card-padding">
              <div className="page-header mb-6">
                <div>
                  <h2 className="page-title text-[1.5rem]">
                    Quick Actions
                  </h2>
                  <p className="page-subtitle">
                    Navigate to the most frequently used sections of the
                    platform.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {quickActions.map((item) => (
                  <Link
                    key={item.title}
                    to={item.link}
                    className="
                      group rounded-3xl border border-slate-200
                      bg-white p-5 shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-xl
                    "
                  >
                    <div
                      className={`
                        h-12 w-12 rounded-2xl
                        bg-gradient-to-br ${item.tone}
                        shadow-lg
                      `}
                    />

                    <h3 className="mt-5 text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>

                    <div className="mt-5 text-sm font-semibold text-slate-900">
                      Open section
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* WORKFLOW / SYSTEM SUMMARY */}
            <div className="app-card card-padding">
              <div className="page-header mb-6">
                <div>
                  <h2 className="page-title text-[1.5rem]">
                    Workflow Overview
                  </h2>
                  <p className="page-subtitle">
                    How the reporting and collection cycle works across the
                    platform.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="h-11 w-11 rounded-2xl bg-green-100" />
                  <h3 className="mt-4 font-semibold text-slate-900">
                    01. Report Submission
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Citizens submit a waste report with image, description,
                    and location coordinates.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="h-11 w-11 rounded-2xl bg-blue-100" />
                  <h3 className="mt-4 font-semibold text-slate-900">
                    02. Collector Assignment
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Collectors accept available reports and begin the
                    collection workflow from their dashboard.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="h-11 w-11 rounded-2xl bg-purple-100" />
                  <h3 className="mt-4 font-semibold text-slate-900">
                    03. Completion & Rewards
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Once collected, users receive notifications, points,
                    and badge progression updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* ACCOUNT SUMMARY */}
            <div className="app-card card-padding">
              <h2 className="section-title">
                Account Summary
              </h2>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Full Name
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {user?.name}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 break-all">
                    {user?.email || "Not available"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    Account Role
                  </p>
                  <p className="mt-1 font-semibold capitalize text-slate-900">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTIVITY SNAPSHOT */}
            <div className="app-card card-padding">
              <h2 className="section-title">
                Activity Snapshot
              </h2>

              <div className="space-y-3">
                {activityItems.map((item) => (
                  <div
                    key={item.label}
                    className={`
                      flex items-center justify-between rounded-2xl border p-4
                      ${item.style}
                    `}
                  >
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>

                    <span className="text-base font-bold">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACCESS */}
            <div className="app-card card-padding">
              <h2 className="section-title">
                Quick Access
              </h2>

              <div className="space-y-3">
                <Link
                  to="/notifications"
                  className="
                    flex items-center justify-between rounded-2xl
                    border border-slate-200 bg-white px-4 py-3
                    hover:bg-slate-50 transition
                  "
                >
                  <span className="font-medium text-slate-800">
                    View Notifications
                  </span>
                  <span className="text-slate-400">
                    →
                  </span>
                </Link>

                <Link
                  to="/map"
                  className="
                    flex items-center justify-between rounded-2xl
                    border border-slate-200 bg-white px-4 py-3
                    hover:bg-slate-50 transition
                  "
                >
                  <span className="font-medium text-slate-800">
                    Open Waste Map
                  </span>
                  <span className="text-slate-400">
                    →
                  </span>
                </Link>

                <Link
                  to="/leaderboard"
                  className="
                    flex items-center justify-between rounded-2xl
                    border border-slate-200 bg-white px-4 py-3
                    hover:bg-slate-50 transition
                  "
                >
                  <span className="font-medium text-slate-800">
                    Open Leaderboard
                  </span>
                  <span className="text-slate-400">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;