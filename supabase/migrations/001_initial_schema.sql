-- ============================================================
-- Ankur — Phase 1 Database Schema
-- Run this in the Supabase SQL Editor (or via supabase db push)
-- ============================================================

-- 1. EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";


-- 2. TABLES
-- ============================================================

-- 2.1 universities (created first — users references it)
create table public.universities (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  short_name  text,
  city        text not null,
  type        text check (type in ('tu','lmu','fh','uni','private')),
  email_domain text,
  website     text,
  created_at  timestamptz default now()
);

-- 2.2 users
create table public.users (
  id                  uuid primary key references auth.users(id) on delete cascade,
  name                text,
  avatar_url          text,
  language_pref       text default 'en' check (language_pref in ('en','hi','both')),
  city                text,
  university_id       uuid references public.universities(id) on delete set null,
  purpose             text check (purpose in ('student','professional','job_seeker')),
  visa_type           text check (visa_type in ('student','work','job_seeker','eu')),
  arrival_date        date,
  onboarding_complete boolean default false,
  created_at          timestamptz default now()
);

-- 2.3 user_tasks
create table public.user_tasks (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.users(id) on delete cascade,
  task_id       text not null,
  status        text default 'todo' check (status in ('todo','in_progress','done')),
  completed_at  timestamptz,
  deadline      date,
  notes         text,
  steps_done    int[] default '{}',
  docs_ready    int[] default '{}',
  created_at    timestamptz default now(),

  constraint uq_user_task unique (user_id, task_id)
);


-- 3. INDEXES
-- ============================================================
create index idx_user_tasks_user    on public.user_tasks(user_id);
create index idx_user_tasks_status  on public.user_tasks(user_id, status);
create index idx_universities_city  on public.universities(city);


-- 4. ROW LEVEL SECURITY
-- ============================================================

-- 4.1 users
alter table public.users enable row level security;

-- Users can read their own row
create policy "users_select_own"
  on public.users for select
  using (auth.uid() = id);

-- Users can insert their own row (signup / profile creation)
create policy "users_insert_own"
  on public.users for insert
  with check (auth.uid() = id);

-- Users can update their own row
create policy "users_update_own"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Users cannot delete their own profile (handled via auth cascade)
-- No delete policy = denied by default


-- 4.2 user_tasks
alter table public.user_tasks enable row level security;

-- Users can read their own tasks
create policy "user_tasks_select_own"
  on public.user_tasks for select
  using (auth.uid() = user_id);

-- Users can insert tasks for themselves
create policy "user_tasks_insert_own"
  on public.user_tasks for insert
  with check (auth.uid() = user_id);

-- Users can update their own tasks
create policy "user_tasks_update_own"
  on public.user_tasks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can delete their own tasks
create policy "user_tasks_delete_own"
  on public.user_tasks for delete
  using (auth.uid() = user_id);


-- 4.3 universities (public read-only reference table)
alter table public.universities enable row level security;

-- Anyone authenticated can read universities
create policy "universities_select_all"
  on public.universities for select
  using (auth.role() = 'authenticated');

-- No insert/update/delete policies = only admins via service_role key


-- 5. AUTO-CREATE USER PROFILE ON SIGNUP  (optional trigger)
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
