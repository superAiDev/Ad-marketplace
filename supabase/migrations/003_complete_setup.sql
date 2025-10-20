-- Complete search function
CREATE OR REPLACE FUNCTION public.search_ads(
    search_query text,
    category_slug text DEFAULT NULL,
    price_min decimal DEFAULT NULL,
    price_max decimal DEFAULT NULL,
    city text DEFAULT NULL
) RETURNS TABLE (
    id uuid,
    title text,
    slug text,
    description text,
    price decimal,
    images text[],
    location jsonb,
    status text,
    created_at timestamptz,
    category_name text,
    category_slug text,
    owner_username text,
    owner_avatar text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.title,
        a.slug,
        a.description,
        a.price,
        a.images,
        a.location,
        a.status,
        a.created_at,
        c.name as category_name,
        c.slug as category_slug,
        p.username as owner_username,
        p.avatar_url as owner_avatar
    FROM public.ads a
    LEFT JOIN public.categories c ON a.category_id = c.id
    LEFT JOIN public.profiles p ON a.owner = p.id
    WHERE
        a.status = 'published'
        AND (
            search_query IS NULL OR 
            to_tsvector('simple', 
                a.title || ' ' || 
                COALESCE(a.description, '') || ' ' ||
                COALESCE(c.name, '')
            ) @@ to_tsquery('simple', replace(search_query, ' ', ' & '))
        )
        AND (category_slug IS NULL OR c.slug = category_slug)
        AND (price_min IS NULL OR a.price >= price_min)
        AND (price_max IS NULL OR a.price <= price_max)
        AND (city IS NULL OR (a.location->>'city')::text = city)
    ORDER BY
        CASE WHEN a.is_featured THEN 0 ELSE 1 END,
        a.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ads_timestamp
    BEFORE UPDATE ON public.ads
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_profiles_timestamp
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- Add function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(ad_id uuid)
RETURNS void AS $$
BEGIN
    UPDATE public.ads
    SET view_count = view_count + 1
    WHERE id = ad_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add function to get user dashboard stats
CREATE OR REPLACE FUNCTION get_user_stats(user_id uuid)
RETURNS TABLE (
    total_ads bigint,
    active_ads bigint,
    total_views bigint,
    total_bookmarks bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM public.ads WHERE owner = user_id) as total_ads,
        (SELECT COUNT(*) FROM public.ads WHERE owner = user_id AND status = 'published') as active_ads,
        (SELECT COALESCE(SUM(view_count), 0) FROM public.ads WHERE owner = user_id) as total_views,
        (SELECT COUNT(*) FROM public.bookmarks WHERE user_id = user_id) as total_bookmarks;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_ads_status_created ON public.ads(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ads_owner ON public.ads(owner);
CREATE INDEX IF NOT EXISTS idx_ads_category ON public.ads(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);

-- Insert some default categories
INSERT INTO public.categories (name, slug, icon, sort_order) VALUES
('املاک', 'real-estate', 'home', 1),
('وسایل نقلیه', 'vehicles', 'car', 2),
('کالای دیجیتال', 'electronics', 'laptop', 3),
('خانه و آشپزخانه', 'home-kitchen', 'couch', 4),
('خدمات', 'services', 'tool', 5),
('شخصی', 'personal', 'user', 6),
('سرگرمی و فراغت', 'hobbies', 'gamepad', 7),
('اجتماعی', 'social', 'users', 8),
('استخدام و کاریابی', 'jobs', 'briefcase', 9),
('مد و پوشاک', 'fashion', 'shirt', 10)
ON CONFLICT (slug) DO NOTHING;