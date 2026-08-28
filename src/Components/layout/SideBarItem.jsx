import React from "react";
import { Link } from "react-router-dom";

export default function SidebarItem({ icon: Icon, title, to, onClick, variant = "default" }) {
  const baseStyles = "flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group";
  
  const variants = {
    default: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] hover:text-[var(--primary)]",
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-lg shadow-orange-600/20",
    danger: "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
  };

  const content = (
    <>
      {Icon && <Icon size={20} className="transition-transform group-hover:scale-110" />}
      <span className="text-sm tracking-wide">{title}</span>
    </>
  );

  // Lien de route
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
        {content}
      </Link>
    );
  }

  // Action 
  return (
    <button type="button" onClick={onClick} className={`w-full text-left ${baseStyles} ${variants[variant]}`}>
      {content}
    </button>
  );
}