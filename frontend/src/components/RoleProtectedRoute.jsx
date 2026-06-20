import { Navigate } from "react-router-dom";

function RoleProtectedRoute({
  children,
  role,
}) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default RoleProtectedRoute;