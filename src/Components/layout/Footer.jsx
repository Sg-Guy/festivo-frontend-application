import React from "react";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-[var(--dark-background)] border-t border-gray-200 dark:border-[var(--dark-border)] text-gray-600 dark:text-gray-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="bg-[var(--primary)] p-1.5 rounded-lg text-white shadow-sm">
                <Zap size={18} />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-gray-900 dark:text-[var(--dark-text)]">
                FESTIVO
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              La plateforme moderne pour créer, gérer et vivre des événements inoubliables.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-[var(--dark-text)] text-sm mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-[var(--primary)] transition">Fonctionnalités</a></li>
              <li><a href="#pricing" className="hover:text-[var(--primary)] transition">Tarifs</a></li>
              <li><a href="#events" className="hover:text-[var(--primary)] transition">Événements</a></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-[var(--dark-text)] text-sm mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[var(--primary)] transition">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition">Mentions légales</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-[var(--dark-text)] text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[var(--primary)] transition">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-[var(--primary)] transition">Contactez-nous</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright et Réseaux */}
        <div className="pt-8 border-t border-gray-200 dark:border-[var(--dark-border)] flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Festivo. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-[var(--primary)] transition">Twitter</a>
            <a href="#" className="hover:text-[var(--primary)] transition">LinkedIn</a>
            <a href="#" className="hover:text-[var(--primary)] transition">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}