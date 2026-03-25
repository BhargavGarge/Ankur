-- Add data JSONB column to user_tasks for flexible task field tracking
alter table public.user_tasks 
  add column if not exists data jsonb default '{}'::jsonb;

-- Ensure RLS allows access
alter table public.user_tasks enable row level security;
-- (Assuming policies are already set up for user_id)
