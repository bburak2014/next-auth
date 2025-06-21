// app/layout.tsx
import "./globals.css"
import { ReactNode } from "react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/features/auth/authOptions"
import { Providers } from "./provider"

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Sunucu tarafında oturum bilgisini al
  const session = await getServerSession(authOptions)

  return (
    <html lang="tr">
      <head>
        <title>My Next.js App</title>
      </head>
      <body>
        {/* Oturum bilgisini Providers'a ilet */}
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}