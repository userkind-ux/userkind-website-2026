import { supabase } from './client'

const BUCKET_NAME = 'Media'

/**
 * Upload a file to Supabase Storage
 * @param file - The file to upload
 * @param originalFilename - The original semantic filename for database storage
 * @returns Object with storage path and public URL
 */
export async function uploadFile(file: File, originalFilename: string) {
  // Generate unique filename to avoid conflicts
  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(2, 15)
  const fileExtension = originalFilename.split('.').pop()
  const uniqueFilename = `${timestamp}-${randomId}.${fileExtension}`
  const storagePath = `${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${uniqueFilename}`

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`)
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath)

  return {
    storagePath: data.path,
    fileUrl: urlData.publicUrl,
    originalFilename, // Return original filename for database
  }
}

/**
 * Delete a file from Supabase Storage
 * @param filePath - The storage path of the file to delete
 */
export async function deleteFile(filePath: string) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath])

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`)
  }
}

/**
 * Get public URL for a file
 * @param filePath - The storage path of the file
 * @returns Public URL
 */
export function getFileUrl(filePath: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  return data.publicUrl
}

