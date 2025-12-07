'use client'

import { useState, useEffect } from 'react'
import type { Media } from '@/lib/supabase/queries/media'

interface MediaMetadataFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    alt_text: string
    description: string | null
    media_type: 'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo'
  }) => void
  filename: string
  fileUrl?: string
  uploading?: boolean
  existingMedia?: Media | null
  mode?: 'create' | 'edit'
}

export default function MediaMetadataForm({
  isOpen,
  onClose,
  onSubmit,
  filename,
  fileUrl,
  uploading = false,
  existingMedia = null,
  mode = 'create',
}: MediaMetadataFormProps) {
  const [altText, setAltText] = useState('')
  const [description, setDescription] = useState('')
  const [mediaType, setMediaType] = useState<'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo'>('Image')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when modal opens/closes or existingMedia changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && existingMedia) {
        setAltText(existingMedia.alt_text || '')
        setDescription(existingMedia.description || '')
        setMediaType(existingMedia.media_type)
      } else {
        setAltText('')
        setDescription('')
        setMediaType('Image')
      }
      setErrors({})
    }
  }, [isOpen, existingMedia, mode])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!altText.trim()) {
      newErrors.altText = 'Alt text is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    onSubmit({
      alt_text: altText.trim(),
      description: description.trim() || null,
      media_type: mediaType,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {mode === 'edit' ? 'Edit Media Details' : 'Add Media Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {fileUrl && (
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Preview:</p>
            <div className="flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800">
              {fileUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                <img
                  src={fileUrl}
                  alt={filename}
                  className="max-h-48 max-w-full object-contain"
                />
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{filename}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="filename" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Filename
            </label>
            <input
              type="text"
              id="filename"
              value={filename}
              disabled
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              This is the semantic filename used for SEO and screen readers
            </p>
          </div>

          <div>
            <label htmlFor="mediaType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Media Type <span className="text-red-500">*</span>
            </label>
            <select
              id="mediaType"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as 'Icon' | 'Image' | 'Hero' | 'Video' | 'Logo')}
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
              required
            >
              <option value="Icon">Icon</option>
              <option value="Image">Image</option>
              <option value="Hero">Hero</option>
              <option value="Video">Video</option>
              <option value="Logo">Logo</option>
            </select>
          </div>

          <div>
            <label htmlFor="altText" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Alt Text <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="altText"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 ${
                errors.altText
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50'
              }`}
              placeholder="Describe the image for screen readers"
              required
            />
            {errors.altText && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.altText}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
              placeholder="Optional description of the media"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              {uploading ? (mode === 'edit' ? 'Updating...' : 'Uploading...') : (mode === 'edit' ? 'Update Media' : 'Save Media')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

