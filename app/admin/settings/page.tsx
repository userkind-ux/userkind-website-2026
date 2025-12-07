import { getSiteSettings } from '@/lib/supabase/queries/settings'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        {settings ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                SEO Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Site SEO Title
                  </h3>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                    {settings.site_seo_title || 'Not set'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Site SEO Description
                  </h3>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                    {settings.site_seo_description || 'Not set'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Favicon ID
                  </h3>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                    {settings.favicon_id || 'Not set'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Robots No Follow
                  </h3>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                    {settings.robots_no_follow ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Integration Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Google Tag Manager ID
                  </h3>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                    {settings.google_tag_manager_id || 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Social Media Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Social Links
                  </h3>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                    {Array.isArray(settings.social_links) && settings.social_links.length > 0
                      ? `${settings.social_links.length} social links configured`
                      : 'No social links configured'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Social Meta Title
                  </h3>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                    {settings.social_meta_title || 'Not set'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Social Meta Description
                  </h3>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                    {settings.social_meta_description || 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Last Updated
              </h3>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-50">
                {new Date(settings.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">
            No site settings found. Create settings to get started.
          </p>
        )}
      </div>
    </div>
  )
}

