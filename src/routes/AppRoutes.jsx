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
import Profile from "../pages/profile/Profile";
import TopBar from "../Components/layout/TopBar";
import CreateOrganization from "../pages/organizer/createOrganization";
import OrganizationList from "../pages/organizer/organizationsList";
import OrganizationDetails from "../pages/organizer/organizationDetails";
import AcceptInvitation from "../pages/invitations/AcceptInvitation";
import Footer from "../Components/layout/Footer";
import { ErrorBoundary } from "react-error-boundary";
import AppErrorFallback from "../Components/errors/AppErrorFallback";
import CreateEvent from "../pages/organizer/Events/CreateEvent";
import OrganizerEventsList from "../pages/organizer/Events/OrganizerEventList";
import OrganizerEventDetails from "../pages/organizer/Events/OrganizerEventDetails";
import { OrganizerRoute } from "./OrganizerRoutes";
import MembersPage from "../pages/organizer/Members/MembersPage";

export default function AppRoutes() {
  return (
    <ErrorBoundary
      FallbackComponent={AppErrorFallback}
      onReset={() => {
        // Action optionnelle quand l'utilisateur clique sur "Réessayer"
        // (ex: vider le cache ou recharger la page)
        window.location.reload();
      }}
    >
      <Routes>
        {/* Routes publiques avec le Layout global (NavBar + Footer) */}
        <Route element={<TopBar />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />

          <Route path={ROUTES.EVENTS} element={<Events />} />

          <Route path={ROUTES.EVENT_DETAILS} element={<EventDetails />} />

          <Route path={ROUTES.PROFILE} element={<Profile />} />

          <Route path={ROUTES.CREATE_ORGANIZATION} element={<CreateOrganization />}/>

          <Route path={ROUTES.ORGANIZATIONS_LIST} element={<OrganizationList />} />

          <Route path={ROUTES.ORGANIZATIONS_DETAILS} element={<OrganizationDetails />} />

          <Route path={ROUTES.CREATE_EVENT} element={<OrganizerRoute> <CreateEvent /> </OrganizerRoute>} />

          <Route path={ROUTES.ORGANIZER_EVENTS} element={<OrganizerRoute> <OrganizerEventsList /> </OrganizerRoute>} />

          <Route path={ROUTES.ORGANIZATION_MEMBERS} element={<OrganizerRoute> <MembersPage /> </OrganizerRoute>} />

          <Route path={ROUTES.ORGANIZER_EVENT_DETAILS} element={<OrganizerEventDetails />} />
      </Route>

      <Route element={<Footer />} />

        {/* Routes sans la NavBar globale */}
        <Route element={<GuestRoute />}>

          <Route path={ROUTES.LOGIN} element={<Login />} />

          <Route path="/auth/login?invitation=true" element={<Login />} />

          <Route path={ROUTES.REGISTER} element={<Register />} />

          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          
        </Route>

        <Route path={ROUTES.ACCEPT_INVITATION} element={<AcceptInvitation />} />

        {/* Page 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
