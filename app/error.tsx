// app/error.tsx
'use client';

import { useEffect } from "react";

interface ErrorProps {
  error?: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Animated Error Icon */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
              <svg
                className="w-12 h-12 text-white"
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

        {/* Error Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Oops! Bir Hata Oluştu
            </span>
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Beklenmeyen bir sorun yaşandı. Lütfen tekrar deneyin veya destek ekibiyle iletişime geçin.
          </p>

          {/* Error Details */}
          {error?.message && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-sm font-medium text-red-800 mb-1">Hata Detayı:</p>
                  <p className="text-sm text-red-700 break-words">{error.message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => reset()}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              Tekrar Dene
            </button>
            
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              Ana Sayfaya Dön
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">
              Sorun devam ediyorsa:
            </p>
            <div className="flex justify-center space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Destek Ekibi
              </button>
              <span className="text-gray-300">•</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Yardım Merkezi
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Hata Kodu: ERR_{Date.now().toString().slice(-6)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}