import React from 'react';
// Importez votre vidéo locale (ajustez le chemin selon l'emplacement de votre fichier)
import backgroundVideo from '/src/assets/bg.mp4';

const HeroSection = () => {
  return (
    <header className="relative w-full min-h-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      
      {/* --- ARRIÈRE-PLAN VIDÉO LOCALE --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline // Indispensable pour autoriser la lecture automatique sur mobile
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-75"
        />
      </div>

      {/* Overlay sombre pour garantir le contraste du texte */}
      <div className="absolute inset-0 bg-neutral-950/80 z-10"></div>
      
      {/* --- CONTENU DE L'INTERFACE --- */}
      <div className="relative z-20 flex flex-col w-full h-full">
        
        {/* -- Navbar -- */}
        <nav className="w-full flex items-center justify-between px-6 md:px-12 py-5 border-b border-neutral-800/50">
          {/* Logo */}
          <div className="flex items-center gap-3 text-white">
            <div className="bg-orange-500 p-2 rounded-full text-neutral-950 font-bold flex items-center justify-center w-8 h-8">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9v8l10-12h-9V2z"/></svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight">FESTIVO</span>
          </div>

          {/* Liens Desktop */}
          <div className="hidden md:flex items-center gap-8 text-neutral-300 font-medium">
            <a href="#" className="hover:text-white transition">Fonctionnalités</a>
            <a href="#" className="hover:text-white transition">Tarifs</a>
            <a href="#" className="hover:text-white transition">Événements</a>
          </div>

          {/* Boutons Droite */}
          <div className="flex items-center gap-3 md:gap-6">
            <a href="#" className="hidden md:block text-neutral-200 font-semibold hover:text-white transition">
              Connexion
            </a>
            <button className="bg-orange-500 text-neutral-950 px-5 py-2.5 rounded-full font-semibold hover:bg-orange-400 transition">
              Commencer
            </button>
          </div>
        </nav>

        {/* -- Contenu Hero Central -- */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center">
          
          {/* Badge des événements actifs */}
          <div className="bg-neutral-800/70 text-neutral-200 text-xs px-4 py-1.5 rounded-full flex items-center gap-2 mb-12 md:mb-16">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            312 événements actifs au Bénin
          </div>

          {/* Titre Principal avec Gradient */}
          <h1 className="max-w-5xl mx-auto font-extrabold leading-[1.1] tracking-tighter mb-10">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
              La billetterie
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-orange-700 via-amber-700 to-amber-700 pt-2">
              événementielle intelligente
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="max-w-2xl mx-auto text-neutral-300 text-base md:text-lg lg:text-xl mb-16 md:mb-20 font-light leading-relaxed">
            Vendez vos billets, encaissez via Mobile Money, scannez hors-ligne.
            <br className="hidden md:block"/>
            FESTIVO est la plateforme pensée pour l'Afrique de l'Ouest.
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-row items-center gap-5">
            <button className="bg-orange-500 text-neutral-950 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-orange-400 transition w-full sm:w-auto justify-center group">
              Créer mon premier événement 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="bg-transparent border border-neutral-600 text-neutral-100 px-8 py-4 rounded-full font-semibold text-lg hover:border-neutral-300 hover:text-white transition w-full sm:w-auto justify-center flex">
              Découvrir les événements
            </button>
          </div>

        </main>
        
        {/* Footer */}
        <footer className="w-full px-6 py-4 text-sm text-neutral-600 text-center md:text-left border-t border-neutral-800/50">
            &copy; 2026 FESTIVO. Tous droits réservés.
        </footer>
      </div>

      {/* Bouton Flottant */}
      <button className="fixed bottom-6 right-6 bg-orange-500 p-3.5 rounded-full text-neutral-950 z-30 shadow-xl hover:scale-105 transition-transform">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </button>

    </header>
  );
};

export default HeroSection;