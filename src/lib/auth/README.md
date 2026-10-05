# Authentication

Planned responsibilities:
- Supabase SSR session handling
- normalized verified email lookup
- `requireAllowedUser()` server guard
- role checks
- access-denied handling

Never trust a client-supplied email, role, owner id or access decision.
