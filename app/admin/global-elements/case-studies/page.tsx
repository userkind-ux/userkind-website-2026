import { getCaseStudies } from '@/lib/supabase/queries/global-elements'
import DataTable from '@/components/admin/DataTable'
import { CaseStudy } from '@/lib/supabase/queries/global-elements'

export const dynamic = 'force-dynamic'

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="space-y-6">
      {caseStudies.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">
            No case studies found. Create your first case study to get started.
          </p>
        </div>
      ) : (
        <DataTable
          headers={['Heading', 'Category', 'Description', 'Created']}
        >
          {caseStudies.map((caseStudy: CaseStudy) => (
            <tr key={caseStudy.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {caseStudy.heading}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {caseStudy.work_category || '-'}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {caseStudy.description || '-'}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(caseStudy.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  )
}

