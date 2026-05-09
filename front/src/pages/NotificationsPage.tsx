import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";

export function NotificationsPage() {
    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-5xl font-bold text-red-500">
                    Notifications
                </h1>

                <p className="mt-4 text-zinc-400">
                    Consulte tes alertes, matchs live et événements importants.
                </p>
            </div>

            <NotificationsPanel />
        </section>
    );
}
