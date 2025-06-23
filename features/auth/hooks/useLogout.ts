// features/auth/hooks/useLogout.ts
"use client"

import { signOut } from "next-auth/react"

export function useLogout() {
  const logout = async () => {
    await signOut({ redirect: false })
    
    const auth0LogoutUrl = new URL(`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/v2/logout`)
    auth0LogoutUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!)
    auth0LogoutUrl.searchParams.set("returnTo", window.location.origin)
    
    window.location.href = auth0LogoutUrl.toString()
  }

  return { logout }
}