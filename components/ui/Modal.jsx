"use client";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="bg-surface border border-border rounded-xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-display text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-text-muted hover:text-text">
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}