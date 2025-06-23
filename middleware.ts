import { getToken, type JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logApiCall, logSecurityEvent, logError } from "@/utils/logger";

// Configuration constants
const CONFIG = {
  SECRET: process.env.NEXTAUTH_SECRET!,
  RATE_LIMIT: {
    WINDOW_SIZE_MS: 60 * 1000,
    MAX_REQUESTS: 60,
    CLEANUP_INTERVAL: 1 * 60 * 1000,
    ENTRY_TTL: 5 * 60 * 1000, 
    MAX_STORE_SIZE: 10000,
  },
  PUBLIC_PATHS: ["/", "/login", "/unauthorized"],
  COOKIE_NAMES: [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.csrf-token",
    "__Host-next-auth.csrf-token",
    "next-auth.callback-url",
    "__Secure-next-auth.callback-url",
  ],
} ;

class RateLimitStore {
  private store = new Map<string, { count: number; firstRequestTime: number }>();
  private lastCleanup = Date.now();

  private cleanup() {
    const now = Date.now();
    
    for (const [ip, entry] of this.store.entries()) {
      if (now - entry.firstRequestTime > CONFIG.RATE_LIMIT.ENTRY_TTL) {
        this.store.delete(ip);
      }
    }

    if (this.store.size > CONFIG.RATE_LIMIT.MAX_STORE_SIZE) {
      const keysIterator = this.store.keys();
      for (let i = 0; i < 100; i++) {
        const key = keysIterator.next().value;
        if (!key) break;
        this.store.delete(key);
      }
    }
  }

  checkRateLimit(ip: string): boolean {
    const now = Date.now();

    if (now - this.lastCleanup > CONFIG.RATE_LIMIT.CLEANUP_INTERVAL) {
      this.cleanup();
      this.lastCleanup = now;
    } else if (Math.random() < 0.1) {
      this.cleanup();
    }

    let entry = this.store.get(ip);

    if (!entry) {
      entry = { count: 1, firstRequestTime: now };
      this.store.set(ip, entry);
      return true;
    }

    if (now - entry.firstRequestTime > CONFIG.RATE_LIMIT.WINDOW_SIZE_MS) {
      entry = { count: 1, firstRequestTime: now };
    } else {
      entry.count++;
    }
    
    this.store.set(ip, entry);
    return entry.count <= CONFIG.RATE_LIMIT.MAX_REQUESTS;
  }
}

class AuthenticationService {
  static async validateToken(request: NextRequest): Promise<JWT | null> {
    try {
      const token = await getToken({ req: request, secret: CONFIG.SECRET });
      
      if (!token) return null;

      const ts = Math.floor(Date.now() / 1000);
      if (token.exp && ts >= token.exp) return null;

      return token;
    } catch (error) {
      logError(error, "token_validation");
      return null;
    }
  }

  static isPublicPath(pathname: string): boolean {
    return CONFIG.PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/api/auth/");
  }

  static hasAdminAccess(token: JWT, pathname: string): boolean {
    if (!pathname.startsWith("/admin")) return true;
    return token.role === "admin";
  }
}

class CookieService {
  static clearSessionCookies(request: NextRequest, response: NextResponse): NextResponse {
    const sessionCookies = request.cookies
      .getAll()
      .filter((c) => c.name.includes("next-auth"));

    const allCookiesToClear = [
      ...sessionCookies.map((c) => c.name),
      ...CONFIG.COOKIE_NAMES,
    ];
    const uniqueCookies = [...new Set(allCookiesToClear)];

    uniqueCookies.forEach((name) => {
      response.cookies.delete(name);

      const cookieOptions = [
        { path: "/", domain: undefined },
        { path: "/", domain: request.nextUrl.hostname },
        { path: "/", domain: `.${request.nextUrl.hostname}` },
      ];

      cookieOptions.forEach((options) => {
        response.cookies.set(name, "", {
          ...options,
          expires: new Date(0),
          maxAge: 0,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      });
    });

    return response;
  }
}

export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const pathname = request.nextUrl.pathname;

  const rateLimitStore = new RateLimitStore();
  if (!rateLimitStore.checkRateLimit(ip)) {
    logSecurityEvent("rate_limit_exceeded", {
      ip,
      path: pathname,
      method: request.method,
    });
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  if (AuthenticationService.isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = await AuthenticationService.validateToken(request);
  
  if (!token) {
    logSecurityEvent("unauthorized_access", {
      ip,
      path: pathname,
      method: request.method,
    });
    return redirectToLogin(request, pathname);
  }

  if (!AuthenticationService.hasAdminAccess(token, pathname)) {
    logSecurityEvent("admin_access_denied", {
      ip,
      path: pathname,
      method: request.method,
      userId: token.sub,
    });
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const response = NextResponse.next();

  if (pathname.startsWith("/api")) {
    const duration = Date.now() - startTime;
    logApiCall({
      method: request.method,
      path: pathname,
      status: response.status,
      duration,
      userId: token.sub,
    });
  }

  return response;
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", pathname);

  const response = NextResponse.redirect(loginUrl);
  return CookieService.clearSessionCookies(request, response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};