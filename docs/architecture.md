# Architecture

Browser / Mobile Browser
→ HTTPS
→ Vercel + Next.js
→ Protected server routes/server actions
→ Supabase Auth + PostgreSQL + RLS + private Storage

External integrations are server-side adapters only.

## Separation of concerns
- Browser: UI, OAuth initiation, requests; never hold privileged secrets.
- Next.js server: session validation, allow-list and role checks, input validation, privileged calls.
- Supabase: persistence, RLS, private object storage.
- Integrations: AI and WhatsApp through server-only adapters.

## Trust boundaries
1. Untrusted browser input
2. Authenticated application session
3. Server authorization boundary
4. Database RLS boundary
5. External provider boundaries
