import { ShieldAlert } from "lucide-react";
import { navigateTo } from "../../utils/navigation";

export default function Forbidden () {
    return (
        <div className="min-h-[50vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-8 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-red-500 mx-auto">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)]">
            Accès refusé (403)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vous n'avez pas les autorisations nécessaires pour afficher cette page.
          </p>
          <div className="pt-4 flex items-center justify-center space-x-3">
            <button
              onClick={() => navigateTo(-1)}
              className="px-4 py-2.5 bg-gray-100 dark:bg-[var(--dark-background)] text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    )
}