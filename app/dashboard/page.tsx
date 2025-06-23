// app/dashboard/page.tsx
import Image from "next/image";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
              <Image
                className="dark:invert relative z-10"
                src="/next.svg"
                alt="Next.js logo"
                width={200}
                height={42}
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Next.js Auth0
            </span>
            <br />
            <span className="text-gray-800">Entegrasyonu</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Auth0 OAuth provider ile{" "}
            <span className="font-semibold text-blue-600">
              güvenli kimlik doğrulama sistemi
            </span>{" "}
            ve modern web uygulaması deneyimi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Hızlı Başlangıç
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg">
              Dokümantasyon
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="group">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                🔒 Güvenli Auth
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Auth0 ile OAuth 2.0 tabanlı kimlik doğrulama sistemi. Endüstri
                standardı güvenlik protokolleri.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                🛡️ JWT Token
              </h3>
              <p className="text-gray-600 leading-relaxed">
                JWT tabanlı oturum yönetimi ve middleware koruması. Güvenli
                token doğrulama sistemi.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                ⚡ Next.js 15
              </h3>
              <p className="text-gray-600 leading-relaxed">
                App Router ile modern React server components. Yüksek performans
                ve SEO optimizasyonu.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                🎨 TailwindCSS
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Modern ve responsive kullanıcı arayüzü tasarımı. Utility-first
                CSS framework.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Kolay Entegrasyon
            </h3>
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <code className="text-green-400 text-sm">
                <div className="text-blue-400">import</div>
                <div className="text-yellow-400 ml-2">
                  {"{ getServerSession }"}
                </div>
                <div className="text-blue-400 ml-2">from</div>
                <div className="text-green-300 ml-2">next-auth/next</div>
                <br />
                <br />
                <div className="text-blue-400">const</div>
                <div className="text-yellow-400 ml-2">session</div>
                <div className="text-white ml-2">=</div>
                <div className="text-blue-400 ml-2">await</div>
                <div className="text-yellow-400 ml-2">getServerSession</div>
                <div className="text-white ml-2">(authOptions)</div>
              </code>
            </div>
            <p className="text-gray-600">
              Sadece birkaç satır kod ile güvenli kimlik doğrulama sisteminizi
              kurup çalıştırabilirsiniz.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Proje İstatistikleri
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Güvenlik Skoru</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-11/12"></div>
                  </div>
                  <span className="text-sm font-bold text-green-600">95%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Performans</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-10/12"></div>
                  </div>
                  <span className="text-sm font-bold text-blue-600">90%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Uptime</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-full"></div>
                  </div>
                  <span className="text-sm font-bold text-purple-600">
                    99.9%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projeni Geliştirmeye Hazır mısın?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Modern web teknolojileri ile güvenli ve ölçeklenebilir uygulamalar
            geliştir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Hemen Başla
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
              GitHub&apos;da Görüntüle
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
