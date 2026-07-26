export default function Input({ label, error, className = "", id, ...props }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={id} className="text-sm text-text-muted">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`w-full rounded-lg bg-surface border border-border px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-teal ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
}