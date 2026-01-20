import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extends the built-in session.user object
   */
  interface Session {
    accessToken?: string; // Fixes: Property 'accessToken' does not exist on type 'Session'
    user: {
      role?: string;    // Fixes: Property 'role' does not exist on type 'User'
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}