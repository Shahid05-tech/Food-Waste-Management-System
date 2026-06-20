import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      if (data.role === "admin") {
        navigate("/admin");
      } else if (
        data.role === "collector"
      ) {
        navigate("/collector");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)]" />
      </div>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between p-10 xl:p-14 border-r border-white/10">
          <div>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                F
              </div>

              <div>
                <h1 className="text-lg font-semibold text-white">
                  FoodWise
                </h1>
                <p className="text-sm text-slate-300">
                  Smart food waste reporting platform
                </p>
              </div>
            </div>

            <div className="mt-16 max-w-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-300/80 font-medium">
                Food Waste Management System
              </p>

              <h2 className="mt-5 text-5xl font-bold leading-tight text-white">
                Track, report and manage food waste with a cleaner workflow.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300">
                FoodWise helps citizens report waste, enables collectors to
                manage pickups efficiently, and gives administrators a clear
                operational view through analytics and live reporting.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">
                24/7
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Reporting access
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">
                Live
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Status updates
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-3xl font-bold text-white">
                Smart
              </p>
              <p className="mt-2 text-sm text-slate-300">
                AI-assisted analysis
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-xl">
            <div className="rounded-[32px] border border-white/10 bg-white shadow-2xl shadow-black/20 overflow-hidden">
              {/* Mobile brand header */}
              <div className="lg:hidden px-6 pt-6">
                <div className="inline-flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                    F
                  </div>

                  <div>
                    <h1 className="text-lg font-bold text-slate-900">
                      FoodWise
                    </h1>
                    <p className="text-sm text-slate-500">
                      Food Waste Management Platform
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-8 sm:px-8 sm:py-10 md:px-10">
                <div className="mb-8">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-600">
                    Sign in
                  </p>

                  <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                    Welcome back
                  </h2>

                  <p className="mt-3 text-sm sm:text-base leading-7 text-slate-500">
                    Enter your credentials to continue to your FoodWise
                    workspace.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      className="
                        w-full rounded-2xl border border-slate-200 bg-slate-50
                        px-4 py-3.5 text-sm text-slate-900 outline-none
                        transition placeholder:text-slate-400
                        focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      required
                      className="
                        w-full rounded-2xl border border-slate-200 bg-slate-50
                        px-4 py-3.5 text-sm text-slate-900 outline-none
                        transition placeholder:text-slate-400
                        focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100
                      "
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full rounded-2xl bg-slate-900 px-4 py-3.5
                      text-sm font-semibold text-white
                      transition hover:bg-slate-800
                      disabled:cursor-not-allowed disabled:opacity-70
                    "
                  >
                    {loading
                      ? "Signing in..."
                      : "Sign in"}
                  </button>
                </form>

                <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-slate-600">
                    New to FoodWise?
                  </p>

                  <Link
                    to="/register"
                    className="mt-2 inline-flex text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Create an account
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Secure access for citizens, collectors and administrators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;