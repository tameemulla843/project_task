import React from "react";

function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-text-secondary">{label}</label>}
      <input
        className={`border rounded-lg px-3 py-2 text-sm bg-bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue ${
          error ? "border-accent-red" : "border-border"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-accent-red">{error}</span>}
    </div>
  );
}

export default Input;
