import React from "react";
import Badge from "../ui/Badge.jsx";
import { PRIORITY_COLORS, COLUMN_ORDER } from "../../utils/constants.js";
import { formatDate, isOverdue } from "../../utils/helpers.js";
import { ChevronLeft, ChevronRight, Trash2, Calendar } from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onMove }) {
  const currentIndex = COLUMN_ORDER.indexOf(task.status);
  const canMoveLeft = currentIndex > 0;
  const canMoveRight = currentIndex < COLUMN_ORDER.length - 1;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("dragging");
  };

  return (
    <div
      className="task-card bg-bg-card rounded-xl border border-border p-4 cursor-pointer shadow-sm"
      onClick={() => onEdit(task)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-text-primary flex-1 mr-2 line-clamp-2">{task.title}</h3>
        <Badge className={PRIORITY_COLORS[task.priority]}>{task.priority}</Badge>
      </div>

      {task.description && (
        <p className="text-xs text-text-secondary mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-2">
        {task.dueDate ? (
          <span className={`text-xs flex items-center gap-1 ${isOverdue(task.dueDate) && task.status !== "done" ? "text-accent-red font-semibold bg-accent-red-light px-2 py-0.5 rounded-full" : "text-text-muted"}`}>
            <Calendar size={12} /> {formatDate(task.dueDate)}
          </span>
        ) : <span />}

        <div className="flex items-center gap-1 ml-auto" onClick={(e) => e.stopPropagation()}>
          {canMoveLeft && (
            <button
              onClick={() => onMove(task.id, COLUMN_ORDER[currentIndex - 1])}
              className="move-btn text-text-muted hover:text-accent-blue px-1"
              title={`Move to ${COLUMN_ORDER[currentIndex - 1]}`}
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {canMoveRight && (
            <button
              onClick={() => onMove(task.id, COLUMN_ORDER[currentIndex + 1])}
              className="move-btn text-text-muted hover:text-accent-blue px-1"
              title={`Move to ${COLUMN_ORDER[currentIndex + 1]}`}
            >
              <ChevronRight size={18} />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="move-btn text-text-muted hover:text-accent-red px-1"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
