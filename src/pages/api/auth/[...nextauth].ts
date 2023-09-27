import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

async function refreshAccessToken(provider: string, token: any) {
  console.log("프로바이더 누구냐: " + provider);

  const _PROVIDER = {
    APP_URL: "",
    APP_ID: "",
    APP_SECRET: "",
  };

  if (provider === "github") {
    _PROVIDER.APP_URL = "https://github.com/login/oauth/access_token";
    _PROVIDER.APP_ID = process.env.GITHUB_APP_ID as string;
    _PROVIDER.APP_SECRET = process.env.GITHUB_APP_SECRET as string;
  } else if (provider === "google") {
    _PROVIDER.APP_URL = "https://oauth2.googleapis.com/token";
    _PROVIDER.APP_ID = process.env.GOOGLE_APP_ID as string;
    _PROVIDER.APP_SECRET = process.env.GOOGLE_APP_SECRET as string;
  }

  try {
    //1. access token 재발급해달라고 POST요청
    const url = _PROVIDER.APP_URL;
    const params = {
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
      client_id: _PROVIDER.APP_ID,
      client_secret: _PROVIDER.APP_SECRET,
    };

    // 헤더 Accept를 json으로 안받으면 deafult가 URL이라 더럽게 URLSearchParams로 풀어서 return 해야함.
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
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
      clientId: process.env.GITHUB_APP_ID as string,
      clientSecret: process.env.GITHUB_APP_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_APP_ID as string,
      clientSecret: process.env.GOOGLE_APP_SECRET as string,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth?",
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
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
      // refresh 함수에서 누구 provider 인지 판별할 용도로 provider 프로퍼티 추가함
      if (account && user) {
        console.log("리프레시 토큰 어카운트에 있냐? " + account.refresh_token);
        return {
          provider: account.provider,
          acessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
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
      console.log("리프레시 토큰 세션으로 넘어갔냐? " + token.refreshToken);
      session.user = token.user;
      session.rftoken = token.refreshToken
        ? token.refreshToken
        : "리프레시 토큰 없음";
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
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
