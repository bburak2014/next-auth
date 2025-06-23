// features/auth/components/LoginForm.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("auth0", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hoş Geldin!
            </h1>
            <p className="text-gray-600 text-lg">
              Hesabına giriş yap ve keşfetmeye başla
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="cursor-pointer group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              <div className="relative flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Giriş yapılıyor...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Auth0 ile Giriş Yap</span>
                  </>
                )}
              </div>
            </button>

         

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>Güvenli OAuth 2.0 kimlik doğrulama</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>Kişisel verileriniz korunur</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex-shrink-0 w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>Anında erişim, hızlı kurulum</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Hesabın yok mu?
              <button
                onClick={() => {}}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Hemen kayıt ol
              </button>
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Giriş yaparak
              <Link href="#" className="text-blue-600 hover:underline">
                Kullanım Şartları
              </Link>{" "}
              ve{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Gizlilik Politikası
              </Link>
              &apos;nı kabul etmiş olursunuz.
            </p>
          </div>
        </div>
 
      </div>
    </div>
  );
}
