import { getForms } from '@/lib/supabase/queries/global-elements'
import DataTable from '@/components/admin/DataTable'
import { Form } from '@/lib/supabase/queries/global-elements'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function FormsPage() {
  const forms = await getForms()

  return (
    <div className="space-y-6">
      {forms.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">
            No forms found. Create your first form to get started.
          </p>
        </div>
      ) : (
        <DataTable
          headers={['Name', 'Email To', 'Fields', 'Created']}
        >
          {forms.map((form: Form) => (
            <tr key={form.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {form.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {form.email_to}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {Array.isArray(form.form_fields) ? form.form_fields.length : 0} fields
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(form.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  )
}

