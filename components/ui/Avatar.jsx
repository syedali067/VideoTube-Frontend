export default function Avatar({ src, alt = "", size = "md" }) {
    const sizes = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-20 h-20",
        xl: "w-28 h-28",
    };

    return (
        <img
            src={src}
            alt={alt}
            className={`${sizes[size]} rounded-full object-cover border border-border flex-shrink-0`}
        />
    );
}