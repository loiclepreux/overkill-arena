import { useState } from "react";
import { FiAward, FiShield, FiTarget, FiUser, FiLock, FiSettings } from "react-icons/fi";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/LoadingSpinner";
import { useAuthStore } from "@/store/auth.store";
import { useApi } from "@/hooks/useApi";
import { usersApi } from "@/services/users.api";
import { rewardsApi } from "@/services/rewards.api";
import { teamsApi } from "@/services/teams.api";
import { authApi } from "@/services/auth.api";
import { getErrorMessage } from "@/hooks/useApi";

export function ProfilePage() {
    const { user, login } = useAuthStore();
    const [editing, setEditing] = useState(false);
    const [bio, setBio] = useState("");
    const [country, setCountry] = useState("");
    const [favoriteGame, setFavoriteGame] = useState("");
    const [avatar, setAvatar] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const [showPwForm, setShowPwForm] = useState(false);
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [changingPw, setChangingPw] = useState(false);
    const [pwMsg, setPwMsg] = useState<string | null>(null);
    const [pwError, setPwError] = useState<string | null>(null);

    const [promotingAdmin, setPromotingAdmin] = useState(false);
    const [adminMsg, setAdminMsg] = useState<string | null>(null);
    const [adminError, setAdminError] = useState<string | null>(null);
    const [showAdminConfirm, setShowAdminConfirm] = useState(false);

    const { data: me, loading: loadingMe, error: errorMe, refetch: refetchMe } = useApi(usersApi.getMe);
    const { data: rewardStats } = useApi(rewardsApi.getMyStats);
    const { data: team } = useApi(() => teamsApi.getMyTeam().catch(() => null));

    const totalCups = rewardStats
        ? rewardStats.medals.gold + rewardStats.cups
        : 0;

    function startEdit() {
        setBio(me?.profile.bio ?? "");
        setCountry(me?.profile.country ?? "");
        setFavoriteGame(me?.profile.favoriteGame ?? "");
        setAvatar(me?.profile.avatar ?? "");
        setEditing(true);
    }

    async function saveProfile() {
        setSaving(true);
        setSaveError(null);
        try {
            await usersApi.updateProfile({ bio, country, favoriteGame, avatar: avatar || undefined });
            refetchMe();
            setEditing(false);
        } catch (err) {
            setSaveError(getErrorMessage(err));
        } finally {
            setSaving(false);
        }
    }

    async function handleChangePassword() {
        if (newPw !== confirmPw) {
            setPwError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (newPw.length < 6) {
            setPwError("Le nouveau mot de passe doit faire au moins 6 caractères.");
            return;
        }
        setChangingPw(true);
        setPwError(null);
        setPwMsg(null);
        try {
            const res = await authApi.changePassword(currentPw, newPw);
            setPwMsg(res.message);
            setCurrentPw("");
            setNewPw("");
            setConfirmPw("");
            setShowPwForm(false);
        } catch (err) {
            setPwError(getErrorMessage(err));
        } finally {
            setChangingPw(false);
        }
    }

    async function handlePromoteAdmin() {
        setPromotingAdmin(true);
        setAdminError(null);
        setAdminMsg(null);
        try {
            const res = await authApi.promoteToAdmin();
            login({ id: res.user.id, pseudo: res.user.pseudo, email: res.user.email, role: res.user.role as "PLAYER" | "ADMIN" }, res.accessToken);
            setAdminMsg(res.message);
            setShowAdminConfirm(false);
        } catch (err) {
            setAdminError(getErrorMessage(err));
        } finally {
            setPromotingAdmin(false);
        }
    }

    if (loadingMe) return <LoadingSpinner message="Chargement du profil..." />;
    if (errorMe) return <ErrorMessage message={errorMe} />;

    return (
        <section className="space-y-10">
            {/* HERO */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-red-950/40 via-black to-zinc-950 p-5 sm:p-8">
                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-red-600 bg-black text-4xl font-bold text-white sm:h-28 sm:w-28 sm:text-5xl">
                            {user?.pseudo?.charAt(0).toUpperCase() ?? "?"}
                        </div>

                        <div>
                            <Badge variant="danger">{user?.role}</Badge>

                            <h1 className="mt-4 break-words text-3xl font-extrabold text-white sm:text-5xl">
                                {user?.pseudo}
                            </h1>

                            <p className="mt-3 text-zinc-400">
                                {me?.profile.bio || "—"}
                            </p>

                            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                                <Badge variant="success">● En ligne</Badge>
                                {team && <Badge variant="warning">{team.name}</Badge>}
                                <Badge variant="danger">◆ {me?.stats.rank ?? "Bronze"} ◆</Badge>
                            </div>

                            <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm font-semibold text-zinc-300 sm:justify-start">
                                <span className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1">
                                    🏆 {totalCups} coupes
                                </span>
                                <span className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1">
                                    🥇 {rewardStats?.medals.gold ?? 0} or
                                </span>
                                <span className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1">
                                    🥈 {rewardStats?.medals.silver ?? 0} argent
                                </span>
                                <span className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1">
                                    🥉 {rewardStats?.medals.bronze ?? 0} bronze
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        {!editing && (
                            <Button className="w-full sm:w-auto" onClick={startEdit}>
                                Modifier profil
                            </Button>
                        )}
                    </div>
                </div>

                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
            </div>

            {/* EDIT FORM */}
            {editing && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <h2 className="mb-6 text-2xl font-bold text-white">Modifier le profil</h2>
                    {saveError && <ErrorMessage message={saveError} />}
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Bio</label>
                            <textarea
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                rows={3}
                                placeholder="Parle de toi..."
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Pays</label>
                            <input
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                placeholder="France"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Jeu favori</label>
                            <input
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                placeholder="Valorant, CS2..."
                                value={favoriteGame}
                                onChange={(e) => setFavoriteGame(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Avatar (URL)</label>
                            <input
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                placeholder="https://..."
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                            {avatar && (
                                <img
                                    src={avatar}
                                    alt="Aperçu avatar"
                                    className="mt-2 h-16 w-16 rounded-full object-cover border border-zinc-700"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                />
                            )}
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button onClick={saveProfile} disabled={saving}>
                                {saving ? "Enregistrement..." : "Enregistrer"}
                            </Button>
                            <Button variant="secondary" onClick={() => setEditing(false)}>
                                Annuler
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* STATS */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard title="Score de classement" value={me?.stats.elo ?? 0} icon={<FiAward />} description="Classement actuel" />
                <DashboardStatCard title="Victoires" value={me?.stats.wins ?? 0} icon={<FiTarget />} description="Toutes saisons" />
                <DashboardStatCard title="Tournois" value={me?.stats.tournamentsPlayed ?? 0} icon={<FiShield />} description="Participations" />
                <DashboardStatCard title="Coupes" value={`🏆 ${totalCups}`} icon={<FiAward />} description="Récompenses obtenues" />
            </div>

            {/* ACCOUNT + TEAM */}
            <div className="grid gap-8 xl:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiUser className="text-2xl text-red-500" />
                        <h2 className="text-2xl font-bold text-white">Informations compte</h2>
                    </div>
                    {pwMsg && (
                        <div className="mb-4 rounded-xl border border-green-800 bg-green-950/20 px-4 py-3 text-sm text-green-300">
                            {pwMsg}
                        </div>
                    )}
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm text-zinc-500">Email</p>
                            <p className="mt-2 font-semibold text-white">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500">Rôle</p>
                            <p className="mt-2 font-semibold text-white">{user?.role}</p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500">Pays</p>
                            <p className="mt-2 font-semibold text-white">{me?.profile.country ?? "—"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500">Jeu favori</p>
                            <p className="mt-2 font-semibold text-white">{me?.profile.favoriteGame ?? "—"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500">Niveau</p>
                            <p className="mt-2 font-semibold text-white">
                                Niveau {me?.stats.level ?? 1} — {me?.stats.xp ?? 0} XP
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-zinc-800 pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FiLock className="text-zinc-500" />
                                <span className="text-sm font-semibold text-zinc-300">Mot de passe</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setShowPwForm(!showPwForm); setPwError(null); }}
                                className="text-sm text-red-400 hover:text-red-300"
                            >
                                {showPwForm ? "Annuler" : "Changer"}
                            </button>
                        </div>
                        {showPwForm && (
                            <div className="mt-4 space-y-3">
                                {pwError && <ErrorMessage message={pwError} />}
                                <input
                                    type="password"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                    placeholder="Mot de passe actuel"
                                    value={currentPw}
                                    onChange={(e) => setCurrentPw(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                    placeholder="Nouveau mot de passe (min. 6 caractères)"
                                    value={newPw}
                                    onChange={(e) => setNewPw(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
                                    placeholder="Confirmer le nouveau mot de passe"
                                    value={confirmPw}
                                    onChange={(e) => setConfirmPw(e.target.value)}
                                />
                                <Button
                                    className="w-full"
                                    onClick={handleChangePassword}
                                    disabled={changingPw || !currentPw || !newPw || !confirmPw}
                                >
                                    {changingPw ? "Modification..." : "Confirmer le changement"}
                                </Button>
                            </div>
                        )}
                    </div>

                    {user?.role !== "ADMIN" && (
                        <div className="mt-6 border-t border-zinc-800 pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FiSettings className="text-zinc-500" />
                                    <span className="text-sm font-semibold text-zinc-300">Accès administrateur</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setShowAdminConfirm(!showAdminConfirm); setAdminError(null); }}
                                    className="text-sm text-red-400 hover:text-red-300"
                                >
                                    {showAdminConfirm ? "Annuler" : "Devenir admin"}
                                </button>
                            </div>
                            {adminMsg && (
                                <div className="mt-3 rounded-xl border border-green-800 bg-green-950/20 px-4 py-3 text-sm text-green-300">
                                    {adminMsg}
                                </div>
                            )}
                            {showAdminConfirm && (
                                <div className="mt-4 rounded-xl border border-red-900/40 bg-red-950/10 p-4 space-y-3">
                                    {adminError && <ErrorMessage message={adminError} />}
                                    <p className="text-sm text-zinc-400">
                                        Action <strong className="text-white">irréversible</strong> et unique sur toute la plateforme. Une fois un administrateur désigné, ce bouton disparaît pour tous.
                                    </p>
                                    <Button
                                        className="w-full"
                                        onClick={handlePromoteAdmin}
                                        disabled={promotingAdmin}
                                    >
                                        {promotingAdmin ? "Promotion en cours..." : "Confirmer — Devenir administrateur"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <FiShield className="text-2xl text-red-500" />
                        <h2 className="text-2xl font-bold text-white">Équipe actuelle</h2>
                    </div>
                    {team ? (
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{team.name}</h3>
                                    <p className="mt-2 text-zinc-500">Tag : [{team.tag}]</p>
                                    {team.description && (
                                        <p className="mt-2 text-sm text-zinc-400">{team.description}</p>
                                    )}
                                </div>
                                <Badge variant="danger">{team.members.length} membres</Badge>
                            </div>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-zinc-500">Rôle dans l'équipe</p>
                                    <p className="mt-2 text-xl font-bold text-red-500">
                                        {team.members.find((m) => m.userId === user?.id)?.role ?? "MEMBRE"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-zinc-500">Membres</p>
                                    <p className="mt-2 text-xl font-bold text-white">{team.members.length}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-zinc-700 bg-black/30 p-5 text-center text-zinc-500">
                            <p>Vous n'êtes dans aucune équipe.</p>
                            <p className="mt-2 text-sm">Créez ou rejoignez une équipe dans l'onglet Équipes.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
