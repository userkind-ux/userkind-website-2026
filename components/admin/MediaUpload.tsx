'use client'

import { useState, useRef, DragEvent } from 'react'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'application/pdf', 'image/webp']
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'pdf', 'webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

interface MediaUploadProps {
  onFileSelect: (file: File) => void
  onError: (error: string) => void
  uploading?: boolean
}

export default function MediaUpload({ onFileSelect, onError, uploading = false }: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return `File type not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`
    }

    // Check MIME type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File type not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`
    }

    return null
  }

  const handleFile = (file: File) => {
    const error = validateFile(file)
    if (error) {
      onError(error)
      return
    }

    onFileSelect(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div
      className={`relative rounded-lg border-2 border-dashed p-8 transition-colors ${
        isDragging
          ? 'border-zinc-400 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800'
          : 'border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900'
      } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_EXTENSIONS.map(ext => `.${ext}`).join(',')}
        onChange={handleFileInput}
        className="hidden"
        disabled={uploading}
      />

      <div className="text-center">
        {uploading ? (
          <>
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-50"></div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Uploading...</p>
          </>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-zinc-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Select File
              </button>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              or drag and drop
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              {ALLOWED_EXTENSIONS.map(ext => ext.toUpperCase()).join(', ')} up to 10MB
            </p>
          </>
        )}
      </div>
    </div>
  )
}

