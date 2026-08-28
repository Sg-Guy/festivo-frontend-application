import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(
  (
    {
      label,
      icon: Icon,
      error,
      options = [],
      placeholder = "Sélectionner une option",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-1.5 w-full ${className}`}>
        {/* Label optionnel */}
        {label && (
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}

        <div className="relative">
          {/* Icône à gauche */}
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Icon size={18} />
            </div>
          )}

          <select
            ref={ref}
            className={`w-full rounded-2xl border bg-gray-50/50 dark:bg-[var(--dark-surface)] px-4 py-3 text-sm text-gray-900 dark:text-[var(--dark-text)] appearance-none focus:outline-none focus:ring-2 transition ${
              Icon ? "pl-10" : "pl-4"
            } pr-10 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 dark:border-[var(--dark-border)] focus:ring-[var(--primary)] hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            {...props}
          >
            <option value="" disabled selected hidden>
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-white dark:bg-[var(--dark-background)] text-gray-900 dark:text-[var(--dark-text)]"
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            <ChevronDown size={18} />
          </div>
        </div>

        {error && (
          <span className="text-xs font-medium text-red-500 pl-1 block">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;