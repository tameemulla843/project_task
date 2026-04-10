import React, { useState } from "react";
import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";
import { PRIORITIES, COLUMNS, COLUMN_TITLES } from "../../utils/constants.js";
import { validateTask } from "../../utils/validators.js";

const priorityOptions = [
  { value: PRIORITIES.LOW, label: "Low" },
  { value: PRIORITIES.MEDIUM, label: "Medium" },
  { value: PRIORITIES.HIGH, label: "High" },
];

const statusOptions = Object.entries(COLUMN_TITLES).map(([value, label]) => ({
  value,
  label,
}));

function TaskModal({ isOpen, onClose, onSave, task = null }) {
  const isEditing = !!task;
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || PRIORITIES.MEDIUM,
    status: task?.status || COLUMNS.TODO,
    dueDate: task?.dueDate || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateTask(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    onSave({
      ...(task ? { id: task.id } : {}),
      ...form,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Task" : "New Task"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input label="Title" name="title" value={form.title} onChange={handleChange} placeholder="What needs to be done?" error={errors.title} />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-secondary">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add some details..."
            rows={3}
            className="border border-border bg-bg-card text-text-primary rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
          />
          {errors.description && <span className="text-xs text-accent-red">{errors.description}</span>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select label="Priority" name="priority" value={form.priority} onChange={handleChange} options={priorityOptions} />
          <Select label="Status" name="status" value={form.status} onChange={handleChange} options={statusOptions} />
        </div>
        <Input label="Due Date" name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{isEditing ? "Save Changes" : "Add Task"}</Button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskModal;
