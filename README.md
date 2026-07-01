# PhishForge

> AI-powered phishing simulation & security awareness platform. Create campaigns, manage targets, track who clicks, and measure security awareness.

## Features

- **Campaign Management** — Create and manage phishing campaigns with custom templates
- **AI Template Library** — 8 built-in templates (password reset, security alerts, invoices, etc.)
- **Target Management** — Add targets with department tracking
- **Real-Time Tracking** — WebSocket-powered live click/phish notifications
- **Analytics Dashboard** — Campaign stats, click rates, phish rates
- **Simulation Engine** — Simulate phishing clicks for demonstration

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI + Python 3.12 + async SQLAlchemy |
| Frontend | React 18 + TypeScript + Zustand |
| Database | PostgreSQL + Redis |
| Infra | Docker Compose |
| Auth | JWT + bcrypt |
| Realtime | WebSockets |

## Quick Start

```bash
git clone https://github.com/ab069/PhishForge.git
cd PhishForge; docker compose up -d; open http://localhost:3000
```

## License MIT
