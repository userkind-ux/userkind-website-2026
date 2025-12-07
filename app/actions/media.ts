'use server'

import { createMediaItem } from '@/lib/supabase/queries/media'
import { createServerClient } from '@/lib/supabase/server'

const BUCKET_NAME = 'Media'

export async function uploadMediaAction(formData: FormData) {
  try {
    // Verify user is authenticated and get the authenticated client
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error('Auth error:', authError)
      return { error: 'Unauthorized - Please log in again' }
    }

    console.log('Authenticated user:', user.id, user.email)

    // Get file from form data
    const file = formData.get('file') as File
    if (!file) {
      console.error('No file in form data')
      return { error: 'No file provided' }
    }

    // Get metadata from form data
    const originalFilename = formData.get('filename') as string
    const altText = formData.get('alt_text') as string
    const description = formData.get('description') as string | null
    const mediaType = formData.get('media_type') as 'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo'

    console.log('Upload action - filename:', originalFilename, 'altText:', altText, 'mediaType:', mediaType)

    if (!originalFilename || !altText || !mediaType) {
      console.error('Missing fields - filename:', !!originalFilename, 'altText:', !!altText, 'mediaType:', !!mediaType)
      return { error: `Missing required fields: ${!originalFilename ? 'filename ' : ''}${!altText ? 'alt_text ' : ''}${!mediaType ? 'media_type' : ''}` }
    }

    // Generate unique filename for storage (to avoid conflicts)
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 15)
    const fileExtension = originalFilename.split('.').pop()
    const uniqueFilename = `${timestamp}-${randomId}.${fileExtension}`
    const storagePath = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${uniqueFilename}`

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const fileBlob = new Blob([arrayBuffer], { type: file.type })

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBlob, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return { error: `Failed to upload file: ${uploadError.message}` }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath)

    // Verify session before insert
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      console.error('Session error before insert:', sessionError)
      return { error: 'Session expired. Please log in again.' }
    }
    console.log('Session exists:', !!session, 'User ID:', session?.user?.id)

    // Save metadata to database using the SAME authenticated client
    const { data: mediaItem, error: insertError } = await supabase
      .from('media')
      .insert([{
        filename: originalFilename, // Use original semantic filename for SEO
        file_url: urlData.publicUrl,
        alt_text: altText,
        description: description || null,
        media_type: mediaType,
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      console.error('Error details:', JSON.stringify(insertError, null, 2))
      console.error('Session user:', session?.user?.id)
      return { error: `Failed to save media: ${insertError.message}. Code: ${insertError.code}` }
    }

    return { success: true, data: mediaItem }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      error: error instanceof Error ? error.message : 'Failed to upload media',
    }
  }
}

