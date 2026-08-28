import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
