import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    provider: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: string;
    expires: string;
    user: {
      id: string;
      name: string;
      email: string | undefined;
      image: string | undefined;
    };
  }
}
