import { createServerClient } from './supabaseServer';
import type { Database } from './types/supabase';
import type { 
  Ad,
  AdFormData,
  SearchFilters, 
  Category,
} from './types';

export async function getAdBySlug(slug: string): Promise<Ad | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('ads')
    .select(`
      *,
      category:category_id (name, slug),
      owner:user_id (username, avatar_url)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching ad:', error);
    return null;
  }

  return data;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}

export async function getFeaturedAds(limit = 6): Promise<Ad[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('ads')
    .select(`
      *,
      category:category_id (name, slug),
      owner:user_id (username, avatar_url)
    `)
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured ads:', error);
    return [];
  }

  return data;
}

export async function searchAds(filters: SearchFilters) {
  const supabase = createServerClient();
  const {
    query,
    categorySlug,
    priceMin,
    priceMax,
    city,
    sortBy = 'newest',
    page = 1,
    limit = 20
  } = filters;

  let queryBuilder = supabase
    .from('ads')
    .select(`
      *,
      category:category_id (name, slug),
      owner:user_id (username, avatar_url)
    `, { count: 'exact' });

  if (query) {
    queryBuilder = queryBuilder.ilike('title', `%${query}%`);
  }

  if (categorySlug) {
    queryBuilder = queryBuilder.eq('category.slug', categorySlug);
  }

  if (priceMin) {
    queryBuilder = queryBuilder.gte('price', priceMin);
  }

  if (priceMax) {
    queryBuilder = queryBuilder.lte('price', priceMax);
  }

  if (city) {
    queryBuilder = queryBuilder.eq('location->city', city);
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-asc':
      queryBuilder = queryBuilder.order('price', { ascending: true });
      break;
    case 'price-desc':
      queryBuilder = queryBuilder.order('price', { ascending: false });
      break;
    default:
      queryBuilder = queryBuilder.order('created_at', { ascending: false });
  }

  // Apply pagination
  const from = (page - 1) * limit;
  queryBuilder = queryBuilder.range(from, from + limit - 1);

  const { data, error, count } = await queryBuilder;

  if (error) {
    console.error('Error searching ads:', error);
    return { ads: [], total: 0 };
  }

  return { 
    ads: data || [], 
    total: count || 0 
  };
}

