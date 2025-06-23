// app/unauthorized/page.tsx
import Link from "next/link"

export const metadata = {
  title: "Yetkisiz Erişim | MyApp"
}

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200 rounded-full blur-xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-200 rounded-full blur-xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200 rounded-full blur-xl opacity-30"></div>
      </div>

      <div className="relative max-w-lg w-full">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Yetkisiz Erişim
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Bu sayfaya erişim yetkiniz bulunmamaktadır. Lütfen gerekli izinleri aldığınızdan emin olun.
          </p>

          <div className="space-y-4 mb-8">
            <Link
              href="/dashboard"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard&apos;a Dön</span>
              </div>
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-white text-gray-700 px-6 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Ana Sayfa</span>
              </div>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Yardıma mı ihtiyacınız var?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Erişim yetkisi almak için sistem yöneticisiyle iletişime geçebilirsiniz.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Destek Ekibi
              </button>
              <span className="text-gray-300">•</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Yetki Talep Et
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span>Erişim Engellendi</span>
          </div>
        </div>
      </div>
    </div>
  )
}