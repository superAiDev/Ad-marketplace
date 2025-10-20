export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          parent_id: string | null
          name: string
          slug: string
          icon: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          parent_id?: string | null
          name: string
          slug: string
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          parent_id?: string | null
          name?: string
          slug?: string
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      ads: {
        Row: {
          id: string
          owner: string
          category_id: string
          title: string
          slug: string
          description: string | null
          price: number | null
          images: string[] | null
          location: Json | null
          contact_info: Json | null
          status: string
          is_featured: boolean
          view_count: number
          created_at: string
          updated_at: string
          expires_at: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          owner: string
          category_id: string
          title: string
          slug: string
          description?: string | null
          price?: number | null
          images?: string[] | null
          location?: Json | null
          contact_info?: Json | null
          status?: string
          is_featured?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          owner?: string
          category_id?: string
          title?: string
          slug?: string
          description?: string | null
          price?: number | null
          images?: string[] | null
          location?: Json | null
          contact_info?: Json | null
          status?: string
          is_featured?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          metadata?: Json | null
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          ad_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          ad_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          ad_id?: string
          created_at?: string
        }
      }
    }
    Functions: {
      search_ads: {
        Args: {
          search_query: string | null
          category_slug: string | null
          price_min: number | null
          price_max: number | null
          city: string | null
        }
        Returns: {
          id: string
          owner: string
          category_id: string
          title: string
          slug: string
          description: string | null
          price: number | null
          images: string[] | null
          location: Json | null
          contact_info: Json | null
          status: string
          is_featured: boolean
          view_count: number
          created_at: string
          updated_at: string
          expires_at: string | null
          metadata: Json | null
        }[]
      }
    }
  }
}