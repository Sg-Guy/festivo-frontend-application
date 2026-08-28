import { 
  Home, Compass, Tag, Calendar, 
  LayoutDashboard, Users, Ticket, Settings, 
  ShieldAlert, BarChart3, Wallet 
} from "lucide-react";
import { ROUTES } from "../constants/routes";

export const NAVIGATION_CONFIG = {
  // GUEST
  GUEST: [
    { title: "Accueil", icon: Home, to: "/" },
    { title: "Fonctionnalités", icon: Compass, to: "/#features" },
    { title: "Tarifs", icon: Tag, to: "/#pricing" },
    { title: "Événements", icon: Calendar, to: "/#events" },
  ],

  // Participant / Client 
  PARTICIPANT: [
    { title: "Explorer", icon: Compass, to: "/" },
    { title: "Mes Billets", icon: Ticket, to: "/my-tickets" },
    { title: "Mon profil", icon: Wallet, to: ROUTES.PROFILE },
    { title: "Paramètres", icon: Settings, to: "/settings" },
  ],

  // Organisateur
  ORGANIZER: [
    { title: "Vue d'ensemble", icon: LayoutDashboard, to: "/dashboard" },
    { title: "Organisations & Equipes", icon: Calendar, to: ROUTES.ORGANIZATIONS_LIST },
    { title: "Mes Événements", icon: Calendar, to: "/organizer/events" },
    { title: "Ventes & Billetterie", icon: BarChart3, to: "/organizer/sales" },
    { title: "Participants", icon: Users, to: "/organizer/attendees" },
    { title: "Paramètres", icon: Settings, to: "/settings" },
  ],

  // Administrateur
  ADMIN: [
    { title: "Vue d'ensemble", icon: LayoutDashboard, to: "/admin/dashboard" },
    { title: "Gestion Utilisateurs", icon: Users, to: "/admin/users" },
    { title: "Tous les Événements", icon: Calendar, to: "/admin/events" },
    { title: "Sécurité & Logs", icon: ShieldAlert, to: "/admin/logs" },
    { title: "Paramètres Système", icon: Settings, to: "/admin/settings" },
  ],
};