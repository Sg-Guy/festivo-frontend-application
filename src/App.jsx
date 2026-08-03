import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlassModal from "./Components/modals/glassModal";
import CleanModal from "./Components/modals/cleanModal";
import BentoModal from "./Components/modals/bentoModal";
import NavBar from "./Components/layout/NavBar";
import HeroSection from "./Components/landingPage/HeroSection";
import LandingPage from "./pages/LandingPage";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* <ListePosts />
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition"
      >
        Afficher les infos
      </button>

      <BentoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Détails du Profil Serveur"
      >
        <p>Voici les informations demandées concernant votre conteneur.</p>
        <p className="mt-2 text-xs text-slate-400">
          Dernière synchronisation : il y a 2 minutes.
        </p>
      </BentoModal> */}
    <LandingPage />
    </div>
  );
}

export default App;
