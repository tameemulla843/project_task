export function validateTask(task) {
  const errors = {};

  if (!task.title || task.title.trim() === "") {
    errors.title = "Title is required";
  } else if (task.title.length > 100) {
    errors.title = "Title must be under 100 characters";
  }

  if (task.description && task.description.length > 500) {
    errors.description = "Description must be under 500 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
