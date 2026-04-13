import React, { useState, useMemo } from "react";
import { isOverdue } from "../../utils/helpers.js";
import TaskColumn from "./TaskColumn.jsx";
import TaskModal from "./TaskModal.jsx";
//import TaskFilters from "./TaskFilters.jsx";
import TaskSort from "./TaskSort.jsx";
import ConfirmDialog from "../ui/ConfirmDialog.jsx";
import Button from "../ui/Button.jsx";
import { useTasks } from "../../context/TaskContext.jsx";
import { COLUMNS, COLUMN_ORDER } from "../../utils/constants.js";
import {
  ClipboardList,
  ListTodo,
  Loader,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Plus,
} from "lucide-react";
import TaskFilters from "./TaskFilter.jsx";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

function TaskBoard() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const filteredAndSorted = useMemo(() => {
    let result = [...tasks];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))
      );
    }

    if (filter !== "all") {
      result = result.filter((t) => t.priority === filter);
    }

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    result.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "priority":
          return (PRIORITY_ORDER[a.priority] || 1) - (PRIORITY_ORDER[b.priority] || 1);
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return result;
  }, [tasks, filter, statusFilter, sort, search]);

  const getColumnTasks = (status) => filteredAndSorted.filter((t) => t.status === status);

  const handleSave = (taskData) => {
    if (taskData.id) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteTask(deleteId);
      setDeleteId(null);
    }
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === COLUMNS.DONE).length;
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate) && t.status !== COLUMNS.DONE).length;

  const stats = [
    { label: "Total", count: totalTasks, icon: ClipboardList, color: "text-accent-blue" },
    { label: "To Do", count: tasks.filter((t) => t.status === COLUMNS.TODO).length, icon: ListTodo, color: "text-accent-orange" },
    { label: "In Progress", count: tasks.filter((t) => t.status === COLUMNS.IN_PROGRESS).length, icon: Loader, color: "text-accent-purple" },
    { label: "Done", count: doneTasks, icon: CheckCircle2, color: "text-accent-green" },
    { label: "Overdue", count: overdueTasks, icon: Clock, color: "text-accent-red", border: "border-accent-red" },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className={`bg-bg-card border ${s.border || "border-border"} rounded-xl p-4 shadow-sm flex items-center gap-3`}>
            <s.icon className={`${s.color} w-6 h-6`} />
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-border bg-bg-card text-text-primary rounded-lg pl-9 pr-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-accent-blue placeholder:text-text-muted"
          />
        </div>
        <TaskFilters value={filter} onChange={setFilter} />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-border bg-bg-card text-text-primary rounded-lg px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-accent-blue"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <TaskSort value={sort} onChange={setSort} />
        <Button onClick={() => { setEditingTask(null); setShowModal(true); }}>
          <span className="flex items-center gap-1"><Plus size={16} /> Add Task</span>
        </Button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMN_ORDER.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={getColumnTasks(status)}
            onEditTask={handleEdit}
            onDeleteTask={(id) => setDeleteId(id)}
            onMoveTask={moveTask}
          />
        ))}
      </div>

      {showModal && (
        <TaskModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
          onSave={handleSave}
          task={editingTask}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This cannot be undone."
      />
    </div>
  );
}

export default TaskBoard;
