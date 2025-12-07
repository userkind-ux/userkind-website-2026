import { createServerClient } from '../server'

export interface Page {
  id: string
  title: string
  slug: string
  meta_title: string | null
  meta_description: string | null
  meta_image_id: string | null
  status: 'draft' | 'published'
  page_category: 'Content' | 'Case Study' | 'Blog Post' | null
  created_at: string
  updated_at: string
}

export async function getPages(category?: string) {
  const supabase = await createServerClient()
  
  let query = supabase
    .from('pages')
    .select('*')
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('page_category', category)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch pages: ${error.message}`)
  }

  return data as Page[]
}

export async function getPage(id: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch page: ${error.message}`)
  }

  return data as Page
}

export async function getPublishedPages() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch published pages: ${error.message}`)
  }

  return data as Page[]
}

export async function getPageBySlug(slug: string, publishedOnly: boolean = true) {
  const supabase = await createServerClient()
  
  let query = supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)

  if (publishedOnly) {
    query = query.eq('status', 'published')
  }

  const { data, error } = await query.single()

  if (error) {
    throw new Error(`Failed to fetch page: ${error.message}`)
  }

  return data as Page
}

