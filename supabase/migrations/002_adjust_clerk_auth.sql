-- ============================================================
-- Ankur — Phase 1.1: Clerk Integration Adjustments
-- ============================================================

-- 1. Remove foreign key to auth.users (since we're using Clerk)
alter table public.users drop constraint if exists users_id_fkey;

-- 2. Change id column from uuid to text (Clerk IDs are strings)
-- We need to drop dependent constraints first if any
alter table public.user_tasks drop constraint if exists user_tasks_user_id_fkey;

alter table public.users 
  alter column id type text using id::text;

alter table public.user_tasks
  alter column user_id type text using user_id::text;

-- 3. Re-add foreign key constraint for user_tasks
alter table public.user_tasks
  add constraint user_tasks_user_id_fkey 
  foreign key (user_id) references public.users(id) on delete cascade;

-- 4. Update RLS policies to use auth.uid() as text
-- Note: Supabase's auth.uid() returns uuid. When using Clerk, 
-- we need to extract the user ID from the JWT.
-- A common way is to use a custom function or cast auth.uid() if it's been overridden.

-- For Clerk integration, it's often better to use:
-- (auth.jwt() ->> 'sub') instead of auth.uid() if uid() expects uuid.

-- Let's update the policies
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
  on public.users for select
  using ((auth.jwt() ->> 'sub') = id);

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own"
  on public.users for insert
  with check ((auth.jwt() ->> 'sub') = id);

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
  on public.users for update
  using ((auth.jwt() ->> 'sub') = id)
  with check ((auth.jwt() ->> 'sub') = id);

drop policy if exists "user_tasks_select_own" on public.user_tasks;
create policy "user_tasks_select_own"
  on public.user_tasks for select
  using ((auth.jwt() ->> 'sub') = user_id);

drop policy if exists "user_tasks_insert_own" on public.user_tasks;
create policy "user_tasks_insert_own"
  on public.user_tasks for insert
  with check ((auth.jwt() ->> 'sub') = user_id);

drop policy if exists "user_tasks_update_own" on public.user_tasks;
create policy "user_tasks_update_own"
  on public.user_tasks for update
  using ((auth.jwt() ->> 'sub') = user_id)
  with check ((auth.jwt() ->> 'sub') = user_id);

drop policy if exists "user_tasks_delete_own" on public.user_tasks;
create policy "user_tasks_delete_own"
  on public.user_tasks for delete
  using ((auth.jwt() ->> 'sub') = user_id);
