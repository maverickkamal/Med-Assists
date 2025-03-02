import { createClient } from '@supabase/supabase-js'
import { AuthResponse, AuthUser } from '@/types/auth'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Auth functions
export async function signUpWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AuthResponse> {
  try {
    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${window.location.origin}/chat`,
      },
    })

    if (signUpError) {
      return {
        data: null,
        error: { message: signUpError.message }
      }
    }

    // Send verification email
    const { error: verificationError } = await supabase.auth.resend({
      type: 'signup',
      email,
    })

    if (verificationError) {
      return {
        data: null,
        error: { message: verificationError.message }
      }
    }

    return {
      data: {
        id: userData.user?.id || '',
        email: userData.user?.email || '',
        firstName,
        lastName
      },
      error: null
    }
  } catch (err) {
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : 'An unknown error occurred'
      }
    }
  }
}

export async function signUpWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResponse> {
  try {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return { data: null, error: { message: signInError.message } }
    }

    // The signInData object has user/session, so we fetch the user again if needed,
    // or map directly if signInData.user is available:
    if (!signInData.user) {
      return { data: null, error: null }
    }

    const mappedUser: AuthUser = {
      id: signInData.user.id,
      email: signInData.user.email ?? "",
      firstName: signInData.user.user_metadata?.first_name,
      lastName: signInData.user.user_metadata?.last_name,
    }

    return { data: mappedUser, error: null }
  } catch (err) {
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "An unknown error occurred",
      },
    }
  }
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const { data: oauthData, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })

    if (oauthError) {
      return { data: null, error: { message: oauthError.message } }
    }

    // Fetch the user data after sign-in
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) {
      return { data: null, error: { message: userError.message } }
    }

    if (!userData.user) {
      // If the user object is still null, just return null data with no error
      return { data: null, error: null }
    }

    // Transform Supabase's user into our AuthUser type
    const mappedUser: AuthUser = {
      id: userData.user.id,
      email: userData.user.email ?? "",
      firstName: userData.user.user_metadata?.first_name,
      lastName: userData.user.user_metadata?.last_name,
    }

    return { data: mappedUser, error: null }
  } catch (err) {
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "An unknown error occurred",
      },
    }
  }
}