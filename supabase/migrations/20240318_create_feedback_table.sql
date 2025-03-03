-- Create the feedbacks table
create table public.feedbacks (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.feedbacks enable row level security;

-- Create a policy that allows anyone to insert feedback
create policy "Allow anonymous feedback submission"
  on public.feedbacks
  for insert
  to anon
  with check (true);

-- Create a policy that allows anyone to view feedbacks
create policy "Allow anonymous feedback viewing"
  on public.feedbacks
  for select
  to anon
  using (true);

-- Enable realtime subscriptions for the feedbacks table
alter publication supabase_realtime add table feedbacks;