import React from "react";
import Select from "../ui/Select.jsx";
import { PRIORITIES } from "../../utils/constants.js";

const filterOptions = [
  { value: "all", label: "All Priorities" },
  { value: PRIORITIES.LOW, label: "Low" },
  { value: PRIORITIES.MEDIUM, label: "Medium" },
  { value: PRIORITIES.HIGH, label: "High" },
];

function TaskFilters({ value, onChange }) {
  return (
    <Select
      options={filterOptions}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-40"
    />
  );
}

export default TaskFilters;
