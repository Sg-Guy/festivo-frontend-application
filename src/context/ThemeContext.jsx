import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Par défaut, on récupère le thème sauvegardé ou on initialise sur "dark" (puisque c'est ton mode par défaut)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('festivo_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('festivo_theme', theme);
    // On met à jour la classe sur le document root pour Tailwind ou le CSS global
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);