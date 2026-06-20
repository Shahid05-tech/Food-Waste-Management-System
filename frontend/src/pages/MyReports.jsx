import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import api from "../api/axios";
import ReportCard from "../components/ReportCard";

function MyReports() {
  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await api.get(
          "/reports/my",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setReports(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const summary = useMemo(() => {
    const reported = reports.filter(
      (item) => item.status === "reported"
    ).length;

    const accepted = reports.filter(
      (item) => item.status === "accepted"
    ).length;

    const collected = reports.filter(
      (item) => item.status === "collected"
    ).length;

    const processed = reports.filter(
      (item) => item.status === "processed"
    ).length;

    return {
      total: reports.length,
      reported,
      accepted,
      collected,
      processed,
    };
  }, [reports]);

  if (loading) {
    return (
      <div className="app-shell">
        <Navbar />
        <Loader />
      </div>
    );
  }

  return (
    <div className="app-shell min-h-screen">
      <Navbar />

      <main className="page-container max-w-7xl">
        {/* HERO */}
        <section className="mb-8">
          <div
            className="
              relative overflow-hidden rounded-[28px]
              border border-slate-200/70
              bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900
              px-8 py-10 text-white
              shadow-[0_24px_70px_rgba(15,23,42,0.22)]
            "
          >
            <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <span
                className="
                  inline-flex items-center rounded-full
                  border border-white/15 bg-white/10
                  px-4 py-1.5 text-sm font-medium text-white/90
                "
              >
                Citizen Reporting History
              </span>

              <h1 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight">
                My Reports
              </h1>

              <p className="mt-4 max-w-2xl text-sm md:text-base leading-7 text-slate-200">
                Track all waste reports submitted from your account, monitor
                current collection status, and review AI-generated food waste
                analysis in one place.
              </p>
            </div>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="stat-card">
            <p className="stat-label">
              Total Reports
            </p>
            <p className="stat-value text-slate-900">
              {summary.total}
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-label">
              Reported
            </p>
            <p className="stat-value text-amber-600">
              {summary.reported}
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-label">
              Accepted
            </p>
            <p className="stat-value text-blue-600">
              {summary.accepted}
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-label">
              Collected
            </p>
            <p className="stat-value text-emerald-600">
              {summary.collected}
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-label">
              Processed
            </p>
            <p className="stat-value text-violet-600">
              {summary.processed}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        {reports.length === 0 ? (
          <section className="app-card card-padding">
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div
                className="
                  flex h-20 w-20 items-center justify-center rounded-3xl
                  bg-slate-100 border border-slate-200
                "
              >
                <svg
                  className="h-9 w-9 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                  />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                No reports found
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                You have not submitted any waste reports yet. Create your first
                report to start tracking food waste, collection progress, and
                reward points.
              </p>

              <Link
                to="/create-report"
                className="
                  mt-6 inline-flex items-center justify-center rounded-2xl
                  bg-gradient-to-r from-emerald-600 to-green-500
                  px-6 py-3 text-sm font-semibold text-white
                  shadow-lg shadow-emerald-500/20 transition
                  hover:translate-y-[-1px] hover:shadow-xl
                "
              >
                Create New Report
              </Link>
            </div>
          </section>
        ) : (
          <>
            {/* SECTION HEADER */}
            <section className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="page-title text-[1.55rem]">
                  Submitted Reports
                </h2>
                <p className="page-subtitle">
                  A complete list of your reported waste entries and their
                  current status.
                </p>
              </div>

              <Link
                to="/create-report"
                className="
                  inline-flex items-center justify-center rounded-2xl
                  border border-slate-200 bg-white px-5 py-3
                  text-sm font-semibold text-slate-800
                  shadow-sm transition hover:bg-slate-50
                "
              >
                Create Another Report
              </Link>
            </section>

            {/* REPORT GRID */}
            <section
              className="
                grid grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >
              {reports.map((report) => (
                <ReportCard
                  key={report._id}
                  report={report}
                />
              ))}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyReports;