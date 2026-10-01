import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
// Import direct des classes pour Fabric v6 / v7
import { Canvas, FabricText } from "fabric";
import Button from "../../../../Components/ui/Button";
import { Loader2, Sparkles, LayoutTemplate } from "lucide-react";
import { PictureBaseUrl } from "../../../../constants/picturesBaseUrl";

export default function StepTicketVisual() {
  const { watch, setValue } = useFormContext();
  const visualType = watch("ticket_visual_type") || "preset";
  const selectedPreset = watch("selected_preset_template");

  const [selectedObject, setSelectedObject] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#1e293b");

  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  const [presetTemplates, setPresetTemplates] = useState([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [selectedFontSize, setSelectedFontSize] = useState(16);
  const [selectedFontFamily, setSelectedFontFamily] = useState("sans-serif");

  // 1. Récupération des modèles prédéfinis (images) depuis l'API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoadingTemplates(true);
        // Simulation de données avec des URLs d'images de tickets
        setTimeout(() => {
          setPresetTemplates([
            {
              id: 1,
              name: "Modèle Minimaliste Or",
              image_url: `${PictureBaseUrl.EVENTS}/ticketsTemplates/basic_template.png`,
            },
            {
              id: 2,
              name: "Modèle Néon Festival",
              image_url:
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60",
            },
            {
              id: 3,
              name: "Modèle Dark Techno",
              image_url:
                "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500&auto=format&fit=crop&q=60",
            },
          ]);
          setIsLoadingTemplates(false);
        }, 500);
      } catch (err) {
        console.error("Erreur chargement templates", err);
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  // 2. Initialisation de Fabric.js v7 pour le mode personnalisé
  useEffect(() => {
    let canvasInstance = null;

    if (visualType === "custom" && canvasRef.current) {
      canvasInstance = new Canvas(canvasRef.current, {
        width: 500,
        height: 220,
        backgroundColor: "#f8fafc",
      });

      const text = new FabricText("Billet Officiel - Festivo", {
        left: 30,
        top: 30,
        fontSize: 16,
        fill: "#1e293b",
        fontFamily: "sans-serif",
      });

      const title = new FabricText("FESTIVAL SUMMER", {
        left: 30,
        top: 80,
        fontSize: 24,
        fill: "#1e293b",
        fontFamily: "sans-serif",
      });

      canvasInstance.add(text);
      canvasInstance.add(title);

      canvasInstance.on("selection:created", (event) => {
        const object = event.selected[0];

        setSelectedObject(object);
        setSelectedText(object.text || "");
        setSelectedFontSize(object.fontSize || 16);
        setSelectedColor(object.fill || "#1e293b");
        setSelectedFontFamily(object.fontFamily || "sans-serif");
      });

      canvasInstance.on("selection:updated", (event) => {
        const object = event.selected[0];

        setSelectedObject(object);
        setSelectedText(object.text || "");
        setSelectedFontSize(object.fontSize || 16);
        setSelectedColor(object.fill || "#1e293b");
        setSelectedFontFamily(object.fontFamily || "sans-serif");
      });

      canvasInstance.on("selection:cleared", () => {
        setSelectedObject(null);
        setSelectedText("");
        setSelectedFontSize(16);
        setSelectedColor("#1e293b");
        setSelectedFontFamily("sans-serif");
      });

      setFabricCanvas(canvasInstance);
    }

    return () => {
      if (canvasInstance) {
        canvasInstance.dispose();
        setFabricCanvas(null);
        setSelectedObject(null);
      }
    };
  }, [visualType]);

  const saveCanvasData = () => {
    if (fabricCanvas) {
      const json = fabricCanvas.toJSON();
      setValue("custom_ticket_canvas_json", json);
      alert("Design personnalisé enregistré avec succès !");
    }
  };

  return (
    <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Visuel et Design des Billets
        </h2>
        <p className="text-xs text-gray-500">
          Choisissez un modèle de ticket prêt à l'emploi ou personnalisez votre
          propre design.
        </p>
      </div>

      {/* Boutons de bascule */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setValue("ticket_visual_type", "preset")}
          className={`flex-1 p-4 border rounded-2xl text-center font-medium text-sm flex items-center justify-center gap-2 transition ${visualType === "preset" ? "border-[var(--primary)] bg-orange-50/40 text-[var(--primary)] shadow-sm" : "border-gray-200 dark:border-gray-800 text-gray-500"}`}
        >
          <LayoutTemplate size={18} />
          Modèles prédéfinis
        </button>
        <button
          type="button"
          onClick={() => setValue("ticket_visual_type", "custom")}
          className={`flex-1 p-4 border rounded-2xl text-center font-medium text-sm flex items-center justify-center gap-2 transition ${visualType === "custom" ? "border-[var(--primary)] bg-orange-50/40 text-[var(--primary)] shadow-sm" : "border-gray-200 dark:border-gray-800 text-gray-500"}`}
        >
          <Sparkles size={18} />
          Personnaliser (Fabric.js)
        </button>
      </div>

      {/* Contenu conditionnel */}

      {visualType === "preset" ? (
        <div>
          {isLoadingTemplates ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
              <p className="text-xs text-gray-400">
                Chargement des modèles de tickets...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {presetTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setValue("selected_preset_template", tpl.id)}
                  className={`border p-4 rounded-2xl cursor-pointer text-center space-y-3 transition ${selectedPreset === tpl.id ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20 shadow-md bg-orange-50/10" : "border-gray-200 dark:border-gray-800 hover:border-gray-300"}`}
                >
                  <div className="h-40 w-full rounded-xl overflow-hidden border border-gray-100 bg-gray-50 relative">
                    <img
                      src={tpl.image_url}
                      alt={tpl.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <p className="font-semibold text-xs text-gray-800 dark:text-gray-200">
                    {tpl.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 flex flex-col items-center">
          <p className="text-xs text-gray-500">
            Glissez, déposez et ajustez les éléments sur votre billet :
          </p>

          {selectedObject?.type === "text" && (
            <div className="w-full max-w-lg">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Texte sélectionné
              </label>

              <input
                type="text"
                value={selectedText}
                onChange={(e) => {
                  const value = e.target.value;

                  setSelectedText(value);

                  selectedObject.set("text", value);

                  fabricCanvas.requestRenderAll();
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[var(--dark-surface)] text-gray-900 dark:text-white outline-none focus:border-[var(--primary)]"
              />

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Taille du texte
                </label>

                <input
                  type="number"
                  min="8"
                  max="100"
                  value={selectedFontSize}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    setSelectedFontSize(value);

                    selectedObject.set("fontSize", value);

                    fabricCanvas.requestRenderAll();
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[var(--dark-surface)] text-gray-900 dark:text-white outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Couleur du texte
                </label>

                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => {
                    const value = e.target.value;

                    setSelectedColor(value);

                    selectedObject.set("fill", value);

                    fabricCanvas.requestRenderAll();
                  }}
                  className="w-12 h-10 p-1 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Police du texte
                </label>

                <select
                  value={selectedFontFamily}
                  onChange={(e) => {
                    const value = e.target.value;

                    setSelectedFontFamily(value);

                    selectedObject.set("fontFamily", value);

                    fabricCanvas.requestRenderAll();
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[var(--dark-surface)] text-gray-900 dark:text-white outline-none focus:border-[var(--primary)]"
                >
                  <option value="sans-serif">Sans Serif</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                </select>
              </div>
            </div>
          )}

          <div className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-inner bg-slate-50">
            <canvas ref={canvasRef} />
          </div>

          <div className="w-48">
            <Button type="button" variant="secondary" onClick={saveCanvasData}>
              Enregistrer le design
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
