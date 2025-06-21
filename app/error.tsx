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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-50 text-red-700">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-6">{error?.message ?? "An unknown error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}