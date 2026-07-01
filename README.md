# PhishForge — Phishing Simulation Platform

![Version](https://img.shields.io/badge/version-1.0.0-ec4899) ![FastAPI](https://img.shields.io/badge/FastAPI-0.115-ec4899) ![React](https://img.shields.io/badge/React-18.3-ec4899) ![License](https://img.shields.io/badge/license-MIT-ec4899)

AI-powered phishing simulation & security awareness platform. Create campaigns, manage targets, track who clicks, and measure organizational security awareness.

## Quick Start

```bash
docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000) and register a new account.

## Features

- **Campaign Management** — Create and manage phishing campaigns with scheduled launches and status tracking
- **Template Library** — 8 built-in email templates: password reset, security alert, invoice, document share, account verification, voicemail, HR update, package delivery
- **Target Management** — Add targets with name, email, and department tracking
- **Real-Time Tracking** — WebSocket-powered live click/phish notifications with per-target status
- **Analytics Dashboard** — Campaign stats, click rates, phish rates, department breakdowns
- **Simulation Engine** — Simulate phishing clicks for demos with instant status updates

### Email Templates

| Template | Subject Line | Category |
|----------|-------------|----------|
| Password Reset | Your password has expired | Credential Theft |
| Security Alert | Suspicious sign-in attempt | Credential Theft |
| Invoice | Overdue invoice attached | Financial |
| Document Share | Document shared with you | Credential Theft |
| Account Verification | Action required: verify your account | Credential Theft |
| Voicemail | New voicemail message | Urgent Action |
| HR Update | Important HR policy update | Impersonation |
| Package Delivery | Your package delivery notification | Package Notification |

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       PhishForge System                        │
├────────────┬────────────┬────────────┬────────────┬────────────┤
│  Campaign  │  Template  │   Target   │ Simulation │ WebSocket  │
│  Manager   │  Library   │  Manager   │   Engine   │ Dashboard  │
├────────────┴────────────┴────────────┴────────────┴────────────┤
│               FastAPI + async SQLAlchemy + Redis                 │
├────────────────────────────────────────────────────────────────┤
│                  PostgreSQL + Redis + Docker Compose              │
└────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.12, FastAPI, SQLAlchemy (async), asyncpg |
| Frontend | React 18, TypeScript, Vite, Zustand |
| Engine | Phishing simulation engine |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Auth | JWT (python-jose), bcrypt (passlib) |
| Realtime | WebSockets |
| Infra | Docker, Docker Compose, nginx |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/campaigns` | Create campaign |
| GET | `/api/campaigns` | List campaigns |
| GET | `/api/campaigns/stats` | Campaign statistics |
| POST | `/api/targets` | Add target to campaign |
| GET | `/api/targets` | List targets |
| POST | `/api/simulate` | Simulate a phish click |
| WS | `/ws/{user_id}` | WebSocket real-time feed |
| GET | `/api/health` | Health check |

## Project Structure

```
PhishForge/
├── backend/
│   ├── app/
│   │   ├── core/        # Config, security, database, deps
│   │   ├── models/      # SQLAlchemy models
│   │   ├── schemas/     # Pydantic schemas
│   │   ├── services/    # Business logic layer
│   │   ├── agents/      # Simulation engine
│   │   ├── api/         # Route handlers
│   │   └── main.py      # FastAPI app entrypoint
│   ├── tests/           # Pytest test suite
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── store/       # Zustand state stores
│   │   ├── hooks/       # React hooks (WebSocket)
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Login, Register, Dashboard
│   │   ├── main.tsx     # Entry point
│   │   └── App.tsx      # Router
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql+asyncpg://...` | PostgreSQL connection string |
| `REDIS_URL` | `redis://redis:6379/0` | Redis connection string |
| `SECRET_KEY` | `change-me-in-production` | JWT signing key |

## Demo Credentials

Register a new account at `/register` after starting the app.

## License

MIT
