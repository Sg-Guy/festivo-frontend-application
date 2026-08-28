import React from "react";
import { AlertTriangle, ShieldAlert, FileQuestion, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const status = error?.response?.status || error?.status;

  const message = error?.response?.data?.message;

  if (status === 403) {
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
              onClick={() => navigate(-1)}
              className="px-4 py-2.5 bg-gray-100 dark:bg-[var(--dark-background)] text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 404) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-8 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-500 mx-auto">
            <FileQuestion size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)]">
             Introuvable (404)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            La ressource ou la page demandée n'existe pas.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2.5 bg-[var(--primary)] text-white text-xs font-semibold rounded-xl"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Erreur 5xx
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-8 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-red-500 mx-auto">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)]">
          Oups, une erreur est survenue
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {message || "Une erreur technique s'est produite."}
        </p>
        <div className="pt-4 flex items-center justify-center space-x-3">
          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[var(--primary)] text-white text-xs font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
          >
            <RefreshCw size={14} />
            <span>Réessayer</span>
          </button>
        </div>
      </div>
    </div>
  );
}