import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary", 
  type = "button",
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  loadingText = "",
  ...props
}) {
  const baseStyles =
    "w-full py-2 px-1 rounded-xl font-semibold transition flex items-center justify-center space-x-2 text-sm sm:text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-orange-600/20 shadow-lg",
    secondary:
      "bg-gray-100 dark:bg-[var(--dark-surface)] text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[var(--dark-surface-soft)]",
    outline:
      "border dark:border-[var(--dark-border)] bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[var(--dark-surface)]",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 shadow-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
