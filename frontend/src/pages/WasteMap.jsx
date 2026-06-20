import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import api from "../api/axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

function WasteMap() {
  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const fetchReports =
      async () => {
        try {
          const { data } =
            await api.get(
              "/reports/all",
              {
                headers: {
                  Authorization:
                    `Bearer ${user.token}`,
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

  if (loading) {
    return <Loader />;
  }

  const totalReports =
    reports.length;

  const reportedCount =
    reports.filter(
      (report) =>
        report.status === "reported"
    ).length;

  const acceptedCount =
    reports.filter(
      (report) =>
        report.status === "accepted"
    ).length;

  const collectedCount =
    reports.filter(
      (report) =>
        report.status === "collected"
    ).length;

  const recentReports =
    [...reports].slice(0, 5);

  const getStatusClasses = (
    status
  ) => {
    if (status === "reported") {
      return "bg-amber-100 text-amber-700 border border-amber-200";
    }

    if (status === "accepted") {
      return "bg-blue-100 text-blue-700 border border-blue-200";
    }

    if (status === "collected") {
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    }

    return "bg-slate-100 text-slate-700 border border-slate-200";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-green-700 uppercase tracking-wider">
            Monitoring
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-1">
            Waste Reports Map
          </h1>

          <p className="text-slate-500 mt-2 max-w-3xl">
            View all reported waste locations, track report progress,
            and identify collection activity across the mapped areas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Reports
            </p>

            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              {totalReports}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Reported
            </p>

            <h3 className="text-3xl font-bold text-amber-500 mt-2">
              {reportedCount}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Accepted
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {acceptedCount}
            </h3>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Collected
            </p>

            <h3 className="text-3xl font-bold text-emerald-600 mt-2">
              {collectedCount}
            </h3>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">
                Location Overview
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Each marker represents a waste report location.
              </p>
            </div>

            <div className="p-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200">
                <MapContainer
                  center={[20.5937, 78.9629]}
                  zoom={5}
                  style={{
                    height: "620px",
                    width: "100%",
                  }}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {reports.map(
                    (report) =>
                      report.location
                        ?.coordinates && (
                        <Marker
                          key={report._id}
                          position={[
                            report.location
                              .coordinates[1],
                            report.location
                              .coordinates[0],
                          ]}
                        >
                          <Popup>
                            <div className="w-60">
                              {report.imageUrl && (
                                <img
                                  src={report.imageUrl}
                                  alt="Waste"
                                  className="w-full h-32 object-cover rounded-lg mb-3"
                                />
                              )}

                              <h3 className="font-bold text-slate-800 text-base mb-2">
                                {report.description}
                              </h3>

                              <div className="space-y-2 text-sm text-slate-600">
                                <p>
                                  <span className="font-semibold text-slate-800">
                                    Status:
                                  </span>{" "}
                                  {report.status}
                                </p>

                                <p>
                                  <span className="font-semibold text-slate-800">
                                    Latitude:
                                  </span>{" "}
                                  {
                                    report.location
                                      .coordinates[1]
                                  }
                                </p>

                                <p>
                                  <span className="font-semibold text-slate-800">
                                    Longitude:
                                  </span>{" "}
                                  {
                                    report.location
                                      .coordinates[0]
                                  }
                                </p>
                              </div>

                              {report.aiAnalysis && (
                                <div className="mt-3 pt-3 border-t border-slate-200 text-sm text-slate-600 space-y-1">
                                  <p>
                                    <span className="font-semibold text-slate-800">
                                      Food Type:
                                    </span>{" "}
                                    {
                                      report.aiAnalysis
                                        .foodType
                                    }
                                  </p>

                                  <p>
                                    <span className="font-semibold text-slate-800">
                                      Quantity:
                                    </span>{" "}
                                    {
                                      report.aiAnalysis
                                        .quantity
                                    }
                                  </p>

                                  <p>
                                    <span className="font-semibold text-slate-800">
                                      Urgency:
                                    </span>{" "}
                                    {
                                      report.aiAnalysis
                                        .urgency
                                    }
                                  </p>
                                </div>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      )
                  )}
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className="space-y-6">
            {/* Legend */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                Status Guide
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">
                    Reported
                  </span>

                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700 border border-amber-200">
                    Pending
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">
                    Accepted
                  </span>

                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    In Progress
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">
                    Collected
                  </span>

                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-1">
                Recent Reports
              </h2>

              <p className="text-sm text-slate-500 mb-5">
                Latest waste reports submitted to the system.
              </p>

              {recentReports.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No reports found.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentReports.map(
                    (report) => (
                      <div
                        key={report._id}
                        className="border border-slate-200 rounded-xl p-4 bg-slate-50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-slate-800 line-clamp-2">
                            {
                              report.description
                            }
                          </h3>

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusClasses(
                              report.status
                            )}`}
                          >
                            {report.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-3">
                          {new Date(
                            report.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border border-emerald-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Collection Summary
              </h2>

              <p className="text-slate-600 text-sm mb-5">
                Quick snapshot of waste reporting and collection activity.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-slate-700 mb-2">
                    <span>Collected Reports</span>
                    <span>
                      {collectedCount} /{" "}
                      {totalReports}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-white/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{
                        width: `${
                          totalReports > 0
                            ? (
                                (collectedCount /
                                  totalReports) *
                                100
                              ).toFixed(0)
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-200">
                  <p className="text-sm text-slate-700">
                    Completion Rate
                  </p>

                  <p className="text-3xl font-bold text-green-700 mt-1">
                    {totalReports > 0
                      ? (
                          (collectedCount /
                            totalReports) *
                          100
                        ).toFixed(0)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default WasteMap;