import { getPages } from '@/lib/supabase/queries/pages'
import DataTable from '@/components/admin/DataTable'
import { Page } from '@/lib/supabase/queries/pages'

export const dynamic = 'force-dynamic'

export default async function PagesPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const category = searchParams.category || 'all'
  const pages = await getPages(category === 'all' ? undefined : category)

  const getStatusBadge = (status: string) => {
    return status === 'published' ? (
      <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
        Published
      </span>
    ) : (
      <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
        Draft
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Pages
        </h1>
      </div>

      {/* Category Filter Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { id: 'all', name: 'All' },
            { id: 'Content', name: 'Content' },
            { id: 'Case Study', name: 'Case Study' },
            { id: 'Blog Post', name: 'Blog Post' },
          ].map((tab) => (
            <a
              key={tab.id}
              href={`/admin/pages?category=${tab.id}`}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                category === tab.id
                  ? 'border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50'
                  : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Pages Table */}
      {pages.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">
            No pages found. Create your first page to get started.
          </p>
        </div>
      ) : (
        <DataTable
          headers={['Title', 'Slug', 'Category', 'Status', 'Created']}
        >
          {pages.map((page: Page) => (
            <tr key={page.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {page.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                /{page.slug}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {page.page_category || '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {getStatusBadge(page.status)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(page.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  )
}

