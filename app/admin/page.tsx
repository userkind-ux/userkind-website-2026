import { redirect } from 'next/navigation'

// Force dynamic rendering to ensure redirect works properly
export const dynamic = 'force-dynamic'

export default function AdminPage() {
  redirect('/admin/pages')
}

