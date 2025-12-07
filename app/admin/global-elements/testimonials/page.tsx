import { getTestimonials } from '@/lib/supabase/queries/global-elements'
import DataTable from '@/components/admin/DataTable'
import { Testimonial } from '@/lib/supabase/queries/global-elements'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="space-y-6">
      {testimonials.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">
            No testimonials found. Create your first testimonial to get started.
          </p>
        </div>
      ) : (
        <DataTable
          headers={['Name', 'Company', 'Content', 'Created']}
        >
          {testimonials.map((testimonial: Testimonial) => (
            <tr key={testimonial.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {testimonial.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {testimonial.company || '-'}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {testimonial.content.substring(0, 100)}
                {testimonial.content.length > 100 ? '...' : ''}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(testimonial.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  )
}

