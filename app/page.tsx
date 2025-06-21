// app/page.tsx (Ana sayfa)
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/features/auth/authOptions"
import Link from "next/link"
import Image from "next/image"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">MyApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <span className="text-sm text-gray-700">
                    Hoş geldin, {session.user?.name}
                  </span>
                  <Link
                    href="/dashboard"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-[calc(100vh-64px)] p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-1 items-center">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Next.js Auth0 Entegrasyonu
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Auth0 OAuth provider ile güvenli kimlik doğrulama sistemi
            </p>
            
            {!session && (
              <div className="mb-8">
                <Link
                  href="/login"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Hemen Başla
                </Link>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">🔒 Güvenli Auth</h3>
              <p className="text-gray-600">
                Auth0 ile OAuth 2.0 tabanlı kimlik doğrulama
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">🛡️ JWT Token</h3>
              <p className="text-gray-600">
                JWT tabanlı oturum yönetimi ve middleware koruması
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">⚡ Next.js 15</h3>
              <p className="text-gray-600">
                App Router ile modern React server components
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-2">🎨 TailwindCSS</h3>
              <p className="text-gray-600">
                Kullanıcı arayüzü ve dizayn ortamı
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}