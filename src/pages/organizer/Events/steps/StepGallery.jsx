import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { ImagePlus, Trash2, UploadCloud, CheckCircle2 } from "lucide-react";
import Button from "../../../../Components/ui/Button";
import Input from "../../../../Components/ui/Input";

export default function StepGallery() {
  const { control, register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const watchedImages = watch("images") || [];
  const maxImagesReached = fields.length >= 5;

  return (
    <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Galerie Photos & Souvenirs</h2>
          <p className="text-xs text-gray-500">
            Ajoutez jusqu'à 5 photos pour enrichir la page de votre événement ({fields.length}/5).
          </p>
        </div>
        
        {/* On masque ou désactive le bouton si on a atteint la limite de 5 images */}
        {!maxImagesReached && (
          <div className="w-full sm:w-auto">
            <Button type="button" variant="primary" onClick={() => append({ image: null, caption: "" })}>
              <ImagePlus size={16} />
              <span>Ajouter une photo</span>
            </Button>
          </div>
        )}
      </div>

      {maxImagesReached && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-800 dark:text-amber-400 font-medium">
          ⚠️ Vous avez atteint la limite maximale de 5 images pour cet événement.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, index) => {
          const currentFile = watchedImages[index]?.image;
          const fileName = currentFile && currentFile[0] ? currentFile[0].name : null;

          return (
            <div key={field.id} className="p-5 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-4 relative bg-gray-50/50 dark:bg-gray-900/30">
              <button type="button" onClick={() => remove(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 rounded-lg">
                <Trash2 size={18} />
              </button>
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Photo #{index + 1} *
                </label>
                <label className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition ${fileName ? "border-green-500 bg-green-50/30 dark:bg-green-950/20" : "border-gray-300 dark:border-gray-700 hover:border-[var(--primary)] bg-white dark:bg-[var(--dark-surface-soft)]"}`}>
                  {fileName ? (
                    <>
                      <CheckCircle2 className="text-green-600 mb-1" size={24} />
                      <span className="text-xs font-bold text-green-700 dark:text-green-400 text-center truncate max-w-full">
                        {fileName}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">Cliquez pour modifier</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="text-gray-400 mb-1" size={24} />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Cliquez pour sélectionner une image</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP (Max 5Mo)</span>
                    </>
                  )}
                  <input type="file" accept="image/*" {...register(`images.${index}.image`)} className="hidden" />
                </label>
              </div>

              <Input
                label="Légende (Caption)"
                placeholder="Ex: Ambiance de la scène principale"
                {...register(`images.${index}.caption`)}
              />
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="col-span-2 text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl space-y-2">
            <UploadCloud className="mx-auto text-gray-300" size={32} />
            <p className="text-sm font-medium text-gray-500">Aucune photo dans la galerie pour le moment.</p>
            <p className="text-xs text-gray-400">Vous pouvez ajouter jusqu'à 5 photos.</p>
          </div>
        )}
      </div>
    </div>
  );
}