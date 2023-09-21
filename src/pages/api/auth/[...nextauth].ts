import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

async function refreshAccessToken(token: any) {
  //1. access token 재발급해달라고 POST요청
  const url = "https://github.com/login/oauth/access_token";
  const params = {
    grant_type: "refresh_token",
    refresh_token: token.refreshToken,
    client_id: "Iv1.26c8bc07ba4c65bd",
    client_secret: "d7e2b8f39d117b7f86174c075a6dbf8d66a748d3",
  };

  const res = await axios.post(url, null, { params: params });
  const refreshedTokens = await res.data;
  if (res.status !== 200) {
    console.log("실패", refreshedTokens);
  }

  //2. 재발급한거 출력해보기
  console.log("토큰 재발급한거 : ");
  console.log(refreshedTokens);
  // access_token=ghu_8afeApnRAkzkBYDmshCKqq6uyKJunA1EScAS
  // &expires_in=28800
  // &refresh_token=ghr_IZNb9vbPyu8FnSpnP1fLP0DQPq1EVH2JLB6HMOjgBaeGbZSo3dHJihM46QM5cX1odrOUYe1OhZxc
  // &refresh_token_expires_in=15811200
  // &scope=
  // &token_type=bearer

  //3. 이걸로 새로운 토큰 만들어서 return 해주기
  let data = new URLSearchParams(refreshedTokens);
  if (data.get("error") == null) {
    return {
      ...token,
      accessToken: data.get("access_token"),
      accessTokenExpires:
        Math.round(Date.now() / 1000) + Number(data.get("expires_in")),
      refreshToken: data.get("refresh_token"),
    };
  } else {
    return token;
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
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    async jwt({ token, account, user }: any) {
      if (account && user) {
        return {
          acessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          user,
        };
      }

      let timeLeft = token.accessTokenExpires - Math.round(Date.now() / 1000);
      if (timeLeft < 60 * 60 * 8 - 10) {
        let newJWT = await refreshAccessToken(token);
        return newJWT;
      } else {
        return token;
      }
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    async session({ session, token }: any) {
      session.user = token.user;
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
