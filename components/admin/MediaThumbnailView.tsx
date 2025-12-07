import type { Media } from '@/lib/supabase/queries/media'
import Image from 'next/image'

interface MediaThumbnailViewProps {
  media: Media[]
  onEdit?: (item: Media) => void
}

export default function MediaThumbnailView({ media, onEdit }: MediaThumbnailViewProps) {
  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
  }

  const isPDF = (url: string) => {
    return /\.pdf$/i.test(url)
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {media.map((item: Media) => (
        <div
          key={item.id}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
        >
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="absolute right-2 top-2 z-10 rounded bg-black/50 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
              title="Edit"
            >
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800">
            {isImage(item.file_url) ? (
              <Image
                src={item.file_url}
                alt={item.alt_text || item.filename}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              />
            ) : isPDF(item.file_url) ? (
              <div className="flex h-full items-center justify-center">
                <svg
                  className="h-12 w-12 text-zinc-400"
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
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <svg
                  className="h-12 w-12 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="p-2">
            <p className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-50">
              {item.filename}
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {item.media_type}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

