// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import LogoutButton from "@/features/auth/components/LogoutButton";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const getNavigationLinks = () => {
    const links = [];

    if (session) {
      if (pathname !== "/") {
        links.push({ href: "/", label: "Ana Sayfa", icon: "🏠" });
      }

      if (pathname !== "/dashboard") {
        links.push({ href: "/dashboard", label: "Dashboard", icon: "📊" });
      }

      if (pathname !== "/admin" && session.user.role === "admin") {
        links.push({ href: "/admin", label: "Admin Panel", icon: "⚙️" });
      }
    }

    return links;
  };

  const navigationLinks = getNavigationLinks();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              MyApp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {session.user?.name}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center space-x-2 px-4 py-2 rounded-full text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-100 transform hover:scale-105"
                    >
                      <span className="text-lg ">{link.icon}</span>
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="ml-2">
                  <LogoutButton className="px-6 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-600 text-white font-medium hover:from-red-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" />
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Giriş Yap
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-300"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Ana menüyü aç</span>
              <div className="w-6 h-6 relative flex flex-col justify-center items-center">
                <span
                  className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-3 bg-white/95 backdrop-blur-sm border-t border-gray-100">
          {session ? (
            <>
              <div className="flex items-center space-x-3 px-3 py-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Hoş geldin,
                  </p>
                  <p className="text-sm text-gray-600">{session.user?.name}</p>
                </div>
              </div>

              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 px-4 py-3 rounded-xl transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.label}</span>
                  <svg
                    className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}

              <div className="pt-3 border-t border-gray-100">
                <LogoutButton className="w-full px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 font-medium" />
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
