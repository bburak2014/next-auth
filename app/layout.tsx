// app/layout.tsx
import "./globals.css"
import { ReactNode } from "react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/features/auth/authOptions"
import { Providers } from "./provider"
import Navbar from "@/features/home/components/Navbar"
import Footer from "@/features/home/components/Footer"

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="tr">
      <head>
        <title>My Next.js App</title>
      </head>
      <body>
        <Providers session={session}>
          <Navbar session={session} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}