import { NextAuthOptions, DefaultSession } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { jwtDecode } from "jwt-decode";
import { logAuthEvent, logError } from "@/utils/logger";

interface DecodedIdToken {
  sub?: string;
  "https://myapp.com/roles"?: string[];
}

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id?: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    sub?: string;
    iat?: number;
    exp?: number;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          scope: "openid profile email",
          code_challenge_method: "S256",
        },
      },
      profile(profile, tokens) {
        try {
          const decoded = jwtDecode<DecodedIdToken>(tokens.id_token!);
          const roles = decoded["https://myapp.com/roles"] ?? [];
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            role: roles[0] ?? "user",
          };
        } catch (error) {
          logError(error, "Auth0 profile parsing");
          throw error;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },

  cookies: {
    sessionToken: {
      name:
        (process.env.NODE_ENV === "production"  && process.env.NEXTAUTH_URL?.startsWith('https://'))
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      secure: process.env.NODE_ENV === "production" && process.env.NEXTAUTH_URL?.startsWith('https://'),
      },
    },
  },

  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },

  events: {
    async signIn({ user, account }) {
      logAuthEvent("sign_in", user.id, {
        role: user.role,
        provider: account?.provider
      });
    },
    async signOut({ session }) {
      logAuthEvent("sign_out", session?.user?.id);
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};