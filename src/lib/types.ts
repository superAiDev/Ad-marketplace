import { Database } from './supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Ad = Database['public']['Tables']['ads']['Row'];
export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];

export type AdStatus = 'draft' | 'published' | 'expired' | 'archived';

export interface Location {
  city: string;
  state: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: boolean;
  telegram?: boolean;
}

export interface AdMetadata {
  specifications?: Record<string, string | number | boolean>;
  condition?: 'new' | 'like-new' | 'used' | 'needs-repair';
  brand?: string;
  model?: string;
  year?: number;
  [key: string]: any;
}

export interface AdFormData {
  title: string;
  description: string;
  categoryId: string;
  price?: number;
  images: string[];
  location: Location;
  contactInfo: ContactInfo;
  metadata?: AdMetadata;
}

export interface SearchFilters {
  query?: string;
  categorySlug?: string;
  priceMin?: number;
  priceMax?: number;
  city?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc';
  page?: number;
  limit?: number;
}