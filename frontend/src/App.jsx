import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect
} from "react";

import socket from "./socket";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateReport from "./pages/CreateReport";
import MyReports from "./pages/MyReports";
import CollectorDashboard from "./pages/CollectorDashboard";
import Leaderboard from "./pages/Leadboard";
import AdminDashboard from "./pages/AdminDashboard";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import WasteMap from "./pages/WasteMap";
import Notifications from "./pages/notifications";

function App() {

  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (user?._id) {

      socket.emit(
        "join",
        user._id
      );

      socket.on(
        "notification",
        (data) => {

          alert(
            `🔔 ${data.message}`
          );

        }
      );
    }

    return () => {

      socket.off(
        "notification"
      );

    };

  }, []);

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path=""
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-report"
          element={
            <ProtectedRoute>
              <CreateReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <CreateReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myreports"
          element={
            <ProtectedRoute>
              <MyReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-reports"
          element={
            <ProtectedRoute>
              <MyReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/collector"
          element={
            <RoleProtectedRoute role="collector">
              <CollectorDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute role="admin">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={<WasteMap />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

