import { notFound } from 'next/navigation'
import { getPublishedPages, getPageBySlug } from '@/lib/supabase/queries/pages'
import type { Metadata } from 'next'

// ISR: Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400

// Generate static params for all published pages at build time
// Note: This runs at build time, so we can't use cookies-based auth
// Return empty array to let ISR handle pages dynamically
export async function generateStaticParams() {
  // At build time, we don't have access to authenticated Supabase client
  // Pages will be generated on-demand via ISR when first accessed
  // This is fine because ISR will cache them after first request
  return []
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const page = await getPageBySlug(slug, true)
    
    return {
      title: page.meta_title || page.title,
      description: page.meta_description || undefined,
      // TODO: Add Open Graph image when meta_image_id is available
    }
  } catch (error) {
    return {
      title: 'Page Not Found',
    }
  }
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const page = await getPageBySlug(slug, true)

    // If page is draft or doesn't exist, return 404
    if (page.status !== 'published') {
      notFound()
    }

    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900">
        <article className="mx-auto max-w-4xl px-6 py-12">
          <h1 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {page.title}
          </h1>
          
          {page.page_category && (
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Category: {page.page_category}
            </p>
          )}

          {/* TODO: Render page content sections here */}
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400">
              Page content will be rendered here. Content sections will be added when the page content editor is implemented.
            </p>
          </div>

          <footer className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Last updated: {new Date(page.updated_at).toLocaleDateString()}
            </p>
          </footer>
        </article>
      </div>
    )
  } catch (error) {
    // Page not found or error fetching
    notFound()
  }
}

