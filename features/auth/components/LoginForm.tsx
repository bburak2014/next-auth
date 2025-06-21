"use client";

import { useLogin } from "@/features/auth/hooks/useLogin"

export default function LoginForm() {
  const { login } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">Giriş Yap</h1>
        <button
          onClick={() => login()}
          className="w-full py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Auth0 ile Giriş Yap
        </button>
      </div>
    </div>
  );
}