import { getMedia } from '@/lib/supabase/queries/media'
import MediaGalleryClient from '@/components/admin/MediaGalleryClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const mediaType = params.type && params.type !== 'all' ? params.type : undefined
  const media = await getMedia(mediaType)

  return <MediaGalleryClient initialMedia={media} />
}

