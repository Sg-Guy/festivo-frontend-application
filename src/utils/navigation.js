let navigateFunction = null;

// Enregistre la fonction de navigation fournie par le routeur
export const setNavigate = (nav) => {
  navigateFunction = nav;
};

// Fonction à appeler n'importe où dans le code (hors composant)
export const navigateTo = (to, options) => {
  if (navigateFunction) {
    navigateFunction(to, options);
  } else {
    // Fallback si le routeur n'est pas encore monté
    window.location.href = to;
  }
};