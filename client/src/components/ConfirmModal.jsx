import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-warning-icon">
            <AlertTriangle size={22} />
          </div>
          <h3 className="modal-title">{title}</h3>
          <button onClick={onCancel} className="modal-close" disabled={loading}>
            <X size={18} />
          </button>
        </div>

        <p className="modal-message">{message}</p>

        <div className="modal-actions">
          <button
            onClick={onCancel}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger"
            disabled={loading}
          >
            {loading ? 'Deleting...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
