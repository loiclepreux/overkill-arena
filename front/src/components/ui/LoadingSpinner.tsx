export function LoadingSpinner({ message = "Chargement..." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-zinc-400">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500" />
            <p className="text-sm">{message}</p>
        </div>
    );
}

export function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="rounded-xl border border-red-800 bg-red-950/40 p-6 text-center text-red-400">
            {message}
        </div>
    );
}
