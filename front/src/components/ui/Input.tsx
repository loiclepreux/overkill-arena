import type { InputProps } from "@/types/ui";

export function Input({ label, error, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-zinc-300">
                    {label}
                </label>
            )}

            <input
                className={`
          rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3
          text-white outline-none transition
          placeholder:text-zinc-500
          focus:border-red-500 focus:ring-2 focus:ring-red-500/30
          ${error ? "border-red-500" : ""}
          ${className}
        `}
                {...props}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
