export const COLUMNS = {
  TODO: "todo",
  IN_PROGRESS: "in-progress",
  DONE: "done",
};

export const COLUMN_TITLES = {
  [COLUMNS.TODO]: "To Do",
  [COLUMNS.IN_PROGRESS]: "In Progress",
  [COLUMNS.DONE]: "Done",
};

export const PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: "bg-accent-green-light text-accent-green",
  [PRIORITIES.MEDIUM]: "bg-accent-orange-light text-accent-orange",
  [PRIORITIES.HIGH]: "bg-accent-red-light text-accent-red",
};

export const COLUMN_COLORS = {
  [COLUMNS.TODO]: "border-accent-blue",
  [COLUMNS.IN_PROGRESS]: "border-accent-orange",
  [COLUMNS.DONE]: "border-accent-green",
};

export const COLUMN_BG_COLORS = {
  [COLUMNS.TODO]: "bg-accent-blue-light dark:bg-[hsl(217_91%_15%/0.3)]",
  [COLUMNS.IN_PROGRESS]: "bg-accent-orange-light dark:bg-[hsl(38_92%_15%/0.3)]",
  [COLUMNS.DONE]: "bg-accent-green-light dark:bg-[hsl(142_71%_15%/0.3)]",
};

export const COLUMN_ORDER = [COLUMNS.TODO, COLUMNS.IN_PROGRESS, COLUMNS.DONE];

export const STORAGE_KEY = "smart-task-manager-tasks";
export const THEME_KEY = "smart-task-manager-theme";
