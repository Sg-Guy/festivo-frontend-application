import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      type = "text",
      icon: Icon,
      rightElement,
      placeholder = "",
      className = "",
      isRequired = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Icon size={18} />
            </div>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`w-full py-2 rounded-xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border text-gray-900 dark:text-[var(--dark-text)] placeholder-gray-400 outline-none transition text-sm sm:text-base
              ${Icon ? "pl-10 pr-4" : "px-4"}
              ${rightElement ? "pr-11" : ""}
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  : "border-gray-300 dark:border-[var(--dark-border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20"
              }
              ${className}`}
            {...props}
          />

          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <span className="text-xs text-red-500 block mt-1">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;