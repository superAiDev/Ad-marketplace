-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username text UNIQUE,
    full_name text,
    phone text,
    avatar_url text,
    is_verified boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create categories table with hierarchy
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id uuid REFERENCES public.categories(id),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    icon text,
    sort_order int DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Add new columns to ads table
ALTER TABLE public.ads 
ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES public.categories(id),
ADD COLUMN IF NOT EXISTS price decimal(12,2),
ADD COLUMN IF NOT EXISTS images text[],
ADD COLUMN IF NOT EXISTS location jsonb,
ADD COLUMN IF NOT EXISTS contact_info jsonb,
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS view_count int DEFAULT 0,
ADD COLUMN IF NOT EXISTS expires_at timestamptz,
ADD COLUMN IF NOT EXISTS metadata jsonb;

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ad_id uuid NOT NULL REFERENCES public.ads(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, ad_id)
);

-- Enable RLS on new tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Bookmarks policies
CREATE POLICY "Users can view own bookmarks"
    ON public.bookmarks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own bookmarks"
    ON public.bookmarks FOR ALL
    USING (auth.uid() = user_id);

-- Update ads policies for public viewing
DROP POLICY IF EXISTS "Allow owners" ON public.ads;

CREATE POLICY "Published ads are viewable by everyone"
    ON public.ads FOR SELECT
    USING (status = 'published' OR auth.uid() = owner);

CREATE POLICY "Users can insert own ads"
    ON public.ads FOR INSERT
    WITH CHECK (auth.uid() = owner);

CREATE POLICY "Users can update own ads"
    ON public.ads FOR UPDATE
    USING (auth.uid() = owner);

-- Create enhanced search function
CREATE OR REPLACE FUNCTION public.search_ads(
    search_query text,
    category_slug text DEFAULT NULL,
    price_min decimal DEFAULT NULL,
    price_max decimal DEFAULT NULL,
    city text DEFAULT NULL
) RETURNS SETOF public.ads AS $$
BEGIN
    RETURN QUERY
    SELECT a.*
    FROM public.ads a
    JOIN public.categories c ON a.category_id = c.id
    WHERE
        a.status = 'published'
        AND (search_query IS NULL OR 
            to_tsvector('simple', a.title || ' ' || COALESCE(a.description, '')) @@ to_tsquery('simple', search_query))
        AND (category_slug IS NULL OR c.slug = category_slug)
        AND (price_min IS NULL OR a.price >= price_min)
        AND (price_max IS NULL OR a.price <= price_max)
        AND (city IS NULL OR (a.location->>'city')::text = city)
    ORDER BY
        a.is_featured DESC,
        a.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Insert initial categories
INSERT INTO public.categories (name, slug, icon) VALUES
    ('املاک', 'real-estate', '🏠'),
    ('وسایل نقلیه', 'vehicles', '🚗'),
    ('کالای دیجیتال', 'electronics', '📱'),
    ('خانه و آشپزخانه', 'home', '🏡'),
    ('خدمات', 'services', '🔧'),
    ('وسایل شخصی', 'personal', '👔'),
    ('سرگرمی و فراغت', 'entertainment', '🎮'),
    ('اجتماعی', 'social', '👥'),
    ('تجهیزات و صنعتی', 'industrial', '🏭'),
    ('استخدام و کاریابی', 'jobs', '💼')
ON CONFLICT (slug) DO NOTHING;