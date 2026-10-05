# Threat Model

## Assets
- Identity and sessions
- Personal contact data
- Chat content
- Generated reports
- Audit events
- Provider credentials

## Primary threats
- Unlisted Google account gaining application access
- IDOR by changing record identifiers
- Secret exposure in browser bundles or logs
- Weak storage permissions
- Replay/forged future WhatsApp webhooks
- Oversized or abusive requests

## Required controls
- Google authentication plus active email allow-list
- Server-side `requireAllowedUser()` checks
- RLS based on authenticated user identity
- Private storage and short-lived signed URLs
- Schema validation and rate limits
- Server-only secrets
- Webhook verification and event-id deduplication
