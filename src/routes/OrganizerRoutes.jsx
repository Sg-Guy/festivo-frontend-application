import { Navigate } from 'react-router-dom';
import { useUserRole } from '../utils/roleIdentifier';

export function OrganizerRoute({ children }) {
  const { isOrganizer, isAuthenticated } = useUserRole();

  // Si pas connecté du tout - > direction login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si connecté mais pas organisateur - > direction accueil / dashboard standard
  if (!isOrganizer) {
    return <Navigate to="/" replace />; 
  }

  // Si c'est bon, on affiche la page
  return children;
}