import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

//  Créer une instance de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Indique à React Query de propager l'erreur à l'ErrorBoundary
      throwOnError : (error) => {
        // on peut decider quels codes HTTP doivent déclencher l'Error Boundary (ex: 403, 404, 500)
        const status = error?.response?.status;
        return status ? status >= 400 : true;
      },
      retry: 5,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Fournir le client à l'application */}
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
