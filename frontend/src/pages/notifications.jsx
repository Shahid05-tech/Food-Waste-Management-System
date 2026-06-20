import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import api from "../api/axios";

function Notifications() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get("/notifications", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setNotifications(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-blue-50" />
            <div className="relative px-6 py-8 sm:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                    Updates
                  </p>
                  <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
                    Notifications
                  </h1>
                  <p className="mt-3 max-w-2xl text-slate-600">
                    Track report updates, collection progress, and important
                    system activity in one place.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 min-w-[150px] text-center">
                    <p className="text-sm font-medium text-slate-500">
                      Total Alerts
                    </p>
                    <p className="mt-1 text-3xl font-bold text-emerald-600">
                      {notifications.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <svg
                  className="h-8 w-8 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                No notifications yet
              </h2>

              <p className="mt-2 text-slate-500 max-w-md mx-auto">
                Updates about accepted reports, collected waste, and other
                activity will appear here once actions start happening.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={notification._id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    {/* Left icon */}
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                            {notification.message}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                              Notification #{index + 1}
                            </span>

                            <span className="hidden sm:inline text-slate-300">
                              •
                            </span>

                            <span>{formatDate(notification.createdAt)}</span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                            New
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Notifications;