# Jain Database — Phase 1 Secure Application Shell

Phase 1 implements the secure application shell from the project plan: Next.js App Router, Supabase SSR/Auth, Google OAuth, Gmail allow-listing, protected routes, access-denied flow and RLS foundation.

## Deployment
Vercel environment variables:
- NEXT_PUBLIC_SUPABASE_URL=https://ilmjytbxreypuwdxpdbf.supabase.co
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<set in Vercel; do not commit>
- APP_BASE_URL=https://jaindatabase-lpwoaz1fv-dev-1343-2686.vercel.app

Supabase migration:
- Run `supabase/migrations/0001_phase1_secure_shell.sql` in SQL Editor.

Initial allow-list:
```sql
insert into public.allowed_users(email_normalised,role,added_by)
select 'vaibhavds12@gmail.com','admin',id from auth.users where lower(email)=lower('vaibhavds12@gmail.com');

insert into public.allowed_users(email_normalised,role,added_by)
select 'nagoripriyank@gmail.com','user',id from auth.users where lower(email)=lower('nagoripriyank@gmail.com');
```

Google OAuth:
- Supabase callback: https://ilmjytbxreypuwdxpdbf.supabase.co/auth/v1/callback
- Application callback: https://jaindatabase-lpwoaz1fv-dev-1343-2686.vercel.app/auth/callback

The Supabase publishable key is intentionally not stored in Git.
