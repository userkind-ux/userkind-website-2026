import { getFooter } from '@/lib/supabase/queries/global-elements'

export default async function FooterPage() {
  const footer = await getFooter()

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        {footer ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Logo ID
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {footer.logo_id || 'Not set'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Column One Content
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {footer.column_one_content || 'Not set'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Column Two Content
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {footer.column_two_content || 'Not set'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Last Updated
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {new Date(footer.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">
            No footer configuration found. Create one to get started.
          </p>
        )}
      </div>
    </div>
  )
}

