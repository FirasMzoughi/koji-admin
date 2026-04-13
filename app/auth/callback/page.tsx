'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Status = 'loading' | 'success' | 'error'

function CallbackContent() {
  const [status, setStatus] = useState<Status>('loading')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    // If the route handler forwarded an error via query param, show it immediately
    const urlError = searchParams.get('error')
    if (urlError) {
      setErrorMsg(urlError)
      setStatus('error')
      return
    }

    // The route.ts handler has already exchanged the code for a session server-side.
    // We just need to verify the session exists on the client.
    const supabase = createClient()

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setErrorMsg(error.message)
        setStatus('error')
        return
      }

      if (data.session) {
        setStatus('success')
        return
      }

      // Fallback: wait for auth state change (covers edge cases)
      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
          setStatus('success')
          listener.subscription.unsubscribe()
        }
      })

      const timeout = setTimeout(() => {
        setErrorMsg('Confirmation link may have expired. Please request a new one.')
        setStatus('error')
        listener.subscription.unsubscribe()
      }, 5000)

      return () => {
        clearTimeout(timeout)
        listener.subscription.unsubscribe()
      }
    }

    checkSession()
  }, [searchParams])

  const openApp = () => {
    window.location.href = 'koji://login-callback'
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center space-y-4">
          <div className="h-14 w-14 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-600/25 animate-pulse">
            <span className="text-white font-bold text-2xl">K</span>
          </div>
          <p className="text-gray-500 text-sm">Verifying your account…</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center space-y-6">
          <div className="h-14 w-14 bg-red-100 rounded-2xl mx-auto flex items-center justify-center">
            <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-gray-900">Verification Failed</h1>
            <p className="text-sm text-gray-500">{errorMsg}</p>
          </div>
          <a
            href="/auth/signup"
            className="inline-block w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 text-sm"
          >
            Back to Sign Up
          </a>
        </div>
      </div>
    )
  }

  // success
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center space-y-6">
        {/* Logo */}
        <div className="h-14 w-14 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-600/25">
          <span className="text-white font-bold text-2xl">K</span>
        </div>

        {/* Check icon */}
        <div className="h-16 w-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Account Verified!</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your email has been confirmed.<br />
            You can now return to the Koji app and sign in.
          </p>
        </div>

        {/* Open app button */}
        <button
          onClick={openApp}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Open Koji App
        </button>

        <p className="text-xs text-gray-400">
          If the app doesn&apos;t open,{' '}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            sign in here
          </a>{' '}
          instead.
        </p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
          <div className="h-14 w-14 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-600/25 animate-pulse">
            <span className="text-white font-bold text-2xl">K</span>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}
