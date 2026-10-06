# UNIRISE Backend Foundation

This directory and the accompanying `supabase/` folder contain the backend architecture for the UNIRISE Campus Platform.

## 🏗️ Backend Stack

* **Database**: PostgreSQL (via Supabase)
* **Authentication**: Supabase Auth (JWT & Role-Based Access Control)
* **Row Level Security**: PostgreSQL RLS policies
* **Realtime Engine**: Supabase Realtime (WebSockets for chat & notifications)
* **Serverless Functions**: Supabase Edge Functions (Deno / TypeScript)
* **AI Engine**: Google Gemini API Gateway (via Edge Functions)

---

## 📁 Directory Structure

```text
UNIRISE/
├── .env.example                # Template environment variables (no real keys)
├── backend/
│   ├── README.md               # Backend documentation & CLI instructions
│   └── docs/
│       └── architecture.md     # System architecture & Entity Relationship details
└── supabase/
    ├── config.toml             # Local Supabase CLI configuration
    ├── schema.sql              # Database schema (12 tables + RLS policies)
    ├── seed.sql                # Safe demo seed data
    └── functions/              # Edge Functions
        ├── ai-assistant/       # RAG Query & AI Assistant Gateway
        ├── poster-ocr/         # AI Vision Poster Extraction
        └── position-transfer/  # Atomic Club Position Transfer
```

---

## 🚀 Local Supabase Setup Instructions

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
* [Supabase CLI](https://supabase.com/docs/guides/cli)

### Starting Local Supabase Instance

```bash
# 1. Initialize Supabase locally
supabase start

# 2. Apply database schema and seed data
supabase db reset

# 3. Serve Edge Functions locally
supabase functions serve
```

### Accessing Supabase Local Studio
Once started, the Supabase Studio dashboard will be available at:
`http://localhost:54323`

---

## 🔑 Environment Setup
Copy `.env.example` to `.env.local` for local testing:

```bash
cp .env.example .env.local
```
*(Never commit `.env.local` or real API keys to repository version control).*
