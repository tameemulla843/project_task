import React, { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import EmptyState from "./EmptyState.jsx";
import { COLUMN_TITLES, COLUMN_COLORS, COLUMN_BG_COLORS } from "../../utils/constants.js";

function TaskColumn({ status, tasks, onEditTask, onDeleteTask, onMoveTask }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  return (
    <div
      className={`rounded-xl p-3 border-t-4 ${COLUMN_COLORS[status]} ${COLUMN_BG_COLORS[status]} min-h-[300px] transition-colors duration-200 ${dragOver ? "column-drop-active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-text-primary text-sm">{COLUMN_TITLES[status]}</h2>
        <span className="text-xs bg-bg-secondary text-text-secondary rounded-full px-2 py-0.5 font-medium">{tasks.length}</span>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onMove={onMoveTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
