import React from "react";

function Button({ children, onClick, variant = "primary", size = "md", className = "", disabled = false, type = "button" }) {
  const base = "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue";

  const variants = {
    primary: "bg-accent-blue text-white hover:opacity-90 shadow-sm hover:shadow-md",
    secondary: "bg-bg-column text-text-primary border border-border hover:bg-bg-secondary",
    danger: "bg-accent-red text-white hover:opacity-90",
    ghost: "bg-transparent text-text-secondary hover:bg-bg-column",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
