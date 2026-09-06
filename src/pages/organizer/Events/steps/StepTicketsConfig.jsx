import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Ticket } from "lucide-react";
import Button from "../../../../Components/ui/Button";
import Input from "../../../../Components/ui/Input";

export default function StepTicketsConfig() {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ticket_categories",
  });

  return (
    <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Catégories de billets & Tarifs</h2>
          <p className="text-xs text-gray-500">Structurez vos types de places et planifiez vos fenêtres de vente.</p>
        </div>
        <div className="w-full sm:w-auto">
          <Button type="button" variant="primary" onClick={() => append({ name: "", regular_price: "", quantity_available: "", description: "", sales_start_at: "", sales_end_at: "" })}>
            <Plus size={16} />
            <span>Ajouter une catégorie</span>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-4 bg-gray-50/40 dark:bg-gray-900/30 relative shadow-sm">
            
            {/* En-tête de la carte catégorie */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <div className="flex items-center space-x-2 text-sm font-bold text-gray-800 dark:text-gray-200">
                <Ticket size={18} className="text-[var(--primary)]" />
                <span>Catégorie #{index + 1}</span>
              </div>
              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs font-semibold">
                  <Trash2 size={16} /> Supprimer
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Nom du billet"
                isRequired
                placeholder="ex: VIP / Standard / Pass 2 Jours"
                {...register(`ticket_categories.${index}.name`, { required: true })}
              />
              <Input
                label="Prix unitaire (FCFA)"
                type="number"
                isRequired
                placeholder="ex: 5000"
                {...register(`ticket_categories.${index}.regular_price`, { required: true })}
              />
              <Input
                label="Quantité disponible"
                type="number"
                isRequired
                placeholder="ex: 100"
                {...register(`ticket_categories.${index}.quantity_available`, { required: true })}
              />
            </div>

            <Input
              label="Description de la catégorie"
              placeholder="Ce qui est inclus (ex: Accès backstage + Boisson offerte)"
              {...register(`ticket_categories.${index}.description`)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <Input
                label="Début de la mise en vente"
                type="datetime-local"
                {...register(`ticket_categories.${index}.sales_start_at`)}
              />
              <Input
                label="Fin de la mise en vente"
                type="datetime-local"
                {...register(`ticket_categories.${index}.sales_end_at`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}