import { createServerClient } from '../server'

// Header
export interface Header {
  id: string
  logo_id: string | null
  main_menu: Array<{ label: string; url: string }>
  submenus: Array<{ label: string; url: string }>
  cta_label: string | null
  cta_url: string | null
  created_at: string
  updated_at: string
}

export async function getHeader() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('header')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch header: ${error.message}`)
  }

  return data as Header | null
}

// Footer
export interface Footer {
  id: string
  logo_id: string | null
  column_one_content: string | null
  column_two_content: string | null
  created_at: string
  updated_at: string
}

export async function getFooter() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('footer')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch footer: ${error.message}`)
  }

  return data as Footer | null
}

// Case Studies
export interface CaseStudy {
  id: string
  heading: string
  description: string | null
  work_category: 'E-commerce' | 'Website' | 'Application' | 'UX Design' | null
  thumbnail_id: string | null
  link_url: string | null
  page_id: string | null
  created_at: string
  updated_at: string
}

export async function getCaseStudies() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch case studies: ${error.message}`)
  }

  return data as CaseStudy[]
}

export async function getCaseStudy(id: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch case study: ${error.message}`)
  }

  return data as CaseStudy
}

// Testimonials
export interface Testimonial {
  id: string
  name: string
  content: string
  company: string | null
  avatar_id: string | null
  created_at: string
  updated_at: string
}

export async function getTestimonials() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch testimonials: ${error.message}`)
  }

  return data as Testimonial[]
}

export async function getTestimonial(id: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch testimonial: ${error.message}`)
  }

  return data as Testimonial
}

// Forms
export interface Form {
  id: string
  name: string
  email_to: string
  form_fields: Array<{ name: string; type: string; required: boolean; label: string }>
  created_at: string
  updated_at: string
}

export async function getForms() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch forms: ${error.message}`)
  }

  return data as Form[]
}

export async function getForm(id: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('forms')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch form: ${error.message}`)
  }

  return data as Form
}

