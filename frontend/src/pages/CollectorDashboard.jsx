import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import api from "../api/axios";

function CollectorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [availableReports, setAvailableReports] = useState([]);
  const [assignedReports, setAssignedReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [acceptingId, setAcceptingId] = useState(null);
  const [collectingId, setCollectingId] = useState(null);

  const fetchReports = async () => {
    try {
      const [availableRes, assignedRes] = await Promise.all([
        api.get("/reports/available", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }),
        api.get("/reports/assigned", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }),
      ]);

      setAvailableReports(availableRes.data);
      setAssignedReports(assignedRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const acceptReport = async (id) => {
    try {
      setAcceptingId(id);

      await api.put(
        `/reports/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      await fetchReports();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to accept report");
    } finally {
      setAcceptingId(null);
    }
  };

  const markCollected = async (id) => {
    try {
      setCollectingId(id);

      await api.put(
        `/reports/${id}/collect`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      await fetchReports();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to mark as collected");
    } finally {
      setCollectingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (status === "reported") {
      return "bg-amber-50 text-amber-700 border border-amber-200";
    }

    if (status === "accepted") {
      return "bg-blue-50 text-blue-700 border border-blue-200";
    }

    if (status === "collected") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }

    return "bg-slate-100 text-slate-700 border border-slate-200";
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                  Collector Panel
                </p>
                <h1 className="mt-1 text-3xl md:text-4xl font-bold text-slate-900">
                  Collector Dashboard
                </h1>
                <p className="mt-2 text-slate-600 max-w-2xl">
                  Manage newly reported waste requests, accept available tasks,
                  and update the collection status of reports assigned to you.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4">
                <p className="text-sm text-slate-500">Logged in as</p>
                <p className="text-lg font-semibold text-slate-900">
                  {user?.name}
                </p>
                <p className="text-sm capitalize text-emerald-700">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500">
              Available Reports
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {availableReports.length}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Reports waiting to be accepted by collectors.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500">
              Assigned Reports
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {assignedReports.length}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Reports currently assigned to you for action.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-medium text-slate-500">
              Collected Reports
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {
                assignedReports.filter(
                  (report) => report.status === "collected"
                ).length
              }
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Reports already marked as collected.
            </p>
          </div>
        </div>

        {/* Available Reports Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Available Reports
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Accept a report to take ownership of the collection task.
              </p>
            </div>
          </div>

          {availableReports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-slate-800">
                No available reports
              </h3>
              <p className="mt-2 text-slate-500">
                There are currently no new reports waiting to be accepted.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {availableReports.map((report) => (
                <div
                  key={report._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {report.imageUrl ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={report.imageUrl}
                        alt="Waste report"
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span
                        className={`absolute top-4 right-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          "reported"
                        )}`}
                      >
                        Reported
                      </span>
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">
                      No image available
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                      {report.description}
                    </h3>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p>
                        <span className="font-medium text-slate-800">
                          Created:
                        </span>{" "}
                        {formatDate(report.createdAt)}
                      </p>

                      {report.reportedBy?.name && (
                        <p>
                          <span className="font-medium text-slate-800">
                            Reported by:
                          </span>{" "}
                          {report.reportedBy.name}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => acceptReport(report._id)}
                      disabled={acceptingId === report._id}
                      className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {acceptingId === report._id
                        ? "Accepting..."
                        : "Accept Report"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Assigned Reports Section */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Assigned Reports
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Update the collection status for the reports assigned to you.
              </p>
            </div>
          </div>

          {assignedReports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-slate-800">
                No assigned reports
              </h3>
              <p className="mt-2 text-slate-500">
                Accept an available report to see it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {assignedReports.map((report) => {
                const alreadyCollected = report.status === "collected";

                return (
                  <div
                    key={report._id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {report.imageUrl ? (
                      <div className="relative overflow-hidden">
                        <img
                          src={report.imageUrl}
                          alt="Assigned waste report"
                          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span
                          className={`absolute top-4 right-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                      </div>
                    ) : (
                      <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">
                        No image available
                      </div>
                    )}

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                        {report.description}
                      </h3>

                      <div className="mt-4 space-y-2 text-sm text-slate-600">
                        <p>
                          <span className="font-medium text-slate-800">
                            Created:
                          </span>{" "}
                          {formatDate(report.createdAt)}
                        </p>

                        {report.reportedBy?.name && (
                          <p>
                            <span className="font-medium text-slate-800">
                              Reported by:
                            </span>{" "}
                            {report.reportedBy.name}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => markCollected(report._id)}
                        disabled={
                          collectingId === report._id || alreadyCollected
                        }
                        className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                          alreadyCollected
                            ? "bg-slate-400 cursor-not-allowed"
                            : "bg-emerald-600 hover:bg-emerald-700"
                        } disabled:opacity-70`}
                      >
                        {alreadyCollected
                          ? "Already Collected"
                          : collectingId === report._id
                          ? "Updating..."
                          : "Mark as Collected"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default CollectorDashboard;
