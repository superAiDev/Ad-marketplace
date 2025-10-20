-- Create ads table (example)
CREATE TABLE IF NOT EXISTS public.ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL,
  category text NOT NULL,
  description text,
  city text,
  owner uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text DEFAULT 'draft'
);

-- Example full text index for search
CREATE INDEX IF NOT EXISTS ads_fts_idx ON public.ads USING GIN (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(description,'')));

-- Row Level Security sample: allow owners to insert/update their ads
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert and select their own ads
CREATE POLICY "Allow owners" ON public.ads
  FOR ALL USING (auth.uid() = owner)
  WITH CHECK (auth.uid() = owner);

-- Note: adapt policies for public read (search) and anonymous viewing as needed.
