import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Verify secret token
    const secret = request.headers.get('x-revalidate-secret')
    
    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get body - Supabase sends the full row data
    const body = await request.json()
    
    // Extract slug from Supabase webhook payload
    // Supabase sends: { type: 'INSERT'|'UPDATE'|'DELETE', record: {...}, old_record: {...} }
    // For INSERT/UPDATE: slug is in record
    // For DELETE: slug is in old_record
    let slug: string | undefined
    
    if (body.record?.slug) {
      // INSERT/UPDATE event - slug is in record
      slug = body.record.slug
    } else if (body.old_record?.slug) {
      // DELETE event - slug is in old_record
      slug = body.old_record.slug
    } else if (body.slug) {
      // Direct slug (fallback for custom body format)
      slug = body.slug
    }

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug not found in webhook payload', received: Object.keys(body) },
        { status: 400 }
      )
    }

    // Revalidate specific page
    revalidatePath(`/${slug}`)

    // Optionally revalidate homepage if needed
    // Uncomment if homepage should also refresh when pages change
    // revalidatePath('/')

    return NextResponse.json({
      revalidated: true,
      slug,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

