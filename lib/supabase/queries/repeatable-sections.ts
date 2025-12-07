import { createServerClient } from '../server'

export interface RepeatableContentSection {
  id: string
  name: string
  section_type: string
  fields: Record<string, any>
  created_at: string
  updated_at: string
}

export async function getRepeatableContentSections() {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('repeatable_content_sections')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch repeatable content sections: ${error.message}`)
  }

  return data as RepeatableContentSection[]
}

export async function getRepeatableContentSection(id: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('repeatable_content_sections')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch repeatable content section: ${error.message}`)
  }

  return data as RepeatableContentSection
}

