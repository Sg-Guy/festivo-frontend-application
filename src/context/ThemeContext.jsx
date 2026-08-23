import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Récupère le thème sauvegardé ou on initialise sur "dark"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('festivo_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('festivo_theme', theme);
    // Met à jour la classe sur le document root pour Tailwind ou le CSS global
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