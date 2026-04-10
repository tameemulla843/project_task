import React from "react";

function Select({ label, options, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-text-secondary">{label}</label>}
      <select
        className={`border rounded-lg px-3 py-2 text-sm bg-bg-card text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-blue ${
          error ? "border-accent-red" : "border-border"
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-accent-red">{error}</span>}
    </div>
  );
}

export default Select;
