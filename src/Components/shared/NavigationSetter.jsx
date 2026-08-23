import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "../../utils/navigation";

export default function NavigationSetter() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
}

//Récupère le use navigate et l'injecte dans le helper setNavigate