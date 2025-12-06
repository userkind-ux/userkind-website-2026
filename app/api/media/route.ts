import { getMedia } from '@/lib/supabase/queries/media'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const mediaType = type && type !== 'all' ? type : undefined
    const media = await getMedia(mediaType)

    return NextResponse.json({ media })
  } catch (error) {
    console.error('Failed to fetch media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}

