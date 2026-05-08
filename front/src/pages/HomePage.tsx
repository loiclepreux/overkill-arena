import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/store/auth.store";

export function HomePage() {
    const { login } = useAuthStore();
    return (
        <section className="space-y-8">
            <div>
                <h1 className="text-5xl font-bold text-red-500">
                    Welcome to Overkill Arena
                </h1>

                <Button
                    onClick={() =>
                        login(
                            {
                                id: "1",
                                pseudo: "OverkillPlayer",
                                email: "player@test.com",
                                role: "PLAYER",
                            },
                            "fake-token",
                        )
                    }
                >
                    Fake Login
                </Button>

                <p className="mt-4 text-zinc-400">
                    Competitive esports tournament platform.
                </p>
            </div>

            <div className="flex gap-4">
                <Button>Rejoindre</Button>

                <Button variant="secondary">Tournois</Button>

                <Button variant="danger">Supprimer</Button>
            </div>

            <div className="max-w-md">
                <Input label="Pseudo" placeholder="Entre ton pseudo" />
            </div>

            <Card className="max-w-md">
                <div className="mb-4">
                    <Badge variant="success">Ouvert</Badge>
                </div>

                <h2 className="text-2xl font-bold text-white">
                    Tournoi à venir
                </h2>

                <p className="mt-2 text-zinc-400">
                    Rejoins une arène compétitive et affronte les meilleurs
                    joueurs.
                </p>
            </Card>
        </section>
    );
}
