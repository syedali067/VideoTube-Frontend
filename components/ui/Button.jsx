export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}) {
    const base =
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "gradient-primary text-canvas hover:opacity-90",
        secondary: "bg-surface text-text border border-border hover:bg-surface-hover",
        ghost: "text-text-muted hover:text-text hover:bg-surface",
        danger: "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}