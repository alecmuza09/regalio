import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de base de datos
export interface Database {
  public: {
    Tables: {
      exchanges: {
        Row: {
          id: string
          name: string
          event_type: string
          preference_deadline: string
          exchange_date: string
          budget_min: number
          budget_max: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          event_type: string
          preference_deadline: string
          exchange_date: string
          budget_min: number
          budget_max: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          event_type?: string
          preference_deadline?: string
          exchange_date?: string
          budget_min?: number
          budget_max?: number
          created_at?: string
          updated_at?: string
        }
      }
      participants: {
        Row: {
          id: string
          exchange_id: string
          name: string
          email: string
          budget: number
          preferences: string[]
          links: { url: string; title: string }[]
          notes: string
          assigned_to: string | null
          status: 'completo' | 'pendiente'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exchange_id: string
          name: string
          email: string
          budget: number
          preferences?: string[]
          links?: { url: string; title: string }[]
          notes?: string
          assigned_to?: string | null
          status?: 'completo' | 'pendiente'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exchange_id?: string
          name?: string
          email?: string
          budget?: number
          preferences?: string[]
          links?: { url: string; title: string }[]
          notes?: string
          assigned_to?: string | null
          status?: 'completo' | 'pendiente'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

