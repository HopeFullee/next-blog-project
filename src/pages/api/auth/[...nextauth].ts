import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

async function refreshAccessToken(provider: string, token: any) {
  console.log("프로바이더임:" + provider);

  try {
    //1. access token 재발급해달라고 POST요청
    const url = "https://github.com/login/oauth/access_token";
    const params = {
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
      client_id: "Iv1.26c8bc07ba4c65bd",
      client_secret: "d7e2b8f39d117b7f86174c075a6dbf8d66a748d3",
    };

    // 헤더 Accept를 json으로 안받으면 deafult가 URL이라 더럽게 URLSearchParams로 풀어서 return 해야함.
    const headers = {
      Accept: "application/json",
    };

    const res = await axios.post(url, null, {
      headers: headers,
      params: params,
    });
    const refreshedTokens = await res.data;

    if (res.status !== 200) {
      throw refreshedTokens;
    }

    //2. 이걸로 새로운 토큰 만들어서 return 해주기
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires:
        Math.round(Date.now() / 1000) + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token,
    };
  } catch (err) {
    return {
      token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: "Iv1.26c8bc07ba4c65bd",
      clientSecret: "d7e2b8f39d117b7f86174c075a6dbf8d66a748d3",
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        try {
          const res = await axios.post("/api/auth/login", {
            credEmail: credentials?.email,
            credPassword: credentials?.password,
          });

          const user = await res.data;

          if (user) return user as any;
          else throw user;
        } catch (error: any) {
          throw new Error(JSON.stringify(error.response.data));
        }
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 10, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    async jwt({ token, account, user }: any) {
      if (account && user) {
        return {
          acessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          provider: account.provider,
          user,
        };
      }

      const currTime = Math.round(Date.now() / 1000);
      const shouldRefreshTime = (token.accessTokenExpires as number) - currTime;

      if (shouldRefreshTime < 60 * 60 * 8 - 10) {
        return refreshAccessToken(token.provider, token);
      }
      // 토큰이 만료되지 않았을때는 원래사용하던 토큰을 반환
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    async session({ session, token }: any) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.provider = token.provider;
      session.error = token.error;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
