import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // If Supabase returned an error in the URL, forward it to the UI page
  if (error) {
    const url = new URL(`${origin}/auth/callback`)
    url.searchParams.set('error', errorDescription ?? error)
    return NextResponse.redirect(url)
  }

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      // Code exchanged — redirect to the success UI page
      return NextResponse.redirect(`${origin}/auth/callback`)
    }

    // Exchange failed — forward error to UI page
    const url = new URL(`${origin}/auth/callback`)
    url.searchParams.set('error', exchangeError.message)
    return NextResponse.redirect(url)
  }

  // No code — just redirect to the UI page
  return NextResponse.redirect(`${origin}/auth/callback`)
}
