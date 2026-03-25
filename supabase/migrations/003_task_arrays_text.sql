-- Update user_tasks to use text arrays for steps and docs
alter table public.user_tasks 
  alter column steps_done type text[] using steps_done::text[],
  alter column docs_ready type text[] using docs_ready::text[];
