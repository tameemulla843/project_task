import React from "react";
import { Inbox } from "lucide-react";

function EmptyState({ message = "No tasks here yet!" }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-text-muted">
      <Inbox className="w-12 h-12 mb-2" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default EmptyState;
