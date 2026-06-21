# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Overkill Arena is a competitive gaming platform with a NestJS microservices backend (`back/`) and a React frontend (`front/`).

---

## Backend (`back/`)

### Infrastructure

Start PostgreSQL and NATS before running any service:

```bash
cd back
docker-compose up -d
```

- PostgreSQL: `localhost:5432` (db: `overkill_arena`, user: `overkill`)
- NATS: `localhost:4222` (monitoring: `8222`)

### Development

```bash
cd back

# Start all services concurrently (recommended for full-stack dev)
npm run dev:start

# Start individual services
npm run start:gateway   # API Gateway (HTTP :3000)
npm run start:auth      # Auth Service (NATS only)
npm run start:users     # Users Service (NATS only)
```

### Tests

```bash
cd back
npm run test              # all unit tests
npm run test:watch        # watch mode
npm run test:cov          # coverage
npm run test:e2e          # e2e (api-gateway)
```

Run a single test file:

```bash
cd back
npx jest apps/auth-service/src/auth-service.service.spec.ts
```

### Linting & Formatting

```bash
cd back
npm run lint     # ESLint with auto-fix
npm run format   # Prettier
```

### Database (Prisma)

The single schema lives at `back/prisma/schema.prisma`. All services that need DB access embed their own `PrismaService`.

```bash
cd back
npx prisma migrate dev     # create and apply a new migration
npx prisma generate        # regenerate client after schema change
npx prisma studio          # GUI browser for the DB
```

---

## Frontend (`front/`)

```bash
cd front
npm run dev      # Vite dev server
npm run build    # tsc + Vite production build
npm run lint     # ESLint
```

Configure API URLs in `front/.env` (see `front/.env.example`). The base axios instance reads `VITE_AUTH_API_URL`; the other `VITE_*_API_URL` vars are for future service-specific clients.

---

## Architecture

### Microservice Communication

The **API Gateway** is the only HTTP-facing service (port 3000). All other services are pure NATS microservices — they never expose HTTP. The gateway forwards requests to services using `@nestjs/microservices` `ClientProxy.send()` with typed message patterns:

| Pattern | Service |
|---|---|
| `auth.login`, `auth.register`, `auth.me` | auth-service |
| `users.get-me`, `users.get-by-id`, `users.update-profile` | users-service |

Services currently with stub implementations: `teams-service`, `tournaments-service`, `matches-service`, `rewards-service`, `notifications-service`.

### Authentication Flow

1. Client sends credentials to `POST /auth/login` on the gateway.
2. Gateway forwards via NATS to `auth-service`, which validates against Postgres and returns a JWT.
3. Subsequent requests include `Authorization: Bearer <token>`.
4. The gateway's `JwtStrategy` (`apps/api-gateway/src/auth/jwt.strategy.ts`) validates the token locally — no NATS round-trip.
5. `JwtGuard` and `RolesGuard` protect routes; roles are embedded in the JWT payload (`sub`, `pseudo`, `email`, `role`).

### Frontend State & Routing

- **Auth state** is managed by a Zustand store (`src/store/auth.store.ts`) persisted to `localStorage` under the key `auth-storage`.
- **Three layout groups** in the router (`src/routes/router.tsx`):
  - `MainLayout` — public landing page
  - `AuthLayout` — `/login`, `/register`
  - `DashboardLayout` (wrapped in `ProtectedRoute`) — all `/dashboard/*` routes
- `ProtectedRoute` redirects unauthenticated users to `/login`; `RoleGuard` checks `user.role` from the store for role-restricted pages (e.g., `/dashboard/admin` requires `ADMIN`).
- The `@/` path alias resolves to `front/src/` (configured in `tsconfig.app.json`).

### Data Models (Prisma)

Key entities: `User` (auth identity) → `Profile` + `UserStats` (user-service concerns), `Team` → `TeamMember` + `TeamJoinRequest`. Roles: `PLAYER` (default), `ADMIN`. Team roles: `CAPTAIN`, `CO_CAPTAIN`, `MEMBER`.
