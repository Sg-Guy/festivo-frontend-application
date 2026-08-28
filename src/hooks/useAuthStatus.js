import { useState, useEffect } from "react";

export function useAuthStatus() {
  const [user, setUser] = useState(() => {
    // Récupération de l'utilisateur
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Mise à jour du local en cas de changment
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Evenenements à déclencher
    window.addEventListener("auth-change", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("auth-change", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return user;
}