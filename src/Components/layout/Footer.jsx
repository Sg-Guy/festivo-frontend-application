import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-8 px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0c14] text-gray-600 dark:text-gray-400 text-sm transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="bg-orange-500 p-1.5 rounded-lg text-white">
            <Zap size={16} />
          </div>
          <span className="font-extrabold text-gray-900 dark:text-white tracking-wider">
            FESTIVO
          </span>
          <span className="text-gray-400"> — Cotonou, Bénin</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          © 2026 FESTIVO. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}