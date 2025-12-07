import { createServerClient } from '../server'

export interface Media {
  id: string
  filename: string
  file_url: string
  alt_text: string | null
  description: string | null
  media_type: 'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo'
  created_at: string
  updated_at: string
}

export async function getMedia(mediaType?: string) {
  const supabase = await createServerClient()
  
  let query = supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })

  if (mediaType) {
    query = query.eq('media_type', mediaType)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch media: ${error.message}`)
  }

  return data as Media[]
}

export async function getMediaItem(id: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch media item: ${error.message}`)
  }

  return data as Media
}

export interface CreateMediaInput {
  filename: string
  file_url: string
  alt_text?: string | null
  description?: string | null
  media_type: 'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo'
}

export async function createMediaItem(input: CreateMediaInput) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('media')
    .insert([input])
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create media item: ${error.message}`)
  }

  return data as Media
}

export interface UpdateMediaInput {
  filename?: string
  alt_text?: string | null
  description?: string | null
  media_type?: 'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo'
}

export async function updateMediaItem(id: string, input: UpdateMediaInput) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('media')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update media item: ${error.message}`)
  }

  return data as Media
}

export async function deleteMediaItem(id: string) {
  const supabase = await createServerClient()
  
  const { data, error } = await supabase
    .from('media')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to delete media item: ${error.message}`)
  }

  return data as Media
}

