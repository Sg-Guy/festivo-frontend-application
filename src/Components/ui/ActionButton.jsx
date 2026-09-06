import React from "react";

export default function ActionButton({
  icon: Icon,
  title,
  variant = "default",
  onClick,
  disabled = false,
  className = "",
  size = 16,
  ...props
}) {
  const baseStyles =
    "p-2 border rounded-xl transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default:
      "bg-gray-50 dark:bg-[var(--dark-surface)] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface-soft)]",

    primary:
      "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950/50",

    success:
      "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/50",

    warning:
      "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-950/50",

    danger:
      "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50",
  };

  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <Icon size={size} />
    </button>
  );
}