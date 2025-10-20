"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './types/supabase';
import type { 
  Ad,
  AdFormData,
  Profile,
  Bookmark,
  Category 
} from './types';

const supabase = createClientComponentClient<Database>();

// Client-side database operations
export async function createAdClient(formData: AdFormData, userId: string) {
  // Generate slug from title
  const slug = formData.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');

  const { data, error } = await supabase
    .from('ads')
    .insert({
      ...formData,
      slug,
      owner: userId,
      status: 'draft'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating ad:', error);
    return null;
  }

  return data;
}

export async function updateAdClient(id: string, formData: Partial<AdFormData>): Promise<Ad | null> {
  const { data, error } = await supabase
    .from('ads')
    .update(formData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating ad:', error);
    return null;
  }

  return data;
}

export async function getProfileClient(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

export async function updateProfileClient(userId: string, profile: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }

  return data;
}

export async function toggleBookmarkClient(userId: string, adId: string): Promise<boolean> {
  // Check if bookmark exists
  const { data: existing } = await supabase
    .from('bookmarks')
    .select()
    .eq('user_id', userId)
    .eq('ad_id', adId)
    .maybeSingle();

  if (existing) {
    // Remove bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', existing.id);

    return error ? false : true;
  } else {
    // Add bookmark
    const { error } = await supabase
      .from('bookmarks')
      .insert({ user_id: userId, ad_id: adId });

    return error ? false : true;
  }
}

export async function getBookmarkedAdsClient(userId: string) {
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      ad_id,
      ads:ad_id (
        *,
        categories:category_id (name, slug),
        profiles:owner (username, avatar_url)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }

  return data || [];
}