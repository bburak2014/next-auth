// features/auth/components/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton({className}: {className?: string}) {
  const handleLogout = async () => {
    // 1. NextAuth session'ını temizle
    await signOut({ redirect: false });
    
    // 2. Auth0'dan da çıkış yap
    const auth0LogoutUrl = new URL(`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/v2/logout`);
    auth0LogoutUrl.searchParams.set("client_id", process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!);
    auth0LogoutUrl.searchParams.set("returnTo", window.location.origin);
    
    // 3. Auth0 logout sayfasına yönlendir
    window.location.href = auth0LogoutUrl.toString();
  };

  return (
    <button
      onClick={handleLogout}
      className={"px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 hover:text-white cursor-pointer "  + " " + className}
    >
      Çıkış Yap
    </button>
  );
}