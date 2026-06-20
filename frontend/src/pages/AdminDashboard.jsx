import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import api from "../api/axios";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } =
          await api.get(
            "/admin/stats",
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`
              }
            }
          );

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <Loader />;
  }

  const chartData = {
    labels: [
      "Reported",
      "Accepted",
      "Collected"
    ],
    datasets: [
      {
        data: [
          stats.reported || 0,
          stats.accepted || 0,
          stats.collected || 0
        ],
        backgroundColor: [
          "#f59e0b",
          "#3b82f6",
          "#10b981"
        ],
        borderColor: [
          "#ffffff",
          "#ffffff",
          "#ffffff"
        ],
        borderWidth: 2
      }
    ]
  };

  const downloadPdfReport = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );
    window.open(
  `${import.meta.env.VITE_API_URL.replace("/api", "")}/api/admin/report/pdf?token=${user.token}`,
  "_blank"
);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-green-700 uppercase tracking-wider">
              Admin Panel
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-1">
              Dashboard Overview
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor reports, collection progress, contributors, and waste hotspots.
            </p>
          </div>

          <button
            onClick={downloadPdfReport}
            className="
              inline-flex
              items-center
              justify-center
              bg-slate-900
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
              shadow-sm
              hover:bg-slate-800
              transition
            "
          >
            Download PDF Report
          </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Reports
            </p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              {stats.totalReports || 0}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Citizens
            </p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {stats.totalUsers || 0}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Collectors
            </p>
            <h3 className="text-3xl font-bold text-violet-600 mt-2">
              {stats.totalCollectors || 0}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Reported
            </p>
            <h3 className="text-3xl font-bold text-amber-500 mt-2">
              {stats.reported || 0}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Accepted
            </p>
            <h3 className="text-3xl font-bold text-blue-500 mt-2">
              {stats.accepted || 0}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Collected
            </p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-2">
              {stats.collected || 0}
            </h3>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Reports Overview
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Status distribution of all waste reports.
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <Pie data={chartData} />
            </div>
          </div>

          {/* Top Contributor */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              Top Contributor
            </h2>

            <p className="text-sm text-slate-500 mb-6">
              Highest performing citizen based on reward points.
            </p>

            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border border-emerald-200 p-5">
              <p className="text-sm text-slate-500 mb-2">
                Contributor Name
              </p>

              <h3 className="text-2xl font-bold text-slate-800">
                {stats.topContributor?.name || "N/A"}
              </h3>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/70 rounded-xl p-4 border border-emerald-100">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Points
                  </p>
                  <p className="text-2xl font-bold text-green-700 mt-1">
                    {stats.topContributor?.points || 0}
                  </p>
                </div>

                <div className="bg-white/70 rounded-xl p-4 border border-emerald-100">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Badge
                  </p>
                  <p className="text-lg font-semibold text-slate-800 mt-1">
                    {stats.topContributor?.badge || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Collection Rate */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800">
              Collection Success Rate
            </h2>

            <p className="text-sm text-slate-500 mt-1 mb-6">
              Percentage of reports successfully collected.
            </p>

            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold text-green-600">
                {stats.collectionRate || 0}%
              </span>
            </div>

            <div className="w-full h-3 bg-slate-200 rounded-full mt-6 overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{
                  width: `${stats.collectionRate || 0}%`
                }}
              ></div>
            </div>
          </div>

          {/* Hotspots */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-800">
                Waste Hotspots
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Areas with the highest number of waste reports.
              </p>
            </div>

            {stats.hotspots &&
            stats.hotspots.length > 0 ? (
              <div className="space-y-3">
                {stats.hotspots.map(
                  (hotspot, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-4
                        bg-slate-50
                      "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-red-100
                            text-red-600
                            flex
                            items-center
                            justify-center
                            font-bold
                          "
                        >
                          {index + 1}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {hotspot.area}
                          </p>
                          <p className="text-sm text-slate-500">
                            High activity zone
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-500">
                          {hotspot.count}
                        </p>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Reports
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
                No hotspot data available yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;