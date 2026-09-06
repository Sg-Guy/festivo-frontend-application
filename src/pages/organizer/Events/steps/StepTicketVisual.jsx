import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
//import { fabric } from "fabric";
import Button from "../../../../Components/ui/Button";

export default function StepTicketVisual() {
  const { watch, setValue } = useFormContext();
  const visualType = watch("ticket_visual_type");
  const selectedPreset = watch("selected_preset_template");
  
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  const presetTemplates = [
    { id: 1, name: "Modèle Minimaliste Or", previewColor: "bg-amber-100 text-amber-800 border-amber-200" },
    { id: 2, name: "Modèle Néon Festival", previewColor: "bg-purple-100 text-purple-800 border-purple-200" },
  ];

  useEffect(() => {
    if (visualType === "custom" && canvasRef.current && !fabricCanvas) {
      const canvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 200,
        backgroundColor: "#f8fafc",
      });
      setFabricCanvas(canvas);

      const text = new fabric.Text("Billet Officiel - Festivo", { left: 30, top: 30, fontSize: 16, fill: "#1e293b" });
      canvas.add(text);

      return () => {
        canvas.dispose();
      };
    }
  }, [visualType, fabricCanvas]);

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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Visuel et Design des Billets</h2>
        <p className="text-xs text-gray-500">Choisissez un modèle prêt à l'emploi ou personnalisez votre propre billet.</p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setValue("ticket_visual_type", "preset")}
          className={`flex-1 p-4 border rounded-2xl text-center font-medium text-sm transition ${visualType === "preset" ? "border-[var(--primary)] bg-orange-50/40 text-[var(--primary)] shadow-sm" : "border-gray-200 dark:border-gray-800 text-gray-500"}`}
        >
          Modèles prédéfinis
        </button>
        <button
          type="button"
          onClick={() => setValue("ticket_visual_type", "custom")}
          className={`flex-1 p-4 border rounded-2xl text-center font-medium text-sm transition ${visualType === "custom" ? "border-[var(--primary)] bg-orange-50/40 text-[var(--primary)] shadow-sm" : "border-gray-200 dark:border-gray-800 text-gray-500"}`}
        >
          Personnaliser (Fabric.js)
        </button>
      </div>

      {visualType === "preset" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presetTemplates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => setValue("selected_preset_template", tpl.id)}
              className={`border p-5 rounded-2xl cursor-pointer text-center space-y-3 transition ${selectedPreset === tpl.id ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20 shadow-md bg-orange-50/10" : "border-gray-200 dark:border-gray-800 hover:border-gray-300"}`}
            >
              <div className={`h-36 rounded-xl border flex items-center justify-center font-bold text-sm ${tpl.previewColor}`}>
                {tpl.name}
              </div>
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{tpl.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 flex flex-col items-center">
          <p className="text-xs text-gray-500">Glissez, déposez et ajustez les éléments sur votre billet :</p>
          <div className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-inner">
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