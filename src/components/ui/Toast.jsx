import React from "react";
import { useTasks } from "../../context/TaskContext.jsx";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

function Toast() {
  const { toast } = useTasks();

  if (!toast) return null;

  const styles = {
    success: { bg: "bg-accent-green", icon: CheckCircle2 },
    error: { bg: "bg-accent-red", icon: AlertCircle },
    info: { bg: "bg-accent-blue", icon: Info },
  };

  const { bg, icon: Icon } = styles[toast.type] || styles.success;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${bg} text-white px-4 py-2 rounded shadow-lg text-sm animate-fade-in flex items-center gap-2`}>
      <Icon size={16} />
      {toast.message}
    </div>
  );
}

export default Toast;
