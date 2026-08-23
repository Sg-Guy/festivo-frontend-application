import React from "react";
import { Routes, Route } from "react-router-dom";
// Layout principal
import Layout from "../Components/layout/Layout";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
import Events from "../pages/events/Event";
import EventDetails from "../pages/events/EventDetails";
import ResetPassword from "../pages/auth/ResetPassword";
import GuestRoute from "./GuestRoute";
import { ROUTES } from "../constants/routes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes publiques avec le Layout global (NavBar + Footer) */}
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.EVENTS} element={<Events />} />
        <Route path={ROUTES.EVENT_DETAILS} element={<EventDetails />} />
      </Route>

      {/* Routes sans la NavBar globale */}
      <Route element={<GuestRoute />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      </Route>

      {/* Page 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
