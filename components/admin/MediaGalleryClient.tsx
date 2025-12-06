'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MediaUpload from './MediaUpload'
import MediaMetadataForm from './MediaMetadataForm'
import DataTable from './DataTable'
import MediaThumbnailView from './MediaThumbnailView'
import type { Media } from '@/lib/supabase/queries/media'

interface MediaGalleryClientProps {
  initialMedia: Media[]
}

export default function MediaGalleryClient({ initialMedia }: MediaGalleryClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [media, setMedia] = useState<Media[]>(initialMedia)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const [showMetadataForm, setShowMetadataForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'thumbnail' | 'list'>('thumbnail')
  const [editingMedia, setEditingMedia] = useState<Media | null>(null)

  // Refresh media list when search params change
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaType = searchParams.get('type') && searchParams.get('type') !== 'all'
          ? searchParams.get('type')!
          : undefined

        const response = await fetch(
          `/api/media?${mediaType ? `type=${mediaType}` : ''}`,
          { cache: 'no-store' }
        )
        const data = await response.json()
        if (data.media) {
          setMedia(data.media)
        }
      } catch (err) {
        console.error('Failed to fetch media:', err)
      }
    }

    fetchMedia()
  }, [searchParams])

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setError(null)
    setSuccess(null)
    // Don't upload yet - wait for metadata form submission
    // Just show the metadata form
    setShowMetadataForm(true)
  }

  const handleMetadataSubmit = async (metadata: {
    alt_text: string
    description: string
    media_type: 'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo'
  }) => {
    if (!selectedFile) {
      setError('No file selected')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Create form data with file and metadata
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('filename', selectedFile.name)
      formData.append('alt_text', metadata.alt_text)
      formData.append('description', metadata.description || '')
      formData.append('media_type', metadata.media_type)

      console.log('Uploading file:', {
        filename: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        alt_text: metadata.alt_text,
        media_type: metadata.media_type,
      })

      // Call upload API which handles both upload and save
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        const errorMessage = result.error || `Upload failed with status ${response.status}`
        console.error('Upload error:', errorMessage)
        setError(errorMessage)
        setUploading(false)
        return
      }

      // Success - refresh the page to show new media
      setSuccess('Media uploaded successfully!')
      setShowMetadataForm(false)
      setSelectedFile(null)
      setUploadedFileUrl(null)

      // Refresh media list by fetching again
      const mediaType = searchParams.get('type') && searchParams.get('type') !== 'all'
        ? searchParams.get('type')!
        : undefined

      const mediaResponse = await fetch(
        `/api/media?${mediaType ? `type=${mediaType}` : ''}`,
        { cache: 'no-store' }
      )
      const mediaData = await mediaResponse.json()
      if (mediaData.media) {
        setMedia(mediaData.media)
      }

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save media')
    } finally {
      setUploading(false)
    }
  }

  const handleUpdateMedia = async (metadata: {
    alt_text: string
    description: string
    media_type: 'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo'
  }) => {
    if (!editingMedia) return

    setUploading(true)
    setError(null)

    try {
      const response = await fetch(`/api/media/${editingMedia.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadata),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        setError(result.error || 'Failed to update media')
        setUploading(false)
        return
      }

      setSuccess('Media updated successfully!')
      setEditingMedia(null)
      
      // Refresh media list
      const mediaType = searchParams.get('type') && searchParams.get('type') !== 'all'
        ? searchParams.get('type')!
        : undefined

      const mediaResponse = await fetch(
        `/api/media?${mediaType ? `type=${mediaType}` : ''}`,
        { cache: 'no-store' }
      )
      const mediaData = await mediaResponse.json()
      if (mediaData.media) {
        setMedia(mediaData.media)
      }

      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update media')
    } finally {
      setUploading(false)
    }
  }

  const tabs = [
    { id: 'all', name: 'All' },
    { id: 'Icon', name: 'Icon' },
    { id: 'Image', name: 'Image' },
    { id: 'Hero', name: 'Hero' },
    { id: 'Video', name: 'Video' },
    { id: 'Logo', name: 'Logo' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Media Gallery
        </h1>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
            <button
              onClick={() => setViewMode('thumbnail')}
              className={`rounded px-2 py-1 transition-colors ${
                viewMode === 'thumbnail'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
              title="Thumbnail view"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded px-2 py-1 transition-colors ${
                viewMode === 'list'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
              title="List view"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => {
              setShowMetadataForm(false)
              setSelectedFile(null)
              setUploadedFileUrl(null)
              setError(null)
            }}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Upload Media
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
          {success}
        </div>
      )}
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Upload Component */}
      {!showMetadataForm && (
        <MediaUpload
          onFileSelect={handleFileSelect}
          onError={setError}
          uploading={uploading}
        />
      )}

      {/* Type Filter Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`/admin/media?type=${tab.id}`}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                (searchParams.get('type') || 'all') === tab.id
                  ? 'border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50'
                  : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Media Display */}
      {media.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">
            No media found. Upload your first media item to get started.
          </p>
        </div>
      ) : viewMode === 'thumbnail' ? (
        <MediaThumbnailView media={media} onEdit={setEditingMedia} />
      ) : (
        <DataTable
          headers={['Filename', 'Type', 'Alt Text', 'Description', 'Created', 'Actions']}
        >
          {media.map((item: Media) => (
            <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {item.filename}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {item.media_type}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {item.alt_text || '-'}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {item.description || '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <button
                  onClick={() => setEditingMedia(item)}
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  title="Edit"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </DataTable>
      )}

      {/* Metadata Form Modal */}
      {(selectedFile || editingMedia) && (
        <MediaMetadataForm
          isOpen={showMetadataForm || !!editingMedia}
          onClose={() => {
            if (!uploading) {
              setShowMetadataForm(false)
              setSelectedFile(null)
              setUploadedFileUrl(null)
              setEditingMedia(null)
            }
          }}
          onSubmit={editingMedia ? handleUpdateMedia : handleMetadataSubmit}
          filename={editingMedia?.filename || selectedFile?.name || ''}
          fileUrl={editingMedia?.file_url || uploadedFileUrl || undefined}
          uploading={uploading}
          existingMedia={editingMedia}
          mode={editingMedia ? 'edit' : 'create'}
        />
      )}
    </div>
  )
}

