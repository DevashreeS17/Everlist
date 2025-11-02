import React from "react";

export default function ConfirmModal({ onClose, onConfirm, message = "Are you sure?" }) {
    return (
        <div className="modal-backdrop">
            <div className="modal small">
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="btn ghost" onClick={onClose}>Cancel</button>
                    <button className="btn danger" onClick={() => { onConfirm(); onClose(); }}>Confirm</button>
                </div>
            </div>
        </div>
    );
}