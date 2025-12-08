'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Homepage } from './components/Homepage'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      if (hash.includes('type=recovery') || hash.includes('recovery')) {
        window.location.href = '/reset-password' + hash
        return
      }
      if (hash.includes('access_token')) {
        window.location.href = '/auth/callback' + hash
        return
      }
    }
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('type') && searchParams.get('type') === 'recovery') {
      window.location.href =
        '/reset-password' + window.location.search + window.location.hash
      return
    }
  }, [router])

  return <Homepage />
}
