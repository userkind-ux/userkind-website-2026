import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function GlobalElementsPage() {
  redirect('/admin/global-elements/header')
}

