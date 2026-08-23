import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import NavigationSetter from "./Components/shared/NavigationSetter";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <NavigationSetter /> {/*Capturer le navigate globalement*/}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
