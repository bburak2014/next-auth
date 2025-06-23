// features/auth/hooks/useLogin.ts
"use client"

import { signIn } from "next-auth/react"

export function useLogin() {
  const login = () => {
    signIn("auth0", { callbackUrl: "/dashboard" })
  }
  return { login }
}