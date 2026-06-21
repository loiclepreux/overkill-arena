import type { ButtonProps } from "@/types/ui";

export function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles =
        "rounded-lg px-5 py-3 font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-red-600 hover:bg-red-700 text-white",
        secondary: "bg-zinc-800 hover:bg-zinc-700 text-white",
        danger: "bg-red-900 hover:bg-red-950 text-white",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
