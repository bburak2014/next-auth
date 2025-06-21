// features/auth/hooks/useLogout.ts
"use client"

import { signOut } from "next-auth/react"

export function useLogout() {
  const logout = async () => {
    // 1. NextAuth session'ını temizle
    await signOut({ redirect: false })
    
    // 2. Auth0'dan da çıkış yap
    const auth0LogoutUrl = new URL(`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/v2/logout`)
    auth0LogoutUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!)
    auth0LogoutUrl.searchParams.set("returnTo", window.location.origin)
    
    // 3. Auth0 logout sayfasına yönlendir
    window.location.href = auth0LogoutUrl.toString()
  }

  return { logout }
}