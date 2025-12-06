import { createServerClient } from './server'
import { redirect } from 'next/navigation'

/**
 * Get the current authenticated user session
 */
export async function getSession() {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * Get the current authenticated user
 */
export async function getUser() {
  const session = await getSession()
  return session?.user ?? null
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect('/admin/login')
  }
  return user
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

