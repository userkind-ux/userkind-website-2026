import { createServerClient } from '../server'

export interface SiteSettings {
  id: string
  site_seo_title: string | null
  site_seo_description: string | null
  favicon_id: string | null
  robots_no_follow: boolean
  google_tag_manager_id: string | null
  social_links: Array<{ platform: string; url: string; icon_id: string | null }>
  social_meta_title: string | null
  social_meta_description: string | null
  created_at: string
  updated_at: string
}

export async function getSiteSettings() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch site settings: ${error.message}`)
  }

  return data as SiteSettings | null
}

