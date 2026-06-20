import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import api from "../api/axios";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await api.get("/auth/leaderboard");
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const topThree = users.slice(0, 3);
  const others = users.slice(3);

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRankStyle = (index) => {
    if (index === 0) {
      return {
        badge: "1",
        badgeClass:
          "bg-gradient-to-r from-amber-400 to-yellow-500 text-white",
        borderClass: "border-amber-200",
        ringClass: "ring-amber-100",
      };
    }

    if (index === 1) {
      return {
        badge: "2",
        badgeClass:
          "bg-gradient-to-r from-slate-400 to-slate-500 text-white",
        borderClass: "border-slate-200",
        ringClass: "ring-slate-100",
      };
    }

    if (index === 2) {
      return {
        badge: "3",
        badgeClass:
          "bg-gradient-to-r from-orange-400 to-amber-600 text-white",
        borderClass: "border-orange-200",
        ringClass: "ring-orange-100",
      };
    }

    return {
      badge: `${index + 1}`,
      badgeClass: "bg-slate-100 text-slate-700",
      borderClass: "border-slate-200",
      ringClass: "ring-slate-100",
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 shadow-sm">
              Community Rankings
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Leaderboard
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-7">
              A live view of contributors making the biggest impact in reducing
              food waste across the platform.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Contributors
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {users.length}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Ranked users participating in the platform
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Highest Score
            </p>
            <h2 className="mt-3 text-3xl font-bold text-emerald-600">
              {users[0]?.points || 0}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Current top contributor score
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Top Badge
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              {users[0]?.badge || "—"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Badge held by the current leader
            </p>
          </div>
        </div>

        {/* Top 3 */}
        {topThree.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Top Contributors
              </h2>
              <span className="text-sm text-slate-500">
                Highest ranked contributors this cycle
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {topThree.map((user, index) => {
                const style = getRankStyle(index);

                return (
                  <div
                    key={user._id}
                    className={`relative overflow-hidden rounded-3xl border ${style.borderClass} bg-white shadow-sm ring-1 ${style.ringClass} transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />

                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${style.badgeClass}`}
                        >
                          {style.badge}
                        </div>

                        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {user.badge || "Member"}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg font-bold text-white shadow-md">
                          {getInitials(user.name)}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {user.name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            Rank #{index + 1}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Points
                          </p>
                          <p className="mt-2 text-2xl font-bold text-emerald-600">
                            {user.points}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Badge
                          </p>
                          <p className="mt-2 text-base font-semibold text-slate-800 truncate">
                            {user.badge || "Member"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Full ranking list */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-200 px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Full Rankings
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Sorted by contribution points
              </p>
            </div>

            <div className="text-sm text-slate-500">
              {users.length} ranked users
            </div>
          </div>

          {users.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-xl font-semibold text-slate-800">
                No leaderboard data available
              </h3>
              <p className="mt-2 text-slate-500">
                Rankings will appear once users start contributing reports.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {users.map((user, index) => {
                const style = getRankStyle(index);

                return (
                  <div
                    key={user._id}
                    className="px-4 sm:px-6 py-4 hover:bg-slate-50 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${style.badgeClass}`}
                        >
                          {style.badge}
                        </div>

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-sm font-bold text-white">
                          {getInitials(user.name)}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-base sm:text-lg font-semibold text-slate-900">
                            {user.name}
                          </h3>
                          <p className="truncate text-sm text-slate-500">
                            {user.badge || "Member"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-2">
                          <p className="text-xs text-slate-500">Rank</p>
                          <p className="text-sm font-semibold text-slate-800">
                            #{index + 1}
                          </p>
                        </div>

                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2">
                          <p className="text-xs text-emerald-700">Points</p>
                          <p className="text-sm font-semibold text-emerald-700">
                            {user.points}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-2">
                          <p className="text-xs text-slate-500">Badge</p>
                          <p className="text-sm font-semibold text-slate-800">
                            {user.badge || "Member"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Extra section */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
              How rankings work
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Rankings are based on contribution points earned through report
              submissions, successful collections, and continued activity within
              the waste management platform.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
              Progress system
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              As contributors gain more points, their badge level improves.
              This helps highlight the most active and impactful users in the
              community.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Leaderboard;

