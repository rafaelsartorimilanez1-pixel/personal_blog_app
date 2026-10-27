import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute() {
  const { token } = useAuth();

  console.log("Token no ProtectedRoute:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
