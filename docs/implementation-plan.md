# Personal Chatbot Platform — Implementation Plan

Source: uploaded implementation plan dated 4 October 2026.

## Decisions
- Next.js with TypeScript and App Router.
- Vercel for the application.
- Supabase for PostgreSQL, authentication and optional private storage.
- Google OAuth plus explicit Gmail allow-list.
- No background workers initially.
- Official Meta WhatsApp Cloud API later.
- Identity and authorization are the primary security boundary.

## Delivery phases
0. Repository and threat model
1. Secure application shell
2. Core chatbot
3. On-demand reports
4. WhatsApp Cloud API
5. Hardening and operations

## Initial data model
- profiles
- allowed_users
- conversations
- messages
- contacts
- reports
- audit_events
- whatsapp_links (future)
- whatsapp_events (future)

## Initial security requirements
- Server-side authorization on every protected API/server action.
- RLS on user/personal data tables.
- No service-role or provider secrets in client code.
- Private storage buckets.
- Zod or equivalent request validation.
- Rate limits and request-size limits.
- Secure HttpOnly/SameSite cookies and security headers.
- No `.env*` files in Git.
- Negative authorization/RLS tests before release.
