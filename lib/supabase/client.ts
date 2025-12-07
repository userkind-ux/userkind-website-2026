'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  // Only create client when actually accessed (lazy initialization)
  if (supabaseClient) {
    return supabaseClient
  }

  // During build/SSR, env vars might not be available - only check in browser
  if (typeof window === 'undefined') {
    // Return a mock client during SSR/build that will fail gracefully
    // This prevents build-time errors while still catching runtime issues
    throw new Error('Supabase client can only be used in the browser')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

// Export a Proxy that lazily creates the client only when properties are accessed
// During build, this will be analyzed but won't throw until actually used in browser
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    try {
      const client = getSupabaseClient()
      const value = (client as any)[prop]
      return typeof value === 'function' ? value.bind(client) : value
    } catch (error) {
      // During build/SSR, if client creation fails, return a no-op
      // This prevents build errors while still failing at runtime in browser
      if (typeof window === 'undefined') {
        // Return a mock that will fail gracefully when called
        return () => {
          throw new Error('Supabase client is not available during build/SSR. It can only be used in the browser.')
        }
      }
      // In browser, re-throw the error
      throw error
    }
  }
})

