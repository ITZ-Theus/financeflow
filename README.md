# 💰 FinanceFlow

<div align="center">

![CI](https://github.com/SEU_USUARIO/financeflow/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/SEU_USUARIO/financeflow/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-20+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)

**Personal finance management app — fullstack, production-ready, fully tested.**

[Live Demo](https://financeflow.vercel.app) · [Report Bug](https://github.com/SEU_USUARIO/financeflow/issues)

</div>

---

## 🛠️ Tech Stack

**Backend:** Node.js 20 · TypeScript · Express · TypeORM · MySQL 8 · JWT · Zod · Jest + Supertest

**Frontend:** React 18 · TypeScript · Vite · Tailwind CSS · React Query · Zustand · Recharts

**Infra:** Docker · GitHub Actions CI/CD · Railway · Vercel

---

## ✅ Features

- [x] JWT Authentication (register/login)
- [x] Dashboard with bar and donut charts
- [x] Transactions with pagination and filters
- [x] Custom categories with color & emoji
- [x] Financial goals with progress tracking
- [x] Collapsible sidebar
- [x] Full TypeScript (frontend + backend)
- [x] Unit & integration tests with coverage
- [x] CI/CD with GitHub Actions

---

## 🚀 Running locally

### Prerequisites
- Node.js 20+
- Docker + Docker Compose

```bash
# 1. Clone and configure
git clone https://github.com/SEU_USUARIO/financeflow.git
cd financeflow
cp .env.example apps/api/.env

# 2. Start database
docker-compose up mysql -d

# 3. Start API
cd apps/api && npm install && npm run dev
# ✅ http://localhost:3333

# 4. Start frontend (new terminal)
cd apps/web && npm install && npm run dev
# ✅ http://localhost:5173
```

---

## 🧪 Tests

```bash
cd apps/api

npm test                  # all tests
npm run test:unit         # unit tests only
npm run test:integration  # integration tests only
npm run test:coverage     # with coverage report
```

---

## 📁 Project structure

```
financeflow/
├── .github/
│   └── workflows/
│       ├── ci.yml        # runs tests on every push
│       └── deploy.yml    # deploys on merge to main
├── apps/
│   ├── api/              # Node.js + TypeScript backend
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── modules/  # auth, transactions, categories, goals
│   │   │   └── shared/
│   │   └── tests/
│   │       ├── unit/
│   │       └── integration/
│   └── web/              # React + TypeScript frontend
│       └── src/
│           ├── components/
│           ├── pages/
│           ├── hooks/
│           └── store/
└── docker-compose.yml
```

---

## 🔌 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/transactions` | ✅ | List transactions |
| POST | `/api/transactions` | ✅ | Create transaction |
| PUT | `/api/transactions/:id` | ✅ | Update transaction |
| DELETE | `/api/transactions/:id` | ✅ | Delete transaction |
| GET | `/api/transactions/summary` | ✅ | Financial summary |
| GET | `/api/categories` | ✅ | List categories |
| POST | `/api/categories` | ✅ | Create category |
| DELETE | `/api/categories/:id` | ✅ | Delete category |
| GET | `/api/goals` | ✅ | List goals |
| POST | `/api/goals` | ✅ | Create goal |
| PUT | `/api/goals/:id` | ✅ | Update goal |
| DELETE | `/api/goals/:id` | ✅ | Delete goal |

---

## ⚙️ CI/CD Pipeline

Every push to `main` or `develop` triggers:

```
push → Tests → TypeScript Check → Build → Deploy (main only)
```

### Required GitHub Secrets

| Secret | Where to get |
|--------|-------------|
| `RAILWAY_TOKEN` | railway.app → Account Settings → Tokens |
| `VERCEL_TOKEN` | vercel.com → Settings → Tokens |
| `VERCEL_ORG_ID` | `vercel env ls` or project settings |
| `VERCEL_PROJECT_ID` | `vercel env ls` or project settings |

---

## 🌐 Deploy

**Frontend** → [Vercel](https://vercel.com): connect repo, root directory = `apps/web`

**API + DB** → [Railway](https://railway.app): connect repo, root directory = `apps/api`, add MySQL plugin

---

## 📄 License

MIT © [Seu Nome](https://github.com/SEU_USUARIO)
