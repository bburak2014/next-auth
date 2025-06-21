// app/login/page.tsx
import LoginForm from "@/features/auth/components/LoginForm"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/features/auth/authOptions"
import { redirect } from "next/navigation"

export const metadata = { 
  title: "Giriş | MyApp",
  description: "Auth0 ile güvenli giriş yapın"
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect("/dashboard")
  }

  return <LoginForm />
}