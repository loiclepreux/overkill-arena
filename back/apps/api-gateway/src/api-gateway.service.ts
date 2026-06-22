import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, throwError } from 'rxjs';
import { RewardType, MedalRank, TournamentStatus, TournamentFormat, MatchFormat, MatchStatus, NotificationKind } from '@prisma/client';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    @Inject('TEAMS_SERVICE') private readonly teamsClient: ClientProxy,
    @Inject('TOURNAMENTS_SERVICE') private readonly tournamentsClient: ClientProxy,
    @Inject('MATCHES_SERVICE') private readonly matchesClient: ClientProxy,
    @Inject('REWARDS_SERVICE') private readonly rewardsClient: ClientProxy,
    @Inject('NOTIFICATIONS_SERVICE') private readonly notificationsClient: ClientProxy,
  ) {}

  private rpc<T>(obs: Observable<T>): Observable<T> {
    return obs.pipe(
      catchError((err) => {
        // NestJS NATS spreads RpcException payload props onto the error object
        // so err.statusCode and err.message are the RpcException payload fields
        const statusCode = err?.statusCode ?? err?.error?.statusCode ?? 500;
        const message = err?.message ?? err?.error?.message ?? 'Internal server error';
        return throwError(() => new HttpException(message, statusCode));
      }),
    );
  }

  // ─── Auth ─────────────────────────────────────────────────────────────────

  login(data: { email: string; password: string }) {
    return this.rpc(this.authClient.send('auth.login', data));
  }

  register(data: { pseudo: string; email: string; password: string }) {
    return this.rpc(this.authClient.send('auth.register', data));
  }

  // ─── Users ────────────────────────────────────────────────────────────────

  getMyProfile(userId: string) {
    return this.rpc(this.usersClient.send('users.get-me', { userId }));
  }

  updateProfile(data: { userId: string; bio?: string; country?: string; favoriteGame?: string; avatar?: string }) {
    return this.rpc(this.usersClient.send('users.update-profile', data));
  }

  getUserById(userId: string) {
    return this.rpc(this.usersClient.send('users.get-by-id', { userId }));
  }

  getUsersByIds(userIds: string[]) {
    return this.rpc(this.usersClient.send('users.get-by-ids', { userIds }));
  }

  getAllUsers() {
    return this.rpc(this.usersClient.send('users.get-all', {}));
  }

  promoteToAdmin(userId: string) {
    return this.rpc(this.authClient.send('auth.promote-admin', { userId }));
  }

  getPublicStats() {
    return this.rpc(this.usersClient.send('users.public-stats', {}));
  }

  getTopPlayer() {
    return this.rpc(this.usersClient.send('users.top-player', {}));
  }

  changePassword(userId: string, currentPassword: string, newPassword: string) {
    return this.rpc(this.authClient.send('auth.change-password', { userId, currentPassword, newPassword }));
  }

  // ─── Teams ────────────────────────────────────────────────────────────────

  createTeam(data: { name: string; tag: string; logo?: string; description?: string; captainId: string }) {
    return this.rpc(this.teamsClient.send('teams.create', data));
  }

  getAllTeams() {
    return this.rpc(this.teamsClient.send('teams.get-all', {}));
  }

  getTeamById(id: string) {
    return this.rpc(this.teamsClient.send('teams.get-by-id', { id }));
  }

  getMyTeam(userId: string) {
    return this.rpc(this.teamsClient.send('teams.get-by-user', { userId }));
  }

  updateTeam(id: string, requesterId: string, data: { name?: string; tag?: string; logo?: string; description?: string }) {
    return this.rpc(this.teamsClient.send('teams.update', { id, requesterId, ...data }));
  }

  deleteTeam(id: string, requesterId: string) {
    return this.rpc(this.teamsClient.send('teams.delete', { id, requesterId }));
  }

  requestJoinTeam(teamId: string, userId: string) {
    return this.rpc(this.teamsClient.send('teams.request-join', { teamId, userId }));
  }

  getJoinRequests(teamId: string, requesterId: string) {
    return this.rpc(this.teamsClient.send('teams.get-join-requests', { teamId, requesterId }));
  }

  respondJoinRequest(requestId: string, requesterId: string, accepted: boolean) {
    return this.rpc(this.teamsClient.send('teams.respond-join-request', { requestId, requesterId, accepted }));
  }

  leaveTeam(teamId: string, userId: string) {
    return this.rpc(this.teamsClient.send('teams.leave', { teamId, userId }));
  }

  kickMember(teamId: string, requesterId: string, targetUserId: string) {
    return this.rpc(this.teamsClient.send('teams.kick-member', { teamId, requesterId, targetUserId }));
  }

  // ─── Tournaments ──────────────────────────────────────────────────────────

  createTournament(data: {
    name: string;
    game: string;
    format?: TournamentFormat;
    maxTeams: number;
    description?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.rpc(this.tournamentsClient.send('tournaments.create', data));
  }

  getAllTournaments(status?: TournamentStatus) {
    return this.rpc(this.tournamentsClient.send('tournaments.get-all', { status }));
  }

  getTournamentById(id: string) {
    return this.rpc(this.tournamentsClient.send('tournaments.get-by-id', { id }));
  }

  updateTournament(id: string, data: {
    name?: string;
    game?: string;
    format?: TournamentFormat;
    maxTeams?: number;
    description?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.rpc(this.tournamentsClient.send('tournaments.update', { id, ...data }));
  }

  updateTournamentStatus(id: string, status: TournamentStatus) {
    return this.rpc(this.tournamentsClient.send('tournaments.update-status', { id, status }));
  }

  registerTeam(tournamentId: string, teamId: string) {
    return this.rpc(this.tournamentsClient.send('tournaments.register-team', { tournamentId, teamId }));
  }

  unregisterTeam(tournamentId: string, teamId: string) {
    return this.rpc(this.tournamentsClient.send('tournaments.unregister-team', { tournamentId, teamId }));
  }

  getTournamentParticipants(tournamentId: string) {
    return this.rpc(this.tournamentsClient.send('tournaments.get-participants', { tournamentId }));
  }

  // ─── Matches ──────────────────────────────────────────────────────────────

  createMatch(data: { tournamentId?: string; teamAId: string; teamBId: string; format?: MatchFormat; scheduledAt?: string }) {
    return this.rpc(this.matchesClient.send('matches.create', data));
  }

  getMatchById(id: string) {
    return this.rpc(this.matchesClient.send('matches.get-by-id', { id }));
  }

  getMatchesByTeam(teamId: string) {
    return this.rpc(this.matchesClient.send('matches.get-by-team', { teamId }));
  }

  getMatchesByTournament(tournamentId: string) {
    return this.rpc(this.matchesClient.send('matches.get-by-tournament', { tournamentId }));
  }

  submitScore(id: string, teamId: string, scoreA: number, scoreB: number) {
    return this.rpc(this.matchesClient.send('matches.submit-score', { id, teamId, scoreA, scoreB }));
  }

  validateMatch(id: string) {
    return this.rpc(this.matchesClient.send('matches.validate', { id }));
  }

  contestMatch(id: string, teamId: string) {
    return this.rpc(this.matchesClient.send('matches.contest', { id, teamId }));
  }

  updateMatchStatus(id: string, status: MatchStatus) {
    return this.rpc(this.matchesClient.send('matches.update-status', { id, status }));
  }

  // ─── Rewards ──────────────────────────────────────────────────────────────

  getRewardsByUser(userId: string) {
    return this.rpc(this.rewardsClient.send('rewards.get-by-user', { userId }));
  }

  awardReward(data: {
    userId: string;
    type: RewardType;
    medalRank?: MedalRank;
    cupName?: string;
    titleName?: string;
    description?: string;
    tournamentId?: string;
    matchId?: string;
  }) {
    return this.rpc(this.rewardsClient.send('rewards.award', data));
  }

  getRewardStats(userId: string) {
    return this.rpc(this.rewardsClient.send('rewards.get-stats', { userId }));
  }

  // ─── Notifications ────────────────────────────────────────────────────────

  getNotifications(userId: string, page?: number, limit?: number) {
    return this.rpc(this.notificationsClient.send('notifications.get-by-user', { userId, page, limit }));
  }

  getUnreadCount(userId: string) {
    return this.rpc(this.notificationsClient.send('notifications.get-unread-count', { userId }));
  }

  markNotificationRead(id: string, userId: string) {
    return this.rpc(this.notificationsClient.send('notifications.mark-read', { id, userId }));
  }

  markAllNotificationsRead(userId: string) {
    return this.rpc(this.notificationsClient.send('notifications.mark-all-read', { userId }));
  }

  createNotification(data: { userId: string; kind: NotificationKind; title: string; message: string }) {
    return this.rpc(this.notificationsClient.send('notifications.create', data));
  }
}
