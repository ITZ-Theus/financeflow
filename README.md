# 💰 FinanceFlow

Aplicação completa de gestão financeira pessoal com autenticação, dashboard com gráficos, controle de transações, categorias e metas financeiras.

## 🛠️ Stack

- **Backend:** Node.js + TypeScript + Express + TypeORM + MySQL
- **Frontend:** React 18 + TypeScript + Tailwind CSS + React Query + Recharts
- **Infra:** Docker + Docker Compose

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose

### 1. Clone e configure

```bash
git clone <sua-repo>
cd financeflow

# Copie o arquivo de variáveis
cp .env.example apps/api/.env
```

### 2. Suba o banco com Docker

```bash
docker-compose up mysql -d
```

### 3. Instale as dependências e rode o backend

```bash
cd apps/api
npm install
npm run dev
```

### 4. Em outro terminal, rode o frontend

```bash
cd apps/web
npm install
npm run dev
```

### 5. Acesse

- **Frontend:** http://localhost:5173
- **API:** http://localhost:3333
- **Health check:** http://localhost:3333/health

## 📁 Estrutura do Projeto

```
financeflow/
├── apps/
│   ├── api/          # Backend Node.js + TypeScript
│   └── web/          # Frontend React + TypeScript
├── docker-compose.yml
└── README.md
```

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/register | Registro |
| POST | /api/auth/login | Login |
| GET | /api/transactions | Listar transações |
| POST | /api/transactions | Criar transação |
| PUT | /api/transactions/:id | Editar transação |
| DELETE | /api/transactions/:id | Deletar transação |
| GET | /api/transactions/summary | Resumo financeiro |
| GET | /api/categories | Listar categorias |
| POST | /api/categories | Criar categoria |
| GET | /api/goals | Listar metas |
| POST | /api/goals | Criar meta |
| PUT | /api/goals/:id | Atualizar meta |

## 🌐 Deploy

**Frontend:** [Vercel](https://vercel.com) — aponte para `apps/web`

**Backend + MySQL:** [Railway](https://railway.app) — aponte para `apps/api`

## ✅ Funcionalidades

- [x] Autenticação com JWT (login/registro)
- [x] Dashboard com gráficos de barras e pizza
- [x] Controle de transações (entradas e saídas)
- [x] Categorias personalizadas com cores
- [x] Metas financeiras com progresso
- [x] Filtros por mês/ano/categoria
- [x] Paginação nas listagens
- [x] Validação com Zod (back e front)
- [x] TypeScript completo em toda aplicação
- [x] Docker para ambiente local
