import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from "react";



const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => loadTasks());
  const [toast, setToast] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveTasks(tasks);
    }
  }, [tasks, initialized]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: generateId(),
      ...taskData,
      status: taskData.status || COLUMNS.TODO,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
    showToast("Task added!");
  }, [showToast]);

  const updateTask = useCallback((taskData) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: taskData });
    showToast("Task updated!");
  }, [showToast]);

  const deleteTask = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
    showToast("Task deleted!", "info");
  }, [showToast]);

  const moveTask = useCallback((id, status) => {
    dispatch({ type: ACTIONS.MOVE_TASK, payload: { id, status } });
  }, []);

  const clearAllTasks = useCallback(() => {
    dispatch({ type: ACTIONS.SET_TASKS, payload: [] });
    localStorage.removeItem(STORAGE_KEY);
    showToast("All tasks cleared!", "info");
  }, [showToast]);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask, clearAllTasks, toast, showToast }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
}
