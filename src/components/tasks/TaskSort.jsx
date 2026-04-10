import React from "react";
import Select from "../ui/Select.jsx";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "priority", label: "Priority" },
  { value: "dueDate", label: "Due Date" },
];

function TaskSort({ value, onChange }) {
  return (
    <Select
      options={sortOptions}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-40"
    />
  );
}

export default TaskSort;
