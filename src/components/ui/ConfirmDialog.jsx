import React from "react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

function ConfirmDialog({ isOpen, onClose, onConfirm, title = "Are you sure?", message = "This action cannot be undone." }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-sm text-text-secondary mb-6">{message}</p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
