export function useUserRole() {
  // Récupère  utilisateur connecté depuis ton état actuel, contexte ou localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const isOrganizer = user?.roles?.some(role => role.name === 'organizer');
  const isAdmin = user?.roles?.some(role => role.name === 'admin');

  return { user, isOrganizer, isAdmin, isAuthenticated: !!user };
}j