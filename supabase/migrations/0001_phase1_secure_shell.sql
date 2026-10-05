create table if not exists public.allowed_users(
  email_normalised text primary key,
  role text not null default 'user' check(role in('admin','user')),
  is_active boolean not null default true,
  added_at timestamptz not null default now(),
  added_by uuid references auth.users(id) on delete set null
);

create table if not exists public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user' check(role in('admin','user')),
  created_at timestamptz not null default now()
);

alter table public.allowed_users enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "admins can read allow list" on public.allowed_users;
create policy "admins can read allow list"
on public.allowed_users
for select to authenticated
using (
  email_normalised = lower(auth.jwt()->>'email')
  or exists (
    select 1
    from public.allowed_users admin_user
    where admin_user.email_normalised = lower(auth.jwt()->>'email')
      and admin_user.role = 'admin'
      and admin_user.is_active = true
  )
);

drop policy if exists "users can read own profile" on public.profiles;
create policy "users can read own profile"
on public.profiles
for select to authenticated
using (id = auth.uid());

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
on public.profiles
for update to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    'user'
  )
  on conflict (id) do update
  set display_name = excluded.display_name;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- After the first successful Google login for each account, run:
-- insert into public.allowed_users(email_normalised, role, added_by)
-- select 'vaibhavds12@gmail.com', 'admin', id
-- from auth.users where lower(email) = lower('vaibhavds12@gmail.com')
-- on conflict (email_normalised) do update set role = excluded.role, is_active = true;
--
-- insert into public.allowed_users(email_normalised, role, added_by)
-- select 'nagoripriyank@gmail.com', 'user', id
-- from auth.users where lower(email) = lower('nagoripriyank@gmail.com')
-- on conflict (email_normalised) do update set role = excluded.role, is_active = true;
