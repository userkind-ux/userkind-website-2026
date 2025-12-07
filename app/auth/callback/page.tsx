'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing...')

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Check for hash fragment (access_token, etc.)
      const hash = window.location.hash
      if (hash) {
        const params = new URLSearchParams(hash.substring(1))
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')
        const error = params.get('error')
        const errorDescription = params.get('error_description')

        if (error) {
          setStatus('error')
          setMessage(errorDescription || error)
          return
        }

        if (accessToken && refreshToken) {
          // Exchange the tokens for a session
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (sessionError) {
            setStatus('error')
            setMessage(sessionError.message)
            return
          }

          if (data.session) {
            setStatus('success')
            setMessage('Authentication successful! Redirecting...')
            // Clear the hash from URL
            window.history.replaceState({}, '', '/auth/callback')
            // Redirect to admin
            setTimeout(() => {
              router.push('/admin')
            }, 1000)
          }
        }
      } else {
        // Check for query parameters (alternative format)
        const code = searchParams.get('code')
        if (code) {
          // Handle code exchange
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            setStatus('error')
            setMessage(error.message)
          } else if (data.session) {
            setStatus('success')
            setMessage('Authentication successful! Redirecting...')
            setTimeout(() => {
              router.push('/admin')
            }, 1000)
          }
        } else {
          setStatus('error')
          setMessage('No authentication parameters found')
        }
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
          {status === 'loading' && 'Processing...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Error'}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">{message}</p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">Processing...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}

