import { getHeader } from '@/lib/supabase/queries/global-elements'

export default async function HeaderPage() {
  const header = await getHeader()

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        {header ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Logo ID
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {header.logo_id || 'Not set'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Main Menu
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {header.main_menu.length > 0
                  ? `${header.main_menu.length} items`
                  : 'No menu items'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                CTA
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {header.cta_label || 'Not set'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Last Updated
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {new Date(header.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">
            No header configuration found. Create one to get started.
          </p>
        )}
      </div>
    </div>
  )
}

