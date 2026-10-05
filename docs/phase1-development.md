# Phase 1 — Secure Application Shell

Phase 1 is complete as the baseline application shell.

## Implemented
- Next.js App Router + TypeScript
- Supabase SSR client
- Google OAuth entry point and callback
- Server-side allow-list authorization
- Protected dashboard
- Access-denied page
- Sign-out
- Health endpoint
- Profiles and allowed-users database foundation
- RLS-enabled tables
- New-user profile trigger
- Vercel environment template

## Initial authorized accounts
- vaibhavds12@gmail.com — admin
- nagoripriyank@gmail.com — user

## Verification
The Vercel build completed successfully after correcting the project Framework Preset to Next.js. The deployment configuration should leave Build Command and Output Directory at their Next.js defaults.

## Next phase
Phase 2 will add conversations, messages, chat UI, per-user RLS, the server-side AI adapter, validation, rate limits, retention and deletion flows.
