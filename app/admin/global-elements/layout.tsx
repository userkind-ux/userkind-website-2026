'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function GlobalElementsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const tabs = [
    { id: 'header', name: 'Header', href: '/admin/global-elements/header' },
    { id: 'footer', name: 'Footer', href: '/admin/global-elements/footer' },
    { id: 'case-studies', name: 'Case Studies', href: '/admin/global-elements/case-studies' },
    { id: 'testimonials', name: 'Testimonials', href: '/admin/global-elements/testimonials' },
    { id: 'forms', name: 'Forms', href: '/admin/global-elements/forms' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Global Elements
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50'
                    : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300'
                }`}
              >
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {children}
    </div>
  )
}

